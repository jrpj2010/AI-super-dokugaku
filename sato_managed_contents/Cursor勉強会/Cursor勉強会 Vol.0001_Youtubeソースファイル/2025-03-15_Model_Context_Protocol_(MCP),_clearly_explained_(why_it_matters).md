# Model Context Protocol (MCP), clearly explained (why it matters)

**チャンネル:** Greg Isenberg
**公開日:** 2025-03-14
**URL:** https://www.youtube.com/watch?v=7j_NE6Pjv-E

## 説明

I’m joined by Ras Mic to explain Model Context Protocol (MCP). Mic breaks down how MCPs essentially standardize  how LLMs connect with external tools and services. While LLMs alone can only predict text, connecting them to tools makes them more capable, but this integration has been cumbersome. MCPs create a unified layer that translates between LLMs and services, making it easier to build more powerful AI assistants.

Timestamps:
00:00 - Intro
02:26 - The Evolution of LLMs: From Text Prediction to Tool Use
07:39 - MCPs explained
10:59 - MCP Ecosystem Overview
13:47 - Technical Challenges of MCP
15:05 - Conclusion on MCP's Potential
15:48 - Startup Ideas for Developers and Non-Technical Users

Key Points:

• MCP (Model ContextProtocol) is a standard that creates a unified layer between LLMs and external services/tools
• LLMs by themselves are limited to text prediction and cannot perform meaningful tasks without tools
• MCP solves the problem of connecting multiple tools to LLMs by creating a standardized communication protocol
• The MCP ecosystem consists of clients (like Tempo, Windsurf, Cursor), the protocol, servers, and services

1) What are MCPs and why should you care?

MCPs are NOT some complex physics theory - they're simply STANDARDS that help LLMs connect to external tools and services.

Think of them as universal translators between AI models and the tools they need to be truly useful.

This is HUGE for making AI assistants actually capable!

2) The Evolution of LLMs: From Text Prediction to Tool Use

Stage 1: Basic LLMs can only predict text
• Ask ChatGPT to send an email? "Sorry, I can't do that"
• They're glorified text predictors (if I say "My big fat Greek..." it knows "wedding" comes next)
• Limited to answering questions, not DOING things

3) The Current State: LLMs + Tools

Stage 2: LLMs connected to tools
• Companies like Perplexity connect LLMs to search engines
• This makes them more useful but creates problems
• Each tool = different "language" the LLM must learn
• Connecting multiple tools = engineering NIGHTMARE

This is why we don't have Jarvis-level assistants yet! 

4) Enter MCPs: The Game-Changer

MCPs create a UNIFIED LAYER between LLMs and external services.

Instead of your AI speaking 10 different "languages" to use 10 different tools, MCPs translate everything into ONE language.

Result? LLMs can easily access databases, APIs, and services without massive engineering headaches.

5) The MCP Ecosystem Explained

The MCP system has 4 key components:

• MCP Client: User-facing apps like @tempoai, Windsurf, Cursor
• Protocol: The standardized communication method
• MCP Server: Translates between client and services
• Service: The actual tool (database, search engine, etc.)

Brilliant move by Anthropic: SERVICES must build MCP servers!

6) Why This Matters For Builders

For technical folks:
• Opportunity to build tools like MCP app stores
• Easier integration between services
• Less engineering headaches

For non-technical folks:
• Watch closely as standards evolve
• When standards finalize, new business opportunities will emerge
• Think of MCPs as Lego pieces you'll stack to build powerful AI apps

Notable Quotes:

"LLMs by themselves are incapable of doing anything meaningful... The only thing an LLM in its current state is good at is predicting the next text." - Ross Mike

"Think of every tool that I have to connect to make my LLM valuable as a different language... MCP, you can consider it to be a layer between your LLM and the services and the tools." - Ross Mike

LCA helps Fortune 500s and fast-growing startups build their future - from Warner Music to Fortnite to Dropbox. We turn 'what if' into reality with AI, apps, and next-gen products https://latecheckout.agency/

BoringAds — ads agency that will build you profitable ad campaigns http://boringads.com/

BoringMarketing — SEO agency and tools to get your organic customers http://boringmarketing.com/

Startup Empire — a membership for builders who want to build cash-flowing businesses https://www.startupempire.co

FIND ME ON SOCIAL

X/Twitter: https://twitter.com/gregisenberg
Instagram: https://instagram.com/gregisenberg/
LinkedIn: https://www.linkedin.com/in/gisenberg/

FIND MIC ON SOCIAL

X/Twitter: https://x.com/rasmickyy
Youtube: https://www.youtube.com/@rasmic

## 字幕

[00:00 - 00:08]
みんながMCPについて話していて、すっかり話題になっています

[00:04 - 00:11]
が、実際にはほとんどの

[00:08 - 00:13]
人がMCPとは何か、

[00:11 - 00:16]
その意味、そして

[00:13 - 00:19]
それに関連するスタートアップの機会について全く理解していません。そこで

[00:16 - 00:22]
今回のエピソードでは、

[00:19 - 00:25]
おそらく

[00:22 - 00:27]
技術的な概念を

[00:25 - 00:29]
非常に分かりやすく、

[00:27 - 00:31]
技術に詳しくない人でも理解できる最高の説明者であるロス・マイク教授を招きました。

[00:29 - 00:33]
教授は

[00:31 - 00:35]
短時間で非常に分かりやすく説明してくれ、

[00:33 - 00:37]
最後まで聞いていただければ、MCPを取り入れた

[00:35 - 00:41]
彼のスタートアップのアイデアをいくつか聞くことができます。

[00:37 - 00:43]
エピソードをお楽しみください。また

[00:50 - 00:59]
すぐにお会いしましょう。[音楽] さて、

[00:54 - 01:02]
ポッドキャストにロス・マイク教授をお招きしました。彼にお願いした理由は、

[01:02 - 01:09]
MCPが一体何なのか全く分からず、

[01:04 - 01:12]
Xで見かけたので、

[01:09 - 01:14]
ロス・マイク教授の簡潔で明確な

[01:12 - 01:16]
説明が必要だったからです。ええ、

[01:14 - 01:18]
それに関するスレッドをたくさん読んだり、いくつかの動画を見たりしましたが、ロス・マイク教授の説明に

[01:16 - 01:22]
勝るものはありません。

[01:18 - 01:26]
そこで、

[01:22 - 01:27]
MCPについて何を知る必要があるのか​​を知りたいのです。 そういうわけで、

[01:26 - 01:29]
あなたがここにいるわけですね。

[01:27 - 01:31]
来ていただきありがとうございます。ありがとう

[01:29 - 01:32]
ございます。はい、

[01:31 - 01:35]
授業は間違いなく始まっています。

[01:35 - 01:41]
画面を共有し始めます。MCPを理解することは本当に重要です。そして、その

[01:45 - 01:50]
メリットと、なぜそれが重要なのか、そしてそれほど重要ではないのかも理解していただけると思います。

[01:52 - 01:57]
プログラミングの世界には、私たちが持っているもの、そして

[01:54 - 01:58]
プログラマーが愛するものの一つに標準があります。

[01:57 - 02:02]
標準が重要な理由は、

[01:58 - 02:04]
エンジニアが

[02:02 - 02:07]
互いに通信するシステムを構築できるようにするためです。

[02:04 - 02:08]
ご存知かもしれませんが、

[02:07 - 02:09]
聞いたことがあるかもしれませんし、知らないかもしれません。

[02:08 - 02:13]
詳細を知る必要もありませんが、最も一般的なものは

[02:09 - 02:17]
REST APIです。これは

[02:13 - 02:20]
基本的に、すべての企業が

[02:17 - 02:23]
APIや

[02:20 - 02:26]
サービスを構築する際に従う標準です。

[02:23 - 02:29]
エンジニアである私にとって、REST APIと接続できるようにするためです。

[02:29 - 02:33]
エンジニアリングとは標準であり、

[02:31 - 02:37]
これらの形式に従うことで、

[02:33 - 02:39]
作業を楽にできるということを理解してください。LLMの文脈で考えると、

[02:39 - 02:44]
重要なことが一つあります。LLM

[02:42 - 02:45]
だけでは

[02:44 - 02:47]
何もできないということを理解してください。 意味があるというのはどういう意味でしょうか？

[02:45 - 02:51]
最初のチャットボットを覚えているでしょうか？

[02:47 - 02:53]
GBT 3だったか3.5だったか覚えていませんが、

[02:51 - 02:56]
チャットボットを開いて

[02:53 - 02:57]
メールを送信するように指示しても、

[02:56 - 02:59]
やり方が分からず、「

[02:57 - 03:01]
メールは送れません」とだけ表示されます。LLM

[02:59 - 03:05]
でできることは、

[03:01 - 03:08]
質問することくらいです。

[03:05 - 03:12]
歴史上の人物について教えて

[03:08 - 03:14]
ほしいと頼むくらいです。LLMは本当に意味のあることを何もできません。

[03:14 - 03:19]
意味があるというのは、

[03:16 - 03:22]
メールを送信してくれたり、

[03:19 - 03:25]
私に代わって何か特定のタスクを実行してくれたりすればいいのですが、現状

[03:22 - 03:27]
のLLMが

[03:25 - 03:30]
得意とするのは、

[03:27 - 03:34]
次のテキストを予測することだけです。例えば、私が「

[03:30 - 03:36]
My Big Fat Greek」と言った場合、LLMはすべての

[03:34 - 03:38]
データソースとすべてのトレーニング

[03:36 - 03:41]
資料を使用して、次の

[03:38 - 03:44]
単語は「wedding」であると判断できます。これは

[03:41 - 03:48]
LLMが単独で実行できる最大のことです。

[03:44 - 03:52]
次の進化は、開発者が

[03:48 - 03:55]
LLMをツールと組み合わせると、

[03:55 - 04:00]
APIのようなツールが考えられます。例えば、

[03:58 - 04:02]
チャットボットや

[04:00 - 04:05]
その他のチャットボットがインターネットを検索できることは、ほとんどの人がご存知でしょう。

[04:02 - 04:08]
例えば、Perplexityです。Perplexityは

[04:08 - 04:13]
LLMとチャットするオプションを提供しますが、LLMはインターネット

[04:11 - 04:16]
から情報を取得して

[04:13 - 04:19]
提示する機能を持っています。LLM

[04:16 - 04:21]
自体にはそのような機能はありません。しかし、

[04:19 - 04:24]
彼らはツールを構築し、

[04:21 - 04:26]
LLMに外部サービスへのアクセスを与えました。

[04:26 - 04:30]
こうしたサービスは数多くあります。Brave

[04:28 - 04:34]
Search

[04:30 - 04:36]
やChat、Open AIなどです。現在、APIを提供しています。

[04:36 - 04:42]
ツールとLLMを接続することで、LLMはさらに強力になり始めています。

[04:39 - 04:46]
例えば、メールを

[04:42 - 04:50]
受け取るたびにスプレッドシート

[04:46 - 04:52]
にエントリを追加したいとします。Zapier、

[04:52 - 04:57]
End8などのサービスがあることはご存知でしょう。

[04:55 - 05:00]
これらの自動化

[04:57 - 05:03]
サービスを使って自動化を構築し、

[05:00 - 05:06]
LLMに接続すると、

[05:03 - 05:09]
少し簡単になります。 より意味のあるものになり

[05:06 - 05:11]
ました。これは素晴らしいことですが、複数の機能を持つアシスタントを

[05:09 - 05:14]
構築しようとすると、本当にイライラします。

[05:14 - 05:19]
インターネットで検索したり、

[05:16 - 05:22]
メールを読んだり、まとめたりすると、

[05:22 - 05:28]
これらのLLMにさまざまなツールをくっつける人になり、

[05:25 - 05:30]
非常にイライラし、非常に面倒になり

[05:43 - 05:49]
ます。なぜアイアンマンレベルのJarvisアシスタントがないのか疑問に思うかもしれませんが、これらのツールを組み合わせてLLMと連携させるのは一つの方法ですが、これらのツールを重ねて統合し、連携させるのはそれ自体が悪夢だからです。これが

[05:46 - 05:50]
現在の状況です。話を

[05:49 - 05:53]
続ける前に、これが理にかなっていますか？

[05:50 - 05:56]
これがLLM自体の始まりです。

[05:53 - 05:59]
詩を書いてください。ええと、第

[05:56 - 06:01]
一次世界大戦について教えてください。そして

[05:59 - 06:05]
2番目の進化は、ああ、今では

[06:01 - 06:07]
ツールがあります。つまり、

[06:05 - 06:11]
これらの外部サービスを

[06:07 - 06:14]
LLMに接続できるようになったということです。ここでの問題は、

[06:11 - 06:17]
それらが難しくて面倒なことです。AI

[06:14 - 06:19]
スタートアップのTempoで働いている者として、

[06:17 - 06:22]
私たちは多くのツールを持っています。

[06:19 - 06:24]
例えば、 検索するには

[06:22 - 06:26]
外部サービスを見つけて、

[06:24 - 06:28]
それをLLMに接続する必要があります。そして

[06:26 - 06:30]
LLMが幻覚を起こしたり、

[06:28 - 06:34]
何かおかしなことをしたりしないようにする必要があります。信じられないかもしれませんが、

[06:30 - 06:37]
LLM自体は

[06:34 - 06:41]
とても愚かです。しかし、これらの

[06:37 - 06:44]
ツールによってLLMが少しだけ機能強化されます。

[06:41 - 06:47]
これが私たちの現状です。グレッグ、

[06:44 - 06:50]
ここまでは順調ですね。

[06:47 - 06:52]
ポッドのこの素晴らしい短い休憩で、

[06:50 - 06:56]
スタートアップ・エンパイアについて少しお話ししたいと思います。

[06:52 - 06:59]
スタートアップ・エンパイアは私のプライベート

[06:56 - 07:03]
メンバーシップで、

[06:59 - 07:05]
皆さんのようにスタートアップのアイデアを実現したい、そしてそれを

[07:05 - 07:08]
加速させるのに役立つコンテンツを探している人たちが集まっています。彼らは

[07:07 - 07:11]
潜在的な

[07:08 - 07:14]
共同創業者を探しており、

[07:11 - 07:16]
私のような人からのチュートリアルを求めて、

[07:14 - 07:17]
メール

[07:16 - 07:19]
マーケティングのやり方、オーディエンスの構築方法、

[07:17 - 07:22]
Twitterでバイラルにする方法など、

[07:19 - 07:24]
様々なことを学びたいと思っています。まさにそれが

[07:22 - 07:26]
スタートアップ・エンパイアです。

[07:24 - 07:29]
スタートアップを始めたいけれど

[07:26 - 07:31]
アイデアを探している人、あるいはスタートアップは

[07:29 - 07:34]
始めたけれど成果が

[07:31 - 07:37]
出ていない人のためのものです。 彼らが必要とする牽引力については、

[07:37 - 07:45]
説明にあるStartup empire.coへのリンクを確認してください。ここでmCPが登場します

[07:41 - 07:47]
が、mCPとはどういう意味でしょうか。

[07:45 - 07:49]
あまり技術的な話にならずに済む最も簡単な方法だと思います。

[07:47 - 07:51]
私もスレッドを読みました。

[07:49 - 07:53]
技術者としてはありがたいのです

[07:51 - 07:56]
が、そうでない人にとっては

[07:53 - 07:58]
イライラすると思います。このように考えてみてください。自分の

[07:58 - 08:05]
LLMを価値あるものにするために接続しなければならないすべての

[08:02 - 08:07]
ツールを、異なる言語として考えてみてください。ツール1は英語、

[08:05 - 08:10]
ツール2はスペイン語、ツール3は

[08:07 - 08:13]
日本語です。すべてのツールが

[08:10 - 08:15]
独自の言語であると想像してください。APIの

[08:13 - 08:18]
動作に標準がないわけではありませんが、

[08:15 - 08:20]
サービスプロバイダーごとに

[08:18 - 08:21]
APIの構築方法が異なります。

[08:20 - 08:25]
渡す情報が異なり、

[08:25 - 08:29]
設定しなければならないものも多岐にわたります。

[08:29 - 08:34]
さまざまなものをつなぎ合わせているように感じます。

[08:31 - 08:38]
動作するでしょうか？はい、動作しますが、規模が大きくなると非常に難しくなります。mCPは、

[08:38 - 08:45]
LLMと

[08:43 - 08:48]
サービスおよびツールの間のレイヤーと考えることができます。この

[08:45 - 08:51]
レイヤー これらすべての異なる

[08:48 - 08:55]
言語を、

[08:51 - 08:58]
LLMにとって完全に理解可能な統一言語に変換します。つまり、これは

[08:55 - 09:01]
LLMとツールの進化形です。しかし、

[08:58 - 09:04]
この進化により、

[09:01 - 09:07]
LLMが

[09:04 - 09:08]
さまざまな外部リソースに接続してアクセスすることが非常に簡単になります。

[09:08 - 09:14]
結局のところ、ツールとはそういうものだからです。mCPを使えば、

[09:11 - 09:18]
外部

[09:14 - 09:21]
データソース、外部データベース、例えば

[09:18 - 09:24]
ConvexやSuperbaseのようなツールに接続できます。

[09:21 - 09:26]
想像してみてください。LLMに「データベース

[09:24 - 09:30]
に新しいエントリを作成してください」と指示するだけで、LLMは

[09:30 - 09:36]
mCP経由でデータベースに接続され、何をどのように行うべきかを正確に把握します。2

[09:33 - 09:38]
つ目の

[09:36 - 09:41]
進化形であるLLMとツールでは、多く

[09:38 - 09:43]
の手作業が必要であり、

[09:41 - 09:45]
段階的な計画を立てる必要があり、

[09:45 - 09:50]
失敗する可能性のあるエッジケースも多数あります。だからこそ、この

[09:47 - 09:52]
分野ほどエキサイティングな人はいません。Jarvis

[09:50 - 09:55]
レベルのアシスタントはまだいません。私たちは

[09:52 - 09:58]
そこに近づいているように感じますが、

[09:55 - 10:00]
このシステムにより、

[09:58 - 10:04]
非常に異なっていて、何がイライラするかと

[10:00 - 10:07]
いうと、単純な

[10:04 - 10:09]
サービス、ご存知のツールのようなものを想像してみてください。Slack

[10:07 - 10:12]
メッセージが届くたびに、

[10:09 - 10:15]
LLMがそのメッセージを読み取り、テキストメッセージを送信します。これは

[10:15 - 10:21]
些細なことのように思えますが、ここがイライラする

[10:18 - 10:24]
ところです。SlackがAPIを更新したり、

[10:21 - 10:27]
テキストサービスの更新によって変更が加えられたりすると、

[10:24 - 10:29]
そのサービスが

[10:27 - 10:31]
他のサービスに接続されたり、

[10:29 - 10:32]
段階的に自動化するような計画があったりすると、

[10:32 - 10:37]
悪夢に

[10:35 - 10:39]
なり、恐ろしい状況になります。だからこそ、

[10:37 - 10:41]
LLMの時代でも優秀なエンジニアは

[10:39 - 10:45]
報酬を得られます。このようなものが

[10:41 - 10:49]
存在するからです。MCPは

[10:45 - 10:54]
LLMとサービスを統合します。つまり、

[10:54 - 10:59]
サービスとLLMが

[10:57 - 11:02]
効率的に通信できるレイヤーを作成します。では、

[10:59 - 11:07]
実用的な観点から

[11:02 - 11:10]
見てみましょう。MCPエコシステムは次のように考えることができます。MCP

[11:07 - 11:13]
クライアント、

[11:10 - 11:16]
プロトコル、MCPサーバー、そして

[11:13 - 11:19]
サービスがあります。MCPクライアントは

[11:16 - 11:24]
Tempo Wind Surfカーソルのようなもので、

[11:19 - 11:27]
基本的に、

[11:24 - 11:29]
このエコシステムのクライアント側、つまりLLM側です。

[11:29 - 11:34]
プロトコルは

[11:32 - 11:38]
クライアントとサーバー間の双方向接続であり、

[11:34 - 11:41]
サーバーは

[11:38 - 11:44]
外部サービスの

[11:41 - 11:46]
機能とクライアントへの実行内容を翻訳します。

[11:44 - 11:48]
そのため、mCP

[11:46 - 11:51]
クライアントとmCPサーバーの間には

[11:48 - 11:54]
mCPプロトコルが存在します。しかし、ここが興味深い

[11:51 - 11:56]
部分であり、私がアントロピック氏を

[11:54 - 11:59]
3Dチェスでプレイしていると考える理由です。彼らがこれを構築した時、このアーキテクチャは

[11:59 - 12:06]
まさにその通りです。mCPサーバーはサービスプロバイダーの手に委ねられています。

[12:03 - 12:09]
例えば、私と

[12:06 - 12:11]
グレッグ氏が開発ツール会社を経営していて、

[12:09 - 12:13]
データベースを扱っているとしましょう。「

[12:13 - 12:18]
世界最高のデータベース会社を作り、

[12:16 - 12:22]
人々のLLMが

[12:18 - 12:25]
このデータベースにアクセスできるようにしたい」としましょう。クライアントが完全にアクセスできる

[12:22 - 12:27]
ように、このmCPサーバーを構築するのは私たちの責任です。

[12:27 - 12:31]
つまり、アントロピック氏は、

[12:29 - 12:34]
LLMをより強力で、より高機能にしたいが、

[12:34 - 12:37]
それを実現させるのはあなたの仕事だ、と言っているようなものです。これが理由です。

[12:36 - 12:41]
外部サービス

[12:37 - 12:42]
プロバイダーがそれぞれ異なるmCP

[12:41 - 12:46]
サーバーを構築し、リポジトリなどを構築していることに気づいたでしょう。

[12:42 - 12:49]
これは、

[12:46 - 12:51]
LLMの能力が向上するという意味で大きな意味を持ちます。

[12:49 - 12:54]
しかし、技術的な

[12:51 - 12:56]
観点から見ると、彼らが行ったのは標準を作ったことだけです。

[12:56 - 13:02]
あらゆる企業やエンジニアが、

[13:02 - 13:08]
どんなシステムでもAPIを好きなように構築できるため、その標準に従うことになるように思えます。

[13:06 - 13:10]
問題は、スケールアップや

[13:08 - 13:12]
成長、他の開発者や

[13:10 - 13:14]
企業との連携、そしてサービスの利用を望む場合、

[13:14 - 13:17]
彼らにとって意味のある方法で提供する必要があるということです。

[13:15 - 13:19]
もし私たち全員が異なる言語を話していたらどうなるでしょうか？

[13:17 - 13:21]
しかし、標準があれば、

[13:21 - 13:29]
私たち全員が意味のある方法でコミュニケーションをとることができます。MCPは

[13:25 - 13:31]
LLMにとってまさにその役割を果たします。LLM自体は

[13:29 - 13:33]
それほど高性能ではありません。LLMは

[13:33 - 13:38]
予測可能性が高く、

[13:35 - 13:41]
次の単語を予測する方法を知っているシステムです。しかし、

[13:38 - 13:44]
このMCPプロトコル全体を追加することで、LLMが

[13:44 - 13:50]
重要な機能を実行できるようになります。

[13:48 - 13:52]
これらすべてを理解すると、すべてが順調というわけではありません。技術的な問題が

[13:50 - 13:54]
いくつかあります。

[13:54 - 13:59]
誰かがお気に入りのmCPクライアントでmCPサーバーをセットアップしたことに気づいたら、課題に

[13:59 - 14:03]
気付いているでしょう。

[14:01 - 14:05]
ダウンロードが大量に必要で、このファイルを移動したり、

[14:03 - 14:08]
あれをコピーしたり、そして3番目に、

[14:05 - 14:09]
ローカルなものがたくさん必要で、

[14:08 - 14:12]
解決しなければならない問題がいくつかあります。

[14:09 - 14:15]
しかし、これらが解決され、

[14:12 - 14:17]
完成し、洗練され、あるいは標準が更新されたり、

[14:15 - 14:19]
誰かが

[14:17 - 14:22]
より良いものを思いついたりすれば、

[14:19 - 14:24]
LLMがより高性能になる世界に入り始めます。

[14:22 - 14:28]
文字通り、

[14:24 - 14:30]
mCPはLLMをより高性能にするだけです。

[14:28 - 14:34]
私たちはツールを使ってそれを実現しようとしています。

[14:30 - 14:36]
今はうまくいっていますが、

[14:34 - 14:39]
mCPは次の進化のように

[14:36 - 14:41]
思えます。Greg、あなたの最新のビデオを見ました。Manis

[14:39 - 14:46]
Manisは2番目の素晴らしい例です。

[14:41 - 14:49]
たくさんのツールがあり、称賛に値します。

[14:46 - 14:51]
彼らはそれをうまく設計しており、それらが

[14:51 - 14:55]
うまく連携して機能することが分かります。私は試したことがない

[14:53 - 14:58]
ので、人々が何をしたかを見ているだけです。

[14:55 - 15:00]
でも、これだけは言えます。

[14:58 - 15:03]
エンジニアリングに費やす時間は非常に多く、

[15:00 - 15:05]
変更が1つ発生すると何かが

[15:03 - 15:09]
壊れて誰かが待機して寝られない、といった状況が

[15:19 - 15:25]
頻繁に発生します。しかし、MCPでは、この標準に従えばLLMは必要なものすべてにアクセスでき、私たち全員が満足できるユーザーになれるように構成されています。つまり、

[15:21 - 15:27]
MCPとは文字通りこれだけです。

[15:25 - 15:29]
アインシュタインの第5法則とか、そんな

[15:27 - 15:31]
クレイジーなものではなく、文字通り

[15:29 - 15:34]
LLMの標準であり、刺激的で、

[15:31 - 15:36]
ワクワクするものです。

[15:34 - 15:38]
ええ、これで説明がついたと思います。とりとめの

[15:38 - 15:42]
ない話をしてしまいました。申し訳ありません。いえいえ、まさに私が言いたかったことです。

[15:39 - 15:45]
最後に1つ質問します。MCPとは

[15:45 - 15:51]
何かが私にははっきりと分かりました。しかし、私の質問のずっと

[15:49 - 15:54]
前から、

[15:54 - 16:00]
例えばhttpsやSMTPなどのプロトコルが普及するたびに、

[16:06 - 16:11]
その上に多くの大企業が設立されてきました。 基本的に、

[16:08 - 16:15]
なぜ今、これが

[16:11 - 16:17]
機会の始まりなのか、という話です。

[16:15 - 16:20]
このポッドキャストを聞いている平均的な人は、

[16:17 - 16:23]
自分のアイデアを構築しています。これは、

[16:23 - 16:29]
その人にとって、あるいはあなたにとって、全く重要でしょうか？ええ、

[16:27 - 16:31]
それは素晴らしい質問だと思います。もし私が

[16:29 - 16:33]
そうなら、技術的な面と非技術的な面について話します。

[16:33 - 16:37]
技術的な人がここでできることはたくさんあります。

[16:37 - 16:41]
ただ、グレッグ、時間がないんです。私が考えていたことの一つは、

[16:38 - 16:42]
mCP App Storeのようなもので、

[16:41 - 16:45]
このアイデアは無料で提供します。

[16:42 - 16:46]
このポッドキャストはアイデアに関するものなので。

[16:45 - 16:50]
基本的に、mCPサーバーのリポジトリがたくさんあります。

[16:50 - 16:55]
誰かがそのサイトにアクセスできるとしたら素晴らしいと思います。

[16:52 - 16:58]
ドメインも購入しましたが、何も機能しません。

[16:55 - 17:01]
もう一度言いますが、誰かこの

[16:58 - 17:06]
アイデアを盗んでください。ドメインも購入しました。誰かがそのサイトにアクセス

[17:01 - 17:09]
できると素晴らしいと思います。

[17:06 - 17:10]
さまざまなmCPサーバーを見て、

[17:09 - 17:12]
GitHubコードなどを見て、

[17:10 - 17:14]
インストールやデプロイなどをクリックできます。

[17:12 - 17:16]
サーバーが

[17:14 - 17:18]
デプロイされ、特定のURLが提供されるので

[17:16 - 17:20]
、それを貼り付けることができます。  mCP

[17:18 - 17:22]
クライアントでそれを計算します。

[17:20 - 17:25]
技術者の方で、もしあなたが何百万ドルも稼いでいるなら、私がお願いしたいのは

[17:22 - 17:28]
ただ1000ドル送ってもらうことだけです。

[17:25 - 17:31]
しかし、技術者以外の方にとって私が

[17:28 - 17:34]
本当に重視するのは、

[17:34 - 17:39]
mCP機能を構築しているプラ​​ットフォームの最新情報を把握し、

[17:37 - 17:41]
標準がどこに向かっているかを確認することです。

[17:39 - 17:43]
あなたが言ったように、これらの

[17:41 - 17:46]
標準が最終決定されたとき、

[17:43 - 17:48]
mCPが完全に勝利したかどうかはわかりません。異議を唱える必要があると思います。あるいは、

[17:48 - 17:52]
Anthropicがアップデートを行うかどうかはわかりません。まだ

[17:49 - 17:55]
非常に早い段階ですが、

[17:55 - 17:59]
最終的な標準がどうなるかに非常に注意を払うことをお勧めします。

[17:57 - 18:03]
標準が最終決定され、

[17:59 - 18:05]
すべてのサービスプロバイダーが

[18:03 - 18:07]
mCPなどを構築し始めると、はるかにシームレスに、はるかに

[18:07 - 18:12]
簡単に統合できるようになります。

[18:10 - 18:14]
これが、

[18:12 - 18:17]
毎週新しいツールを備えた新しいチャットボットインターフェースが登場し

[18:14 - 18:20]
、それが勝利する理由です。この

[18:17 - 18:22]
部分のステップ2は簡単ではありません。

[18:20 - 18:25]
特に、それをまとまりのあるものにして、

[18:22 - 18:28]
速く動作させるのは簡単ではありません。2時間で座って

[18:25 - 18:30]
、次のようなものを作ることができます。 しかし、

[18:28 - 18:33]
ユーザーエクスペリエンスを構築し、

[18:30 - 18:36]
完璧なものにし、幻覚を最小限に抑えるのは

[18:33 - 18:40]
非常に困難です。これは

[18:36 - 18:43]
Tempoで私たちが行っている多くの作業ですが、これにより

[18:40 - 18:46]
統合がはるかに

[18:43 - 18:49]
容易になります。これは積み重ねることができるレゴのピースのように考えることができます。

[18:49 - 18:56]
賢明で

[18:52 - 18:58]
賢明なビジネスオーナーやスタートアップのアイデア

[18:56 - 19:01]
ポッドキャストを楽しんでいる皆さんには、ぜひ

[18:58 - 19:03]
注目していただきたいと思います。私

[19:01 - 19:06]
自身も、この

[19:03 - 19:09]
mCPの件で、

[19:09 - 19:13]
賢明なビジネス上の決定を下すための発砲が可能な段階にあるとは思っていません。ただ

[19:11 - 19:15]
座って見守り、

[19:13 - 19:17]
観察し、

[19:15 - 19:19]
学び、適切なタイミングで適切なことが

[19:17 - 19:21]
起こった時に成功する、という類のものです。ですから、

[19:21 - 19:25]
今のところ、

[19:23 - 19:27]
技術者以外の人にとっても、

[19:25 - 19:28]
技術者にとっても、明日オープンAIが

[19:27 - 19:31]
標準規格として登場し、私たち

[19:28 - 19:33]
全員がそれに移行することを想像してみてください。まだ

[19:31 - 19:35]
初期段階ですが、

[19:33 - 19:37]
これがどのように機能するかを理解することで、次の仕組みを理解し、

[19:35 - 19:40]
それが最終的に確定したときに、 すぐに

[19:40 - 19:46]
走り出すよ、アーメン。

[19:42 - 19:48]
ロス・マイク。ロス・マイク教授、

[19:46 - 19:50]
あなたのような人はいない。

[19:48 - 19:53]
番組ノートに彼の説明を載せておくから、AIコーディングの世界についての

[19:50 - 19:58]
より明確な説明をフォローしてね。それから、

[19:58 - 20:02]
数週間後にマイアミで会おう。

[20:00 - 20:03]
ありがとう。

[20:02 - 20:05]
すぐに飛行機の予約をするから、

[20:03 - 20:07]
絶対にね。すぐに会おう。みんなありがとう。

[20:07 - 20:15]
[音楽]

## コメント

### 1. @lucface (👍 499)
i watched 20 MCP videos. Love that this dude just made it make sense. Please ASK HIM FOR A MORE DEEPER DIVE!!

> **@Satheeshkumar-dv1uu** (👍 3): Who's this guy Where is the channel.   name?

> **@FinalForm-y6h** (👍 0): @@Satheeshkumar-dv1uu ras mic

> **@donkokuss** (👍 4): He did it: https://www.youtube.com/watch?v=uWZ-Yqj8nhw

> **@mas5867** (👍 3): "MORE DEEPER?"

> **@Jefferson-l5t** (👍 1): One of interesting cases of applying MCP is to connect voice ai like MiniMax or ElevenLabs to your call or your voice agent so it can automatically answer questions for you instead of just machine talking

### 2. @brownpaperbagyea (👍 165)
this guy is very good at explaining things in a non technical way

> **@javieraguirre9135** (👍 0): yep, he is

> **@KAWEEYTLITE** (👍 0): ❤nk❤❤

> **@inemanja** (👍 0): no... he explained almost nothing..

> **@brownpaperbagyea** (👍 0): @@inemanjayeah sorry my npc glitched out and I left this comment

> **@trultrulsen8802** (👍 0): He might be, but he does not use his skill here. All the information in this video is in the illustration, he added nothing.

### 3. @chemchampa (👍 137)
As someone also said, I've seen like 10 videos and this is the best breakdown! Especialy the part from 11:50 where Ras points out that the "MCP server is now in the hands of the service provider". No one else brings this up. This was the missing piece that clarified how it all works 💪

> **@sylerpetralie** (👍 1): REST as widely adopted industry standard with mature security and validation paradigm already provides this and works REMOTELY

> **@CCwithAIorginal** (👍 1): I use many self custom made mcp just serve up in docker it's really easy once you get the hang of it

> **@MaciekPiekarski** (👍 0): I don't think there's anything stopping you from creating MCP servers for services provided by other companies. You'll be a middle man that simplifies integrating them into agentic workflows, there's value in that too (I guess).

### 4. @HU5T1E (👍 48)
you really talked up this man’s explaining capabilities…he delivered on that praise. Good stuff

### 5. @amilost22-v2f (👍 17)
Ras Mic is better than all of my university lecturers when it comes to simplifying complex stuff. I am lucky to have come across this video.

### 6. @theflippedbit (👍 1)
Couldn't find a better explanation for this. The pedagogy is top notch. more from him please!!

### 7. @sunilbudke (👍 15)
He deserves to be called the "Professor." Great video. Thank you.

### 8. @CX3Productions (👍 29)
Ras “Stepping up to the” Mic has graced us with his presence! I don’t consider things real in tech till Greg brings on a guest… being Ras Mic just double co-signs this topic! 👍🏾💯😎

### 9. @fitzventure (👍 17)
That was best explanation I have found. I'm a software engineer and I think all of the non-techies trying to explain it is the problem. When a developer explains it,  it made way more sense.

### 10. @astrofolia4515 (👍 40)
Who is this guy!?

I haven't listened to someone that has instantly hooked me like this with his engagement and charisma
Great guest

### 11. @animeprofiles2077 (👍 13)
😂 Man I'm so glad I get to hear the first MCP explanation from Ras rather than some pseudo tech influencers

### 12. @JustinPruitt-v5s (👍 5)
This Ras Mic person is a natural teacher.. tried to find his linkedin but couldn't

### 13. @Sayfulloh_HRM (👍 21)
I just wanted to take a moment to express my sincere gratitude for the incredible content you create. Your YouTube videos and podcasts on startups, community-building, and entrepreneurship have been a game-changer for me. Each episode is filled with so much insight, practical advice, and a unique way of looking at things that makes me rethink my own approach to business and creativity.

Your words have inspired me to take action, to dream bigger, and to believe in the power of communities. I truly appreciate the effort and passion you put into sharing your knowledge with the world. It doesn’t go unnoticed, and it definitely makes an impact.

Thank you for being a source of motivation and wisdom. Wishing you continued success in all that you do!

Best regards, Sayfulloh

> **@GregIsenberg** (👍 0): ❤️❤️❤️

> **@PhilippJohn** (👍 1): If this is not a boosted bot comment idk what is...

### 14. @Phaethon569 (👍 8)
I saw 5 videos before coming to this one on MCP. By far the best explanation of why MCP is valuable

### 15. @theaiworkshopp (👍 0)
Greg, this is exactly what I needed! 🔥 You nailed it bringing Ross Mic on - his explanation of MCPs was absolutely perfect. I've been seeing MCP everywhere on X but all the threads were either too technical or too vague.

Ross's evolution breakdown was brilliant: Stage 1 (LLMs just predict text) → Stage 2 (LLMs + tools but it's a nightmare to integrate) → Stage 3 (MCPs as the unified translator layer). That 'My Big Fat Greek... Wedding' example made it instantly click!

The realization that we don't have Jarvis-level assistants yet because connecting multiple tools is an engineering nightmare - that's the kind of insight that makes everything make sense. And now I understand why Anthropic is playing 3D chess by making SERVICE PROVIDERS build the MCP servers instead of doing it themselves.

That MCP App Store idea Ross threw out for free is genius! The fact that he even bought the domain shows he's thinking like an entrepreneur, not just an engineer. Making it one-click to deploy MCP servers and get URLs for client integration? That's a million-dollar idea waiting for someone to execute.

I love how you kept it practical for non-technical folks too. The advice to 'sit, watch, observe, and strike when standards finalize' is exactly the kind of strategic thinking your audience needs. We're clearly in the early stages, but understanding the fundamentals now means we'll be ready when the real opportunities emerge.

This is why I follow your content - you don't just chase trends, you bring in the RIGHT people to explain WHY something matters and WHEN to act on it. Ross's point about waiting for standards to finalize before making business moves is so smart.

Already bookmarked this for my team. When MCPs (or whatever wins the standards war) fully mature, we'll have the foundational knowledge to build on top of it. Thanks for making complex tech actually understandable!

### 16. @rogue_KC (👍 49)
I could listen to that guy explain anything.

> **@chezdiogenes** (👍 3): Honestly. He has a calling to be a teacher. Absolute natural.

> **@jackstrawful** (👍 0): To think, soon we may be able to do just that - Ras Mic could deploy an avatar of himself that would answer questions as he would and we could all have our own instances of Ras Mic at hand to ask for explanations of anything and everything we wish.

### 17. @hank7v (👍 0)
Amazingly crystal clear intro to the MCP concept. Thanks!

### 18. @MohammedNawaz-nw5kv (👍 0)
This is the first video I'm watching and honestly I love every bit of it. Kudos to greg and professor Ras. Thank you ❤

### 19. @JustSturgis (👍 2)
Brilliant episode!! I've seen a ton of different explanations and even some really good fairly clear versions, but Ras blows them all out of the water! This was so methodical and logical and plain spoken and clear. Simply awesome! Thank you Ras and Greg for bringing him on and sharing this with all of us!

### 20. @ronin4518 (👍 11)
I could listen to him speak all day, brilliant explanation even for a technical person

> **@GregIsenberg** (👍 0): 100%

