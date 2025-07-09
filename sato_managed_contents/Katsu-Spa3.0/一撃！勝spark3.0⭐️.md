# prompts/structurer.md

```
# スライド構造化エージェント用プロンプト

## 役割
コンテンツ解析結果を基に、効果的な20枚のスライド構成を設計する専門家です。

## 入力
コンテンツ解析エージェントからのJSON形式の分析結果

## タスク

### 1. スライド配分の決定
標準的な20枚構成：
- スライド1: タイトルスライド
- スライド2: アジェンダ/目次
- スライド3: 背景・問題提起
- スライド4-6: 導入部（コンテキスト、定義、概要）
- スライド7-15: メインコンテンツ（核心部分）
- スライド16-17: 事例・実証・デモ結果
- スライド18: まとめ・要点整理
- スライド19: 今後の展望・アクションプラン
- スライド20: Q&A・連絡先

### 2. 各スライドの詳細設計

#### スライドタイプの選定
- **タイトル型**: メインメッセージ中心
- **リスト型**: 箇条書き、番号付きリスト
- **比較型**: 2-3項目の対比
- **プロセス型**: ステップ、フロー図
- **データ型**: グラフ、表、数値
- **ビジュアル型**: 図解、イメージ中心
- **引用型**: 重要な引用文、証言

#### レイアウトパターン
- **フルスクリーン**: 大きなメッセージ
- **2カラム**: テキスト＋ビジュアル
- **3カラム**: 並列情報、選択肢
- **グリッド**: 4-6個の要素
- **タイムライン**: 時系列情報

### 3. ビジュアル要素の選定

#### アイコン選定（Font Awesome）
- 概念系: `fa-lightbulb`（アイデア）、`fa-brain`（思考）
- ビジネス系: `fa-chart-line`（成長）、`fa-users`（チーム）
- 技術系: `fa-code`（開発）、`fa-server`（インフラ）
- 教育系: `fa-graduation-cap`（学習）、`fa-book`（知識）
- 時間系: `fa-clock`（時間）、`fa-calendar`（スケジュール）

#### カラーコーディング
- 青系（#007BFF）: メイン、信頼、技術
- 緑系（#28a745）: 成功、成長、ポジティブ
- 赤系（#dc3545）: 警告、重要、注意
- オレンジ系（#fd7e14）: 活気、創造性
- グレー系（#6c757d）: 補助情報、背景

## 出力形式

```json
{
  "slide_structure": [
    {
      "slide_number": 1,
      "type": "title/list/comparison/process/data/visual/quote",
      "layout": "fullscreen/2column/3column/grid/timeline",
      "title": "スライドタイトル",
      "content": {
        "main_message": "主要メッセージ",
        "sub_messages": ["サブメッセージ1", "サブメッセージ2"],
        "details": ["詳細1", "詳細2"],
        "data": [{"label": "ラベル", "value": "値"}],
        "quotes": ["引用文"]
      },
      "visual_elements": {
        "icons": ["fa-icon-name"],
        "colors": {
          "primary": "#007BFF",
          "accent": "#28a745",
          "text": "#333333"
        },
        "charts": {
          "type": "bar/line/pie/radar",
          "data": {}
        },
        "images": ["suggested_image_type"]
      },
      "speaker_notes": "発表者用メモ",
      "transition": "next_topic/deep_dive/summary",
      "emphasis_level": "high/medium/low"
    }
  ],
  "design_theme": {
    "overall_tone": "professional/casual/academic/creative",
    "color_scheme": "blue/green/warm/monochrome",
    "font_emphasis": "headers/body/quotes",
    "animation_level": "none/subtle/moderate"
  },
  "narrative_flow": {
    "opening_hook": "冒頭の掴み",
    "key_transitions": ["移行ポイント1", "移行ポイント2"],
    "climax_slide": 12,
    "closing_impact": "締めのメッセージ"
  }
}
```

## 設計原則

### 1. ストーリーテリング
- 起承転結の明確化
- 聴衆の関心を維持する構成
- 論理的な流れと感情的な訴求のバランス

### 2. 情報密度の管理
- 1スライド1メッセージの原則
- 7±2の法則（項目数の制限）
- 視覚的階層の明確化

### 3. ビジュアルコミュニケーション
- テキストとビジュアルの黄金比（40:60）
- アイコンによる概念の視覚化
- カラーによる情報のグルーピング

### 4. 日本語プレゼンテーション特有の配慮
- 縦書き/横書きの使い分け
- 漢字/ひらがな/カタカナのバランス
- 専門用語への振り仮名の検討

## チェックポイント

- [ ] 20枚で完結する構成か
- [ ] 各スライドの役割が明確か
- [ ] 視覚的な変化とリズムがあるか
- [ ] データと説明のバランスは適切か
- [ ] 聴衆の理解度に配慮した順序か

この構造設計は、次の「HTML生成エージェント」で実際のスライドに変換されます。
```

# prompts/generator.md

```
# HTML生成エージェント用プロンプト

## 役割
スライド構造設計を基に、KatsuSparkオリジナルの品質の美しいHTMLスライドを生成する専門家です。

## 入力
スライド構造化エージェントからのJSON形式の設計情報

## 生成ルール

### 1. HTML基本構造
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[スライドタイトル] - スライド[番号]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            font-family: 'Noto Sans JP', sans-serif;
        }
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
            height: 720px;
            overflow: hidden;
        }
        html {
            height: 720px;
        }
        .slide {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            box-shadow: 0 20px 40px rgba(0, 123, 255, 0.1);
        }
        .gradient-text {
            background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .accent-line {
            background: linear-gradient(90deg, #007BFF 0%, #40a9ff 100%);
        }
        .floating-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 123, 255, 0.15);
        }
        .icon-bg {
            background: linear-gradient(135deg, #007BFF 0%, #40a9ff 100%);
        }
    </style>
</head>
<body>
    <div class="slide w-[1280px] h-[720px] flex flex-col">
        <!-- スライドコンテンツ -->
    </div>
</body>
</html>

### 2. レイアウトパターン別テンプレート
（この後もgenerator.mdの内容を一字一句そのまま貼り付け）
```
# prompts/analyzer.md

```
# コンテンツ解析エージェント用プロンプト

## 役割
あなたは日本語テキストから重要な情報を抽出し、プレゼンテーション用に構造化する専門家です。

## タスク

### 1. 超抽象化（メタレベル分析）
- 文書全体のテーマと目的を把握
- 主要な概念や理論を特定
- 対象読者とその知識レベルを推定
- 文書が解決しようとしている問題や課題を抽出

### 2. 超具体化（詳細情報の抽出）
- 具体的な事例、データ、数値を抽出
- 引用、専門用語、固有名詞をリストアップ
- 時系列情報（日付、期限、スケジュール）を整理
- 登場人物、組織、製品名などを特定

### 3. 超構造化（論理構造の分析）
- 文書の論理的な流れを把握
- 主要セクションとサブセクションを識別
- 因果関係、対比関係、並列関係を明確化
- 重要度に基づいて情報を階層化

## 出力形式

以下のJSON形式で結果を出力してください：

```json
{
  "meta": {
    "title": "文書の主題",
    "purpose": "文書の目的",
    "audience": "対象読者",
    "tone": "文書のトーン（フォーマル/カジュアル等）"
  },
  "abstract_concepts": [
    {
      "concept": "概念名",
      "description": "説明",
      "importance": "high/medium/low"
    }
  ],
  "concrete_details": {
    "examples": ["具体例1", "具体例2"],
    "data_points": [
      {
        "label": "データラベル",
        "value": "値",
        "unit": "単位"
      }
    ],
    "quotes": [
      {
        "text": "引用文",
        "speaker": "発言者",
        "context": "文脈"
      }
    ],
    "entities": {
      "people": ["人物1", "人物2"],
      "organizations": ["組織1", "組織2"],
      "products": ["製品1", "製品2"],
      "terms": ["専門用語1", "専門用語2"]
    }
  },
  "structure": {
    "main_sections": [
      {
        "title": "セクション名",
        "key_points": ["ポイント1", "ポイント2"],
        "subsections": ["サブセクション1", "サブセクション2"]
      }
    ],
    "logical_flow": "起承転結/問題-解決/時系列/比較対照",
    "relationships": [
      {
        "type": "cause-effect/contrast/parallel",
        "elements": ["要素1", "要素2"],
        "description": "関係の説明"
      }
    ]
  },
  "presentation_hints": {
    "key_messages": ["主要メッセージ1", "主要メッセージ2"],
    "visual_suggestions": ["グラフ提案", "図解提案"],
    "emphasis_points": ["強調すべき点1", "強調すべき点2"]
  }
}
```

## 分析の指針

1. **包括性**: 重要な情報を見逃さない
2. **階層性**: 情報を適切なレベルで整理
3. **視覚化可能性**: スライドで表現しやすい形に変換
4. **ストーリー性**: 聞き手が理解しやすい流れを意識
5. **日本語特性**: 敬語、専門用語の適切な扱い

## 注意事項

- 原文の意図を正確に理解し、歪曲しない
- 専門用語は必要に応じて平易な説明を付加
- 数値データは視覚化に適した形で整理
- プレゼンテーションの時間制約を考慮（20枚 = 約20-30分）

この分析結果は、次の「スライド構造化エージェント」で使用されます。
```

# templates/base-template.html

```
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} - スライド{{number}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            font-family: 'Noto Sans JP', sans-serif;
        }

        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%) !important;
            height: 720px;
            overflow: hidden;
        }

        html {
            height: 720px;
        }

        .slide {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            box-shadow: 0 20px 40px rgba(0, 123, 255, 0.1);
        }

        .gradient-text {
            background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .accent-line {
            background: linear-gradient(90deg, #007BFF 0%, #40a9ff 100%);
        }

        .floating-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 123, 255, 0.15);
        }

        .icon-bg {
            background: linear-gradient(135deg, #007BFF 0%, #40a9ff 100%);
        }

        /* アニメーション */
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }

        /* カスタムスタイル */
        {{custom_styles}}
    </style>
</head>
<body>
    <div class="slide w-[1280px] h-[720px] flex flex-col">
        {{content}}
    </div>

    {{scripts}}
</body>
</html>
```

# templates/layouts/comparison.html

```
<!-- 比較レイアウト -->
<header class="slide--header flex-none pt-12 px-16 pb-8">
    <h2 class="text-4xl font-bold text-slate-800 flex items-center">
        {{#if header_icon}}
        <i class="fa-solid fa-{{header_icon}} text-blue-500 mr-4"></i>
        {{/if}}
        {{header_title}}
    </h2>
    {{#if header_subtitle}}
    <p class="text-xl text-slate-600 mt-2">{{header_subtitle}}</p>
    {{/if}}
</header>

<main class="slide--main flex-1 px-16 pb-16">
    <div class="grid grid-cols-{{items.length}} gap-6 h-full">
        {{#each items}}
        <div class="relative">
            {{#if highlight}}
            <div class="absolute -inset-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25"></div>
            {{/if}}

            <div class="floating-card rounded-2xl p-6 h-full flex flex-col relative {{#if highlight}}border-2 border-blue-500{{/if}}">
                {{#if badge}}
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                        {{badge}}
                    </span>
                </div>
                {{/if}}

                <div class="text-center mb-6">
                    {{#if icon}}
                    <div class="icon-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fa-solid fa-{{icon}} text-white text-2xl"></i>
                    </div>
                    {{/if}}

                    <h3 class="text-2xl font-bold text-slate-800">{{title}}</h3>

                    {{#if subtitle}}
                    <p class="text-slate-500 mt-2">{{subtitle}}</p>
                    {{/if}}
                </div>

                {{#if price}}
                <div class="text-center mb-6">
                    <p class="text-4xl font-bold gradient-text">{{price}}</p>
                    <p class="text-slate-500">{{price_period}}</p>
                </div>
                {{/if}}

                <div class="flex-1">
                    {{#if features}}
                    <ul class="space-y-3">
                        {{#each features}}
                        <li class="flex items-start">
                            {{#if included}}
                            <i class="fa-solid fa-check-circle text-green-500 mr-3 mt-0.5"></i>
                            <span class="text-slate-700">{{text}}</span>
                            {{else}}
                            <i class="fa-solid fa-times-circle text-gray-300 mr-3 mt-0.5"></i>
                            <span class="text-gray-400 line-through">{{text}}</span>
                            {{/if}}
                        </li>
                        {{/each}}
                    </ul>
                    {{/if}}

                    {{#if pros}}
                    <div class="space-y-2">
                        <p class="font-bold text-green-600 text-sm uppercase tracking-wide">メリット</p>
                        <ul class="space-y-2">
                            {{#each pros}}
                            <li class="flex items-start">
                                <i class="fa-solid fa-plus text-green-500 mr-2 mt-0.5 text-sm"></i>
                                <span class="text-slate-700 text-sm">{{this}}</span>
                            </li>
                            {{/each}}
                        </ul>
                    </div>
                    {{/if}}

                    {{#if cons}}
                    <div class="space-y-2 mt-4">
                        <p class="font-bold text-red-600 text-sm uppercase tracking-wide">デメリット</p>
                        <ul class="space-y-2">
                            {{#each cons}}
                            <li class="flex items-start">
                                <i class="fa-solid fa-minus text-red-500 mr-2 mt-0.5 text-sm"></i>
                                <span class="text-slate-700 text-sm">{{this}}</span>
                            </li>
                            {{/each}}
                        </ul>
                    </div>
                    {{/if}}
                </div>

                {{#if cta}}
                <div class="mt-6">
                    <button class="w-full {{#if highlight}}bg-blue-600 hover:bg-blue-700{{else}}bg-gray-600 hover:bg-gray-700{{/if}} text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        {{cta}}
                    </button>
                </div>
                {{/if}}
            </div>
        </div>
        {{/each}}
    </div>

    {{#if footer_note}}
    <div class="mt-8 text-center">
        <p class="text-slate-500 text-sm">{{footer_note}}</p>
    </div>
    {{/if}}
</main>
```

# templates/layouts/list.html

```
<!-- リストレイアウト -->
<header class="slide--header flex-none pt-12 px-16 pb-8">
    <h2 class="text-4xl font-bold text-slate-800 flex items-center">
        {{#if header_icon}}
        <i class="fa-solid fa-{{header_icon}} text-blue-500 mr-4"></i>
        {{/if}}
        {{header_title}}
    </h2>
    {{#if header_subtitle}}
    <p class="text-xl text-slate-600 mt-2">{{header_subtitle}}</p>
    {{/if}}
</header>

<main class="slide--main flex-1 px-16 pb-16">
    {{#if intro_text}}
    <p class="text-xl text-slate-700 mb-8">{{intro_text}}</p>
    {{/if}}

    <{{list_type}} class="space-y-6 text-xl {{#if numbered}}numbered-list{{/if}}">
        {{#each items}}
        <li class="flex items-start">
            {{#unless ../numbered}}
                {{#if icon}}
                <span class="text-blue-500 mr-4 mt-1">
                    <i class="fa-solid fa-{{icon}}"></i>
                </span>
                {{else if bullet_style}}
                    {{#if (eq bullet_style "check")}}
                    <span class="text-green-500 mr-4 mt-1">
                        <i class="fa-solid fa-check-circle"></i>
                    </span>
                    {{else if (eq bullet_style "arrow")}}
                    <span class="text-blue-500 mr-4 mt-1">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                    {{else}}
                    <span class="text-blue-500 font-bold mr-4 mt-1">•</span>
                    {{/if}}
                {{else}}
                <span class="text-blue-500 font-bold mr-4 mt-1">•</span>
                {{/if}}
            {{/unless}}

            <div class="flex-1">
                {{#if title}}
                <span class="font-bold text-slate-800">{{title}}</span>
                {{#if content}}
                <span class="text-slate-700">: {{content}}</span>
                {{/if}}
                {{else}}
                <span class="text-slate-700">{{content}}</span>
                {{/if}}

                {{#if sub_items}}
                <ul class="mt-3 ml-6 space-y-2">
                    {{#each sub_items}}
                    <li class="flex items-start">
                        <span class="text-slate-400 mr-2">-</span>
                        <span class="text-slate-600 text-lg">{{this}}</span>
                    </li>
                    {{/each}}
                </ul>
                {{/if}}

                {{#if note}}
                <p class="text-slate-500 text-base mt-2 italic">{{note}}</p>
                {{/if}}
            </div>
        </li>
        {{/each}}
    </{{list_type}}>

    {{#if conclusion}}
    <div class="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <p class="text-blue-800 font-medium text-xl">{{conclusion}}</p>
    </div>
    {{/if}}
</main>
```

# templates/layouts/3column.html

```
<!-- 3カラムレイアウト -->
<header class="slide--header flex-none pt-12 px-16 pb-8">
    <h2 class="text-4xl font-bold text-slate-800 flex items-center">
        {{#if header_icon}}
        <i class="fa-solid fa-{{header_icon}} text-blue-500 mr-4"></i>
        {{/if}}
        {{header_title}}
    </h2>
    {{#if header_subtitle}}
    <p class="text-xl text-slate-600 mt-2">{{header_subtitle}}</p>
    {{/if}}
</header>

<main class="slide--main flex-1 px-16 pb-16">
    <div class="grid grid-cols-3 gap-8 h-full">
        {{#each columns}}
        <div class="floating-card rounded-2xl p-6 hover-float flex flex-col">
            {{#if icon}}
            <div class="icon-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-{{icon}} text-white text-2xl"></i>
            </div>
            {{/if}}

            {{#if number}}
            <div class="text-6xl font-black gradient-text text-center mb-4">
                {{number}}
            </div>
            {{/if}}

            <h3 class="text-slate-800 text-xl font-bold mb-3 text-center">{{title}}</h3>

            {{#if description}}
            <p class="text-slate-600 text-lg text-center flex-1">{{description}}</p>
            {{/if}}

            {{#if items}}
            <ul class="space-y-2 mt-4">
                {{#each items}}
                <li class="flex items-start">
                    <span class="text-blue-500 mr-2">•</span>
                    <span class="text-slate-600 text-sm">{{this}}</span>
                </li>
                {{/each}}
            </ul>
            {{/if}}

            {{#if value}}
            <div class="mt-4 text-center">
                <p class="text-3xl font-bold gradient-text">{{value}}</p>
                <p class="text-sm text-slate-500 mt-1">{{value_label}}</p>
            </div>
            {{/if}}

            {{#if badge}}
            <div class="mt-4 text-center">
                <span class="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {{badge}}
                </span>
            </div>
            {{/if}}
        </div>
        {{/each}}
    </div>

    {{#if footer_note}}
    <div class="mt-8 text-center">
        <p class="text-slate-500 text-sm">{{footer_note}}</p>
    </div>
    {{/if}}
</main>
```

# templates/layouts/2column.html

```
<!-- 2カラムレイアウト -->
{{#if header}}
<header class="slide--header flex-none pt-12 px-16 pb-8">
    <h2 class="text-4xl font-bold text-slate-800 flex items-center">
        {{#if header_icon}}
        <i class="fa-solid fa-{{header_icon}} text-blue-500 mr-4"></i>
        {{/if}}
        {{header_title}}
    </h2>
    {{#if header_subtitle}}
    <p class="text-xl text-slate-600 mt-2">{{header_subtitle}}</p>
    {{/if}}
</header>
{{/if}}

<main class="slide--main flex-1 flex px-16 {{#if header}}pb-16{{else}}py-16{{/if}}">
    <div class="w-1/2 pr-8 flex flex-col justify-center">
        {{#if left_title}}
        <h3 class="text-3xl font-bold text-slate-800 mb-6">{{left_title}}</h3>
        {{/if}}

        {{#if left_content}}
        <div class="space-y-4 text-lg text-slate-600">
            {{{left_content}}}
        </div>
        {{/if}}

        {{#if left_list}}
        <ul class="space-y-4 text-lg">
            {{#each left_list}}
            <li class="flex items-start">
                <span class="text-blue-500 font-bold mr-3 mt-1">•</span>
                <span class="text-slate-700">{{this}}</span>
            </li>
            {{/each}}
        </ul>
        {{/if}}

        {{#if left_cta}}
        <div class="mt-8">
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
                {{left_cta}}
            </button>
        </div>
        {{/if}}
    </div>

    <div class="w-1/2 pl-8 flex items-center justify-center">
        {{#if right_image}}
        <img src="{{right_image}}" alt="{{right_image_alt}}" class="max-w-full max-h-full object-contain rounded-lg shadow-xl">
        {{else if right_chart}}
        <div id="chart-{{chart_id}}" class="w-full h-full"></div>
        {{else if right_cards}}
        <div class="space-y-4 w-full">
            {{#each right_cards}}
            <div class="floating-card rounded-xl p-6 hover-float">
                {{#if icon}}
                <div class="flex items-center mb-3">
                    <div class="icon-bg w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <i class="fa-solid fa-{{icon}} text-white"></i>
                    </div>
                    <h4 class="text-xl font-bold text-slate-800">{{title}}</h4>
                </div>
                {{else}}
                <h4 class="text-xl font-bold text-slate-800 mb-3">{{title}}</h4>
                {{/if}}
                <p class="text-slate-600">{{content}}</p>
            </div>
            {{/each}}
        </div>
        {{else if right_quote}}
        <div class="quote-block">
            <p class="text-2xl text-slate-700 font-medium italic">
                "{{right_quote}}"
            </p>
            {{#if right_quote_author}}
            <p class="text-right mt-4 text-slate-600 font-medium">
                — {{right_quote_author}}
            </p>
            {{/if}}
        </div>
        {{else}}
        <div class="floating-card rounded-2xl p-12 text-center">
            <div class="icon-bg w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="fa-solid fa-{{right_icon}} text-white text-5xl"></i>
            </div>
            {{#if right_title}}
            <h3 class="text-2xl font-bold text-slate-800 mb-4">{{right_title}}</h3>
            {{/if}}
            {{#if right_content}}
            <p class="text-lg text-slate-600">{{right_content}}</p>
            {{/if}}
        </div>
        {{/if}}
    </div>
</main>
```

# templates/layouts/fullscreen.html

```
<!-- フルスクリーンレイアウト（タイトルスライド用） -->
<header class="slide--header flex-none pt-16 px-16">
    <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
            <div class="icon-bg w-12 h-12 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-{{header_icon}} text-white text-xl"></i>
            </div>
            <div class="accent-line h-1 w-24 rounded-full"></div>
        </div>
        <div class="text-right">
            <p class="text-slate-600 text-lg font-medium">{{series_name}}</p>
            <p class="text-slate-500 text-sm">{{date}}</p>
        </div>
    </div>
</header>

<main class="slide--main flex-1 flex items-center justify-center px-16">
    <div class="text-center">
        <h1 class="gradient-text text-7xl font-black mb-6 leading-tight">{{main_title}}</h1>

        {{#if accent_line}}
        <div class="accent-line h-2 w-32 mx-auto rounded-full mb-8"></div>
        {{/if}}

        {{#if subtitle}}
        <h2 class="text-slate-700 text-3xl font-medium mb-12">{{subtitle}}</h2>
        {{/if}}

        {{#if speaker}}
        <div class="flex items-center justify-center gap-6">
            <div class="icon-bg w-20 h-20 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-user-tie text-white text-3xl"></i>
            </div>
            <div class="text-left">
                <p class="text-slate-500 text-lg">{{speaker_label}}</p>
                <p class="text-slate-800 text-3xl font-bold">{{speaker}}</p>
                {{#if speaker_title}}
                <p class="text-slate-600 text-lg">{{speaker_title}}</p>
                {{/if}}
            </div>
        </div>
        {{/if}}
    </div>
</main>

{{#if footer}}
<footer class="slide--footer flex-none px-16 pb-8 text-center">
    <p class="text-slate-500 text-sm">{{footer}}</p>
</footer>
{{/if}}
```

# templates/components/progress.html

```
<!-- プログレスバーコンポーネント -->
<div class="progress-container {{additional_classes}}">
    {{#if title}}
    <div class="flex justify-between items-center mb-2">
        <span class="text-slate-700 font-medium">{{title}}</span>
        <span class="text-slate-600 font-bold">{{value}}{{unit}}</span>
    </div>
    {{/if}}

    <div class="progress-bar">
        <div class="progress-fill" style="width: {{value}}%"></div>
    </div>

    {{#if milestone}}
    <div class="flex justify-between mt-2">
        {{#each milestones}}
        <div class="text-center" style="width: {{width}}%">
            <div class="text-xs text-slate-500">{{label}}</div>
        </div>
        {{/each}}
    </div>
    {{/if}}

    {{#if description}}
    <p class="text-slate-600 text-sm mt-3">{{description}}</p>
    {{/if}}
</div>
```

# templates/components/quote.html

```
<!-- 引用ブロックコンポーネント -->
<div class="quote-block {{additional_classes}}">
    <p class="text-2xl text-slate-700 font-medium italic mb-4">
        {{content}}
    </p>

    {{#if author}}
    <div class="flex items-center justify-end">
        <div class="text-right">
            <p class="text-slate-800 font-bold">{{author}}</p>
            {{#if title}}
            <p class="text-slate-500 text-sm">{{title}}</p>
            {{/if}}
        </div>
        {{#if author_image}}
        <img src="{{author_image}}" alt="{{author}}" class="w-12 h-12 rounded-full ml-4 object-cover">
        {{else}}
        <div class="icon-bg w-12 h-12 rounded-full flex items-center justify-center ml-4">
            <i class="fa-solid fa-user text-white"></i>
        </div>
        {{/if}}
    </div>
    {{/if}}
</div>
```

# templates/components/timeline.html

```
<!-- タイムラインコンポーネント -->
<div class="timeline {{additional_classes}}">
    {{#each items}}
    <div class="timeline-item flex {{#if @first}}pb-8{{else if @last}}pt-8{{else}}py-8{{/if}}">
        <div class="timeline-marker relative flex-none">
            <div class="icon-bg w-12 h-12 rounded-full flex items-center justify-center z-10 relative">
                {{#if icon}}
                <i class="fa-solid fa-{{icon}} text-white text-lg"></i>
                {{else}}
                <span class="text-white font-bold">{{@index}}</span>
                {{/if}}
            </div>
            {{#unless @last}}
            <div class="absolute top-12 left-6 w-0.5 h-full bg-blue-200 -z-10"></div>
            {{/unless}}
        </div>

        <div class="timeline-content ml-6 flex-1">
            {{#if date}}
            <p class="text-blue-600 text-sm font-medium mb-1">{{date}}</p>
            {{/if}}

            <h4 class="text-xl font-bold text-slate-800 mb-2">{{title}}</h4>

            {{#if description}}
            <p class="text-slate-600">{{description}}</p>
            {{/if}}

            {{#if details}}
            <ul class="mt-3 space-y-1">
                {{#each details}}
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">•</span>
                    <span class="text-slate-600 text-sm">{{this}}</span>
                </li>
                {{/each}}
            </ul>
            {{/if}}
        </div>
    </div>
    {{/each}}
</div>
```

# templates/components/data-card.html

```
<!-- データカードコンポーネント -->
<div class="data-card {{additional_classes}}">
    {{#if icon}}
    <div class="icon-bg w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid fa-{{icon}} text-white text-3xl"></i>
    </div>
    {{/if}}

    <div class="data-value">{{value}}</div>
    <div class="data-label">{{label}}</div>

    {{#if description}}
    <p class="text-slate-500 text-sm mt-3">{{description}}</p>
    {{/if}}

    {{#if trend}}
    <div class="flex items-center justify-center mt-4">
        {{#if (eq trend "up")}}
        <i class="fa-solid fa-arrow-trend-up text-green-500 mr-2"></i>
        <span class="text-green-600 font-medium">{{trend_value}}</span>
        {{else if (eq trend "down")}}
        <i class="fa-solid fa-arrow-trend-down text-red-500 mr-2"></i>
        <span class="text-red-600 font-medium">{{trend_value}}</span>
        {{else}}
        <i class="fa-solid fa-minus text-gray-500 mr-2"></i>
        <span class="text-gray-600 font-medium">{{trend_value}}</span>
        {{/if}}
    </div>
    {{/if}}
</div>
```

# templates/components/list-item.html

```
<!-- リストアイテムコンポーネント -->
<li class="flex items-start {{additional_classes}}">
    {{#if bullet_type}}
        {{#if (eq bullet_type "number")}}
        <span class="text-blue-500 font-bold mr-4 mt-1 min-w-[2rem]">{{index}}.</span>
        {{else if (eq bullet_type "check")}}
        <span class="text-green-500 mr-4 mt-1">
            <i class="fa-solid fa-check-circle"></i>
        </span>
        {{else if (eq bullet_type "arrow")}}
        <span class="text-blue-500 mr-4 mt-1">
            <i class="fa-solid fa-chevron-right"></i>
        </span>
        {{else}}
        <span class="text-blue-500 font-bold mr-4 mt-1">•</span>
        {{/if}}
    {{else}}
    <span class="text-blue-500 font-bold mr-4 mt-1">•</span>
    {{/if}}

    <div class="flex-1">
        {{#if title}}
        <span class="font-bold text-slate-800">{{title}}</span>
        {{#if content}}
        <span class="text-slate-700">: {{content}}</span>
        {{/if}}
        {{else}}
        <span class="text-slate-700">{{content}}</span>
        {{/if}}

        {{#if sub_items}}
        <ul class="mt-2 ml-4 space-y-1">
            {{#each sub_items}}
            <li class="flex items-start">
                <span class="text-slate-400 mr-2">-</span>
                <span class="text-slate-600 text-base">{{this}}</span>
            </li>
            {{/each}}
        </ul>
        {{/if}}
    </div>
</li>
```

# templates/components/card.html

```
<!-- カードコンポーネント -->
<div class="floating-card rounded-2xl p-6 {{additional_classes}}">
    {{#if icon}}
    <div class="icon-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fa-solid fa-{{icon}} text-white text-2xl"></i>
    </div>
    {{/if}}

    {{#if title}}
    <h3 class="text-slate-800 text-xl font-bold mb-2 text-center">{{title}}</h3>
    {{/if}}

    {{#if content}}
    <p class="text-slate-600 text-lg text-center">{{content}}</p>
    {{/if}}

    {{#if list}}
    <ul class="text-slate-600 text-lg space-y-2">
        {{#each list}}
        <li class="flex items-start">
            <span class="text-blue-500 mr-2">•</span>
            <span>{{this}}</span>
        </li>
        {{/each}}
    </ul>
    {{/if}}
</div>
```

# templates/components/header.html

```
<!-- 標準ヘッダーコンポーネント -->
<header class="slide--header flex-none pt-12 px-16 pb-8">
    <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
            <div class="icon-bg w-12 h-12 rounded-full flex items-center justify-center">
                <i class="fa-solid fa-{{icon}} text-white text-xl"></i>
            </div>
            <div class="accent-line h-1 w-24 rounded-full"></div>
        </div>
        <div class="text-right">
            <p class="text-slate-600 text-lg font-medium">{{series_name}}</p>
            <p class="text-slate-500 text-sm">{{date}}</p>
        </div>
    </div>
</header>
```

# templates/styles/common.css

```
/* 共通スタイル定義 */

/* グラデーションバリエーション */
.gradient-blue {
    background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
}

.gradient-green {
    background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
}

.gradient-orange {
    background: linear-gradient(135deg, #fd7e14 0%, #dc6100 100%);
}

.gradient-red {
    background: linear-gradient(135deg, #dc3545 0%, #bd2130 100%);
}

/* テキストサイズユーティリティ */
.text-huge {
    font-size: 5rem;
    line-height: 1.1;
}

.text-display {
    font-size: 3.5rem;
    line-height: 1.2;
}

/* カード効果 */
.hover-float {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-float:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 123, 255, 0.2);
}

/* 番号付きリスト */
.numbered-list {
    counter-reset: item;
}

.numbered-list li {
    counter-increment: item;
    position: relative;
    padding-left: 3rem;
}

.numbered-list li::before {
    content: counter(item);
    position: absolute;
    left: 0;
    top: 0;
    width: 2rem;
    height: 2rem;
    background: #007BFF;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* 引用ブロック */
.quote-block {
    position: relative;
    padding: 2rem 3rem;
    background: rgba(0, 123, 255, 0.05);
    border-left: 4px solid #007BFF;
}

.quote-block::before {
    content: '"';
    position: absolute;
    top: -1rem;
    left: 1rem;
    font-size: 4rem;
    color: #007BFF;
    opacity: 0.3;
}

/* プログレスバー */
.progress-bar {
    width: 100%;
    height: 8px;
    background: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #007BFF 0%, #40a9ff 100%);
    transition: width 0.3s ease;
}

/* データカード */
.data-card {
    background: white;
    border: 2px solid #f0f0f0;
    border-radius: 1rem;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
}

.data-card:hover {
    border-color: #007BFF;
    transform: scale(1.05);
}

.data-value {
    font-size: 3rem;
    font-weight: bold;
    color: #007BFF;
}

.data-label {
    font-size: 1.2rem;
    color: #6c757d;
    margin-top: 0.5rem;
}
```
