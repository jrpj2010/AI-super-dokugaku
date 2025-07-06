# Gen-Spa Ultimate v5.0 - 究極のプレゼンテーションシステム

## 🎯 概要

Gen-Spa Ultimate v5.0は、**固定1280x720pxの美しいスライド**と**AI音声ナレーション**を組み合わせた、次世代プレゼンテーションシステムです。

### 特徴
- ✨ **固定サイズデザイン**: 1280x720px（720p）で完璧なレイアウト
- 🎙️ **AI音声ナレーション**: Gemini 2.5 Flash Preview TTS統合
- 📝 **SRT字幕生成**: 自動タイミング調整機能付き
- 🎨 **プロフェッショナルデザイン**: コンサルティングファーム品質
- 🚀 **簡単導入**: HTMLファイルを開くだけで利用可能

## 📁 ファイル構成

```
v5.0_究極版_20250705/
├── index.html                          # メインプレゼンテーションビューア
├── README.md                           # このファイル
│
├── css/
│   └── gen-spa-ultimate-styles.css     # 統一スタイルシート
│
├── js/
│   ├── gen-spa-tts-integration.js      # TTS統合システム
│   └── gen-spa-srt-generator.js        # SRT字幕生成モジュール
│
├── templates/
│   └── gen-spa-slide-templates.html    # 5種類のスライドテンプレート
│
├── prompts/
│   └── gen-spa-ultimate-system-prompt.md # AI生成用システムプロンプト
│
└── samples/
    ├── slide-01-title.html             # タイトルスライド
    ├── slide-02-agenda.html            # アジェンダ
    ├── slide-03-problem.html           # 課題提示
    ├── slide-04-solution.html          # ソリューション
    ├── slide-05-results.html           # 効果・結果
    ├── slide-06-methodology.html       # 方法論
    ├── slide-07-timeline.html          # 展望・ロードマップ
    ├── slide-08-case-study.html        # 成功事例
    ├── slide-09-workshop.html          # ワークショップ
    └── slide-10-next-action.html       # 次のアクション
```

## 🚀 使用方法

### 1. 基本的な閲覧

```bash
# ファイルをダウンロード後
open index.html
# または、ブラウザでindex.htmlを開く
```

### 2. スライド操作

| 操作 | 方法 |
|------|------|
| 次のスライド | 矢印キー（→）、スペースキー、「次へ」ボタン |
| 前のスライド | 矢印キー（←）、「前へ」ボタン |
| 最初のスライド | Homeキー |
| 最後のスライド | Endキー |
| フルスクリーン | 「フルスクリーン」ボタン、Escで解除 |
| 自動再生 | 「自動再生」ボタン（30秒間隔） |

### 3. 音声機能

- **音声再生**: 各スライドの「音声再生」ボタンをクリック
- **自動音声生成**: TTS統合システムが自動でナレーションを生成
- **SRT字幕**: 音声と同期した字幕ファイルを自動生成

## 🎨 デザイン仕様

### カラーパレット

```css
--primary: #00447c;    /* 濃紺 - 信頼感 */
--secondary: #006699;  /* 青 - 活力 */
--accent: #e5e7eb;     /* 薄グレー - 優しさ */
--background: #ffffff; /* 白 - クリーン */
```

### タイポグラフィ階層

| 要素 | サイズ | 用途 |
|------|--------|------|
| タイトル | 46px | スライドメインタイトル |
| セクションタイトル | 36px | セクション見出し |
| サブセクション | 26px | サブ見出し |
| 本文 | 18px | 通常のテキスト |
| キャプション | 14px | 補足・説明文 |

### レイアウト原則

- **固定サイズ**: 1280x720px（16:9アスペクト比）
- **余白ルール**: 外側パディング64px、要素間24px、セクション間48px
- **グリッドシステム**: 2カラム、3カラムレイアウト対応
- **レスポンシブ**: 表示サイズに応じて自動スケーリング

## 🎙️ 音声システム

### 対応話者（Gemini 2.5 Flash Preview TTS）

#### ビジネスプレゼンテーション推奨
- **男性**: Puck（誠実）、Charon（落ち着き）
- **女性**: Laomedeia（ナレーター向き）

#### 教育・研修推奨
- **男性**: Enceladus（父親的）
- **女性**: Callirrhoe（聞き慣れた声）

#### 製品紹介推奨
- **男性**: Kore（明るい）
- **女性**: Leda（アニメ声・明るい）

### 感情設定

- `happy` - 明るい・楽しい
- `excited` - 興奮・エネルギッシュ
- `neutral` - 中立・標準
- `serious` - 真剣・重要
- `calm` - 落ち着いた・穏やか

## 📝 新しいスライド作成

### 1. テンプレートを使用

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>新しいスライド</title>
    <link href="../css/gen-spa-ultimate-styles.css" rel="stylesheet">
    <script src="../js/gen-spa-tts-integration.js"></script>
</head>
<body>
    <div class="slide-container bg-white p-16" data-slide-id="new-slide" data-slide-type="business">
        <!-- スライドコンテンツ -->
        
        <!-- ナレーションテキスト（非表示） -->
        <div class="narration-text" style="display: none;">
            ここにナレーションテキストを入力
        </div>
    </div>
</body>
</html>
```

### 2. 利用可能なテンプレート

1. **タイトルスライド** - プレゼンテーションの表紙
2. **目次スライド** - アジェンダ・構成の表示
3. **2カラムコンテンツ** - テキスト+ビジュアルの組み合わせ
4. **データビジュアライゼーション** - グラフ・統計の表示
5. **まとめスライド** - 結論・次のアクション

### 3. AIを使った自動生成

`prompts/gen-spa-ultimate-system-prompt.md`のプロンプトを使用して、ChatGPTやClaudeでスライドを生成できます。

```
例：「営業チーム向けの新商品紹介スライドを5枚作成してください。
対象：法人営業担当者
トーン：プロフェッショナルで説得力のある
商品：AI顧客分析ツール」
```

## 🛠️ カスタマイズ

### CSSカスタマイズ

```css
/* 独自のカラーテーマ */
:root {
    --primary: #your-color;
    --secondary: #your-secondary;
}

/* 独自のコンポーネント */
.custom-card {
    background: var(--primary);
    padding: 24px;
    border-radius: 8px;
}
```

### JavaScript拡張

```javascript
// 独自の機能追加
class CustomPresentation extends GenSpaPresentation {
    customFunction() {
        // 独自の処理
    }
}
```

## 🔧 技術要件

### 必要な環境
- **ブラウザ**: Chrome 90+、Firefox 88+、Safari 14+
- **画面解像度**: 1280x720px以上推奨
- **インターネット接続**: CDNリソース読み込み用

### 依存関係
- Tailwind CSS 2.2.19（CDN）
- Font Awesome 6.0.0（CDN）
- Chart.js 3.9.1（CDN）
- Noto Sans JP フォント（Google Fonts）

### 音声機能の要件
- **バックエンドAPI**: `/api/tts/conversation`エンドポイント
- **音声形式**: WAV、MP3対応
- **字幕形式**: SRT形式

## 📊 パフォーマンス仕様

### 目標値
- **ページ読み込み**: 3秒以内
- **スライド切り替え**: 300ms以内
- **音声生成**: 10秒以内
- **ファイルサイズ**: 各スライド500KB以下

### 最適化手法
- 画像の遅延読み込み
- CSSの最小化
- JavaScriptの非同期読み込み
- ブラウザキャッシュの活用

## 🎯 使用事例

### 1. ビジネスプレゼンテーション
- 営業提案書
- 事業計画発表
- 投資家向けピッチ
- 四半期レビュー

### 2. 教育・研修
- 企業研修資料
- セミナー講演
- オンライン講座
- 技術説明会

### 3. マーケティング
- 製品紹介
- キャンペーン説明
- ブランド紹介
- 顧客事例発表

## 🤝 貢献・改善

### フィードバック歓迎
- 使いやすさの改善提案
- 新機能のアイデア
- バグ報告
- デザイン改善案

### 開発参加
- 新しいテンプレートの作成
- 音声システムの改良
- パフォーマンス最適化
- ドキュメント改善

## 📝 ライセンス

このプロジェクトは教育・研究目的での使用を想定しています。
商用利用の場合は、TANREN株式会社までお問い合わせください。

## 📞 お問い合わせ

**TANREN株式会社**
- CEO: 佐藤勝彦
- Email: info@tanren.co.jp
- Website: https://tanren.co.jp

---

## 🔄 更新履歴

### v5.0 (2025-01-05)
- 初回リリース
- 固定1280x720px設計採用
- AI音声ナレーション統合
- SRT字幕自動生成機能
- 10枚のサンプルスライド
- プレゼンテーションビューア搭載

### 今後の予定
- v5.1: リアルタイム共同編集機能
- v5.2: AR/VR対応
- v5.3: 多言語音声対応
- v6.0: 完全AI自動生成システム

---

**Gen-Spa Ultimate v5.0で、あなたのプレゼンテーションを次のレベルへ。**