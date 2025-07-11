# MD Buddy v0.019 クイックスタートガイド

## 🚀 5分で開発再開する方法

### 1. プロジェクトに移動
```bash
cd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web
```

### 2. PM2でサーバー起動
```bash
./scripts/start-pm2.sh
```

### 3. ブラウザでアクセス
```
http://localhost:8081
```

## 📝 主要機能の確認方法

### 音声録音→AI分析→3ファイル保存
1. 「新規作成」ボタンをクリック
2. エディタ上部の🎤アイコンをクリック
3. 録音開始→話す→停止
4. 「AI分析を開始」ボタンをクリック
5. 自動的に以下が作成される：
   - Markdownファイル（AI生成）
   - audio.webm（音声ファイル）
   - subtitles.srt（字幕ファイル）

### 音声再生機能
1. 音声録音済みのMarkdownファイルを選択
2. 右側のメタデータパネルに「関連ファイル」セクション表示
3. 音声プレーヤーで再生可能

## 🔧 トラブルシューティング

### サーバーが起動しない場合
```bash
# PM2をリセット
pm2 delete all
pm2 start ecosystem.config.js

# または直接起動
pnpm dev
```

### ポート8081が使用中の場合
```bash
# 使用中のプロセスを確認
lsof -i :8081

# プロセスを終了
kill -9 [PID]
```

## 📁 重要ファイルの場所

- **メイン実装**: `src/App.tsx`
- **音声プレーヤー**: `src/components/AudioPlayer.tsx`
- **メタデータパネル**: `src/components/MetadataPanel.tsx`
- **PM2設定**: `ecosystem.config.js`
- **完全な引き継ぎ書**: `HANDOVER_v0.019.md`

---
最終更新: 2025-07-11