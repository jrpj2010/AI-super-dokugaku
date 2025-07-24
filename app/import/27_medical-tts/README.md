# 医療用語音声合成システム

## 概要
医療用語の正確な発音を実現するためのText-to-Speech（TTS）システムです。YAML形式の発音辞書を使用して、医療用語を正しい発音記号（IPA）に変換し、SSML形式で出力します。

## 機能
- 医療用語の発音辞書管理（YAML形式）
- テキストからSSMLへの自動変換
- Gemini APIを使用した発音解説生成
- 音声生成対応（Google Cloud Text-to-Speech API準備済み）

## ファイル構成
```
27_medical-tts/
├── page.tsx                          # Next.jsページコンポーネント
├── components/
│   └── MedicalTTS.tsx               # メインUIコンポーネント
├── actions.ts                       # Server Actions（API処理）
├── tts_pronunciation_lexicon.yaml   # 発音辞書
└── README.md                        # このファイル
```

## 使用方法
1. アプリケーションにアクセス: `http://localhost:3000/import/27_medical-tts`
2. テキストエリアに医療用語を含む文章を入力
3. 「音声を生成」ボタンをクリック
4. 処理されたSSMLと発音解説が表示されます

## 発音辞書の追加方法
`tts_pronunciation_lexicon.yaml`ファイルに新しい医療用語を追加できます：

```yaml
medical_terms:
  - term: "新しい用語"
    solution:
      ssml_precise_ipa: '<phoneme alphabet="ipa" ph="発音記号">新しい用語</phoneme>'
      description: "用語の説明"
```

## 現在の制限事項
- Gemini TTS APIは外部テキストの直接読み上げに制限があります
- 完全な音声生成機能にはGoogle Cloud Text-to-Speech APIの設定が必要です

## 今後の拡張予定
- Google Cloud Text-to-Speech APIとの統合
- リアルタイム音声生成
- 発音辞書の動的管理UI
- 複数言語対応