# Excalidraw Writing Machine: ビジュアルZettelkastenから記事ドラフトを生成

## 概要
本動画では、**Obsidian**の**Excalidraw**プラグインを活用し、ビジュアルで整理されたアイデアや**Zettelkasten**ノートから記事ドラフトを自動生成する「**Excalidraw Writing Machine** (EWM)」スクリプトを紹介します。矢印で接続されたビジュアル要素のテキストを抽出し、構造化された**Markdown**ドキュメントを作成。さらに、このドキュメントを**ChatGPT**などの生成AIに渡すことで、出版可能なレベルのドラフトを迅速に生成するワークフローをデモします。このシステムは、**Obsidian**の**Templater**および**AI for Templater**プラグインと連携し、ユーザーのニーズに合わせてカスタマイズ可能です。

## 主要なポイント
- **Zettelkasten**の約束である「最初から始めない」執筆をビジュアルで実現。
- 4次元PKM（テキスト、文書、リンク、ビジュアル）およびビジュアル**Zettelkasten**の概念を提唱。
- アイデアをビジュアルで整理することが、箇条書きをシャッフルするよりも強力であると強調。
- **Excalidraw Writing Machine**スクリプトが、ビジュアルレイアウトから階層的な**Markdown**テキストを生成。
- 生成AI（特に**ChatGPT**, **GPT-40 mini**, **GPT-4o**）との連携により、ドラフト作成プロセスを自動化・加速。
- ワークフローは**Obsidian**、**Excalidraw**、**Templater**、**AI for Templater**プラグインおよびカスタムスクリプトで構築され、高いカスタマイズ性を持つ。

## 詳細内容
### 導入とエンド結果の紹介 [00:00:00]
Joltです。本動画では、記事のビジュアルレイアウトを、見栄えがよく読みやすいPDFドキュメントに変換する方法を紹介します。テキストの流れが理にかなっており、素敵なイラストも含まれた、ほぼ出版可能なドキュメントのドラフトが生成されます。完全に完成した状態ではありませんが、作業の良いスタートとなります。紹介する内容はニーズに合わせて完全に調整可能で、生成AIやカスタムテンプレートスクリプトを使わない選択肢もあります。Jolt [00:00:00]

### 背景説明：Zettelkastenの約束と4次元PKM [01:04:00]
#### Zettelkastenの約束 [01:04:00]
優れた**Zettelkasten**システムがあれば、ブログ投稿、動画、記事などの作業をゼロから始める必要はないというのが**Zettelkasten**の約束です。システムから枝葉を拾い、カードを並べるだけで、記事の良い最初のドラフトができあがります。Jolt [01:04:00]

#### MindSETフレームワーク：4次元PKM [01:55:00]
私は4次元PKMを提唱しています。
- 1次元目は線形テキスト（読む方向が決まっているテキスト文書）。
- 2次元目は個別の文書（ファイル）。
- 3次元目はノート間のリンク（**Viki**システムや**Wikipedia**）。
- 4次元目はイラスト、アイコン、画像の再利用によるアイデアの結合です。ビジュアル処理は並列処理であり、テキストの線形処理とは大きく異なります。例えるなら、お店のレシート（線形）とショーウィンドウ（並列）の違いです。Jolt [01:55:00]

#### MindSETフレームワーク：ビジュアルZettelkasten [04:30:00]
ビジュアル**Zettelkasten**は、ノートに視覚的な面（前面）とテキストの面（背面）を持たせる概念です。前面は視覚的な要約、背面は**Markdown**形式で関連テキストノートや情報源を含みます。アイデアを視覚的に整理することは、箇条書きをシャッフルするよりもはるかに強力です。Jolt [04:30:00]

### 論文執筆マシンのアイデア [06:35:00]
Ted Blizzard氏から共有された論文執筆マシンのアイデアは、研究者が引用文献付きの文書を作成するのに役立つツールです。これは、**Zettelkasten**システムで蓄積したノートからアウトラインを作成し、最終的なドキュメントに変換するというアイデアに基づいています。今日紹介するソリューションもこの考え方に沿っています。Jolt [06:35:00]

### ソリューションコンポーネント [07:34:00]
このソリューションは以下のコンポーネントで構成されます。
- **Excalidraw**のビジュアルレイアウト
- **Excalidraw Writing Machine**スクリプト
- **Obsidian Templater**プラグイン
- **AI for Templater**プラグイン
これらを組み合わせてワークフローを構築します。Jolt [07:34:00]

### Excalidraw Writing Machineスクリプトの動作原理 [08:22:00]
**Excalidraw Writing Machine**スクリプトは、矢印のシーケンスをたどり、様々な要素からテキストをキャプチャします。メインタイトルから始まり、分岐点までは段落が続き、分岐点以降は矢印上のテキストがセクション見出しとなり、その下に段落が続きます。**Zettelkasten**ノートの場合は、画像（前面）の下に裏面テキストが表示され、最後にソース参照が括弧で追加されます。Jolt [08:22:00]

### デモ1：テンプレートを使わない実行と手動AI処理 [08:08:00]
#### シンプルなフローでのデモラン [08:08:00]
まず、シンプルなビジュアルレイアウトでスクリプトを実行し、生成される**Markdown**ドキュメントの構造を確認します。メインタイトル、段落、セクション見出し、画像と裏面テキスト、ソース参照が抽出されます。Jolt [08:08:00]

#### スクリプトのインストール方法 [10:53:00]
**Excalidraw Writing Machine**スクリプトは、**Obsidian Tools**パネルから**Excalidraw Scripts**ストアにアクセスし、「writing machine」で検索してインストールします。Jolt [10:53:00]

#### Atomic Habitsの例での実行 (テンプレートなし) [11:31:00]
Atomic Habitsの「Book on a Page」要約のビジュアルレイアウト（ビジュアル**Zettelkasten**ノート）を使ってスクリプトを実行します。矢印で構成されたフローをたどり、生成されたドキュメントを確認します。画像、テキスト、つなぎ合わせた素材（各カードのアイデアをまとめた文章）が含まれています。Jolt [11:31:00]

#### 生成ドラフトの手動処理（ChatGPT使用） [14:26:00]
生成された**Markdown**ドラフトを**ChatGPT**に貼り付け、事前に用意したプロンプトに従って記事を生成させます。**ChatGPT**は記事を**Markdown**コードブロックとして出力します。これを**Obsidian**に貼り付けることで、画像も含まれたほぼ完成された記事ドラフトが得られます。Jolt [14:26:00]

### デモ2：Templater + AI for Templaterを使った自動化 [16:18:00]
#### 必要なプラグイン [16:32:00]
この自動化ワークフローには、**Obsidian**の**Templater**と**AI for Templater**プラグインが必要です。特に**AI for Templater**は、**Templater**スクリプト内から**ChatGPT**クエリを実行するための優れたプラグインです。Jolt [16:32:00]

#### カスタムTemplaterスクリプトの説明 [17:03:00]
作成したカスタム**Templater**スクリプトは、システムメッセージとユーザープロンプトを定義し、使用するAIモデル（例: **GPT 40 mini**, **GPT 4o**）を指定します。スクリプトは**Excalidraw Writing Machine**の出力（`window.ewmResponse`）を取得し、それをプロンプトに含めることができます。**EWM**スクリプトはプレースホルダー(`<% ewm.generatedText %>`)を提供しており、テンプレート内でこのプレースホルダーを生成テキストに置き換えることができます。Jolt [17:03:00]

#### 自動ワークフローの実行 [20:12:00]
**Excalidraw Writing Machine**を起動し、作成したテンプレートを選択して実行します。スクリプトが**EWM**の出力を取得し、**AI for Templater**を介して**ChatGPT**に送信、応答を受け取り、テンプレートに従って最終的な記事を生成します。これにより、手動でのコピー＆ペースト作業が不要になります。生成された記事は高品質です。Jolt [20:12:00]

### スクリプト設定のカスタマイズ [21:20:00]
**Excalidraw Writing Machine**スクリプトには設定オプションがあります。これはスクリプトを初めて実行した後に**Obsidian**設定の**Excalidraw**プラグイン設定内に表示されます。設定では、概要セクションの名前、ソース場所、デフォルトテンプレートパス、そして画像を埋め込むかどうかのオプションなどをカスタマイズできます。画像を埋め込まない設定にした場合のデモも行います。Jolt [21:20:00]

### Excalidraw Writing Machineスクリプト自体のカスタマイズ [23:48:00]
ユーザーは**Excalidraw**フォルダ内のスクリプトファイルにアクセスして、**Excalidraw Writing Machine**スクリプト自体を編集・カスタマイズすることも可能です。編集には多少のスクリプトスキルが必要ですが、コメントが追加されており、理解を助けます。必要に応じて**ChatGPT**にスクリプトの修正を依頼することもできます。Jolt [23:48:00]

### 矢印の作成順序の重要性 [25:38:00]
テキストの生成順序を制御するためには、**Excalidraw**上での矢印の作成順序が重要です。スクリプトは矢印が引かれた順に要素を処理します。意図した順序（例: セクション1の後にセクション2）でテキストを生成するためには、矢印もその順序で作成する必要があります。Jolt [25:38:00]

## 結論
**Excalidraw Writing Machine**スクリプトと**Obsidian**プラグイン（**Excalidraw**, **Templater**, **AI for Templater**）およびAI（**ChatGPT**など）を組み合わせることで、ビジュアルで構造化されたアイデアや**Zettelkasten**ノートから効率的に記事ドラフトを生成する強力なワークフローが実現します。これは**Zettelkasten**やPKMの実践者にとって、執筆プロセスを大幅に加速させる可能性を秘めており、アイデア整理から執筆までのスムーズな連携を提供します。ワークフローは高度にカスタマイズ可能であり、ビジュアル思考とAIの融合の可能性を示唆しています。Jolt [27:48:00]

---

# Excalidraw Writing Machine: Generate articles from your Visual Zettelkasten cards in Obsidian

**チャンネル:** Zsolt's Visual Personal Knowledge Management
**公開日:** 2024-08-22
**URL:** https://www.youtube.com/watch?v=zvRpCOZAUSs

## 説明

✏️ Sign up for the Visual Thinking Workshop: https://www.visual-thinking-workshop.com/ 
🚀 Cohort 10 starts on 24 August 2024. 📔 We will process Simple Marketing for Smart People into a Book on a Page
----
In this video, I demonstrate the Excalidraw Writing Machine (EWM) script, which converts a visual layout of an article into a draft writing. The layout can include text elements or visual Zettelkasten notes. The script follows the arrows between nodes to generate a hierarchical Markdown document. By feeding this document into generative AI like ChatGPT, you can quickly produce a nearly publish-ready draft, making it easier to create academic articles, blog posts, presentations, and more.

The solution shown in the video was created with https://Obsidian.md, the Excalidraw-, Templater-, and AI for Templater plugins.

Resources:

Download the Excalidraw Writing Machine script from the Excalidraw Obsidian Script store (as demonstrated in the video).
Download the sample Obsidian Templater file from: https://gist.github.com/zsviczian/bf49d4b2d401f5749aaf8c2fa8a513d9
Download the demo PDF document showcased in the video from: https://zsviczian.github.io/DemoArticle-AtomicHabits.pdf
------

If you find  my videos helpful, please say thanks by buying me a coffee: https://ko-fi.com/zsolt

📩 If you want to connect, you can reach me: (@zsviczian) on the Obsidian Members Group (OMG) on Discord, or on 🐦 Twitter: https://twitter.com/zsviczian

-----
00:00 Intro: a showcase of the end result
00:33 The workflow is adjustable to your needs
01:04 The promise of Zettelkasten: Never start from scratch
01:55 The MindSET Framework: 4D PKM
04:30 The MindSET Framework: Visual Zettelkasten
05:50 The MindSET Framework: Visually organizing ideas is more powerful than shuffling bullet points
06:35 The Paper Writing Machine
07:34 Solution Components
08:08 A demo run on a simplified flow
10:53 How to install the Excalidraw Writing Machine Script
11:31 Running the Script on the Atomic Habits Example without using a template
14:26 Processing the draft with ChatGPT without Templater Automation
16:18 Introducing the Templater + AI for Templater script
20:12 Running the workflow with the script
21:20 Script settings are only visible after the first run
23:22 Demonstrating the effect of not including image links
23:48 Customizing the Excalidraw Writing Machine script to your needs (including with the help of ChatGPT)
25:38 The sequence of creating arrows is important
27:48 Closing Thoughts about the Visual Thinking Workshop

-------

🍿Watch next: 
Visual PKM:
📽️ Debunking Visual Myths: What Science Says and How to Leverage It for Better PKM https://youtu.be/_3-OmhLeZUA
📽️ Rethink Writing https://youtu.be/rWghRyI_MFc
📽️ Beyond Words: The Future of PKM - Exploring 5 Cards from The MindSET Visual Thinking Framework https://youtu.be/6rKjWJKTZak
📽️ The Compass of Zettelkasten https://youtu.be/7rnsULzez-g
📽️ Knowledge Discovery Using Icons https://youtu.be/_OEljzZ33H8
📽️ Idea Integration Board https://youtu.be/Lq2ZKDF9gOQ
📽️ Idea Mixer https://youtu.be/ItV8PEaPorE
📽️ 6 Strategies for Linking Visual Thoughts https://youtu.be/qiKuqMcNWgU
📽️ Visual Zettelkasten https://youtu.be/uoNHkCLsp3g
📽️ 4D PKM https://youtu.be/3S3oIsaK17U
📽️ Visually Connect Ideas https://youtu.be/mvMQcz401yo
📽️ Digest What You Read https://youtu.be/yy4b6geeQSY
📽️ How are these related? https://youtu.be/N6EFydv0tug

Book on a Page Summaries:
📽️ Building a Second Brain https://youtu.be/3i4CiImIYYA
📽️ The Periodic Table of Productivity https://youtu.be/Z-ksCSK-1mk
📽️ The Extended Mind https://youtu.be/oXMKF8zqG6E
📽️ How To Take Smart Notes https://youtu.be/o49C8jQIsvs
📽️ Finite and Infinite Games  https://youtu.be/uoNHkCLsp3g
📽️ The Creative Act Book https://youtu.be/0JtabqjAqaU

Diagraming for PKM:
📽️ part 1 - Why diagrams matter in PKM: https://youtu.be/MGsplHhwoc8
📽️ part  2 - Concept modeling: https://youtu.be/Zg_DUj68VkY
📽️ part 2b - Concept modeling with Nick Milo (note-making): https://youtu.be/ztCup77A77A 
📽️ part 3 - Systems Thinking with Object Process Modeling: https://youtu.be/se7odslzd5U
📽️ part 4 - Futures Wheel of Quitting my Job: https://youtu.be/Y5u7ggrxM1k
📽️ part 5 - Sun Ray Transformation Map: https://youtu.be/Y-cZrWlRAWc

My tools and processes:
📽️ The Excalidraw-Obsidian Showcase: 57 key features in just 17 minutes https://youtu.be/P_Q6avJGoWI
📽️ Getting Started with Excalidraw https://youtu.be/QKnQgSjJVuc
📽️ Getting Started with ExcaliBrain https://youtu.be/8LE_QdYQZVk
📽️ The Playful PKM Castle: A Whirlwind Tour of Zsolt's Visual Thinking World! https://youtu.be/X0AmZGQ_7z4
📽️ Slideshow Scriopt https://youtu.be/JwgtCrIVeEU
------
Visual Thinking Workshop: https://www.visual-thinking-workshop.com/
Obsidian: https://obsidian.md
Excalidraw-Obsidian: https://github.com/zsviczian/obsidian-excalidraw-plugin/

#excalidraw  #sketchnotes   #obsidianmd #pkm #zettelkasten #academicWriting

## 字幕

[00:00 - 00:06]
皆さんこんにちは、Joltです。Visual PKMへようこそ。

[00:03 - 00:09]
今日のビデオでは、

[00:09 - 00:16]
記事のビジュアルレイアウトを、

[00:13 - 00:19]
見栄えがよく読みやすいPDFドキュメントに変換する方法を紹介します。

[00:16 - 00:21]
テキストの流れが理にかなっていて、

[00:19 - 00:25]
素敵なイラストもあり、全体として

[00:21 - 00:27]
ほぼ出版可能なドキュメントです。

[00:25 - 00:29]
もちろん、出版

[00:27 - 00:32]
可能な状態ではありません。もう少し

[00:29 - 00:36]
作業が必要ですが、この記事は良いスタートを切ったと言えるでしょう。

[00:36 - 00:40]
会話の核心に入る前に、今日

[00:38 - 00:43]
紹介する内容はニーズ

[00:40 - 00:47]
に合わせて完全に調整可能であることを強調しておきます。

[00:43 - 00:50]
生成AIが嫌いな場合は、

[00:47 - 00:53]
この部分を飛ばしてください。

[00:50 - 00:56]
カスタムテンプレートスクリプトを作成したくない場合は、

[00:53 - 00:58]
この部分を飛ばしてください。ワークフローは、

[00:56 - 01:02]
どこまで進めたいかに合わせて調整可能です。

[00:58 - 01:04]
実際のソリューションに進む前に、状況を説明するために

[01:02 - 01:08]
2つのことを

[01:04 - 01:11]
お話しします。1

[01:08 - 01:15]
つ目は、Zel

[01:11 - 01:17]
Cenの約束です。このテーマに関するほぼすべての本を読んでみると、

[01:17 - 01:23]
優れたZle Casten

[01:20 - 01:26]
システムがあれば、最初から始める必要はないという約束が書かれています。

[01:23 - 01:29]
ブログ投稿、動画、

[01:26 - 01:31]
記事など、どんな作業でも

[01:29 - 01:34]
ゼロから始める必要はありません。Zettle

[01:34 - 01:41]
Castonシステムから枝葉を拾い、カードを並べるだけで、

[01:41 - 01:47]
記事の良い最初の下書きができあがります。あとはそれをつなぎ合わせるだけです。

[01:47 - 01:53]
私はずっとこれを羨ましく思っていましたが、

[01:50 - 01:55]
今日、実際にこれを実現できる解決策を見つけたと思います。

[01:55 - 02:02]
状況説明の2つ目の部分は、私がマインドセット

[02:02 - 02:08]
視覚思考

[02:05 - 02:11]
フレームワークで約束していること、あるいは主張していることについてです。私は

[02:08 - 02:14]
4次元PKMと視覚的な

[02:11 - 02:18]
Thettle Castenを提唱しています。それでは、この2つのトピックについて見ていきましょう。4次元

[02:14 - 02:22]
PKMは下から理解するのが最も効果的です。では、

[02:18 - 02:25]
2次元PKMとは何でしょうか？まず、

[02:22 - 02:28]
1次元目は

[02:25 - 02:31]
あなたが書いているテキスト文書で、私は

[02:28 - 02:33]
これを線形テキストと呼んでいます。

[02:31 - 02:35]
左上から右下に読む必要があるからです。

[02:33 - 02:38]
もちろん、あなたの言語がその方向とは

[02:35 - 02:40]
異なる方向から読む場合は、これが

[02:40 - 02:46]
1次元目、つまり線形テキストです。2

[02:43 - 02:49]
次元目は

[02:46 - 02:53]
あなたが作成している個別の文書で、各

[02:49 - 02:56]
文書は独自のファイルになっているかもしれません。

[02:56 - 03:02]
3次元PKMを実装することでゲームのレベルを上げることができます。

[02:59 - 03:05]
私の理解と

[03:02 - 03:08]
解釈では、これはThiago Forte

[03:05 - 03:12]
とNick Miloが提唱しているものです。彼らは

[03:08 - 03:15]
3D PKMの提唱者です。3次元とは、

[03:12 - 03:18]
ノート間のリンクです。2

[03:15 - 03:22]
次元PKMに

[03:18 - 03:26]
キーワードとファイル間のリンクを追加すると、

[03:22 - 03:29]
Vikiシステムや

[03:26 - 03:32]
Wikipediaのように、3次元が

[03:29 - 03:34]
ここに現れます。これがリンクです。では

[03:32 - 03:37]
4次元目は何でしょうか？

[03:34 - 03:40]
4次元目とは、

[03:37 - 03:42]
イラストを追加し始めることです。

[03:40 - 03:46]
イラストを追加するだけでなく、

[03:42 - 03:50]
アイコンや

[03:46 - 03:54]
画像の一部などのイラストを再利用し、それらの画像を

[03:50 - 03:57]
様々なノートで使用してアイデアを結びつけることです。

[03:54 - 04:01]
私はこれを「次の次元」と呼んでいます。VY

[03:57 - 04:04]
処理情報は、テキスト処理

[04:01 - 04:09]
方法とは大きく異なるからです。テキストは

[04:04 - 04:13]
線形処理ですが、ビジュアルは並列処理です。

[04:14 - 04:22]
線形テキストとビジュアル

[04:18 - 04:25]
ノートの違いを示す良い考え方は、お店の

[04:22 - 04:27]
レシートとショーウィンドウを例に考えてみましょう。お店で今

[04:25 - 04:30]
何が売られているか知りたい場合、どちらが速いでしょうか？

[04:30 - 04:37]
私がお話ししたいもう一つの概念は、

[04:34 - 04:41]
ビジュアル・ザットル・

[04:37 - 04:45]
カスタンです。 これは、

[04:41 - 04:48]
ノートに

[04:45 - 04:52]
視覚的な面とテキストの面という2つの面を持たせるという概念に基づいています。

[04:48 - 04:56]
このケースでは、ノートを選択して

[04:52 - 04:59]
裏面を開くと、

[04:56 - 05:02]
裏面は

[04:59 - 05:05]
このノートのマークダウン面になります。ここには、これに

[05:02 - 05:07]
関連する様々なテキストノートがあります。

[05:05 - 05:10]
これをExcol

[05:07 - 05:12]
draビューモードにすると、図面が表示されます。

[05:10 - 05:17]
これをMarkdownビュー

[05:12 - 05:20]
モードにすると、ドキュメントのマークダウン面

[05:17 - 05:22]
とノートが表示されます。

[05:20 - 05:26]
もちろん、これはExcolだけでなく、

[05:26 - 05:33]
PowerPointのスライドのスライドノートでも同様の方法で実現できます。

[05:29 - 05:35]
しかし、私のアイデア、あるいは提唱しているのは、

[05:33 - 05:38]
この方法により、

[05:35 - 05:41]
視覚的な表現、視覚的な

[05:38 - 05:43]
要約をカードの前面に、

[05:43 - 05:48]
アイデアの要約や

[05:46 - 05:53]
関連メモといった情報源などの背景情報をカードの背面に含めることができるということです。

[05:48 - 05:57]
つまり、

[05:57 - 06:03]
アイデアを視覚的に整理することで、箇条書きを

[06:00 - 06:07]
シャッフルするよりもはるかに強力なものになるということです。

[06:03 - 06:09]
そして、これが

[06:07 - 06:12]
Visual Zle Castanの全体的なアイデアの出番です。

[06:09 - 06:15]
ビジュアルZle Castan

[06:12 - 06:17]
ノートとして、これらのカードはそれぞれ

[06:15 - 06:20]
独立したZettle Castanノードであり、裏返して裏面の

[06:20 - 06:24]
内容を確認できます。

[06:22 - 06:29]
アイデアを整理する必要がある場合は、

[06:24 - 06:33]
このビジュアルレベルで整理できます。

[06:29 - 06:35]
以上が背景設定のトピックでした。

[06:35 - 06:42]
ここでもう1つ紹介したいことがあります。

[06:39 - 06:45]
昨日メールで連絡をくれたTed Blizzard氏です。

[06:42 - 06:48]
彼は論文執筆マシンのアイデア、つまりビジョンを共有してくれました。

[06:45 - 06:52]
これは、

[06:48 - 06:55]
研究者が引用

[06:52 - 06:57]
文献付きの文書を作成するのに役立つツールです。

[06:55 - 07:00]
これは、

[06:57 - 07:03]
これまで話してきたZettleの

[07:00 - 07:07]
執筆システムのアイデアに基づいています。皆さんは本を読んだり、記事を

[07:03 - 07:11]
読んだり、Webでメモを

[07:07 - 07:15]
取ったりして、これらすべてをZle Casting

[07:11 - 07:17]
ノートに記録します。そこから

[07:15 - 07:21]
VIやデータビュークエリを作成したり、他の

[07:17 - 07:24]
ツールを使って論文のアウトラインを作成したりできます。

[07:21 - 07:27]
そして、それを

[07:24 - 07:30]
Verドキュメント

[07:27 - 07:34]
やGoogleドキュメントなどのドキュメントに変換できます。これが今日

[07:30 - 07:37]
ご紹介するソリューションです。これから

[07:37 - 07:42]
見ていくソリューションのコンポーネントは次のとおりです。

[07:39 - 07:44]
Exol Drawのビジュアルレイアウトについて、これから

[07:42 - 07:48]
1秒ほどで見ていきます。

[07:44 - 07:53]
これはExol Drawスクリプト、つまりExol

[07:48 - 07:56]
Draw Writing Machineスクリプトです。これは、exolに追加される2つのプラグインであるch GPT

[07:53 - 08:00]
Obsidianテンプレートとai4テンプレートです。

[08:00 - 08:07]
テンプレートテンプレートです。テンプレートテンプレートは、

[08:07 - 08:14]
好きなだけ拡張したり縮小したりできます。まずはこのビジュアルレイアウトから始めましょう。

[08:11 - 08:16]
これが

[08:14 - 08:20]
最初にお見せしたい基本的な概念です。

[08:16 - 08:22]
次に、冒頭で見てきた実際の例を見てみましょう。スクリプトの

[08:22 - 08:30]
動作原理は、

[08:26 - 08:34]
Exol Draw Writing Machine

[08:30 - 08:37]
スクリプトが矢印のシーケンスをたどり

[08:34 - 08:41]
、さまざまな要素からテキストをキャプチャするということです。

[08:37 - 08:45]
ここでは

[08:41 - 08:48]
メインタイトルから始まり、分岐点が現れる

[08:45 - 08:50]
まで次の行は、メインタイトル

[08:50 - 08:56]
内またはメイン

[08:53 - 08:59]
タイトルの下に段落が続きます。分岐点が

[08:56 - 09:03]
現れたら、矢印上の最初のテキスト、

[08:59 - 09:06]
または別のテキスト要素が

[09:03 - 09:08]
セクションの見出しになります。そして、

[09:08 - 09:14]
段落は後から順番に続きます。

[09:14 - 09:20]
この例のようなZ Castanノートがあるとします。

[09:16 - 09:24]
これは非常にシンプルなZ Castaノードです。

[09:20 - 09:27]
ソース

[09:24 - 09:30]
セクションにはマインドセットフレームワークとアイデアが書かれています。この

[09:30 - 09:37]
レイアウトの場合は、

[09:37 - 09:42]
シーケンスの最初の要素を選択し、

[09:42 - 09:50]
excalをWriting Machineスクリプトで実行する必要があります。スクリプトを

[09:46 - 09:53]
実行すると、使用するテンプレートを選択できます。

[09:53 - 09:58]
別のファイルを選択してEscキーを押します。

[09:55 - 10:02]
これについては後で説明します。今のところ、テンプレートは

[09:58 - 10:04]
使用しないことにしました。これで

[10:02 - 10:06]
最終結果がわかります。

[10:04 - 10:10]
メインタイトルはレベル

[10:06 - 10:14]
2の見出しです。次に段落1、2、3があります。

[10:10 - 10:18]
セクション2には段落1と2があります。

[10:18 - 10:25]
セクション22には段落22があります。

[10:22 - 10:28]
画像の下に画像があり、

[10:25 - 10:31]
裏面に表示されているテキストがあります。

[10:31 - 10:37]
その後に括弧で囲まれたソースがあります。このノートのソースへの参照があります。 これは

[10:37 - 10:43]
スクリプトが生成する出力です。それでは、

[10:41 - 10:46]
この出力の使い方を見てみましょう。

[10:43 - 10:49]
これを閉じて、

[10:46 - 10:54]
私のライティングマシンのデモページに移動します。

[10:54 - 11:00]
始める前に、

[10:56 - 11:03]
Exol Writing

[11:00 - 11:06]
Machineスクリプトのインストール方法を紹介します。とても簡単です。Obsidian

[11:03 - 11:10]
Toolsパネルのここをクリックし

[11:06 - 11:13]
、

[11:10 - 11:16]
最初のボタン「

[11:13 - 11:19]
Excal Draw Scriptsのインストールまたは更新」を選択します。読み込まれたら、「writing

[11:19 - 11:26]
machine」と入力すると、

[11:22 - 11:30]
Excal Writing Machineへのリンクが表示されます。

[11:26 - 11:33]
ここをクリックしてスクリプトをインストールします。

[11:30 - 11:36]
ここには、Atomic Habitacitiesの

[11:33 - 11:39]
ページの要約に載っている私のカードがあります。

[11:36 - 11:42]
これらのカードを

[11:39 - 11:44]
見れば、それほど

[11:44 - 11:51]
驚くことはないでしょう。ビジュアルは

[11:47 - 11:54]
それほど高価ではありません。カードの裏面には、

[11:54 - 12:01]
アイデアの出所に関するデータや、アイデアの360°ビューなどがあります。

[12:01 - 12:06]
各カードには、私が

[12:04 - 12:11]
作成したカードに関する多くのコンテンツがあります。

[12:06 - 12:13]
これらはすべて私のシステム内のz Castaノートとして保存されています

[12:11 - 12:17]
が、もちろんこれらは

[12:13 - 12:20]
James Clearの本のどこかから引用したものです。

[12:17 - 12:24]
このフローを作成しました。

[12:20 - 12:28]
本の表紙から始まり、

[12:28 - 12:35]
この記事の内容についての簡単な紹介があり、

[12:31 - 12:39]
その後、記事の4つのセクションに続きます。

[12:35 - 12:42]
小さな行動が大きな違いにつながる理由、

[12:39 - 12:46]
アイデンティティとシステムに焦点を当てることがなぜ

[12:42 - 12:51]
重要なのかなどです。これらを読んでみてください。「

[12:46 - 12:52]
Atomichabits」をクリックし、再び

[12:52 - 12:57]
ライティングマシンのスクリプトを起動します。

[13:00 - 13:05]
ここでもテンプレートスクリプトは選択せず、

[13:05 - 13:11]
別のファイルを選択します。このメニューが表示されるのは、

[13:09 - 13:13]
スクリプトを初めて実行したときですが、後で詳しく

[13:11 - 13:15]
説明します。このメニューは表示されず、

[13:13 - 13:17]
次のメニューのみが表示されます。

[13:15 - 13:20]
既にテンプレートを選択している場合は、

[13:20 - 13:25]
別のファイルを選択してEscキーを押すと、テンプレートが提供されます。別のファイルを選択してEscキーを押すと、

[13:25 - 13:30]
テンプレートを使用していないことを意味します。この操作を行うと、

[13:28 - 13:34]
このドキュメントが作成されたことがわかります。これは、

[13:34 - 13:40]
今回見てきたドキュメントと同じです。同じロジックに従っています。

[13:37 - 13:43]
画像とテキスト、そしてこれがつなぎ

[13:40 - 13:46]
合わせた素材です。ここに表示されている

[13:43 - 13:49]
それぞれの

[13:46 - 13:52]
文章は、私が

[13:54 - 13:59]
作成した特定の永久メモについてのアイデアをまとめるために書いた文章です。

[13:59 - 14:06]
ここで作業を止めたい場合は、

[14:03 - 14:09]
この

[14:06 - 14:12]
ドキュメントを使って入力し、テキストを改善してください。

[14:12 - 14:19]
視覚的なレイアウトとテキストの整理方法があるので、既に多くの成果が得られていると思います。

[14:19 - 14:24]
そこからドキュメントを生成し、

[14:24 - 14:31]
このドキュメントで作業を開始できます。AIを使用する場合は、

[14:31 - 14:37]
すべてを選択して

[14:34 - 14:42]
クリップボードにコピーするだけの簡単な方法があります。CAD

[14:37 - 14:46]
GPTに移動すると、CAD

[14:42 - 14:49]
GPTに既にプロンプ​​トが表示されています。

[14:46 - 14:51]
アカデミックライティングの専門家であれば、

[14:49 - 14:56]
ビデオを一時停止してここで読むことができます。excolo Writing Machine

[14:56 - 15:03]
で生成されたテキストを

[15:01 - 15:07]
ここに貼り付けて、

[15:03 - 15:10]
Enterキーを押すだけです。これでchptが

[15:07 - 15:15]
魔法のように機能し、

[15:10 - 15:18]
chptに生成を依頼した記事が生成されます。

[15:18 - 15:25]
記事をMarkdownコードブロックとして返します。

[15:21 - 15:28]
そのため、

[15:25 - 15:31]
このMarkdownコードブロックを受け取っています。

[15:28 - 15:33]
テキストの準備ができました。

[15:31 - 15:37]
テキストの一番上までスクロールして、

[15:33 - 15:41]
このようにコードをコピーします。Obsidianに戻って貼り

[15:37 - 15:44]
付けを押します。

[15:41 - 15:47]
ここで、残念ながら

[15:44 - 15:50]
この生成では画像に何か問題が発生していることがわかります。画像には何も発生していません。画像の

[15:50 - 15:56]
読み込みに時間が必要だっただけです。

[15:56 - 16:03]
記事の準備ができたことがわかります。このように表示されます。

[16:00 - 16:07]
ここに少しガイドがあります。

[16:03 - 16:10]
はい、これを読んでください。

[16:07 - 16:13]
もちろんGPTでは何度か実行しましたが、GPTは

[16:10 - 16:16]
常に少し異なりますが、十分に良いと思います。これが

[16:16 - 16:23]
オプション1です。

[16:19 - 16:27]
これをさらに自動化したい場合は、次のオプションは

[16:23 - 16:30]
AI for templatorを使用することです。AI for

[16:27 - 16:32]
templatorは実際には2つのスクリプトを使用します。

[16:32 - 16:38]
コミュニティプラグインを見てみましょう。

[16:35 - 16:42]
まずAI

[16:38 - 16:47]
for templaterを紹介します。これはTFTハッカー

[16:42 - 16:50]
のCH GPTクエリを実行するための優れたプラグインです。

[16:47 - 16:52]
ai4

[16:50 - 16:55]
テンプレートと、

[16:52 - 16:58]
もちろんテンプレート

[16:55 - 16:59]
プラグインもインストールする必要があります。これらを

[16:58 - 17:03]
インストールして

[16:59 - 17:06]
設定したら、テンプレート

[17:03 - 17:10]
も必要になります。これは私が

[17:06 - 17:12]
作成したテンプレートです。このリンクを

[17:10 - 17:14]
どこかにアップロードして、

[17:12 - 17:19]
動画の説明にリンクを記載します。そうすれば、

[17:14 - 17:21]
最初から始める必要はありません。

[17:19 - 17:24]
これは非常にシンプルな

[17:21 - 17:25]
テンプレートです。この2つのファイルを閉じます。

[17:25 - 17:34]
これはシステムメッセージとユーザー

[17:30 - 17:39]
プロンプトを定義し、モデルを使用します。さて、モデルについてですが、

[17:34 - 17:44]
GPT 40 miniは非常に

[17:39 - 17:45]
低価格のモデルです。chbt 40の最新モデルは

[17:44 - 17:49]
少し高価なモデルですが、

[17:45 - 17:53]
正直なところ、

[17:49 - 17:56]
2日間のテストで約50セントかそれ以下しか費やしていない

[17:53 - 18:01]
ので、それほど大きな金額ではありません。

[18:01 - 18:11]
ここでこの2つのモデルを選んだ理由は、

[18:05 - 18:14]
より多くの出力トークンを使用できるからです。通常、これは

[18:11 - 18:19]
最大4,096です。例えば

[18:14 - 18:22]
GPT 40の場合、これらの2つのモデルはより多くのトークンを使用できます。

[18:19 - 18:23]
記事が長くなる可能性があるため、

[18:23 - 18:29]
これを選択しました。これでほぼ終わりです。あと

[18:27 - 18:31]
2つ、

[18:29 - 18:33]
実際には3つあります。

[18:33 - 18:41]
何が起こっているのかを理解できるようにここで示します。

[18:37 - 18:44]
最後に、EXC カラー ライティング マシン スクリプトが実行され、

[18:41 - 18:46]
生成されたテキストがウィンドウに配置されます

[18:44 - 18:50]
。

[18:46 - 18:54]
ewm なので、テンプレート スクリプトが

[18:50 - 18:59]
実行されると、window から値を取得できます

[18:54 - 19:03]
。  ewm を使って Sol から

[18:59 - 19:06]
Chad GPT に送信します。これがポイント 1、

[19:03 - 19:09]
ポイント 2 です。このテンプレート スクリプトを開発して、エラーの

[19:06 - 19:15]
検出とデバッグを支援する方法は、

[19:09 - 19:20]
閉じる前に

[19:15 - 19:23]
ewm のレスポンスを

[19:20 - 19:26]
window オブジェクトに配置、すべての変数を保存することです。

[19:23 - 19:30]
開発者

[19:26 - 19:32]
コンソールにアクセスして何が起こったかを確認できます。3

[19:30 - 19:37]
番目で最も重要な

[19:32 - 19:40]
ポイントは、

[19:37 - 19:42]
Writing Machine

[19:40 - 19:45]
スクリプトに

[19:42 - 19:48]
プレースホルダーを導入したことです。

[19:45 - 19:51]
これは、提供したテンプレート内で見つかった場所であればどこでも、

[19:51 - 20:00]
生成されたテキストに置き換えられます。

[19:54 - 20:02]
この方法により、元の

[20:00 - 20:07]
テキストをテンプレートに含めることができます。これがどのように機能するかは後ほど説明します。これが

[20:07 - 20:14]
テンプレート ファイルについてです。では、

[20:10 - 20:15]
スクリプトを実行してみましょう。Writing

[20:15 - 20:23]
Machine を起動し、

[20:19 - 20:26]
ここで作成したテンプレートを使用します。Enter

[20:23 - 20:27]
キーを押すと、ページが

[20:26 - 20:31]
生成されます。右

[20:27 - 20:34]
上隅のバブルに注目してください。CH

[20:34 - 20:41]
gbt が応答するまでしばらく表示されます。

[20:38 - 20:44]
この

[20:41 - 20:47]
場合も時間がかかりますので、生成が

[20:44 - 20:49]
完了するまで少しお待ちください。これで生成が完了し、

[20:51 - 20:58]
生成に関する統計情報を確認できます。

[20:55 - 20:59]
実際のドキュメントがここにあります。これは

[20:58 - 21:01]
かなり

[20:59 - 21:04]
良いドキュメントです。

[21:01 - 21:06]
最初に見たものと似ています。

[21:06 - 21:12]
詳細については説明しません。

[21:08 - 21:15]
そのPDFをもう一度アップロードします。

[21:12 - 21:19]
ビデオの説明にリンクを含めますので、

[21:20 - 21:25]
生成された内容を確認できます。スクリプトには設定が付属しています

[21:22 - 21:28]
が、初めて実行して設定を表示する必要があります。設定の下部にあるExcal

[21:32 - 21:38]
描画プラグインの設定にアクセスすると、

[21:38 - 21:44]
インストールされたスクリプトの設定が表示されます。

[21:41 - 21:47]
ここにExcal書き込みマシンが表示されますが、

[21:44 - 21:50]
これは私がスクリプトを開発したためであり、

[21:47 - 21:52]
ダウンロードした

[21:50 - 21:56]
フォルダには含まれていません。ここにあります。これは

[21:52 - 21:58]
実際にはあなた用です。ここには

[21:56 - 22:01]
何も表示されませんが、

[21:58 - 22:05]
スクリプトを初めて実行すると、

[22:01 - 22:08]
要素を選択して書き込みマシンを開始する必要があります。2

[22:08 - 22:14]
つの ここにライティングマシンのスクリプトがあります。

[22:11 - 22:16]
ダウンロードした

[22:14 - 22:19]
バージョンを実行します。Escキーを押します。

[22:19 - 22:24]
今回はテンプレートを使用しないためです。

[22:21 - 22:27]
ここでEscキーを押すと、生成されるものはすべて

[22:24 - 22:30]
完全に空白のドキュメントとして生成されます。

[22:27 - 22:32]
これを行うと、この

[22:30 - 22:35]
ドキュメントが生成されます。

[22:32 - 22:38]
設定に戻ると、

[22:35 - 22:41]
インストールされたスクリプトの設定の一番下までスクロールする

[22:38 - 22:44]
と、ダウンロードした

[22:41 - 22:47]
excoloライティングマシンがここにあります。ここで設定できる

[22:44 - 22:50]
項目がいくつかあります。

[22:47 - 22:54]
概要セクションの名前を変更できます。私の

[22:50 - 22:57]
場合は、すべてのメモでアイデアを使用している

[22:54 - 23:00]
ため、概要ではなくアイデアと呼んでいます。

[22:57 - 23:03]
好きな名前を入力してください。

[23:03 - 23:08]
ソースの場所を設定できます。これは「ソース」セクションです。

[23:06 - 23:11]
テンプレートのパスです。気にする必要はありません。

[23:11 - 23:15]
ドロップダウンリストからテンプレートを選択します。

[23:13 - 23:19]
自動的に入力されます。

[23:15 - 23:23]
これはスクリプトが最後に使用したテンプレートを保存する場所です。

[23:19 - 23:26]
最後に、

[23:23 - 23:29]
画像を埋め込むかどうかを選択できます。

[23:26 - 23:32]
これをオフにする場合は、

[23:29 - 23:35]
これを閉じて

[23:32 - 23:41]
スクリプトを再度実行します。

[23:35 - 23:44]
ここに来ると、

[23:41 - 23:47]
同じテキストが生成されますが、

[23:44 - 23:52]
画像は含まれていないので、画像も削除できます。

[23:52 - 23:57]
これでスクリプトのインストールは完了です。スクリプトを編集したい場合は、

[23:54 - 24:00]
実際に

[23:57 - 24:04]
編集する必要があるかもしれません。私の

[24:00 - 24:08]
考えでは、これは動作する

[24:04 - 24:11]
プロトタイプですが、多くのzleキャストとシステムがあるのと同じくらい多くの人々が使用しているため、

[24:11 - 24:16]
必要なように正確に構成する方法はありません。これが

[24:13 - 24:20]
exolドロースクリプトの力です。

[24:16 - 24:23]
ここにexolドローフォルダに来て

[24:20 - 24:27]
スクリプトまで移動して

[24:23 - 24:30]
ダウンロードします。下にスクロールすると、

[24:30 - 24:38]
ここにSkolドローライティングマシンがあります。これをクリックすると

[24:34 - 24:41]
スクリプトが開きます。編集するには少しスクリプトスキルが必要です。

[24:41 - 24:48]
あちこちにコメントを追加して、

[24:45 - 24:51]
簡単に理解できるようにしました。それほど

[24:48 - 24:54]
複雑なスクリプトではありませんが、もちろん

[24:51 - 24:56]
複雑なものと簡単なものは非常に

[24:54 - 24:59]
相対的なスケールです。これが怖いと思うかどうかは理解できます。もし怖い場合は、

[25:01 - 25:05]
自分が何をしているのかわかっている場合は設定に固執するか、実験したい場合は

[25:03 - 25:07]
失うものは何もありません

[25:05 - 25:10]
ので、 もう一度ダウンロードしてください。

[25:07 - 25:14]
失うものは何もありません。

[25:10 - 25:16]
良いスタート地点だと思います。また、

[25:14 - 25:21]
プロのヒントとして、全体を選択することもできます。Chad

[25:16 - 25:26]
GPTにアクセスして、Chad GPTに修正を依頼してください。

[25:21 - 25:29]
何らかの

[25:26 - 25:32]
修正が必要な場合は、

[25:29 - 25:36]
ここにスクリプトを貼り付けるだけで、

[25:32 - 25:38]
CH GPTを使用して

[25:36 - 25:41]
このスクリプトに必要な更新を行うことができます。

[25:38 - 25:43]
最後に、テキストの生成方法と矢印の解釈方法について理解しておく必要がある重要な点が1つあります。

[25:49 - 25:54]
矢印を作成する順序が重要です。

[25:52 - 25:58]
ここで何を意味しているかを説明しましょう。これは

[25:54 - 26:02]
タイトルになります。

[25:58 - 26:06]
これがセクション1になります。これが

[26:02 - 26:10]
セクション2になります。

[26:06 - 26:15]
次に、段落

[26:10 - 26:21]
1と段落12を作成します。ここに

[26:15 - 26:26]
段落21

[26:21 - 26:29]
と段落22を作成します。ここで、

[26:26 - 26:32]
システムを混乱させる可能性がある方法を説明します。これを

[26:29 - 26:35]
避けたい場合は、これを知っておくと便利です。

[26:32 - 26:36]
まず、

[26:35 - 26:40]
セクション2への矢印を描画します。

[26:36 - 26:43]
これらの素敵な

[26:40 - 26:47]
エルボコネクタを

[26:43 - 26:50]
選択し、セクション1を選択します。ここから

[26:47 - 26:53]
線を描き続けることができます。

[26:50 - 26:57]
これで終わりです。

[27:01 - 27:05]
これをWriting Machineのスクリプトで生成すると、

[27:05 - 27:11]
このようにはいきません。生成すると、

[27:08 - 27:15]
セクション2が一番上にセクション1が続いていますが、これは

[27:15 - 27:25]
理想的ではありません。代わりに、

[27:20 - 27:28]
これを削除して、戻ってセクション1とセクション2を追加します。もう一度実行すると、

[27:28 - 27:37]
セクション1が最初に来て、その次にセクション2が表示されます。

[27:44 - 27:51]
これで問題は解決しました。今日皆さん

[27:48 - 27:53]
にお伝えしたかったのは以上です。私と同じように、皆さんもこれを

[27:53 - 27:59]
面白く感じていただければ幸いです。これは、アイデアを

[27:56 - 28:03]
視覚的に整理してフローにまとめるための多くの機会を開くと思います。

[28:03 - 28:09]
プレゼンテーションを作成したり、ショー

[28:07 - 28:11]
ノートを作成したりできます。私はこれを使って

[28:09 - 28:16]
動画のスクリプトを作成するつもりです。

[28:11 - 28:19]
さまざまなユースケースが可能です。

[28:16 - 28:22]
これは非常に良い機会だと思います。

[28:19 - 28:25]
皆さんもこれらのスクリプトを使って

[28:22 - 28:27]
必要に応じてカスタマイズして

[28:25 - 28:30]
ください。コメントで、

[28:27 - 28:33]
これをどのように使用するか、

[28:30 - 28:36]
プロセス全体についてどう思ったか、

[28:33 - 28:40]
これらすべてから何が欠けているかを非常に興味深く思います。

[28:36 - 28:42]
最後に、これが役に立ち、興味深いと感じ、

[28:42 - 28:48]
マインドセットビジュアル思考フレームワーク

[28:44 - 28:51]
とPKMについてさらに学びたい場合は、

[28:48 - 28:53]
以下のリンクをご覧ください。ビジュアル

[28:51 - 28:56]
思考ワークショップをチェックして、

[28:53 - 28:58]
次のスコルツの1つに参加してください。フレームワークについてさらに詳しくお見せしたいと思います。

[28:58 - 29:04]
もちろん、

[29:01 - 29:07]
ビジュアル思考ワークショップのオフィスアワーでは、スクリプトや自動化、Obsidianなど

[29:04 - 29:10]
の他のトピックについて話し合う時間があります。

[29:10 - 29:15]
これはワークショップ

[29:12 - 29:19]
から得られる追加の機会です。

[29:15 - 29:19]
ありがとうございます。

## コメント

### 1. @VisualPKM (👍 3)
🚀 Excited to share this deep dive into the Excalidraw Writing Machine (EWM) script! This tool is a game-changer for anyone looking to transform visual layouts into structured drafts, whether you're working on academic papers, blog posts, or presentations. If you’re exploring Zettelkasten, PKM, or Obsidian, this workflow is fully customizable to fit your needs.

🔗 Don’t forget to check out the resources linked in the description, including the demo files and the script itself. And if you find value in this video, I’d love your support on Ko-fi!

💬 Let me know how you're planning to use the EWM script, or drop any questions you have below. I’m here to help you get the most out of your visual thinking tools!

### 2. @janitashelton (👍 5)
6:18 Love it! ❤❤

### 3. @brain.trinity (👍 1)
Woah Zsolt this is mind blowing!
I've been using Gen AI to get rough draft of my writing like you would show in this video, but adding a visual element to it with a tree structure will temendousoly help out the planning and structuring process!
And maybe on another section of the same canvas, I might be first able to just lay out the cards (embeds) before hand previous to drawing out the tree.
I always appreciate your pioneer mindse5 into visual Pkm.

> **@VisualPKM** (👍 2): I like to lay items out first, then connect them. I do the same with my mindmaps. The branches are the last I draw, I first just create a "word cloud" of phrases I want on the map, then organize them into clusters, and when the ideas settle, I add the branches. A similar approach to laying out the storyline for an article or presentation should work very well. I'd add the arrows as the last step.

### 4. @MWML2n2Wruzd7sd (👍 0)
Good¡ muy bueno lo aplicaré para mis alumnos de Perú

### 5. @quietlyworking (👍 1)
👏 Completely spectacular! Feels like magic💕🙏 thank you!

> **@VisualPKM** (👍 2): Thank you! It does feel kind of magical. The workflow still needs a bit of polishing, but it definitely looks promising!

### 6. @followthegood1 (👍 0)
Excellent. Marvelous. Mind Jolts by Zsolts.

### 7. @roman_iakymovych (👍 1)
Thank you, this is awesome!

### 8. @JTIAPBN (👍 0)
"Thank you for your tutorial. I successfully generated an article by following your instructions. However, I encountered a problem and had to use the shortcut Alt+R after selecting the template. I wanted to share this solution in case others face the same issue. Once again, thank you for your hard work and helpful guidance."

> **@VisualPKM** (👍 1): yes depending on how templater is configured it might happen that the script is not executed on new file creation. There is a related setting in Templater plugin settings. CTRL+R is also a good solution, it puts more control in your hand as to when you want to run your script.

### 9. @tfthacker (👍 1)
Amazing work!!!

> **@VisualPKM** (👍 1): AI for Templater is such a useful tool!

### 10. @飯塚浩也 (👍 0)
Amazing, Zsolt！

### 11. @yklee00815 (👍 0)
Like it! 
Could you let me know how to open and close back-of-note card like you? 4:54

> **@VisualPKM** (👍 0): Select the image and use the "Open the back-of-the-note of the selected excalidraw image" action from the command palette. You can set up a hotkey in Obsidian settings.

> **@yklee00815** (👍 0): Thank you for reply

### 12. @RobertRodriguezJr (👍 0)
Amazing, super useful and still trying to wrap my head around all the potential uses. One question, at 4:50 you select an embedded drawing and open the backside of the note in a new window. Are you using some extra script or plugin to do that? I can't seem to achieve that in one step as you show, thanks

> **@VisualPKM** (👍 3): There is a command palette action for that. When an embedded Excalidraw drawing is selected press CTRL+P to bring up the command palette and look for "Excalidraw: Open the back-of-the-note of the selected excalidraw image". I've set up a hotkey for that so I can quickly look at the back of the notes for any of my embedded drawings.
The feature has been there for some time now, but I wasn't advertising it because Obsidian 1.6.0...1.6.6 froze when you did that. The underlying issue was fixed in Obsidian in 1.6.7, so now the feature can be safely used.

### 13. @rajakumarperumal4856 (👍 0)
Really superb Thanks

### 14. @LarsOlesen-o9q (👍 0)
Great work as always. Could the idea of the way arrows are used for the writing machine inspire how arrows could be used for the presentation, so they are used in the same way - or maybe support frames for the writing machine?

> **@VisualPKM** (👍 0): You mean that instead of following the frame names follow the arrow sequence connecting the frames?

### 15. @CarlLemp (👍 0)
This looks like a great way to organize documents.  I’d like to try it with technical specifications but these documents, at least in my field, have one additional structure: parallel branches.  The normal links represent a sequence but are there other link types that can represent parallel divergence and parallel convergence so those can be treated differently when organizing the information into a linear text?

> **@VisualPKM** (👍 1): In short yes. The reason I am sharing the code for Excalidraw Writing Machine and the AI for Templater script is to allow you to modify the code to your needs. All I do is to provide a working skeleton of a solution.

In my experience, to get helpful responses from AI, at this time you need to spoon feed it with the input and instructions. If you give it a complex web of connected text with branches and links, AI will likely come back with something not very usable.

> **@CarlLemp** (👍 0): @ Thank you.  I’ll take a look at the scripts.

### 16. @marcosrafaelromansalgado6191 (👍 0)
Great work, it's super helpful and really well thought out! However, I'm encountering an issue with the writing machine. It works, but instead of giving me both the Excalidraw and the back note, it only gives me the Excalidraw. Any idea how I can fix this? Thanks in advance!

> **@VisualPKM** (👍 0): I'm afraid that without seeing your file and settings it will be pretty difficult to hello. Maybe you can ping me on Discord... and share the file you are working on?

### 17. @李样-h4s (👍 0)
Excellent creation, plus I have another request. After listing each idea in excalidraw and exporting all ideas as a single article, can I batch output each idea as a separate note? Editors can do things like encoding the cards for each idea. Because isn't the rule of Zettelkasten that every idea corresponds to a card?

> **@李样-h4s** (👍 0): My current workflow is to type each key sentence into a note and encode it as I see it. But it's a lot of work, and you need to keep opening and closing tabs. If you can record every idea in an excalidraw and add relationships to it, that's what your video demonstrates. Then if you can code each note, you can organize each idea freely

> **@VisualPKM** (👍 0): You can right click on text elements and select convert to file from the context menu. If you want more you a can build a custom script to perform that for you.

### 18. @weiguo7655 (👍 0)
That is a brilliant idea, Zsolt. It can really accelerate the writing progress! 
I've tried to use chatgpt add another function to that script: extract the text from the document if the element a wiki link (I used [[file]] format). 
However, I failed to do that. Can you give me some hint how to do that? I would really appreciate it.

> **@weiguo7655** (👍 0): I've tried to handle it as an image, and it succeeded. This makes the workflow even more interesting!

> **@VisualPKM** (👍 0): I released an update to the script a few days ago. You can update it from the Excalidraw script store. After you download the update you need to run it once so the new setting is installed. The new setting now includes an option for [[wikilinks]] instead of [markdown](links).

I also normally use wiki links. The reason I opted for markdown links in the script because chat GPT kept messing up my wikilinks ending up with broken links and links converted to markdown links incorrectly. If you find a way to force GPTs hand to leave links alone and just use the wiki links provided in the prompt please let me know your trick...

### 19. @YeHang (👍 0)
this is a great idea to have a back side of your note! But your way involved too much of action to take. With another software call affine, you can convert your note to canvas with one click. Maybe you should try to reduce the friction. Love your work❤

> **@VisualPKM** (👍 0): Affine looks pretty awesome. I'll play with it a little.

### 20. @syedamanhussain6361 (👍 0)
I want to know why we have to focus on gpt only why we are not able to use other llm models also 
Can you please upgrade your workflow by adding more options for llms like gemini and groq as they will provide more scale to your work

> **@VisualPKM** (👍 0): I think you can set up other LLMs with AI for Templater. Please check the documentation for AI for Templater. Else you can always edit the provided templater script to add the fetch call for whatever LLM you want to use.

