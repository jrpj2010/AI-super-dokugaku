import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { ConversationAnalyzer } from './lib/conversationAnalyzer';
import { SRTParser } from './lib/srtParser';
import { ConversationMetadata } from './components/ConversationMetadata';
import { ViewLevelSelector, ViewLevel } from './components/ViewLevelSelector';
import { SummaryView } from './components/SummaryView';
import { TimelineView } from './components/TimelineView';
import { FileUploader } from './components/FileUploader';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/app.css';
import './styles/components.css';

// APIキー
const API_KEY = 'AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI';
const MODEL_NAME = 'gemini-2.5-flash';
const NODE_BREAK_DELIMITER = "---NODE_BREAK---";

interface Node {
    id: string;
    text: string;
}

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [viewLevel, setViewLevel] = useState<ViewLevel>('summary');
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
    
    // 会話メタデータ（実際はAIから抽出する）
    const [conversationMetadata, setConversationMetadata] = useState({
        title: '会話を分析してください',
        participants: ['話者1', '話者2'],
        duration: '未定',
        purpose: '未定',
        timestamp: new Date().toLocaleDateString('ja-JP')
    });
    
    const aiRef = useRef<GoogleGenAI | null>(null);

    // AI初期化
    useEffect(() => {
        if (!API_KEY) {
            console.warn("APIキーが設定されていません。");
            return;
        }
        try {
            const genAI = new GoogleGenAI(API_KEY);
            aiRef.current = genAI;
        } catch (e: any) {
            console.error("GoogleGenAIの初期化に失敗しました:", e);
            setError(`AI SDKの初期化に失敗しました: ${e.message}`);
        }
    }, []);

    // 音声ファイル処理
    const handleAudioFile = useCallback(async (file: File, filename: string) => {
        setUploadedFileName(filename);
        setIsProcessingFile(true);
        setError(null);
        setNodes([]);
        
        try {
            const base64Audio = await fileToBase64(file);
            
            if (!aiRef.current) {
                throw new Error("AI SDKが初期化されていません");
            }
            
            const audioPart = {
                inlineData: {
                    mimeType: file.type,
                    data: base64Audio,
                },
            };
            
            const textPart = {
                text: `この音声ファイルを文字起こししてください。以下の指示に従ってください：
1. 会話のタイトルを推測して最初に書いてください
2. 複数の話者がいる場合は、話者を識別して「話者1:」「話者2:」のように区別してください
3. 各発言や話題の転換点を "${NODE_BREAK_DELIMITER}" で区切ってください
4. 話者が変わるごとに必ず区切ってください
5. 重要な提案や決定事項には【重要】マークを付けてください
6. 会話の目的を推測して書いてください`,
            };
            
            setIsLoading(true);
            const model = aiRef.current.getGenerativeModel({ model: MODEL_NAME });
            const result = await model.generateContent({
                contents: [{ parts: [textPart, audioPart] }],
            });
            
            const response = await result.response;
            const text = response.text();
            
            // タイトルと目的を抽出
            const titleMatch = text.match(/タイトル[：:]\s*(.+)/);
            const purposeMatch = text.match(/目的[：:]\s*(.+)/);
            
            if (titleMatch) {
                setConversationMetadata(prev => ({
                    ...prev,
                    title: titleMatch[1].trim()
                }));
            }
            
            if (purposeMatch) {
                setConversationMetadata(prev => ({
                    ...prev,
                    purpose: purposeMatch[1].trim()
                }));
            }
            
            // ノード生成
            const rawNodesTexts = text.split(NODE_BREAK_DELIMITER);
            const newNodes: Node[] = rawNodesTexts
                .map(text => text.trim())
                .filter(text => text.length > 0 && !text.includes('タイトル：') && !text.includes('目的：'))
                .map((text, index) => ({
                    id: `node-${Date.now()}-${index}`,
                    text: text,
                }));
            
            if (newNodes.length > 0) {
                setNodes(newNodes);
                
                // 会話時間を推定
                const duration = Math.round(newNodes.length * 0.5); // 1ノード30秒と仮定
                setConversationMetadata(prev => ({
                    ...prev,
                    duration: `${duration}分`
                }));
            } else {
                setError("音声の解析に失敗しました。");
            }
            
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
            
            setNodes(newNodes);
            
            // タイトルをファイル名から生成
            const title = filename.replace(/\.(srt|vtt|txt)$/i, '');
            setConversationMetadata(prev => ({
                ...prev,
                title: title,
                duration: `${Math.round(newNodes.length * 0.5)}分`
            }));
            
        } catch (error) {
            console.error('SRTファイル処理エラー:', error);
            setError(`SRTファイル処理エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
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

    // 会話分析
    const conversationAnalysis = useMemo(() => {
        if (nodes.length < 2) {
            return {
                patterns: [],
                clusters: [],
                summary: {
                    totalDuration: conversationMetadata.duration,
                    speakerDistribution: [],
                    mainTopics: [],
                    keyInsights: [],
                    sentiment: 'neutral' as const
                }
            };
        }

        const analyzer = new ConversationAnalyzer(nodes);
        const patterns = analyzer.analyzeConversationPatterns();
        const clusters = analyzer.generateThemeClusters();
        
        // 話者分布を計算
        const speakerCounts = new Map<string, number>();
        nodes.forEach(node => {
            const speaker = node.text.match(/^話者(\d+)[：:]/)?.[1] || '不明';
            speakerCounts.set(`話者${speaker}`, (speakerCounts.get(`話者${speaker}`) || 0) + 1);
        });
        
        const speakerDistribution = Array.from(speakerCounts.entries()).map(([speaker, count]) => ({
            speaker,
            percentage: Math.round((count / nodes.length) * 100),
            utterances: count
        }));
        
        // 主要トピック
        const mainTopics = clusters.slice(0, 5).map(cluster => ({
            name: cluster.name,
            importance: Math.min(5, Math.round(cluster.importance / 2)),
            keywords: cluster.keywords
        }));
        
        // 重要な洞察を生成
        const keyInsights = [];
        if (patterns.filter(p => p.type === 'question').length > 5) {
            keyInsights.push('質問と回答が活発に行われた対話形式の会話');
        }
        if (clusters.find(c => c.name.includes('価格'))) {
            keyInsights.push('価格や費用に関する議論が含まれている');
        }
        if (clusters.find(c => c.name.includes('スケジュール'))) {
            keyInsights.push('日程調整やスケジュールの話題が含まれている');
        }
        if (patterns.filter(p => p.type === 'decision').length > 0) {
            keyInsights.push('重要な決定事項や合意が形成された');
        }
        
        // 感情分析（簡易版）
        const positiveKeywords = ['ありがとう', '良い', '素晴らしい', '嬉しい', '期待'];
        const negativeKeywords = ['問題', '困難', '心配', '難しい', '課題'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        nodes.forEach(node => {
            positiveKeywords.forEach(keyword => {
                if (node.text.includes(keyword)) positiveCount++;
            });
            negativeKeywords.forEach(keyword => {
                if (node.text.includes(keyword)) negativeCount++;
            });
        });
        
        const sentiment = positiveCount > negativeCount * 1.5 ? 'positive' : 
                         negativeCount > positiveCount * 1.5 ? 'negative' : 'neutral';
        
        return {
            patterns,
            clusters,
            summary: {
                totalDuration: conversationMetadata.duration,
                speakerDistribution,
                mainTopics,
                keyInsights,
                sentiment
            }
        };
    }, [nodes, conversationMetadata.duration]);

    // タイムラインノードを準備
    const timelineNodes = useMemo(() => {
        return nodes.map((node, index) => {
            const speaker = node.text.match(/^話者(\d+)[：:]/)?.[1] || '1';
            const cleanText = node.text.replace(/^話者\d+[：:]/, '').trim();
            
            // 重要度を判定
            let importance: 'high' | 'medium' | 'low' = 'low';
            if (node.text.includes('【重要】') || node.text.includes('決定') || node.text.includes('合意')) {
                importance = 'high';
            } else if (node.text.includes('提案') || node.text.includes('？')) {
                importance = 'medium';
            }
            
            // クラスターからトピックを取得
            const cluster = conversationAnalysis.clusters.find(c => c.nodeIds.includes(node.id));
            
            return {
                id: node.id,
                text: cleanText,
                speaker: `話者${speaker}`,
                timestamp: `${Math.floor(index * 0.5)}:${(index * 30) % 60}`,
                importance,
                topic: cluster?.name
            };
        });
    }, [nodes, conversationAnalysis.clusters]);

    return (
        <div className="app-container">
            {/* ヘッダー */}
            <div className="app-header">
                <h1 className="app-title">会話フロービジュアライザー v0.0.9</h1>
                <div className="header-actions">
                    {nodes.length > 0 && (
                        <button 
                            className="reset-button"
                            onClick={() => {
                                setNodes([]);
                                setError(null);
                                setUploadedFileName('');
                                setSelectedNodeId(null);
                                setViewLevel('summary');
                            }}
                        >
                            リセット
                        </button>
                    )}
                </div>
            </div>

            {/* エラー表示 */}
            {error && (
                <div className="error-banner">
                    <span className="error-icon">⚠️</span>
                    <span className="error-message">{error}</span>
                    <button className="error-close" onClick={() => setError(null)}>×</button>
                </div>
            )}

            {/* ファイルアップロード */}
            {nodes.length === 0 && (
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
                            <span className="loading-text">分析中...</span>
                        </div>
                    )}
                </div>
            )}

            {/* 分析結果表示 */}
            {nodes.length > 0 && (
                <>
                    {/* メタデータ */}
                    <ConversationMetadata {...conversationMetadata} />
                    
                    {/* ビューレベル選択 */}
                    <ViewLevelSelector
                        currentLevel={viewLevel}
                        onLevelChange={setViewLevel}
                        nodeCount={nodes.length}
                        topicCount={conversationAnalysis.clusters.length}
                    />
                    
                    {/* コンテンツエリア */}
                    <div className="content-area">
                        {viewLevel === 'summary' && (
                            <SummaryView summary={conversationAnalysis.summary} />
                        )}
                        
                        {viewLevel === 'topics' && (
                            <div className="topics-view">
                                {conversationAnalysis.clusters.map(cluster => (
                                    <div key={cluster.id} className="topic-cluster">
                                        <h3 className="cluster-title" style={{ color: cluster.color }}>
                                            {cluster.name}
                                        </h3>
                                        <div className="cluster-nodes">
                                            {cluster.nodeIds.slice(0, 3).map(nodeId => {
                                                const node = nodes.find(n => n.id === nodeId);
                                                if (!node) return null;
                                                return (
                                                    <div key={nodeId} className="cluster-node-preview">
                                                        {node.text.slice(0, 100)}...
                                                    </div>
                                                );
                                            })}
                                            {cluster.nodeIds.length > 3 && (
                                                <div className="cluster-more">
                                                    他 {cluster.nodeIds.length - 3} 件
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {viewLevel === 'details' && (
                            <TimelineView
                                nodes={timelineNodes}
                                height={window.innerHeight - 300}
                                onNodeClick={setSelectedNodeId}
                                selectedNodeId={selectedNodeId}
                            />
                        )}
                    </div>
                </>
            )}

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