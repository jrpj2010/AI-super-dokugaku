import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
    const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map());
    const [dependencyEdges, setDependencyEdges] = useState<DependencyEdge[]>([]);
    const [showDependencies, setShowDependencies] = useState<boolean>(true);
    const [scale, setScale] = useState<number>(1);
    const [panOffset, setPanOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    
    const aiRef = useRef<GoogleGenerativeAI | null>(null);

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
                text: `この音声ファイルを分析して、ビジネス会話のフローを抽出してください。以下の形式で出力してください：

## 会話フロー分析

### フェーズ1: [フェーズ名]
- 内容: [このフェーズの要約]
- キーワード: [重要な単語3-5個]
- 話者: [主に話している人]

### フェーズ2: [フェーズ名]
...

## 主要なテーマ
1. [テーマ名]: [説明]
2. [テーマ名]: [説明]
...

## フロー遷移
フェーズ1 → フェーズ2: [遷移の理由]
フェーズ2 → フェーズ3: [遷移の理由]
...

ビジネス会話として以下のようなフェーズを識別してください：
- 挨拶・アイスブレイク
- 課題確認・ヒアリング
- 現状把握
- 提案・プレゼンテーション
- 質疑応答
- 価格・条件交渉
- 合意形成・クロージング
- ネクストステップ確認`,
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

    // フロー分析結果をパース
    const parseFlowAnalysis = (text: string): { 
        nodes: FlowNode[], 
        themes: FlowTheme[], 
        transitions: Array<{from: string, to: string, reason: string}> 
    } => {
        const nodes: FlowNode[] = [];
        const themes: FlowTheme[] = [];
        const transitions: Array<{from: string, to: string, reason: string}> = [];
        
        // フェーズを抽出
        const phaseRegex = /### フェーズ(\d+): (.+)\n- 内容: (.+)\n- キーワード: (.+)\n- 話者: (.+)/g;
        let match;
        
        while ((match = phaseRegex.exec(text)) !== null) {
            nodes.push({
                id: `phase-${match[1]}`,
                phase: match[2],
                content: match[3],
                keywords: match[4].split(/[、,]\s*/),
                speaker: match[5],
                type: detectPhaseType(match[2])
            });
        }
        
        // テーマを抽出
        const themeRegex = /(\d+)\. (.+): (.+)/g;
        const themeSection = text.match(/## 主要なテーマ\n([\s\S]+?)##/);
        if (themeSection) {
            while ((match = themeRegex.exec(themeSection[1])) !== null) {
                themes.push({
                    id: `theme-${match[1]}`,
                    name: match[2],
                    description: match[3]
                });
            }
        }
        
        // 遷移を抽出
        const transitionRegex = /(.+) → (.+): (.+)/g;
        const transitionSection = text.match(/## フロー遷移\n([\s\S]+?)$/);
        if (transitionSection) {
            while ((match = transitionRegex.exec(transitionSection[1])) !== null) {
                transitions.push({
                    from: match[1],
                    to: match[2],
                    reason: match[3]
                });
            }
        }
        
        return { nodes, themes, transitions };
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

    // フローレイアウトを計算
    const calculateFlowLayout = (nodes: FlowNode[]): Map<string, NodePosition> => {
        const positions = new Map<string, NodePosition>();
        const nodeWidth = 250;
        const nodeHeight = 120;
        const horizontalGap = 100;
        const verticalGap = 150;
        
        // フロー図として左から右に配置
        nodes.forEach((node, index) => {
            const x = 100 + (index % 3) * (nodeWidth + horizontalGap);
            const y = 100 + Math.floor(index / 3) * (nodeHeight + verticalGap);
            
            positions.set(node.id, {
                x,
                y,
                width: nodeWidth,
                height: nodeHeight
            });
        });
        
        return positions;
    };

    // ズーム処理
    const handleZoomIn = () => setScale(prev => Math.min(2, prev + 0.1));
    const handleZoomOut = () => setScale(prev => Math.max(0.5, prev - 0.1));

    return (
        <div className="app-container">
            {/* ヘッダー */}
            <div className="app-header">
                <h1 className="app-title">会話フロービジュアライザー v0.1.0</h1>
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
                        <div 
                            className="flow-canvas"
                            style={{
                                transform: `scale(${scale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                                transformOrigin: '0 0'
                            }}
                        >
                            {/* エッジ */}
                            {showDependencies && (
                                <svg className="edges-svg">
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
                            {flowNodes.map(node => {
                                const position = nodePositions.get(node.id);
                                if (!position) return null;
                                
                                return (
                                    <NodeComponent
                                        key={node.id}
                                        node={node}
                                        position={position}
                                        isSelected={selectedNodeId === node.id}
                                        onClick={() => setSelectedNodeId(node.id)}
                                    />
                                );
                            })}
                        </div>

                        {/* コントロールパネル */}
                        <FlowControlPanel
                            scale={scale}
                            onZoomIn={handleZoomIn}
                            onZoomOut={handleZoomOut}
                            showDependencies={showDependencies}
                            onToggleDependencies={() => setShowDependencies(!showDependencies)}
                            themes={flowThemes}
                            onReset={() => {
                                setFlowNodes([]);
                                setFlowThemes([]);
                                setDependencyEdges([]);
                                setNodePositions(new Map());
                                setError(null);
                                setUploadedFileName('');
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
        <React.StrictMode>
            <ErrorBoundary>
                <App />
            </ErrorBoundary>
        </React.StrictMode>
    );
} else {
    console.error("ルート要素が見つかりません。");
}