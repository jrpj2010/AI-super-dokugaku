
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { DependencyAnalyzer } from './lib/dependencyAnalyzer';
import { ConversationAnalyzer, ConversationPattern, ThemeCluster } from './lib/conversationAnalyzer';
import { LayoutEngine, LayoutMode } from './lib/layoutEngine';
import { SRTParser } from './lib/srtParser';
import { DependencyEdgeComponent } from './components/DependencyEdge';
import { ThemeBlock, PatternMarker } from './components/ThemeBlock';
import { AccordionCluster } from './components/AccordionCluster';
import { LayoutModeSelector } from './components/LayoutModeSelector';
import { MiniMap } from './components/MiniMap';
import { FileUploader } from './components/FileUploader';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import ErrorBoundary from './components/ErrorBoundary';
import type { DependencyEdge } from './types/Dependency';
import type { NodePosition } from './types/UI';

// APIキーは.env.localファイルから読み込む（本番環境では適切に設定）
const API_KEY = 'AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI';  // Temporarily hardcoded
const MODEL_NAME = 'gemini-2.5-flash'; // Updated from preview model
const NODE_BREAK_DELIMITER = "---NODE_BREAK---";
const STREAMING_CHUNK_SIZE = 1000; // 1秒ごとのチャンク

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
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false);
    const [conversationPatterns, setConversationPatterns] = useState<ConversationPattern[]>([]);
    const [themeClusters, setThemeClusters] = useState<ThemeCluster[]>([]);
    const [showThemeBlocks, setShowThemeBlocks] = useState<boolean>(true);
    const [showPatternMarkers, setShowPatternMarkers] = useState<boolean>(true);
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('vertical');
    const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());
    const [manualNodePositions, setManualNodePositions] = useState<Map<string, NodePosition>>(new Map());
    const [detailLevel, setDetailLevel] = useState<number>(0.5); // 0-1 の詳細レベル
    const [layoutEngine] = useState(() => new LayoutEngine());
    
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const aiRef = useRef<GoogleGenAI | null>(null);
    const streamingIntervalRef = useRef<NodeJS.Timer | null>(null);
    const lastProcessedChunkRef = useRef<number>(0);
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

    // リアルタイムストリーミング処理
    const processStreamingChunk = useCallback(async () => {
        if (!aiRef.current || audioChunksRef.current.length === 0) return;
        
        // 新しいチャンクがない場合はスキップ
        if (lastProcessedChunkRef.current >= audioChunksRef.current.length) return;
        
        try {
            // 現在までの音声データを結合
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const base64Audio = await blobToBase64(audioBlob);
            
            const audioPart = {
                inlineData: {
                    mimeType: 'audio/webm',
                    data: base64Audio,
                },
            };
            const textPart = {
                text: `この音声を文字起こししてください。会話の各発言や重要なポイントを特定し、それぞれを "${NODE_BREAK_DELIMITER}" という文字列で区切って、明確に提示してください。`,
            };
            
            const streamResponse = await aiRef.current.models.generateContentStream({
                model: MODEL_NAME,
                contents: { parts: [textPart, audioPart] },
            });
            
            let currentFullText = "";
            for await (const chunk of streamResponse) {
                const chunkText = chunk && chunk.text ? chunk.text : "";
                currentFullText += chunkText;
            }
            
            // ノードを生成
            const rawNodesTexts = currentFullText.split(NODE_BREAK_DELIMITER);
            const newNodes: Node[] = rawNodesTexts
                .map(text => text.trim())
                .filter(text => text.length > 0)
                .map((text, index) => {
                    const node: Node = {
                        id: `node-${Date.now()}-${index}`,
                        text: text,
                    };
                    // アイコン追加
                    if (text.toLowerCase().includes("重要") || text.toLowerCase().includes("ポイント")) {
                        node.icons = ['exclamation'];
                    }
                    return node;
                });
            
            if (newNodes.length > 0) {
                setNodes(newNodes);
                setTranscribedText(currentFullText);
            }
            
            lastProcessedChunkRef.current = audioChunksRef.current.length;
        } catch (error) {
            console.error("ストリーミング処理エラー:", error);
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

    // 音声ファイルアップロード処理
    const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        
        // ファイル形式チェック
        const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/wav', 'audio/webm'];
        if (!validTypes.includes(file.type)) {
            setError('対応していないファイル形式です。MP3、M4A、WAV、WebMファイルをアップロードしてください。');
            return;
        }
        
        setUploadedFileName(file.name);
        setIsProcessingFile(true);
        setError(null);
        setNodes([]);
        setTranscribedText("");
        
        try {
            // ファイルをBlobとして読み込み
            const base64Audio = await blobToBase64(file);
            
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
1. 複数の話者がいる場合は、話者を識別して「話者1:」「話者2:」のように区別してください
2. 営業トークや商談の場合は、重要なポイントや決定事項を識別してください
3. 各発言や話題の転換点を "${NODE_BREAK_DELIMITER}" で区切ってください
4. 話者が変わるごとに必ず区切ってください
5. 重要な提案や決定事項には【重要】マークを付けてください`,
            };
            
            setIsLoading(true);
            const streamResponse = await aiRef.current.models.generateContentStream({
                model: MODEL_NAME,
                contents: { parts: [textPart, audioPart] },
            });
            
            let currentFullText = "";
            setTranscribedText("処理中...");
            
            for await (const chunk of streamResponse) {
                const chunkText = chunk && chunk.text ? chunk.text : "";
                currentFullText += chunkText;
                setTranscribedText(currentFullText);
            }
            
            // ノード生成（話者識別付き）
            const rawNodesTexts = currentFullText.split(NODE_BREAK_DELIMITER);
            const newNodes: Node[] = rawNodesTexts
                .map(text => text.trim())
                .filter(text => text.length > 0)
                .map((text, index) => {
                    const node: Node = {
                        id: `node-${Date.now()}-${index}`,
                        text: text,
                    };
                    
                    // アイコン設定
                    const icons: ('exclamation' | 'lightbulb')[] = [];
                    if (text.includes("【重要】") || text.includes("決定") || text.includes("合意")) {
                        icons.push('exclamation');
                    }
                    if (text.includes("提案") || text.includes("アイデア") || text.includes("検討")) {
                        icons.push('lightbulb');
                    }
                    if (icons.length > 0) {
                        node.icons = icons;
                    }
                    
                    return node;
                });
            
            if (newNodes.length > 0) {
                setNodes(newNodes);
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


    const handleStartRecording = useCallback(async () => {
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
                // ストリーミングで既に処理済みの場合はスキップ
                if (nodes.length > 0) {
                    setIsLoading(false);
                    return;
                }
                
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
            
            // リアルタイムストリーミング開始（2秒ごとに処理）
            lastProcessedChunkRef.current = 0;
            streamingIntervalRef.current = setInterval(() => {
                processStreamingChunk();
            }, 2000); 

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
    }, [processStreamingChunk, visualizeWaveform]);

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            // ストリーミングインターバルをクリア
            if (streamingIntervalRef.current) {
                clearInterval(streamingIntervalRef.current);
                streamingIntervalRef.current = null;
            }
            
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

    // ドラッグ&ドロップの処理
    const handleNodeMove = useCallback((nodeId: string, newPosition: { x: number; y: number }) => {
        setManualNodePositions(prev => {
            const updated = new Map(prev);
            const currentPos = nodePositions.get(nodeId);
            if (currentPos) {
                updated.set(nodeId, {
                    ...currentPos,
                    x: newPosition.x,
                    y: newPosition.y
                });
            }
            return updated;
        });
    }, [nodePositions]);

    const dragAndDrop = useDragAndDrop({
        onNodeMove: handleNodeMove,
        scale
    });

    // グローバルドラッグイベントリスナーの管理
    useEffect(() => {
        const cleanup = dragAndDrop.attachGlobalListeners();
        return cleanup;
    }, [dragAndDrop]);

    // クラスター展開・収束の処理
    const handleClusterToggle = useCallback((clusterId: string, expanded: boolean) => {
        setExpandedClusters(prev => {
            const updated = new Set(prev);
            if (expanded) {
                updated.add(clusterId);
            } else {
                updated.delete(clusterId);
            }
            return updated;
        });
    }, []);

    // レイアウトモード変更の処理
    const handleLayoutModeChange = useCallback((newMode: LayoutMode) => {
        setLayoutMode(newMode);
        // 手動調整をリセット（必要に応じて）
        // setManualNodePositions(new Map());
    }, []);

    // SRTファイルからのノード生成処理
    const handleTextFileUpload = useCallback((newNodes: Array<{id: string, text: string}>, filename: string) => {
        try {
            setError(null);
            setIsProcessingFile(true);
            setUploadedFileName(filename);
            
            console.log(`SRTファイル処理開始: ${filename}, ${newNodes.length}ノード`);
            
            // ノードを設定
            setNodes(newNodes);
            setTranscribedText(""); // 音声からの文字起こしテキストをクリア
            
            console.log(`SRTファイル処理完了: ${newNodes.length}ノードを生成`);
        } catch (error) {
            console.error('SRTファイル処理エラー:', error);
            setError(`SRTファイル処理エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
        } finally {
            setIsProcessingFile(false);
        }
    }, []);

    // エラーハンドリング強化
    const handleError = useCallback((error: Error, context: string) => {
        console.error(`${context}でエラー:`, error);
        setError(`${context}: ${error.message}`);
        setIsLoading(false);
        setIsProcessingFile(false);
    }, []);

    // 安全なコンポーネント描画のためのtry-catch wrapper
    const safeRender = useCallback((renderFunction: () => React.ReactNode, fallback: React.ReactNode = null) => {
        try {
            return renderFunction();
        } catch (error) {
            console.error('コンポーネント描画エラー:', error);
            return fallback;
        }
    }, []);

    // ノードが更新されたときに依存関係を分析
    useEffect(() => {
        if (nodes.length < 2) {
            setDependencyEdges([]);
            setConversationPatterns([]);
            setThemeClusters([]);
            return;
        }

        try {
            // レイアウトエンジンを使用してノード位置を計算
            const positions = layoutEngine.calculateLayout(
                nodes,
                themeClusters, // 既存のクラスターを使用
                layoutMode,
                manualNodePositions
            );
            setNodePositions(positions);
            
            console.log(`レイアウト計算完了: ${layoutMode}モード、${positions.size}ノード配置`);

            // 会話構造分析を実行
            const conversationAnalyzer = new ConversationAnalyzer(nodes);
            const patterns = conversationAnalyzer.analyzeConversationPatterns();
            const clusters = conversationAnalyzer.generateThemeClusters();
            
            console.log(`会話パターン分析完了: ${patterns.length}個のパターンを検出`);
            console.log(`テーマクラスター分析完了: ${clusters.length}個のテーマを検出`);
            
            setConversationPatterns(patterns);
            setThemeClusters(clusters);
        
        // 従来の依存関係分析も並行実行
        const dependencyAnalyzer = new DependencyAnalyzer(nodes);
        dependencyAnalyzer.setSimilarityThreshold(0.25);
        const basicDependencies = dependencyAnalyzer.detectDependencies(nodes);
        
        // 会話パターンを依存関係エッジに変換
        const structuredEdges: DependencyEdge[] = [];
        
        // 質問→回答エッジ
        patterns
            .filter(p => p.type === 'question')
            .forEach(pattern => {
                structuredEdges.push({
                    id: `qa-${pattern.nodeId}-${pattern.relatedNodeIds[0]}`,
                    sourceNodeId: pattern.nodeId,
                    targetNodeId: pattern.relatedNodeIds[0],
                    type: 'question_answer',
                    keywords: pattern.keywords,
                    strength: pattern.strength,
                    description: pattern.description
                });
            });
        
        // 伏線→回収エッジ
        patterns
            .filter(p => p.type === 'foreshadowing')
            .forEach(pattern => {
                structuredEdges.push({
                    id: `foreshadow-${pattern.nodeId}-${pattern.relatedNodeIds[0]}`,
                    sourceNodeId: pattern.nodeId,
                    targetNodeId: pattern.relatedNodeIds[0],
                    type: 'foreshadowing',
                    keywords: pattern.keywords,
                    strength: pattern.strength,
                    description: pattern.description
                });
            });
        
        // テーマ関連エッジ（クラスター内ノード間）
        clusters.forEach(cluster => {
            for (let i = 0; i < cluster.nodeIds.length - 1; i++) {
                for (let j = i + 1; j < cluster.nodeIds.length; j++) {
                    const sourceId = cluster.nodeIds[i];
                    const targetId = cluster.nodeIds[j];
                    
                    // 既存のエッジと重複チェック
                    const hasExisting = structuredEdges.some(edge => 
                        (edge.sourceNodeId === sourceId && edge.targetNodeId === targetId) ||
                        (edge.sourceNodeId === targetId && edge.targetNodeId === sourceId)
                    );
                    
                    if (!hasExisting) {
                        structuredEdges.push({
                            id: `theme-${sourceId}-${targetId}`,
                            sourceNodeId: sourceId,
                            targetNodeId: targetId,
                            type: 'theme_relation',
                            keywords: cluster.keywords,
                            strength: 0.5,
                            description: `${cluster.name}テーマ`
                        });
                    }
                }
            }
        });
        
        // 基本的な依存関係エッジも追加（重複回避）
        basicDependencies.forEach(dep => {
            const hasExisting = structuredEdges.some(edge => 
                (edge.sourceNodeId === dep.sourceNodeId && edge.targetNodeId === dep.targetNodeId) ||
                (edge.sourceNodeId === dep.targetNodeId && edge.targetNodeId === dep.sourceNodeId)
            );
            
            if (!hasExisting && dep.strength > 0.3) {
                structuredEdges.push(dep);
            }
        });
        
        // 強度でソートして上位30個に制限
        const finalEdges = structuredEdges
            .sort((a, b) => b.strength - a.strength)
            .slice(0, 30);
        
        console.log(`最終エッジ数: ${finalEdges.length}個（構造化: ${structuredEdges.length - basicDependencies.length}個、基本: ${basicDependencies.filter(d => d.strength > 0.3).length}個）`);
        setDependencyEdges(finalEdges);
        
        } catch (error) {
            console.error('依存関係分析エラー:', error);
            handleError(error instanceof Error ? error : new Error('不明な分析エラー'), '依存関係分析');
            // 分析エラーが発生しても基本的な表示は続行
            setDependencyEdges([]);
            setConversationPatterns([]);
            setThemeClusters([]);
        }
    }, [nodes, layoutMode, manualNodePositions, layoutEngine, handleError]);

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
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-logo">T</div>
                <nav className="sidebar-nav">
                    <div className="sidebar-nav-item active" title="Transcript">📝</div>
                    <div className="sidebar-nav-item" title="Analytics">📊</div>
                    <div className="sidebar-nav-item" title="Settings">⚙️</div>
                </nav>
            </div>
            
            {/* Main Content */}
            <div className="main-content">
                <div className="top-bar">
                    <span className="top-bar-title">TRANSCRIPT</span>
                    <span className="version-badge">v0.0.8</span>
                    <div className="top-bar-spacer"></div>
                    <div className="zoom-controls">
                        <span className="zoom-level">{Math.round(scale * 100)}%</span>
                        <button 
                            onClick={handleZoomOut} 
                            disabled={isMinZoom()}
                            aria-label="ズームアウト" 
                            title="ズームアウト"
                        >−</button>
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
                            🎙️ マイクボタンをクリックして録音を開始<br/>
                            または<br/>
                            📁 音声ファイルをアップロード<br/>
                            <span style={{fontSize: '14px', color: '#4b5563', marginTop: '8px', display: 'block'}}>
                                対応形式：MP3、M4A、WAV、WebM（最大8分程度）
                            </span>
                        </div>
                    )}
                    {/* SVG Definitions for Gradients */}
                    <svg className="svg-defs" style={{ position: 'absolute', width: 0, height: 0 }}>
                        <defs>
                            {/* 基本グラデーション */}
                            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                            </linearGradient>
                            <linearGradient id="edge-gradient-time" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6b7280" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.6" />
                            </linearGradient>
                            
                            {/* 新しいグラデーション */}
                            <linearGradient id="foreshadow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="callback-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="qa-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="theme-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                            </linearGradient>
                            
                            {/* 矢印マーカー */}
                            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" opacity="0.8" />
                            </marker>
                            <marker id="arrowhead-time" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#6b7280" opacity="0.6" />
                            </marker>
                            
                            {/* フィルター */}
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                    </svg>
                    
                    {/* テーマブロックを表示 */}
                    {showThemeBlocks && themeClusters.map(cluster => {
                        // クラスター内のノード位置から境界を計算
                        const clusterNodePositions = cluster.nodeIds
                            .map(nodeId => nodePositions.get(nodeId))
                            .filter(pos => pos !== undefined);
                        
                        if (clusterNodePositions.length === 0) return null;
                        
                        const minX = Math.min(...clusterNodePositions.map(p => p.x));
                        const maxX = Math.max(...clusterNodePositions.map(p => p.x + p.width));
                        const minY = Math.min(...clusterNodePositions.map(p => p.y));
                        const maxY = Math.max(...clusterNodePositions.map(p => p.y + p.height));
                        
                        return (
                            <ThemeBlock
                                key={cluster.id}
                                cluster={cluster}
                                position={{
                                    x: minX,
                                    y: minY,
                                    width: maxX - minX,
                                    height: maxY - minY
                                }}
                                isVisible={cluster.nodeIds.length >= 2}
                            />
                        );
                    })}
                    
                    {/* パターンマーカーを表示 */}
                    {showPatternMarkers && conversationPatterns.map(pattern => {
                        const nodePos = nodePositions.get(pattern.nodeId);
                        if (!nodePos) return null;
                        
                        return (
                            <PatternMarker
                                key={pattern.id}
                                type={pattern.type}
                                position={{
                                    x: nodePos.x + nodePos.width - 12,
                                    y: nodePos.y - 12
                                }}
                                description={pattern.description}
                            />
                        );
                    })}
                    
                    {/* 依存関係エッジを表示 */}
                    {showDependencies && dependencyEdges.length > 0 && (
                        <div className="edge-container dependency-edge-group">
                            <svg width="3000" height="2000" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}>
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

                    {/* アコーディオンクラスターまたはテーマブロックの表示 */}
                    {detailLevel < 0.7 ? (
                        // 低詳細レベル: アコーディオンクラスター表示
                        <ErrorBoundary>
                            {themeClusters.map(cluster => (
                                <AccordionCluster
                                    key={cluster.id}
                                    cluster={cluster}
                                    nodes={nodes}
                                    nodePositions={nodePositions}
                                    onNodeClick={handleNodeClick}
                                    selectedNodeId={selectedNodeId}
                                    onClusterToggle={handleClusterToggle}
                                    isExpanded={expandedClusters.has(cluster.id)}
                                    currentlyPlayingNodeId={currentlyPlayingNodeId}
                                    onPlayAudio={(audioUrl: string, nodeId: string) => {
                                        // プレースホルダー: 音声再生機能
                                        console.log(`音声再生: ${nodeId}`);
                                    }}
                                />
                            ))}
                        </ErrorBoundary>
                    ) : (
                        // 高詳細レベル: 個別ノード表示
                        nodes
                            .filter(node => {
                                // 展開されていないクラスターのノードは非表示
                                const cluster = themeClusters.find(c => c.nodeIds.includes(node.id));
                                return !cluster || expandedClusters.has(cluster.id);
                            })
                            .map((node) => {
                                const position = nodePositions.get(node.id);
                                const isDragging = dragAndDrop.isDraggingNode(node.id);
                                
                                return (
                                    <div 
                                        key={node.id} 
                                        className={`node ${selectedNodeId === node.id ? 'selected' : ''} ${node.text.includes('話者1') || node.text.includes('話者１') ? 'speaker-1' : 'speaker-2'} ${isDragging ? 'dragging' : ''}`} 
                                        role="article"
                                        onClick={() => handleNodeClick(node.id)}
                                        onMouseDown={(e) => position && dragAndDrop.handleMouseDown(e, node.id, position)}
                                        tabIndex={0}
                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleNodeClick(node.id);}}
                                        style={position ? {
                                            left: `${position.x}px`,
                                            top: `${position.y}px`,
                                            position: 'absolute',
                                            cursor: isDragging ? 'grabbing' : 'grab',
                                            zIndex: isDragging ? 1000 : 'auto',
                                            opacity: isDragging ? 0.8 : 1
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
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                console.log(`音声再生: ${node.id}`);
                                            }}
                                            className={`play-button ${currentlyPlayingNodeId === node.id ? 'playing' : ''}`}
                                            aria-label={currentlyPlayingNodeId === node.id ? `音声「${node.id}」を停止` : `音声「${node.id}」を再生`}
                                            title={currentlyPlayingNodeId === node.id ? '停止' : '再生'}
                                        >
                                            {currentlyPlayingNodeId === node.id ? '⏹️' : '▶️'}
                                        </button>
                                    )}
                                </div>
                                );
                            })
                    )}
                    </div>
                </div>

                <div className="waveform-bar">
                <button
                    id="mic_toggle"
                    className={`mic-button ${isRecording ? 'active' : ''}`}
                    onClick={toggleRecording}
                    aria-label={isRecording ? "録音停止" : "録音開始"}
                    aria-pressed={isRecording}
                    disabled={isLoading || isProcessingFile || (!aiRef.current && !!API_KEY)} 
                >
                    {isRecording ? '⏹️' : '🎤'}
                </button>
                
                {/* ファイルアップロード（音声・テキスト対応） */}
                <ErrorBoundary>
                    <FileUploader
                        onAudioFile={(file, filename) => {
                            // 音声ファイルアップロードのハンドリング
                            setUploadedFileName(filename);
                            setIsProcessingFile(true);
                            setError(null);
                            setNodes([]);
                            setTranscribedText("");
                            handleFileUpload({ target: { files: [file] } } as any);
                        }}
                        onTextFile={handleTextFileUpload}
                        disabled={isRecording || isLoading || isProcessingFile}
                        isProcessing={isProcessingFile}
                        uploadedFileName={uploadedFileName}
                    />
                </ErrorBoundary>
                
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
            
            {/* Control Panel */}
            {nodes.length > 0 && (
                <div className="control-panel">
                    <div className="control-panel-header">
                        <h3 className="control-panel-title">Pietite Graph</h3>
                        <button className="control-panel-close">×</button>
                    </div>
                    <div className="zoom-controls-panel">
                        <div className="zoom-label">Zoom</div>
                        <input 
                            type="range" 
                            className="zoom-slider"
                            min="10" 
                            max="200" 
                            value={scale * 100}
                            onChange={(e) => setScale(parseInt(e.target.value) / 100)}
                        />
                    </div>
                    {/* レイアウトモード選択 */}
                    <div style={{ marginBottom: '20px' }}>
                        <LayoutModeSelector
                            currentMode={layoutMode}
                            onModeChange={handleLayoutModeChange}
                        />
                    </div>

                    {/* 詳細レベル制御 */}
                    <div className="detail-level-control" style={{ marginBottom: '20px' }}>
                        <div className="info-label">詳細レベル</div>
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.1"
                            value={detailLevel}
                            onChange={(e) => setDetailLevel(parseFloat(e.target.value))}
                            className="zoom-slider"
                        />
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                            {detailLevel < 0.3 ? 'クラスター概要' : detailLevel < 0.7 ? 'アコーディオン' : '個別ノード'}
                        </div>
                    </div>

                    {/* ミニマップ */}
                    {nodePositions.size > 0 && (
                        <ErrorBoundary>
                            <div style={{ marginBottom: '20px' }}>
                                <MiniMap
                                    nodes={nodes}
                                    nodePositions={nodePositions}
                                    themeClusters={themeClusters}
                                    viewportBounds={{
                                        x: -panOffset.x,
                                        y: -panOffset.y,
                                        width: window.innerWidth,
                                        height: window.innerHeight
                                    }}
                                    onViewportChange={(x, y) => setPanOffset({ x: -x, y: -y })}
                                    scale={scale}
                                />
                            </div>
                        </ErrorBoundary>
                    )}

                    {/* 表示オプション */}
                    <div className="display-options">
                        <div className="info-label">表示オプション</div>
                        <label className="option-toggle">
                            <input 
                                type="checkbox" 
                                checked={showDependencies}
                                onChange={(e) => setShowDependencies(e.target.checked)}
                            />
                            <span>依存関係エッジ</span>
                        </label>
                        <label className="option-toggle">
                            <input 
                                type="checkbox" 
                                checked={showThemeBlocks}
                                onChange={(e) => setShowThemeBlocks(e.target.checked)}
                            />
                            <span>テーマブロック</span>
                        </label>
                        <label className="option-toggle">
                            <input 
                                type="checkbox" 
                                checked={showPatternMarkers}
                                onChange={(e) => setShowPatternMarkers(e.target.checked)}
                            />
                            <span>会話パターン</span>
                        </label>
                    </div>

                    <div className="conversation-info">
                        <div className="info-label">分析結果</div>
                        <div className="info-value">{nodes.length} ノード</div>
                        <div className="info-value">{dependencyEdges.length} エッジ</div>
                        <div className="info-value">{themeClusters.length} テーマ</div>
                        <div className="info-value">{conversationPatterns.length} パターン</div>
                        <div className="info-value">
                            {expandedClusters.size}/{themeClusters.length} 展開済み
                        </div>
                    </div>
                </div>
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
