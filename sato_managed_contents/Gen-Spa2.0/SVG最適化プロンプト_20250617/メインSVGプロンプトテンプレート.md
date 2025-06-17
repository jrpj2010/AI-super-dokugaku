# Cursor徹底解説 SVG出力最適化プロンプト

## 基本プロンプト構造

### Step 1: 基本仕様指定

```
Cursor勉強会のSVGスライドを作成してください。

【要件】
- 出力形式: SVG（ベクター形式）
- サイズ: 1280x720px（16:9比率）
- 1スライド1ファイル構成
- 日立フォーマット準拠
- 高解像度対応（ベクターの利点活用）

【出力先】
各スライドごとに「slide-01.svg」「slide-02.svg」...「slide-10.svg」として保存

【技術仕様】
- SVG 1.1準拠
- テキストは埋め込み形式（font-family指定）
- 画像はbase64埋め込みまたは外部URL参照
- 印刷・エクスポート最適化
- レスポンシブ対応（viewBox使用）
```

### Step 2: デザイン基準

```
【SVG設計原則】
- viewBox="0 0 1280 720" 固定
- 日立カラーパレット厳守:
  * プライマリ: #404040
  * セカンダリ: #656d76
  * アクセント: #667eea
  * グラデーション: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  * 背景: #ffffff

【フォント指定】
- メインフォント: 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif
- 見出し: font-weight="700"
- 本文: font-weight="400"
- サイズ: 720p最適化（見出し32-48px、本文14-18px）

【背景画像URL】
以下の正確なNotionURLを使用:
- ロゴ: https://tanren.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a%2F120b98bf-9f70-42a1-98ef-e7deb749811d%2Flogo.png?table=block&id=12031bbd-522c-80a2-9c04-c933dc1ce4fc&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=1420&userId=&cache=v2

- humanIT: https://tanren.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a%2F9e520a5c-2771-4548-ac3c-0bb2aabede0f%2FhumanIT.png?table=block&id=12031bbd-522c-80dc-baa7-f3ee7b071e7a&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=1420&userId=&cache=v2

- ボーダー: https://tanren.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a%2F20677364-1d2f-4aad-9df5-15c3ba3ef700%2Fborder.png?table=block&id=12031bbd-522c-807f-99af-d52cd9564099&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=1420&userId=&cache=v2

- フッター: https://tanren.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a%2F135f8281-8854-43aa-a03d-7e1a4448846b%2Ffooter.png?table=block&id=12031bbd-522c-80c2-8d35-e7e8f6559e6c&spaceId=5bbf9b8e-3573-405c-a212-b5bd3d2b1e5a&width=1420&userId=&cache=v2
```

### Step 3: SVG構造テンプレート

```
【必須SVG構造】
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 1280 720" 
     width="1280" 
     height="720">
  
  <!-- グラデーション定義 -->
  <defs>
    <linearGradient id="hitachiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea"/>
      <stop offset="100%" style="stop-color:#764ba2"/>
    </linearGradient>
    
    <!-- シャドウ効果 -->
    <filter id="dropShadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
    </filter>
  </defs>
  
  <!-- 背景 -->
  <rect width="1280" height="720" fill="#ffffff"/>
  
  <!-- 背景画像配置 -->
  <!-- メインコンテンツ -->
  <!-- フォント埋め込み -->
</svg>
```

### Step 4: アクセシビリティ対応

```
【アクセシビリティ必須要素】
- タイトル要素: <title>スライドタイトル</title>
- 説明要素: <desc>スライド内容の説明</desc>
- role="img" 属性追加
- aria-labelledby属性でタイトル参照
- テキストのコントラスト比確保（WCAG AA準拠）
- フォーカス可能要素の outline 対応

【SVGアクセシビリティテンプレート】
<svg ... role="img" aria-labelledby="slide-title" aria-describedby="slide-desc">
  <title id="slide-title">スライド1: タイトルページ</title>
  <desc id="slide-desc">Cursor徹底解説のタイトルスライド。67%開発時間短縮、10X生産性向上、0コーディング経験不要の3つのメトリクスを表示。</desc>
  <!-- スライド内容 -->
</svg>
```

## 使用手順

### Claude Codeでの実行方法

1. **基本プロンプト実行**
```bash
claude "上記の基本仕様でスライド1（タイトル）のSVGを作成してください。
ファイル名: slide-01.svg
内容: タイトル「Cursor徹底解説」、サブタイトル「次世代AI駆動開発プラットフォームの全貌」
メトリクス: 67%開発時間短縮、10X生産性向上、0コーディング経験不要"
```

2. **品質チェック**
```bash
claude "作成したSVGの品質をチェックしてください：
- viewBox設定の確認
- フォント埋め込みの確認
- 色彩・レイアウトの日立基準準拠
- アクセシビリティ要素の確認"
```

3. **最適化実行**
```bash
claude "SVGファイルサイズを最適化してください：
- 不要な空白・改行の削除
- パス最適化
- 重複要素の統合
- コメント削除"
```

## 品質基準

### 必須チェック項目

✅ **技術仕様**
- SVG 1.1準拠
- viewBox="0 0 1280 720"設定
- 外部依存なし（完全スタンドアロン）

✅ **デザイン準拠**
- 日立カラーパレット使用
- 指定フォント使用
- レイアウト一貫性

✅ **パフォーマンス**
- ファイルサイズ 500KB以下
- レンダリング速度最適化
- 印刷品質確保

✅ **アクセシビリティ**
- WCAG AA準拠
- スクリーンリーダー対応
- キーボードナビゲーション

## 応用展開

### バリエーション生成
- A4印刷用（縦型レイアウト）
- SNS投稿用（正方形）
- モバイル最適化版

### 多言語対応
- 英語版スライド
- 中国語版スライド
- フォント切り替え対応

### インタラクティブ要素
- ホバー効果追加
- アニメーション要素
- クリックイベント