# KatsuSparkスライド生成システム 実行サンプル

このドキュメントでは、[Claude Code][Gemini Code]を使用してUser_input.mdから20枚のスライドを生成する方法を説明します。

## 🚀 実行手順

### 1. プロジェクトディレクトリに移動

```bash
cd /Users/jrpj2010/vibe-coding/sato_managed_contents/Katsu-Spa3.0/20250709 KatsuSpark完成
```

### 2. 出力ディレクトリの作成

```bash
mkdir -p output/Claude-Opus4サンプル
```

### 3. [Claude Code][Gemini Code]でのスライド生成

以下のコマンドを[Claude Code][Gemini Code]で順番に実行します：

#### Step 1: コンテンツ解析

```bash
claude "prompts/analyzer.mdのプロンプトに従って、
../User_input.mdの内容を解析し、
超抽象化・超具体化・超構造化を実行してください。
結果をoutput/analysis.jsonに保存してください。"
```

#### Step 2: スライド構造設計

```bash
claude "prompts/structurer.mdのプロンプトに従って、
output/analysis.jsonの解析結果から
20枚のスライド構造を設計してください。
結果をoutput/structure.jsonに保存してください。"
```

#### Step 3: HTMLスライド生成

```bash
claude "prompts/generator.mdのプロンプトに従って、
output/structure.jsonの設計情報から
20枚のHTMLスライドを生成してください。
各スライドをoutput/Claude-Opus4サンプル/slide-XX-[内容].htmlとして保存してください。
templates/フォルダ内のテンプレートを活用してください。"
```

#### Step 4: ビューワー作成

```bash
claude "output/Claude-Opus4サンプル/内の全スライドを
ナビゲーション可能なビューワーページ(output/viewer.html)を
作成してください。左右矢印キーでスライド切り替えができるようにしてください。"
```

## 📁 生成されるファイル構造

```
output/
├── analysis.json         # Step 1の解析結果
├── structure.json        # Step 2の構造設計
├── viewer.html          # スライドビューワー
└── Claude-Opus4サンプル/       # 生成されたスライド
    ├── slide-01-title.html
    ├── slide-02-agenda.html
    ├── slide-03-background.html
    ├── ...
    └── slide-20-contact.html
```

## 🎯 ワンコマンド実行（上級者向け）

すべてのステップを一度に実行する場合：

```bash
claude "以下を順番に実行してください：
1. ../User_input.mdを読み込み
2. prompts/analyzer.mdに従って内容を解析
3. prompts/structurer.mdに従って20枚の構造を設計
4. prompts/generator.mdとtemplates/を使用してHTMLを生成
5. output/Claude-Opus4サンプル/にslide-01からslide-20まで保存
6. output/viewer.htmlを作成
各ステップの結果を適切にログ出力してください。"
```

## 🔍 品質確認チェックリスト

生成後、以下を確認してください：

- [ ] 20枚のスライドがすべて生成されている
- [ ] 各スライドが1280×720pxで表示される
- [ ] 日本語フォント（Noto Sans JP）が正しく適用されている
- [ ] アイコン（Font Awesome）が表示されている
- [ ] グラデーションやアニメーションが動作している
- [ ] viewer.htmlでスライド間の移動ができる

## 💡 カスタマイズのヒント

### テーマカラーの変更

- ClaudeCodeの場合は[CLAUDE.md]のカラーパレットセクションを編集：
- GeminiCodeの場合は[Gemini.md]のカラーパレットセクションを編集：

```markdown
- プライマリー: #007BFF → #您的颜色
- グラデーション: linear-gradient(135deg, #007BFF 0%, #0056b3 100%) → 您的渐变
```

### スライド枚数の変更

structurer.mdプロンプトで枚数を指定：

```markdown
## 目的
入力されたコンテンツ解析結果から、25枚のスライド構造を設計します。
```

### レイアウトの追加

templates/layouts/に新しいレイアウトHTMLを追加し、generator.mdに記載。

## 🆘 トラブルシューティング

### エラーが発生した場合

1. **ファイルが見つからない**
   ```bash
   claude "必要なファイルとディレクトリ構造を確認してください"
   ```

2. **スタイルが崩れる**
   ```bash
   claude "生成されたHTMLのCDNリンクが正しいか確認してください"
   ```

3. **日本語が文字化けする**
   ```bash
   claude "UTF-8エンコーディングとmeta charsetタグを確認してください"
   ```

## 📝 実行ログの例

```
[Step 1] コンテンツ解析開始...
- トピック抽出: 5個
- キーワード: 23個
- 構造分析完了
→ output/analysis.json 保存完了

[Step 2] スライド構造設計開始...
- タイトルスライド: 1枚
- アジェンダ: 1枚
- メインコンテンツ: 15枚
- まとめ: 2枚
- 連絡先: 1枚
→ output/structure.json 保存完了

[Step 3] HTML生成開始...
- slide-01-title.html ✓
- slide-02-agenda.html ✓
...
- slide-20-contact.html ✓
→ 全20枚生成完了

[Step 4] ビューワー作成...
→ output/viewer.html 保存完了

✅ スライド生成が完了しました！
```

---

このサンプルに従って、[Claude Code][Gemini.md]で高品質なスライドを自動生成してください。
