# SECRET SAUCE of AI Coding? AI Devlog with Aider, Cursor, Bun and Notion

**チャンネル:** IndyDevDan
**公開日:** 2024-09-09
**URL:** https://www.youtube.com/watch?v=QlUt06XLbJE

## 説明

What's the secret sauce of HIGH OUTPUT AI Coding?

🔗 More AI Coding with AIDER
https://youtu.be/ag-KxYS8Vuw

🚀 More AI Coding with Cursor
https://youtu.be/V9_RzjqCXP8

In this video, we showcase the power of the best AI coding assistants, Aider and Cursor. We use them TOGETHER. Whether you're a seasoned engineer or just starting out, this video is packed with insights and techniques to help you ship more code in less time with AI Coding Assistants.

🔧 What You'll Learn:
- AI Coding Assistants: Discover how Aider and Cursor can handle the heavy lifting for you in a new Bun codebase.
- Boost Productivity: Learn the secret sauce of AI coding that can significantly enhance your engineering productivity.
- Configuration Mastery: Get up and running with Aider across codebases using its dot configuration YAML file.
- TypeScript Tips: Explore efficient ways to manage your TypeScript types and improve your codebase structure.
- Notion API Integration: Watch as we set up a Notion API wrapper class to run CRUD operations on Notion pages.

💡 Key Highlights:
- Prompt Caching & Auto Tests: Enable Sonnet 3.5 prompt caching and auto test flags to streamline your coding process.
- Conventions File: Utilize conventions to guide your AI coding assistant in writing consistent and high-quality code.
- Multi-File Prompts: Leverage Aider's ability to update multiple files simultaneously, ensuring your code is always validated and error-free.
- Real-Time Fixes: See how Aider automatically detects and fixes errors, reducing cognitive load and allowing you to focus on the bigger picture.

🔥 Why Watch?
- AI Coding Efficiency: Experience the future of coding with AI, where tools like Aider and Cursor enable you to think less about individual lines of code and more about the overall architecture and design.
- Practical Demonstrations: Follow along as we walk through real coding challenges, showcasing the seamless integration of AI coding assistants into your projects.
- Comprehensive Insights: Gain valuable knowledge on how to use AI tools to their maximum potential, preparing you for the next leap in AI capabilities.

🌟 Stay Ahead of the Curve:
- Like and Subscribe: Don't miss out on more insights and tutorials on AI coding, engineering productivity, and the latest in AI technology.

📖 Chapters
00:00 Action Packed AI Coding Devlog
01:04 Configuring Aider for Optimal AI Coding
02:03 Conventions File: Guiding AI Code Generation
02:30 Setting Up the Project Structure
05:12 First Aider Prompt - setup bun main
06:10 Creating the Notion Wrapper Class
07:15 Auto testing with Aider
9:55 Building a CLI Application with Commander
11:13 AI Coding ADD, Delete notion block
13:50 SECRET SAUCE of AI Coding
15:20 Automatic test resolution with Aider
20:15 Multi-file prompting - Get page blocks function
22:17 AI Coding pattern - Documentation as context
25:25 Improving notion blocks - recursion
29:26 Not Aider vs Cursor - Aider AND Cursor
33:52 Use many GenAI Tools not one - think top three
35:12 Reflections on AI Coding and Future Course Announcement

#aicoding #aiprogramming #coding

## 字幕

[00:00 - 00:06]
エンジニアの皆さん、こんにちは。インディーズ開発者のダン

[00:03 - 00:08]
です。今日はアクション満載の AI コーディング開発ログをお届けします。

[00:08 - 00:13]
この AI コーディング セッションについてコメントし、洞察

[00:11 - 00:16]
やテクニックを皆さんと共有します。

[00:13 - 00:19]
最高の AI コーディング アシスタントである AER

[00:16 - 00:23]
とカーソルを使用して、

[00:19 - 00:25]
この新しい bun コード ベースですべての面倒な作業を自動化します。

[00:23 - 00:30]
この 2 つのツールを

[00:25 - 00:33]
一緒に使用して、より多くのコードをより短時間でリリースする方法を紹介します。AI コーディング

[00:30 - 00:36]
の秘訣も紹介します。これは

[00:33 - 00:39]
皆さんが思っているようなものではないかもしれません。それほどクールでも

[00:36 - 00:40]
面白くもないかもしれませんが、

[00:39 - 00:43]
エンジニアとしてのキャリアを積むにつれて、

[00:40 - 00:47]
このパターンを使用すると、

[00:47 - 00:51]
速度と品質の両方でエンジニアリングの生産性が大幅に向上することを学びます。

[00:54 - 01:00]
そこで、コード ベース全体で AER を使い始めるのに

[00:58 - 01:02]
役立つ、本当にクールなことをすぐに共有したいと思います。AER には、

[01:09 - 01:16]
考えられるあらゆるものを効果的に構成できる do 構成 yaml ファイルがあります。

[01:11 - 01:20]
今は、

[01:16 - 01:22]
sonit 3.5 のプロンプト キャッシュを有効にしています。autoc コミットを

[01:20 - 01:24]
無効にしています。私は自分でコミットすることを好みます。

[01:24 - 01:28]
そして今、とても興味深いものを設定しています。

[01:26 - 01:30]
この

[01:28 - 01:32]
テストコマンドと

[01:30 - 01:36]
自動テスト

[01:32 - 01:39]
フラグを設定しています。これが秘密のソースを示唆していますが、これについては

[01:39 - 01:45]
動画の後半で詳しく説明します。ここでさらにフラグを設定しています。

[01:42 - 01:50]
これはAERの非常に優れた機能で、

[01:50 - 01:54]
更新されないreadonファイルを指定できます。プロンプトが表示されても

[01:56 - 02:03]
更新されません。AERの更新オプションには含まれません。そのため、readmeファイルとconventionsファイルを追加します。conventions

[02:03 - 02:07]
ファイルとは何でしょうか？これはAIコーディングツール

[02:04 - 02:11]
で出現している非常に興味深いパターンです。conventionsとは、

[02:11 - 02:17]
AIコーディングアシスタントが

[02:14 - 02:21]
コードを書く際に従うべきルールです。

[02:17 - 02:22]
ここにはマークダウンファイルがあります。

[02:22 - 02:30]
ここでは、

[02:26 - 02:33]
AERがこのコードベースでどのようにコードを書くべきかについて、箇条書きで詳細を記述します。

[02:30 - 02:36]
これがこのAER構成ファイルの優れた点です。AC

[02:38 - 02:44]
クロスコードベースで使用する基本構成ファイルを作成し、

[02:40 - 02:46]
コードベースごとに更新できます。

[02:46 - 02:51]
ここでプロジェクト構造を作成しています。モジュール、テスト

[02:49 - 02:54]
、タイプ

[02:51 - 02:57]
ファイルを作成しました。どのように

[02:54 - 02:59]
処理するのがお好みか、とても興味があります。  TypeScriptの型についてですが、

[02:57 - 03:02]
すべて1つのファイルにまとめていますか？それとも、複数の

[03:02 - 03:08]
機能、論理的なグループ、あるいは

[03:06 - 03:11]
個々のコンポーネントに分散させていますか？下のコメント欄に、コード

[03:14 - 03:20]
ベースでTypeScriptファイルをどのように保存するのがお好みかをお書きください。私は

[03:16 - 03:23]
トップレベルに1つの型ファイルを置くというパターンを使っていますが、

[03:20 - 03:25]
とてもうまくいっています。

[03:23 - 03:29]
検索も簡単で、型も見つけやすいです。LLMも

[03:29 - 03:32]
すべての型を1つのファイルで見つけられるのが気に入っています。

[03:40 - 03:42]
設定を確認してみましょう。

[03:44 - 03:51]
型をファイルの

[03:48 - 03:55]
キーと値のペアに移動し、index.tsも追加しました。これで

[03:51 - 03:59]
AERを起動するたびに

[03:55 - 03:59]
これらのファイルが取得されるようになります。

[04:06 - 04:12]
ここで少しミスがありました。AERの

[04:09 - 04:15]
設定ファイルの名前を間違っていました

[04:12 - 04:18]
。configではなくdo compです。修正後、

[04:15 - 04:20]
AERを再起動できます。これで

[04:18 - 04:23]
プロンプトキャッシュが自動的に

[04:20 - 04:26]
有効になり、規約のreadmeファイルとインデックスファイル、

[04:23 - 04:28]
型ファイルが

[04:26 - 04:30]
コンテキストウィンドウに自動的に追加されているのが確認できます。

[04:28 - 04:33]
素晴らしいですね。次はReadmeを更新して、

[04:33 - 04:37]
設定をフォーマットし直します。特に変わったことはありません。

[04:37 - 04:46]
では、

[04:41 - 04:49]
BDエイリアスを使って新しいウィンドウを開き、

[04:46 - 04:52]
インデックスファイルを起動しました。Bond経由でHelloを取得しました。

[04:49 - 04:54]
これですべてうまくいきました。さて、

[04:54 - 04:58]
Notionクライアントの設定を始めましょう。

[04:56 - 05:02]
ここで何をしているのでしょうか？実際に何を構築しているのでしょうか？

[04:58 - 05:05]
Notion APIラッパークラスを設定しています。

[05:02 - 05:09]
現在開発中の製品では、

[05:09 - 05:14]
Notion PagesでCRUD操作を実行する必要があります。

[05:12 - 05:16]
最初のAERプロンプトを実行します

[05:16 - 05:20]
。index.tsにmainを追加します。これは、アプリケーションのフローを開始する

[05:18 - 05:23]
main関数がある標準的なパターンです。これを

[05:23 - 05:29]
実行し、

[05:27 - 05:31]
実行します。AERは

[05:29 - 05:34]
すぐにその

[05:31 - 05:37]
コマンドを提案します。これを実行すると、

[05:34 - 05:40]
非常にクールなことが起こりました。

[05:37 - 05:43]
自動テストフラグのおかげで、AERは

[05:43 - 05:48]
プロンプトの後に自動的にBUNテストを実行しました。これは非常に強力な

[05:46 - 05:52]
パターンです。このAIコーディング開発ログを進めていくと、これが

[05:48 - 05:53]
どれほど効果的かがわかります。

[05:55 - 05:59]
ここでいくつか追加ファイルを

[05:58 - 06:04]
作成します。  Notionモジュールは、

[05:59 - 06:06]
Notionラッパークラスのロジックをすべて保持します。

[06:04 - 06:10]
これらの2つの

[06:06 - 06:10]
Notionファイルをコンテキストウィンドウに追加しました。

[06:12 - 06:18]
ここでNotionを更新し

[06:15 - 06:20]
、Notionラッパークラスを作成します。

[06:18 - 06:24]
これは、アプリケーションのライフサイクル全体で再利用できる

[06:20 - 06:26]
Notionクラスを初期化するシンプルなプロンプトになります。

[06:28 - 06:34]
このプロンプトを表示するだけです。

[06:30 - 06:36]
もちろんSonic

[06:34 - 06:40]
3.5を使用しています。トップレベルのコーディング結果を得るには、他に使用できるモデルはありません。

[06:47 - 06:50]
新しいNotionラッパー

[06:50 - 06:58]
クラスができました。素晴らしいですね。次は

[06:54 - 07:01]
テストの設定を始めましょう。

[06:58 - 07:03]
テストの更新コマンドを実行します。

[07:01 - 07:09]
基本的には、gitページを実行するシンプルなBondテストを作成します。

[07:10 - 07:14]
プロンプトを

[07:13 - 07:17]
終了します。

[07:19 - 07:24]
自動テスト設定により、テストが自動的に実行されたことがわかります。

[07:30 - 07:33]
このテストでは、多くのコードがモック化されています。

[07:31 - 07:36]
ここで行うのは、

[07:33 - 07:40]
Notionページ

[07:36 - 07:40]
IDをこのテスト

[07:40 - 07:45]
ファイルに移動することです。Notionでビルドする

[07:43 - 07:47]
ときに、  Notion APIを使用する場合、

[07:45 - 07:50]
常にNotionページIDを指定します。

[07:47 - 07:52]
これをテストとアプリケーションの他の部分の両方で使用するために、

[07:53 - 08:00]
これを新しい定数

[07:57 - 08:03]
ファイルに移動します。これは非常に便利です。AERに

[08:03 - 08:07]
新しい

[08:04 - 08:09]
ファイルを要求できました。ここでエラーが発生しています。これは

[08:07 - 08:11]
それぞれが存在しないためです。

[08:09 - 08:14]
インポートする必要があります。これは単に見落としていたものです。AERは

[08:11 - 08:17]
自動的に変更を修正できるかどうかを確認します。「

[08:17 - 08:21]
はい」と答えると、その特定の問題は修正されました。

[08:23 - 08:30]
ここで別の問題が発生していました。Notionページ

[08:26 - 08:33]
IDが結果IDと一致しようとし

[08:30 - 08:36]
ますが、返されるIDと

[08:52 - 08:57]
一致しません。そこで、このテストを手動で再度実行し、結果を出力します。次に、このコードを更新し、テストを更新します。

[08:54 - 08:59]
レスポンスBLOBを貼り付けます。

[08:57 - 09:01]
このテストの検証対象は特に気にしません。

[09:03 - 09:10]
何かに対して検証したいだけなので、

[09:06 - 09:14]
そのオブジェクトをAERに渡します。

[09:10 - 09:16]
テストを更新して

[09:14 - 09:17]
修正します。より正当なものに対して検証するようになります。

[09:19 - 09:25]
ページの絵文字

[09:23 - 09:30]
アイコンと、該当し

[09:25 - 09:32]
ないページの実際のタイトルに対してチェックしているのがわかりますね。

[09:30 - 09:33]
これで完了です。いくつか項目を削除しましたが、

[09:39 - 09:44]
テストを実際に検証するにはそのうちの1つだけが必要です。それでは、index.tsを更新します。

[09:44 - 09:50]
冒頭で再利用しているパターンに注目してください。update

[09:47 - 09:53]
or create と書いて、その後にファイルのコロンを付け、

[09:53 - 09:56]
そのファイルで

[09:56 - 10:01]
変更したい内容を指定します。これで

[10:01 - 10:08]
index.tsを更新し、

[10:08 - 10:14]
複数のコマンドを実行して

[10:11 - 10:16]
Notion APIラッパーのさまざまな部分をテストできるようなCLIアプリケーションを作成します。

[10:14 - 10:17]
そのためにCommanderを使用します。

[10:16 - 10:20]
これは非常に便利です。Bunが、Bunを追加するか、それとも

[10:17 - 10:23]
AERが

[10:20 - 10:27]
自動的にBunを追加するか尋ねてきます。これは

[10:23 - 10:27]
CLIパッケージです。「

[10:30 - 10:34]
はい」と答えましたが、何らかの

[10:31 - 10:39]
理由で、存在しないgitページリストメソッドも生成されました。

[10:34 - 10:42]
そこで、クリーンアップを実行します。

[10:42 - 10:50]
ここに載っているのは、今回のAIコーディングセッションでおそらく2つある幻覚のうちの1つだと思います。

[10:50 - 10:55]
それでは、

[10:53 - 10:57]
この「ページリストを取得」という

[10:55 - 11:00]
シンプルなプロンプトを削除します。「

[10:57 - 11:01]
ページリストを削除」とだけ言います。

[11:00 - 11:04]
これは他のどこにも存在しないので、

[11:04 - 11:10]
index.tsから削除します。index.tsを変更した

[11:06 - 11:12]
ので、このファイルをリロードする必要があります。

[11:12 - 11:16]
新しいCommander CLIアプリケーションで更新されたバージョンがあります。これも

[11:16 - 11:22]
見栄えが良いですね。このAIコーディングプロンプトパターンを再利用します。

[11:19 - 11:25]
アクションと

[11:22 - 11:27]
ファイルを指定して、

[11:25 - 11:30]
そのアクションで何を実行したいかを記述します。「

[11:27 - 11:32]
広告テキストを作成」と言っているのですが、

[11:30 - 11:35]
関数のような構文を使用しています。

[11:32 - 11:39]
これは非常に重要です。

[11:35 - 11:42]
親ブロックのTypeScriptタイプを指定します。

[11:39 - 11:45]
また、「テストを更新」も指定しています。

[11:42 - 11:47]
これは本当に

[11:45 - 11:50]
素晴らしいですね。Aderがここですべての面倒な作業を代わりに行ってくれます。

[11:47 - 11:53]
複数のファイルを同時に更新します。

[11:50 - 11:57]
私たちがしたのは、2文のプロンプトを作成しただけです。実際には

[11:57 - 12:03]
1.5文くらいです。これは素晴らしいですね。ええと、もう一度、

[12:03 - 12:08]
このパターンに注目してください。 テストは

[12:05 - 12:11]
自動的にパスします。新しいテストを作成しました。

[12:08 - 12:13]
コードは実行中のすべてのプロンプトで検証されます。

[12:13 - 12:17]
ご存知のとおり、これはまだ

[12:16 - 12:19]
始まったばかりです。メソッドは 2 つしかありません

[12:17 - 12:21]
が、このパターンはすでに多くの作業を行っています。

[12:19 - 12:25]
ここでは、

[12:21 - 12:32]
Notion ページで、広告テストが

[12:25 - 12:32]
実際に新しい Notion ブロックを作成して

[12:52 - 12:59]
いるのがわかります。ここで、2 つを同時に実行してみます。少し競合エラーが発生しました。連続して実行する適切な bash コマンドかどうかさえわかりませんが、それでも新しい広告コマンドはうまく

[12:55 - 12:59]
機能しています。Notion

[13:02 - 13:09]
と CLI

[13:06 - 13:12]
アプリケーションを行ったり来たりしていますが、これは主に

[13:09 - 13:14]
別のキーワードを使用していることを示すためです。この mirror

[13:12 - 13:16]
キーワードは、

[13:14 - 13:20]
以前のコーディング開発ログでも説明しましたが、

[13:16 - 13:22]
パターンを複製するのに非常に便利です。ここでは、

[13:22 - 13:29]
ブロック削除コマンドと関数が必要なので、

[13:27 - 13:35]
これを

[13:29 - 13:37]
C と Notion で更新します。  TS Notion Rapper

[13:35 - 13:38]
クラスですが、テストが作成されていないことに気づきました。

[13:37 - 13:41]
まだ

[13:38 - 13:44]
テストは2つしかありません。そこで、

[13:47 - 13:52]
もう一度プロンプトを表示して、削除用のテストを作成するように指示します。このパターンは

[13:50 - 13:55]
多くの作業を実行してくれていることがわかります。プロンプトが表示されるたびに、

[13:52 - 13:57]
すべてのテストが実行され、

[13:55 - 14:01]
コードが自動的に検証されます。

[13:57 - 14:04]
これがAIコーディングの秘訣です。

[14:01 - 14:08]
将来的には、

[14:09 - 14:16]
テストを使用して

[14:14 - 14:17]
正常に動作していることを検証するAIコーディングテストエージェントが多数登場する可能性が非常に高いでしょう。では、

[14:16 - 14:20]
コードが

[14:17 - 14:25]
動作していることをどのように確認するのでしょうか？また、LLMが正しい動作を行ったことを知る最も簡単な方法は何でしょうか？

[14:26 - 14:32]
LLMとエージェントワークフローのフィードバックループは非常に

[14:29 - 14:34]
大きな

[14:32 - 14:37]
未解決の問題ですが、そこには多くの価値があります。

[14:34 - 14:39]
これを解決できれば、

[14:37 - 14:41]
エージェントワークフローははるかに強力になり、

[14:41 - 14:47]
AI

[14:44 - 14:48]
エージェントが自己

[14:47 - 14:51]
検証できるため、製品もはるかに強力になります。これは、

[14:51 - 14:56]
今後AIコーディングアシスタントで見られるパターンになるでしょう。コードを

[14:53 - 15:02]
検証するためのテストを作成できるようになります。

[14:56 - 15:02]
wrote は非常に

[15:09 - 15:13]
強力です。さて、

[15:11 - 15:16]
ここで何をしているかというと、

[15:13 - 15:19]
CLA アプリケーションを更新しているところです。使用方法の

[15:16 - 15:22]
ドキュメントと、

[15:19 - 15:25]
各メソッドの上に使用方法のコメントを表示したいだけです。

[15:22 - 15:29]
ご覧のとおり、

[15:25 - 15:32]
ハッシュタグ記号 (ポンド

[15:29 - 15:34]
記号 AER CAU) をエラーとして使用しており、

[15:32 - 15:38]
自動的に修正してくれます。JST の

[15:34 - 15:41]
世界にいることを認識しているので、スラッシュが必要です。私は

[15:41 - 15:48]
いつも Python と TypeScript を行き来しているので、

[15:44 - 15:48]
言語の境界が少しあいまいになっ

[15:53 - 15:58]
ています。では、

[15:55 - 16:02]
このブロック削除コマンドをテストしてみましょう。Notion

[15:58 - 16:04]
でこのブロック ID をコピーします。

[16:04 - 16:08]
これを実行した後、

[16:06 - 16:09]
実際の ID (最後の

[16:08 - 16:12]
セグメント) を取得します。

[16:09 - 16:14]
実行後、

[16:12 - 16:16]
ブロックが完全に削除されているのがわかるはずです。

[16:14 - 16:17]
この

[16:17 - 16:23]
コマンドを使って、

[16:20 - 16:27]
カーソルのカーソルタブ

[16:23 - 16:29]
機能について確認してみましょう。ブロックが完全に削除されました。

[16:29 - 16:35]
これで、これが機能していることがわかります。

[16:32 - 16:37]
テストは自動的に検証しましたが、

[16:38 - 16:44]
視覚的に確認できるのは良いことです。それでは先に

[16:41 - 16:44]
進みましょう。

[16:45 - 16:51]
次は、素晴らしい構造

[16:47 - 16:55]
とパターンです。3つのレベルがあります。1

[16:51 - 16:58]
つは実際のNotionラッパークラス、もう

[16:55 - 17:01]
1つはテストです。そして最上位

[16:58 - 17:04]
レベルはIndex CLIアプリケーションです。

[17:01 - 17:06]
つまり、1つの中心的なコード

[17:04 - 17:09]
レベルがあり、その上の2つは、

[17:09 - 17:16]
正しく動作することを検証するだけです。Notion

[17:13 - 17:18]
テストファイルを更新し、親を持つ

[17:16 - 17:22]
ブロックを追加するケースをテストします。広告テキスト関数を

[17:22 - 17:29]
再利用するため、新しいテストが必要です。

[17:34 - 17:40]
モックの親

[17:37 - 17:43]
IDを定数ファイルに移動します。AER

[17:40 - 17:43]
から自動的に読み込まれます。

[17:54 - 17:59]
素晴らしいですね。これで自動的に記述されました。

[17:59 - 18:04]
自動テストが

[18:01 - 18:07]
すべての動作を検証しているのがわかります。

[18:04 - 18:10]
新しいテストが作成され、検証されたことがわかります。

[18:07 - 18:12]
すべてのモック

[18:10 - 18:15]
親ブロックIDを検索すると、

[18:12 - 18:15]
その

[18:24 - 18:30]
テストに直接アクセスできます。このテストを単独で実行します。

[18:27 - 18:32]
更新できます。テストで

[18:32 - 18:38]
only関数を使用して

[18:36 - 18:42]
個別のテストを実行できます。また、

[18:38 - 18:46]
AER構成ファイルを更新して、

[18:42 - 18:47]
必要なテストファイルのみを実行することもできます。

[18:46 - 18:50]
例えば、

[18:47 - 18:52]
新しい機能を開発しているとします。すべてのテストを実行する必要はありません。

[18:52 - 18:56]
コードベースによっては、すべてのテストを実行するのは大変な作業になります。コード

[18:55 - 18:58]
ベースによっては、何百ものファイルが存在することもあります。

[18:58 - 19:03]
すべてのプルリクエストごとにテストを再実行するのは避けたいものです。そのため、作業中の機能だけに集中して調整することができます。

[19:09 - 19:13]
すべてのプロンプトの後に関連するすべてのテストを再実行すると、出力が高くなるからです。

[19:15 - 19:21]
それでは、サンプルドキュメントを修正してみましょう。25

[19:21 - 19:27]
行目、

[19:24 - 19:30]
15行目あたりに、このNotion - CLIがあります。これは

[19:27 - 19:32]
2つ目の幻覚です。

[19:32 - 19:35]
これを削除したいのですが、Notion Cではなく、

[19:34 - 19:37]
bu

[19:35 - 19:41]
runにしたいのです。これで、

[19:44 - 19:51]
少なくとも

[19:47 - 19:51]
大部分は更新され、すべてのテストが

[19:51 - 19:57]
実行されたことがわかります。これで3つのメソッドが動作しています。

[19:54 - 20:01]
素晴らしいですね。大きなメソッドが1つ欠けています。

[19:57 - 20:05]
次に、すべてのメソッドを読み取る必要があります。つまり、

[20:01 - 20:08]
ページブロックを取得するメソッドです。これは

[20:08 - 20:14]
Notionページからすべてのコンテンツを取得します。これは扱いにくい関数です。

[20:14 - 20:22]
ブロックを取得するだけでなく、

[20:17 - 20:25]
各ブロックの正しい型を取得する必要があることがわかります。

[20:25 - 20:29]
ブロックに子がある場合は、

[20:27 - 20:31]
各ブロックを再帰的に処理する必要もあります。これを1つずつ実行していきます。

[20:35 - 20:40]
ここでマルチファイルプロンプトを実行し、新しいTypeScript型を作成します。

[20:38 - 20:42]
新しいメソッドを作成します。

[20:42 - 20:48]
ここでは3つのファイルを更新するように指示し、AERは

[20:45 - 20:48]
すべての

[20:54 - 21:01]
ファイルを更新します。これでテストが開始されます。

[20:58 - 21:03]
現在5つのテストが実行されています。

[21:01 - 21:05]
次にgit

[21:03 - 21:07]
ブロック

[21:05 - 21:10]
関数を調べます。段落のみが

[21:07 - 21:10]
取得されていることがわかります。これは

[21:10 - 21:16]
重要な問題です。

[21:19 - 21:26]
ただし、index.tsコマンドレベルでページブロックの取得が抜けていました。その

[21:23 - 21:28]
ため、

[21:31 - 21:37]
プロンプトの更新部分に明示的に追加しなかった

[21:35 - 21:39]
ため、AERはリッスンしましたが、そのファイルは更新されませんでした。これを

[21:39 - 21:45]
実行すると、結果が

[21:41 - 21:46]
取得されます。

[21:45 - 21:49]
ここでクリップボードに追加します。

[21:46 - 21:52]
これが私たちの git テキストのようです。

[21:49 - 21:54]
多くのテキストが欠落していることがわかります。

[21:52 - 21:55]
これは、先ほど述べた

[21:54 - 21:57]
ように、段落項目のみを解析しているためです。

[21:57 - 22:01]
そのため、

[21:59 - 22:05]
Notion の例を調べて、

[22:01 - 22:07]
あらゆるブロック タイプからテキストを解析します。

[22:05 - 22:10]
段落だけでなく、

[22:07 - 22:13]
URL、

[22:10 - 22:14]
埋め込み、数式、

[22:13 - 22:17]
コード ブロックも必要です。

[22:14 - 22:19]
これをサポートするために、

[22:19 - 22:26]
まず、

[22:21 - 22:28]
このコードを新しい docs ファイルに追加します。これは、ize を使用してドキュメントを追加できるもう

[22:26 - 22:29]
1 つの AI コーディング パターンです。

[22:33 - 22:37]
基本的に、これは特定のトピックに関する

[22:37 - 22:46]
ドキュメントまたはコード、またはその両方を含む単なる markdown ファイルです。

[22:42 - 22:48]
そこで、

[22:46 - 22:51]
新しい readon ファイルを追加します。これは

[22:48 - 22:53]
AER で非常に便利な機能で、readon

[22:51 - 22:57]
ファイルを追加できるため、そのファイルを更新するオプションはありません。

[22:53 - 23:00]
そして、解析コンテンツを追加します

[22:57 - 23:03]
。  MarkdownをReadonファイルの

[23:00 - 23:06]
コンテキストに読み込みます。新しいNotion Utilsファイルを作成しました。「

[23:03 - 23:08]
Update

[23:06 - 23:11]
Notion

[23:08 - 23:15]
Utils」と入力して、

[23:11 - 23:17]
パースコンテンツ

[23:15 - 23:20]
Markdownファイル内のコードを実装します。つまり、

[23:17 - 23:25]
このNotion Utilsファイル内にブロック解析機能を組み込みたいのです。

[23:20 - 23:27]
これは非常に強力なプロンプトです。AI

[23:27 - 23:33]
コーディングの価値を深く掘り下げていきます。

[23:30 - 23:36]
大量の情報をはるかに高速に読み取り、

[23:36 - 23:43]
あなたや私よりもはるかに高速にコードを書き直す能力です。1分間に

[23:40 - 23:46]
150語をミスなく書き出せるかどうかは関係ありません

[23:46 - 23:53]
。AIコーディングアシスタントは

[23:54 - 23:59]
あなたよりも速くコーディングできます。ここで、Notion Utilsが

[23:57 - 24:01]
更新され

[23:59 - 24:02]
、かなり良い状態になっていることがわかります。

[24:01 - 24:06]
ここで変更点を確認しています。

[24:02 - 24:09]
いくつか調整を行いたいのは、

[24:09 - 24:15]
ブロックIDと

[24:12 - 24:18]
テキストのみを保存している型です。87行目を見るとわかるように、

[24:15 - 24:22]
テキストと型を

[24:18 - 24:23]
この奇妙な文字列に一緒に保存しています。これを

[24:22 - 24:26]
更新します。

[24:23 - 24:31]
シンプルなブロックタイプを更新して、

[24:26 - 24:33]
新しいキーと値のペアを追加します。

[24:31 - 24:36]
なぜ

[24:33 - 24:38]
手動で追加しなかったのかと疑問に思うかもしれません。ご覧の

[24:38 - 24:45]
とおり、1つのエディションに基づいて複数のファイルを更新しています。

[24:41 - 24:46]
テストが更新され、最上位のインデックス

[24:45 - 24:48]
ファイル

[24:46 - 24:51]
と実際のコード自体が

[24:48 - 24:53]
更新されました。その後、

[24:51 - 24:57]
すべてのテストが正常に実行されました。AIを使用してこれまでに

[24:57 - 25:01]
ないほど高速にコーディングしていることがわかります。

[24:59 - 25:04]
また、

[25:01 - 25:07]
AERは

[25:04 - 25:10]
AIコーダーとAIテストエージェントの両方として効果的に機能するため、変更の検証も

[25:13 - 25:18]
これまでになく高速化しています。このツールから得られる価値をすべてご理解いただければ幸いです。もう1

[25:16 - 25:24]
つの優れた機能があります。

[25:18 - 25:28]
エラーをコーディングし、それを検出して

[25:24 - 25:30]
すぐに修正しました。

[25:28 - 25:32]
何が間違っていたのかはわかりませんが、

[25:30 - 25:33]
何らかのエラーが発生し、

[25:33 - 25:39]
すぐに解決されました。つまり、認知

[25:36 - 25:41]
負荷が軽減され、

[25:41 - 25:46]
ミクロレベルでの意思決定の量が削減され、マクロレベルにもっと集中できるようになります。

[25:44 - 25:49]
ここで、

[25:46 - 25:52]
すべてのブロックをもう一度出力しているのがわかります。

[25:52 - 25:58]
空のテキストブロックはもうありませんが、

[25:55 - 26:00]
奇妙な出力形式になっています。つまり

[26:00 - 26:03]
、型を指定しているのにネストされた項目がないということです。

[26:03 - 26:09]
つまり、ネストされたブロックはすべて

[26:06 - 26:11]
無視されているということです。

[26:09 - 26:13]
これを修正してみましょう。検索で

[26:11 - 26:14]
ネストされた項目がまったく

[26:14 - 26:21]
拾われていないのがわかります。これは、

[26:18 - 26:24]
特定のブロックの配下を再帰的に処理する必要があるためです。今すぐ

[26:21 - 26:27]
その変更を加えましょう。ここでも同じパターンを

[26:28 - 26:32]
使っています。「

[26:30 - 26:36]
update」と入力し、

[26:32 - 26:39]
ファイル（複数可）を指定して、

[26:36 - 26:42]
何を変更したいのかを正確に指定します。

[26:39 - 26:45]
これで、

[26:42 - 26:48]
AIエージェントのプロンプト、LLMがローカライズされ、

[26:45 - 26:50]
この特定のコードブロック、つまり特定のファイル（複数可）にスコープが設定されました。

[26:55 - 27:01]
このパースブロックメソッドは

[26:57 - 27:05]
型を返すように更新します。「has children」がtrueの場合、

[27:05 - 27:11]
再帰的に自身を呼び出して、

[27:08 - 27:14]
配下のすべての子要素を取得する必要があります。

[27:11 - 27:17]
これもまた、

[27:14 - 27:21]
速いエンジニアでもかなり時間がかかる作業です。

[27:17 - 27:23]
少し時間がかかります。これは、

[27:23 - 27:28]
すべての

[27:24 - 27:30]
ロジックが正しいことを確認するために手動で確認する必要があるものです。私はそれがうまくいっていません。AI

[27:28 - 27:33]
コーディングアシスタントに何が欲しいか尋ねています。

[27:30 - 27:38]
待機中です。

[27:33 - 27:40]
変更を確認して、テストで

[27:38 - 27:44]
自動的に検証しています。次に進みましょ

[27:40 - 27:47]
う。ここでエラーがあります。

[27:44 - 27:48]
型を更新しました。文字列ではなく

[27:48 - 27:55]
オブジェクトを返します。AERはそれを検出し、

[27:52 - 27:57]
修正してよいか尋ねました。

[27:55 - 27:59]
もちろん「はい」と答えました。

[27:57 - 28:03]
修正が行われ、すべてのテストが再実行され

[27:59 - 28:05]
、変更が自動的に検証されています。

[28:03 - 28:07]
これは

[28:05 - 28:09]
繰り返しになりますが、エンジニアリング

[28:07 - 28:11]
コーディング、製品の構築はすべて

[28:09 - 28:14]
繰り返しです。正しい

[28:11 - 28:17]
ことを何度も何度も繰り返して、

[28:14 - 28:20]
これらのパターンに自分自身を固定し、

[28:20 - 28:26]
間違いを犯しにくくすることです。これで

[28:23 - 28:29]
ネストされたコンテンツができました。これは素晴らしいです。そして、

[28:29 - 28:34]
ネストされた

[28:31 - 28:36]
ブロックのすべてが出力に表示されています。

[28:36 - 28:44]
ここでもう一つ変更を加えます。親IDがないので、

[28:44 - 28:54]
同じAIコーディングプロンプト

[28:50 - 28:59]
パターン更新ノーションユーティリティを使ってAERに入ります。そして、

[28:54 - 29:02]
テキスト

[28:59 - 29:02]
ブロックをブロック

[29:04 - 29:10]
コンテンツだけにしたいとします。これは将来のプロンプトで

[29:07 - 29:12]
親IDを追加することになると思いますが、

[29:10 - 29:14]
これでテキストがクリーンアップされて、

[29:12 - 29:20]
実際のブロック

[29:14 - 29:20]
コンテンツ、つまりブロックのテキスト

[29:24 - 29:31]
コンテンツだけが取得されます。素晴らしいですね。ここでカーソルを使って

[29:28 - 29:34]
このファイルをローカルに更新します。AER

[29:31 - 29:37]
とカーソルを併用する方法は、

[29:39 - 29:44]
特定のコンテキスト設定でコードベース全体の複数のファイルに対する大きな変更を行う際にAERを使用するのが好きです。

[29:42 - 29:46]
そして、カーソルは

[29:49 - 29:57]
ファイル内のブロック内の特定のコード変更に使用します。ご覧のとおり、

[29:53 - 30:01]
カーソルは変更を微調整するのに使用し、

[29:57 - 30:04]
AERは長時間のセッションで複数のファイルに対して複数の変更を行うのに使用します。

[30:06 - 30:12]
もちろん、カーソルを使って

[30:09 - 30:17]
両方を行うこともできますが、AERの方が

[30:12 - 30:19]
精度が高く、はるかにシンプルで簡潔だ

[30:17 - 30:22]
と感じています。

[30:19 - 30:24]
ここで

[30:22 - 30:27]
もう一度Notion Utilsを更新し、

[30:27 - 30:30]
新しいブロックIDが必要なのでタイプも更新します。

[30:32 - 30:40]
これで完了です。親ブロックIDを追加するだけです。

[30:35 - 30:43]
そして、AERで

[30:40 - 30:46]
両方のファイルを更新し、

[30:43 - 30:48]
自動テスト設定を使って

[30:46 - 30:48]
すべてのテストを実行します。多くの

[30:49 - 30:54]
検証が行われ、

[30:51 - 30:58]
多くのエンジニアリングが自動的に行われます。カーソルプロンプト

[31:02 - 31:07]
のおかげで、ブロックがJSON形式になっているのがわかります。

[31:07 - 31:13]
親ブロックIDも取得しました。これで、親ブロックIDが指定された、非常に

[31:10 - 31:15]
クリーンなフラット配列が作成

[31:28 - 31:33]
されました。親ブロックIDは、存在する場合は指定され、存在しない場合はnullになります。これは素晴らしいことです。Notion APIラッパーは完全に起動しています。読み取り、書き込み、削除が可能です。短時間で多くの処理を実行してい

[31:31 - 31:35]
ます。

[31:33 - 31:37]
ここでさらにいくつか変更を加えます。Notionを

[31:35 - 31:39]
更新します。テストを更新します。

[31:37 - 31:42]
インデックスを更新します。

[31:39 - 31:46]
ブロック更新コマンドを探します。

[31:42 - 31:50]
作成、削除、

[31:46 - 31:51]
読み取りがあります。  CRUDを終了して、

[31:51 - 31:57]
実際に更新できることを確認します。

[31:55 - 32:00]
ここで、テキストを更新できることをうっかり忘れていました。Notion APIを使って更新できることを。

[31:57 - 32:03]
そこで、SLのaskコマンドを使ってAERに問い合わせてみました。

[32:03 - 32:07]
ちょっと馬鹿げた

[32:06 - 32:10]
質問でしたが、確かに可能です。ちょっと

[32:07 - 32:13]
頭がおかしくなったような感じです。AI

[32:13 - 32:17]
コーディング

[32:14 - 32:20]
アシスタントに頼るもう一つのクールな方法は、ランダムに質問してみることです。それで、

[32:20 - 32:26]
変更を加えて3つのファイルを更新しました。

[32:24 - 32:29]
すると、新しいテストブロックが作成されました。

[32:29 - 32:34]
このテストを開くと、

[32:32 - 32:38]
かなり

[32:34 - 32:40]
良い状態になっているのがわかります。ここで最初のテキストを更新したいので、

[32:40 - 32:44]
カーソル選択

[32:42 - 32:46]
プロンプトにカーソルプロンプトを使用しています。少しだけ

[32:44 - 32:48]
変更したいのですが、

[32:46 - 32:51]
その値ではないことをアサートしたいのです。このテストには少しこだわりがあります。

[32:51 - 32:58]
そして、そのメソッドをテストするためだけに、テストにonly修飾子を追加します。これは、

[33:03 - 33:09]
テストを分離して1つのテストを検証する簡単な方法です。これで実行できました。

[33:09 - 33:18]
Notion

[33:14 - 33:21]
ノードを更新できます。手動テストと手動

[33:18 - 33:24]
検証です。コードを

[33:21 - 33:28]
2回、3回検証しても全く問題ありません。もちろん、

[33:24 - 33:30]
唯一のコストは時間です。

[33:28 - 33:35]
しかし、ここでは

[33:30 - 33:36]
カーソルタブを使って

[33:36 - 33:41]
このCLIコマンドを正しい形式で自動的に取得し、

[33:42 - 33:46]
適切な

[33:44 - 33:48]
更新メッセージを作成します。AIでコードを書くのは

[33:46 - 33:50]
素晴らしいですね。本当に素晴らしいです。

[33:48 - 33:51]
さて、Ahadに行って

[33:50 - 33:55]
コマンドを実行します。

[33:51 - 34:00]
ブロックが更新されているのが確認できます。

[33:55 - 34:01]
素晴らしいですね。これでライブで実行されています。

[34:01 - 34:06]
ここでいくつか更新を行い、Readmeを更新して、

[34:08 - 34:11]
動作の仕組みを示す追加ドキュメントを追加します。次の

[34:10 - 34:14]
2つのプロンプトはすべてこれに関するものです。

[34:11 - 34:17]
カーソルと

[34:14 - 34:18]
このツールとあのツール、あの

[34:17 - 34:21]
モデルとあのモデルについてコメントしたいと思います。

[34:18 - 34:24]
今のところ、少なくともGen AIツールについて考えてみましょう。1

[34:21 - 34:26]
つのリングで

[34:24 - 34:29]
すべてを支配する、あるいは1つのツールですべてを支配するのは

[34:26 - 34:32]
後退するだけです。ツールキットを、これらのツール

[34:32 - 34:37]
間を移動するトップ3またはトップ5のリストとして考える方がはるかに良いでしょう。

[34:34 - 34:39]
これらを一緒に使うことで、それぞれの

[34:39 - 34:43]
ツールの良い点と悪い点が分かります。

[34:41 - 34:46]
前回のAER動画でもお話ししたように、

[34:43 - 34:48]
全てを一つのカゴに入れるのは時期尚早です。

[34:48 - 34:52]
勝者を決めるのは時期尚早です。

[34:50 - 34:54]
エンジニアリングのプリンシパルとして、

[34:52 - 34:56]
ジェネレーティブAIの時代においては、

[34:54 - 34:59]
お気に入りのツールやベストツールを一つだけ選ぶのではなく、1つ、

[34:56 - 35:01]
2つ、3つ、あるいは4つ試してみて、理解し、

[34:59 - 35:03]
長所と短所を見つけ、

[35:01 - 35:06]
物事が形になるまで時間をかけてみてください。

[35:06 - 35:10]
そして、エコシステム

[35:08 - 35:11]
に欠けているものがあれば、自分で

[35:10 - 35:13]
作ることができるのです。これが

[35:13 - 35:19]
これらのAIコーディングツールの素晴らしいところです。

[35:15 - 35:21]
これらのツールを自分で作るのはかつてないほど簡単になりました。

[35:19 - 35:23]
ご覧の通り、

[35:21 - 35:27]
新しい

[35:23 - 35:29]
Notion APIラッパーの使い方ドキュメントが用意されています。見た目も美しく、導入も完了しています。

[35:29 - 35:37]
ここでコードレビューを行っています。ここまでの作業は

[35:33 - 35:40]
40～45

[35:37 - 35:43]
分で完了しました。これは2部構成のシリーズの第1部です。

[35:43 - 35:47]
これらのツールを使えば、信じられないほどのことがたくさんあります。

[35:44 - 35:49]
私はこの AI コーディング開発ログ形式がとても気に入っています。

[35:49 - 35:55]
座って AI を使ってコードを書き、その

[35:52 - 35:57]
プロセスを本当に振り返って皆さんと共有できるからです。

[35:55 - 36:00]
そのため、私は積極的に AI コーディング コースを構築しています。このコースには、

[36:00 - 36:06]
皆さんにとって非常に価値のある内容が含まれており、AI コーディングに関する

[36:03 - 36:10]
最も包括的で原則的かつ

[36:06 - 36:12]
実践的なコースになります。

[36:10 - 36:15]
次のクラスのモデルがドロップされた直後にリリースし、今後登場する

[36:15 - 36:19]
新しいイノベーションや AI コーディングをすべて含められるようにしたいと思っていますので、お

[36:17 - 36:20]
楽しみに。

[36:20 - 36:25]
皆さんにリリースできることをとても楽しみにしています。これは、皆さんにとって大きな

[36:23 - 36:27]
win-win の状況になるでしょう。次のビデオでは、

[36:25 - 36:30]
このコード ベースをさらに進めていきます。

[36:27 - 36:33]
興味があれば、サブとして集中して

[36:30 - 36:36]
構築を続けてください。次回でお会いしましょう。

## コメント

### 1. @Yassine-tm2tj (👍 45)
How about using .cursorrules as a read-only file in Aider. This way, we will be able to use both Cursor and Aider using the same coding conventions.

### 2. @fabioaloisio (👍 4)
Awesome job Dan! Keep up the high quality of Your vids! Tks

### 3. @TreeLuvBurdpu (👍 2)
I went and did a bunch of this and I'm already seeing an improvement

### 4. @pauldolton9118 (👍 8)
this was great but very fast to absorb as a newbie, would be good to see more of each step and stages of what was happening, but thank you for showing :)

### 5. @tomislavglavas2180 (👍 9)
This is the most informative and useful AI coding video I've seen so far. Thank you for this. <3

### 6. @mrd6869 (👍 11)
This stuff has been an amplifier for me.
By trade i'm not a developer or engineer, i'm a sales guy lmao.
I've started by making an agent to tutor me on coding
and using Kali Linux tools.
Two years ago, my mind wasn't even on this subject,
all changed overnight.

> **@MegaQseft** (👍 1): Cool. Sounds very interesting. Would love to hear more about it.

> **@andydataguy** (👍 1): Keep it up man! 🙌🏾

I transitioned from sales into data over the last 3 years. Was hard but for sure best decision ever. It's an unfair advantage to both sell and build.

> **@opaidios** (👍 0): I am also in sales & have even gotten paid to dev an application before cursor existed. Now when I'm not in an appt, I'm building software with AI.

### 7. @geofftsjy (👍 12)
I use a conventions file. But I have a conventions file for many different types of tasks. Then I compose them for the specific thing I'm doing. I'm thinking of making a conventions repo to house them.

Then I use the /ask mode to rubber duck out a design, then I have it help me write an implementation plan with coding examples. I do this part when I have many of the same tasks to do. At the bottom of this file, I have it provide implementation steps where I have it specify exactly what to do and when to stop and not go into the next step.

Let's say there are 7 total steps where steps 3-4 are somewhat complex that need to be done 0-n number of times per task.

Then I use scripted aider to loop over all the source files or whatever and for each file I do a aider run telling it to read the implementation plan, add any specific conventions plans that are applicable to that step if applies, then my run command is to do step #1 in the plan doc. Then I do the same for step 2. Then steps 3-4 need to happen for each subsection lets say. For for every subsection in the file, I say do steps 3 and then step 4. Then back out of the nested loop I tell it to do the steps 5-7 one at a time.

I can basically use a single prompt and subprompt it easily to get the best out of the ease of a single prompt but also the accuracy of a multi-prompt.

I need to write a conventions file for writing conventions files and these implementations plans and these scripted aider tasks. But I have aider write them all right now anyway, it would just go faster.

> **@indydevdan** (👍 4): Yeah this is a gold mine waiting to be unlocked for many AI powered Engineers. You've essentially built your own ai coding agent on top of Aider that very likely outperforms on your codebases. More content to come on this topic. 

It's going to break the eng world honestly once ppl realize there are basically no limits on the type of ai coding pipelines you can build on top of tools like Aider.

> **@geofftsjy** (👍 0): @@indydevdan I seriously owe so much to your videos! Thanks!

> **@geofftsjy** (👍 0): @@indydevdan your next tutorial you should show the kind-cmd to do on save actions like formatting with black and isort. I left a different comment on this video with instructions. It’s a HUGE boost.

### 8. @beckbeckend7297 (👍 1)
Thank you dude, that's exactly what I was looking for. Love your videos. Don't have time myself, but with your help, I'll probably be able to switch after all. Currently using only Cursor with its compose. Although i don't like that he is sometimes making mistakes and i spend more time checking those. Guess need to use your idea with tests.

### 9. @adamviaja (👍 1)
I'm pretty new to coding and I'm def a little lost in this video but I'll have to come back as I learn more!

### 10. @agarridoboris (👍 1)
Your content is awesome. Besides the AI stuff, I found little gems like those senv, mkenv, okey commands very useful. Probably the best invested time I can remember watching YouTube videos. I'd be very interested on a AI driven development course from you.

### 11. @drlordbasil (👍 6)
Cursor has been soooo fking fun to play with. Been making chrome extension, even got it to make an AI based tamagachi pet.

> **@AaronBlox-h2t** (👍 0): What's a tamagachi pet?

### 12. @cutmasta-kun (👍 4)
3:00 I declare the types where they are needed and make the most sense in the context. A additional file for the types is an unneccessary, additional file.

### 13. @graham2409 (👍 0)
Thanks, nice video. Coding's not my full time job, but I still do it from time to time for small stuff. I've always avoided test case writing beyond simple printing of debug info as it seemed like more work, but you're selling me on the utility even in my "if it works at all, it's good enough" use cases. If I can lean on AI more heavily and reliably by way of testing since that grounds the AI, then it'd definitely be worth the time to do things (more) right.

### 14. @cgintrallying (👍 2)
Always inspiring to watch you doing stuff the AI-way. Love the way you make cursor and aider go hand in hand on that.

I am wondering if you tried using Cursors Composer instead of aider. And if so what is your take on these compared.

> **@indydevdan** (👍 2): Definitely have see previous video on channel. Cursor's composer is a big deal because it represents 'mainstream' adoption of ai coding in the tech ecosystem.

My take is: Aider >= Cursor 

BUT 

(Aider + Cursor) > Aider

### 15. @juanmadelaflor6406 (👍 0)
Really thanks!. Keep doing this!. Pioneering software development.

### 16. @comosaycomosah (👍 0)
look forward to some more videos from ya.  id love to see more of the notion wrapper too...also what are using to get the transparent background on everything

### 17. @bkamnik1995 (👍 1)
very insightful. Love the automatic tests. Thanks for posting !

### 18. @techfren (👍 5)
this is excellent

### 19. @rosszhu1660 (👍 1)
Which theme are you using for VSCode/Cursor? It looks so fancy 🙂

### 20. @rafael_tg (👍 0)
Great video man. Thanks. Have you tried cline (Claude dev) ?

