# 🎬 jet_split.sh 使用マニュアル

## 📋 概要

jet_split.shは、ジェットスプリットが生成する動画分割用シェルスクリプトです。このスクリプトを使用することで、セミナー動画を章・チャプター単位で無劣化分割できます。

## 🚀 使い方（3ステップ）

### ステップ1: ファイルの準備

1. **新しいフォルダを作成**
   ![フォルダ作成](https://via.placeholder.com/600x300/4A5568/FFFFFF?text=Step+1:+新しいフォルダを作成)
   
   デスクトップなどに新しいフォルダを作成します。
   例：`seminar_split`

2. **必要なファイルを配置**
   - 分割したい動画ファイル（例：`seminar.mp4`）
   - ダウンロードしたZIPファイルの中身
     - `jet_split.sh`
     - `chapters.xlsx`
     - `chapters.csv`
     - `README.md`

### ステップ2: ターミナルを開く

1. **Macでターミナルを起動**
   ![ターミナル起動](https://via.placeholder.com/600x300/2D3748/FFFFFF?text=Terminal+アプリケーション)
   
   - Spotlight検索（⌘ + Space）で「ターミナル」と入力
   - または、アプリケーション > ユーティリティ > ターミナル

2. **作成したフォルダに移動**
   ```bash
   cd ~/Desktop/seminar_split
   ```
   ※フォルダ名と場所は実際のものに合わせてください

### ステップ3: スクリプトを実行

1. **実行権限を付与**
   ```bash
   chmod +x jet_split.sh
   ```
   ![権限付与](https://via.placeholder.com/600x300/48BB78/FFFFFF?text=実行権限を付与)

2. **動画を分割**
   ```bash
   ./jet_split.sh seminar.mp4
   ```
   ※`seminar.mp4`は実際の動画ファイル名に置き換えてください

3. **処理の進行状況**
   ![処理中](https://via.placeholder.com/600x300/38B2AC/FFFFFF?text=分割処理中...)
   
   以下のような表示が出ます：
   ```
   🚀 ジェットスプリット - 動画分割を開始します
   📹 入力ファイル: seminar.mp4
   📊 分割数: 9個のチャプター

   [1/9] 📝 1_001_webmarketing-nyumon.mp4 を作成中...
   ✅ 1_001_webmarketing-nyumon.mp4 完了

   [2/9] 📝 1_002_digital-marketing-no-kihon-gainen.mp4 を作成中...
   ✅ 1_002_digital-marketing-no-kihon-gainen.mp4 完了
   ```

## 📁 出力結果

分割が完了すると、同じフォルダに以下のようなファイルが作成されます：

![出力結果](https://via.placeholder.com/600x300/5A67D8/FFFFFF?text=分割された動画ファイル)

```
seminar_split/
├── seminar.mp4（元の動画）
├── jet_split.sh
├── chapters.xlsx
├── chapters.csv
├── README.md
├── 1_001_webmarketing-nyumon.mp4 ← 新規作成
├── 1_002_digital-marketing-no-kihon-gainen.mp4 ← 新規作成
├── 1_003_seiko-jirei-kara-manabu.mp4 ← 新規作成
├── 2_004_sns-marketing-no-saishin-trend.mp4 ← 新規作成
└── ...（以下、すべてのチャプター）
```

### ファイル名の規則

`{章番号}_{チャプター番号:3桁}_{タイトル}.mp4`

- **章番号**: 1, 2, 3...
- **チャプター番号**: 001, 002, 003...（3桁のゼロ埋め）
- **タイトル**: 日本語を英数字に変換したもの

## ⚠️ よくあるトラブルと解決方法

### 1. 「Permission denied」エラー

![エラー画面](https://via.placeholder.com/600x300/F56565/FFFFFF?text=Permission+denied+エラー)

**原因**: スクリプトに実行権限がない

**解決方法**:
```bash
chmod +x jet_split.sh
```

### 2. 「command not found: ffmpeg」エラー

**原因**: FFmpegがインストールされていない

**解決方法**:
```bash
# Homebrewがある場合
brew install ffmpeg

# Homebrewがない場合は先にインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 3. 「No such file or directory」エラー

**原因**: 動画ファイル名が間違っている

**解決方法**:
- ファイル名を確認（大文字・小文字も正確に）
- スペースが含まれる場合は引用符で囲む
  ```bash
  ./jet_split.sh "My Seminar Video.mp4"
  ```

## 💡 便利な使い方

### タブ補完を使う

ファイル名の入力時、最初の数文字を入力してTabキーを押すと、自動的に補完されます：

```bash
./jet_split.sh sem[Tabキー] → ./jet_split.sh seminar.mp4
```

### ドラッグ&ドロップ

1. `./jet_split.sh `と入力（最後にスペース）
2. Finderから動画ファイルをターミナルにドラッグ&ドロップ
3. Enterキーで実行

## 🔍 処理時間の目安

| 動画の長さ | ファイルサイズ | 処理時間の目安 |
|-----------|--------------|--------------|
| 30分 | 500MB | 約20秒 |
| 60分 | 1GB | 約40秒 |
| 90分 | 2GB | 約60秒 |

※FFmpegの`-c copy`オプションにより、再エンコードなしで高速処理

## 📞 サポート

問題が解決しない場合は、以下の情報と共にサポートにお問い合わせください：

1. エラーメッセージのスクリーンショット
2. 使用しているmacOSのバージョン
3. 動画ファイルの形式（.mp4、.mov等）

---

*このマニュアルはジェットスプリット v1.0用です*