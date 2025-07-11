import { useState, useEffect, useRef } from 'react';
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
import { generateSRTFromText, downloadSRT, downloadAudio, downloadMarkdown } from './services/srt-generator';
import type { FileItem } from './types';
import { RecordingState } from './types/audio';
import './styles/mobile-voice.css';

function App() {
  const {
    files,
    selectedFileId,
    isEditMode,
    editContent,
    selectFile,
    removeFile,
    setEditMode,
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
  
  const selectedFile = files.find(f => f.id === selectedFileId);
  
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

  // AI分析開始ハンドラー
  const handleAnalyzeVoiceRecording = async () => {
    console.log('🔍 AI分析開始時のデータ:', {
      finalTranscript,
      currentRecordingBlob: currentRecordingBlob ? 'あり' : 'なし',
      realtimeTranscript,
      totalTranscript
    });
    (window as any).debugLog?.(`AI分析開始時のデータ: finalTranscript="${finalTranscript}", currentRecordingBlob=${currentRecordingBlob ? 'あり' : 'なし'}, realtimeTranscript="${realtimeTranscript}", totalTranscript="${totalTranscript}"`, 'info');
    
    // テキストも音声データもない場合はスキップ
    if (!finalTranscript && !currentRecordingBlob) {
      (window as any).debugLog?.('トランスクリプトと音声データが両方とも空のため、AI分析をスキップします', 'warn');
      console.warn('⚠️ トランスクリプトと音声データが両方とも空のため、AI分析をスキップします');
      return;
    }

    (window as any).debugLog?.('AI分析を開始します', 'info');
    setVoiceProcessingState('converting');
    setShowVoicePreview(false); // プレビューを閉じる

    try {
      let textToAnalyze = finalTranscript;
      
      // テキストがない場合は音声データから変換
      if (!textToAnalyze && currentRecordingBlob) {
        console.log('🎤 音声データからテキストを変換します...');
        (window as any).debugLog?.('音声データからテキストを変換します', 'info');
        
        try {
          const transcriptionService = getTranscriptionService();
          const transcriptionResult = await transcriptionService.transcribeAudio(currentRecordingBlob);
          textToAnalyze = transcriptionResult.text;
          console.log('✅ 音声転写結果:', textToAnalyze);
          (window as any).debugLog?.(`音声転写結果: ${textToAnalyze}`, 'success');
        } catch (transcriptionError: any) {
          console.error('❌ 音声転写エラー:', transcriptionError);
          (window as any).debugLog?.(`音声転写エラー: ${transcriptionError.message}`, 'error');
          alert(`音声転写エラー: ${transcriptionError.message}`);
          setVoiceProcessingState('idle');
          return;
        }
      }
      
      // Markdown変換
      const { convertTextToMarkdown } = await import('./services/gemini/markdown-converter');
      console.log('📝 Gemini APIにテキストを送信:', textToAnalyze);
      const response = await convertTextToMarkdown(textToAnalyze, ConversionType.MEETING_NOTES);
      const markdown = response.markdown;
      console.log('✅ Markdown変換結果:', markdown);
      
      (window as any).debugLog?.('Markdown変換が完了しました', 'success');
      
      // SRT字幕生成
      if (chunkedRecordingDuration > 0) {
        try {
          const srt = await generateSRTFromText(finalTranscript, chunkedRecordingDuration);
          setGeneratedSRT(srt);
          (window as any).debugLog?.('SRT字幕生成が完了しました', 'success');
        } catch (srtError: any) {
          (window as any).debugLog?.(`SRT生成エラー: ${srtError.message}`, 'warn');
        }
      }

      // 音声ファイルと字幕ファイルも一緒に保存
      const timestamp = new Date();
      const folderName = `音声メモ_${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')}_${String(timestamp.getHours()).padStart(2, '0')}-${String(timestamp.getMinutes()).padStart(2, '0')}-${String(timestamp.getSeconds()).padStart(2, '0')}`;
      
      // 新規ファイルセットを作成
      const newFileId = await createFileFromVoice(markdown, folderName);
      
      // 音声ファイルを保存
      if (currentRecordingBlob) {
        const audioFile: FileItem = {
          id: Date.now().toString() + '_audio',
          name: `${folderName}/audio.webm`,
          content: currentRecordingBlob,
          type: 'audio',
          lastModified: timestamp,
          updatedAt: timestamp,
          createdAt: timestamp,
          path: `${folderName}/audio.webm`
        };
        addFile(audioFile as any); // 一時的にanyで回避
      }
      
      // SRTファイルを保存
      if (generatedSRT) {
        const srtFile: FileItem = {
          id: Date.now().toString() + '_srt',
          name: `${folderName}/subtitles.srt`,
          content: generatedSRT,
          type: 'text',
          lastModified: timestamp,
          updatedAt: timestamp,
          createdAt: timestamp,
          path: `${folderName}/subtitles.srt`
        };
        addFile(srtFile as any); // 一時的にanyで回避
      }
      
      // 作成したMarkdownファイルを自動的に選択してアクティブ化
      selectFile(newFileId);
      setEditMode(false); // プレビューモードで表示
      
      (window as any).debugLog?.('3ファイルセットを作成し、Markdownファイルをアクティブ化しました', 'success');

      // 状態をリセット
      setVoiceProcessingState('idle');
      setFinalTranscript('');
      resetVoiceSession();
      setCurrentRecordingBlob(undefined);
      setGeneratedSRT('');
      
    } catch (error: any) {
      (window as any).debugLog?.(`AI分析エラー: ${error.message}`, 'error');
      setVoiceProcessingState('idle');
      alert('AI分析中にエラーが発生しました。もう一度お試しください。');
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
      const content = isEditMode ? editContent : selectedFile.content;
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
          
          // 変換完了後、ファイルとして保存するか確認
          if (confirm('音声入力の結果を新しいファイルとして保存しますか？')) {
            await createFileFromVoice(markdown);
            (window as any).debugLog?.('新しいファイルとして保存しました', 'success');
          }
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

  // 新規ファイル作成
  const handleNewFile = async () => {
    const now = new Date();
    const fileName = `新規ドキュメント_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}.md`;
    
    (window as any).debugAction?.('新規ファイル作成', fileName, 'pending');
    try {
      const newFileId = await createNewFile(''); // 空のフォルダパスを渡す
      if (newFileId) {
        selectFile(newFileId);
        setEditMode(true); // 編集モードに切り替え
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
      // Ctrl/Cmd + S: 保存
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (isEditMode) {
          saveCurrentFile();
        }
      }
      // Ctrl/Cmd + E: 編集モード切り替え
      else if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setEditMode(!isEditMode);
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
  }, [isEditMode, saveCurrentFile, setEditMode, voiceSession.isRecording]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* ヘッダー */}
      <Header
        onNewFile={handleNewFile}
        onOpenSettings={handleOpenSettings}
      />

      {/* ツールバー */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex items-center gap-3">
          {selectedFile && (
            <>
              <button 
                onClick={() => setShowShareDialog(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                title="ファイルを共有 (Ctrl+K)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-2.392 0-4.563.93-6.284 2.658M15.732 14.684A6 6 0 0112 15c-1.268 0-2.44-.394-3.732-1.316" />
                </svg>
                共有
              </button>
              
              {isEditMode && (
                <button
                  onClick={saveCurrentFile}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  title="ファイルを保存 (Ctrl+S)"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                  </svg>
                  保存
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* メインコンテンツ - 4カラムレイアウト */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左カラム - ファイルエクスプローラー */}
        <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col flex-shrink-0">
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
              content={selectedFile.content}
              fileName={selectedFile.name}
              isEditMode={isEditMode}
              editContent={editContent}
              onEditContentChange={setEditContent}
              onVoiceInput={() => setShowVoicePanel(true)}
              isRecording={voiceSession.isRecording || isChunkedRecording}
              onToggleEditMode={setEditMode}
              onSave={saveCurrentFile}
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
            content={selectedFile ? (isEditMode ? editContent : selectedFile.content) : ''}
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
        onClose={() => setShowVoicePanel(false)}
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
        onAnalyze={handleAnalyzeVoiceRecording}
        onDownloadAudio={handleDownloadAudio}
        onDownloadSRT={handleDownloadSRT}
        onDownloadMarkdown={handleDownloadMarkdown}
        hasAudioData={!!currentRecordingBlob}
        hasSRTData={!!generatedSRT}
        hasMarkdownData={!!selectedFile}
      />

      {/* デバッグウィンドウ */}
      <DebugWindow />
    </div>
  );
}

export default App
