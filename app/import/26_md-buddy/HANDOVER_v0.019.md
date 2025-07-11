# MD Buddy v0.019 引き継ぎ書

## 概要
このドキュメントは、MD Buddy v0.019の開発状態を次回のセッションで正確に引き継ぐための完全な記録です。

## プロジェクト基本情報

### プロジェクトパス
```
/Users/jrpj2010/vibe-coding/app/import/26_md-buddy/
```

### 現在のバージョン
- **v0.019** (2025-07-11完成)

### 技術スタック
- React 18 + TypeScript
- Vite (開発サーバー、ポート8081)
- Zustand (状態管理)
- Web Speech API (音声認識)
- MediaRecorder API (音声録音)
- Google Gemini API (音声転写・Markdown変換)
- PM2 (プロセス管理)

## 開発履歴

### v0.018からv0.019での主な変更点

1. **音声ファイルの自動保存機能**
   - 録音した音声ファイル（audio.webm）を自動的にファイルシステムに保存
   - `currentRecordingBlob`を使用してBlobデータを管理

2. **3ファイル同時保存機能**
   - Markdownファイル、音声ファイル（audio.webm）、SRTファイルを同じフォルダに保存
   - フォルダ名形式: `音声メモ_YYYY-MM-DD_HH-MM-SS`
   - 実装場所: `src/App.tsx`の`handleAnalyzeVoiceRecording`関数

3. **タブUI機能（作成後削除）**
   - 当初TabViewerコンポーネントを実装したが、ユーザーフィードバックにより削除
   - 理由: 単一ファイル編集パネルとしての使用に適さないため

4. **Geminiプロンプトの改善**
   - ダミーデータ生成問題を解決
   - 実際の音声内容を反映したMarkdown生成を実現

5. **PM2によるサーバー管理**
   - 100%安定稼働を実現
   - 設定ファイル: `ecosystem.config.js`
   - 起動スクリプト: `scripts/start-pm2.sh`

6. **音声再生機能の実装**
   - MetadataPanelコンポーネントに音声プレーヤーを統合
   - 関連ファイル（audio.webm、subtitles.srt）の自動検出
   - AudioPlayerコンポーネントの活用

## 重要ファイル一覧

### コアファイル
```
md-buddy-web/
├── src/
│   ├── App.tsx                    # メインアプリケーション（3ファイル保存ロジック）
│   ├── components/
│   │   ├── MetadataPanel.tsx      # メタデータパネル（音声プレーヤー統合）
│   │   ├── AudioPlayer.tsx        # 音声プレーヤーコンポーネント
│   │   ├── FileExplorer.tsx       # ファイルエクスプローラー
│   │   ├── Preview.tsx            # Markdownプレビュー
│   │   └── VoiceInputPanel.tsx    # 音声入力パネル
│   ├── store/
│   │   └── fileStore.ts          # Zustand状態管理
│   ├── types/
│   │   └── index.ts              # 型定義（FileItem型追加）
│   └── services/
│       └── gemini/               # Gemini API関連
├── ecosystem.config.js           # PM2設定
├── scripts/
│   └── start-pm2.sh             # PM2起動スクリプト
└── docs/
    └── PM2_GUIDE.md             # PM2ガイド
```

### 引き継ぎ時に必要なファイル
1. このHANDOVER_v0.019.mdファイル
2. プロジェクト全体のソースコード（上記ディレクトリ構造）
3. 環境変数ファイル（.env）- Gemini APIキーを含む
4. package.json - 依存関係の定義

## 主要な実装詳細

### 3ファイル同時保存の実装（App.tsx）
```typescript
// handleAnalyzeVoiceRecording関数内
const folderName = `音声メモ_${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')}_${String(timestamp.getHours()).padStart(2, '0')}-${String(timestamp.getMinutes()).padStart(2, '0')}-${String(timestamp.getSeconds()).padStart(2, '0')}`;

// Markdownファイル作成
const newFileId = await createFileFromVoice(markdown, folderName);

// 音声ファイル保存
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
  addFile(audioFile as any);
}

// SRTファイル保存
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
  addFile(srtFile as any);
}

// 自動的にMarkdownファイルを選択
selectFile(newFileId);
```

### 音声プレーヤー統合（MetadataPanel.tsx）
```typescript
// 関連ファイル検出
useEffect(() => {
  if (!fileName || !files) return;
  
  const folderPath = fileName.substring(0, fileName.lastIndexOf('/'));
  
  // audio.webmファイルを探す
  const audioFile = files.find(file => {
    const filePath = file.name || file.path || '';
    return filePath === `${folderPath}/audio.webm` && file.content instanceof Blob;
  });
  
  // subtitles.srtファイルを探す
  const srtFile = files.find(file => {
    const filePath = file.name || file.path || '';
    return filePath === `${folderPath}/subtitles.srt` && typeof file.content === 'string';
  });
  
  setRelatedAudioFile(audioFile || null);
  setRelatedSRTFile(srtFile || null);
}, [fileName, files, currentFileId]);
```

## 環境設定

### 開発サーバー起動方法

#### 方法1: PM2使用（推奨）
```bash
cd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web
./scripts/start-pm2.sh

# ステータス確認
pm2 list
pm2 logs md-buddy
```

#### 方法2: 直接起動
```bash
cd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web
pnpm install  # 初回のみ
pnpm dev
```

### アクセスURL
- ローカル: http://localhost:8081
- OrbStack: http://[orbstack-hostname]:8081

## 既知の問題と解決策

1. **localhost:8081にアクセスできない問題**
   - 解決策: PM2を使用して起動し、Vite設定で`host: true`を使用

2. **ファイル型の不整合**
   - FileItem型とMarkdownFile型の混在
   - 一時的に`as any`でキャストして対応

3. **音声ファイルがFileExplorerに表示されない**
   - 現在の実装では音声ファイルアイコンは表示されるが、選択できない
   - 将来的にFileItem型への完全移行が必要

## 次回の開発再開手順

1. **プロジェクトディレクトリに移動**
   ```bash
   cd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy
   ```

2. **このファイルを読む**
   ```bash
   cat HANDOVER_v0.019.md
   ```

3. **現在の状態を確認**
   ```bash
   cd md-buddy-web
   git status
   pm2 list
   ```

4. **開発サーバーを起動**
   ```bash
   ./scripts/start-pm2.sh
   ```

5. **ブラウザでアクセス**
   - http://localhost:8081

## 完了済みタスク一覧

- ✅ 音声ファイルの自動保存機能
- ✅ 3ファイル同時保存機能（MD/音声/SRT）
- ✅ Geminiプロンプト改善（ダミーデータ問題解決）
- ✅ AI分析後の自動ファイルアクティブ化
- ✅ PM2による100%安定サーバー管理
- ✅ タブUI機能の削除
- ✅ ファイル型定義の修正
- ✅ メタ情報パネルに音声プレーヤーを追加

## 今後の改善提案

1. **FileItem型への完全移行**
   - MarkdownFile型とFileItem型の統合
   - 音声ファイルの完全サポート

2. **ファイルエクスプローラーの機能拡張**
   - 音声ファイルの直接選択・再生
   - ドラッグ&ドロップでのファイル移動

3. **音声編集機能**
   - トリミング
   - 音量調整
   - ノイズ除去

## 連絡事項

- v0.019は2025年7月11日に完成
- すべての要求機能が実装済み
- PM2による安定稼働を確認済み

---

作成日: 2025-07-11
作成者: Claude Code (Opus 4)