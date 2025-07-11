import React from 'react';
import { PlusCircle, Replace, X, Sparkles, Loader2 } from 'lucide-react';

interface VoiceInsertOptionsProps {
  onInsertAtCursor: () => void;
  onReplaceAll: () => void;
  onMeetingNotesAtCursor: () => void;
  onMeetingNotesReplaceAll: () => void;
  onCancel: () => void;
  transcriptLength: number;
  isGeneratingMeetingNotes?: boolean;
}

export const VoiceInsertOptions: React.FC<VoiceInsertOptionsProps> = ({
  onInsertAtCursor,
  onReplaceAll,
  onMeetingNotesAtCursor,
  onMeetingNotesReplaceAll,
  onCancel,
  transcriptLength,
  isGeneratingMeetingNotes = false
}) => {
  return (
    <div className="glass radius-unified p-6 mx-4 mb-4 shadow-interactive">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white gradient-text">
          音声認識が完了しました
        </h3>
        <button
          onClick={onCancel}
          className="text-white/70 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <p className="text-white/80 mb-6 text-sm">
        認識結果（{transcriptLength}文字）をどのように挿入しますか？
      </p>
      
      <div className="flex flex-col gap-3">
        {/* そのまま挿入オプション */}
        <div>
          <p className="text-sm text-white/70 mb-3 font-medium">生の文字起こしをそのまま挿入</p>
          <div className="flex gap-3">
            <button
              onClick={onInsertAtCursor}
              disabled={isGeneratingMeetingNotes}
              className="flex items-center gap-2 px-4 py-3 radius-unified font-medium text-white transition-all shadow-interactive disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background: 'var(--bg-gradient-accent)'}}
            >
              <PlusCircle size={18} />
              カーソル位置に挿入
            </button>
            
            <button
              onClick={onReplaceAll}
              disabled={isGeneratingMeetingNotes}
              className="flex items-center gap-2 px-4 py-3 radius-unified font-medium text-white transition-all shadow-interactive disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'}}
            >
              <Replace size={18} />
              全文を置き換え
            </button>
          </div>
        </div>

        {/* 議事録生成オプション */}
        <div>
          <p className="text-sm gradient-text mb-3 font-medium">AIで議事録形式に変換して挿入</p>
          <div className="flex gap-3">
            <button
              onClick={onMeetingNotesAtCursor}
              disabled={isGeneratingMeetingNotes}
              className="flex items-center gap-2 px-4 py-3 radius-unified font-medium text-white transition-all shadow-interactive disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #007BFF 100%)'}}
            >
              {isGeneratingMeetingNotes ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              議事録としてカーソル位置に挿入
            </button>
            
            <button
              onClick={onMeetingNotesReplaceAll}
              disabled={isGeneratingMeetingNotes}
              className="flex items-center gap-2 px-4 py-3 radius-unified font-medium text-white transition-all shadow-interactive disabled:opacity-50 disabled:cursor-not-allowed"
              style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #007BFF 100%)'}}
            >
              {isGeneratingMeetingNotes ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              議事録として全文を置き換え
            </button>
          </div>
        </div>

        {/* キャンセルボタン */}
        <div className="flex justify-center pt-3">
          <button
            onClick={onCancel}
            disabled={isGeneratingMeetingNotes}
            className="flex items-center gap-2 px-6 py-2 radius-unified font-medium text-white/70 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)'}}
          >
            <X size={18} />
            破棄
          </button>
        </div>
      </div>
    </div>
  );
};