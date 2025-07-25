# Bolt.new Tutorial for Beginners (the Cursor AI and V0 Killer)

**チャンネル:** Greg Isenberg
**公開日:** 2024-10-08
**URL:** https://www.youtube.com/watch?v=lDMhK8DamuE

## 説明

In this episode, I am joined by Ras Mic, a full stack engineer & YouTuber, where we dive deep into the frameworks and strategies on how to best use Bolt. Mike shares his unique insights into how to use and set up Bolt to make the experience of building on top of Bolt as easy and seamless as possible. Learn how to use Bolt like a pro!

Episode Timestamps:
0:00 Intro
02:34 Building with Bolt: A Real-Time Test
10:58 Implementing Text Generation Functionality
15:48 Testing Image Generation with Prompts
16:57 Deployment Process with Netlify
19:07 Bolt vs. Other AI Coding Tools
26:31 Advice for non-technical builders 
29:04 Advice for developers

1) What is Bolt?
• A culmination of various AI coding tools in one platform
• Recently launched, showing immense potential
• Suitable for both developers and non-developers
• Some bugs, but expected to improve rapidly

2) Building with Bolt: A Real-Time Test
• Created a text-to-image AI app using [Fowl.ai](http://fowl.ai/) API
• Built a Next.js project with a simple landing page
• Implemented image generation functionality
• Encountered and resolved various errors through prompts

3) Bolt vs. Other AI Coding Tools
• Slower than some competitors due to online nature
• More comprehensive than v0 (owned by Vercel)
• Handles package installation automatically
• Provides a full project structure, not just single files

4) Key Features of Bolt
• Uses Next.js 14 best practices by default
• Integrates with Netlify for one-click deployment
• Allows for easy error resolution through prompting
• Generates full-stack applications with minimal input

5) Ideal Use Cases for Bolt
• Quick prototyping and visualization of app ideas
• Non-technical founders building startup MVPs
• Builders looking for instant results without coding knowledge
• Creating simple Proof of Concepts (POCs)

6) Limitations and Areas for Improvement
• Deployment process can be finicky with external packages
• Some redundant code and unused dependencies
• Error handling during deployment needs refinement
• No option to download codebase for external editing

7) Bolt vs. Cursor: Which to Choose?
• Bolt: Better for non-technical users and quick prototyping
• Cursor: Preferred by those who enjoy coding with AI assistance
• Bolt takes the wheel, Cursor lets you stay in charge
• Choice depends on your technical skills and project goals

8) The Future of AI Coding Tools
• Expect rapid improvements in coming weeks/months
• Potential for integration with other development platforms
• May revolutionize how non-technical people approach app building
• Could significantly speed up the prototyping process for developers

9) Key Takeaway
• Keep exploring and playing with new AI tools. The more you learn now, the better positioned you'll be when these technologies mature.
• Stay curious, keep building! 

Want more free ideas? I collect the best ideas from the pod and give them to you for free in a database. Most of them cost $0 to start (my fav)

Get access: https://www.gregisenberg.com/30startupideas 

🎯 To build your own portfolio businesses powered by community you might enjoy my membership.

You'll get my full course with all my secrets on building businesses, peer-groups to keep you accountable, business ideas every single month and more!

Spots are limited.

https://www.communityempire.co/

📬 Join my free newsletter to get weekly startup insights for free:

https://www.gregisenberg.com/

70,000+ people are already subscribed.

To improve your rankings your business on Google and using AI for SEO, sign up to

http://boringmarketing.com/

FIND ME ON SOCIAL

X/Twitter: https://twitter.com/gregisenberg
Instagram: https://instagram.com/gregisenberg/
LinkedIn: https://www.linkedin.com/in/gisenberg/

FIND MIC ON SOCIAL

X/Twitter: https://x.com/rasmickyy
Youtube: https://www.youtube.com/@rasmic

## 字幕

[00:00 - 00:05]
人々はボルトという新しい

[00:02 - 00:08]
ツールがカーソルAIに取って代わると言っています。彼らはより

[00:05 - 00:11]
簡単だと言っています。

[00:08 - 00:13]
技術者でない人でもこれを使って

[00:11 - 00:17]
20分かそれ以下でプロトタイプを作成できると言っています。

[00:13 - 00:20]
カーソルAIよりも簡単です。

[00:17 - 00:23]
それでは詳しく見ていきましょう。私は私のメインマンであるロス・マイクをPodに招きました。

[00:20 - 00:24]
彼は物事をとても簡単に説明します。

[00:36 - 00:42]
ええと、自分のアイデアを実現したい人なら誰でもこのPodはあなたのためのものです。[音楽] さあ、歴史を作りましょう。

[00:39 - 00:46]
ロス・マイク・ミッキー・マイケルが番組に戻ってきました。

[00:42 - 00:50]
彼はボルトについて話すためにここにいます。

[00:46 - 00:54]
彼らはボルトがカーソルキラーだと言っています。彼らは

[00:50 - 00:56]
VZゼロキラーだと言っています。

[00:56 - 01:01]
ええと、人々がこのビデオを

[00:58 - 01:02]
最後まで見たら、何を得られるでしょうか？ええと、もう一度よく考えてみてください。まず

[01:01 - 01:04]
第一に、

[01:02 - 01:05]
私をここに招待してくれてありがとう。いつも光栄ですし、決して当たり前の

[01:08 - 01:14]
こととは思いたくありません。グレッグ、本当にありがとう。しかし、ボルトZの新しいボルトは、

[01:16 - 01:22]
人々が使ってきたさまざまなツールの集大成のように見えると思います。 全てが

[01:18 - 01:24]
一つにまとまっています。まだ初期段階で、

[01:22 - 01:26]
つい数日前にリリースされたばかりですが、

[01:26 - 01:30]
開発者であろうとそうでなかろうと、このツールの

[01:28 - 01:32]
可能性を否定することはできません。いくつか問題や

[01:30 - 01:35]
バグが発生していますが、リリース

[01:32 - 01:38]
されたばかりで、

[01:35 - 01:40]
最初の数回のプレイや試行錯誤からして、これは

[01:38 - 01:42]
驚くべきもので、実際に何かを作ってみること以上にテストする良い方法はないと思います。その通りだと思います。

[01:45 - 01:49]
そして、そのプロセスを通して、

[01:46 - 01:49]
人々は学び、メモを取ることができます。

[01:53 - 01:57]
正直なところ、私の話を聞いている間に何をしてほしいのか分かりませんが、

[01:55 - 01:59]
ただ、

[01:57 - 02:01]
これらのツールを遊び続けるための励みになればと思っています。

[01:59 - 02:03]
どれも完璧だと自信を持って言えるわけではありませんが、

[02:01 - 02:05]
いつか完璧になるか、本当に本当に本当に本当に

[02:05 - 02:10]
良いものになるでしょう。そして、テスト、

[02:08 - 02:12]
反復、

[02:10 - 02:14]
プレイ、破壊的学習を続けるための基盤を築いてきました。

[02:12 - 02:15]
本当に良いものになった時には、

[02:14 - 02:17]
ゼロから始めるのではなく、すでに

[02:15 - 02:20]
この知識を持っているので、

[02:17 - 02:22]
すぐに構築して出荷できるようになります。

[02:20 - 02:24]
それが私の目標です。これで、

[02:22 - 02:26]
仕事が終わった後に夜遅くまで番組を見るのではなく、

[02:24 - 02:29]
Bolt

[02:26 - 02:31]
や他の AI ツールを使っているだけでゲームをプレイする

[02:29 - 02:34]
ようになるなら、それは成功です。それでは画面を共有します。

[02:34 - 02:39]
前置きとして、特にプロジェクトを

[02:36 - 02:43]
計画しているわけではないのですが、

[02:39 - 02:45]
うーん、foul という会社があることを考えていました。

[02:43 - 02:50]
基本的に彼らは

[02:45 - 02:53]
様々な

[02:50 - 02:57]
画像AIモデルを集約し、シンプルなAPIに変換しています。

[02:53 - 03:01]
例えば、

[02:57 - 03:05]
Fluxのようなシンプルなテキストから画像へのAIモデルです。

[03:01 - 03:06]
これをクリックすると、

[03:05 - 03:07]
これらのモデルを

[03:07 - 03:15]
APIでラップし、この

[03:11 - 03:16]
コード1つでAIモデルにアクセスできるようにします。なぜか動作しません。

[03:16 - 03:21]
いいえ、動作します。これを

[03:18 - 03:23]
クリックして実行します。これは画像

[03:21 - 03:26]
モデルで、プロンプトは非常にクローズアップされています。

[03:23 - 03:27]
単一のタイガーアイダイレクトなどなど。

[03:26 - 03:31]
これで、

[03:27 - 03:32]
何か違うことをしてみましょう。2人の男が

[03:34 - 03:42]
仮想的にポッドキャストでAIについて話しています。どうなるか見てみましょう。何もおか

[03:38 - 03:46]
しくないことを願います。ええ、

[03:42 - 03:49]
怖いですね。わかりますよね。

[03:46 - 03:51]
かなり良いです。それで、私たちは

[03:51 - 03:57]
彼らのAPIを使用して、テキストプロンプトを入力できるWebサイトを構築します。

[03:57 - 04:00]
画像です。Boltを

[04:00 - 04:04]
全力で使います。いかが

[04:02 - 04:07]
でしょうか？いいですね、それでいいでしょうか？

[04:07 - 04:12]
完璧にやりましょう。さて、

[04:08 - 04:13]
Boltから始めます。

[04:12 - 04:15]
このプロジェクトでは

[04:15 - 04:22]
NextJSを使うのがベストだとわかっています。そこで、NextJSを使って

[04:19 - 04:27]
シンプルなSASプロジェクトを構築したいと思います。

[04:31 - 04:42]
シンプルなランディングページを作成してください。NextJS14の

[04:37 - 04:45]
ベストプラクティスに従ってください。v0について

[04:42 - 04:47]
ですが、

[04:45 - 04:50]
前回のVIビデオで

[04:47 - 04:51]
お話ししたように、v0はNextJSのメンテナーの1つであるVerselが所有しています。v0を

[04:51 - 04:57]
使用すると、デフォルトで

[04:55 - 05:00]
NextJS Boltが使用されます。

[04:57 - 05:03]
一方、Verselは所有していません。

[05:00 - 05:07]
両方で

[05:03 - 05:09]
NextJSを使用することを指定しました。

[05:07 - 05:11]
使い慣れているフレームワークであり、Webアプリケーションを構築するための

[05:09 - 05:14]
最も人気のあるフレームワークの1つだからです。

[05:14 - 05:19]
プロンプトをクリックして

[05:16 - 05:21]
Boltの良いところは、単一のファイルのコードを取得するだけでなく、

[05:21 - 05:25]
プロジェクト、レイアウト、

[05:23 - 05:27]
ランディングページを構築し、

[05:25 - 05:30]
パッケージをインストールしてくれることです。

[05:30 - 05:33]
フレームワークやコードベースを構築する際には、

[05:33 - 05:38]
様々な

[05:36 - 05:40]
機能を実行するために外部パッケージが必要になることがありますが、Boltはそれらのパッケージを自動的にインストールしてくれます。

[05:38 - 05:42]
これは素晴らしいことです。

[05:40 - 05:45]
このランディングページは

[05:42 - 05:47]
スターターベースとして非常に優れているので、

[05:45 - 05:48]
ランディングページが完成しました。これから行うことは、

[05:48 - 05:54]
Fluxにアクセスし、使用するAIモデルを選択することです。

[05:54 - 05:58]
ドキュメントをスクロールすると、いくつか指示があります。

[05:58 - 06:03]
まずAPIを呼び出し、

[06:00 - 06:06]
このパッケージをインストールし、

[06:03 - 06:09]
APIキーを取得し、このコードを使用する必要があると書かれています。

[06:06 - 06:10]
そして、さらに詳しい

[06:09 - 06:13]
手順が書かれています。

[06:10 - 06:16]
指示に従って、この

[06:16 - 06:21]
パッケージをインストールします。つまり、

[06:19 - 06:24]
これは私の開発者の考えです。

[06:21 - 06:30]
そんなことすらしたくない。

[06:24 - 06:32]
テキストを画像に変換する AI アプリケーションを構築したい。

[06:35 - 06:43]
ファイルを使用するつもりだ。

[06:38 - 06:46]
えっと、どう

[06:43 - 06:48]
すればいいですか？これを通知したい理由は、

[06:46 - 06:50]
以前にFileDotを使ったことがあるので

[06:48 - 06:51]
仕組みはわかっているし、

[06:50 - 06:53]
チートをしてコードをコピーして

[06:51 - 06:55]
開発者のようにやりたくもないからです。Aモデルを使いたいので、

[06:53 - 06:58]
どうなるか見てみましょう。

[06:55 - 07:00]
誰にも言わないでください。でも、何

[07:00 - 07:07]
百万ドルも稼げるスタートアップのアイデアが30以上あって、

[07:04 - 07:11]
無料で提供しています。これらは単なる

[07:07 - 07:14]
推測ではなく、検証済みのものです。1

[07:11 - 07:17]
億ドル以上のビジネスを築いた起業家のアイデアです。

[07:22 - 07:28]
ポッドキャストで何百回も行った会話から1つのシンプルなデータベースにまとめました。

[07:26 - 07:32]
重要なのは、これらのアイデアのほとんどは

[07:28 - 07:35]
投資家を必要とせず、中には

[07:32 - 07:37]
始めるのに費用がかからないものもあります。要するに、

[07:35 - 07:38]
チートシートをお渡ししているということです。アイデアバンクは

[07:37 - 07:42]
スタートアップの

[07:38 - 07:45]
ショートカットです。以下をクリックして

[07:42 - 07:46]
アクセスしてください。次のキャッシュフローを生み出すビジネスが

[07:46 - 07:52]
あなたを待っています。ええと、バグがあって、

[07:49 - 07:53]
時々これが発生します。もう一度送信ボタンを押すだけです。

[07:52 - 07:57]
かなり速いです。

[07:53 - 08:00]
ええ、

[07:57 - 08:03]
最初のイテレーションとしては素晴らしいですね。

[08:00 - 08:05]
覚えている v0 が最初にリリースされたときは

[08:03 - 08:07]
かなりひどいものでした。

[08:05 - 08:11]
開発者なら誰でも

[08:07 - 08:14]
使っていると思いますが、ひどいものでした。でも、

[08:11 - 08:16]
2、3 か月経った今、

[08:14 - 08:18]
最高のものの 1 つになっています。Bolt も同じで、

[08:16 - 08:21]
これが最初のバージョンであるにもかかわらず素晴らしいことは

[08:21 - 08:27]
間違いありません。それでは、何が起こったのか見てみましょう。package.json が

[08:23 - 08:29]
更新され、

[08:27 - 08:33]
何かが作成されたと表示されます。プレビューを見てみましょう。

[08:33 - 08:40]
ここで更新して、何が起こったのか見てみましょう。

[08:37 - 08:43]
画面を下げます。

[08:40 - 08:44]
コードに進みます。まだパッケージをダウンロード中です。Bolt

[08:43 - 08:48]
について 1 つ言えることは、

[08:44 - 08:50]
すべてがオンラインであるため、

[08:48 - 08:52]
少し遅いので、もう少し辛抱する必要があります。

[08:55 - 09:00]
プレビューを見てみましょう。更新します。わかり

[09:00 - 09:05]
ました。

[09:02 - 09:08]
壊れました。わかりました。なぜ壊れたのかはわかっていますが、

[09:05 - 09:14]
AI が自動的に修正してくれると嬉しいです。

[09:08 - 09:18]
何も表示されません。修正してください。わかり

[09:14 - 09:20]
ました。この問題が発生しますが、

[09:18 - 09:22]
これは自動的に

[09:20 - 09:23]
修正されるはずだと既に通知しています。どうなるか見てみましょう。Bolt

[09:23 - 09:28]
について 1 つ

[09:25 - 09:32]
言えることは グレッグ：少し遅いですね。それが

[09:28 - 09:34]
唯一の問題ですが、うーん、私の意見では、

[09:32 - 09:36]
それは問題にならないと思います。

[09:34 - 09:38]
この製品が素晴らしいので、

[09:36 - 09:39]
資金があるのか​​、あるいは調達されるのかはわかりませんが、

[09:38 - 09:41]
おそらく大規模なサーバーで資金が調達されるでしょう。

[09:42 - 09:46]
正直言って、今試している人がたくさんいるような気がします。

[09:44 - 09:49]
ええ、それもそうですし、ええ、ええ、わかり

[09:49 - 09:53]
ました。それで、このエラーが発生しました。これから

[09:52 - 09:58]
やることは、

[09:53 - 10:02]
これをコピーして、これがエラーですと言うことです。

[10:02 - 10:06]
今すぐ修正してください。修正方法はわかっていますが、

[10:04 - 10:09]
AIモデルに修正してもらいたいです。いざというときに修正されない場合は、私が修正します。

[10:09 - 10:13]
ええ、こんなに多くの人が使っているのに、

[10:11 - 10:15]
こんなに遅いなんて、なんてことだ、覚えているでしょう？

[10:15 - 10:21]
カーソルが最初はとても遅かったのを覚えていますか？ええ、

[10:19 - 10:25]
そして彼らは6000万ドルの資金を投入して

[10:21 - 10:25]
突然速くなりました。だから、

[10:25 - 10:31]
ボルトはそれを

[10:28 - 10:31]
待っているのかもしれません。ええ、

[10:31 - 10:37]
これで修正されるかどうか見てみましょう。

[10:37 - 10:43]
コードが実行されています。完璧です。問題は修正されました。

[10:40 - 10:45]
少しバグがあり、少し不安定ですが、表示されている

[10:43 - 10:47]
エラーをコピーして、これが私が受け取った

[10:45 - 10:50]
エラーですと伝えると、

[10:47 - 10:52]
修正してくださいと表示されます。うまくいったように見えます。

[10:50 - 10:56]
次に、ランダムに

[10:52 - 10:59]
何かを入力します。

[10:56 - 11:01]
ハンサムな男性です。生成をクリックしても何も

[10:59 - 11:03]
起こりません。何も

[11:01 - 11:05]
起こらないはずなので。レイアウトがあるだけです。次に、

[11:14 - 11:19]
fou を使用してテキスト生成を機能させるにはどうすればよいかを

[11:17 - 11:22]
説明します。

[11:19 - 11:24]
外部 API キーが必要なので、何をする必要があるかを教えてほしいということです。つまり、

[11:24 - 11:28]
テキスト生成

[11:26 - 11:30]
機能を実装しましょう、ということです。そのためには、ファイルをセットアップする必要があります

[11:28 - 11:33]
。 クライアントは、ユーザー入力用のフォームを作成し

[11:30 - 11:36]
、画像生成

[11:33 - 11:37]
プロセスを処理します。これがその方法です。Pro では、

[11:36 - 11:40]
何をするのかをステップ バイ ステップで提供しており、

[11:37 - 11:42]
API を確認すると、

[11:40 - 11:45]
クライアントをインストールすると書かれています。これは

[11:42 - 11:48]
まさに Bolt が

[11:45 - 11:50]
現在行っていることです。ここでは、

[11:48 - 11:53]
次の変更を行ったことが示されています。何を

[11:50 - 11:55]
したかが示されていますが、必要な作業は次のとおりです。

[11:53 - 11:59]
これを機能させるには、ファイルの

[11:55 - 12:03]
EnV ローカルのファイル キーを

[11:59 - 12:05]
実際の API キーに置き換える必要があります。コードを確認すると、

[12:05 - 12:11]
EnV というファイルと、環境の略である Vis があることがわかります

[12:08 - 12:13]
。 ローカルなので、

[12:11 - 12:16]
コードベースにアクセスすると、ここにファイルがあることがわかります。

[12:16 - 12:21]
ここにあるキー、つまりファイルキーは、

[12:19 - 12:23]
fouから取得したキーである必要があります。

[12:21 - 12:26]
基本的には、

[12:23 - 12:29]
自分のプロフィールにアクセスしてそのキーを取得します。

[12:26 - 12:30]
これをここに移動して、キーを

[12:29 - 12:33]
すぐに取得します。ライブアカウントを使用しているため、誰にも見られ

[12:30 - 12:35]
ないようにします。

[12:33 - 12:36]
この画面を共有しても構いません。APIキーの取得方法をご覧になっている方のために、

[12:36 - 12:42]
APIキーを

[12:39 - 12:43]
作成しました。ここに貼り付けます。

[12:42 - 12:45]
表示されますが、

[12:43 - 12:48]
削除します。スパムしようとする人は削除して

[12:45 - 12:50]
ください。保存します。

[12:48 - 12:51]
必要な手順が表示されます。

[12:50 - 12:56]
また、

[12:51 - 12:58]
最新バージョンのFile AI Server Clientを使用していることを確認してください。

[12:56 - 13:00]
この

[12:58 - 13:02]
コマンドを自分で実行することもできますが、すでに

[13:00 - 13:04]
実行されていると思うので、実行しません。

[13:04 - 13:08]
ちょっと更新して、これが動くか見てみましょう。

[13:08 - 13:16]
未来都市

[13:11 - 13:19]
とチックフィレA。なぜそんなことをするのか分かりませんが、

[13:19 - 13:25]
画像生成中にエラーが発生しましたと出ています。

[13:21 - 13:28]
ターミナルに行って、基本的に

[13:25 - 13:31]
やることは、ここに

[13:28 - 13:33]
表示されたエラーをコピーします。私は

[13:33 - 13:36]
開発者ではないので何が起こっているのか分かりません。だから

[13:34 - 13:39]
このエラーを貼り付けて、「

[13:36 - 13:41]
これを修正してください」と言います。問題は分かっています

[13:39 - 13:43]
が、もし壊れた場合に試せるワークフローを提供したいのです。

[13:43 - 13:47]
例えば、ここでエラーが出たら、

[13:45 - 13:50]
コードを開いて、

[13:47 - 13:52]
ここに表示されたジャンクテキストを見て、それをここにコピー＆ペーストして、「

[13:50 - 13:53]
動作していません」と表示し、

[13:53 - 13:59]
修正プログラムを表示します。それでは、よし、見てみましょう。

[13:58 - 14:01]
よし、見てみましょう。「

[14:01 - 14:07]
プレビュー」と出て、未来都市と

[14:04 - 14:09]
チックフィレA。これがプロンプトになります。

[14:07 - 14:11]
チックフィレAが

[14:09 - 14:13]
ここに表示されます。それで、見てみましょう。

[14:11 - 14:16]
高度な設定ですね。では、何らかの理由でこれが

[14:13 - 14:18]
また壊れてしまいました。原因を

[14:16 - 14:20]
見てみましょう。

[14:20 - 14:26]
これからやることは、

[14:23 - 14:29]
GREの修正方法はわかっていますが、

[14:26 - 14:32]
十分な

[14:29 - 14:34]
粘り強さで対処して続ければ

[14:32 - 14:37]
問題ないということを皆さんにお見せしたいのです。もう一度貼り付けて

[14:34 - 14:39]
エラーを取得できるようにします。

[14:37 - 14:41]
[音楽]が

[14:39 - 14:43]
失敗し、その後失敗しました。これからやることは、

[14:46 - 14:53]
ここに表示されているこの赤いエラーをすべてコピーして

[14:49 - 14:55]
ここに貼り付け、「このエラーを修正」と表示することです。

[14:53 - 14:58]
また、ファウルになったときにもやります。

[14:58 - 15:04]
モデル自体に移動したときのことを覚えているでしょうか。これはモデル自体です

[15:01 - 15:06]
。APIをクリックすると、

[15:04 - 15:08]
コードスニペットが表示されました。

[15:08 - 15:16]
そこで、このエラーを修正します。これは

[15:12 - 15:18]
ファイルドキュメントからの例です。AIが

[15:16 - 15:20]
常にすべてを知っているとは限らないからです。

[15:18 - 15:22]
ここからは、

[15:20 - 15:24]
すぐにBoltに飛び込むのは分かっていますが、

[15:22 - 15:27]
実際のアプリケーションを構築する場合は、

[15:24 - 15:29]
まず必要なもの、

[15:27 - 15:31]
動作方法、動作について調査する必要があります。 セットアップはこんな

[15:29 - 15:33]
感じですが、ここではただ

[15:31 - 15:35]
楽しく両方を見せようとしているので、

[15:33 - 15:38]
ファウルについて十分な調査をして、

[15:35 - 15:39]
仕組みや必要なもの、不要なものなどを把握しておきます。

[15:38 - 15:42]
そしてその情報を

[15:39 - 15:44]
AIモデルに渡せば、

[15:42 - 15:46]
今のような間違いは起こさないはずです。

[15:44 - 15:48]
今回はうまくいくといいですね。うまくいきました。うまくいきました。うまくいくとは

[15:48 - 15:54]
思っていませんでした。うまくいきました。

[15:54 - 15:58]
チックフィレは見当たりません。ええ、待って、待って、チックフィレは見当たりません。

[15:58 - 16:03]
チックフィレも見当たりません。

[15:59 - 16:05]
現代のチックフィレも見当たりません。チックフィレ、私の

[16:03 - 16:07]
綴りは合っていますか？

[16:05 - 16:09]
待って、それは私の言いたいことではありません。

[16:09 - 16:18]
ダッシュのようなものを入れる必要があるかもしれません。そうしましょう。

[16:12 - 16:18]
現代のチックフィレは20567です。わかりました。

[16:30 - 16:34]
正直言って、

[16:34 - 16:39]
この画像はひどいですが、ワークフローの観点からは悪くないと

[16:37 - 16:41]
思います。グレッグ、

[16:39 - 16:43]
ご覧のとおり、

[16:41 - 16:46]
ご存知の通り、チームが

[16:43 - 16:48]
修正に取り組んでいるバグがいくつかありますが、ほとんどの

[16:46 - 16:49]
場合、GD があれば、ただ

[16:48 - 16:52]
押し続けて

[16:49 - 16:54]
修正するように指示するだけで済みます。私たちはこれを

[16:52 - 16:59]
20

[16:54 - 17:01]
分もかからずに完了しました。すごいですよね。そしてこれが素晴らしいのは、そして

[16:59 - 17:05]
私が気に入っているのは、

[17:01 - 17:08]
ボルトと呼んでいるものです。

[17:05 - 17:11]
ここで「デプロイ」をクリックできます

[17:11 - 17:15]
。Netlify というプラットフォームと提携しており、文字通りワンクリックで

[17:13 - 17:17]
デプロイできます。デプロイボタンをクリックするだけで、

[17:17 - 17:21]
アプリケーションがビルドされ、デプロイ前に

[17:18 - 17:23]
エラーや修正が必要な問題がないか確認されます。

[17:21 - 17:26]
そして

[17:23 - 17:28]
ビルドが完了すると、つまり

[17:26 - 17:30]
コードがコンパイルされ、ビルドが問題なく完了し、

[17:28 - 17:32]
アプリケーションが

[17:30 - 17:35]
本番環境の準備が整うと、Netlify にデプロイされ、

[17:35 - 17:41]
共有できる URL が提供されます。さあ、nlii を使ってみましょう。

[17:39 - 17:44]
これは素晴らしい、非常に信頼性が高いです。

[17:41 - 17:47]
ただのおもちゃではなく、最高のツールの 1 つです。

[17:49 - 17:53]
5台のサーバーがあるので、

[17:51 - 17:55]
ここにエラーがあります。

[17:53 - 17:56]
この問題を修正することにします。何が

[17:55 - 17:59]
問題なのかもわからないし、

[17:56 - 18:02]
見たいとも思わないからです。NetFiは

[17:59 - 18:06]
優れたデプロイメントプラットフォームです。

[18:02 - 18:09]
サイトを見れば、

[18:06 - 18:11]
NetFiがかなり充実していることがわかります。Netflixは

[18:09 - 18:14]
見ませんよ。NetFiを

[18:11 - 18:17]
使っている大企業もあります。

[18:14 - 18:20]
つまり、両者にとって素晴らしいパートナーシップです。それで、

[18:20 - 18:26]
また失敗しました。素晴らしいですね。理由を見てみましょう。

[18:30 - 18:38]
ビルドが

[18:34 - 18:40]
失敗し続けます。修正してください。

[18:38 - 18:43]
コードタブでエラーがないか確認しましょう。

[18:46 - 18:51]
エラーの内容はわかっていますが、ズルは

[18:49 - 18:52]
しません。

[18:52 - 18:57]
これをコピーしてここに貼り付けます。これがエラーです。

[18:59 - 19:05]
貼り付けて、

[19:02 - 19:07]
修正されるかどうか確認しましょう。見落としをお詫びします。

[19:05 - 19:10]
素晴らしい

[19:07 - 19:13]
モデルです。

[19:10 - 19:17]
カーソル派ですか？ボルト派ですか？ええと、私は今でもカーソル派です。

[19:19 - 19:26]
プログラミングが好きで、コーディングも好きなので。こういうのはちょっと

[19:22 - 19:28]
面白みに欠けるかもしれませんが、

[19:26 - 19:31]
ボルトは簡単なプロトタイプ作成にはいいと思います。例えば、

[19:31 - 19:38]
アプリを開発していて、動作を視覚化するために簡単な

[19:35 - 19:39]
プロトタイプが必要なら、ボルトを使ってすぐに

[19:39 - 19:44]
エンジニアリングするでしょう。私が

[19:44 - 19:48]
個人的にカーソル派だと思う理由は、

[19:46 - 19:53]
コーディングができるからです。でも、私にはジュニアエンジニアもいます。

[19:48 - 19:55]
ボルトとリペットは、

[19:55 - 20:02]
カーソルを使って舵を取っているように見えます。あなたが

[19:58 - 20:03]
まだ主導権を握っているようなものです。そして、

[20:02 - 20:05]
これらは2つの異なるツールです。

[20:03 - 20:08]
ボルトとリペットは

[20:05 - 20:12]
スペクトルの片側にあり、

[20:08 - 20:14]
カーソルとv0は反対側にあります。

[20:12 - 20:16]
どんなエラーが出ているのか見てみましょう。

[20:16 - 20:23]
モジュールが見つからないという別のエラーが出ているので、

[20:17 - 20:26]
これをコピーしてこうします。 このエラーを修正するには、

[20:26 - 20:32]
何を探しているかによって

[20:29 - 20:34]
100%異なると思います。

[20:32 - 20:37]
もし私が技術者ではない

[20:34 - 20:40]
人、つまり

[20:37 - 20:41]
スタートアップを始めたい創業者、あるいは

[20:40 - 20:46]
ただのビルダーやビジネスマンだったら、

[20:41 - 20:50]
BoltとReplitに重点を置くでしょう。もっと細かいことを知り

[20:46 - 20:52]
たい人なら、

[20:52 - 20:57]
カーソルを右に動かすのも良いでしょう。ただ、

[20:55 - 21:00]
インスタントプロトタイプを作成したい人、例えば

[21:00 - 21:04]
簡単なPOCを作成したい人なら、

[21:02 - 21:06]
BoltとReplitは最適です。しかし、本当に

[21:08 - 21:15]
ユーザーに使ってほしいものを作りたいのであれば、実際に

[21:11 - 21:19]
手を動かす必要があります。それでは、それがうまくいくかどうか見てみましょう。

[21:15 - 21:21]
はい、それは続いています。

[21:19 - 21:23]
今は型の問題が発生しています。

[21:21 - 21:26]
ここでもう一度、

[21:23 - 21:27]
Bチームが改善する必要がある部分なので、

[21:26 - 21:29]
修正するだけにします。 この

[21:27 - 21:30]
問題です

[21:29 - 21:33]
が、特に非技術者の方に言いたいことが1つあります。

[21:33 - 21:38]
もし私が非技術者だったら、

[21:38 - 21:42]
何かをデプロイする方法を考えるよりも、これに対処するほうがいいと思います。だから、

[21:42 - 21:46]
非技術者にとっては、repetとboltの方が明らかに優れていると思います。私の意見では、

[21:46 - 21:51]
このように失敗すると、もう一度入力する必要があります。

[21:51 - 21:55]
カーソルを使って

[21:53 - 21:59]
何かを構築できるのに対し、repetとboltはend-to-endを正しく処理するからです。しかし、デプロイは

[21:55 - 22:01]
全く別の話です。では、これで

[22:07 - 22:13]
問題が解決したかどうか見てみましょう。とても不安になります。問題は

[22:13 - 22:16]
わかっていて

[22:16 - 22:23]
自分でも解決できるのに、どうか正しく実行してほしいと思っています。信じています。信じています。

[22:20 - 22:25]
ありがとうございます。ああ、また壊れてしまいました。

[22:23 - 22:30]
今回は何ですか、

[22:25 - 22:30]
ドクターオフ。わかりました。

[22:31 - 22:38]
文字通り1行で修正できます。やってみます。では、

[22:38 - 22:42]
妥当性をチェックしてみましょう。

[22:40 - 22:45]
それでは、少し学習してみましょう。型エラーです。

[22:42 - 22:47]
モジュールVまたは対応する型

[22:45 - 22:50]
宣言が見つかりません。次にimport drawerと表示され、

[22:47 - 22:54]
次にVAが表示されます。基本的に

[22:50 - 22:56]
これは、うーん、  V が見つかりません。V は

[22:54 - 23:00]
このファイルに使用されています

[22:56 - 23:02]
が、コードベースを確認すると、

[23:00 - 23:06]
このコードベースをもう一度実行してみましょう。コードベースを確認すると、

[23:09 - 23:14]
読み込みに少し時間がかかります。コードベースを確認すると、

[23:12 - 23:17]
ドロワーは必要ないので、

[23:14 - 23:23]
そのファイルが存在する理由もわかりません。ここで

[23:17 - 23:23]
言うのは、これをコピーすることです。

[23:23 - 23:30]
ええと、これをここにコピーします。

[23:30 - 23:38]
このエラーが発生し続けます。

[23:40 - 23:50]
ドロワーを使用していないようです。ドロワーを削除し、

[23:45 - 23:53]
使用していない他のファイルやフォルダーを削除して、

[23:50 - 23:55]
このビルドを実行します。

[23:53 - 23:57]
これは、Twitter で

[23:55 - 23:59]
いくつかの反応を得たところです。人々は、

[23:57 - 24:01]
ああ、でもこれはバグがあるようです。これは

[23:59 - 24:04]
3 番目です。これは、

[24:01 - 24:06]
展開するときに、

[24:04 - 24:07]
すべての

[24:06 - 24:10]
パッケージとすべてのファイルが

[24:07 - 24:14]
適切であることを確認する必要があるため、展開時にバグが発生することです。しかし、

[24:10 - 24:16]
これらの企業の構築と

[24:14 - 24:18]
成長の方法が Bol の今後の方向性を示すものである場合、

[24:18 - 24:21]
この問題は今後 1 週間以内に

[24:23 - 24:30]
解決されるはずです。よし、ビルドします。

[24:26 - 24:32]
17回目はうまくいく、

[24:30 - 24:34]
大丈夫、これは本物だ、良いところも悪いところも

[24:34 - 24:39]
すべて100%共有しているから大丈夫、だから

[24:37 - 24:43]
ズルをして

[24:39 - 24:46]
自分で作ってみる、ここで

[24:43 - 24:48]
モジュールrad xuiが見つからないと表示されるので、

[24:46 - 24:50]
これをコピーするだけだ、基本的に

[24:48 - 24:52]
必要なモジュールがあるがダウンロードされて

[24:50 - 24:56]
いないと表示されるので

[24:52 - 24:56]
手動でダウンロードする、そして

[24:59 - 25:02]
clodeか何かに行って、これが私の問題だ、とだけ言っておくことはできないだろうか、ただ

[25:02 - 25:07]
一つ問題は、

[25:07 - 25:12]
今コードベースをダウンロードできるかどうかわからない、もし

[25:09 - 25:14]
コードベースをダウンロードできるようにして、

[25:14 - 25:19]
カーソルを使ってこれを実行できたら最高だ、コードベースを

[25:19 - 25:24]
ダウンロードできるか、とかいうオプションはないと思う、

[25:24 - 25:30]
もしこのコードベースをダウンロードできれば、

[25:27 - 25:32]
それは素晴らしいビルド方法になる、

[25:30 - 25:35]
このコードをダウンロードして

[25:32 - 25:39]
カーソルを使って実行して、問題を修正して

[25:35 - 25:40]
からここに戻す、と表示される ああ、

[25:39 - 25:44]
彼らのエディタを使わないといけないんだけど、それは

[25:40 - 25:45]
やりたくないから、とりあえずズルして、

[25:45 - 25:51]
全部インストールされてることを確認してから

[25:51 - 25:55]
自分でビルドしてみよう。Boltの難しいところは、

[25:55 - 26:00]
外部パッケージがあるとデプロイが少し面倒なところだ

[25:57 - 26:03]
けど、それ以外は

[26:00 - 26:04]
20分で、ええと、

[26:03 - 26:08]
今ビルド中だけど、

[26:04 - 26:11]
20分で動くプロトタイプができたんだ。これは

[26:08 - 26:13]
素晴らしいと思う。ただの

[26:11 - 26:16]
動くプロトタイプじゃなくて、これは本当に

[26:13 - 26:18]
価値のあるものなんだ。

[26:16 - 26:21]
すごく価値がある。オーディエンスがいて、自分の

[26:21 - 26:26]
アイデアをここで構築してオーディエンスに配布したり、メタ

[26:23 - 26:27]
広告を作ったり、アービトラージしたりできるなら、ビルドする機会はたくさんあると思う。

[26:30 - 26:35]
実はグレッグに質問があるんだけど、

[26:32 - 26:36]
これらのAIツールってどんな感じ？

[26:36 - 26:41]
あまり技術に詳しくないけど、

[26:39 - 26:43]
技術を学んでいて、これらのツールを学んでいる人にとって、

[26:41 - 26:45]
最適な位置づけって何だと思う？例えば、

[26:45 - 26:49]
この情報を使って何をするべき？例えば、

[26:47 - 26:50]
マーケティングの仕方を知っている彼らはビジネス

[26:49 - 26:52]
面も理解していて、今や

[26:50 - 26:53]
プロトタイプ作成に取り組んでいる。彼らは何をすべきだろうか？

[26:52 - 26:56]
これは実は私自身への問いかけでもある。

[26:56 - 27:00]
例えば、構築方法を知っている人、例えば、私が

[26:58 - 27:02]
このスキルを持っているとしよう。私は何を

[27:00 - 27:05]
すべきだろうか？これらのツールの使い方を知っている人は何をすべきだろうか？

[27:02 - 27:07]
ちょっと広告

[27:05 - 27:09]
休憩。私が投資した会社についてお話ししましょう。boring

[27:09 - 27:14]
marketing.comという会社です。数年前、

[27:14 - 27:20]
世界最高のSEO専門家のグループに出会いました。彼らは

[27:20 - 27:25]
Googleで大企業を見つけてもらうことに尽力していました。その

[27:23 - 27:28]
秘訣は、競合他社を出し抜くための技術

[27:25 - 27:31]
とAIを持っていることです。

[27:28 - 27:33]
私自身のビジネスでも、

[27:33 - 27:37]
マーク・ザッカーバーグに頼りたくなかった。

[27:37 - 27:42]
顧客を自分のビジネスに誘導するために広告に頼りたくなかった。Google

[27:39 - 27:44]
で上位にランクインしたかったのです。だから私は

[27:42 - 27:46]
SEOが好きで、boring marketing.comを使っています。だから私は

[27:46 - 27:50]
そこに投資したのです。彼らは自分たちのアプローチに自信を持っているので、

[27:48 - 27:53]
30日間の無料トライアルを提供しています。

[27:50 - 27:55]
100%返金保証付きのスプリント。

[27:53 - 27:58]
今どきこんなことをする人はいないでしょう。ぜひ試してみてください。boring

[27:55 - 28:00]
marketing.com を強くお勧めします。

[28:00 - 28:05]
製品の開発方法を知っているからといって、エンゲージメントを維持し、口コミで広める製品の開発方法を知っているとは限りません。これは製品最適化とは

[28:08 - 28:13]
全く別の能力であり、

[28:13 - 28:19]
カーソルやボルト

[28:16 - 28:23]
などのツールでは解決できません。

[28:23 - 28:27]
顧客やユーザーと対話し、

[28:26 - 28:29]
彼らが何を好むか、何が嫌いかを理解することが大切です。Redditなどの

[28:27 - 28:32]
ソーシャルプラットフォームにアクセスして、

[28:32 - 28:36]
人々のペインポイントを理解し、この機能を追加したり、あの

[28:33 - 28:38]
機能をそこに追加したりします。しかし、それを

[28:36 - 28:40]
学ぶ一番の方法は、実際に

[28:40 - 28:46]
製品を開発し、

[28:46 - 28:49]
最適化にコミットすることだと私は考えています。まさに

[28:48 - 28:51]
開発にコミットし、最適化にコミットするの

[28:49 - 28:53]
です。私が提供する

[28:51 - 28:55]
多くのチュートリアルから、皆さんに本当に理解してもらいたいのは、

[28:53 - 28:58]
開発にコミットし

[28:55 - 28:59]
、学習にコミットし、

[28:58 - 29:00]
開発方法を学び、

[28:59 - 29:03]
マーケティング方法を学び、

[29:00 - 29:06]
最適化にコミットできるということです。そうすれば、

[29:03 - 29:08]
未来は理にかなっています。

[29:06 - 29:10]
なるほど、

[29:08 - 29:14]
開発者にとっては身勝手な質問かもしれませんが、AI

[29:14 - 29:20]
なしでも素晴らしい製品を作れる才能のある開発者をたくさん知っていますが、

[29:22 - 29:26]
マーケティング、共有、宣伝などに関しては全く理解していません。対処法は

[29:26 - 29:32]
知っているものの、その

[29:28 - 29:34]
裏側を知らない開発者に何かアドバイスはありますか？

[29:32 - 29:36]
人と組むべきなのか、それとも

[29:34 - 29:39]
習得できるスキルなのか。

[29:36 - 29:42]
彼らへのメッセージは、「最高の曲が

[29:39 - 29:44]
ビルボード100に載るわけではない」という

[29:44 - 29:48]
ことです。つまり、最高の製品を作ったからといって成功するとは

[29:46 - 29:50]
限らないということです。あなたの

[29:50 - 29:54]
ような人が

[29:53 - 29:56]
ポッドに来て、「コーディングを学んで何かを作ってみよう」と言うのと同じです。

[29:56 - 30:00]
補助

[29:58 - 30:03]
輪がボルトのようで、カーソルが移動して、

[30:00 - 30:05]
実際のIDのようなものが出てくるかも

[30:03 - 30:10]
しれません。

[30:05 - 30:12]
開発者にも同じことが言えます。開発者はまず

[30:10 - 30:15]
コンテンツを公開し、何がうまくいくかを見て、

[30:12 - 30:18]
自分でコミュニティを構築し、何がうまくいくかを

[30:15 - 30:21]
見て、プロセスにコミットするべきです。

[30:18 - 30:23]
私もあなたと同じで、

[30:23 - 30:27]
コンテンツを公開したり、素晴らしい

[30:24 - 30:28]
YouTubeチャンネルを運営したり、そういったことをしているのですが、さらに

[30:28 - 30:33]
コミットしていくというのはどういうことか分かり

[30:33 - 30:38]
ますよね。

[30:35 - 30:40]
多くの人が、特に

[30:38 - 30:42]
開発者はコンテンツに不安を抱いていると思います。でも、

[30:40 - 30:44]
あなたが素晴らしいアドバイスをくれたおかげで、これをうまく動かそうとしていて、

[30:44 - 30:51]
ここは両方とも

[30:47 - 30:54]
修正する必要があると思っています。問題は、おそらく使わないであろう

[30:51 - 30:56]
ファイルや依存関係が大量にインストールされてしまうことです。

[30:56 - 31:03]
これを動かそうとするには、1行ずつ修正していく必要があります。

[31:03 - 31:06]
今のところ言えることは、

[31:05 - 31:09]
素晴らしい

[31:06 - 31:11]
プロトタイプの

[31:09 - 31:13]
randevができて、

[31:11 - 31:18]
両方が修正されるまで数日待つつもりですが、

[31:13 - 31:20]
ビルドの反復という点では、

[31:18 - 31:23]
今のところBoltは

[31:20 - 31:25]
最高のものの一つだと思います。今私たちが経験したようなバグを除けば。

[31:25 - 31:30]
他に何か

[31:27 - 31:32]
伝えたいことがあれば教えてください。とにかく

[31:30 - 31:34]
ツールを試し続け、ツールをアップデートし続けてください。先ほど

[31:32 - 31:37]
言ったように 私の

[31:34 - 31:41]
最初のビデオでは、本当に

[31:37 - 31:43]
参加しているだけです。たとえば、Bolt が

[31:41 - 31:44]
2、3 日前にリリースされたことを知っていれば、それは

[31:43 - 31:46]
正しいことをしているということです。

[31:46 - 31:50]
新しいツールが

[31:48 - 31:52]
リリースされたからといって、必ずしもそれを使わなければならないというわけではありませんが、いじればいじる

[31:52 - 31:57]
ほど学習し、

[31:54 - 31:59]
ワークフローを開発し始めることができると思います。

[31:57 - 32:00]
簡単な事実として、数回のプロンプトで、

[31:59 - 32:02]
コードを一切記述せずに、2 つのプロンプトだけで、

[32:07 - 32:14]
ポッドキャストで 2 人の男性が AI について話していると言えるものを作成できます。

[32:10 - 32:17]
これも数回のプロンプトだけで、

[32:14 - 32:20]
コードを一切記述せず、ドキュメントをいくつか提供して、

[32:20 - 32:27]
これを行うことができました。もちろん、

[32:27 - 32:32]
本格的なアプリケーションを構築するには、さらに多くのことが必要です。

[32:29 - 32:34]
それは私たちが計画していることです、

[32:32 - 32:36]
Greg、でも今のところはこれが Bolt です。 新しいので、

[32:34 - 32:39]
みんなが楽しんで遊んでくれると嬉しいです。

[32:36 - 32:43]
ぜひコメントして、いいねして、チャンネル登録してください。

[32:39 - 32:47]
もっとBoltの動画を見たい方は、M Mikeの

[32:43 - 32:51]
素晴らしいYouTubeチャンネル、Ross

[32:47 - 32:53]
Mikeのチャンネルに登録してください。あと、

[32:51 - 32:56]
他のどこでも、

[32:53 - 32:59]
YouTubeはいいですよ。Twitterは

[32:56 - 33:01]
Ross Mickeyです。こんにちは。

[32:59 - 33:03]
質問があれば、

[33:01 - 33:05]
下のコメント欄に残してください。前回のYouTubeチャンネルでは、コメントに1つ1つ返信しようとしましたが、

[33:05 - 33:09]
それは

[33:07 - 33:11]
フルタイムの仕事になっていたでしょうから、できる限り頑張ります。

[33:09 - 33:12]
質問があれば、

[33:11 - 33:14]
下のコメント欄に残してください。Greg、いつものように、この機会を本当にありがとう。

[33:14 - 33:19]
本当に

[33:16 - 33:27]
感謝しています。後でね。

[33:19 - 33:27]
[音楽]

[33:28 - 33:31]
ベイビー

## コメント

### 1. @GregIsenberg (👍 45)
RAS MIC IS BACK , NOT A NEW CHARACTER BUT A WONDERFUL CHARACTER - YOU ASKED FOR A BOLT TUTORIAL SO WE DID IT. I GUESS COMMENT/LIKE/SUBSCRIBE IF YOU WANT TO LEARN TO BUILD YOUR IDEAS / SPREAD THE LOVE

### 2. @NDIZITV (👍 35)
I am 125% non technical and my MVP is almost ready. Done with UI/UX design with the help of bolt.new on the recommendation of Micky. Now learning basics of database set up and integration. Once I get that done right, we on the road baby. Cant wait. 🎉🎉. Thanks Greg for spreading the knowledge.

> **@sandogammy766** (👍 3): How did you use bolt.new for UI/UX?

> **@stanford19** (👍 2): In the same boat my friend. I am using Supabase for my database and backend needs and there is a bit to learn, my goodness

> **@AmanFangeria** (👍 2): If you want any help with the db. I can happily do it. I struggle with ui/ux but I am wonderful with logic. I figure out almost everything

> **@mastermedicalterms** (👍 1): Can bolt create its own databases?

> **@louiss190** (👍 0): ​@mastermedicalterms  it does for testing purpose . Last time i did was cloned gmail and it worked fine.

### 3. @Ed-xv4sy (👍 57)
I love that Greg brought on Ras! I'm building an app as we speak for free.  For starters, I have ZERO coding experience, ZERO tech experience and if I didn't run out of my 'free tokens' I would've had the app built last night.

> **@GregIsenberg** (👍 8): ras is the king

> **@stasvaisman3100** (👍 4): f*ck. ran out of 10M credits. now have to wait for a month until I can move on. I love it but I hate it 😂

> **@Ed-xv4sy** (👍 2): @@GregIsenberg so are you brother, thanks for inspiring creativity.  Every time I listen to one of your videos, my creativity juices start turning lol

> **@Ed-xv4sy** (👍 0): @@stasvaisman3100 DAMN!! 😅

> **@Jamesrwatsonx** (👍 0): What are you using? Ras and his starter kit?

### 4. @thehari75 (👍 141)
Cant wait for the bolt killer product  in a few days

> **@eMeriPartners** (👍 6): word

> **@peak.y** (👍 3): 😂😂

> **@magicismagic123** (👍 3): can't wait for bolt killer killer product..

> **@Utoko** (👍 1): I think the only adv is that it runs online for people not wanting to install stuff. This doesn't seem like a killer product at all. tbh. It is more limiting not able to use on your local projects. 
Each hype cycle the hype words are getting worse. You want to stay up to date but you waste so much time on bad headline and bad intros.

> **@AdithyaShreshti** (👍 1): There you go, such a lovable product. IYKYK

### 5. @relaxingsoothingsleepzone (👍 4)
This really is the future, i have managed to build my easy to follow regiment and it is avaibale in different laungues. I wish bolt was here 5 years ago lol

### 6. @franciscomoney (👍 0)
Just started to use bolt today and is sooo crazy for not developers! thanks for this video!!!

### 7. @etiennejulius1179 (👍 5)
Thanks for the raw, unedited honesty. 🙏🍻🍻

### 8. @udaankhatola88 (👍 1)
I am non tech guy Greg & Ryan and thanks for making this Pod. I have been fiddling with Cursor and V0. From the last 2 days have been playing with Bolt. This thing is mind blowing

### 9. @Pivot-or-StartOver (👍 0)
Just watching this now and its been 5 months since it was uploaded. Would love a part 2 :) - Thank you for this

### 10. @gill-k3b (👍 0)
Dear Greg,
Your channel opens the mind and makes one so productive.💥💫💥
Thank you!

### 11. @AnthonyCandaele (👍 7)
I use Bolt.new in conjunction with Cursor AI. I asked Bolt.new to implement my Figma files, and once it is implemented I copy paste it to my Cursor AI editor and keep refining it. I have the impressing that Bolt.new has a better overview on the whole project than Cursor AI.

> **@MindGrowMedia** (👍 0): Are you using the figma files as the mockup of the screen?

> **@eintyp4389** (👍 0): You need to understand how Cursor Rule files work and how to auto parse context. AKA if the agent makes changes to a database file it automatically attatches the database conventions and structure and othere relevant files to the context before generation. By default Cursor has no idear of the entire project or structure thats why it creates redundant already existing logic or forgets about how or were to link or edit referenzes. 
It gets worse with every added file and dumping the entire codebase into the context is not an option so learn cursor rules plz.

### 12. @aikonmishima7945 (👍 0)
There’s only a few people in the world I would trust to build something with passion. One of em is Ras.

Good job buddy.

> **@HikeBeach** (👍 0): I agree. Ras is very passionate and trustworthy and unlike other software developers he is cheerful. Fun and beneficial to follow him building stuff.

### 13. @devoceanwarrior (👍 3)
As usual great pod. Question for Ras or may be idea for next pod: Teach us on Building auth/login system with AI, and integrating some payment gateway like Paypal/stripe with AI)

### 14. @alsabakhan7713 (👍 0)
Great work ! Amazing within an hour I was able to launch my prototype . Thank you !

### 15. @OHHnoYOUdidntMAN (👍 1)
Sometimes i'm not sure how Greg has time to put out so many lengthy videos but i'm all here for it. so much great information. Your channel was one of the high quality ones i found. 

I only start getting into coding/app development/saas a week ago.

All your information is helping me bring my idea to reality, so thanks!!

> **@GregIsenberg** (👍 2): ive been sipping too much coffee recently

> **@AaronBlox-h2t** (👍 0): He has a team working for him....

### 16. @shawnurquhart4628 (👍 0)
Thanks guys. Loved the demo and it's my new fave thing to use. Bolt is so new but is on the verge of brilliance.

### 17. @c.athompson9280 (👍 0)
The real time joy when he got it to work. That was priceless.😁

### 18. @wtcbd01 (👍 0)
Really like that you show the families and how to keep trying to get it to work.  Thanks

### 19. @GermanRodriguezqndq (👍 0)
Awesome tutorial! 🎉 Love how you break it down for beginners—makes prototyping feel so achievable! Thanks for sharing, guys!✨

### 20. @mrodrod9553 (👍 1)
Would love to see a follow up video once some of the bugs and workflow complications have been resolved.

