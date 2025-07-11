import { useState, useEffect, useRef, useCallback } from 'react';
import { useFileStore } from './store/fileStore';
import { FileExplorer } from './components/FileExplorer';
import { Preview } from './components/Preview';
import { ShareDialog } from './components/ShareDialog';
import { VoiceInput } from './components/VoiceInput';
import { TranscriptPreview } from './components/TranscriptPreview';
import { LoadingAnimation, AnimationType } from './components/LoadingAnimation';
import { DebugWindow } from './components/DebugWindow';
import { Header } from './components/Header';
import { MetadataPanel } from './components/MetadataPanel';
import { useVoiceRecording } from './hooks/useVoiceRecording';
import { useChunkedRecording } from './hooks/useChunkedRecording';
import { ConversionType } from './services/gemini/markdown-converter';
import { getTranscriptionService } from './services/gemini/voice-transcription';
import { StreamingMarkdown } from './components/StreamingMarkdown';
import { SettingsModal } from './components/Settings/SettingsModal';
import { VoiceInputPanel } from './components/VoiceInputPanel';
import { VoiceInsertOptions } from './components/VoiceInsertOptions';
import { generateSRTFromText, downloadSRT, downloadAudio, downloadMarkdown } from './services/srt-generator';
import type { FileItem } from './types';
import { RecordingState } from './types/audio';
import { debounce } from './utils/debounce';
import './styles/mobile-voice.css';

function App() {
  const {
    files,
    selectedFileId,
    editContent,
    selectFile,
    removeFile,
    setEditContent,
    saveCurrentFile,
    createNewFile,
    renameFile,
    setFiles,
    setDirectoryHandle,
    voiceSession,
    startVoiceRecording,
    stopVoiceRecording,
    updateTranscript,
    updateGeneratedMarkdown,
    updateAudioLevel,
    createFileFromVoice,
    appendToCurrentFile,
    resetVoiceSession,
    updateFile,
    addFile
  } = useFileStore();
  
  // ビューモードの状態管理（ローカルステート）
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  
  // エディタ内容の一元管理（最重要）
  const [editorContent, setEditorContent] = useState<string>('');

  const [showShareDialog, setShowShareDialog] = useState(false);
  const [voiceProcessingState, setVoiceProcessingState] = useState<'idle' | 'recording' | 'processing' | 'converting'>('idle');
  const [useChunkedMode, setUseChunkedMode] = useState(true); // チャンクモードを有効化
  const [streamingMarkdown, setStreamingMarkdown] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false); // 設定モーダル表示
  const [showVoicePanel, setShowVoicePanel] = useState(false); // 音声入力パネル表示
  const [realtimeTranscript, setRealtimeTranscript] = useState(''); // リアルタイムトランスクリプト
  const [showVoicePreview, setShowVoicePreview] = useState(false); // 音声プレビュー表示
  const [finalTranscript, setFinalTranscript] = useState(''); // 最終トランスクリプト保存用
  const [generatedSRT, setGeneratedSRT] = useState(''); // 生成されたSRT字幕
  const [currentRecordingBlob, setCurrentRecordingBlob] = useState<Blob | undefined>(); // 現在の録音データ
  const [isSaving, setIsSaving] = useState(false); // 保存状態のインジケーター
  const [selectedText, setSelectedText] = useState(''); // エディタで選択されたテキスト
  const [showInsertOptions, setShowInsertOptions] = useState(false); // 音声挿入オプション表示
  const [pendingVoiceText, setPendingVoiceText] = useState(''); // 挿入待ちの音声テキスト
  const [isAnalyzing, setIsAnalyzing] = useState(false); // AI議事録生成中の状態
  const [isGeneratingMeetingNotes, setIsGeneratingMeetingNotes] = useState(false); // 音声議事録生成中
  
  // Promiseベースの音声認識結果を格納
  const voiceInputResolveRef = useRef<((text: string | null) => void) | null>(null);
  
  const selectedFile = files.find(f => f.id === selectedFileId);
  
  // ファイル選択時にエディタ内容を同期
  useEffect(() => {
    if (selectedFile) {
      setEditorContent(selectedFile.content);
    }
  }, [selectedFileId, selectedFile?.content]);
  
  // 音声録音用の新規ファイルID
  const voiceFileIdRef = useRef<string | null>(null);

  // 録音時間のフォーマット
  const formatRecordingTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // キーボードショートカット
  // 音声録音フック
  const {
    isRecording,
    recordingState,
    audioLevel,
    recordingDuration,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    audioBlob
  } = useVoiceRecording({
    onError: (error) => {
      console.error('録音エラー:', error);
      alert(`録音エラー: ${error.message}`);
      (window as any).debugLog?.(`録音エラー: ${error.message}`, 'error');
    }
  });


  // チャンク録音フック
  const {
    chunks,
    isChunkedRecording,
    totalTranscript,
    startChunkedRecording,
    stopChunkedRecording,
    clearChunks,
    recordingDuration: chunkedRecordingDuration,
    audioLevel: chunkedAudioLevel,
    audioBlob: chunkedAudioBlob
  } = useChunkedRecording({
    chunkDuration: 300000, // 5分
    onChunkTranscribed: async (chunkId, transcript) => {
      (window as any).debugLog?.(`チャンク転写完了: ${chunkId}`, 'info');
      
      // リアルタイムでMarkdown変換
      try {
        const { convertTextToMarkdown } = await import('./services/gemini/markdown-converter');
        const response = await convertTextToMarkdown(transcript, ConversionType.MEETING_NOTES);
        const markdown = response.markdown;
        setStreamingMarkdown(prev => prev + '\n\n' + markdown);
        
        // ファイルに追記
        if (voiceFileIdRef.current) {
          const currentFile = files.find(f => f.id === voiceFileIdRef.current);
          if (currentFile) {
            const newContent = currentFile.content + '\n\n' + markdown;
            updateFile(voiceFileIdRef.current, { content: newContent });
          }
        }
      } catch (error: any) {
        (window as any).debugLog?.(`Markdown変換エラー: ${error.message}`, 'error');
      }
    },
    onError: (error) => {
      (window as any).debugLog?.(`チャンク録音エラー: ${error.message}`, 'error');
    }
  });

  // 音声録音開始ハンドラー
  const handleVoiceRecordingStart = async () => {
    if (useChunkedMode) {
      // チャンクモード
      if (!isChunkedRecording) {
        (window as any).debugLog?.('チャンク録音モードで開始します', 'info');
        
        // 新規ファイルを作成
        const now = new Date();
        const fileName = `音声メモ_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.md`;
        const newFileId = await createNewFile(fileName);
        voiceFileIdRef.current = newFileId;
        selectFile(newFileId);
        
        // ファイルに初期コンテンツを設定
        const initialContent = `# 音声メモ\n\n録音開始: ${now.toLocaleString('ja-JP')}\n\n---\n\n`;
        updateFile(newFileId, { content: initialContent });
        
        setStreamingMarkdown(''); // リセット
        clearChunks();
        startVoiceRecording();
        startChunkedRecording();
      }
    } else {
      // 通常モード
      if (!voiceSession.isRecording) {
        (window as any).debugLog?.('音声録音を開始します', 'info');
        
        // 新規ファイルを作成
        const now = new Date();
        const fileName = `音声メモ_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.md`;
        const newFileId = await createNewFile(fileName);
        voiceFileIdRef.current = newFileId;
        selectFile(newFileId);
        
        startVoiceRecording();
        startRecording();
      }
    }
  };

  // Promiseベースの音声入力パネル表示関数
  const showAIPanel = (): Promise<string | null> => {
    return new Promise((resolve) => {
      voiceInputResolveRef.current = resolve;
      setShowVoicePanel(true);
    });
  };

  // 音声入力ハンドラー（新設計）
  const handleVoiceInput = async () => {
    try {
      const transcriptText = await showAIPanel();
      
      if (transcriptText) {
        (window as any).debugLog?.(`音声認識結果を受信: ${transcriptText.length}文字`, 'info');
        
        // エディタがアクティブであることを確認
        if (!selectedFile) {
          alert('ファイルを選択してから音声入力を開始してください。');
          return;
        }
        
        // エディタモードに切り替え
        setViewMode('editor');
        
        // 挿入オプションを表示
        setPendingVoiceText(transcriptText);
        setShowInsertOptions(true);
        
        (window as any).debugLog?.('音声認識結果の挿入オプションを表示しました', 'info');
      }
    } catch (error: any) {
      (window as any).debugLog?.(`音声入力エラー: ${error.message}`, 'error');
    }
  };

  // 音声認識完了ハンドラー（AIパネルから呼ばれる）
  const handleVoiceComplete = () => {
    if (voiceInputResolveRef.current && finalTranscript) {
      voiceInputResolveRef.current(finalTranscript);
      voiceInputResolveRef.current = null;
    }
    
    // パネルを閉じる
    setShowVoicePanel(false);
    setShowVoicePreview(false);
    
    // 状態をリセット
    setVoiceProcessingState('idle');
    resetVoiceSession();
    setGeneratedSRT('');
  };

  // 音声入力キャンセルハンドラー
  const handleVoiceCancel = () => {
    if (voiceInputResolveRef.current) {
      voiceInputResolveRef.current(null);
      voiceInputResolveRef.current = null;
    }
    
    setShowVoicePanel(false);
    setShowVoicePreview(false);
    setVoiceProcessingState('idle');
    resetVoiceSession();
  };

  // AI議事録生成ハンドラー
  const handleAIGenerate = async () => {
    if (!selectedText.trim()) {
      alert('テキストを選択してから議事録生成を実行してください。');
      return;
    }

    setIsAnalyzing(true); // ローディング状態開始
    
    try {
      (window as any).debugLog?.(`AI議事録生成開始: ${selectedText.length}文字`, 'info');
      
      // AI分析APIを呼び出し
      const { convertTextToMarkdown } = await import('./services/gemini/markdown-converter');
      const response = await convertTextToMarkdown(selectedText, ConversionType.MEETING_NOTES);
      const generatedMarkdown = response.markdown;
      
      // 選択範囲を生成されたマークダウンで置き換え
      const beforeSelection = editorContent.substring(0, editorContent.indexOf(selectedText));
      const afterSelection = editorContent.substring(editorContent.indexOf(selectedText) + selectedText.length);
      const newContent = beforeSelection + generatedMarkdown + afterSelection;
      
      setEditorContent(newContent);
      setEditContent(newContent);
      setSelectedText(''); // 選択解除
      
      (window as any).debugLog?.('AI議事録生成完了', 'success');
      
    } catch (error: any) {
      (window as any).debugLog?.(`AI議事録生成エラー: ${error.message}`, 'error');
      alert(`AI議事録生成中にエラーが発生しました: ${error.message}`);
    } finally {
      setIsAnalyzing(false); // ローディング状態終了（必ず実行）
    }
  };

  // エディタの選択テキスト変更ハンドラー
  const handleSelectionChange = (text: string) => {
    setSelectedText(text);
  };

  // 音声挿入オプションハンドラー
  const handleInsertAtCursor = () => {
    if (pendingVoiceText && selectedFile) {
      // Preview.tsxのinsertAtCursor関数を呼び出す
      if ((window as any)._insertAtCursor) {
        (window as any)._insertAtCursor(pendingVoiceText);
        (window as any).debugLog?.('音声認識結果をカーソル位置に挿入しました', 'success');
      } else {
        // フォールバック: 末尾に追加
        const newContent = editorContent + (editorContent ? '\n\n' : '') + pendingVoiceText;
        setEditorContent(newContent);
        setEditContent(newContent);
        (window as any).debugLog?.('音声認識結果を末尾に追加しました（フォールバック）', 'info');
      }
    }
    setShowInsertOptions(false);
    setPendingVoiceText('');
  };

  const handleReplaceAll = () => {
    if (pendingVoiceText && selectedFile) {
      setEditorContent(pendingVoiceText);
      setEditContent(pendingVoiceText);
      
      (window as any).debugLog?.('エディタ内容を音声認識結果で置き換えました', 'success');
    }
    setShowInsertOptions(false);
    setPendingVoiceText('');
  };

  const handleInsertCancel = () => {
    (window as any).debugLog?.('音声認識結果の挿入をキャンセルしました', 'info');
    setShowInsertOptions(false);
    setPendingVoiceText('');
  };

  // 議事録生成ハンドラー（カーソル位置）
  const handleMeetingNotesAtCursor = async () => {
    if (!pendingVoiceText || !selectedFile) return;
    
    setIsGeneratingMeetingNotes(true);
    
    try {
      (window as any).debugLog?.(`音声議事録生成開始（カーソル位置）: ${pendingVoiceText.length}文字`, 'info');
      
      // AI分析APIを呼び出し
      const { convertTextToMarkdown } = await import('./services/gemini/markdown-converter');
      const response = await convertTextToMarkdown(pendingVoiceText, ConversionType.MEETING_NOTES);
      const generatedMarkdown = response.markdown;
      
      // カーソル位置に挿入
      if ((window as any)._insertAtCursor) {
        (window as any)._insertAtCursor(generatedMarkdown);
        (window as any).debugLog?.('音声議事録をカーソル位置に挿入しました', 'success');
      } else {
        // フォールバック: 末尾に追加
        const newContent = editorContent + (editorContent ? '\n\n' : '') + generatedMarkdown;
        setEditorContent(newContent);
        setEditContent(newContent);
        (window as any).debugLog?.('音声議事録を末尾に追加しました（フォールバック）', 'info');
      }
      
      setShowInsertOptions(false);
      setPendingVoiceText('');
      
    } catch (error: any) {
      (window as any).debugLog?.(`音声議事録生成エラー: ${error.message}`, 'error');
      alert(`議事録生成中にエラーが発生しました: ${error.message}`);
    } finally {
      setIsGeneratingMeetingNotes(false);
    }
  };

  // 議事録生成ハンドラー（全文置換）
  const handleMeetingNotesReplaceAll = async () => {
    if (!pendingVoiceText || !selectedFile) return;
    
    setIsGeneratingMeetingNotes(true);
    
    try {
      (window as any).debugLog?.(`音声議事録生成開始（全文置換）: ${pendingVoiceText.length}文字`, 'info');
      
      // AI分析APIを呼び出し
      const { convertTextToMarkdown } = await import('./services/gemini/markdown-converter');
      const response = await convertTextToMarkdown(pendingVoiceText, ConversionType.MEETING_NOTES);
      const generatedMarkdown = response.markdown;
      
      // 全文を置き換え
      setEditorContent(generatedMarkdown);
      setEditContent(generatedMarkdown);
      
      setShowInsertOptions(false);
      setPendingVoiceText('');
      
      (window as any).debugLog?.('音声議事録で全文を置き換えました', 'success');
      
    } catch (error: any) {
      (window as any).debugLog?.(`音声議事録生成エラー: ${error.message}`, 'error');
      alert(`議事録生成中にエラーが発生しました: ${error.message}`);
    } finally {
      setIsGeneratingMeetingNotes(false);
    }
  };

  // ダウンロードハンドラー
  const handleDownloadAudio = () => {
    if (currentRecordingBlob) {
      const fileName = `音声録音_${new Date().toISOString().replace(/[:.]/g, '-')}.webm`;
      downloadAudio(currentRecordingBlob, fileName);
      (window as any).debugLog?.('音声ファイルをダウンロードしました', 'success');
    }
  };

  const handleDownloadSRT = () => {
    if (generatedSRT) {
      const fileName = `字幕_${new Date().toISOString().replace(/[:.]/g, '-')}.srt`;
      downloadSRT(generatedSRT, fileName);
      (window as any).debugLog?.('字幕ファイルをダウンロードしました', 'success');
    }
  };

  const handleDownloadMarkdown = () => {
    if (selectedFile) {
      const content = viewMode === 'editor' ? editContent : selectedFile.content;
      const fileName = selectedFile.name || 'document.md';
      downloadMarkdown(content, fileName);
      (window as any).debugLog?.('Markdownファイルをダウンロードしました', 'success');
    }
  };

  // 音声録音停止ハンドラー
  const handleVoiceRecordingStop = async () => {
    console.log('handleVoiceRecordingStop called', {
      useChunkedMode,
      isChunkedRecording,
      voiceSessionIsRecording: voiceSession.isRecording,
      isRecording
    });
    (window as any).debugLog?.('停止ボタンがクリックされました', 'info');
    
    if (useChunkedMode) {
      // チャンクモード
      if (isChunkedRecording) {
        (window as any).debugLog?.('チャンク録音を停止します', 'info');
        stopVoiceRecording();
        stopChunkedRecording();
        const transcript = totalTranscript || realtimeTranscript || '';
        console.log('🎙️ 音声録音停止時のデータ:', {
          totalTranscript,
          realtimeTranscript,
          finalTranscript: transcript,
          chunkedAudioBlob: chunkedAudioBlob ? 'あり' : 'なし'
        });
        (window as any).debugLog?.(`音声録音停止時のデータ: totalTranscript=${totalTranscript}, realtimeTranscript=${realtimeTranscript}, finalTranscript=${transcript}, chunkedAudioBlob=${chunkedAudioBlob ? 'あり' : 'なし'}`, 'info');
        
        setFinalTranscript(transcript); // 最終トランスクリプトを保存
        setCurrentRecordingBlob(chunkedAudioBlob); // 音声データを保存
        setShowVoicePreview(true); // プレビュー表示
        // realtimeTranscriptはクリアしない - データを保持
        
        // 終了時刻を追加
        if (voiceFileIdRef.current) {
          const currentContent = files.find(f => f.id === voiceFileIdRef.current)?.content || '';
          const endTime = `\n\n---\n\n録音終了: ${new Date().toLocaleString('ja-JP')}`;
          updateFile(voiceFileIdRef.current, { content: currentContent + endTime });
        }
        
        voiceFileIdRef.current = null;
      } else {
        (window as any).debugLog?.('チャンク録音は既に停止しています', 'warn');
      }
    } else {
      // 通常モード
      if (voiceSession.isRecording || isRecording) {
        (window as any).debugLog?.('音声録音を停止します', 'info');
        stopVoiceRecording();
        stopRecording();
        voiceFileIdRef.current = null;
      } else {
        (window as any).debugLog?.('録音は既に停止しています', 'warn');
      }
    }
  };

  // 音声録音完了時の処理
  useEffect(() => {
    if (audioBlob && !voiceSession.isRecording) {
      handleVoiceProcessing(audioBlob);
    }
  }, [audioBlob, voiceSession.isRecording]);

  // 音声処理
  const handleVoiceProcessing = async (blob: Blob) => {
    setVoiceProcessingState('processing');
    (window as any).debugLog?.('音声データの処理を開始します', 'info');
    
    try {
      // 音声をBase64に変換
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        if (!base64Audio) {
          (window as any).debugLog?.('音声データの変換に失敗しました', 'error');
          return;
        }

        (window as any).debugLog?.('音声データをBase64に変換しました', 'success');
        setVoiceProcessingState('processing');
        
        let transcript = '';
        try {
          // Gemini音声認識APIを呼び出す
          (window as any).debugLog?.('Gemini音声認識APIを呼び出しています...', 'info');
          const transcriptionService = getTranscriptionService();
          transcript = await transcriptionService.transcribeAudio(base64Audio, {
            language: 'ja-JP'
          });
          
          updateTranscript(transcript);
          (window as any).debugLog?.('音声認識が完了しました', 'success');
        } catch (transcriptionError: any) {
          // 音声認識に失敗した場合はモックデータを使用
          (window as any).debugLog?.(`音声認識APIエラー: ${transcriptionError.message}`, 'warn');
          (window as any).debugLog?.('フォールバックとしてモックデータを使用します', 'info');
          transcript = "これはデモ用の転写テキストです。実際の実装では、音声認識APIの結果がここに表示されます。";
          updateTranscript(transcript);
        }
        
        setVoiceProcessingState('converting');
        (window as any).debugLog?.('Markdown変換を開始します', 'info');
        
        // Markdown変換 - markdown-converterサービスを使用
        try {
          const { convertTextToMarkdown } = await import('./services/gemini/markdown-converter');
          const response = await convertTextToMarkdown(transcript, ConversionType.MEETING_NOTES);
          const markdown = response.markdown;
          
          updateGeneratedMarkdown(markdown);
          setVoiceProcessingState('idle');
          (window as any).debugLog?.('Markdown変換が完了しました', 'success');
          
          // 変換完了後、ファイルとして保存するかインラインUIで確認
          setPendingVoiceText(markdown);
          setShowInsertOptions(true);
          (window as any).debugLog?.('音声入力結果の保存オプションを表示します', 'info');
        } catch (conversionError: any) {
          (window as any).debugLog?.(`Markdown変換エラー: ${conversionError.message}`, 'error');
          setVoiceProcessingState('idle');
          alert('Markdown変換中にエラーが発生しました');
        }
      };
      reader.readAsDataURL(blob);
    } catch (error: any) {
      console.error('音声処理エラー:', error);
      (window as any).debugLog?.(`音声処理エラー: ${error.message}`, 'error');
      setVoiceProcessingState('idle');
      alert('音声処理中にエラーが発生しました');
    }
  };

  // 音声レベル更新
  useEffect(() => {
    if (voiceSession.isRecording) {
      updateAudioLevel(audioLevel);
    }
  }, [audioLevel, voiceSession.isRecording]);

  // 自動保存用のcallback
  const handleSave = useCallback((content: string) => {
    if (selectedFileId && viewMode === 'editor') {
      setIsSaving(true);
      // ZustandストアのeditContentを更新してから保存
      setEditContent(content);
      saveCurrentFile();
      
      // 保存完了後にインジケーターを消す
      setTimeout(() => {
        setIsSaving(false);
      }, 1000);
      
      (window as any).debugLog?.('ファイルを自動保存しました', 'success');
    }
  }, [selectedFileId, viewMode, setEditContent, saveCurrentFile]);
  
  // 自動保存機能（debounce 2秒）
  const debouncedSave = useRef(
    debounce((content: string) => {
      handleSave(content);
    }, 2000)
  ).current;

  // editorContent変更時の自動保存
  useEffect(() => {
    if (editorContent && selectedFileId && viewMode === 'editor') {
      debouncedSave(editorContent);
    }
  }, [editorContent, selectedFileId, viewMode]);

  // 新規ファイル作成
  const handleNewFile = async () => {
    const now = new Date();
    const fileName = `新規ドキュメント_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.md`;
    
    (window as any).debugAction?.('新規ファイル作成', fileName, 'pending');
    try {
      const newFileId = await createNewFile(''); // 空のフォルダパスを渡す
      if (newFileId) {
        selectFile(newFileId);
        setViewMode('editor'); // 編集モードに切り替え
        (window as any).debugAction?.('新規ファイル作成', fileName, 'success');
      }
    } catch (error: any) {
      console.error('新規ファイル作成エラー:', error);
      (window as any).debugAction?.('新規ファイル作成', error.message, 'error');
    }
  };

  // 設定画面を開く
  const handleOpenSettings = () => {
    setShowSettingsModal(true);
    (window as any).debugAction?.('設定画面を開く', '', 'success');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + E: 編集モード切り替え
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setViewMode(viewMode === 'editor' ? 'preview' : 'editor');
      }
      // Ctrl/Cmd + K: 共有ダイアログ
      else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowShareDialog(true);
      }
      // Ctrl/Cmd + R: 音声録音
      else if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        if (!voiceSession.isRecording && !isChunkedRecording) {
          handleVoiceRecordingStart();
        } else {
          handleVoiceRecordingStop();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, saveCurrentFile, voiceSession.isRecording]);

  return (
    <div className="h-screen flex flex-col" style={{background: 'var(--bg-gradient-primary)'}}>
      {/* ヘッダー */}
      <Header
        onNewFile={handleNewFile}
        onOpenSettings={handleOpenSettings}
      />

      {/* ツールバーを削除 */}

      {/* メインコンテンツ - 4カラムレイアウト */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左カラム - ファイルエクスプローラー */}
        <aside className="w-64 glass text-white flex flex-col flex-shrink-0 border-r border-white/20">
          <FileExplorer
            files={files}
            selectedFileId={selectedFileId}
            onSelectFile={selectFile}
            onRemoveFile={removeFile}
            onCreateFile={createNewFile}
            onRenameFile={renameFile}
            setFiles={setFiles}
            setDirectoryHandle={setDirectoryHandle}
          />
        </aside>

        {/* 中央カラム - エディター/プレビュー */}
        <main className="flex-1 bg-white flex flex-col overflow-hidden">
          {selectedFile ? (
            <Preview
              content={editorContent}
              fileName={selectedFile.name}
              isEditMode={viewMode === 'editor'}
              editContent={editorContent}
              onEditContentChange={(newContent) => {
                setEditorContent(newContent);
                setEditContent(newContent); // Zustandストアも更新
              }}
              onSelectionChange={handleSelectionChange}
              onVoiceInput={handleVoiceInput}
              isRecording={voiceSession.isRecording || isChunkedRecording}
              onToggleEditMode={(editMode) => setViewMode(editMode ? 'editor' : 'preview')}
              onSave={saveCurrentFile}
              isSaving={isSaving}
              onAIGenerate={handleAIGenerate}
              hasSelectedText={selectedText.length > 0}
              isAnalyzing={isAnalyzing}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              ファイルを選択してください
            </div>
          )}
        </main>

        {/* 右カラム - メタデータ（固定表示） */}
        <aside className="w-64 border-l border-gray-200 flex-shrink-0">
          <MetadataPanel
            content={selectedFile ? editorContent : ''}
            fileName={selectedFile?.name}
            lastModified={selectedFile?.updatedAt}
            isFileSelected={!!selectedFile}
            files={files}
            currentFileId={selectedFileId}
          />
        </aside>
      </div>
      
      {/* 共有ダイアログ */}
      {showShareDialog && (
        <ShareDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          fileName={selectedFile?.name || ''}
          content={selectedFile?.content || ''}
        />
      )}
      
      {/* 設定モーダル */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* 音声入力パネル */}
      <VoiceInputPanel
        isOpen={showVoicePanel}
        onClose={handleVoiceCancel}
        isRecording={voiceSession.isRecording || isChunkedRecording}
        isPaused={recordingState === RecordingState.PAUSED}
        audioLevel={useChunkedMode ? chunkedAudioLevel : audioLevel}
        recordingDuration={useChunkedMode ? chunkedRecordingDuration : recordingDuration}
        transcript={realtimeTranscript || voiceSession.transcript || totalTranscript}
        onStartRecording={handleVoiceRecordingStart}
        onStopRecording={handleVoiceRecordingStop}
        onPauseRecording={pauseRecording}
        onResumeRecording={resumeRecording}
        onTranscriptChange={setRealtimeTranscript}
        isProcessing={voiceProcessingState === 'processing' || voiceProcessingState === 'converting'}
        showPreview={showVoicePreview}
        onAnalyze={handleVoiceComplete}
        onDownloadAudio={handleDownloadAudio}
        onDownloadSRT={handleDownloadSRT}
        onDownloadMarkdown={handleDownloadMarkdown}
        hasAudioData={!!currentRecordingBlob}
        hasSRTData={!!generatedSRT}
        hasMarkdownData={!!selectedFile}
        audioBlob={currentRecordingBlob}
      />

      {/* 音声挿入オプション */}
      {showInsertOptions && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <VoiceInsertOptions
              onInsertAtCursor={handleInsertAtCursor}
              onReplaceAll={handleReplaceAll}
              onMeetingNotesAtCursor={handleMeetingNotesAtCursor}
              onMeetingNotesReplaceAll={handleMeetingNotesReplaceAll}
              onCancel={handleInsertCancel}
              transcriptLength={pendingVoiceText.length}
              isGeneratingMeetingNotes={isGeneratingMeetingNotes}
            />
          </div>
        </div>
      )}

      {/* デバッグウィンドウ */}
      <DebugWindow />
    </div>
  );
}

export default App
