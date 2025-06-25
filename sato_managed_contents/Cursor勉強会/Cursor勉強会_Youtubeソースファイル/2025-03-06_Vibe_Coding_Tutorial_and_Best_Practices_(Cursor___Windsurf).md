# Vibe Coding Tutorial and Best Practices (Cursor / Windsurf)

**チャンネル:** Matthew Berman
**公開日:** 2025-03-05
**URL:** https://www.youtube.com/watch?v=YWwS911iLhg

## 説明

Got a lot of questions asking about my stack and what I do when vibe coding. So I made a full video on it!

👉 Learn more on https://mammouth.ai/

Join My Newsletter for Regular AI Updates 👇🏼
https://forwardfuture.ai

My Links 🔗
👉🏻 Subscribe: https://www.youtube.com/@matthew_berman
👉🏻 Twitter: https://twitter.com/matthewberman
👉🏻 Discord: https://discord.gg/xxysSXBxFW
👉🏻 Patreon: https://patreon.com/MatthewBerman
👉🏻 Instagram: https://www.instagram.com/matthewberman_ai
👉🏻 Threads: https://www.threads.net/@matthewberman_ai
👉🏻 LinkedIn: https://www.linkedin.com/company/forward-future-ai

Media/Sponsorship Inquiries ✅ 
https://bit.ly/44TC45V

## 字幕

[00:00 - 00:04]
最近、Vibe コーディングに熱中しています。

[00:02 - 00:07]
これは基本的に、AI エージェントにコーディングを任せているだけです。

[00:07 - 00:11]
実際にコードを書いたのはほとんど、というかほとんどありません。Vibe コーディングを

[00:12 - 00:16]
最大限に活用するために学んだことをすべてお話しします。

[00:14 - 00:19]
早速始めましょう。Vibe

[00:16 - 00:21]
コーディング、または

[00:19 - 00:24]
エージェント コーディング (何と

[00:21 - 00:26]
呼んでも構いません) とは、

[00:24 - 00:28]
Cursor や Wind Surf でエージェント ベースのコーディングを使用していることです。

[00:26 - 00:31]
ここに

[00:28 - 00:33]
エージェントの質問と編集機能があります。これは、

[00:31 - 00:35]
コードを開始するのではなく、Tab キーを押す

[00:33 - 00:38]
とコードが自動的に完成するものです。

[00:35 - 00:40]
文字通り、

[00:38 - 00:42]
AI にアプリケーション全体をエンド ツー エンドで記述してもらおうとしているのですが、

[00:40 - 00:44]
これは少し

[00:42 - 00:47]
難しく、確かに

[00:44 - 00:50]
いくつかの制限があります。まず、私のセットアップについてです

[00:47 - 00:52]
が、Cursor または Wind Surf では

[00:50 - 00:55]
ほとんど CLA

[00:52 - 00:57]
3.7 モデルのみを使用しており、主に

[00:55 - 01:00]
思考バージョンに重点を置いています。ここでは、CLA 3.7 Sonet 思考を使用しています。Cursor

[01:00 - 01:04]
と Wind Surf では、好きなモデルをセットアップできます。

[01:04 - 01:07]
それにはカーソル設定に進みます。

[01:06 - 01:09]
ここには、カーソルから直接提供されるモデルのリストがあらかじめ用意されており、そこから

[01:07 - 01:12]
選択できます。また、

[01:13 - 01:19]
ここからモデルを追加することもできます。カスタムモデルを追加する方法は

[01:16 - 01:21]
基本的に、

[01:19 - 01:24]
このオープンAI APIキーを上書きすることですが、これはあまり簡単ではありません。これをオンにし

[01:21 - 01:27]
てキーを追加すると

[01:24 - 01:28]
、ベースURLをオーバーライドできます。これは

[01:27 - 01:32]
一度しか実行できません。つまり、

[01:28 - 01:35]
非オープンAI APIサービスは1つしか持てないということですが、

[01:32 - 01:38]
問題ありません。ここでは

[01:35 - 01:40]
grockを使用し、grockキーをここに入力します。grockは

[01:38 - 01:43]
オープンAI API標準を使用してフォーマットされている

[01:40 - 01:44]
ため、どの

[01:43 - 01:46]
モデルを選択してもすぐに機能します。エージェント機能で使用する場合は、

[01:46 - 01:51]
エージェントの動作、関数呼び出し

[01:48 - 01:54]
、ツール呼び出しが適切にサポートされていることを確認する必要があります。

[01:51 - 01:56]
ほとんどのモデルはサポートされていませんが、Clyde 3.7ではサポートされると

[01:54 - 01:58]
思います。

[01:56 - 02:02]
まず、非常に具体的な

[01:58 - 02:04]
仕様を作成することをお勧めします。つまり、

[02:02 - 02:06]
何を構築したいのかを非常に詳細に説明することです。

[02:04 - 02:07]
私は実際にgrock 3を使用しています。Twitter

[02:07 - 02:10]
クローンとなるアプリケーションの仕様を

[02:09 - 02:12]
できるだけ具体的に記述してください。

[02:10 - 02:15]
バックエンドにはPythonを使用するので、

[02:12 - 02:17]
Enterキーを押します。AIを

[02:15 - 02:18]
別途操作して仕様書の作成を支援します。

[02:17 - 02:20]
ここでは、技術仕様だけでなく、動作方法などがすべて書き出されているのがわかります。さらに、

[02:25 - 02:30]
データベーススキーマも書き出されているのがわかります。APIと

[02:27 - 02:33]
ポイントがすべて揃っています。

[02:30 - 02:36]
完了したら、基本的にこれら

[02:33 - 02:37]
すべてをカーソルに貼り付けます。

[02:36 - 02:39]
どのように表示されるかお見せします。

[02:37 - 02:40]
新しいカーソルウィンドウが表示されます。

[02:39 - 02:43]
右上にある

[02:40 - 02:45]
AI切り替えペインをクリックすると、

[02:43 - 02:47]
チャットウィンドウが開きます。

[02:45 - 02:49]
カーソルの最新バージョンを使用している場合は、

[02:47 - 02:53]
エージェントがデフォルトになります。私は

[02:49 - 02:54]
モデルとしてClad 3.7 Sonicを使用しています。

[02:53 - 02:57]
ここが重要な部分です。仕様書を

[02:54 - 02:59]
貼り付けますが、その前に、コードベースが

[03:02 - 03:08]
大きくなるにつれて特に重要になるもう1つのことを学びました。それは、カーソルルール

[03:05 - 03:10]
またはウィンドサーフィンルールを使用することです。どちらのアイデアも

[03:08 - 03:14]
ルールをサポートしており、ルールは

[03:10 - 03:16]
基本的にAIにエージェントを指示する方法です。 どの

[03:14 - 03:18]
ようにコーディングしたいか、どのような

[03:16 - 03:21]
テクノロジーを使うべきか、どのような

[03:18 - 03:23]
ワークフローを使いたいか。これは

[03:21 - 03:25]
私にとって大きな発見でした。

[03:23 - 03:28]
何かを構築しようとすると、

[03:28 - 03:32]
自分のステップに含まれていないテクノロジーを使って構築され、

[03:30 - 03:33]
他の部分が壊れてしまうことがよくありました。

[03:32 - 03:36]
バグがあれば、そのバグを修正しようとして

[03:33 - 03:38]
別のテクノロジーを使うようにしていました。

[03:36 - 03:41]
良い例として、私は

[03:38 - 03:43]
あらゆるものにSQLデータベースを使いたいと思っていましたが、

[03:41 - 03:44]
SQLデータベースで問題が発生するたびに、

[03:43 - 03:46]
エージェントは

[03:44 - 03:49]
ファイル内のJSONストレージに切り替えて修正しようとしました。これは

[03:46 - 03:50]
非常に面倒でした。うまくいっていると

[03:49 - 03:52]
思っていたのに、

[03:50 - 03:53]
データベースに何も表示されないなど、

[03:52 - 03:56]
いろいろと問題がありました。さて、

[03:53 - 03:58]
実際のプロジェクトに戻りましょう。

[03:58 - 04:03]
ルールがどこにあるかお見せしましょう。Incursor SetのRules

[04:00 - 04:06]
セクションには、どのプロジェクトにも適用されるユーザー固有のルールを設定できます。

[04:06 - 04:10]
私はProject Rulesに追加するのが好きです。

[04:08 - 04:12]
新しいルールを追加すると、基本的に

[04:10 - 04:16]
このCursorフォルダが作成され、その中に

[04:12 - 04:18]
Rulesフォルダが作成されます。これらのMDC

[04:16 - 04:20]
ファイルはすべてルールであり、

[04:20 - 04:26]
AIが処理するためのシステムメッセージのように参照できます。

[04:23 - 04:28]
スポンサーに感謝します。 このセグメントのMTHは、

[04:28 - 04:35]
月額わずか10ドルで最高の生成AIにアクセスできます。これには、

[04:31 - 04:38]
Claude deep seek GPT 40 llama

[04:35 - 04:40]
モデル、Mistral Gemini grock、

[04:38 - 04:43]
deep seek R1や03 miniなどの推論モデルなどの最高のllmが

[04:43 - 04:48]
含まれます。同じ価格で、最高の画像生成

[04:45 - 04:50]
モデル、mid Journey flux Pro recraft

[04:48 - 04:53]
Dolly stable diffusionもすべて1か所に含まれています。

[04:53 - 04:56]
プロジェクトに役立つカスタムamusを作成できます。これらは

[04:54 - 04:59]
エージェントのようなもので、

[04:56 - 05:01]
カスタムコンテキストをすべて提供すれば、必要な処理がわかります。Apple、

[05:01 - 05:07]
Android、Windows、Linuxのどのデバイスにもインストールできます。

[05:04 - 05:09]
ワンクリックでreprプロンプトを実行できます。

[05:07 - 05:11]
その他多くの機能があります。mamouthをぜひチェックしてください。

[05:09 - 05:13]
彼らは

[05:11 - 05:16]
このチャンネルの素晴らしいパートナーです。下にリンクを送信したと伝えてください。

[05:13 - 05:19]
では、ビデオに戻りましょう。

[05:16 - 05:21]
私のコーディング設定をお見せしましょう。これは

[05:19 - 05:23]
フォーマットされた方法です。すべて自然

[05:21 - 05:25]
言語の説明です。さまざまなファイルを自動的に添付できますが、

[05:23 - 05:27]
そのコーディングパターン設定は使用しませんでした。

[05:25 - 05:29]
では、

[05:27 - 05:30]
これらをそれぞれ確認し、なぜ

[05:29 - 05:33]
追加したのかを説明します。

[05:33 - 05:36]
これらのことが必要な理由を理解するだけで十分です。

[05:36 - 05:40]
これは、AIコーディング

[05:38 - 05:43]
エージェントが持つ、実際には

[05:40 - 05:46]
それほどうまく機能しない傾向の一部を反映しています。そのため、常にシンプルなソリューションを優先するようにしてください。これは自明の理です。

[05:46 - 05:50]
可能な限りコードの重複を避けてください。つまり、コード

[05:50 - 05:54]
ベースの他の領域に既に

[05:51 - 05:56]
類似のコードや機能がある可能性があるかどうかを確認する必要があります。

[05:54 - 05:58]
新しい機能を追加したり

[05:56 - 06:01]
、古い機能を修正しようとすると、

[06:01 - 06:05]
そのコードが既に存在しないと考えてコードが重複することがよくあることに

[06:05 - 06:09]
気づきました。そこで、新しい機能を追加したり、古い機能を修正したりするときに、

[06:07 - 06:11]
そのコードが既に存在しないことを確認し、存在する

[06:09 - 06:14]
場合は修正するように明確に指示しています。

[06:11 - 06:17]
新しい動作するコードを追加するのではなく。

[06:14 - 06:19]
私が苦労したもう1つの点は、AI

[06:17 - 06:23]
エージェントが開発テスト環境と本番環境の区分を適切に認識していなかったことです。

[06:23 - 06:28]
これは私にとって非常に大きな

[06:25 - 06:31]
学びでした。変更を加えてテストを作成すると、

[06:28 - 06:33]
テストが

[06:33 - 06:36]
開発環境に影響を与え、本番環境は

[06:34 - 06:40]
ローカルのものを使用しようとするため、

[06:36 - 06:42]
混乱が生じていました。そこで、今私は、すべての作業において、開発テスト環境

[06:42 - 06:47]
と本番環境を分離することを考慮に入れるようにしています。

[06:44 - 06:49]
これはもう1つの問題です。変更は、

[06:49 - 06:53]
要求された変更、または問題がないと確信できる変更のみを行うように注意する必要があります。

[06:51 - 06:55]
理解済みで、要求されている変更に関連しています。

[06:55 - 07:00]
私が遭遇したもう 1 つの問題は、

[06:57 - 07:03]
変更を要求したときに、コードの 1 つの部分、

[07:00 - 07:05]
機能の 1 つの部分、および

[07:03 - 07:08]
他の 3 つの部分が

[07:05 - 07:10]
理由もなく壊れてしまうことです。これは、

[07:08 - 07:12]
他のコード部分に触れようとしているだけだったのです。ですから、私が皆さんにお願いしていることだけに集中するように本当に

[07:10 - 07:13]
強調しておきたいと思います。

[07:13 - 07:19]
次に、

[07:17 - 07:21]
私が皆さんにお願いしていることだけに集中するように本当に強調しておきたいと思います。

[07:19 - 07:23]
新しいものを導入しないでください。問題やバグを修正する際には、

[07:25 - 07:29]
既存の実装のすべてのオプションを最初に試してから新しいパターンやテクノロジを導入しないでください。

[07:27 - 07:31]
最終的に

[07:29 - 07:34]
これを行う場合は、後で古い実装を削除して、

[07:34 - 07:37]
ロジックが重複しないようにします。これは、何かが

[07:37 - 07:42]
1 つの方法で行われると

[07:40 - 07:44]
完全に機能しないことがわかったものです。それを修正することをお勧めします。

[07:42 - 07:46]
修正するのではなく、新しいコードであると考えてまったく

[07:44 - 07:49]
別の方法で書き直すだけです。うまく

[07:46 - 07:51]
いけば、これで問題は解決します。

[07:49 - 07:53]
コード ベースを非常にクリーンで整理された状態に保ちます。コードが整理されていないことがよくあるので、

[07:55 - 07:59]
スクリプトやファイルの作成は可能な限り避けてください。

[07:57 - 08:02]
特に、スクリプトが

[07:59 - 08:04]
1 回しか実行されない可能性が高い場合はそうです。

[08:02 - 08:06]
エージェントが何かをテストしているとき、

[08:04 - 08:08]
例えばAPI

[08:06 - 08:10]
エンドポイントの1つやページの1つが壊れていたとします。これは

[08:10 - 08:14]
問題ありませんが、そのスクリプトは

[08:12 - 08:16]
コードベースにそのまま残され、おそらく二度と使われないであろう

[08:14 - 08:18]
様々な

[08:16 - 08:21]
単発スクリプトが大量に残ってしまいます。そこで、

[08:21 - 08:25]
スクリプトを書いてインラインで実行する

[08:23 - 08:27]
か、スクリプトの実行が終わったら

[08:25 - 08:28]
ファイルを削除してしまおうと思っています。これは

[08:27 - 08:30]
当然のことですが、

[08:28 - 08:32]
200行、300行を超えるコードは避けてください。

[08:30 - 08:35]
その時点でリファクタリングするのはあまり良いことではありませんが、

[08:32 - 08:37]
AIの場合は

[08:35 - 08:39]
適切だと思います。私は

[08:37 - 08:41]
非常に巨大なファイルを頻繁に見つけ、

[08:41 - 08:45]
リファクタリングを指示していましたが、

[08:43 - 08:47]
気づいた時にはリファクタリングによって

[08:45 - 08:48]
すべてのテストが壊れてしまい、非常に

[08:47 - 08:50]
長い時間がかかっていました。そのため、

[08:50 - 08:56]
行サイズを超えそうになったらすぐに

[08:53 - 08:59]
コードをリファクタリングするようにしてください。また、

[08:56 - 09:01]
クレイジーなスタブやモックデータのようなモックデータも確認しました。

[08:59 - 09:03]
これは基本的に、

[09:01 - 09:05]
一種のフェイクデータのバックアップがありますが、これは

[09:03 - 09:07]
開発環境や本番環境では実際には機能しません。

[09:05 - 09:10]
たとえば、

[09:07 - 09:12]
記事をスクレイピングするように指示し、何らかの

[09:10 - 09:14]
理由でスクレイピングが失敗したとします。

[09:12 - 09:16]
エラーをキャッチして

[09:14 - 09:18]
モックデータにフォールバックし、すべてがうまくいったと認識しますが、実際にはうまくいきませ

[09:16 - 09:21]
んでした。これは私が望んでいた

[09:18 - 09:24]
動作ではありません。本当に望んで

[09:21 - 09:26]
いたのは、実際にデータを

[09:24 - 09:28]
適切にスクレイピングして、常にモックデータを使用することでした。

[09:26 - 09:31]
これは非常にイライラしました。そのため、

[09:31 - 09:35]
開発や本番環境ではモックデータをテスト環境でのみ使用しないように明示的に指示し、

[09:35 - 09:39]
さらに強調して、Devonの本番環境に

[09:37 - 09:41]
影響するコードにスタブやフェイクデータパターンを追加しないようにしました。

[09:39 - 09:44]
次に、

[09:41 - 09:46]
実際にmyvファイルが上書きされているのがわかったので、

[09:44 - 09:49]
頻繁に新しいAPIキーを取得する必要がありました。そのため、それを行わ

[09:46 - 09:51]
ないように指示しました。もう1つの

[09:49 - 09:53]
ルールは私のスタックであり、おそらく

[09:51 - 09:54]
これについてさらに詳しく説明することもできますが、

[09:53 - 09:57]
これは単に技術的なスタックです。

[09:57 - 10:02]
たとえば、SQLが機能しない場合は、

[10:02 - 10:07]
ファイル内のJsonストアを使用するように切り替えますが、これは私が

[10:05 - 10:10]
望んでいたものではありませんでした。 バックエンドには Python、

[10:07 - 10:12]
フロントエンドには HTML、SQL データベース、

[10:10 - 10:15]
JSON ファイル ストレージは使用しない、

[10:12 - 10:17]
開発テストと本番環境でデータベースを分ける、と説明しました。Elastic

[10:15 - 10:20]
Search は

[10:17 - 10:21]
ホスト型検索を使用する、という

[10:20 - 10:23]
ことをもう一度強調しておきます。Elastic Search について説明すると、

[10:23 - 10:27]
ローカルで実行したい場合、

[10:25 - 10:30]
ホスト型検索で実行することもあったのですが、私はホスト型検索のみを使用したいと考えていまし

[10:27 - 10:31]
た。Python テストについては

[10:30 - 10:33]
後ほど説明します。

[10:31 - 10:36]
次はコーディング ワークフローの設定について説明します。

[10:33 - 10:38]
少し重複した

[10:36 - 10:40]
情報もありますが、少しでも

[10:38 - 10:43]
参考になれば幸いです。

[10:40 - 10:45]
タスクに関連するコード領域に焦点を当て、タスクに

[10:43 - 10:46]
関係のないコードには触れないようにしてください。

[10:46 - 10:51]
この操作で多くの問題が発生したため、以前は

[10:48 - 10:52]
主要な機能すべてに対して徹底的なテストを実行していました。

[10:51 - 10:54]
以前は手動で実行していました。

[10:52 - 10:56]
コードをいくつか生成してもらってから、

[10:54 - 10:58]
テストを実行していましたが、

[10:56 - 11:00]
忘れてしまうこともあったため、現在は

[10:58 - 11:02]
主要な機能すべてに対してテストを実行するようにしています。明示的に指示されない限り、機能の動作

[11:00 - 11:04]
パターンやアーキテクチャに大きな変更を加えることは避けてください。

[11:06 - 11:11]
指示されたら実行するように指示する必要があります。

[11:09 - 11:14]
もう一度言いますが、

[11:11 - 11:15]
この問題を修正してください。修正するには、

[11:14 - 11:17]
基本的に元のパターンを破棄して、

[11:17 - 11:20]
他のパターンや他のテクノロジを使用して最初から書き直すことになりますが、

[11:18 - 11:23]
私はそれを望んでいませんでした。

[11:20 - 11:25]
既存のものを修正するだけで、

[11:27 - 11:32]
コードの変更によって影響を受ける可能性のある他のメソッドやコード領域を常に考慮したかったのです。そのため、これらは

[11:29 - 11:35]
追加できるルールであり、必要に応じて

[11:32 - 11:37]
指示を与えることができます。これは、作業を進める

[11:35 - 11:40]
上で非常に役立ちます。

[11:37 - 11:42]
これで、完全な仕様が grock に戻ってきました。

[11:40 - 11:44]
私が行うことは、明らかにそれを

[11:42 - 11:46]
調べ、grock または

[11:44 - 11:48]
使用したい他の AI で作業し、それがまさにあなたが

[11:46 - 11:51]
望むものであることを確認することです。

[11:48 - 11:53]
適切な変更を加え、すべてをコピーして

[11:51 - 11:55]
ここに貼り付ければ準備完了です。

[11:53 - 11:56]
これを繰り返し実行するのではなく、

[11:55 - 11:58]
一度に実行します。

[11:56 - 12:02]
すべてをハイライト表示し、

[11:58 - 12:05]
ウィンドウに直接貼り付けて、「

[12:02 - 12:08]
この仕様に基づいてこれをビルドして確認してみましょう」と言います。

[12:05 - 12:09]
これで実行されます。

[12:08 - 12:10]
監視はしません。実行されると仮定しましょう。

[12:09 - 12:12]
すぐにどのように見えるかお見せします

[12:10 - 12:14]
が、ベストプラクティスをいくつかご紹介します。それでは、

[12:14 - 12:18]
既存のコードに戻りましょう。まず、このパネルに

[12:16 - 12:23]
注目すべき点、そして慣れておくべき点が1つあります。

[12:18 - 12:25]
ここには、

[12:23 - 12:28]
あなたが与えるすべてのコンテキストが表示されます。これは

[12:25 - 12:30]
重要です。ある時点で

[12:28 - 12:32]
コンテキストが多すぎると

[12:30 - 12:35]
パフォーマンスが低下し始めるからです。そのため、

[12:35 - 12:39]
与えるコンテキストの量、つまり新しいチャットを

[12:37 - 12:41]
開始するまでの会話の長さを注意深く把握する必要があります。

[12:41 - 12:46]
濃い灰色で表示されているのが、より良い結果を得るための新しいチャットの開始です。

[12:43 - 12:47]
これは

[12:46 - 12:49]
実際に

[12:47 - 12:51]
操作して理解する必要があります。新しいチャットを開始すると

[12:49 - 12:53]
コンテキストが失われます。コンテキストの一部を新しいチャットウィンドウに移動することもできます

[12:53 - 12:57]
が、これは面倒です。できるだけ多くのコンテキストを与えたいのです

[12:55 - 12:58]
が、

[12:57 - 13:00]
コンテキストを与えすぎるとパフォーマンスが低下し始めます。その

[13:02 - 13:06]
ため、この操作を試してみることをお勧めします。それでは、新しいチャットを開始します。

[13:03 - 13:08]
もう一度クリックします。

[13:06 - 13:11]
すぐに、

[13:08 - 13:13]
ワークフロー設定が挿入されますが、

[13:11 - 13:15]
すべてのルールを 毎回そこに表示されるので、

[13:13 - 13:17]
スタックとコーディング設定をクリックします。

[13:15 - 13:20]
これで、

[13:17 - 13:21]
これら3つのルールのコンテキストが表示されます。

[13:21 - 13:26]
自動で行われるかどうかは分かりませんが、

[13:23 - 13:28]
これらの3つのファイルを手動で挿入する必要があるようです。それで

[13:26 - 13:32]
問題ありません。次の

[13:28 - 13:35]
提案は、エージェントからのリクエストを非常に限定的にすることです。つまり、

[13:35 - 13:40]
小さな点を修正し、小さな機能を追加し、

[13:38 - 13:44]
できる限り多くのテストを行い、正しいテストを行うということです。テストはそれ

[13:44 - 13:49]
自体が独立したものです。私が見つけた最も効果的なのは

[13:46 - 13:50]
エンドツーエンドテストです。つまり、

[13:49 - 13:54]
実際にクリックして、

[13:54 - 13:58]
例えばユニットテストではなく、ユーザーが

[13:58 - 14:02]
行うであろうことを実行しようとするテストです。何かを書くたびに、テストを実行し、テストが合格すれば素晴らしいですし、

[14:02 - 14:07]
不合格ならテストを修正してもらうということを忘れないでください。

[14:05 - 14:08]
しかし、テストの修正は

[14:07 - 14:10]
興味深いもので、注意深く見守る必要があります。

[14:08 - 14:13]
なぜなら、テストが修正されて本番

[14:10 - 14:14]
環境に影響を与えることがあるからです。

[14:17 - 14:21]
実際には、テストの失敗に対処するだけで正しい方法である場合もあります。そのため、

[14:19 - 14:23]
注意深く見守る必要があります。

[14:21 - 14:26]
必ずしも

[14:23 - 14:28]
自分でコーディングする必要はありません。 手動で調整することもできますが、

[14:26 - 14:30]
テストがパスすることを確認し、

[14:28 - 14:32]
統合テストで確認するか、

[14:30 - 14:34]
アプリにアクセスして

[14:32 - 14:36]
その機能を自分でテストしてください。

[14:34 - 14:38]
ここには

[14:36 - 14:40]
さまざまなテストが多数あります。すべてに対してテストを実施してください。もう

[14:38 - 14:43]
一つの推奨事項は、あちこち

[14:40 - 14:45]
飛び回っていますが、

[14:43 - 14:48]
人気のあるスタックを使用することです。たとえば、Nentテクノロジーを使用している場合、

[14:45 - 14:50]
AIはそれほどうまく機能しない可能性があります。

[14:48 - 14:52]
なぜなら、

[14:50 - 14:55]
そのコーディング言語やスタックにあまり触れていないため、パフォーマンスが低下するからです。そのため、

[14:56 - 15:02]
一般的なスタックを選択します。

[14:59 - 15:04]
私はフロントエンドにPython、HTML、JavaScriptを使用しています。

[15:04 - 15:08]
データベースにはシンプルなSQLを使用します。

[15:06 - 15:10]
検索を行う場合はElasticsearchを使用します。ただし、非常に一般的なテクノロジースタックを選択すると、

[15:10 - 15:14]
AIが調査するためのドキュメントが豊富になります。では、

[15:14 - 15:18]
実際にどのように見えるか、例を示しましょう。

[15:16 - 15:20]
これは私が作成した古い機能です。

[15:18 - 15:21]
タグの最大長を20文字に制限します。

[15:20 - 15:23]
すでにこのコードがないことを確認してください。

[15:23 - 15:28]
実装後にこれをテストします。明らかに、私は自分が

[15:26 - 15:30]
どのようにしたいかを何度も強調しています。

[15:28 - 15:34]
これはコードなので、問題はありません。

[15:30 - 15:35]
送信すれば起動します。まずは

[15:34 - 15:37]
OKと判断され、思考プロセスを読み取ることができます。これは

[15:35 - 15:39]
非常に便利です。

[15:37 - 15:41]
次にツール呼び出しがあります。

[15:39 - 15:43]
ディレクトリの一覧が表示されています。ディレクトリの一覧が表示されています。

[15:41 - 15:45]
ファイルの読み取り、ファイルの検索など、さまざまな

[15:43 - 15:48]
ツールが利用可能です。外部ツールを

[15:45 - 15:50]
提供したい場合はmCPサーバーを使用することもできます。これは全く

[15:48 - 15:52]
別の話です。私は

[15:52 - 15:55]
まだコードでこれを全く使っていませんが、もう少し試してみる必要があります。いずれそれについては触れます

[15:55 - 15:59]
が、それは

[15:56 - 16:00]
別の動画で紹介します。ここで

[15:59 - 16:02]
このような処理が行われています。

[16:00 - 16:04]
クリックするだけで詳細を掘り下げて、

[16:02 - 16:07]
エージェントがコードベースでどのように動作するかを確認できます。

[16:04 - 16:09]
ここで

[16:07 - 16:12]
下にスクロールすると、GPTがあります。

[16:09 - 16:13]
ファイルの読み取りです。ファイルを読み取ると、

[16:12 - 16:15]
コードベースの分析に基づいて「これが

[16:13 - 16:18]
私が見つけたものです」と表示され、何が

[16:15 - 16:21]
行われるかが示されます。そして起動します。

[16:18 - 16:23]
実行するための設定が3つあり、

[16:21 - 16:25]
完全に手動で行うことができます。

[16:23 - 16:27]
つまり、

[16:25 - 16:29]
変更を加えたり、ファイルに影響を与える可能性のある何かを実行したりするたびに、

[16:29 - 16:34]
そして毎回手動で承認しなければなりません。

[16:31 - 16:37]
私の場合はYOLOモードを使っています。

[16:34 - 16:38]
文字通りYOLOモードと呼ばれ、その

[16:37 - 16:41]
逆で、すべてを自動で実行します。GitHub

[16:41 - 16:45]
にプッシュして本番

[16:43 - 16:48]
環境にデプロイするので確かにリスクがあります。ですから、実際に

[16:45 - 16:49]
本番レベルのコードベースがあり、

[16:48 - 16:50]
人々がそれを使用しているならお

[16:49 - 16:53]
勧めしませんが、Vibeで

[16:50 - 16:54]
何かをゼロからコーディングする場合は先に進んでください。そして、

[16:53 - 16:56]
中間的な機能もあります。それは

[16:54 - 16:57]
Autoと呼ばれていると思います。これは、

[16:57 - 17:01]
どのコマンドを

[16:59 - 17:04]
自動的に実行し、どのコマンドを

[17:01 - 17:06]
承認するかを決定することを意味します。そのため、いくつかの

[17:04 - 17:09]
変更が行われます。これらのテストが実行されていることがわかります。

[17:06 - 17:11]
すべてのテストが合格しました。すべての

[17:09 - 17:14]
テストのうち、1つのテストが失敗したため、

[17:11 - 17:17]
失敗したテストを修正する必要があります。失敗した理由を調べて

[17:14 - 17:18]
コードの変更を開始します。

[17:17 - 17:20]
ここに、モック

[17:18 - 17:23]
リポジトリの詳細が表示されます。私はそれに耐えられず、

[17:20 - 17:25]
本当にイライラしました。

[17:23 - 17:26]
そのため、開発でも本番でも

[17:25 - 17:30]
モッカースタブデータを一切使用しないことを5回ほど言いました。

[17:26 - 17:32]
そのため、

[17:30 - 17:35]
すべてのテストが合格しました。

[17:32 - 17:36]
最後に変更点の概要を書いて、

[17:35 - 17:39]
そのまま作業を

[17:36 - 17:42]
進めました。ただ、作業を

[17:39 - 17:43]
進めれば進めるほどコンテキストウィンドウが

[17:42 - 17:45]
肥大化し、できるだけ

[17:43 - 17:48]
頻繁に新しいチャットを開始したくなるでしょう。これはあまり

[17:48 - 17:52]
厳密なルールではないことは承知していますが、

[17:49 - 17:54]
自分にとって何がベストなのかを見極める必要があります。そのため、

[17:52 - 17:56]
私はエージェントにかなり依存するようになりました。「

[17:56 - 18:00]
このコードをコミットして、

[17:58 - 18:02]
適切な説明を書いて、

[18:00 - 18:03]
Herokuにデプロイしてください」と言えば、エージェントがそれを実行し、

[18:02 - 18:05]
実際に何の問題もありませんでした。

[18:03 - 18:07]
問題は、これらすべてがかなり

[18:05 - 18:09]
遅いことです。この時点で少し甘やかされているように感じます。

[18:09 - 18:14]
遅いと言っても、はるかに短い期間で書けるよりも多くのコードを書いているからです。

[18:14 - 18:19]
私が送信するすべてのコマンドは、

[18:19 - 18:24]
反復サイクルを完了するのに2分から15分ほどかかります。

[18:22 - 18:26]
テスト、試行、

[18:24 - 18:28]
テストの実行、テストが失敗した場合の修正、動作

[18:26 - 18:31]
確認などです。つまり、

[18:28 - 18:33]
少し遅いのです。

[18:31 - 18:35]
その意味では、この問題を解決する可能性のある1つの方法は、

[18:33 - 18:37]
異なる カーソルウィンドウが

[18:35 - 18:39]
開き、

[18:37 - 18:41]
異なるブランチで操作して、2つの

[18:39 - 18:43]
ブランチを同時に実行できます。

[18:41 - 18:45]
これを複数回実行できます。つまり、

[18:45 - 18:47]
同時に作業している異なるブランチをたくさん持つことができ、

[18:46 - 18:50]
最後にそれらをすべてマージできます。

[18:47 - 18:53]
私は時々、

[18:50 - 18:55]
Cloud 3.7の考え方とCloud 3.7の

[18:53 - 18:57]
通常の方法を切り替えます。 考えずに考えるのが一番うまくいくことが多いの

[18:55 - 18:59]
ですが、少し遅くなります。

[18:57 - 19:01]
そして時々、

[18:59 - 19:03]
コードをリファクタリングするように指示します。

[19:01 - 19:05]
一番長いファイルを探して

[19:03 - 19:07]
リファクタリングするなど、いくつかの指示を与えますが、低リスクのリファクタリングを行うようにしてください。

[19:07 - 19:11]
明示的にそのように指示します。そうすることで、

[19:09 - 19:13]
コードが少しきれいになり、

[19:11 - 19:14]
少し整理されます。

[19:13 - 19:16]
ほとんどの場合、リファクタリングパターンは

[19:14 - 19:18]
不要になります。リファクタリングは

[19:16 - 19:21]
多くのものを壊してしまうので、あまりやりたくありませんでした。

[19:18 - 19:24]
今では、

[19:21 - 19:25]
変更を加えるのが非常に難しい段階に達しました。

[19:24 - 19:27]
変更を加えると、

[19:25 - 19:31]
正しく修正するのに非常に多くの反復が必要になります。

[19:27 - 19:32]
バグを修正するのに非常に多くの反復が必要になります。

[19:31 - 19:34]
これらのことを事前に知っていれば、

[19:34 - 19:39]
もっと先に進むことができたと思います。

[19:36 - 19:42]
かなり中毒性があります。何か

[19:39 - 19:44]
他のことをしているときに、コマンドを書いて

[19:42 - 19:47]
この機能を構築し、立ち去って

[19:44 - 19:49]
そのままにして、10

[19:47 - 19:51]
分後に戻ってきて、うまくいったかどうかを確認します。

[19:49 - 19:52]
繰り返して立ち去って

[19:51 - 19:54]
戻ってくるので、

[19:52 - 19:56]
ほぼ非同期的に何かを行うことができます。つまり、

[19:54 - 19:58]
他の作業をしながら

[19:56 - 20:00]
コマンドを次から次へと実行できるということです。これが

[20:00 - 20:05]
スマートフォンでも使えるようになればいいのにと思います。Repetにも

[20:03 - 20:07]
似たような機能がありますが、コーディングエージェントはあまり好きではありません。

[20:05 - 20:09]
少し

[20:07 - 20:11]
使いにくいので、

[20:11 - 20:16]
スマートフォンでどこでも使える完全ホスト版があればいいのにと思います。

[20:18 - 20:22]
このようなエージェントを使えば、コーディングがはるかに容易になります。

[20:19 - 20:24]
スマートフォンで何かを入力するのはとても簡単で、それを

[20:22 - 20:26]
見ながら繰り返し作業もできます。

[20:24 - 20:29]
フルスクリーンや

[20:26 - 20:31]
キーボード、マウスも必要ありません。

[20:31 - 20:36]
モバイルコーディングの可能性は無限大です。

[20:33 - 20:38]
最後に、頻繁にコミットすることをおすすめ

[20:36 - 20:40]
します。コミットはいくら強調しても足りません。

[20:40 - 20:45]
変更を加えたら必ずコミットしてください。修正

[20:45 - 20:50]
不可能な状態になった場合はいつでもロールバックできます。また、

[20:50 - 20:55]
チャット履歴も表示されるので、

[20:52 - 20:58]
以前のチャットにロールバックできます。

[20:55 - 21:00]
これをクリックすると、ダークモードが追加されました。一番

[20:58 - 21:02]
上までスクロールすると、

[21:00 - 21:04]
チェックポイントを復元すると、コードがロールバックされるので、それを

[21:04 - 21:09]
実行するだけでなく、

[21:07 - 21:12]
カーソル

[21:09 - 21:13]
または Wind Surf 自体を介したバージョン管理も組み込まれています。これらは

[21:12 - 21:17]
すべて、さまざまなアプリケーションやゲームで

[21:13 - 21:19]
約 100 時間から 150 時間の

[21:17 - 21:22]
Vibe コーディングを通じて私が学んだベスト プラクティスです。

[21:22 - 21:26]
とても楽しく、これらのツールが

[21:24 - 21:28]
改善されるのが待ちきれません。これが最悪の状況です。

[21:26 - 21:30]
そのため、

[21:28 - 21:32]
現在経験している、または私が経験しているこれらの問題はすべて、

[21:32 - 21:38]
将来的には対処しやすくなるでしょう。Vibe

[21:35 - 21:40]
コードを楽しんでください。素晴らしいものを

[21:38 - 21:42]
作るのにコーディングの知識はほとんど必要ありません。ぜひ

[21:42 - 21:46]
作ってみてください。このビデオが気に入った場合は、

[21:44 - 21:47]
いいねや

[21:46 - 21:49]
チャンネル登録をお願いします。次回もご覧ください。

## コメント

### 1. @solvsmart6278 (👍 571)
# Coding pattern preferences

– Always prefer simple solutions  
– Avoid duplication of code whenever possible, which means checking for other areas of the codebase that might already have similar code and functionality  
– Write code that takes into account the different environments: dev, test, and prod  
– You are careful to only make changes that are requested or you are confident are well understood and related to the change being requested  
– When fixing an issue or bug, do not introduce a new pattern or technology without first exhausting all options for the existing implementation. And if you finally do this, make sure to remove the old implementation afterwards so we don’t have duplicate logic.  
– Keep the codebase very clean and organized  
– Avoid writing scripts in files if possible, especially if the script is likely only to be run once  
– Avoid having files over 200–300 lines of code. Refactor at that point.  
– Mocking data is only needed for tests, never mock data for dev or prod  
– Never add stubbing or fake data patterns to code that affects the dev or prod environments  
– Never overwrite my .env file without first asking and confirming

> **@brunonoleto8855** (👍 3): Thanks!

> **@nissimtrabelsy1944** (👍 9): real mvp

> **@joaquindelrio2806** (👍 2): Thanks man

> **@RakeshMakhija** (👍 3): Thanks for saving my time 🙏

> **@unc_matteth** (👍 3): YOU ARE A CHAMPION MY FRIEND

### 2. @EmmanuelCrown (👍 212)
One trick I found when starting new chats  is ask for a summary of what it’s done so far and I paste that summary in the new chat

> **@goodnatureification** (👍 4): 🔥

> **@morena-jackson** (👍 14): I have it create a memory and comprehensive prompt of what we are doing for the next chat and tell the next chat to read it.

> **@argonborgon8071** (👍 0): @@morena-jackson And how do you do it? please give me the instructions

> **@Mattias1995** (👍 5): In cursor 0.45.x they introduced this feature: "Summarize Previous Composers: When conversations grow too long, you can start a new conversation while referencing the previous one." - but now sure how that works in practice.

> **@morena-jackson** (👍 0): ​@@argonborgon8071 I just tell the chat I’m in to create a comprehensive prompt for the next chat, so it knows what we’re working on and any issues we’re dealing with. I already have all the project details saved in memory, so any new chat automatically knows about the project. But when the chat fills up and I need to start a new one, I have the current chat list out any problems and progress for the next one and I tell the next chat to read the memeory. I don't know if it automatically does but I always tell it to do so.

I also make sure to save recurring issues in memory. Like, when starting the servers, the AI kept using the wrong command, so I had it save the correct one to memory. Same with another issue where it wouldn’t load all dependencies before running the app, leaving me with a blank page—so now it knows to load them first.

### 3. @its_ot (👍 447)
Vibe coding = what everybody who wasn't already into software development has been doing with AI since they first started. Before Cursor, I just copied and pasted what ChatGPT gave me into vscode and put the errors back into chatgpt 😂

> **@manifest_with_vibration5726** (👍 13): Yup same

> **@torarinvik4920** (👍 14): I actually did this since GPT-3, it's the only way to go :D

> **@McWhisperASMR** (👍 21): Yeah, but the rate and accuracy now really makes it viable with zero knowledge of coding now. I started doing it with 3.5 and struggled to get a basic game of snake working. Now I've got a locally run chatbot, a bunch of basic games and an escape room game built and I was able to do all of that in a day! I can only imagine what actual coders are producing with this.

> **@Pregidth** (👍 12): Yeah for simple things ok, but if you don't have an idea of complex code projects that does not work. So great benefit for the script kiddies!

> **@torarinvik4920** (👍 8): @ Yes I do agree on that to a certain degree. If you don't understand the code that the AI generates then you can end up in serious technical debt. But used by a skilled programmer can be a very effective tool. Ultimately all code consists of many simple things.

### 4. @robistocco (👍 77)
I recently build a three tiers web application (Angular frontend, Python/FastAPI backend and PostgreSQL database) on Docker using Cursor with Claude Sonnet 3.5 and Gemini 2.0 Flash Thinking. I took more of a step-by-step approach and proceeded by iterations, e.g, set up the docker configuration for FE/BE/DB, once that was done I described the data I needed and got the SQL done, then asked to expose CRUD APIs for the SQL tables etc. It's like being a Tech Lead engineer coordinating a team of devs and assigning tasks. The whole thing turned out very good, super satisfied with the results - it would have easily taken me 10x the time to build it myself.

> **@Sven_Dongle** (👍 8): Why use a slow, interpreted, single threaded GIL hobbled language like python for the backend? if the AI is doing the work, why not have it code it in C, C++ or Rust for maximum performance and compactness?

> **@adamrodriguez7598** (👍 14): @@Sven_Dongle probably so the human dev that’s used to python can have a clue if it’s going in the right direction. But your point is very good!

> **@wnuk85** (👍 0): Wow, you implemented 'Hello World' using a monolithic architecture. Good luck with more complex projects than a website. Perhaps WordPress would be a better choice for a professional solution - for websites. Don't get me wrong—I’ve been using Copilot since its beta release. In my experience, its greatest benefit is explaining legacy code and completing variable names, etc. If these kinds of problems are solved ten times faster for you, it suggests a lack of experience—you should focus on learning and practicing more. By the way, 15 years ago, you could create a CRUD app with a frontend by writing just one line and preparing simple entities (Ruby on Rails, Grails, Seam, etc.), and it worked without AI. However, these kinds of solutions have disappeared because if a company pays for a project and doesn't use a low-code solution, it's probably something more than CRUD. For me and my mates form work (we hire only senior dev.), these tools are just another utility, like IntelliSense, and a source of jokes, because these models can sometimes be quite foolish, or you can't get an answer due to copyright issues.  ;)

> **@mohummadrabbani1793** (👍 2): hey @robistocco, If you don't mind, I'd like to connect to understand your process. Do you have a video on your channel, or if you could write down a detailed document of the steps that you followed?  Very much interested in learning about your process and workflow

> **@davidrocky** (👍 1): @@Sven_Dongle Because if you are not already an expert on those languages you would never know if the AI do something wrong, which it certanly will do something wrong (or VERY WRONG) somethimes. The best approach is to work with it knowing that you may need to jump in the code before asking the AI to do more, otherwise you will get lost and with a terrible codebase that no one would like to work with.

### 5. @productgremlin (👍 52)
Another trick. I have cursor write detailed documentation on every major feature it builds and now have a /docs folder with about 12 markdown files and an overview.md file that indexes all of the docs. That way I can give it the overview and tell it to find and relevant documentation as needed.

> **@matthew_berman** (👍 6): @@productgremlin that’s really smart!

> **@productgremlin** (👍 0): the mixture of experts approach for documentation 😉

> **@KennethGonzalez** (👍 0): Are you including this as one of your rules or are you prompting for that manually/on-demand?

> **@a.d.64** (👍 0): ​@@KennethGonzalez would make sense to include it as a hard rule

### 6. @RKKMotorsports (👍 42)
My workflow in Windsurf when trying out new stuff or creating POC. 

1. I ask for my AI assistant to create project folder named "testproject" with idea.md file and open that in Windsurf
2. Then in Windsurf I write my idea of application to idea.md
3. I tell Claude to read idea.md and make plan.md with step by step instructions to implementation and not to do anything else before I accept plan
4. Back and forth discussion about tech stack etc
5. When plan sounds good I tell Claude to go ahead and implement
6. I go make some coffee or vibecode with Cursor / Aider / Cline when Claude is working in Windsurf :)

> **@LeeroyBlazin** (👍 0): with Claude's CLI integration, do you find windsurf as relevant anymore?  I've been playing with the claude CLI and its very handy.

> **@RKKMotorsports** (👍 0): @@LeeroyBlazin I have not tested Claude Code yet, but what I like in Widsurf is GUI and it's context awareness. Dunno if Claude CLI has as good context awareness as Windsurf has. When I have time and money, will definetly check CLI Claude, maybe do some multitasking with it. I would think that it would be great for analyzing code and make suggestions for imrovements.

> **@hajihajiwa** (👍 0): hi! how do you clean up the finished product aesthetically to match your vision?

### 7. @aaronbrown1623 (👍 26)
This week I instructed the cursor ai to create a development journal markdown file and in the rules I instructed it to use it as journal to help it keep track of the project, milestones and conversations that I have with. I told it to be thorough and always append to it and not delete anything. It's actually really helped me keep the AI on track and starting a new conversation with it, it will read that journal right away for the most part, or I just tell it to ready it. This simple little change, has really improved my AI's ability to stay on track and keep moving forward with the application without variation.

> **@richdevboston2776** (👍 1): Excellent way to guide the development and keep it on track.  Agent teams benefit from having a checklist, requirements database with a target workflow and functionflow.

### 8. @nufh (👍 54)
For starting a new chat, I simply tell Windsurf that I want to create a new chat. Then, I ask it to generate a simplified version of the context in a .md file. After that, I start the new chat and instruct it to read the .md file first.

> **@rtwg605** (👍 2): @@nufh Great idea. I'm gonna steal that practice.

> **@WhyWouldHeSayThat** (👍 3): Started doing that in 3.5 days. Augment made this process way easier tho

> **@rtwg605** (👍 2): @@WhyWouldHeSayThat I hadn't heard of Augment but it looks interesting. So many tool, so little time!

> **@railville** (👍 1): this has sorted my life out. It's just 'getting it' much better. Nice one

> **@boothbuster** (👍 0): Context window just dumps the oldest messages when it fills so actually, if you kind of progress on a linear way, I've found you can just keep going.  Code self documents itself anyway.

### 9. @StrykEdits (👍 5)
Wow.   You saved me tons of time!   I’ve been using Curser without rules and pulling my hair out over the bad results.    Overthinking, bad implementation— everything you’ve named.  Instant thumbs up!

### 10. @NavneetRingania_from_Guwahati (👍 28)
Absolutely awesome! Watched it at 10x speed by posting the link on Gemini.

> **@Alex-69069** (👍 1): What prompt you use?

> **@Koolboy996** (👍 8): ​​@@Alex-69069 it's basically the reverse prompt that Michael uses to turn a 1 minute video into 20 minutes

### 11. @5thwalltv (👍 6)
I just started working with Cursor today and your rules really helped. Had been working manually with Claude via its app which was exhausting, given the size of my codebase. Everything you said in this video was true to my experience, especially in it creating unnecessary code and creating exceptionally long files. Such perfect timing. Thank you, Matthew.

### 12. @rtwg605 (👍 9)
I watched your other 2 vids on vibe coding this morning and thought I'd love a best practices vid from you. And tada! Here it is!! Watching next. 🎉

### 13. @epkostaring (👍 19)
This is so good 😊
I’ve been programming for 25 years and now vibe coding af for a few months. Welcome to the future.

### 14. @tydiamse5586 (👍 7)
**Matthew's Vibe Coding Tutorial & Best Practices**

**I. Initial Setup & Model Selection**  
- **Objective:** Configure Cursor and select an AI model that supports end-to-end, agentic coding (e.g., Claude 3.7 thinking).  
- **Steps:**  
  - Open Cursor/Windsurf and go to settings.
  - Choose a model from the list or, for a custom model (e.g., Grok), enable “Override OpenAI API key,” input your key, and set the base URL (only one custom model at a time).  
- **Considerations:**  
  - Does the model support agentic coding, function & tool calling?  
  - Are API key and URL correctly set?  
- **Success:** Cursor is active with the proper AI model ready for use.

---

**II. Detailed Specification Generation**  
- **Objective:** Create a clear, comprehensive spec of your application.  
- **Steps:**  
  - Use an external AI tool (e.g., Grok 3) to draft a detailed spec including features, user flows, technical details, database schema, and API endpoints.  
  - Review and refine for clarity.  
- **Considerations:**  
  - Does the spec cover all functionality and technical requirements?  
- **Success:** A precise spec that minimizes ambiguity for the AI.

---

**III. Defining Coding Rules**  
- **Objective:** Set rules in Cursor to guide coding style, technology choices, and workflow.  
- **Steps:**  
  - In Cursor settings under “rules,” add user- or project-specific rules.  
  - Create `.mdc` files in the `.cursor/rules` folder with natural language guidelines (e.g., avoid code duplication, prefer simple solutions, maintain environment separation, don’t overwrite critical files).  
- **Considerations:**  
  - Are the rules clear, specific, and aligned with your tech stack?  
- **Success:** A consistent coding framework is in place.

---

**IV. Initiating the Build Process**  
- **Objective:** Launch the AI-driven code generation using your spec and rules.  
- **Steps:**  
  - Open your project and toggle the AI chat pane.
  - Ensure the correct AI model is active.
  - Insert your rule files (if needed) and paste the full spec.
  - Command the AI (e.g., “build this based on this spec”).  
- **Considerations:**  
  - Is the spec complete and all context provided?  
- **Success:** The AI begins generating code based on your clear instructions.

---

**V. Iterative Development & Testing**  
- **Objective:** Incrementally develop and test the application.  
- **Steps:**  
  - Make focused requests for features or bug fixes.
  - Require the AI to write thorough (preferably end-to-end) tests.
  - Run tests frequently and review/fix any failures, ensuring no risky changes (like unintended mock data in production).  
- **Considerations:**  
  - Are requests narrow and test-driven?  
- **Success:** Each change is validated by passing tests.

---

**VI. Managing Context**  
- **Objective:** Keep the AI’s conversation history within optimal limits.  
- **Steps:**  
  - Monitor the chat’s length.
  - Start a new chat when performance drops and reinsert key rule files.  
- **Considerations:**  
  - Is the context becoming too long?  
- **Success:** The AI remains responsive with essential context intact.

---

**VII. Utilizing Agent Capabilities (with Caution)**  
- **Objective:** Automate tasks like committing code or deploying, with careful oversight.  
- **Steps:**  
  - Use clear commands (e.g., “Commit this code”).
  - Exercise extreme caution with auto-deployment modes (e.g., YOLO mode), especially for production.
- **Considerations:**  
  - Are safeguards in place for impactful actions?  
- **Success:** Repetitive tasks are automated safely and effectively.

---

**VIII. Experimentation & Refactoring**  
- **Objective:** Explore different AI models and improve code quality through refactoring.  
- **Steps:**  
  - Switch models in settings to find the best fit.
  - Instruct the AI to refactor code (e.g., “refactor the longest files,” “low-risk refactoring”).
- **Considerations:**  
  - Are refactoring commands clear and risk-aware?
- **Success:** The codebase is optimized without introducing regressions.

---

**IX. Version Control & Rollback**  
- **Objective:** Maintain robust version control and rollback capability.  
- **Steps:**  
  - Commit frequently using Git.
  - Use Cursor’s chat history “restore checkpoint” feature when needed.
- **Considerations:**  
  - Are commits regular and checkpoints available for rollback?  
- **Success:** You have reliable version control and an easy way to revert to stable states.

### 15. @matthewbishop152 (👍 0)
I appreciate you taking the time to create this video. I just migrated back over to Cursor after a rather robust buildout on Replit. I instituted some of these rules and more. Thanks for the architecture!

> **@shapesii** (👍 0): "architecture" lol you vibe coders are a bunch of rtrded babies

### 16. @beanie2405 (👍 11)
Ive been "coding" for three days straight using Agent. Work flow is crazy. getting weeks of coding done in a day. Somehow it got turned off and i was stressing because i didnt know what happened. Thanks to you, its fixed. Agent is back on and my work flow can continue. Thank you Matt.

> **@kurushimee** (👍 1): I agree so much. I may have years of experience with different kinds of programming, but damn, Agent gets stuff done SO much faster than me, and therefore - so much more. One of the biggest advantages for sure is the fact that I can still continue adding new features even when my mind doesn't work that well, like when I just can't focus atm. Agent doesn't care, it's not the one distracted while working.

> **@documenting_mahendra** (👍 0): @@kurushimee Yeah, on a good day we can focus more on the development / bigger picture. There is a lot of hate going on in the programming communities for vibe coding... Something about the messy that the Agents tend to make, possibility of security breach, etc... Honestly I don't see a problem for now, but I wonder how sustainable this is.

### 17. @GunjanPatel1 (👍 20)
Summary (with chapter timestamps): The video discusses Vibe coding using AI agents in tools like Cursor and Windsurf, focusing on best practices, setup, and overcoming common issues to efficiently build applications.
0:00 🤖 Introduction to Vibe Coding
• 🎯 Vibe coding uses AI agents to write code with minimal human input.
• 🛠️ The speaker uses Cursor and Windsurf with models like CLA 3.7 Sonnet Thinking.

1:00 🔧 Setup and Models
• 🔩 Cursor and Windsurf allow custom model setup via API keys.
• ⚙️ The speaker uses Grock due to its compatibility with OpenAI standards.

1:56 📜 Writing Specifications
• 📄 A detailed spec is crucial for AI to generate accurate code.
• 📋 The example spec includes backend, frontend, and database details.

2:57 📝 Coding Rules and Preferences
• 📜 Rules guide the AI on coding practices and technologies.
• 📌 The speaker emphasizes avoiding code duplication and focusing on specific tasks.

13:44 🧪 Testing and Iteration
• 🧪 End-to-end testing is more effective than unit tests.
• 🔄 Frequent commits and checkpoint restores are recommended.

19:54 🌟 Future of Vibe Coding
• 📱 The speaker wishes for mobile Vibe coding solutions.
• 🚀 The tools are expected to improve, making coding more accessible.


** Generated using ✨ VidSkipper AI Chrome Plugin

### 18. @michaeltupper4999 (👍 0)
I’m a technical product manager, not a coder, and i’ve been spending the last few weekends building a SaaS app. It is refreshing to know someone who is a coder had run into the same problems and issues, so that was reassuring for me. Also super helpful to see how you addressed those issues. Biggest take aways mentioned in this video and learnings from vibe coding and going down various ratholes are: commit often, don’t stay in a single chat window for more than an hour as it’s like coding with the smartest rockstar coder you’ve ever met who also has Alzheimer’s/dementia, and for the best performance, give it specific and narrow tasks. So addicting though!!!

### 19. @richardchinnis (👍 2)
Excellent tips.  Some I've also run into myself.  What frustrates me the most is that I can imagine the future.  My phone buzzes, and my "Cloud Cursor Agent" is calling me to give me an update on the progress of the project.  I can clarify or add goals, and let it keep going.  My brain just keeps imagining the future faster than the future is getting here.

### 20. @VibecodeOrg (👍 1)
Cool, *Vibecode Organisations are the future!* 🚀 🌎 Facts

