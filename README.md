# Claude Code Action 実験プロジェクト

TANREN株式会社の Claude Code Action テスト用リポジトリです。

## 🎯 目的

- `@claude` を使った自動応答のテスト
- PRレビューの自動化検証
- コード修正の自動化検証

## 📝 テスト方法

1. Issueまたはプルリクエストを作成
2. コメントに `@claude 動作テスト` と記載
3. Claudeが自動で応答することを確認

## 🛠️ 技術スタック

- GitHub Actions
- Claude Code Action
- Anthropic API

## 📁 プロジェクト構造

```
claude-code-test/
├── .github/
│   └── workflows/
│       └── claude.yml
├── src/
│   └── sample.js
└── README.md
```
