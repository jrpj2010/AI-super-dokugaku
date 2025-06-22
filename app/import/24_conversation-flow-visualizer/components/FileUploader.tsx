import React, { useRef } from 'react';
import { SRTParser } from '../lib/srtParser';

interface FileUploaderProps {
  onAudioFile: (file: File, filename: string) => void;
  onTextFile: (nodes: Array<{id: string, text: string}>, filename: string) => void;
  disabled?: boolean;
  isProcessing?: boolean;
  uploadedFileName?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onAudioFile,
  onTextFile,
  disabled = false,
  isProcessing = false,
  uploadedFileName = ""
}) => {
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);
  const textFileInputRef = useRef<HTMLInputElement | null>(null);
  const srtParser = new SRTParser();

  // 音声ファイルの処理
  const handleAudioFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      onAudioFile(file, file.name);
    } catch (error) {
      console.error('音声ファイルのアップロードエラー:', error);
      alert('音声ファイルのアップロードに失敗しました。');
    }

    // ファイル入力をリセット
    event.target.value = '';
  };

  // テキストファイルの処理
  const handleTextFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await readFileAsText(file);
      const parsed = srtParser.parseSubtitleFile(content, file.name);
      const nodes = srtParser.convertToNodes(parsed);
      
      if (nodes.length === 0) {
        throw new Error('ファイルから有効なテキストが見つかりませんでした');
      }

      console.log(`SRTファイル解析完了: ${nodes.length}ノード, ${parsed.format}形式`);
      onTextFile(nodes, file.name);
    } catch (error) {
      console.error('テキストファイルの解析エラー:', error);
      alert(`テキストファイルの解析に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    }

    // ファイル入力をリセット
    event.target.value = '';
  };

  // ファイルをテキストとして読み込み
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('ファイルの読み込みに失敗しました'));
        }
      };
      reader.onerror = () => reject(new Error('ファイルの読み込み中にエラーが発生しました'));
      reader.readAsText(file, 'UTF-8');
    });
  };

  return (
    <div className="file-uploader">
      {/* 音声ファイル用の隠しinput */}
      <input
        ref={audioFileInputRef}
        type="file"
        accept="audio/mp3,audio/mpeg,audio/mp4,audio/x-m4a,audio/wav,audio/webm"
        onChange={handleAudioFileUpload}
        style={{ display: 'none' }}
      />
      
      {/* テキストファイル用の隠しinput */}
      <input
        ref={textFileInputRef}
        type="file"
        accept=".srt,.vtt,.txt,text/plain,text/vtt"
        onChange={handleTextFileUpload}
        style={{ display: 'none' }}
      />

      {/* 音声ファイルアップロードボタン */}
      <button
        className="upload-button audio-upload"
        onClick={() => audioFileInputRef.current?.click()}
        disabled={disabled || isProcessing}
        aria-label="音声ファイルをアップロード"
        title="音声ファイル (MP3, M4A, WAV, WebM) をアップロード"
      >
        🎵 音声ファイル
      </button>

      {/* テキストファイルアップロードボタン */}
      <button
        className="upload-button text-upload"
        onClick={() => textFileInputRef.current?.click()}
        disabled={disabled || isProcessing}
        aria-label="テキストファイルをアップロード"
        title="字幕ファイル (SRT, VTT) またはテキストファイル (TXT) をアップロード"
      >
        📄 字幕/テキスト
      </button>

      {/* ファイル名表示 */}
      {uploadedFileName && (
        <span className="uploaded-file-name">
          {isProcessing ? '処理中: ' : ''}
          {uploadedFileName}
        </span>
      )}

      {/* ヘルプテキスト */}
      <div className="upload-help" style={{
        fontSize: '11px',
        color: '#6b7280',
        marginTop: '8px',
        textAlign: 'center'
      }}>
        音声: MP3, M4A, WAV, WebM | 字幕: SRT, VTT | テキスト: TXT
      </div>

    </div>
  );
};