# 思考3DXYZ会話分析システム

会話スクリプトを分析し、思考3DXYZメソッドに基づいて会話の構造とテーマを可視化するシステムです。

## 特徴

- 会話スクリプトの自動構造解析
- 思考3DXYZメソッドによるテーマ分析
- 分析結果のPDF出力
- レスポンシブデザイン
- APIキー管理機能

## セットアップ

### 前提条件

- Docker と Docker Compose がインストールされていること
- Node.js 18.x 以上 (ローカル開発用)

### Dockerを使用したセットアップ

1. リポジトリをクローン
   ```bash
   git clone <repository-url>
   cd conversation-analysis-system
   ```

2. Dockerイメージをビルド
   ```bash
   make build
   ```

3. コンテナを起動
   ```bash
   make run
   ```

4. ブラウザで http://localhost:3000 にアクセス

### ローカル開発環境のセットアップ

1. 依存関係をインストール
   ```bash
   npm install
   ```

2. 開発サーバーを起動
   ```bash
   npm run dev
   ```

3. ブラウザで http://localhost:3000 にアクセス

## 使用方法

1. 設定画面からGemini APIキーを設定
2. 会話スクリプトを入力エリアに貼り付け
3. 「分析実行」ボタンをクリック
4. 分析結果を確認

## APIエンドポイント

- `/api/structure` - 会話構造を分析
- `/api/analyze-theme` - テーマごとに詳細分析
- `/api/save-analysis` - 分析結果を保存
- `/api/get-analysis/[id]` - 保存済み分析を取得
- `/api/export-pdf/[id]` - 分析結果をPDF出力

## ライセンス

Copyright © 2024
