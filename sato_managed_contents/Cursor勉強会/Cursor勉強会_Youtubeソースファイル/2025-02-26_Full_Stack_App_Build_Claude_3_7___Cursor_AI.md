# Full Stack App Build Claude 3.7 & Cursor AI

**チャンネル:** Rob Shocks
**公開日:** 2025-02-25
**URL:** https://www.youtube.com/watch?v=k0kBylMwlbA

## 説明

Claude 3.7 & Cursor AI App Build Full Stack Nextjs & Supabase

🚀 Ready to supercharge your coding workflow? Discover how Claude 3.7 and Cursor AI  are revolutionizing app development in 2025! In this comprehensive speed run, we'll explore the game-changing features of these powerful AI coding tools and show you how to leverage them for 10x faster development.

Learn how Claude's new extended thinking mode can transform your development process. We'll dive deep into real-world applications and sharing insider tips for maximizing these tools as we build out a full stack app in 30 minutes. 

Perfect for: #AIDev #BuildWithAI #CodingAgent #AppDev #CursorAI #Claude37 #AITools #WebDevelopment #SoftwareEngineering #CodingTutorial

👉 Course link: https://www.switchdimension.com/courses/cursor-ai

LINKS
Design Mode for AI - https://youtu.be/CrW1zSZtn1E?si=9qezTU0nhDzZdWIw
Free 3 Experts Resource - https://notes.switchdimension.com/

MORE AI DEVELOPMENT CONTENT
X (Twitter) https://x.com/robshocks
https://Intagram.com/therobshocks   
https://linkedin.com/in/robertoshaughnessy  

TALK TO YOUR APPS
On a mac use the dictation settings double hit FN key
On Windows voice mode use the Windows key with H

WORK WITH ME
Brand Sponsorships, Events, Coaching - info@switchdimension.com 

CHAPTERS 

00:00 Intro
00:18 Claude Sonnet 3.7 Overview
07:16 Fast Inference
07:40 Simple Iterations
08:20 YOLO Mode
10:18 Supabase
12:28 Teething Issues
13:16 Initial Interface
14:15 Claude 3,7 Model Comparison
17:42 Successful Database Connection
18:05 Improve the Interface
22:48 My Claude 3.7 Review

## 字幕

[00:00 - 00:05]
CLA 3.7がリリースされました。その性能には非常に自信があるので、

[00:03 - 00:07]
この

[00:05 - 00:10]
アプリ開発全体を目を

[00:07 - 00:12]
閉じて行うつもりです。実際には、

[00:10 - 00:14]
Vibeでチェックして、この

[00:12 - 00:16]
ベンチマークが本当にうまくいくかどうか、そしてこれが

[00:16 - 00:22]
AIを使ったアプリ開発に大きな違いをもたらすかどうかを確認します。CLA 3.7が

[00:19 - 00:24]
リリースされました。ネタバレ注意。実は、

[00:22 - 00:26]
Vibeコーディングセッションでこのモデルをとても楽しんでいたので、

[00:26 - 00:30]
今日はその手順を説明します。バックグラウンドでSuperbaseデータベースを使用して

[00:28 - 00:33]
NextJSアプリケーション全体をセットアップする方法を紹介します。

[00:33 - 00:37]
音声メモを録音して

[00:34 - 00:39]
データベースに保存します。Vibe

[00:37 - 00:41]
コーディングのスピードランでこれを実行します。

[00:39 - 00:43]
ルールをすべて無視して、

[00:41 - 00:45]
すぐに

[00:43 - 00:47]
アプリ全体を開発します。所要時間は約40分で、

[00:47 - 00:51]
推論時間を短縮しました。そのため、重要なステップ全体を最初から最後まで確認できます。

[00:51 - 00:55]
これが重要なのは、

[00:53 - 00:58]
ここにある1つのテーブル、つまり

[00:55 - 01:00]
ソフトウェアエンジニアリングベンチです。

[00:58 - 01:02]
ここにあります。  clae 3.5 5 は

[01:00 - 01:03]
私たちが長年使い慣れてきた

[01:02 - 01:06]
モデルで、

[01:03 - 01:08]
多くのソフトウェア開発者が好むモデルです。

[01:06 - 01:10]
この急上昇を見てください。

[01:08 - 01:13]
カスタム

[01:10 - 01:15]
スキャフォールディングを使うと、70%ものパフォーマンス向上が期待できます。

[01:15 - 01:19]
付録で言及されているように、カスタムスキャフォールディングとは、

[01:17 - 01:21]
Bashツールなどの特定のツールや直接的な

[01:19 - 01:24]
調査を用いて、モデルが

[01:21 - 01:27]
割り当てられたタスクを完了するのを支援することです。

[01:24 - 01:29]
ここで何が起こっているかというと、私たちはベンチを使っています。

[01:27 - 01:32]
ベンチは基本的に、実際

[01:32 - 01:36]
に存在するソフトウェアの問題と比較して自己評価を行い、

[01:34 - 01:38]
解決を試み、その後、パフォーマンスを

[01:36 - 01:40]
それに基づいてマッピングします。

[01:38 - 01:42]
このリリース全体で見られるのは、これらのモデルの

[01:40 - 01:44]
実用的な応用に向けた真の進歩です。Tropicは

[01:44 - 01:48]
ベンチマークにはあまり重点を置いておらず、

[01:46 - 01:50]
実際には

[01:48 - 01:52]
物事を成し遂げることに重点を置いています。私はこれに非常に感銘を受けています。

[01:52 - 01:57]
彼らの用語、考え方、

[01:54 - 01:58]
話し方にも変化が見られます。カーソルとより一致し、

[01:57 - 02:00]
他のものとより一致しています。

[01:58 - 02:01]
Replace のような企業は、

[02:08 - 02:13]
今のところコード生成のデフォルト モデルとして最適だと考えているため、その点に注力しています。そのため、

[02:10 - 02:15]
Cloud Code と呼ばれるツールもリリースしました。これは、

[02:17 - 02:23]
ターミナルで使用できるソフトウェア開発エージェントのようなものです。

[02:20 - 02:25]
つまり、基本的にアプリケーションの作成や変更を依頼したり、

[02:25 - 02:29]
GitHub にコミットしたり、デプロイしたりできます。Cursor

[02:29 - 02:35]
や GitHub

[02:32 - 02:38]
Co-pilot、Wind Surf などの現在の Cy ツールでできることはすべて実行できます。これは非常に

[02:35 - 02:39]
優れたアプリケーションですが、正直なところ、

[02:38 - 02:41]
既存のツールの方がはるかに

[02:39 - 02:44]
優れています。これは、

[02:44 - 02:48]
開発者がシステム

[02:45 - 02:50]
上のエージェントとどのようにやり取りしているかをより深く理解するための CLA の試みであり、

[02:50 - 02:54]
今後さらに発展する可能性もありますが、現時点では

[02:52 - 02:58]
パスします。

[02:54 - 03:01]
簡単にテストしたところ、

[02:58 - 03:04]
他のツールの基本バージョンにすぎないようです。

[03:01 - 03:05]
この

[03:04 - 03:08]
種のコンテンツに興味がある場合は、Switch Dimension をチェックしてみてください

[03:05 - 03:09]
。  comom、

[03:09 - 03:13]
AIを使って素早く何かを作るためのコミュニティコースがあります。ニュースレターもありますので、

[03:13 - 03:18]
メールアドレスを登録していただければ、AIを使った

[03:16 - 03:21]
ソフトウェア開発の新しいツールや新しいアプローチに関する最新情報をお届けします。

[03:21 - 03:24]
そこで今回は少し趣向を変えて、

[03:22 - 03:26]
スピードランに挑戦してみます。

[03:24 - 03:29]
いつものルール、

[03:26 - 03:31]
準備、余分な管理ファイルは

[03:29 - 03:35]
すべて捨て、

[03:31 - 03:37]
clae 3.7でVibeコードを実行して、余分なヘルパーなしで

[03:35 - 03:40]
ネイティブに動作する様子を実際に確認します。Nextjsを

[03:42 - 03:47]
使って小さなアプリケーションを構築し、どのように連携するかを確認します。

[03:47 - 03:52]
右側にAIタブがあります。

[03:52 - 03:57]
カーソルはまだ最新バージョンではありませんが、46です。現在はローリングアップデート中です。

[03:57 - 04:01]
このビデオをご覧いただく頃には、

[03:59 - 04:03]
チャットとComposerが

[04:01 - 04:06]
統合され、どちらかを選択できるようになる点がお分かりいただけると思います。

[04:03 - 04:08]
チャットは、

[04:08 - 04:13]
プロジェクトについてお話ししたいのですが、必ずしも

[04:10 - 04:15]
大きな変更を実装するわけではありません。これは、

[04:13 - 04:17]
次に何をするかを決めたり、

[04:15 - 04:19]
ファイルがどこに保存されているか、

[04:17 - 04:22]
プロジェクトがどのように機能するかを尋ねたりするためのものです。特定のComposer Agentは、

[04:22 - 04:27]
変更を適用したり、フォルダーを作成したり、

[04:24 - 04:28]
ディレクトリを作成したり、ターミナルコマンドを実行したりする場所です。この

[04:28 - 04:34]
2つの違いを理解していただくために、

[04:30 - 04:36]
WSLで

[04:34 - 04:39]
作業していること、そしてabuntoを使用していることを確認します。私はWindows

[04:36 - 04:43]
マシンで作業しており、Linux環境を構築するためにWSLを使用しています。さて、

[04:39 - 04:46]
これで

[04:43 - 04:48]
WSLのセットアップが完了しました。CLA

[04:49 - 04:54]
37-testというフォルダーをもう一度開いてみましょう。

[04:52 - 04:56]
このフォルダーが開いていることを確認し、WSL

[04:54 - 04:58]
でフォルダーを再度開くように求められます。WSLを

[04:56 - 05:01]
使用している場合、

[04:58 - 05:03]
セットアップが完了し実行されていることが重要です。Macを使用している場合は

[05:01 - 05:06]
問題ありませんし、

[05:03 - 05:08]
Linuxを使用している場合も問題ありません。

[05:08 - 05:12]
普段から

[05:10 - 05:14]
これをすることをお勧めします。プロジェクトの準備方法に関するビデオはたくさんあります。

[05:14 - 05:19]
最近、

[05:16 - 05:21]
プロダクトマネージャー、UX

[05:19 - 05:22]
デザイナー、ソフトウェアアーキテクトの3人の専門家を活用して

[05:21 - 05:24]
仕様書を作成し、プロジェクトを

[05:22 - 05:26]
開始する方法についての講演で優勝しました。また、プロジェクトがRails上で動作するように

[05:24 - 05:29]
ルールを実際に適用する方法についてのビデオもあります。

[05:29 - 05:34]
しかし、今回は3.7の真の雰囲気

[05:31 - 05:35]
テストにしたいので、それらはすべて捨てて、

[05:35 - 05:41]
モデルの使用に特化します。

[05:41 - 05:48]
音声メモを取るためのNextJSアプリケーションを開発したいと思っています。

[05:48 - 05:54]
考えを入力する入力ボックスを用意し、

[05:52 - 05:57]
その考えが音声で録音され、

[05:54 - 06:00]
ボックス内でテキストに変換されます。

[05:57 - 06:03]
そして、その考えを保存して

[06:00 - 06:07]
後でアクセスできるようにします。これは

[06:03 - 06:10]
XJSアプリケーションになります。Super Baseを使用するのが好きで

[06:07 - 06:13]
、他に特に要件はありません。

[06:13 - 06:18]
この種のアプリケーションをセットアップするのに良いと思うものは何でも構いません。

[06:18 - 06:22]
皆さんの意見をお待ちしています。次に、もちろん、

[06:22 - 06:27]
clae

[06:24 - 06:29]
3.7を選択して、実際に適用します。

[06:27 - 06:31]
これは最初は考えていたモデルなので、

[06:33 - 06:38]
始める前によく考えてみてください。通常は

[06:35 - 06:40]
チャットでこれを行い、その後

[06:38 - 06:42]
Composerに切り替えることになります。あなたのバージョン、あるいは

[06:40 - 06:44]
新しい46バージョンでは、

[06:44 - 06:48]
チャットウィンドウで会話が行われ、

[06:46 - 06:50]
最適なアプローチが検討されます。

[06:48 - 06:52]
特定の決定について何

[06:50 - 06:54]
度もやり取りできます。両者が最適な方法を決めたら、

[06:54 - 06:59]
小さなタブをComposerに切り替えて、実際に

[06:59 - 07:03]
様々なコマンドを実行できるようになります。今のところは

[07:01 - 07:05]
3.7が有効になっていることを確認しています。

[07:03 - 07:08]
有効になっていない場合は、

[07:05 - 07:09]
設定からモデルを選択すると、

[07:09 - 07:14]
アクセスできるモデルのリストが表示されます。第一

[07:12 - 07:16]
印象は、非常に高速でした。

[07:16 - 07:20]
モデルの背後にある考え方がわかりました。これは以前にも

[07:17 - 07:24]
ディープシークR1などで見られましたが、

[07:20 - 07:26]
03 miniでも多少は実現できます。

[07:24 - 07:27]
ここで最終的なメモをもらっています。

[07:26 - 07:29]
つまり、ディレクトリ全体をスキャンして、

[07:29 - 07:34]
作成しようとしているものを作成しようとしているということです。少し野心的ですが、

[07:33 - 07:36]
音声の

[07:34 - 07:38]
書き起こしなどをSuperbaseに保存しようとしているようです。

[07:36 - 07:41]
そこまでする必要はないと思います。

[07:38 - 07:43]
ブラウザAPIを見てみましょう。

[07:41 - 07:46]
最小限の実行可能な製品なので、シンプルにしておき

[07:43 - 07:49]
ましょう。ブラウザAPIを使って

[07:46 - 07:51]
ユーザーからテキストを取得して

[07:49 - 07:53]
テキストボックスに入力し、その

[07:51 - 07:55]
テキストをデータベースに保存するだけです。

[07:53 - 07:57]
音声録音を保存する必要はなく

[07:55 - 08:00]
、書き起こしにWhisper AIを使う必要もありません。

[08:00 - 08:04]
一般的に、

[08:02 - 08:05]
このようなプロジェクトに取り組むときは、

[08:04 - 08:08]
自分の能力を超えたことをしないようにすることが重要です。

[08:08 - 08:12]
ここでも、この速度には本当に感心しました。

[08:09 - 08:13]
非常に速く返ってきたので、

[08:12 - 08:16]
コマンドを実行してみましょう。Turbo Packを使用しますか？

[08:13 - 08:18]
いいえ。

[08:16 - 08:19]
インポートをカスタマイズしますか？いいえ。これで、開発依存関係をすべてインストールしている

[08:19 - 08:23]
ので、YOLOモードを有効にできます。

[08:21 - 08:25]
実際に

[08:23 - 08:27]
すべてのコマンドが実行されます。

[08:25 - 08:28]
楽しみとスピードのために、ここで

[08:27 - 08:30]
これを有効にします。

[08:28 - 08:32]
通常はこれの使用を推奨しませんが、

[08:32 - 08:37]
ここでは雰囲気をテストし、可能性の限界をテストしているので有効にします。

[08:37 - 08:42]
通常はテストして何が起こるかを確認するためにオフにしておくことをお勧めします。

[08:42 - 08:47]
いいと思います。ええと、モデルは

[08:45 - 08:49]
非常に高速です。

[08:49 - 08:52]
インストールを待つことなく、ディレクトリを検索しましたが、何も見つかりませんでした。

[08:53 - 08:56]
手動で作業する必要があると言われましたが、必要なものはすべて揃っています。

[08:56 - 09:01]
モデルに、もう一度確認すると

[08:59 - 09:04]
すべて揃っていることがわかり、

[09:01 - 09:06]
次のステップに進むことができることを伝えます。

[09:04 - 09:08]
ディレクトリをスキャンして、問題がないか確認しています。

[09:08 - 09:13]
データベースに必要なsuperbaseをインストールしましょう。

[09:11 - 09:15]
パッケージが追加されました。superbaseが

[09:13 - 09:17]
ここに表示されます。

[09:17 - 09:22]
アプリケーションに必要なファイルを作成しましょう。まずはsuperbaseクライアントを起動します。

[09:20 - 09:26]
この

[09:22 - 09:29]
クライアントファイルを新しいライブラリ

[09:26 - 09:32]
ディレクトリに設定し、TypeScriptの観点からノートの型を設定しています。音声テキスト

[09:35 - 09:40]
入力コンポーネントを作成し、

[09:38 - 09:43]
リンティングを使用して、

[09:40 - 09:44]
音声認識が見つからないことがわかったので、

[09:43 - 09:47]
その

[09:44 - 09:50]
問題を自ら解決しようとします。そして、これらの問題は自動的に修正されました。

[09:47 - 09:53]
ありがとうございます。

[09:50 - 09:56]
そして、EnVのローカルサンプルも作成されましたので、

[09:56 - 10:00]
ここにSuperbaseから独自の詳細を入力する必要があります。

[10:00 - 10:04]
そして、Anthropic

[10:01 - 10:06]
への接続時にエラーが発生しています。これは、

[10:06 - 10:10]
現在大量のリクエストが届いていることが原因である可能性があります。

[10:08 - 10:12]
そのため、それを待っている間に、

[10:12 - 10:17]
Superbaseの詳細を取得します。Superbaseを初めて使用する場合は、

[10:14 - 10:19]
基本的にオープンソースの

[10:17 - 10:22]
サービスとしてのバックエンドで、

[10:19 - 10:24]
PostgreSQLデータベースサーバーをローカルで実行することも、

[10:22 - 10:26]
クラウドサービスを介してクラウドで実行することもできます。

[10:24 - 10:28]
認証機能など、

[10:26 - 10:30]
非常に多くの機能が提供されており、非常に

[10:28 - 10:32]
便利です。

[10:30 - 10:34]
ウェブアプリをより速く簡単に開発できます。Firebase、

[10:34 - 10:38]
Planet scaleなど、他にもたくさんのツールがあります。これは

[10:36 - 10:39]
私がよく使うツールです。プロジェクトを作成し

[10:38 - 10:41]
ましょう。このプロジェクトを

[10:41 - 10:50]
clae 37 testという名前にします。

[10:47 - 10:52]
パスワードも設定します。

[10:50 - 10:55]
その後、すべて削除します。

[10:52 - 10:57]
新しいプロジェクトを作成します。ここで再開をクリックすると、

[10:57 - 11:01]
データベースに必要なsuperbaseのインストールが開始されます。

[10:59 - 11:04]
これはYOLOを有効にすると発生する危険性です。

[11:01 - 11:06]
ほとんど追いつけません。

[11:04 - 11:08]
ちょうど

[11:06 - 11:10]
myvファイルを作成していたところでしたが、少し先走ってしまいました。これはかなり

[11:08 - 11:13]
すごいことです。実際に

[11:10 - 11:15]
警告を拾って

[11:13 - 11:17]
修正してくれたので、大丈夫です。それでは、

[11:15 - 11:20]
アプリケーションに必要なファイルを作成しましょう。superbase

[11:17 - 11:23]
クライアントファイルを作成しましょう。EnV

[11:20 - 11:24]
ローカルファイルを作成し、

[11:23 - 11:26]
古い値を再生します。なんと、自動的に完了しまし

[11:24 - 11:29]
た。まさにそれをやろうとしていたところです。

[11:26 - 11:33]
では、アプリケーション用のメモアプリを作成し

[11:29 - 11:36]
、メモAPIサービスを作成しましょう。

[11:33 - 11:38]
DETテキストフック、ああ、

[11:36 - 11:39]
どうも追いつけないみたいで、

[11:38 - 11:41]
こんなエラーが出ています。エン

[11:39 - 11:43]
トロピックへの接続に問題があります。

[11:41 - 11:44]
一時的なものかもしれません。もう一度お試しください。

[11:43 - 11:48]
その間に、

[11:48 - 11:51]
セットアップしたスーパーベースインスタンスに戻りましょう。

[11:49 - 11:53]
上部に小さな

[11:51 - 11:55]
接続ボタンがあるので、それをクリックして

[11:53 - 11:58]
アプリフレームワークに移動し、

[11:55 - 12:00]
nextjsをクリックします。

[12:00 - 12:04]
必要なものはすべて既に貼り付けられています。

[12:02 - 12:08]
これをコピーして貼り付けました。

[12:04 - 12:11]
匿名キーとURLが含まれています。

[12:08 - 12:13]
ここで再開を試みます。それでも

[12:11 - 12:14]
このエラーが出ます。

[12:13 - 12:17]
問題が発生しているので、もう一度試してみます。

[12:14 - 12:18]
これはおそらく

[12:17 - 12:20]
この新しいモデルの初期段階の問題です。また、

[12:20 - 12:25]
現在大量のトラフィックが発生している可能性があります。

[12:22 - 12:28]
少しおかしな状態になっているようです。補完が

[12:28 - 12:34]
最後の補完データベースから切断されています。

[12:31 - 12:36]
スーパーベースがインストールされました。

[12:34 - 12:38]
ここで補完が抜けているようです。これは

[12:36 - 12:41]
本当に奇妙で、

[12:38 - 12:42]
半分思考モデルが返されます。これは、ここで思考モデルを

[12:41 - 12:44]
使用しているだけかもしれません。

[12:44 - 12:50]
通常のモデルに戻したほうがよいでしょう。

[12:48 - 12:53]
ええ、それは私のミスです。

[12:50 - 12:56]
ここで実行を完了させます。

[12:53 - 12:58]
とにかくここを通り抜けて、

[12:56 - 12:59]
何が起こったのか正確にはわかりません。

[12:59 - 13:06]
今のところはこれらの変更を受け入れて、Limで実行して結果を確認しましょう。Claude

[13:02 - 13:10]
に行って、

[13:06 - 13:12]
npm run Devを押すと、開発

[13:10 - 13:14]
サーバーが起動します。Returnキーを押すと、

[13:12 - 13:17]
Local Host 3000が表示されます。

[13:14 - 13:18]
それをクリックします。

[13:17 - 13:20]
ここで進捗状況が表示されます。

[13:18 - 13:21]
何らかのインターフェースがあり、メモの

[13:20 - 13:24]
取得に失敗したことが示されています。これは問題ありません。

[13:21 - 13:27]
まだデータベースに完全に接続されていません。

[13:24 - 13:29]
ここでもう1つのエラーが発生しています。「

[13:27 - 13:31]
error failed fetch notes」というエラーです。これは

[13:29 - 13:33]
今のところ問題ありません。次に

[13:31 - 13:36]
APIが機能しているかどうかを確認します。  「

[13:33 - 13:39]
Start listening」をクリックすると、

[13:36 - 13:41]
1、2、3、ブラウザAPIのテストが始まります。これは

[13:39 - 13:42]
なかなかクールですね。

[13:41 - 13:45]
暗くて見えないかもしれませんが、

[13:42 - 13:46]
基本的にはテキストが入力されています。「

[13:45 - 13:50]
Save note」をクリックすると、

[13:46 - 13:52]
おそらく別のエラーが表示されるでしょう。それほど

[13:50 - 13:54]
悪くはありません。ここでは、通常インストールするようなShad CNのようなものは使用していません。

[13:54 - 13:58]
定義していませんが、まあまあのスタートです。Replate

[13:58 - 14:04]
やBoltなどから得られるものと似たようなものが

[14:02 - 14:07]
あります。

[14:04 - 14:11]
もう少し進めてみてはどうでしょうか。そこで、

[14:07 - 14:13]
Clae 3.7 Sonetに切り替えてみます。

[14:11 - 14:15]
この2つのモデルの違いは、

[14:13 - 14:19]
3.7は基本的に標準ベース

[14:15 - 14:22]
モデルで、3.7 Sonetの思考は

[14:19 - 14:23]
段階的な拡張思考モデルです。

[14:23 - 14:28]
私の理解する限りでは、ほぼ同じものです。ただ、

[14:26 - 14:30]
2番目のモデルでは、段階的な推論と思考を行うための時間がより多く与えられています。つまり、答えを返す

[14:30 - 14:34]
前に、段階的に進むことができるということです。

[14:32 - 14:36]
唯一の違いは、

[14:34 - 14:38]
違いは、

[14:36 - 14:40]
許容される時間の長さです。今のところは、

[14:38 - 14:43]
この方法を使い続けることに

[14:40 - 14:46]
します。ハイブリッド

[14:43 - 14:48]
モデルでは、実際にはどの方法を使用するかが自動的に決定されますが、それが

[14:48 - 14:51]
カーソルに必ずしも適用されているかどうかはわかりません。

[14:50 - 14:54]
このバージョンのモデルを試してみます。

[14:54 - 14:59]
それから「再開」をクリックします。構築を続けます。

[14:59 - 15:03]
アプリのメインコンポーネントを作成します。メインページのコンポーネントがない状態から始めます。

[15:03 - 15:08]
コンテキストをチェックせずに

[15:05 - 15:10]
先へ進むと、すべてのステップが最初からやり直されます。

[15:10 - 15:16]
そこで、これを完全に停止し、

[15:12 - 15:17]
すべてが正常だったチェックポイントまで戻ります。

[15:17 - 15:23]
この時点に戻りましょう。

[15:21 - 15:26]
これは

[15:23 - 15:29]
カーソルのネイティブ復元機能です。通常は、

[15:29 - 15:33]
Gitのコミット機能を使用する方が

[15:31 - 15:35]
信頼性が高いため、より適していますが、今回はとにかく

[15:33 - 15:38]
実行します。すべての

[15:35 - 15:40]
変更を元に戻します。元のインターフェースに戻ります。

[15:44 - 15:50]
ブラウザで正常に動作していることを確認したら、ポップアップしてみましょう。

[15:46 - 15:51]
こちらも問題ないようです。

[15:50 - 15:53]
では、このエラーが発生しているという事実を指摘します。

[15:54 - 15:59]
このようにエラーのスクリーンショットを撮ります。次に、

[15:57 - 16:02]
Curveに戻ります。Cloud

[15:59 - 16:05]
3.7 Sonet でエージェントモードになっています。

[16:08 - 16:13]
メモを保存しようとしたときにこのエラーが発生しました。

[16:11 - 16:15]
データベースへの接続が

[16:13 - 16:16]
正常に機能しているかどうかを確認しましょう。スクリーンショットを貼り付けて

[16:16 - 16:20]
送信をクリックします。インストールの確認を求められます。

[16:20 - 16:25]
ターミナルをポップアップして、

[16:22 - 16:27]
y を設定して続行します。おそらく、

[16:27 - 16:32]
Super Base のインストールを再度試みるのは3回目です。これが、

[16:29 - 16:34]
YOLO が必ずしも好きではない理由です。

[16:32 - 16:37]
私にとってはあまりにも速く進みすぎます。

[16:34 - 16:40]
モデルをその場で修正できるようにしたいので、

[16:40 - 16:43]
データベースを参照する必要があると通知されます。 まあ、おそらく何も入っていないでしょうから、

[16:43 - 16:50]
このファイルをコピーして、

[16:47 - 16:54]
Superbaseインスタンスに移動します。SQLエディタ

[16:50 - 16:57]
に移動して、

[16:57 - 17:03]
これを貼り付けます。SQLを使用して

[17:01 - 17:06]
データベースに必要なテーブルを作成します。

[17:06 - 17:11]
実行してみましょう。実行すると成功と表示されます。

[17:09 - 17:14]
テーブルエディタに移動すると、

[17:11 - 17:16]
Notesテーブルがあります。

[17:14 - 17:19]
必ずしも何も入っているわけではありません。手順に戻りましょう。テーブルの作成を

[17:19 - 17:25]
確認する必要があると表示され、

[17:25 - 17:29]
XJSアプリケーションを再起動するように指示されています。ただし、軸トークン

[17:28 - 17:31]
に関するエラーも表示されましたが、これについては

[17:31 - 17:34]
何も指示されていないため、何もしません。

[17:32 - 17:37]
再起動するように指示されたので、

[17:34 - 17:40]
OKをクリックします。Notesがない場合は、はい、

[17:37 - 17:42]
次にテスト1、2、3、テストと入力します。

[17:40 - 17:43]
そこにあります。

[17:42 - 17:47]
非常に見にくいですが、「

[17:43 - 17:50]
メモを保存」をクリックすると、保存されたと表示されます。

[17:47 - 17:54]
素晴らしいですね。データベースに移動して

[17:50 - 17:57]
保存すれば準備完了です。これは

[17:54 - 18:00]
非常に速く、非常に印象的です。では、

[17:57 - 18:01]
スタイルクレジットを確認してみましょう。

[18:01 - 18:07]
インターフェースの更新がうまくいっているかどうか確認してみましょう。スクリーン

[18:04 - 18:10]
ショットを撮ってみましょう。

[18:07 - 18:13]
このバージョンをこのようにスクリーンショットします。

[18:10 - 18:15]
カーソルに戻ってここにポップインします。

[18:15 - 18:22]
これをダークモードにしましょう。

[18:19 - 18:26]
アクセントカラーは

[18:22 - 18:29]
黄色にしましょう。コンポーネントの

[18:26 - 18:31]
スタイルにはShad CNのようなものを使ってみましょう。Claude

[18:34 - 18:39]
3.5以前でShad CNを使ったことがあるか聞いてみるのも面白いでしょう。常に

[18:37 - 18:41]
古いコマンドを使ってセットアップするため、

[18:39 - 18:43]
面倒で混乱を招くことがあります。

[18:43 - 18:47]
新しいバージョン

[18:46 - 18:50]
のコマンドと新しいモデルを認識できるかどうかはわかりません。

[18:47 - 18:52]
トレーニングの締め切り日はいつだったかわかりませんが、

[18:50 - 18:55]
とりあえず試してみましょう。Shad

[18:52 - 18:58]
CNをインストールしようとしています。

[18:55 - 19:00]
初期化しようとしています。これが 間違った

[18:58 - 19:03]
コマンドなので、残念ながらこの新しいモデルでも

[19:00 - 19:04]
まだこの問題に直面していますが、

[19:03 - 19:07]
どのように修正されるかを確認したいので、

[19:07 - 19:10]
モデルを修正してここで停止します。

[19:08 - 19:13]
正しいインストール方法は、

[19:10 - 19:16]
MPXでShad CNを遅くともインストールし、「

[19:13 - 19:18]
送信」をクリックすることです。通常、

[19:16 - 19:21]
この問題を回避する方法と、ルールのビデオで行った方法は、

[19:21 - 19:25]
ここでプロジェクトルールと呼ばれるルールを作成し、

[19:25 - 19:30]
Shad CNをインストールするたびに

[19:28 - 19:31]
正しいコマンドを使用するように指定するルールを追加できますが、

[19:30 - 19:33]
残念ながら

[19:31 - 19:35]
常に正しいとは限らないため、注意する必要があります。

[19:33 - 19:37]
それでは、これをインストールする必要があります。

[19:35 - 19:40]
はい、これで

[19:37 - 19:42]
変更がすぐに反映されます。私は

[19:42 - 19:48]
一つ一つをステップ実行して確認していません。

[19:44 - 19:51]
これはスピードランとVibeコーディング

[19:48 - 19:53]
セッションとして扱っています。10回中9回は正しく実行されます

[19:51 - 19:56]
が、その

[19:53 - 19:58]
1回で

[19:56 - 20:01]
コードベースがめちゃくちゃになる可能性があります。常にコミット機能を使用して

[20:01 - 20:05]
進捗状況を保存してください。

[20:03 - 20:07]
ここではCUはまだやっていませんが、ただ

[20:05 - 20:10]
突き進んでいます。しかし、私が他の動画

[20:07 - 20:12]
で紹介している手順やチュートリアルに従えば、

[20:14 - 20:18]
AIを使ったアプリ開発に役立つSwitch Dimensionコースのリンクを

[20:17 - 20:20]
説明欄に貼っておきます。変更を

[20:18 - 20:22]
スタッシュするためのベストプラクティスについて説明している

[20:20 - 20:24]
ので、何か問題が起きても元に戻すことができます。

[20:22 - 20:27]
さて、ここはどこでしょうか。

[20:24 - 20:29]
いくつかリンティングエラーがあり、

[20:27 - 20:31]
それを修正しようとしています。そして、

[20:29 - 20:34]
ボタンカードとテキストエリアカードをインストールしようとしています。このまま進めていきましょ

[20:37 - 20:42]
う。ここまで一気に進み、最初は成功した

[20:40 - 20:44]
にもかかわらず、何度かsonorのインストールを試みているようです。

[20:46 - 20:50]
ここではコンテキストの問題のようです。sonorは既に何を行ったかを完全に認識していません。

[20:48 - 20:52]
この場合は、

[20:50 - 20:55]
問題は発生していませんが、その後、

[20:52 - 20:58]
独自のウィンドウを開いて、

[20:58 - 21:03]
全く新しいポートで開発サーバーを実行しようとしました。

[21:01 - 21:07]
既に別のポートで実行されていました。

[21:03 - 21:08]
気づいていませんでしたが、

[21:07 - 21:11]
ここはすごい速度で動いていますが、

[21:08 - 21:15]
速すぎて使い物にならないかもしれません。Local Host 3000に行って、

[21:15 - 21:22]
この速度で動いているかどうか確認してみましょう。

[21:19 - 21:25]
いいですね。全然悪くないですね。

[21:22 - 21:27]
ちょっと頭を動かして、

[21:27 - 21:33]
何が起こっているのか少しプレビューしてみましょう。音声メモアプリがあります。

[21:29 - 21:35]
ここで

[21:33 - 21:37]
ネイティブリスニング機能を使ってみます。

[21:37 - 21:43]
このボタンを押します。Clae 3.7 Sonetをテストしています。今のところかなり

[21:43 - 21:49]
感銘を受けています。カーソルで完璧に動作しているかどうか100%確信はありません。

[21:49 - 21:53]
コンテキストの問題がいくつかあります。

[21:51 - 21:55]
応答に多くのフォーマットエラーが表示されていますが、

[21:53 - 21:57]
通常はティーチングエラーです。

[21:55 - 21:59]
他のモデルが導入されたときにこのようなことが起こるのを見たことがあります。

[21:59 - 22:03]
カーソルチームとエントロピックチームは、

[22:01 - 22:07]
通常、この問題にかなり早く追いつきます。

[22:03 - 22:10]
最初の

[22:07 - 22:13]
スピードランでは判断が難しいですが、全体としては、

[22:13 - 22:18]
Superbaseに接続された動作するアプリが非常に簡単に作成されました。 短時間な

[22:16 - 22:19]
ので、それだけで良い兆候です。

[22:19 - 22:25]
では、聞くのをやめて、「

[22:22 - 22:28]
メモを保存」をクリックします。そうそう、これで

[22:25 - 22:32]
メモが保存されました。これは素晴らしいですね。

[22:32 - 22:39]
データベースを開くと、ユニーク

[22:37 - 22:43]
IDとコンテンツがあり、

[22:39 - 22:46]
タイムスタンプで作成されています。これはかなり

[22:43 - 22:47]
印象的です。おそらく40分ほどかかりましたが、

[22:47 - 22:51]
ビデオを録画していなければもっと短くできたかもしれません。

[22:53 - 22:58]
皆さんに分かりやすくするために、推論時間を少し短縮しました。でも、

[22:56 - 23:01]
私は本当に感心しています。

[22:58 - 23:05]
本当に速く動きます。Clae 3.5のような感じです

[23:01 - 23:08]
が、少しだけ優れています。「

[23:05 - 23:10]
スムーズ」という言葉がぴったりだと思います。エラーは

[23:08 - 23:13]
それほど多くなく、少しだけスムーズに動作しました。

[23:13 - 23:17]
少しぎこちない箇所がいくつかありましたが、これは

[23:18 - 23:23]
カーソルと新しいモデルの関係によるものだと思います。

[23:20 - 23:25]
おそらく、私が45を使用しているからでしょう。

[23:23 - 23:27]
46はまだですが、そういったことは通常

[23:25 - 23:32]
解決されるので心配はしていません

[23:27 - 23:34]
が、モデルに10～15%の違いを感じています。

[23:34 - 23:38]
この

[23:37 - 23:41]
程度の差で、前進するのがずっと

[23:38 - 23:43]
スムーズで速くなるので、とても励みになり、ワクワクしています。

[23:43 - 23:49]
AIを使ってこれらのアプリを構築すると、多くの時間が節約されます。今後、

[23:50 - 23:56]
6ヶ月後、1年後にはどうなるでしょうか？

[23:53 - 24:00]
これらの新しいモデルで私が非常に興奮しているのは、

[24:00 - 24:07]
追加のコンピューティング能力が効果を発揮することが実証されていることです。Grock

[24:03 - 24:10]
3は

[24:07 - 24:13]
大量の追加のコンピューティング能力を適用することで前進し、

[24:10 - 24:15]
イーロン・マスクは

[24:15 - 24:20]
短期間でサーバーファームを構築できるという驚くべき能力を発揮しました。

[24:17 - 24:22]
また、Anthropicからも同様の飛躍が見られます。

[24:20 - 24:25]
さらに、

[24:22 - 24:28]
段階的に拡張された

[24:25 - 24:30]
時間思考を可能にするハイブリッドモデルのアイデアも、私たちの進歩を後押ししています。

[24:30 - 24:35]
強化学習が多く利用されていると思われます。これは、

[24:35 - 24:41]
STEMコーディングなど、

[24:39 - 24:43]
実証済みの出力が得られるモデルに非常に役立ちます。つまり、

[24:43 - 24:48]
これらのモデルで強化学習を使用すると、

[24:45 - 24:50]
定義された答えが何であるかがわかり、その

[24:48 - 24:52]
答えを使って

[24:50 - 24:54]
モデルをトレーニングし、

[24:52 - 24:56]
改善していくことができます。 他の分野ではそれほどうまく機能しませんが、

[24:54 - 24:58]
コード補完コード開発などの分野では

[24:58 - 25:03]
絶対的な勝利であり、

[25:00 - 25:06]
ソフトウェアエンジニアリングベンチマークで多くの飛躍が見られるのはそのためです。Anthropic

[25:06 - 25:10]
Cloudのプロフェッショナルプランをお持ちの場合は、

[25:10 - 25:16]
このモデルの拡張バージョンと通常バージョンにアクセスできます。

[25:13 - 25:17]
通常バージョンは非常に高速な推論で、

[25:16 - 25:19]
非常に迅速に返答します。

[25:17 - 25:21]
拡張バージョンはほぼ同じ

[25:19 - 25:23]
モデルで、尋ねた

[25:21 - 25:25]
質問について少し長く考え、

[25:25 - 25:32]
ハイブリッドモードで質問にどのモードで応答するかを決定します。

## コメント

### 1. @cjaeger (👍 16)
Great intro just getting my feet wet with Cursor, excited to build an application with what I've seen you do here. After being a frontend/full stack dev for 10years. Coding has been refreshed... it's fun again

> **@RobShocks** (👍 1): This the way. And why I'm getting to build more projects than I have in years.

> **@Ant-ym3mw** (👍 0): I know some of my devs use it all the time

> **@kurushimee** (👍 0): Can agree. Using AI for programming has been a nice refreshment; it's genuinely fun to use. And, well, besides just being fun, it also genuinely makes me more productive doing actual work.

### 2. @zhalberd (👍 25)
Ha! I actually thought you were coding with a VR headset and I was like “This dude is really vibing!” Thanks for this video. As usual, crushing it Rob. 👍🏻

> **@RobShocks** (👍 8): @@zhalberd that’s actually not a bad idea, I’ll put it on the list. Cheers mate.

> **@Overlanding_America** (👍 0): he really had me for a second there, i was like holy crap this guy is deeeep in the sauce haha! Thanks for the great video @RobShocks

### 3. @birdofprey108 (👍 59)
Biggest problem is its ability to keep consistent, thoughtful context and attention. It's fun for small projects but when things get complex you can't really take your eyes off anything it's doing.

> **@JTBCOOL1** (👍 8): 100% agreed. Someone told me that every 2 hours they have to refresh the model's memory as it loses memory of the context. He said he summarizes and refreshes the chat. I been having the same exact problem you have been facing, and after 10 hours of work, the model just completely gets everything wrong and progress is lost in a sense.

> **@joaopedropurcinelli6918** (👍 8): You should use new chats at every 5 to 10 requests, depending on the size of context. Of course it won’t work for 10 hours straight in one chat, what the hell

> **@ithinkin10** (👍 0): @@joaopedropurcinelli6918 does the chat history get referenced in new chats or do you summarize your  previous chat and give it the summary as the first command in the new chat? Thanks in advance!

> **@antoniofuller2331** (👍 0): Naw, not really. We're just gonna do vibe check

> **@JaredDoyle76** (👍 5): Learn better prompting. Not a directed criticism, but I've seen vastly better results after changing my approach to prompting.

### 4. @techsass (👍 9)
just started using cursor with claude 3.7 last week and my productivity is insane now. built an entire inventory app in like 2 hours that woulda taken me days before. coding actually feels fun again instead of a grind 👍

> **@solopathway-m8d** (👍 0): can we link up

### 5. @dn-dev (👍 2)
As a Front-End developer, this is insane!

> **@RobShocks** (👍 1): It really is a big difference

### 6. @krasimirhristov6757 (👍 15)
I love this new developer tool. Guys, we are in the developer's heaven in 2025.

> **@RobShocks** (👍 2): 100%

> **@paca3107** (👍 0): i don't think so. there are a lot of issues in the long term of using these tools.

> **@krasimirhristov6757** (👍 0): @paca3107  I agree with you, but if we double-check we can work faster than ever  before

> **@paca3107** (👍 1): ​@ it depends, for mvp its great, but for big projects i wouldn't use these tools at all. It's too risky for me and studies only confirm that.

> **@IndefiniteMark** (👍 0): @@paca3107 how come, not challenging you I'm genuinely curious? I have ideas but don't want to tell you things you already know

### 7. @thru_and_thru (👍 2)
Great to find a fellow Irish dev on Youtube. Great vid man, just started using cursor today with Claude 3.7...crazy how good this stuff has gotten so fast.

> **@RobShocks** (👍 0): Failte! Where are you based?

### 8. @yazh17 (👍 1)
This is so awesome, coding will never be the same pretty scary and impressive at the same time

### 9. @PablitoSroczynski (👍 2)
Ive joined the community and the vibe inside is great ! Very recommended for people who looke likeminded passionates 🎉

> **@RobShocks** (👍 1): Great to have you Pablito

### 10. @JulioBenavente-c3p (👍 1)
Thank you for your consistency and great work, Rob! Best of luck!

> **@RobShocks** (👍 0): @@JulioBenavente-c3p Aw thanks Julio, may the force be with you.

> **@JulioBenavente-c3p** (👍 0): @@RobShocks And with you and your family always!

### 11. @Max_Jean (👍 0)
Great vid Rob! Really liked the intro haha

> **@RobShocks** (👍 0): You have to have a keep it light Max :) Thanks

### 12. @youshouldntdothis5747 (👍 2)
People will be able to make their software projects without coding skills. This was unimaginable like 2 years ago wow!

> **@RobShocks** (👍 4): I think it’s great, so many great things to build. With the caveat you don’t need to know code syntax but it will help to know how to structure and manage apps

> **@youshouldntdothis5747** (👍 0): I think so too. Lots of people i know have great ideas but dont want to spend months to learn coding or build an application. But of course like you said, they still need to have some devops skills now for running and maintaining their projects. Well, maybe we will have an ai for it too in the future who knows 😊.@@RobShocks

> **@Squidling991** (👍 0): I would be mad as hell if someone gave me a react application without knowing the inside of the code at all.   Its fine if you understand 50-80% of it. But if ask you about the security of the app would you even know the answer to that ?
Yes the app is working BUT would  this work if you are trying to sell the app to a company without knowing the full extend of what is happening in the background, this could cause a huge legal action or even if you just develop and app then launch it privately on a platform as a money grabber you might find your self sharing sensitive information about your own or someone else's information.
You also need to know coding but you also need to learn the basics of every other aspect that is needed, network, software use , what AI is best for what purpose, What language is best for what use, System integrations and hardware updates. 
As a hobby, Go for it !!!  just be careful when you installing packages and other stuff from the requirement file. it can cause a lot of conflicts.🙃

### 13. @tubaguy0 (👍 1)
Video idea for you, I’d love to see how you organize your code environment and projects.

### 14. @birdofprey108 (👍 1)
"I'm not even sure what it did I'll just accept those changes" haha

### 15. @mountee (👍 1)
Brilliant video. Lots of useful tips

> **@RobShocks** (👍 0): @@mountee Trying to pack them in without overwhelming people, cheers

### 16. @Jorge-z6p6j (👍 1)
I heard many web developers are taking plumbing courses now :)

### 17. @kyjytdka (👍 0)
I really enjoyed the video! But deploying and maintaining a service like this must be a whole different story, right? I don’t know much about coding, but I found it really impressive. Thank you!

> **@RobShocks** (👍 0): Absolutely!! But AI can help with that too. That’s just a set of developer operations that can be programmed too

> **@kyjytdka** (👍 0): @@RobShocks Actually, I don’t know much about this industry, haha. Since it’s the AI era, I just try out new technologies while working part-time. Your channel’s content is really valuable! I’m also planning to study on Udemy.

There was a government-supported employment program for UX/UI, but I decided to cancel it. I feel like the way we work is going to change completely anyway. Another course is opening in July, so until then, I want to study as much as I can.

Honestly, I envy you. I’m already 29, and I used to work in the food industry. The reason I got interested in this field is that I recently lost about 30kg. During that time, I created GPT prompts, linked them to Excel, and used Python’s Matplotlib to visualize my weight trends. I even ran regression analysis to make tracking my weight more fun. I haven’t really seen an app like this yet.

Of course, people can just go to the gym and work out, but I spent about a year and a half stuck at home due to personal struggles. That’s why I want to create a service that interacts with users like a conversation, helping them track and analyze their progress even without going to the gym. My goal is to support socially isolated people through this system. There are many reasons why people become isolated, but often, they feel unconfident because they’re out of shape and have gained a lot of weight. I’ve been there myself.

Anyway, I ended up sharing a lot about myself! Thanks so much for making these videos!

### 18. @Musaddique_MMALI (👍 1)
5:50 How do you audio input?

### 19. @arnoldbhebhe (👍 0)
Great demo!

### 20. @dejangavrilovik2363 (👍 3)
hey appreciate the video, I have just one question: How did you manage to connect voice with cursor's input field for prompting?

> **@freekedeke7** (👍 2): I think he's said before he uses Windows dictation

> **@thomasslynch1** (👍 2): windows its 'voice access'

