
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DependencyAnalyzer } from './lib/dependencyAnalyzer';
import { DependencyEdgeComponent } from './components/DependencyEdge';
import ErrorBoundary from './components/ErrorBoundary';
import type { DependencyEdge } from './types/Dependency';
import type { NodePosition } from './types/UI';

// APIキーは.env.localファイルから読み込む（本番環境では適切に設定）
const API_KEY = 'AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI';  // Temporarily hardcoded
const MODEL_NAME = 'gemini-2.5-flash'; // Updated from preview model
const NODE_BREAK_DELIMITER = "---NODE_BREAK---";

const MIN_SCALE = 0.1;
const MAX_SCALE = 2.0;
const ZOOM_STEP = 0.1;

interface Node {
    id: string;
    text: string;
    audioUrl?: string;
    icons?: ('exclamation' | 'lightbulb')[];
}

const App: React.FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transcribedText, setTranscribedText] = useState<string>("");
    const [nodes, setNodes] = useState<Node[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [scale, setScale] = useState<number>(1);
    const [panOffset, setPanOffset] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState<boolean>(false);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [dependencyEdges, setDependencyEdges] = useState<DependencyEdge[]>([]);
    const [showDependencies, setShowDependencies] = useState<boolean>(true);
    const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map());
    const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const aiRef = useRef<GoogleGenAI | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const microphoneSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const currentAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const [currentlyPlayingNodeId, setCurrentlyPlayingNodeId] = useState<string | null>(null);
    const panStartCoordsRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
    const graphCanvasViewportRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!API_KEY) {
            console.warn("APIキーが設定されていません。AI機能は利用できません。");
            return;
        }
        try {
            aiRef.current = new GoogleGenAI({ apiKey: API_KEY });
        } catch (e: any) {
            console.error("GoogleGenAIの初期化に失敗しました:", e);
            setError(`AI SDKの初期化に失敗しました: ${e.message}`);
        }
    }, []);

    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    resolve(reader.result.split(',')[1]);
                } else {
                    reject(new Error("BlobのBase64への変換に失敗しました。結果がnullまたは文字列ではありません。"));
                }
            };
            reader.onerror = (errorEvent) => reject(new Error(`FileReaderエラー: ${errorEvent.type}`));
            reader.readAsDataURL(blob);
        });
    };

    const visualizeWaveform = useCallback(() => {
        if (!analyserRef.current || !waveformCanvasRef.current || !audioContextRef.current) return;

        const canvas = waveformCanvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!analyserRef.current || !isRecording) {
                 if(animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
                 canvasCtx.fillStyle = '#121417';
                 canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
                 return;
            }

            animationFrameIdRef.current = requestAnimationFrame(draw);
            analyserRef.current.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = '#121417';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = '#3a8cff';
            canvasCtx.beginPath();

            const sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height / 2);

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };
        draw();
    }, [isRecording]);


    const handleStartRecording = async () => {
        if (!aiRef.current && API_KEY) {
            setError("AI SDKが初期化されていません。録音を開始できません。");
            return;
        }
        if (!API_KEY) {
             console.error("APIキーが設定されていないため、録音を開始できません。");
             setError("録音機能を利用できません。設定を確認してください。");
             return;
        }

        setError(null);
        setNodes([]);
        setTranscribedText("");
        setSelectedNodeId(null);
        setScale(1);
        setPanOffset({ x: 0, y: 0 });


        try {
            const userMediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            microphoneSourceRef.current = audioContextRef.current.createMediaStreamSource(userMediaStream);
            microphoneSourceRef.current.connect(analyserRef.current);

            mediaRecorderRef.current = new MediaRecorder(userMediaStream, { mimeType: 'audio/webm' });
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                setIsLoading(true);

                if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                    animationFrameIdRef.current = null;
                }
                 if (waveformCanvasRef.current) {
                    const canvasCtx = waveformCanvasRef.current.getContext('2d');
                    if (canvasCtx) {
                        canvasCtx.fillStyle = '#121417';
                        canvasCtx.fillRect(0, 0, waveformCanvasRef.current.width, waveformCanvasRef.current.height);
                    }
                }
                if (microphoneSourceRef.current) {
                    microphoneSourceRef.current.disconnect();
                    microphoneSourceRef.current = null;
                }
                
                // Ensure all tracks from the original userMediaStream are stopped
                if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
                     mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
                } else if (userMediaStream) { // Fallback if recorder stream is not available
                     userMediaStream.getTracks().forEach(track => track.stop());
                }


                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);

                if (audioBlob.size === 0) {
                    console.warn("音声Blobが空です。API呼び出しをスキップします。");
                    setIsLoading(false);
                    setError("音声データがキャプチャされませんでした。");
                    if (audioUrl) URL.revokeObjectURL(audioUrl);
                    return;
                }
                
                try {
                    const base64Audio = await blobToBase64(audioBlob);
                    
                    const audioPart = {
                        inlineData: {
                            mimeType: 'audio/webm',
                            data: base64Audio,
                        },
                    };
                    const textPart = {
                        text: `この音声を文字起こししてください。会話の各発言や重要なポイントを特定し、それぞれを "${NODE_BREAK_DELIMITER}" という文字列で区切って、明確に提示してください。例えば、「重要な提案です ${NODE_BREAK_DELIMITER} 次のステップについて説明します」のように区切ってください。`,
                    };

                    if (!aiRef.current) {
                        setError("AI SDKが利用できません。");
                        setIsLoading(false);
                        if (audioUrl) URL.revokeObjectURL(audioUrl);
                        return;
                    }
                    
                    const streamResponse = await aiRef.current.models.generateContentStream({
                        model: MODEL_NAME,
                        contents: { parts: [textPart, audioPart] },
                    });
                    
                    let currentFullText = "";
                    setTranscribedText(""); // Reset for streaming display
                    for await (const chunk of streamResponse) {
                        const chunkText = chunk && chunk.text ? chunk.text : "";
                        currentFullText += chunkText;
                        setTranscribedText(prev => prev + chunkText);
                    }

                    const rawNodesTexts = currentFullText.split(NODE_BREAK_DELIMITER);
                    const newNodes: Node[] = rawNodesTexts
                        .map(text => text.trim())
                        .filter(text => text.length > 0)
                        .map((text, index) => {
                            const node: Node = {
                                id: `node-${Date.now()}-${index}`,
                                text: text,
                                audioUrl: audioUrl, // All nodes share the same full audio for now
                            };
                            // Simple test: add icons based on keywords or index
                            if (index % 3 === 0 && text.length > 10) node.icons = ['lightbulb'];
                            if (text.toLowerCase().includes("重要") || text.toLowerCase().includes("ポイント")) node.icons = [...(node.icons || []), 'exclamation'];
                            return node;
                        });

                    if (newNodes.length > 0) {
                         setNodes(newNodes);
                    } else {
                        setError("AIから空の文字起こし結果が返却されました、または有効な区切りが見つかりませんでした。");
                        URL.revokeObjectURL(audioUrl); 
                    }

                } catch (apiError: any) {
                    console.error("Gemini APIエラー:", apiError);
                    setError(`音声の文字起こし中にエラーが発生しました: ${apiError.message || '不明なAPIエラー'}`);
                    if (audioUrl) URL.revokeObjectURL(audioUrl); 
                } finally {
                    setIsLoading(false);
                }
            };

            mediaRecorderRef.current.start(1000);
            setIsRecording(true);
            setTranscribedText("");
            visualizeWaveform(); 

        } catch (err: any) {
            console.error("録音開始エラー:", err);
            let userErrorMessage = "録音の開始に失敗しました。";
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                userErrorMessage += "マイクの使用が許可されていないようです。ブラウザの設定を確認してください。";
            } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                 userErrorMessage += "利用可能なマイクが見つかりませんでした。";
            } else {
                 userErrorMessage += "予期せぬエラーが発生しました。";
            }
            setError(userErrorMessage);
            setIsRecording(false);

            if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
                 mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
             if (microphoneSourceRef.current) {
                microphoneSourceRef.current.disconnect();
                microphoneSourceRef.current = null;
            }
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop(); // This will trigger onstop
            setIsRecording(false);
            // Stream tracks are stopped in onstop
        }
    };

    const toggleRecording = () => {
        if (currentAudioPlayerRef.current && !currentAudioPlayerRef.current.paused) {
            currentAudioPlayerRef.current.pause();
            currentAudioPlayerRef.current.currentTime = 0;
            setCurrentlyPlayingNodeId(null);
        }
        if (isRecording) {
            handleStopRecording();
        } else {
            handleStartRecording();
        }
    };

    const playAudio = (audioUrl: string, nodeId: string) => {
        if (currentAudioPlayerRef.current && !currentAudioPlayerRef.current.paused) {
            currentAudioPlayerRef.current.pause(); 
            if (currentlyPlayingNodeId === nodeId) { 
                setCurrentlyPlayingNodeId(null);
                return;
            }
        }
        
        const newAudio = new Audio(audioUrl);
        currentAudioPlayerRef.current = newAudio;
        newAudio.play()
            .then(() => setCurrentlyPlayingNodeId(nodeId))
            .catch(err => {
                console.error("音声再生エラー:", err);
                setError("音声の再生に失敗しました。");
                setCurrentlyPlayingNodeId(null);
            });
        
        const onEndOrPause = () => {
            if (currentAudioPlayerRef.current === newAudio) {
                 setCurrentlyPlayingNodeId(null);
            }
            newAudio.removeEventListener('ended', onEndOrPause);
            newAudio.removeEventListener('pause', onEndOrPause);
        };
        newAudio.addEventListener('ended', onEndOrPause);
        newAudio.addEventListener('pause', onEndOrPause);
    };
    
    useEffect(() => {
        // Cleanup function for the component
        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
                 mediaRecorderRef.current.stop();
            }
            // Ensure any active MediaStreamTracks are stopped
            if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
                mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
            if (microphoneSourceRef.current) {
                microphoneSourceRef.current.disconnect();
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(e => console.error("AudioContext close error:", e));
            }
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            if (currentAudioPlayerRef.current) {
                currentAudioPlayerRef.current.pause();
                currentAudioPlayerRef.current.src = ""; // Release the audio resource
                currentAudioPlayerRef.current = null;
            }
            // Revoke Object URLs for all nodes
            const uniqueAudioUrls = new Set(nodes.map(node => node.audioUrl).filter(Boolean));
            uniqueAudioUrls.forEach(url => {
                if (url && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [nodes]); // Re-run if nodes change to revoke old URLs if necessary (though primary revocation is for the shared URL)

    const handleZoomIn = () => {
        setScale(prevScale => Math.min(MAX_SCALE, prevScale + ZOOM_STEP));
    };

    const handleZoomOut = () => {
        setScale(prevScale => Math.max(MIN_SCALE, prevScale - ZOOM_STEP));
    };

    const isMaxZoom = () => parseFloat(scale.toFixed(2)) >= MAX_SCALE;
    const isMinZoom = () => parseFloat(scale.toFixed(2)) <= MIN_SCALE;

    const handlePanMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.button !== 0) return; 
        event.preventDefault();
        setIsPanning(true);
        panStartCoordsRef.current = { x: event.clientX, y: event.clientY };
        if (graphCanvasViewportRef.current) {
            graphCanvasViewportRef.current.style.cursor = 'grabbing';
        }
    };

    useEffect(() => {
        const handleWindowMouseMove = (event: MouseEvent) => {
            if (!isPanning) return;
            const dx = event.clientX - panStartCoordsRef.current.x;
            const dy = event.clientY - panStartCoordsRef.current.y;
            setPanOffset(prevOffset => ({
                x: prevOffset.x + dx / scale, 
                y: prevOffset.y + dy / scale,
            }));
            panStartCoordsRef.current = { x: event.clientX, y: event.clientY };
        };

        const handleWindowMouseUp = () => {
            if (isPanning) {
                setIsPanning(false);
                if (graphCanvasViewportRef.current) {
                    graphCanvasViewportRef.current.style.cursor = 'grab';
                }
            }
        };

        if (isPanning) {
            window.addEventListener('mousemove', handleWindowMouseMove);
            window.addEventListener('mouseup', handleWindowMouseUp);
        } else {
            if (graphCanvasViewportRef.current) { 
                 graphCanvasViewportRef.current.style.cursor = 'grab';
            }
        }

        return () => {
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
             if (graphCanvasViewportRef.current) {
                graphCanvasViewportRef.current.style.cursor = 'grab'; 
            }
        };
    }, [isPanning, scale]);

    const handleNodeClick = (nodeId: string) => {
        setSelectedNodeId(prevId => prevId === nodeId ? null : nodeId);
    };

    // ノードが更新されたときに依存関係を分析
    useEffect(() => {
        if (nodes.length < 2) {
            setDependencyEdges([]);
            return;
        }

        // ノード位置を計算（簡易版：横並び）
        const positions = new Map<string, NodePosition>();
        const nodeSpacing = 200;
        const nodeHeight = 60;
        const nodeWidth = 150;
        
        nodes.forEach((node, index) => {
            positions.set(node.id, {
                x: 50 + index * nodeSpacing,
                y: 100 + (index % 2) * 80, // ジグザグ配置
                width: nodeWidth,
                height: nodeHeight
            });
        });
        setNodePositions(positions);

        // 依存関係分析を実行
        const analyzer = new DependencyAnalyzer(nodes);
        const dependencies = analyzer.detectDependencies(nodes);
        
        console.log(`依存関係分析完了: ${dependencies.length}個のエッジを検出`);
        setDependencyEdges(dependencies);
    }, [nodes]);

    const renderNodeIcon = (iconType: 'exclamation' | 'lightbulb') => {
        switch (iconType) {
            case 'exclamation':
                return <span className="node-icon" role="img" aria-label="重要ポイント">❗</span>;
            case 'lightbulb':
                return <span className="node-icon" role="img" aria-label="アイデア・提案">💡</span>;
            default:
                return null;
        }
    };

    return (
        <div className="app-container">
            <div className="top-bar">
                <button 
                    className="hamburger-menu-button" 
                    aria-label="メニューを開く" 
                    title="メニュー (未実装)"
                    onClick={() => console.log("Hamburger menu clicked (no action yet)")}
                >
                    ☰
                </button>
                <span className="top-bar-title">トランスクリプト</span>
                <div className="top-bar-spacer"></div>
                <div className="zoom-controls">
                    <button 
                        onClick={handleZoomOut} 
                        disabled={isMinZoom()}
                        aria-label="ズームアウト" 
                        title="ズームアウト"
                    >-</button>
                    <button 
                        onClick={handleZoomIn}
                        disabled={isMaxZoom()}
                        aria-label="ズームイン" 
                        title="ズームイン"
                    >+</button>
                </div>
            </div>

            <div 
                ref={graphCanvasViewportRef}
                className="graph-canvas-viewport" 
                aria-live="polite"
                onMouseDown={handlePanMouseDown}
            >
                <div 
                    className="graph-canvas-content"
                    style={{ 
                        transform: `translateX(${panOffset.x}px) translateY(${panOffset.y}px) scale(${scale})`,
                    }}
                >
                    {error && <div className="error-message" role="alert">エラー: {error}</div>}
                    
                    {isLoading && transcribedText === "" && !nodes.length && <div className="loading-message node">音声処理中...</div>}
                    
                    {isLoading && transcribedText !== "" && !nodes.length && (
                         <div className="node streaming-node" role="article">
                            {transcribedText}
                            <span className="streaming-cursor"></span>
                        </div>
                    )}

                    {!isLoading && nodes.length === 0 && !error && (
                        <div className="placeholder-text">
                            マイクボタンをクリックして録音を開始してください。文字起こしされた内容はここに表示されます。
                        </div>
                    )}
                    {/* 依存関係エッジを表示 */}
                    {showDependencies && dependencyEdges.length > 0 && (
                        <div className="edge-container dependency-edge-group">
                            <svg width="3000" height="2000" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
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
                                            onHover={setHoveredEdgeId}
                                            isHovered={hoveredEdgeId === edge.id}
                                        />
                                    );
                                })}
                            </svg>
                        </div>
                    )}

                    {nodes.map((node) => {
                        const position = nodePositions.get(node.id);
                        return (
                            <div 
                                key={node.id} 
                                className={`node ${selectedNodeId === node.id ? 'selected' : ''}`} 
                                role="article"
                                onClick={() => handleNodeClick(node.id)}
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNodeClick(node.id);}}
                                style={position ? {
                                    left: `${position.x}px`,
                                    top: `${position.y}px`,
                                    position: 'absolute'
                                } : undefined}
                            >
                            {node.icons && node.icons.length > 0 && (
                                <div className="node-icon-container">
                                    {node.icons.map((icon, idx) => (
                                        <React.Fragment key={idx}>
                                            {renderNodeIcon(icon)}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                            <span className="node-text">{node.text}</span>
                            {node.audioUrl && (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); playAudio(node.audioUrl!, node.id); }}
                                    className={`play-button ${currentlyPlayingNodeId === node.id ? 'playing' : ''}`}
                                    aria-label={currentlyPlayingNodeId === node.id ? `音声「${node.id}」を停止` : `音声「${node.id}」を再生`}
                                    title={currentlyPlayingNodeId === node.id ? '停止' : '再生'}
                                >
                                    {currentlyPlayingNodeId === node.id ? '⏹️' : '▶️'}
                                </button>
                            )}
                        </div>
                        );
                    })}
                </div>
            </div>

            <div className="waveform-bar">
                <button
                    id="mic_toggle"
                    className={`mic-button ${isRecording ? 'active' : ''}`}
                    onClick={toggleRecording}
                    aria-label={isRecording ? "録音停止" : "録音開始"}
                    aria-pressed={isRecording}
                    disabled={isLoading || (!aiRef.current && !!API_KEY)} 
                >
                    {isRecording ? '停止' : '録音'}
                </button>
                <canvas ref={waveformCanvasRef} className="waveform-canvas" width="300" height="70"></canvas>
            </div>

            {/* 依存関係表示トグルボタン */}
            {nodes.length > 1 && (
                <button
                    className={`toggle-dependencies ${showDependencies ? 'active' : ''}`}
                    onClick={() => setShowDependencies(!showDependencies)}
                    aria-label={showDependencies ? "依存関係を非表示" : "依存関係を表示"}
                    title={showDependencies ? "依存関係を非表示" : "依存関係を表示"}
                >
                    {showDependencies ? '🔗 依存関係を非表示' : '🔗 依存関係を表示'}
                </button>
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
