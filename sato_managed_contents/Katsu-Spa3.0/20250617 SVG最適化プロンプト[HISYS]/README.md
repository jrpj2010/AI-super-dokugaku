# Cursor徹底解説 - SVG最適化プロンプト集

## 📁 フォルダ概要

このフォルダには、既存の「😊日立システム向けテンプレ.md」HTMLスライドテンプレートを参考に、**SVG形式での1スライド1ファイル出力**に最適化されたプロンプト集が収録されています。

元のHTMLテンプレートのデザイン・CSS・構造は一切変更せず、同等品質のSVGスライドを生成するためのClaude Code専用プロンプトシステムです。

## 🎯 主な特徴

- **完全SVG出力**: 1280x720px、ベクター形式で高品質
- **日立フォーマット準拠**: 元テンプレートと完全一致のデザイン
- **1スライド1ファイル**: slide-01.svg ～ slide-10.svg の個別生成
- **アクセシビリティ対応**: WCAG AA準拠、スクリーンリーダー対応
- **印刷・エクスポート最適化**: 高解像度対応、PDF/PNG変換対応

## 📄 収録ファイル一覧

### 1. メインSVGプロンプトテンプレート.md
**基本仕様とテンプレート**
- SVG生成の基本仕様
- 日立デザイン基準の詳細
- アクセシビリティ対応方法
- SVG構造テンプレート
- 使用手順とガイドライン

### 2. 10種類スライドパターン別プロンプト.md
**各スライド専用プロンプト**
- スライド1: タイトルページ（メトリクス付き）
- スライド2: エグゼクティブサマリー（4象限マトリクス）
- スライド3: ブリッジ（市場分析導入）
- スライド4: 市場分析（3段階進化図）
- スライド5: ブリッジ（戦略的価値導入）
- スライド6: 戦略的価値（6機能グリッド）
- スライド7: ROI分析（詳細4象限）
- スライド8: ブリッジ（導入戦略導入）
- スライド9: 導入戦略（3フェーズタイムライン）
- スライド10: Next Action（CTA中心）

### 3. Claude Code実行手順書.md
**実践的な使用方法**
- クイックスタートガイド
- 詳細実行手順
- 品質チェック用プロンプト
- トラブルシューティング
- 応用・カスタマイズ方法
- 完成版チェックリスト

### 4. SVG品質チェックリスト&テスト用プロンプト.md
**品質管理システム**
- 4段階品質チェックリスト
- テスト用プロンプト9種類
- 品質スコアリング（100点満点）
- 自動化テストプロンプト
- 最終承認システム

## 🚀 使用開始方法

### Step 1: 基本準備
```bash
# 作業ディレクトリ作成
mkdir -p "Cursor徹底解説_SVGスライド_$(date +%Y%m%d)"
cd "Cursor徹底解説_SVGスライド_$(date +%Y%m%d)"
```

### Step 2: プロンプト実行
```bash
# メインテンプレートを確認
cat "../SVG最適化プロンプト_20250617/メインSVGプロンプトテンプレート.md"

# スライド1生成
claude "メインSVGプロンプトテンプレートと10種類スライドパターン別プロンプトを参考に、
スライド1（タイトルページ）のSVGを作成してください。"

# 以下、スライド2-10も同様に実行...
```

### Step 3: 品質チェック
```bash
# 全体品質チェック
claude "SVG品質チェックリスト&テスト用プロンプトの
一括品質チェックプロンプトを実行してください。"
```

## 🎨 デザイン仕様（厳守事項）

### カラーパレット
- **プライマリ**: #404040（メインテキスト）
- **セカンダリ**: #656d76（サブテキスト）
- **アクセント**: #667eea（強調・リンク）
- **グラデーション**: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

### フォント
- **メインフォント**: 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif
- **サイズ階層**: H1(32-48px) > H2(24-32px) > H3(16-20px) > 本文(12-18px)

### 背景画像（NotionURL使用）
- ロゴ（右上配置）
- humanIT（左下配置）
- ボーダー（上部帯状）
- フッター（右下配置）

## 📏 技術仕様

### SVG基本設定
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 1280 720" 
     width="1280" 
     height="720">
```

### 品質目標
- **ファイルサイズ**: 各500KB以下
- **アクセシビリティ**: WCAG AA準拠
- **ブラウザ対応**: Chrome/Safari/Firefox/Edge
- **印刷品質**: A4用紙で可読性確保

## 🔄 ワークフロー

### 開発フェーズ
1. **プロンプト実行**: 各スライドの個別生成
2. **品質チェック**: 自動テストによる検証
3. **最適化**: ファイルサイズ・パフォーマンス改善
4. **最終確認**: 全体統一性とブランド準拠確認

### カスタマイズフェーズ
1. **バリエーション**: A4印刷版、ダークテーマ版
2. **多言語対応**: 英語版、中国語版の生成
3. **応用展開**: アニメーション、インタラクション追加

## 📊 品質管理

### 評価基準（100点満点）
- **技術品質**: 30点（SVG仕様準拠、最適化、パフォーマンス）
- **デザイン品質**: 30点（日立フォーマット準拠、統一性）
- **アクセシビリティ**: 25点（WCAG準拠、スクリーンリーダー対応）
- **互換性・実用性**: 15点（ブラウザ対応、印刷品質）

### 品質レベル
- **🏆 Excellent** (90-100点): 商用利用可能レベル
- **✅ Good** (75-89点): 実用レベル
- **⚠️ Needs Improvement** (60-74点): 修正必要
- **❌ Poor** (60点未満): 大幅修正必要

## 🎯 期待される成果物

### 最終出力
- **slide-01.svg ～ slide-10.svg**: 10個の完全スタンドアロンSVGファイル
- **品質レポート**: 各ファイルの品質スコアと改善提案
- **使用ガイド**: ブラウザ表示、印刷、エクスポート方法

### 応用展開
- **プレゼンテーション資料**: 高品質SVGスライドセット
- **印刷配布資料**: A4最適化版
- **Webコンテンツ**: レスポンシブ対応版
- **多言語版**: 英語・中国語等の翻訳版

## 📞 サポート・問い合わせ

このプロンプト集の使用に関するご質問や改善提案がございましたら、
TANREN株式会社 開発支援事業部までお気軽にお問い合わせください。

---

**作成日**: 2025年6月17日  
**バージョン**: v1.0  
**対応**: Claude Code専用（Claude 3.5 Sonnet以降推奨）  
**ライセンス**: TANREN株式会社内部利用専用