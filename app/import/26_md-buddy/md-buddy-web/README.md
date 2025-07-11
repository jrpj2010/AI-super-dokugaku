# MD Buddy v0.020 - プロフェッショナルグレード AIマークダウンエディター

音声入力からAIを活用して高品質なマークダウン文書を生成する、プロフェッショナルグレードのエディターです。

[![Version](https://img.shields.io/badge/version-0.020--stable-blue.svg)](https://github.com/yourusername/md-buddy)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🎯 v0.020の主要機能

### プロフェッショナルグレードの機能
- **編集⇔プレビューモード** - シームレスな切り替え（Ctrl+E）
- **リアルタイムプレビュー** - 編集内容の即時反映
- **完全な音声録音システム** - 一時停止・再開機能対応
- **AI分析機能** - 高精度な音声→Markdown変換
- **クリップボード画像ペースト** - Ctrl+Vで画像を直接挿入
- **包括的なツールチップ** - すべての機能に説明を表示
- **3ファイル同時管理** - Markdown/音声/字幕の統合管理

## 🚀 クイックスタート

### 1. 環境設定

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/md-buddy.git
cd md-buddy/md-buddy-web

# 依存関係のインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local
# .env.localファイルを編集してGemini APIキーを設定
```

### 2. 開発サーバーの起動

```bash
pnpm dev
# http://localhost:8081 でアクセス
```

## 📋 使い方

### 音声録音フロー

1. **AIパネルを開く**
   - ツールバーの「AIパネル」ボタンをクリック
   - またはショートカット `Ctrl/Cmd + R`

2. **録音開始**
   - 「録音開始」ボタンをクリック
   - リアルタイムで文字起こしが表示されます

3. **録音停止**
   - 「停止」ボタンをクリック
   - プレビュー画面が表示されます

4. **AI分析**
   - 「AI分析開始」ボタンでMarkdown変換
   - 自動的にエディタに挿入されます

5. **ダウンロード**
   - 音声ファイル（WebM）
   - 字幕ファイル（SRT）
   - Markdownドキュメント

## 🛠️ 技術スタック

- **フロントエンド**: React 18.3 + TypeScript 5.6
- **ビルドツール**: Vite 7.0
- **スタイリング**: Tailwind CSS + shadcn/ui
- **状態管理**: Zustand
- **音声処理**: Web Audio API + MediaRecorder API
- **AI**: Google Gemini API (2.5 Flash/Pro)

## 📁 プロジェクト構造

```
md-buddy-web/
├── src/
│   ├── components/     # UIコンポーネント
│   ├── hooks/         # カスタムフック
│   ├── services/      # APIサービス
│   ├── store/         # 状態管理
│   ├── types/         # 型定義
│   └── utils/         # ユーティリティ
├── docs/              # ドキュメント
│   ├── requirements-v0.018.md   # 要件定義
│   └── technical-spec-v0.018.md # 技術仕様
└── public/            # 静的ファイル
```

## ⚡ パフォーマンス

- ページ読み込み: < 3秒
- 音声認識精度: 90%以上
- リアルタイム処理: 2倍速以内

## 🔒 セキュリティ

- APIキーは環境変数で管理
- HTTPS通信を推奨
- ローカルストレージの暗号化対応

## 📝 ドキュメント

- [要件定義書](docs/requirements-v0.018.md)
- [技術仕様書](docs/technical-spec-v0.018.md)
- [音声入力ガイド](docs/voice-input-guide.md)
- [Gemini APIセットアップ](docs/gemini-setup.md)

## 🤝 コントリビューション

プルリクエストを歓迎します。大きな変更の場合は、まずissueを作成して変更内容を議論してください。

## 📄 ライセンス

[MIT License](LICENSE)

## 🙏 謝辞

- Google Gemini APIチーム
- shadcn/uiコミュニティ
- すべてのコントリビューター

---

**v0.020-stable** - 2025年1月11日リリース
開発: TANREN株式会社

### 📋 更新履歴
- v0.020 (2025-01-11): プロフェッショナルグレードへの完全リファクタリング
- v0.019 (2025-01-11): 音声ファイル管理機能の大幅改善
- v0.018 (2025-01-11): 完全な音声録音・文字起こし・字幕生成システム