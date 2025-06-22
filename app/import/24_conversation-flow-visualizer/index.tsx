import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { DependencyAnalyzer } from './lib/dependencyAnalyzer';
import { ConversationFlowAnalyzer } from './lib/conversationFlowAnalyzer';
import { DependencyEdgeComponent } from './components/DependencyEdge';
import { FileUploader } from './components/FileUploader';
import { NodeComponent } from './components/NodeComponent';
import { FlowControlPanel } from './components/FlowControlPanel';
import ErrorBoundary from './components/ErrorBoundary';
import type { DependencyEdge } from './types/Dependency';
import type { NodePosition } from './types/UI';
import type { FlowNode, FlowTheme } from './types/Flow';
import './styles/app.css';
import './styles/components.css';
import './styles/flow.css';

// APIキー
const API_KEY = 'AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI';
const MODEL_NAME = 'gemini-1.5-flash';

interface Node {
    id: string;
    text: string;
}

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [flowNodes, setFlowNodes] = useState<FlowNode[]>([]);
    const [flowThemes, setFlowThemes] = useState<FlowTheme[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set());
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
    const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map());
    const [dependencyEdges, setDependencyEdges] = useState<DependencyEdge[]>([]);
    const [showDependencies, setShowDependencies] = useState<boolean>(true);
    const [scale, setScale] = useState<number>(1);
    const [hierarchyLevel, setHierarchyLevel] = useState<number>(0); // 0: 大テーマ, 1: 中テーマ, 2: 小テーマ
    const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
    const [dragStartPos, setDragStartPos] = useState<{ x: number, y: number } | null>(null);
    
    const aiRef = useRef<GoogleGenerativeAI | null>(null);
    const transformRef = useRef<any>(null);

    // AI初期化
    useEffect(() => {
        if (!API_KEY) {
            console.warn("APIキーが設定されていません。");
            return;
        }
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            aiRef.current = genAI;
        } catch (e: any) {
            console.error("Google AI SDKの初期化に失敗しました:", e);
            setError(`AI SDKの初期化に失敗しました: ${e.message}`);
        }
    }, []);

    // 音声ファイル処理（ビジネス会話フロー分析に特化）
    const handleAudioFile = useCallback(async (file: File, filename: string) => {
        setUploadedFileName(filename);
        setIsProcessingFile(true);
        setError(null);
        setNodes([]);
        setFlowNodes([]);
        
        try {
            const base64Audio = await fileToBase64(file);
            
            if (!aiRef.current) {
                throw new Error("AI SDKが初期化されていません");
            }
            
            const model = aiRef.current.getGenerativeModel({ model: MODEL_NAME });
            
            const audioPart = {
                inlineData: {
                    mimeType: file.type,
                    data: base64Audio,
                },
            };
            
            const textPart = {
                text: `この音声ファイルを分析して、階層的な会話フローを抽出してください。会話の本質を捉え、3つの階層で整理してください。

## 階層的分析

### 大テーマ（3-5個）
会話全体を俯瞰した大きなテーマ。例：
- テーマ名: [30-50文字で会話の大きな流れを要約]
- 含まれる内容: [このテーマに含まれる話題の概要]
- 時間範囲: [開始-終了の目安]

### 中テーマ（10-15個）
大テーマを構成する具体的な話題。例：
- テーマ名: [20-30文字で話題を要約]
- 親テーマ: [どの大テーマに属するか]
- 核心的な内容: [この部分で何が議論されたか]
- 重要キーワード: [5-8個]

### 小テーマ（詳細）
実際の発言レベルの詳細。例：
- 発言要約: [10-20文字]
- 親テーマ: [どの中テーマに属するか]
- 話者: [誰が話したか]
- 実際の発言: [重要部分のみ抜粋]

## フロー分析
### 時系列の流れ
- 会話がどのように展開したか
- 話題の転換点
- 重要な決定や合意のタイミング

### 関係性マップ
- どのテーマがどのテーマに影響を与えたか
- 伏線と回収の関係
- 因果関係のある話題

重要：ローデータをそのまま出すのではなく、会話の本質を抽出して要約してください。`,
            };
            
            setIsLoading(true);
            const result = await model.generateContent([audioPart, textPart]);
            const response = await result.response;
            const text = response.text();
            
            // フロー分析結果をパース
            const flowAnalysis = parseFlowAnalysis(text);
            setFlowNodes(flowAnalysis.nodes);
            setFlowThemes(flowAnalysis.themes);
            
            // エッジを生成
            const edges = generateFlowEdges(flowAnalysis.nodes, flowAnalysis.transitions);
            setDependencyEdges(edges);
            
            // ノード位置を計算
            const positions = calculateFlowLayout(flowAnalysis.nodes);
            setNodePositions(positions);
            
        } catch (error: any) {
            console.error("ファイル処理エラー:", error);
            setError(`ファイル処理中にエラーが発生しました: ${error.message}`);
        } finally {
            setIsLoading(false);
            setIsProcessingFile(false);
        }
    }, []);

    // テキストファイル処理
    const handleTextFile = useCallback((newNodes: Array<{id: string, text: string}>, filename: string) => {
        try {
            setError(null);
            setIsProcessingFile(true);
            setUploadedFileName(filename);
            
            // テキストからフロー分析
            const analyzer = new ConversationFlowAnalyzer(newNodes);
            const flowAnalysis = analyzer.analyzeFlow();
            
            setFlowNodes(flowAnalysis.nodes);
            setFlowThemes(flowAnalysis.themes);
            setDependencyEdges(flowAnalysis.edges);
            
            // レイアウト計算
            const positions = calculateFlowLayout(flowAnalysis.nodes);
            setNodePositions(positions);
            
        } catch (error) {
            console.error('テキストファイル処理エラー:', error);
            setError(`テキストファイル処理エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
        } finally {
            setIsProcessingFile(false);
        }
    }, []);

    // ファイルをBase64に変換
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(new Error("ファイルの変換に失敗しました"));
                }
            };
            reader.onerror = () => reject(new Error("ファイル読み込みエラー"));
            reader.readAsDataURL(file);
        });
    };

    // フロー分析結果をパース（階層対応版）
    const parseFlowAnalysis = (text: string): { 
        nodes: FlowNode[], 
        themes: FlowTheme[], 
        transitions: Array<{from: string, to: string, reason: string}> 
    } => {
        const nodes: FlowNode[] = [];
        const themes: FlowTheme[] = [];
        const transitions: Array<{from: string, to: string, reason: string}> = [];
        
        try {
            // 大テーマを抽出
            const largeThemeSection = text.match(/### 大テーマ[\s\S]*?\n([\s\S]+?)(?=###|$)/);
            if (largeThemeSection) {
                const largeThemeText = largeThemeSection[1];
                const largeThemes = largeThemeText.split(/(?=- テーマ名:)/).filter(s => s.trim());
                
                largeThemes.forEach((theme, index) => {
                    const nameMatch = theme.match(/テーマ名:\s*(.+)/);
                    const contentMatch = theme.match(/含まれる内容:\s*(.+)/);
                    const timeMatch = theme.match(/時間範囲:\s*(.+)/);
                    
                    if (nameMatch) {
                        const node: FlowNode = {
                            id: `large-${index}`,
                            phase: nameMatch[1].trim(),
                            content: contentMatch?.[1].trim() || nameMatch[1].trim(),
                            keywords: extractKeywords(theme),
                            speaker: '全体',
                            type: 'general',
                            level: 'large',
                            childIds: [],
                            summary: contentMatch?.[1].trim()
                        };
                        nodes.push(node);
                        
                        // テーマとして登録
                        themes.push({
                            id: node.id,
                            name: node.phase,
                            description: node.content
                        });
                    }
                });
            }
            
            // 中テーマを抽出
            const mediumThemeSection = text.match(/### 中テーマ[\s\S]*?\n([\s\S]+?)(?=###|$)/);
            if (mediumThemeSection) {
                const mediumThemeText = mediumThemeSection[1];
                const mediumThemes = mediumThemeText.split(/(?=- テーマ名:)/).filter(s => s.trim());
                
                mediumThemes.forEach((theme, index) => {
                    const nameMatch = theme.match(/テーマ名:\s*(.+)/);
                    const parentMatch = theme.match(/親テーマ:\s*(.+)/);
                    const contentMatch = theme.match(/核心的な内容:\s*(.+)/);
                    const keywordsMatch = theme.match(/重要キーワード:\s*(.+)/);
                    
                    if (nameMatch) {
                        const keywords = keywordsMatch 
                            ? keywordsMatch[1].split(/[、,，]\s*/).map(k => k.trim())
                            : extractKeywords(theme);
                            
                        const node: FlowNode = {
                            id: `medium-${index}`,
                            phase: nameMatch[1].trim(),
                            content: contentMatch?.[1].trim() || nameMatch[1].trim(),
                            keywords: keywords,
                            speaker: '複数',
                            type: detectPhaseType(nameMatch[1]),
                            level: 'medium',
                            parentId: findParentId(parentMatch?.[1], nodes),
                            childIds: []
                        };
                        nodes.push(node);
                        
                        // 親ノードの子リストに追加
                        if (node.parentId) {
                            const parent = nodes.find(n => n.id === node.parentId);
                            if (parent && parent.childIds) {
                                parent.childIds.push(node.id);
                            }
                        }
                    }
                });
            }
            
            // 小テーマを抽出
            const smallThemeSection = text.match(/### 小テーマ[\s\S]*?\n([\s\S]+?)(?=##|$)/);
            if (smallThemeSection) {
                const smallThemeText = smallThemeSection[1];
                const smallThemes = smallThemeText.split(/(?=- 発言要約:)/).filter(s => s.trim());
                
                smallThemes.forEach((theme, index) => {
                    const summaryMatch = theme.match(/発言要約:\s*(.+)/);
                    const parentMatch = theme.match(/親テーマ:\s*(.+)/);
                    const speakerMatch = theme.match(/話者:\s*(.+)/);
                    const actualMatch = theme.match(/実際の発言:\s*(.+)/);
                    
                    if (summaryMatch) {
                        const node: FlowNode = {
                            id: `small-${index}`,
                            phase: summaryMatch[1].trim(),
                            content: actualMatch?.[1].trim() || summaryMatch[1].trim(),
                            keywords: extractKeywords(actualMatch?.[1] || summaryMatch[1]),
                            speaker: speakerMatch?.[1].trim() || '話者',
                            type: 'general',
                            level: 'small',
                            parentId: findParentId(parentMatch?.[1], nodes),
                            childIds: []
                        };
                        nodes.push(node);
                        
                        // 親ノードの子リストに追加
                        if (node.parentId) {
                            const parent = nodes.find(n => n.id === node.parentId);
                            if (parent && parent.childIds) {
                                parent.childIds.push(node.id);
                            }
                        }
                    }
                });
            }
            
            // フロー分析から遷移を抽出
            const flowSection = text.match(/## フロー分析[\s\S]*?### 時系列の流れ\n([\s\S]+?)(?=###|$)/);
            if (flowSection) {
                const lines = flowSection[1].split('\n');
                lines.forEach((line, index) => {
                    if (line.includes('→') || line.includes('から') || line.includes('転換')) {
                        // 簡単な遷移パターンを検出
                        if (index > 0 && nodes.length > 1) {
                            transitions.push({
                                from: nodes[Math.max(0, index - 1)].phase,
                                to: nodes[Math.min(nodes.length - 1, index)].phase,
                                reason: line.trim()
                            });
                        }
                    }
                });
            }
            
            // 関係性マップから遷移を抽出
            const relationSection = text.match(/### 関係性マップ\n([\s\S]+?)(?=##|$)/);
            if (relationSection) {
                const lines = relationSection[1].split('\n');
                lines.forEach(line => {
                    const influenceMatch = line.match(/(.+?)が(.+?)に影響/);
                    const causeMatch = line.match(/(.+?)→(.+?)/);
                    
                    if (influenceMatch) {
                        transitions.push({
                            from: influenceMatch[1].trim(),
                            to: influenceMatch[2].trim(),
                            reason: '影響関係'
                        });
                    } else if (causeMatch) {
                        transitions.push({
                            from: causeMatch[1].trim(),
                            to: causeMatch[2].trim(),
                            reason: '因果関係'
                        });
                    }
                });
            }
            
            // ノード間の時系列遷移を自動生成
            if (transitions.length === 0 && nodes.length > 1) {
                // 同じレベルのノード間に遷移を作成
                const levels = ['large', 'medium', 'small'];
                levels.forEach(level => {
                    const levelNodes = nodes.filter(n => n.level === level);
                    for (let i = 0; i < levelNodes.length - 1; i++) {
                        transitions.push({
                            from: levelNodes[i].phase,
                            to: levelNodes[i + 1].phase,
                            reason: '時系列'
                        });
                    }
                });
            }
            
        } catch (error) {
            console.error('フロー分析のパースエラー:', error);
            // フォールバック処理
            return { nodes: [], themes: [], transitions: [] };
        }
        
        return { nodes, themes, transitions };
    };
    
    // キーワード抽出ヘルパー関数
    const extractKeywords = (text: string): string[] => {
        const stopWords = ['です', 'ます', 'ました', 'でした', 'ですね', 'から', 'けど'];
        const words = text.match(/[ぁ-んァ-ヶー一-龯０-９a-zA-Z]{2,}/g) || [];
        return words
            .filter(word => !stopWords.includes(word))
            .slice(0, 5);
    };
    
    // 親ノードIDを見つけるヘルパー関数
    const findParentId = (parentName: string | undefined, nodes: FlowNode[]): string | undefined => {
        if (!parentName) return undefined;
        const parent = nodes.find(n => n.phase.includes(parentName));
        return parent?.id;
    };

    // フェーズタイプを検出
    const detectPhaseType = (phaseName: string): string => {
        if (phaseName.includes('挨拶') || phaseName.includes('アイスブレイク')) return 'greeting';
        if (phaseName.includes('課題') || phaseName.includes('ヒアリング')) return 'problem';
        if (phaseName.includes('現状')) return 'current_state';
        if (phaseName.includes('提案') || phaseName.includes('プレゼン')) return 'proposal';
        if (phaseName.includes('質疑') || phaseName.includes('Q&A')) return 'qa';
        if (phaseName.includes('価格') || phaseName.includes('条件')) return 'negotiation';
        if (phaseName.includes('合意') || phaseName.includes('クロージング')) return 'closing';
        if (phaseName.includes('ネクスト') || phaseName.includes('次回')) return 'next_step';
        return 'general';
    };

    // フローエッジを生成
    const generateFlowEdges = (
        nodes: FlowNode[], 
        transitions: Array<{from: string, to: string, reason: string}>
    ): DependencyEdge[] => {
        const edges: DependencyEdge[] = [];
        
        transitions.forEach((transition, index) => {
            const fromNode = nodes.find(n => n.phase === transition.from);
            const toNode = nodes.find(n => n.phase === transition.to);
            
            if (fromNode && toNode) {
                edges.push({
                    id: `edge-${index}`,
                    sourceNodeId: fromNode.id,
                    targetNodeId: toNode.id,
                    type: 'flow',
                    keywords: [],
                    strength: 1,
                    description: transition.reason
                });
            }
        });
        
        return edges;
    };

    // フローレイアウトを計算（階層的配置）
    const calculateFlowLayout = (nodes: FlowNode[]): Map<string, NodePosition> => {
        const positions = new Map<string, NodePosition>();
        const nodeWidth = 250;
        const nodeHeight = 120;
        const horizontalGap = 150;
        const verticalGap = 200;
        const levelGap = 300;
        
        // レベルごとにノードを分類
        const nodesByLevel = new Map<string, FlowNode[]>();
        nodesByLevel.set('large', nodes.filter(n => n.level === 'large'));
        nodesByLevel.set('medium', nodes.filter(n => n.level === 'medium'));
        nodesByLevel.set('small', nodes.filter(n => n.level === 'small'));
        
        let currentY = 100;
        
        // 大テーマの配置
        const largeNodes = nodesByLevel.get('large') || [];
        largeNodes.forEach((node, index) => {
            const x = 100 + index * (nodeWidth + horizontalGap * 2);
            positions.set(node.id, {
                x,
                y: currentY,
                width: nodeWidth * 1.2,
                height: nodeHeight * 1.2
            });
        });
        
        if (largeNodes.length > 0) {
            currentY += nodeHeight * 1.2 + levelGap;
        }
        
        // 中テーマの配置（親ノードの下に配置）
        const mediumNodes = nodesByLevel.get('medium') || [];
        const mediumByParent = new Map<string, FlowNode[]>();
        
        mediumNodes.forEach(node => {
            const parentId = node.parentId || 'none';
            if (!mediumByParent.has(parentId)) {
                mediumByParent.set(parentId, []);
            }
            mediumByParent.get(parentId)!.push(node);
        });
        
        mediumByParent.forEach((children, parentId) => {
            const parentPos = positions.get(parentId);
            const startX = parentPos ? parentPos.x : 100;
            
            children.forEach((node, index) => {
                const x = startX + index * (nodeWidth + horizontalGap);
                positions.set(node.id, {
                    x,
                    y: currentY,
                    width: nodeWidth,
                    height: nodeHeight
                });
            });
        });
        
        if (mediumNodes.length > 0) {
            currentY += nodeHeight + levelGap;
        }
        
        // 小テーマの配置（親ノードの下に配置）
        const smallNodes = nodesByLevel.get('small') || [];
        const smallByParent = new Map<string, FlowNode[]>();
        
        smallNodes.forEach(node => {
            const parentId = node.parentId || 'none';
            if (!smallByParent.has(parentId)) {
                smallByParent.set(parentId, []);
            }
            smallByParent.get(parentId)!.push(node);
        });
        
        // 小テーマをグリッド状に配置
        smallByParent.forEach((children, parentId) => {
            const parentPos = positions.get(parentId);
            const startX = parentPos ? parentPos.x - nodeWidth/2 : 100;
            const maxCols = 3;
            
            children.forEach((node, index) => {
                const col = index % maxCols;
                const row = Math.floor(index / maxCols);
                const x = startX + col * (nodeWidth * 0.8 + horizontalGap * 0.5);
                const y = currentY + row * (nodeHeight * 0.8 + verticalGap * 0.5);
                
                positions.set(node.id, {
                    x,
                    y,
                    width: nodeWidth * 0.8,
                    height: nodeHeight * 0.8
                });
            });
        });
        
        // 位置の微調整（重なり回避）
        const occupiedAreas: Array<{x: number, y: number, width: number, height: number}> = [];
        
        positions.forEach((pos, nodeId) => {
            let adjusted = false;
            let attempts = 0;
            
            while (!adjusted && attempts < 10) {
                let overlaps = false;
                
                for (const area of occupiedAreas) {
                    if (pos.x < area.x + area.width &&
                        pos.x + pos.width > area.x &&
                        pos.y < area.y + area.height &&
                        pos.y + pos.height > area.y) {
                        overlaps = true;
                        break;
                    }
                }
                
                if (overlaps) {
                    pos.x += 30;
                    attempts++;
                } else {
                    adjusted = true;
                }
            }
            
            occupiedAreas.push({
                x: pos.x,
                y: pos.y,
                width: pos.width,
                height: pos.height
            });
        });
        
        return positions;
    };

    // ズーム処理
    const handleZoomIn = () => {
        if (transformRef.current) {
            transformRef.current.zoomIn();
        }
    };
    
    const handleZoomOut = () => {
        if (transformRef.current) {
            transformRef.current.zoomOut();
        }
    };
    
    // マウスイベントハンドラ
    const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
        e.preventDefault();
        setDraggedNodeId(nodeId);
        setDragStartPos({ x: e.clientX, y: e.clientY });
    }, []);
    
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (draggedNodeId && dragStartPos) {
            const deltaX = e.clientX - dragStartPos.x;
            const deltaY = e.clientY - dragStartPos.y;
            
            setNodePositions(prev => {
                const newPositions = new Map(prev);
                const currentPos = prev.get(draggedNodeId);
                if (currentPos) {
                    newPositions.set(draggedNodeId, {
                        ...currentPos,
                        x: currentPos.x + deltaX,
                        y: currentPos.y + deltaY
                    });
                }
                return newPositions;
            });
            
            setDragStartPos({ x: e.clientX, y: e.clientY });
        }
    }, [draggedNodeId, dragStartPos]);
    
    const handleMouseUp = useCallback(() => {
        setDraggedNodeId(null);
        setDragStartPos(null);
    }, []);
    
    // グローバルマウスイベント
    useEffect(() => {
        if (draggedNodeId) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [draggedNodeId, handleMouseMove, handleMouseUp]);
    
    // 階層に応じたノードフィルタリング
    const filteredNodes = useMemo(() => {
        if (flowNodes.length === 0) return [];
        
        const levels = ['large', 'medium', 'small'];
        const targetLevel = levels[hierarchyLevel];
        
        // 指定レベル以上のノードを取得
        const visibleNodes = flowNodes.filter(node => {
            const nodeLevel = levels.indexOf(node.level);
            return nodeLevel <= hierarchyLevel;
        });
        
        // 親子関係に基づいて表示すべきノードを決定
        const expandedNodes = new Set<string>();
        
        // 選択されたレベルのノードは全て表示
        visibleNodes.forEach(node => {
            if (node.level === targetLevel) {
                expandedNodes.add(node.id);
            }
        });
        
        // 展開されているノードの親も表示
        visibleNodes.forEach(node => {
            if (expandedNodes.has(node.id) && node.parentId) {
                let current = visibleNodes.find(n => n.id === node.parentId);
                while (current) {
                    expandedNodes.add(current.id);
                    current = current.parentId ? visibleNodes.find(n => n.id === current!.parentId) : undefined;
                }
            }
        });
        
        return visibleNodes.filter(node => expandedNodes.has(node.id));
    }, [flowNodes, hierarchyLevel]);

    return (
        <div className="app-container">
            {/* ヘッダー */}
            <div className="app-header">
                <h1 className="app-title">会話フロービジュアライザー v0.1.6</h1>
                <div className="header-subtitle">ビジネス会話の流れを可視化</div>
            </div>

            {/* エラー表示 */}
            {error && (
                <div className="error-banner">
                    <span className="error-icon">⚠️</span>
                    <span className="error-message">{error}</span>
                    <button className="error-close" onClick={() => setError(null)}>×</button>
                </div>
            )}

            {/* メインコンテンツ */}
            <div className="main-container">
                {/* アップロードエリア */}
                {flowNodes.length === 0 && (
                    <div className="upload-section">
                        <h2 className="upload-title">会話データをアップロード</h2>
                        <ErrorBoundary>
                            <FileUploader
                                onAudioFile={handleAudioFile}
                                onTextFile={handleTextFile}
                                disabled={isLoading || isProcessingFile}
                                isProcessing={isProcessingFile}
                                uploadedFileName={uploadedFileName}
                            />
                        </ErrorBoundary>
                        {isLoading && (
                            <div className="loading-indicator">
                                <div className="loading-spinner" />
                                <span className="loading-text">会話フローを分析中...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* フロー表示エリア */}
                {flowNodes.length > 0 && (
                    <div className="flow-container">
                        <TransformWrapper
                            ref={transformRef}
                            initialScale={1}
                            minScale={0.1}
                            maxScale={5}
                            wheel={{ step: 0.1 }}
                            pinch={{ step: 5 }}
                            doubleClick={{ disabled: true }}
                            onZoom={(ref) => setScale(ref.state.scale)}
                        >
                            <TransformComponent
                                wrapperStyle={{
                                    width: "100%",
                                    height: "100%"
                                }}
                                contentStyle={{
                                    width: "3000px",
                                    height: "2000px"
                                }}
                            >
                            {/* エッジ */}
                            {showDependencies && (
                                <svg 
                                    className="edges-svg"
                                    viewBox="0 0 3000 2000"
                                    preserveAspectRatio="none"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                >
                                    {/* SVG定義 */}
                                    <defs>
                                        {/* 矢印の定義 */}
                                        <marker
                                            id="arrowhead"
                                            markerWidth="10"
                                            markerHeight="10"
                                            refX="8"
                                            refY="3"
                                            orient="auto"
                                        >
                                            <polygon
                                                points="0 0, 10 3, 0 6"
                                                fill="#6366f1"
                                            />
                                        </marker>
                                        
                                        {/* グラデーション定義 */}
                                        <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                                        </linearGradient>
                                        
                                        <linearGradient id="foreshadow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                                        </linearGradient>
                                        
                                        <linearGradient id="callback-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
                                        </linearGradient>
                                        
                                        <linearGradient id="qa-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                                        </linearGradient>
                                        
                                        <linearGradient id="theme-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
                                        </linearGradient>
                                        
                                        <linearGradient id="edge-gradient-time" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6b7280" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.5" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {dependencyEdges.map(edge => {
                                        const sourcePos = nodePositions.get(edge.sourceNodeId);
                                        const targetPos = nodePositions.get(edge.targetNodeId);
                                        
                                        if (!sourcePos || !targetPos) return null;
                                        
                                        return (
                                            <DependencyEdgeComponent
                                                key={edge.id}
                                                edge={edge}
                                                sourcePosition={sourcePos}
                                                targetPosition={targetPos}
                                                onHover={() => {}}
                                                isHovered={false}
                                            />
                                        );
                                    })}
                                </svg>
                            )}

                            {/* ノード */}
                            {filteredNodes.map(node => {
                                const position = nodePositions.get(node.id);
                                if (!position) return null;
                                
                                return (
                                    <div
                                        key={node.id}
                                        style={{
                                            position: 'absolute',
                                            left: position.x,
                                            top: position.y,
                                            cursor: draggedNodeId === node.id ? 'grabbing' : 'grab'
                                        }}
                                    >
                                        <NodeComponent
                                            node={node}
                                            position={position}
                                            isSelected={selectedNodeId === node.id}
                                            isExpanded={expandedNodeIds.has(node.id)}
                                            onClick={() => {
                                                if (!draggedNodeId) {
                                                    setSelectedNodeId(node.id);
                                                    // トグル展開
                                                    setExpandedNodeIds(prev => {
                                                        const next = new Set(prev);
                                                        if (next.has(node.id)) {
                                                            next.delete(node.id);
                                                        } else {
                                                            next.add(node.id);
                                                        }
                                                        return next;
                                                    });
                                                }
                                            }}
                                            onMouseDown={(e) => handleMouseDown(e, node.id)}
                                        />
                                    </div>
                                );
                            })}
                            </TransformComponent>
                        </TransformWrapper>

                        {/* コントロールパネル */}
                        <FlowControlPanel
                            scale={scale}
                            onZoomIn={handleZoomIn}
                            onZoomOut={handleZoomOut}
                            showDependencies={showDependencies}
                            onToggleDependencies={() => setShowDependencies(!showDependencies)}
                            themes={flowThemes}
                            hierarchyLevel={hierarchyLevel}
                            onHierarchyChange={setHierarchyLevel}
                            onReset={() => {
                                setFlowNodes([]);
                                setFlowThemes([]);
                                setDependencyEdges([]);
                                setNodePositions(new Map());
                                setError(null);
                                setUploadedFileName('');
                                setHierarchyLevel(0);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    );
} else {
    console.error("ルート要素が見つかりません。");
}