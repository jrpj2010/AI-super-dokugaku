# Building an App with ZERO Coding Knowledge is NOW Possible (Claude 3.7 in Cursor)

**チャンネル:** Riley Brown
**公開日:** 2025-02-27
**URL:** https://www.youtube.com/watch?v=-FRBotBLc1o

## 説明

Building a very useful app in 20 minutes that has 

- Deep Research (Perplexity)
- Claude 3.7 Sonnet
- YT Transcript API (SupaData)

With the latest update and Sonnet 3.7 Pro, Cursor doesn't feel like the same app.

It can search the web now too.

Timestamps:
00:00 Getting Started
00:57 Ideating with excalidraw
02:29 Opening Cursor Starting From Template
05:25 Perplexity Deep Research API and Claude API set up
10:18 OHHH NO AN ERROR! WHATEVER WILL I DO?
11:17 PERPLEXITY AND CLAUDE WORKED!
12:02 IMPROVING DESIGN
13:04 ADDING YOUTUBE TRANSCRIPT API
15:21 Redesign Concept with v0
17:07 This is what we created
19:42 Want to dive deeper into vibe coding?

Learn more softwarecomposer.com

## 字幕

[00:00 - 00:04]
こんにちは、ライリーです。Claude

[00:04 - 00:10]
3.7 Sonet を使って、たった数分でアプリが作れるなんて信じられません。Cursor 3.7 は、今世界最高の AI コーディングツールである Cursor で

[00:07 - 00:12]
リリースされたばかりの最高の AI モデルです。

[00:12 - 00:17]
驚くべき

[00:15 - 00:22]
ことに、私はコードを一行も書いたことがありませんが、

[00:17 - 00:25]
Sonet 3.7 がすべてを自動的に

[00:34 - 00:39]
コーディングしてくれました。皆さんにも同じことをしてくれるはずです。このビデオでは、私が毎日使うアプリを約 20 分で作成した方法を紹介します。このワークフローをコピーすれば、基本的にコードを一行も書かずに好きなアプリを作成できます。

[00:39 - 00:43]
必要なものは何

[00:53 - 00:57]
でしょうか？私はコンピューターが必要です。Macbook M2 を使っていますが、問題なく動作します。Cursor Pro Plan も必要です。また、Perplexity API と Anthropic API も使用します。これらのAPIの意味については、

[00:55 - 00:59]
まだ知らない人のために後で説明しますが、とにかく

[00:57 - 01:01]
始めましょう。私が作りたいアプリのアイデアは次のとおりです。  「

[01:01 - 01:05]
ディープコンテンツ」というアプリは、

[01:03 - 01:07]
Open AIのディープリサーチに似た機能で、

[01:07 - 01:13]
究極のコンテンツリサーチ・スローライティング

[01:10 - 01:15]
ツールになります。ユーザーエクスペリエンスの点では、

[01:13 - 01:16]
ユーザーはこのアプリにアクセスし、

[01:15 - 01:18]
コンテンツのアイデアを書き出します。

[01:16 - 01:20]
次に

[01:18 - 01:24]
コンテンツターゲットを選択します。

[01:20 - 01:27]
ターゲットは目標のようなものと考えてください。アイデアを基

[01:24 - 01:28]
に、目標達成

[01:28 - 01:33]
に必要な質問を生成します。

[01:30 - 01:35]
このターゲットは、

[01:33 - 01:37]
フォローアップの質問に影響を与えます。フォローアップの質問が

[01:35 - 01:40]
完了したら、アイデアとフォローアップの質問を組み合わせて、

[01:42 - 01:48]
Perplexityの新しい

[01:45 - 01:50]
ディープリサーチAPIを使用して

[01:48 - 01:52]
コンテンツトピックのリサーチを行います。このディープリサーチ機能は、

[01:50 - 01:56]
Chat GPTのディープリサーチによく似ています。

[01:52 - 01:59]
このステップを終えたら、

[01:56 - 02:02]
Claude 3.7 Sonetを使用して、元のターゲットに一致する

[01:59 - 02:06]
完全なコンテンツスクリプトを生成できます。

[02:06 - 02:11]
ユーザー視点での手順は、

[02:08 - 02:14]
アイデアを書き出し、ターゲットを選択し、

[02:11 - 02:16]
3つのフォローアップの質問に答えるというもの

[02:14 - 02:19]
です。 完了です。では、

[02:16 - 02:22]
ここでスクリーンショットを撮って

[02:19 - 02:24]
クリップボードにコピーします。これは後で使用します。

[02:22 - 02:27]
これから行うことは、

[02:24 - 02:31]
このアイデア全体をここにコピーすることです。

[02:27 - 02:33]
カーソルに移動しましょう。

[02:31 - 02:35]
カーソルが開きます。コードを

[02:35 - 02:39]
1行も書かないままアプリの構築を始めます。

[02:37 - 02:41]
アイデアをどこに入力すればいいのか、「

[02:39 - 02:44]
プロジェクトを開く」ってどういう意味ですか？「

[02:41 - 02:46]
リポジトリをクローンする」って何？「SSHで接続する」って何？

[02:44 - 02:48]
私も以前は

[02:48 - 02:54]
カーソルでこのホームページに来たときに同じようなことを考えていました。

[02:51 - 02:57]
開始するために必要な手順は、

[02:57 - 03:02]
このようにプロジェクトを開いて新しいフォルダを作成し、「

[02:59 - 03:04]
開く」をクリックするか、テンプレートから開始するかの2つだけです。

[03:02 - 03:06]
このリンクを入力します。

[03:04 - 03:09]
このリンクを正確に入力できます。

[03:09 - 03:14]
この動画の説明にリンクがあります。Enterキーを

[03:11 - 03:15]
押して、

[03:14 - 03:17]
新しいフォルダを作成します。

[03:15 - 03:19]
これは

[03:17 - 03:21]
コンピュータ上の任意の場所に保存します。

[03:19 - 03:23]
ドキュメントフォルダ内のフォルダを選択してください。

[03:21 - 03:26]
削除しない場所に保存します。

[03:23 - 03:28]
これをディープコンテンツと呼びます。Enterキーを押します。

[03:28 - 03:34]
リポジトリの保存先を選択し、「

[03:30 - 03:38]
開く」をクリックします。

[03:38 - 03:44]
次に、ここにあるチャットウィンドウ（

[03:42 - 03:46]
カーソルコンポーザーと呼ばれます）に移動します。

[03:44 - 03:48]
カーソルが既にダウンロードされていて、

[03:46 - 03:50]
久しぶりに開く場合は、

[03:48 - 03:54]
コマンド+シフト+

[03:50 - 03:56]
Pを押して更新を試行してください。

[03:54 - 03:59]
更新を試行すると、

[03:56 - 04:03]
Claude 3.7 SonetとClaude

[03:59 - 04:05]
3.7 Sonet Thinking Agentにアクセスできるようになります。

[04:09 - 04:13]
ここでは、このClaude 3.7 Sonet Agentを使用します。Thinking Modelは使用しません。「これを

[04:16 - 04:23]
ローカルで実行」を選択します。ローカルで実行すると、

[04:19 - 04:25]
アプリが表示されます。これで

[04:23 - 04:28]
ローカルで実行できました。

[04:25 - 04:29]
入力してEnterキーを押しました。次に、

[04:29 - 04:33]
Local Host 3000が表示されたら、まず

[04:33 - 04:39]
コマンドクリックして

[04:36 - 04:41]
テンプレートを開きます。テンプレートはこのようになります。次にターミナルを開いて終了します。これで1つの

[04:39 - 04:43]
プロンプトができました。

[04:43 - 04:48]
これで開始テンプレートの設定ができました。

[04:45 - 04:51]
次は

[04:51 - 04:54]
実際に

[04:53 - 04:57]
思考を開始したいので、

[04:54 - 04:59]
思考エージェントのClaudeを使用します。

[04:57 - 05:02]
少し時間がかかりますが、最初の

[04:59 - 05:04]
プロンプトではこれが非常に重要だと思います。

[05:02 - 05:07]
ここで、アプリの

[05:04 - 05:10]
アイデアをコピーしてここ

[05:07 - 05:12]
に貼り付けます。

[05:12 - 05:20]
アプリの図の画像を貼り付けて、

[05:16 - 05:25]
完全に理解できるようにします。Perplexity

[05:20 - 05:28]
APIがリリースされたばかりなので、

[05:25 - 05:31]
これはPerplexityの新しいAPIです。Sonar

[05:28 - 05:34]
Deep Researchを使用するので、Sonar Deep

[05:31 - 05:37]
Researchが

[05:34 - 05:40]
使用していることを認識していることを確認します。 ソナーディープ

[05:37 - 05:41]
リサーチとパープレキシティについて。

[05:40 - 05:43]
私のコンテンツをご覧になっている方はご存知でしょうが、

[05:41 - 05:45]
パープレキシティとはAI搭載の検索エンジンのようなもので、APIを提供しています。APIを使うと、

[05:45 - 05:50]
その技術を

[05:48 - 05:52]
自分のアプリで利用できます。

[05:50 - 05:55]
使用するたびに料金を支払う必要がありますが、料金は

[05:52 - 05:56]
比較的少額です。個人的な

[05:55 - 05:58]
研究、特にビジネスに役立つのであれば、費用はごくわずかです。

[05:58 - 06:03]
他のAIツールと組み合わせて構築することを強くお勧めします。そこで、

[06:03 - 06:08]
ソナーリサーチとクロードAPIを使用しますが、

[06:08 - 06:13]
クロードに使用に関する情報を提供する必要はありません。

[06:13 - 06:20]
パープレキシティにはこのモデルを使用します。

[06:17 - 06:23]
ここに貼り付けるリンクは、

[06:20 - 06:24]
カーソルがエージェントです。これはエージェントで、

[06:23 - 06:27]
実際にこのページに移動し、

[06:24 - 06:30]
それを読んで戻ってきて、

[06:27 - 06:32]
情報に基づいて完璧なコードを記述できます。

[06:30 - 06:35]
さて、アイデアを入力しました。

[06:32 - 06:37]
次は、

[06:35 - 06:40]
世界で最も強力なAIコーディングモデルであるCLA 3.7 Sonetを送信します。さあ、

[06:37 - 06:42]
レースに出発です。どのように動作

[06:40 - 06:44]
するか見てみましょう。 では、

[06:42 - 06:47]
Deep コンテンツ アプリを作成します。これで完了です。

[06:44 - 06:49]
作成されたのがこれです。

[06:47 - 06:52]
コンテンツのアイデアは何ですか? 形式を選択します。

[06:52 - 06:55]
コンテンツのアイデアを入力して、トランスクリプトを貼り付けることができます。

[06:53 - 06:56]
ここでは、

[06:56 - 07:01]
API キーを使用して A.L ファイルを作成するように求められています。これが表示されるたびに

[07:00 - 07:04]
実行する操作としては、

[07:06 - 07:15]
env を作成するだけです。  looc ファイルにプレース ホルダーが付いている

[07:12 - 07:18]
ので、P を入力するだけで、env の内容を入力することができます

[07:15 - 07:22]
。 ローカル ファイルは

[07:18 - 07:24]
API キーを安全に保つためのもので、そのため、

[07:24 - 07:30]
新しい環境を作成するたびにこれを作成する必要があります。 ローカル ファイルに

[07:26 - 07:32]
API キーを貼り付けます。Perplexity

[07:30 - 07:35]
Pro アカウントをお持ちの場合は、

[07:32 - 07:37]
API クレジットが付属しています。

[07:37 - 07:42]
ここで設定をクリックし、

[07:39 - 07:44]
API タブに移動します。API タブに移動すると、

[07:42 - 07:46]
ここ

[07:44 - 07:47]
に API キーが表示されます。安全に

[07:46 - 07:49]
保ちたいので、隠しておきます。

[07:47 - 07:52]
次に、

[07:49 - 07:55]
この API キーをここにコピーします。次に、

[07:52 - 07:58]
その v dolo ファイルに移動して、そこ

[07:55 - 08:00]
にキーを貼り付けます。

[07:58 - 08:03]
これで Perplexity が貼り付けられたので、

[08:00 - 08:04]
Anthropic API キーを取得する必要があります。

[08:03 - 08:10]
ブラウザまたは Google で

[08:04 - 08:10]
コンソールに入力します。  Anthropic

[08:13 - 08:18]
Docomo は API キーを取得します。次に、

[08:17 - 08:21]
この

[08:18 - 08:24]
キーの作成を押して、

[08:21 - 08:25]
下部にある [追加] を押すと、API

[08:24 - 08:28]
キーが表示されます。[コピー] ボタンを押して、

[08:25 - 08:31]
これらのキーを秘密かつ安全に保管します。Anthropic

[08:28 - 08:33]
キーと Perplexity キーを入力し、

[08:33 - 08:42]
Command + S を押して保存します。次に、

[08:36 - 08:48]
キーを env に配置します。

[08:42 - 08:49]
loocファイルです。サーバーを再起動して

[08:49 - 08:56]
すべての手順を実行し、テストしてください。Enter

[08:56 - 09:02]
キーを押します。ここでLocal Host

[08:59 - 09:04]
3001が再び表示されます。コマンドクリックすると、

[09:02 - 09:06]
アプリが表示されます。

[09:04 - 09:08]
これが作成されたアプリです。

[09:06 - 09:10]
このターミナルを開きます。終了する

[09:08 - 09:12]
にはターミナルを開く必要がある場合があります。Local

[09:12 - 09:17]
Host 3001で実行中と表示されます。これで

[09:14 - 09:22]
アプリをテストできます。

[09:17 - 09:26]
新しいlaogコード

[09:22 - 09:30]
機能とClaude

[09:26 - 09:35]
3.7 Sonet、そして

[09:30 - 09:37]
今回の発表のすべての更新を使用してアプリコーディングを作成します。

[09:35 - 09:39]
ターゲットを選択します。

[09:37 - 09:42]
コンテンツターゲットを見つける必要があります。

[09:39 - 09:44]
これはスタイルガイドまたは目標のようなものです。

[09:42 - 09:47]
このようなコンテンツを作成します。私は

[09:44 - 09:50]
fir shipのコードレポートが大好きです。これはfir shipが

[09:47 - 09:53]
作成したビデオです。

[09:50 - 09:55]
ここにトランスクリプトを簡単に取得できる小さな拡張機能があります。

[09:53 - 09:58]
これで

[09:55 - 10:00]
Finderに移動して

[09:58 - 10:03]
ダウンロードsに移動して、

[10:00 - 10:06]
このテキストファイルを簡単に取得できます。

[10:06 - 10:13]
これをアプリに貼り付けます。このように貼り付けます。「続行」をクリックして

[10:15 - 10:20]
フォローアップの質問に進みます。うまくいくかどうか見てみましょう。エラーが

[10:17 - 10:22]
発生したようです。はい、エラーが発生しました。このエラーを

[10:20 - 10:23]
コピーします。

[10:22 - 10:29]
戻って

[10:29 - 10:36]
フォローアップの質問を取得しようとした後にエラーが発生しました。修正してください。

[10:35 - 10:39]
これらのエラーを貼り付けます。

[10:36 - 10:41]
今は3002で実行されていますが、

[10:39 - 10:43]
停止してしまいました。

[10:41 - 10:45]
今、クラウドサーバーは

[10:43 - 10:50]
皆が使用しよ

[10:45 - 10:52]
うとしているため、少し混乱しています。テストしてみましょう。Clae 3.7 Sonetは、

[10:50 - 10:55]
最も優れたAIエージェントです。

[10:52 - 10:58]
カーソルはClaude 3.7 Sonetによって提供されています。それでは

[11:01 - 11:06]
フォローアップの質問に進みます。今回はパープレキシティが

[11:05 - 11:09]
機能することを願っています。ああ、

[11:06 - 11:11]
もっとエージェント的にやらなければなりません。

[11:11 - 11:15]
推論は

[11:13 - 11:17]
すごいですね。それでは、次に何を

[11:15 - 11:19]
するかというと、 ディープリサーチを始めます。

[11:17 - 11:22]
すぐに失敗しなかったのは

[11:19 - 11:26]
良い兆候です。よし、

[11:22 - 11:29]
完了です。すべてのリサーチデータが揃ったので

[11:26 - 11:32]
、考えてみましょう。Claw

[11:32 - 11:38]
3.7 Sonetの詳細なレポートを作成する必要があります。この

[11:35 - 11:40]
リサーチをすべて完了しました。たくさんの異なるリンクがあります。

[11:38 - 11:42]
これはかなりクールです。ここにコンテンツスクリプトがあります。

[11:42 - 11:47]
2024年2月21日です。コード

[11:44 - 11:49]
レポートをご覧になっているので、スタイルガイドに従っています。

[11:47 - 11:51]
今日は、

[11:49 - 11:54]
突然突然現れた、とんでもないAIニュースについて掘り下げていきます

[11:51 - 11:56]
。AnthropicsのCLA 3.7 Sonetのリリースです。これは、

[11:54 - 11:59]
皆さんが受ける平均的なAIアップデートではありません

[11:56 - 12:01]
。AIが作成され、

[11:59 - 12:03]
正確なスタイルでスクリプトが作成されました。よし、

[12:01 - 12:06]
悪くないですね。これらすべてを

[12:03 - 12:08]
1つのフローで実行し、

[12:06 - 12:10]
もう少しミニマルにしたいです。

[12:08 - 12:11]
今は少しブロック状になりすぎています。今、

[12:11 - 12:16]
さらに変更を加えます。よし、

[12:13 - 12:18]
ここで変更が行われています。おお、これは気に入りました。

[12:16 - 12:20]
これで、ターゲット形式の追加をクリックするだけです。

[12:18 - 12:22]
すごいですね。

[12:20 - 12:25]
ステップの数はなんと

[12:22 - 12:26]
6つ。読み取りステップはこれで6つ。コードが生成されました。コードが生成されました。コードが生成されました。

[12:26 - 12:32]
コードが生成されました。ファイルを検索しました。ファイルの

[12:29 - 12:35]
読み取りが完了しました。

[12:32 - 12:37]
これでコードを編集しました。

[12:47 - 12:57]
続いて、フォローアップの質問コンポーネントに残っているリンターエラーを修正しましょう。毎回15個の異なるステップが実行されるのはすごいですね。そろそろこれをテストしてみましょう。Claud、続けてください。テストコマンドを入力してください。テストコマンドを入力してください。これで、

[12:57 - 13:01]
自動的にresが実行されます。Arch、

[12:59 - 13:03]
この

[13:09 - 13:13]
フローが気に入りました。キーボードから手を離す必要がなくなりました。これはかなりクールです。さて、次に別のAPIであるスーパーデータを追加します。基本的に、このアプリのステップ2は、

[13:12 - 13:15]
アイデアを書いてから

[13:13 - 13:19]
ターゲットを書くか、

[13:15 - 13:20]
ターゲットスクリプトを貼り付けるかですが、代わりに貼り付けるオプションが1つあり

[13:19 - 13:22]
ます。もう

[13:22 - 13:26]
1つのオプションは、リンクを

[13:24 - 13:29]
貼り付けることができることです。

[13:29 - 13:36]
YouTubeリンクとSuper Dat APIを貼り付けるだけです。Super

[13:34 - 13:40]
Dat APIのリンクは

[13:36 - 13:43]
自動的にSuper

[13:40 - 13:44]
Data APIを使用し、自動的にトラン

[13:44 - 13:49]
スクリプトを取得します。ここに貼り付けてください。

[13:47 - 13:50]
貼り付けるか、リンクを貼り付けてください。Super

[13:50 - 13:55]
Dat APIを使用する方法を説明します。Super

[13:55 - 14:01]
Dataに戻ります。APIキーはすでにコピーしましたが、ドキュメントに移動して

[14:01 - 14:06]
、

[14:03 - 14:08]
このYouTubeトランスクリプトのようにリンクをコピーします。

[14:06 - 14:12]
また、ここにある「

[14:08 - 14:14]
Getting Started」リンクもコピーします。カーソルに戻って、これを貼り付けます。これを貼り付けます。これを貼り付けます。

[14:22 - 14:27]
そして、APIキーを貼り付けます。これは

[14:25 - 14:29]
非常に長いキーで、5行ほどあります。

[14:27 - 14:31]
なぜこんなに長いのかわかりませんが、

[14:29 - 14:32]
プライバシーを守るためにかなり下にスクロールしました。

[14:31 - 14:36]
それで、今私がやろうとしていることは、「

[14:32 - 14:38]
お願い、私は欲しい」と言うことです。 ステップを作成するために、

[14:36 - 14:41]
スーパーデータ

[14:38 - 14:43]
APIを使用します。上記のリンクを使用して

[14:41 - 14:45]
設定し、APIキーを設定します。API

[14:43 - 14:47]
キーを必要な場所に入力します。

[14:45 - 14:50]
基本的には、トラン

[14:47 - 14:52]
スクリプトを貼り付ける代わりに、ユーザーが

[14:50 - 14:55]
YouTube動画へのリンクを貼り付けて、トランスクリプトを

[14:52 - 14:57]
自動的に入力できるようにしたいのです。これで

[14:57 - 15:03]
すべて完了です。これで

[15:00 - 15:05]
機能が作成されます。

[15:03 - 15:06]
これらのステップが表示され、リンク先も表示されるのが気に入っています。これで

[15:06 - 15:12]
完了です。

[15:10 - 15:15]
ターゲット

[15:12 - 15:19]
形式をクリックします。このリンクをここに貼り付けて、「

[15:15 - 15:21]
取得」をクリックします。すごい

[15:19 - 15:24]
速さです。次は

[15:21 - 15:28]
v0に移動して、

[15:24 - 15:29]
この画像を貼り付けます。すべてを

[15:28 - 15:35]
最小限にして、

[15:29 - 15:39]
非常に…そして、

[15:35 - 15:41]
リサーチセクションを表示するためのボタンを作成します。

[15:39 - 15:43]
これで、これはかなり面白くなり始めています。

[15:41 - 15:45]
ええ、

[15:43 - 15:48]
こんな感じになったらどうでしょう。

[15:45 - 15:51]
実は、スクリーンショットを撮って、これを

[15:51 - 15:58]
もっと魅力的で素敵なものにする方法を考えてほしいと思っています。

[15:54 - 16:03]
アップロードしました。 ドキュメントと、

[15:58 - 16:05]
リサーチステップが始まったら

[16:03 - 16:07]
すべてをサイドバーに移動する必要があります

[16:05 - 16:11]
が、その前に、すべての

[16:07 - 16:14]
フォローアップの質問が

[16:11 - 16:15]
元の質問と同じ領域に表示されるようにします。

[16:15 - 16:20]
同じコンポーネントで生成されたように、質問の

[16:18 - 16:23]
ヘッダーで区切られているように見えるようにします。

[16:23 - 16:27]
リサーチステップが始まったら、

[16:25 - 16:29]
すべてをサイドにアニメーション表示し、

[16:27 - 16:31]
すべてを

[16:29 - 16:33]
メインバーにロードします。そして、

[16:31 - 16:36]
基本的にドキュメントを準備するはずです。実際に

[16:36 - 16:43]
やっているのはまさにそれです。では、テストを見てみましょう。コマンドを

[16:40 - 16:48]
入力して、テストを

[16:43 - 16:50]
実行してください。素晴らしいですね。それでは

[16:48 - 16:52]
リサーチを作成します。つまり、

[16:50 - 16:55]
実際に検索して

[16:52 - 16:57]
情報を収集します。コード内で直接これを見つけて、

[17:01 - 17:06]
Perplexity

[17:03 - 17:06]
Deep

[17:06 - 17:11]
Researchを使用するように変更します。はい、これが

[17:09 - 17:15]
約25分で作成したものです。

[17:11 - 17:19]
ここに私のアイデアを載せておきます。現在、

[17:15 - 17:24]
AI LLMでは

[17:19 - 17:29]
Google Gemini、Gr Open

[17:24 - 17:31]
AI Deep Seek、そしてAnthropicの間で激しい競争が繰り広げられています。 これらの

[17:29 - 17:33]
企業は皆、素晴らしいAIモデルを開発しており、

[17:31 - 17:35]
その進歩は加速しています。さて、

[17:33 - 17:37]
アイデアを入力して「はい」を

[17:35 - 17:40]
押します。すると、

[17:37 - 17:42]
YouTube動画を検索できます。

[17:40 - 17:44]
作りたいYouTube動画なら何でもいいです。

[17:42 - 17:46]
例えば、

[17:44 - 17:48]
Andre jaを選びましょう。彼は

[17:46 - 17:50]
素晴らしいYouTuberで、

[17:48 - 17:52]
スクリプト作成が得意です。では、

[17:50 - 17:55]
この

[17:52 - 17:58]
YouTubeリンクをここに

[17:55 - 18:01]
貼り付けて、トラン

[17:58 - 18:04]
スクリプトを取得しましょう。「完了」をクリックします。

[18:01 - 18:06]
チェックマークが付きました。Command +

[18:04 - 18:08]
Enterキーを押すと、

[18:06 - 18:10]
自動的に

[18:08 - 18:12]
フォローアップの質問が生成されます。具体的にどの

[18:10 - 18:14]
期間に焦点を当てたいですか？

[18:14 - 18:21]
Claude 3.5 Sonetがリリースされてから過去8か月間に焦点を当てましょう。Command +

[18:21 - 18:26]
Enterキーを押すと、次の質問に答えることができます。AI

[18:26 - 18:32]
コーディング

[18:29 - 18:34]
能力と

[18:32 - 18:36]
エージェントワークフローに焦点を当てた特定のAIモデルは何ですか？

[18:36 - 18:44]
モデルの商用利用を検討する際には、

[18:40 - 18:48]
現在の能力、何ができるか、そして

[18:44 - 18:51]
これらのモデルの将来性に注目しましょう。さて、

[18:48 - 18:54]
コマンド+Enterキーを押すと、

[18:51 - 18:56]
すぐに詳細な調査レポートの生成が始まります。Perplexity

[18:56 - 19:01]
Deep Researchというツールを使って、

[18:59 - 19:04]
このすべての情報を取得し、詳細な調査を行います。

[19:01 - 19:07]
そして、その

[19:04 - 19:09]
調査結果と私のアイデアを、

[19:09 - 19:14]
ターゲットに合ったスクリプトに変換します。これは25分で作成できました。

[19:14 - 19:20]
コードを1行も書かずに、信じられないほどの速さです。25分で作成しました。

[19:17 - 19:24]
ご覧の通り、

[19:20 - 19:26]
調査レポートは

[19:24 - 19:28]
適切なマークダウン形式になり、

[19:26 - 19:31]
非常に見栄えが良くなりました。

[19:28 - 19:33]
調査結果を非表示にすると、最終的な

[19:31 - 19:34]
スクリプトが完成します。次のステップは、

[19:34 - 19:39]
画像などを追加してみることですが、これは本当に

[19:36 - 19:41]
クールなワークフローだと思います。これが

[19:39 - 19:43]
約25分で作成したものです。

[19:41 - 19:44]
皆さん、この

[19:43 - 19:47]
動画が気に入って、もっと詳しく知りたい方は、

[19:44 - 19:49]
Software Composersへの参加を検討してみてください。これは

[19:47 - 19:53]
私の無料コミュニティです。リンクは説明欄にあります。

[19:53 - 19:58]
メンバーは約14,000人です。 ここは私がすべてのテンプレートを置いている場所です。

[19:56 - 20:00]
このビデオは

[19:58 - 20:02]
テンプレート2を使用して開始しましたが、

[20:05 - 20:08]
このコミュニティでは今後1年間、毎週1つのテンプレートをリリースする予定です。

[20:06 - 20:11]
コミュニティに参加したい場合は、説明にあるリンクをクリックして質問したり、

[20:11 - 20:15]
プロジェクトを共有したりできます。

[20:13 - 20:18]
今後ハッカソンもいくつか開催する予定です

[20:15 - 20:19]
ので、興味があればコミュニティに参加してください。

[20:18 - 20:22]
次のビデオでお会いしましょう。

## コメント

### 1. @Thomas_automations (👍 8)
its really exciting to see what Claude 3.7 is doing, especially to do with coding and more technical tasks. Learned a lot from this video!

> **@pH7Programming** (👍 0): How often have you used it for your projects?

### 2. @ShoppingMarc (👍 13)
🎯 Key points for quick navigation:

00:00 *AI app creation*
00:12 *No coding required*
00:27 *Build apps quickly*
00:41 *Required tools listed*
01:07 *Deep content app*
01:35 *Research-driven app*
01:59 *Claude 3.7 Sonet*
02:14 *App building process*
02:27 *Cursor interface explained*
03:09 *Start from template*
03:23 *Folder setup*
03:34 *Using Claude 3.7*
04:13 *Running locally*
04:28 *Template setup*
05:07 *Add app details*
05:48 *Perplexity API use*
06:42 *Claude processes app*
07:06 *API key setup*
08:03 *Set up API keys*
08:33 *Save and rerun*
09:02 *Test app locally*
10:06 *Paste transcript*
11:17 *Begin research*
12:11 *Modify app design*
12:52 *Test research flow*
13:20 *Use super data*
14:43 *Configure super data*
15:24 *Fetch transcript*
16:43 *Improved UI design*
17:11 *Fast workflow*
17:52 *Add target script*
19:01 *Deep research script*
19:28 *Final content script*
19:43 *Community invitation*

Made with HARPA AI

> **@jenniferyoder8501** (👍 0): @rileybrownai this is really positive feedback—it’s recognition that what you’ve recorded is great content—and here’s a bit more signposting to follow along. If anyone posts stuff like this, take notes for what to include going forward (both in chapter tags and to mention in your talk track). For example, letting people know you’re in excalidraw as a tool to envision a user journey, but also mentioning where else someone could do that work.

> **@jenniferyoder8501** (👍 0): And @rileybrownai, it can be a little quick reference for people to revisit your video to go right to a certain step—which you could potentially see parts that get watched/rewatched most often.

### 3. @AnActualSkeptic (👍 3)
Yup. I can confirm this. I built an app at my job and it's now being used in critical parts of the business for security

> **@snowboardparadise** (👍 0): Where are you working?

### 4.  (👍 10)
Creating a commercial app for weeks now I can say with property that you cannot go to market with a decent app with zero code. I’m using cursor IDE with Claude 3.7 paying extra and sometimes AI  creates a feature in minutes that you’d take several hours, but sometimes it can’t fix a simple problem that you can in 5 minutes. it’s amazing, but someone without any stack/ programming knowledge will get stuck more than a Junior dev without AI.

> **@jenniferyoder8501** (👍 0): Sounds like white space to me in noticing where that comes up most often (it’s all patterns, right?) and building a bridge.

### 5. @James.Buchanan (👍 21)
"Vibe code" with Claude... you know what kills a vibe? "Message limit reached for Claude 3.7 Sonnet until #:## AM.
You may still be able to continue on Claude 3.5 Haiku"

> **@TransmentalMe** (👍 1): API limits are raised over time to prevent abuse, could poke them to see if they have an evaluation trial.

> **@GoforDayten** (👍 0): 😂

> **@James.Buchanan** (👍 0): I get that using Claude Desktop, not API

### 6. @BasicShowTime (👍 6)
Mind Blowing... The only barrier now is imagination. Think how many business models and enterprises will be created with that, games, apps and tools.

> **@lopadova_** (👍 1): My mind is running around with ideas lol

> **@guilleeemm** (👍 0): you still need to know coding..

> **@BasicShowTime** (👍 2): @@guilleeemm sure? Just knowing logics you can. It’s not anymore a barrier. You should learn some other skills 🤣 a computer is replacing you

> **@DragonflyF** (👍 0): @BasicShowTime So try to create a more complex application than in this example. It’s not as easy as it looks, especially when you're working on something more complicated than a to-do app, which is the most basic app in the world. Good luck! This tool makes things much easier, but mainly for programmers.

> **@pH7Programming** (👍 1): Have you found any limitations, except for your imagination?

### 7. @thierrynzeukou3426 (👍 1)
Been waiting for this, always a pleasure Riley 👌🏿👌🏿

### 8. @iamone_ (👍 5)
This was so well explained. Love your workflow.

### 9. @pH7Programming (👍 0)
Outstanding presentation, well prepared as any project deserves to! ⚡

### 10. @jisiyuan8083 (👍 1)
Loved the video! I’m wondering—do you have any AI Test agent that can help check if my code is correct? I’m not sure if my code has any bugs. Thanks so much!

### 11. @TransmentalMe (👍 1)
You can build an app, yes. But you need to know what you're doing to build a good app, like how to organize and point it in the right direction. Claude Code is amazing, I'm enjoying seeing how far it can take this project coding everything and it's been mind blowing.

### 12. @metatarcus (👍 1)
love your videos, Riley. some feedback:
i took over an hour to do this because either the claude or perplexity apis were throwing errors. it will be better if you do not give the impression that this is so simple so that i don't benchmark my time to your speed since your videos ave to be shorter for marketing purposes.

> **@rileybrownai** (👍 0): i'll simplify it.


> **@jenniferyoder8501** (👍 0): Curious, where were you seeing slowdown patterns and most common reasons? What did you do to get around the API errors?

### 13. @ariavaleaiunlocked (👍 0)
Such awesome content. Thank you for your contribution to the world Riley!

### 14. @AdityaVG10 (👍 1)
Pro tip : if you are stuck on any error for long, just read it before giving it to claude or any model in cursor AI. This will help you fix it faster as you understand the reason why it's happening.

> **@jenniferyoder8501** (👍 0): Love this—reading to ensure it makes sense in natural language? Or perhaps asking why it wasn’t understood by the AI agent?

### 15. @RomanRachwal (👍 2)
Already made 3 apps with 3.7, yes it's only a apk install but I've had minimal issues and now have some cool apps I've always wanted

> **@lopadova_** (👍 0): and you never coded?

> **@nativobeats4712** (👍 0): ​@@lopadova_ Well, I'm finishing my first one using claude, and yes, I never coded before. 
Just have a very fundamental knowledge of how coding works, but don't know any language or have any coding skills. 

And I can confirm, it's going very well. If you don't know what to do or how to implement, or what to use or whatever, just ask for clarifications, and step by step guidance.
Eventually, you'll get acustomed to the workflow and how to get more juice for less oranges from calude.

The app I'm building is 90% done, and it's not a very very basic app, i'd say in terms of complexity it's probably a 4 out of 10 - at least from a user point of view.

Now, I gotta say, I'm kind of surverying what I will need to do to then port the app for iOS and Androind, and get it on a cloud/online server, both the backend and the datebase etc and to be honest, I'm kind of lost on that. Trying to get some help and investigating now, but I think it's one of those things that once you know how to do, it will be very simple for future apps. The hard part of actually creating and building the code, i'd say it's incredibly good. 

If you get errors or bugs, just paste them, and claude will correct itself.

If you use the project feature of claude, you can paste your code files every time it makes sense to do it, and it will analyze everything before working with you to improve on what you already have - i'd say that's the big game changer that allows you to actually build a decent/bigger project compared to before.

Just telll claude your code dumb, and that you're completly blind on what making an app requires, so you will need detailed steps everytime and it will guide you very well.

It's actually amazing.

> **@DsatterAcademy** (👍 0): Can  you make a tutorial how you made that app because whenever I try I get stuck or you are just lying.

> **@RomanRachwal** (👍 0): @@lopadova_ never coded in my life, I'm using visual code studio, I've found the trick is to have Claude explain that it understands what you are trying to do, make small changes not big ones, start a new chat to fix errors and always upload your lib .dart files into the project knowledge for the chat

> **@RomanRachwal** (👍 0): @@DsatterAcademy   never coded in my life, I'm using visual code studio, I've found the trick is to have Claude explain that it understands what you are trying to do, make small changes not big ones, start a new chat to fix errors and always upload your lib .dart files into the project knowledge for the chat. I've been using AI for almost 3 years now, it's about understanding it's current limits and making sure it has the right information to get the outcome you want , are you just having trouble with errors ?

### 16. @Readeoh (👍 1)
Another banger, Riley 
Gonna build something like this to automate research I do for work

### 17. @TataiJacko (👍 1)
You got a new subscriber, and a learner, what's the tool called you did the initial design design called? thanks

### 18. @iamone_ (👍 6)
What is this universal voice app you are using so you can sepeak and get text out?

### 19. @V1kToo (👍 6)
I strongly disagree with this statement. I am a senior python developer and I am trying to extend my code's functionality with rust. I am trying both ChatGPT and Claude 3.7, both are helping, but this is far from an easy task. It is obviously great that I can write Rust with very little knowledge of the language, but I can barely do anything of value. 
I am both pissed and relieved that AI is nowhere near replacing developers.

> **@dominiquedegottex2481** (👍 1): Completely agree.

> **@brianberge9799** (👍 1): Yeah I am probably older than most people here and I worked in marketing before social media marketing was a thing. The hard work of marketing in terms effectively managing a budget and driving results haven’t changed. And just because Meta, X, TikTok etc made available the tools to be a great market didn’t mean nobody pays for marketing anymore. What’s going to happen is people will DIY, not get the results they are looking for and then hire someone like this guy. It’s as much an ad for his services as it is anything else, which is fine. Just stating the obvious.

### 20. @Chris-kv8bq (👍 1)
Outside of the first day they announced 3.7. I haven’t been able access it. Your videos have me yelling at cursor. You build apps with magic of editing making it look easy.  Cursor makes sooo many mistakes. I love your videos though. Showing what is possible is encouraging.

> **@rileybrownai** (👍 2): I made this on the first day it was announced and Timmie was working great. Since then cursor has been acting weird. 3.7 is having a touch time integrating with cursor. Hang in there.

> **@Chris-kv8bq** (👍 1): @ I’m glad it’s not just me having Cursor issues since the update.  I get with the speed at which these big ai companies are rolling out their updated models Cursor needs to implement them quickly, but 3.7 has broken more than it’s fixed.  Keep making your videos it’s great to see creativity at work. You show people how accessible AI can be for the non-programmers.

