// 音声入力機能のE2Eデモページ

import React, { useState, useEffect } from 'react';
import { VoiceInput } from '../components/VoiceInput';
import { TranscriptPreview } from '../components/TranscriptPreview';
import { VoiceControls } from '../components/VoiceControls';
import { LoadingAnimation, AnimationType } from '../components/LoadingAnimation';
import { TextHighlighter, HighlightInfo, HighlightType } from '../components/TextHighlighter';
import { VoiceCommentList, VoiceCommentInfo } from '../components/VoiceComment';
import { FeedbackButtons, FeedbackCategory, FeedbackInfo } from '../components/FeedbackButtons';
import { TwoColumnLayout, LayoutStyle } from '../layouts/TwoColumnLayout';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { analyticsTracker } from '../services/analytics/tracker';
import { markdownConverter, ConversionType, OutputFormat } from '../services/gemini/markdown-converter';
import '../styles/mobile-voice.css';

// デモの状態
enum DemoState {
  IDLE = 'idle',
  RECORDING = 'recording',
  PROCESSING = 'processing',
  TRANSCRIBING = 'transcribing',
  CONVERTING = 'converting',
  COMPLETED = 'completed',
  ERROR = 'error'
}

// デモシナリオ
enum DemoScenario {
  BASIC_RECORDING = 'basic_recording',
  MEETING_NOTES = 'meeting_notes',
  ARTICLE_WRITING = 'article_writing',
  SALES_ANALYSIS = 'sales_analysis',
  FULL_DEMO = 'full_demo'
}

// メインデモコンポーネント
export const VoiceInputDemo: React.FC = () => {
  const [demoState, setDemoState] = useState<DemoState>(DemoState.IDLE);
  const [scenario, setScenario] = useState<DemoScenario>(DemoScenario.FULL_DEMO);
  const [transcript, setTranscript] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');
  const [highlights, setHighlights] = useState<HighlightInfo[]>([]);
  const [comments, setComments] = useState<VoiceCommentInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(LayoutStyle.RESPONSIVE);

  // セッション開始
  useEffect(() => {
    const initSession = async () => {
      const newSessionId = await analyticsTracker.startSession('demo-user', 'demo-file');
      setSessionId(newSessionId);
    };
    initSession();

    return () => {
      if (sessionId) {
        analyticsTracker.endSession(sessionId);
      }
    };
  }, []);

  // 録音開始
  const handleStartRecording = () => {
    setDemoState(DemoState.RECORDING);
    setError(null);
    setTranscript('');
    setMarkdown('');
    setRecordingTime(0);

    // 録音時間のシミュレーション
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    // 音声レベルのシミュレーション
    const levelInterval = setInterval(() => {
      setAudioLevel(Math.random() * 0.8 + 0.2);
    }, 100);

    // 自動停止（デモ用）
    setTimeout(() => {
      clearInterval(timer);
      clearInterval(levelInterval);
      handleStopRecording();
    }, 5000);
  };

  // 録音停止
  const handleStopRecording = async () => {
    setDemoState(DemoState.PROCESSING);
    setAudioLevel(0);

    // 転写処理のシミュレーション
    setTimeout(() => {
      setDemoState(DemoState.TRANSCRIBING);
      simulateTranscription();
    }, 1000);
  };

  // 転写シミュレーション
  const simulateTranscription = () => {
    const demoTranscripts: Record<DemoScenario, string> = {
      [DemoScenario.BASIC_RECORDING]: '本日はMD Buddyの音声入力機能のデモを行います。この機能により、音声で簡単にMarkdownドキュメントを作成できます。',
      [DemoScenario.MEETING_NOTES]: '本日の定例会議では、プロジェクトの進捗について話し合いました。佐藤さんから、開発タスクが予定通り進んでいることが報告され、来週までに初期バージョンをリリースする予定です。また、山田さんからマーケティング戦略について提案があり、SNSキャンペーンを開始することが決定しました。',
      [DemoScenario.ARTICLE_WRITING]: 'AI時代のドキュメント作成について考えてみましょう。従来のキーボード入力に加えて、音声入力技術が急速に発展しています。特に、自然言語処理の進化により、話した内容を構造化されたドキュメントに自動変換することが可能になりました。これにより、アイデアを素早く文書化し、生産性を大幅に向上させることができます。',
      [DemoScenario.SALES_ANALYSIS]: '本日の商談では、クライアントからMD Buddyの音声入力機能に高い関心が示されました。特に、会議の議事録作成時間を80%削減できる点が評価されています。価格については月額5000円のプランで合意に至り、来月から導入することが決定しました。追加で5ライセンスの要望もいただいています。',
      [DemoScenario.FULL_DEMO]: '皆さん、こんにちは。本日はMD Buddyの革新的な音声入力機能について実演させていただきます。この機能は、Google Gemini APIを活用し、リアルタイムで音声をMarkdownに変換します。主な特徴として、第一に、高精度な音声認識により、専門用語も正確に転写できます。第二に、AIが文脈を理解し、適切な見出しや箇条書きを自動生成します。第三に、会議メモ、ブログ記事、技術文書など、様々な形式に対応しています。実際の使用例として、この1分間の説明が、構造化されたMarkdownドキュメントとして出力されます。'
    };

    const selectedTranscript = demoTranscripts[scenario];
    
    // 段階的に転写をシミュレート
    let currentIndex = 0;
    const transcribeInterval = setInterval(() => {
      if (currentIndex < selectedTranscript.length) {
        const chunkSize = Math.floor(Math.random() * 20) + 10;
        const chunk = selectedTranscript.substring(currentIndex, currentIndex + chunkSize);
        setTranscript(prev => prev + chunk);
        currentIndex += chunkSize;
      } else {
        clearInterval(transcribeInterval);
        setTimeout(() => {
          setDemoState(DemoState.CONVERTING);
          convertToMarkdown(selectedTranscript);
        }, 500);
      }
    }, 100);
  };

  // Markdown変換
  const convertToMarkdown = async (text: string) => {
    const demoMarkdowns: Record<DemoScenario, string> = {
      [DemoScenario.BASIC_RECORDING]: `# MD Buddy 音声入力機能デモ

## 概要
MD Buddyの音声入力機能により、音声で簡単にMarkdownドキュメントを作成できます。

## 主な特徴
- 🎤 高精度な音声認識
- 📝 自動Markdown変換
- 🚀 リアルタイム処理`,
      
      [DemoScenario.MEETING_NOTES]: `# 定例会議 議事録
**日時**: ${new Date().toLocaleDateString('ja-JP')}  
**参加者**: 佐藤、山田、他

## 📋 議題

### 1. プロジェクト進捗報告
**報告者**: 佐藤さん
- ✅ 開発タスクは予定通り進行中
- 📅 来週初期バージョンリリース予定

### 2. マーケティング戦略
**提案者**: 山田さん
- 💡 SNSキャンペーンの開始を提案
- ✅ **決定事項**: キャンペーン実施承認

## 🎯 アクションアイテム
1. 【佐藤】初期バージョンのリリース準備（期限：来週）
2. 【山田】SNSキャンペーン企画書作成（期限：今週金曜）`,

      [DemoScenario.ARTICLE_WRITING]: `# AI時代のドキュメント作成

## はじめに
AI技術の進化により、ドキュメント作成の方法が大きく変わりつつあります。

## 音声入力技術の進化

### 従来の課題
- キーボード入力の速度制限
- アイデアの即時記録の困難さ

### 新たな可能性
音声入力技術と自然言語処理の組み合わせにより：

1. **高速な文書化**
   - 話すスピードでの入力が可能
   - アイデアを逃さず記録

2. **自動構造化**
   - AIが文脈を理解
   - 適切な見出しや段落を自動生成

3. **生産性の向上**
   - 文書作成時間を大幅短縮
   - より創造的な作業に集中可能

## まとめ
音声入力技術は、私たちの働き方を根本的に変える可能性を秘めています。`,

      [DemoScenario.SALES_ANALYSIS]: `# 商談記録：MD Buddy導入提案

## 📊 商談概要
- **日付**: ${new Date().toLocaleDateString('ja-JP')}
- **クライアント**: 株式会社〇〇
- **商材**: MD Buddy音声入力機能

## 💬 クライアントの反応

### ポジティブな評価ポイント
1. **議事録作成時間80%削減**
   - 現状：会議後1時間
   - 導入後：約12分
   
2. **高精度な音声認識**
   - 専門用語にも対応
   - 日本語の認識精度が高い

## 💰 商談結果

### 合意事項
- **プラン**: スタンダードプラン
- **価格**: 月額5,000円
- **導入時期**: 来月から

### 追加要望
- 5ライセンスの追加検討中
- 導入後の効果測定を実施予定

## 📈 売上見込み
- 初期導入：5,000円/月
- 追加ライセンス見込み：25,000円/月
- **合計見込み**: 30,000円/月`,

      [DemoScenario.FULL_DEMO]: `# MD Buddy 音声入力機能 完全デモ

## 🎯 概要
Google Gemini APIを活用したリアルタイム音声→Markdown変換システム

## ✨ 主要機能

### 1. 高精度音声認識
- **専門用語対応**: 技術用語や業界用語も正確に認識
- **多言語サポート**: 日本語・英語に対応
- **ノイズ除去**: 環境音を自動フィルタリング

### 2. インテリジェントな文書構造化
- **文脈理解**: AIが内容を分析し、適切な構造を提案
- **自動フォーマット**: 
  - 見出しレベルの自動判定
  - 箇条書き・番号付きリストの生成
  - 強調表現の適用

### 3. 多様な出力形式
| 形式 | 用途 | 特徴 |
|------|------|------|
| 会議メモ | 議事録作成 | アクションアイテム自動抽出 |
| ブログ記事 | コンテンツ作成 | SEO最適化された構造 |
| 技術文書 | ドキュメント作成 | コード例の自動フォーマット |

## 📊 導入効果

### 時間削減効果
\`\`\`
従来の方法：60分
音声入力：12分
削減率：80%
\`\`\`

### ROI（投資対効果）
- 月間削減時間：40時間
- 人件費換算：約10万円/月
- 投資回収期間：1ヶ月以内

## 🚀 今すぐ始める
1. マイクボタンをクリック
2. 話すだけ
3. 美しいMarkdownが完成！

---
*このドキュメントは1分間の音声から自動生成されました*`
    };

    setMarkdown(demoMarkdowns[scenario]);
    setDemoState(DemoState.COMPLETED);

    // アナリティクス記録
    analyticsTracker.trackMarkdownConversion(
      sessionId,
      text,
      demoMarkdowns[scenario],
      ConversionType.MEETING_NOTES,
      OutputFormat.MARKDOWN,
      { scenario }
    );
  };

  // ハイライト追加
  const handleAddHighlight = (highlight: Omit<HighlightInfo, 'id' | 'createdAt'>) => {
    const newHighlight: HighlightInfo = {
      ...highlight,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setHighlights(prev => [...prev, newHighlight]);
  };

  // コメント追加
  const handleAddComment = (comment: Omit<VoiceCommentInfo, 'id' | 'userId' | 'createdAt'>) => {
    const newComment: VoiceCommentInfo = {
      ...comment,
      id: Date.now().toString(),
      userId: 'demo-user',
      createdAt: new Date()
    };
    setComments(prev => [...prev, newComment]);
  };

  // フィードバック処理
  const handleFeedback = (feedback: FeedbackInfo) => {
    console.log('フィードバック受信:', feedback);
    analyticsTracker.trackFeedback(
      feedback.category,
      feedback.rating || 0,
      feedback.comment || '',
      { scenario, sessionId }
    );
  };

  // リセット
  const handleReset = () => {
    setDemoState(DemoState.IDLE);
    setTranscript('');
    setMarkdown('');
    setHighlights([]);
    setComments([]);
    setError(null);
    setRecordingTime(0);
  };

  return (
    <div className="voice-input-demo" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '16px 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🎤 MD Buddy 音声入力デモ</h1>
        <p style={{ margin: '4px 0 0 0', opacity: 0.9 }}>
          話すだけで美しいMarkdownドキュメントを作成
        </p>
      </header>

      {/* シナリオ選択 */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <label style={{ fontWeight: 'bold' }}>シナリオ:</label>
        <select
          value={scenario}
          onChange={(e) => setScenario(e.target.value as DemoScenario)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
          disabled={demoState !== DemoState.IDLE}
        >
          <option value={DemoScenario.FULL_DEMO}>フルデモ（全機能）</option>
          <option value={DemoScenario.BASIC_RECORDING}>基本録音</option>
          <option value={DemoScenario.MEETING_NOTES}>会議メモ</option>
          <option value={DemoScenario.ARTICLE_WRITING}>記事作成</option>
          <option value={DemoScenario.SALES_ANALYSIS}>営業分析</option>
        </select>

        <label style={{ fontWeight: 'bold', marginLeft: 'auto' }}>レイアウト:</label>
        <select
          value={layoutStyle}
          onChange={(e) => setLayoutStyle(e.target.value as LayoutStyle)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        >
          <option value={LayoutStyle.RESPONSIVE}>レスポンシブ</option>
          <option value={LayoutStyle.SIDE_BY_SIDE}>サイドバイサイド</option>
          <option value={LayoutStyle.OVERLAY}>オーバーレイ</option>
          <option value={LayoutStyle.FLOATING}>フローティング</option>
        </select>

        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#6c757d',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📊 {showAnalytics ? 'デモに戻る' : 'アナリティクス'}
        </button>
      </div>

      {/* メインコンテンツ */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {showAnalytics ? (
          // アナリティクスビュー
          <div style={{ height: '100%', overflow: 'auto', padding: '24px' }}>
            <AnalyticsDashboard
              userId="demo-user"
              sessionId={sessionId}
              dateRange={{
                start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                end: new Date()
              }}
            />
          </div>
        ) : (
          // デモビュー
          <TwoColumnLayout
            fileId="demo-file"
            comments={comments}
            highlights={highlights}
            onCommentAdd={handleAddComment}
            layoutStyle={layoutStyle}
            collapsible={true}
          >
            <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
              {/* 状態に応じた表示 */}
              {demoState === DemoState.IDLE && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎤</div>
                  <h2 style={{ marginBottom: '16px' }}>録音を開始しましょう</h2>
                  <p style={{ marginBottom: '32px', color: '#666' }}>
                    マイクボタンをクリックして、話し始めてください
                  </p>
                  <VoiceInput
                    onStartRecording={handleStartRecording}
                    onStopRecording={handleStopRecording}
                    onError={setError}
                    size="large"
                  />
                </div>
              )}

              {demoState === DemoState.RECORDING && (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <LoadingAnimation
                    type={AnimationType.VOICE}
                    message="録音中..."
                    subMessage={`${recordingTime}秒経過`}
                    size="large"
                  />
                  <div style={{ marginTop: '24px' }}>
                    <VoiceControls
                      isRecording={true}
                      isPaused={false}
                      audioLevel={audioLevel}
                      recordingTime={recordingTime}
                      onStop={handleStopRecording}
                    />
                  </div>
                </div>
              )}

              {demoState === DemoState.PROCESSING && (
                <LoadingAnimation
                  type={AnimationType.SPINNER}
                  message="音声データを処理中..."
                  size="large"
                />
              )}

              {demoState === DemoState.TRANSCRIBING && (
                <div>
                  <LoadingAnimation
                    type={AnimationType.TRANSCRIBE}
                    message="音声を転写しています..."
                    size="medium"
                  />
                  <TranscriptPreview
                    messages={[{
                      id: '1',
                      type: 'user',
                      text: transcript,
                      timestamp: new Date(),
                      confidence: 0.95
                    }]}
                    variant="simple"
                  />
                </div>
              )}

              {demoState === DemoState.CONVERTING && (
                <LoadingAnimation
                  type={AnimationType.AI_THINKING}
                  message="Markdownに変換中..."
                  subMessage="AIが最適な構造を生成しています"
                  size="large"
                />
              )}

              {demoState === DemoState.COMPLETED && (
                <div>
                  <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>変換完了！</h2>
                    <button
                      onClick={handleReset}
                      style={{
                        padding: '8px 24px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#28a745',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      新しい録音を開始
                    </button>
                  </div>

                  <div style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '24px',
                    marginBottom: '24px'
                  }}>
                    <h3>生成されたMarkdown</h3>
                    <TextHighlighter
                      text={markdown}
                      highlights={highlights}
                      onHighlight={handleAddHighlight}
                      fileId="demo-file"
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h3>フィードバック</h3>
                    <FeedbackButtons
                      onFeedback={handleFeedback}
                      category={FeedbackCategory.MARKDOWN_QUALITY}
                      style="detailed"
                    />
                  </div>

                  <div style={{
                    backgroundColor: '#e3f2fd',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '24px'
                  }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>💡 ヒント</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>テキストを選択してハイライトを追加できます</li>
                      <li>右側のサイドバーでコメントを管理できます</li>
                      <li>生成されたMarkdownはコピー＆ペーストで利用できます</li>
                    </ul>
                  </div>
                </div>
              )}

              {error && (
                <div style={{
                  backgroundColor: '#ffebee',
                  color: '#c62828',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <strong>エラー:</strong> {error}
                </div>
              )}
            </div>
          </TwoColumnLayout>
        )}
      </div>
    </div>
  );
};

// エクスポート
export default VoiceInputDemo;