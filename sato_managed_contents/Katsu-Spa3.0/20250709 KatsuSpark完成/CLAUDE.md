# FKatsuSpark高品質スライド生成システム

このプロジェクトは、日本語の議事録や文章から、KatsuSparkHTMLスライドを自動生成するシステムです。

## 🎯 ミッション

ユーザーから提供された日本語テキスト（議事録、講演内容、資料など）を解析し、視覚的に美しく、内容が整理された20枚のプレゼンテーションスライドを自動生成します。

## 🛠 技術仕様

### スライドの基本仕様
- **サイズ**: 1280px × 720px（16:9 HD）固定
- **フォーマット**: 独立したHTMLファイル
- **スタイリング**: Tailwind CSS（CDN版）
- **フォント**:
  - 日本語: Noto Sans JP (300, 400, 500, 700, 900)
  - 英数字: Arial, sans-serif
- **アイコン**: Font Awesome 6.4.0
- **カラーパレット**:
  - プライマリー: #007BFF
  - グラデーション: linear-gradient(135deg, #007BFF 0%, #0056b3 100%)
  - 背景: #ffffff → #f8fafc
  - テキスト: #333333（見出し）、#666666（本文）

### HTMLテンプレート構造（100%見切れ回避対応版）
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[スライドタイトル]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * { font-family: 'Noto Sans JP', sans-serif; }
        body { margin: 0; padding: 0; overflow: hidden; }
        .gradient-text {
            background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
    <!-- 🔒 見切れ回避の必須CSS -->
    <style>html,body{margin:0 !important;padding:0 !important;overflow: hidden !important;} html { height: 720px !important; } body { height: 720px !important; } .slide { height: 720px !important; }</style>
</head>
<body>
    <div class="slide w-[1280px] h-[720px] flex flex-col">
        <header class="slide--header flex-none pt-8 px-12 pb-4">
            <!-- 固定ヘッダー領域 -->
        </header>
        <main class="slide--main flex-1 px-12 py-4">
            <!-- 可変コンテンツ領域 -->
        </main>
    </div>
</body>
</html>
```

## 📋 スライド生成プロセス

### Phase 1: コンテンツ解析
1. 入力テキストを読み込み、主要トピックを抽出（超抽象化）
2. 具体例、データ、引用を識別（超具体化）
3. 論理構造とフローを分析（超構造化）
4. 20枚のスライドに最適な内容配分を決定

### Phase 2: スライド設計
各スライドのタイプと役割を決定：
1. **タイトルスライド**: 講演タイトル、サブタイトル、講師情報
2. **アジェンダ**: 目次、時間配分
3. **イントロダクション**: 背景、目的、対象者
4. **メインコンテンツ**: 各トピックの詳細（10-12枚）
5. **事例・デモ**: 具体例、実演結果
6. **まとめ**: 要点整理、次のアクション
7. **Q&A/連絡先**: 質疑応答、問い合わせ先

### Phase 3: ビジュアルデザイン
- **レイアウトパターン**:
  - フルスクリーン（タイトル）
  - 2カラム（説明+図解）
  - 3カラムカード（比較、選択肢）
  - リスト形式（箇条書き、番号付き）
  - グラフ/図解（データ可視化）

- **デザイン要素**:
  - gradient-text: 重要な見出し
  - floating-card: 情報カード
  - icon-bg: アイコン背景
  - accent-line: 区切り線

### Phase 4: HTML生成
- 各スライドを独立したHTMLファイルとして生成
- ファイル名: slide-[番号]-[内容].html（例: slide-01-title.html）
- すべてのスタイルはインラインまたは`<style>`タグ内に記述
- **重要**: 見切れ回避のためFlexbox三層構造（header-main）を必須適用

## 🎨 デザインパターン集

### タイトルスライド
```html
<div class="flex flex-col items-center justify-center h-full px-16">
    <h1 class="gradient-text text-7xl font-black mb-6">[メインタイトル]</h1>
    <h2 class="text-3xl text-slate-700 mb-12">[サブタイトル]</h2>
    <div class="flex items-center gap-6">
        <div class="icon-bg w-20 h-20 rounded-full flex items-center justify-center">
            <i class="fa-solid fa-user-tie text-white text-3xl"></i>
        </div>
        <div>
            <p class="text-slate-500 text-lg">講師</p>
            <p class="text-slate-800 text-3xl font-bold">[講師名]</p>
        </div>
    </div>
</div>
```

### コンテンツスライド（3カラム）
```html
<div class="grid grid-cols-3 gap-8 px-16">
    <div class="floating-card rounded-2xl p-6">
        <div class="icon-bg w-16 h-16 rounded-full mb-4">
            <i class="fa-solid fa-[アイコン] text-white text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">[見出し]</h3>
        <p class="text-gray-600">[説明文]</p>
    </div>
    <!-- 繰り返し -->
</div>
```

### データ可視化スライド
```html
<div class="flex items-center justify-center h-full">
    <div class="w-[800px] h-[500px]" id="chart"></div>
</div>
<script>
    // EChartsを使用したグラフ描画
</script>
```

## 💡 実行時の指示

ユーザーがテキストファイルを提供した場合：

1. **解析フェーズ**:
   - テキストを読み込み、セクションと重要ポイントを特定
   - 専門用語、数値データ、引用を抽出
   - 論理的な流れを構築

2. **構造化フェーズ**:
   - 20枚のスライド構成を決定
   - 各スライドのタイトルと主要コンテンツを定義
   - ビジュアル要素（アイコン、レイアウト）を選定

3. **生成フェーズ**:
   - 各スライドのHTMLを生成
   - output/Claude-Opus4サンプル/フォルダに保存
   - viewer.htmlでプレビュー可能に

## 🚀 パフォーマンス最適化

- **並列処理**: 複数のスライドを同時に生成
- **テンプレート再利用**: 共通要素は効率的に使い回す
- **最小限のリソース**: 外部依存はCDNのみ

## 📐 品質保証チェックリスト

生成されたスライドは以下を満たす必要があります：

- [ ] 1280×720pxの固定サイズ
- [ ] 日本語フォントの正しい表示
- [ ] グラデーションとカラーの一貫性
- [ ] アイコンの適切な使用
- [ ] テキストの可読性（サイズ、コントラスト）
- [ ] レイアウトのバランス
- [ ] 情報の論理的な流れ
- [ ] **必須**: 100%見切れ回避（Flexbox三層構造適用）
- [ ] **必須**: CSS強制リセット適用（`!important`付き）

## 🔧 トラブルシューティング

- **フォントが表示されない**: Google Fontsの読み込みを確認
- **レイアウトが崩れる**: Tailwind CSSのCDNリンクを確認
- **アイコンが表示されない**: Font AwesomeのCDNリンクを確認
- **サイズが合わない**: bodyとhtmlのoverflow: hiddenを確認
- **⚠️ コンテンツが見切れる**: 以下を確認
  1. CSS強制リセットが適用されているか
  2. Flexbox三層構造（header-main）が実装されているか
  3. paddingサイズが適切か（pt-8 px-12 py-4推奨）
  4. フォントサイズが720px高さに適合しているか

## 🚫 見切れ回避の重要原則

**絶対に守るべき3つの原則**:

1. **CSS強制リセット（必須）**
   ```html
   <style>html,body{margin:0 !important;padding:0 !important;overflow: hidden !important;} html { height: 720px !important; } body { height: 720px !important; } .slide { height: 720px !important; }</style>
   ```

2. **Flexbox三層構造（必須）**
   ```html
   <div class="slide w-[1280px] h-[720px] flex flex-col">
       <header class="slide--header flex-none pt-8 px-12 pb-4">
           <!-- 固定ヘッダー -->
       </header>
       <main class="slide--main flex-1 px-12 py-4">
           <!-- 可変コンテンツ -->
       </main>
   </div>
   ```

3. **最適化されたサイズ設定**
   - メインタイトル: `text-4xl` (text-5xl以上は禁止)
   - セクションタイトル: `text-xl` (text-2xl以上は禁止)
   - カードpadding: `p-4` (p-6以上は禁止)
   - gap: `gap-6` (gap-8以上は禁止)

**この3原則により、数学的に100%見切れが回避されます。**

---

このシステムプロンプトに従って、**見切れのない**高品質なスライドを自動生成してください。
