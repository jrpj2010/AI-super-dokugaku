# Databutton: The Ultimate AI App Builder - Beats V0, Cursor & Bolt!

**チャンネル:** Code with Ahsan
**公開日:** 2024-11-24
**URL:** https://www.youtube.com/watch?v=zqnz8-_nhNU

## 説明

This is probably by far the best AI based app builder I've tried so far. DataButton not only has an amazing developer/user interface, but also an exceptional way that allows us to work with their agent with back-and-forth communication.
In this video, we'll go through my whole process of building a FULL STACK AI APPLICATION which uses ReactJS on the Frontend, Python and FastAPI on the backend, and uses RAG (Retrieval Augmented Generation) to build an "AI Expense Buddy" application which helps analyze expenses using bank statements. 
The features include:
- Uploading bank statements to the app
- React Routing (navigation)
- Analysis page that shows spending based on categories
- Chat UI which can be used to ask questions from the chat bot

Live Demo:
https://codewithahsan.databutton.app/ai-expense-buddy

Sign up for Databutton:
https://bit.ly/databutton-ahsan

📖 Angular Cookbook (latest edition) - 4.2 stars on Amazon:
https://ng-cookbook.com/buy

Join 1600+ coding enthusiasts to keep yourself up to date with AI, Angular, and Web Development:
https://blog.codewithahsan.dev

Timestamps
00:00:00 - Introduction
00:00:54 - Important reminder
00:01:11 - Creating app using prompts
00:03:00 - How is Databutton different from Bolt & Cursor AI etc
00:03:50 - Generated app's first look & tasks
00:05:10 - Create home page navigation
00:06:27 - Deploying to production
00:07:20 - Implementing Upload Bank Statement feature
00:09:33 - Databutton's ability to fix issues itself
00:10:25 - Setting up RAG with Google Gemini & PineCone
00:15:20 - Analyzing expenses using uploaded PDFs
00:20:00 - Implementing Chat Interface for asking questions
00:23:20 - Implementing PDFs list and deleting PDFs and Vector data
00:06:40 - Conclusion

## 字幕

[00:00 - 00:04]
AIは日々進化しており、

[00:04 - 00:07]
驚くべきツールが次々と登場しています。今日ご紹介するのはData

[00:06 - 00:09]
Buttonです。これは、Promptからアプリケーションを作成するという点では、

[00:07 - 00:12]
私がこれまで使った中で最高のツールの一つと言えるでしょう。このツールを

[00:15 - 00:20]
使うのは本当に楽しかったです。というのも、

[00:17 - 00:22]
プロセス全体を通して、

[00:20 - 00:24]
私が書かなければならなかったのはたった1行のコードだけで、コーディングすらしていませんでした。

[00:22 - 00:28]
モデルを

[00:24 - 00:30]
Gemini 1からGemini 1.5 Proに置き換えた

[00:28 - 00:33]
だけで、Promptを使って

[00:30 - 00:35]
ログを表示させ、

[00:33 - 00:37]
エラーを自動で検出するだけで、

[00:37 - 00:43]
React Python Gemini

[00:40 - 00:45]
1.5 ProとRagを使って、実際に

[00:43 - 00:48]
銀行取引明細書をアップロードして操作できる本格的なフルスタックアプリケーションを作成することができました。AI

[00:51 - 00:55]
チャットボットと同じように、銀行取引明細書や取引について質問することもできます。動画を見る前に、

[00:57 - 01:01]
チャンネル登録はしていないけれど動画を楽しんでいる方がたくさんいることをお伝えしておきます。ぜひ「いいね！」

[01:01 - 01:04]
ボタンや「

[01:03 - 01:05]
登録」ボタンを押してチャンネルをサポートしてください。

[01:04 - 01:07]
ベルアイコンを押して、今後数か月で登場する

[01:05 - 01:10]
すべてのクレイジーなNSの通知を受け取ってください。それでは

[01:10 - 01:13]
始めましょ

[01:11 - 01:15]
う。これはデータボタンです。

[01:13 - 01:17]
彼らによると、これは世界

[01:15 - 01:19]
最高のAIアプリビルダーだそうです。私はこれをかなり試してみました

[01:17 - 01:21]
が、実際に

[01:19 - 01:23]
これまで使用した中で最高のツールの1つだと思います。これ

[01:21 - 01:24]
以上の賞賛はさておき、

[01:23 - 01:26]
コードに入ります。datab

[01:24 - 01:29]
button.comにサインアップしたら、その後、

[01:26 - 01:31]
新しいページに移動するか、

[01:29 - 01:33]
新しいアプリケーションを作成するだけです。

[01:31 - 01:35]
ここで、アプリケーションについて

[01:33 - 01:37]
何をしたいのか説明できます。このビデオでは、支出をより適切に管理するのに役立つ

[01:35 - 01:40]
AI経費Buddhを作成したいと考えています。アイデアは、

[01:41 - 01:49]
PDFファイルをアップロードできるアプリを作成することです。Google jini

[01:45 - 01:52]
Ragとpine coneデータベースを使用して、

[01:49 - 01:55]
すべての取引の分析を表示し

[01:52 - 01:57]
、

[01:55 - 02:00]
支出を改善する方法を分析できます。そのため、

[01:57 - 02:01]
アプリの名前をAI expenses buyにしました。pは、

[02:01 - 02:05]
専門家や学生が

[02:03 - 02:07]
支出習慣を分析および管理するのに役立つ経費マネージャーです。これは

[02:05 - 02:09]
habitsである必要があります。次に

[02:07 - 02:10]
説明を入力します。 アプリの

[02:09 - 02:12]
ホームページには「アップロード」と「分析」の2つのリンクがあります。

[02:10 - 02:14]
アップロードページでは、

[02:14 - 02:18]
バックエンドに保存されるPDFの銀行取引明細書をアップロードできます。分析

[02:16 - 02:20]
ページでは、検索拡張生成であるragを使用してPDFから分析が表示されます。

[02:23 - 02:28]
これについては、カンファレンスでも何度か講演しています。Geminiとpine coneでは、

[02:28 - 02:32]
定義済みの共通カテゴリに基づいて支出習慣を分析します。

[02:30 - 02:36]
分析では、

[02:32 - 02:37]
ストリーミングサービス、食料品、旅行など、

[02:36 - 02:39]
一般的な販売店の詳細と支出を

[02:37 - 02:41]
より適切に管理するための提案を表示したいと考えています。

[02:39 - 02:42]
ターゲットオーディエンスは、支出習慣を最適化し

[02:41 - 02:44]
たい学生や専門家です。

[02:44 - 02:48]
メイン画面のサイズをモバイルに設定したのは、レスポンシブにしたいからです。

[02:50 - 02:54]
データボタンを非常に難しくして、それがどれだけうまく機能するかを見たいと思っています。

[02:52 - 02:55]
最後に、

[02:54 - 02:58]
デザインガイドラインとして、

[02:55 - 03:01]
UIにTalman CSSとDaisy UIを使用し、クリーンで

[02:58 - 03:03]
モダンなデザインを維持したいと言っています。そのため、

[03:01 - 03:05]
これを使用して、

[03:03 - 03:06]
AIで開始点を生成するだけです。

[03:05 - 03:09]
ここで公開したいことの1つは、

[03:06 - 03:11]
データボタンがかなり異なることです。

[03:09 - 03:13]
他のAIエージェントとは

[03:11 - 03:17]
異なり、カーソルやVZなどのエージェントでは、

[03:13 - 03:20]
プロンプトを出すと何らかの応答が生成され、

[03:20 - 03:24]
そこから処理を開始する必要があります。データボタンでは、以前のすべてのコンテキストを把握しているとは期待できません。

[03:24 - 03:29]
私が

[03:27 - 03:32]
見た限りでは、データボタンは実際にはアシスタントのように動作し、

[03:29 - 03:34]
すべてのタスクを記憶し

[03:32 - 03:36]
、

[03:34 - 03:39]
処理を進める際にユーザーとやり取りします。ここでは、

[03:39 - 03:42]
アプリケーションをビルドして、

[03:40 - 03:44]
そこから処理を進めていきます。

[03:42 - 03:46]
モバイルベースのアプリケーションを作成しているのがわかります。

[03:46 - 03:52]
また、さまざまなプレビューに切り替えることもできます。タスクもリスト化されています。

[03:52 - 03:55]
左側にはいくつかの項目が表示されています。

[03:53 - 03:57]
ホームページがあり、ここに

[03:55 - 03:59]
すべてのページが表示されます。さらにUIコンポーネントがある場合は、

[03:59 - 04:04]
ここに表示されます。例えば、

[04:02 - 04:06]
バックエンドAPIエンドポイントがある場合は、

[04:04 - 04:08]
ここに表示されます。ファイルをアップロードした場合は、

[04:06 - 04:10]
ここに表示されます。PDF

[04:08 - 04:11]
ファイルをここにアップロードする予定なので、

[04:10 - 04:13]
ここで確認できるはずです。

[04:11 - 04:15]
右側には、

[04:13 - 04:17]
エージェントとの話し合いでは、

[04:15 - 04:19]
このようにコードを見て

[04:17 - 04:21]
編集することもできますが、自分ではやりたくありません。

[04:19 - 04:23]
データボタンにすべての面倒な作業を任せたいのです。

[04:23 - 04:27]
自分でコードを書くと、肝心な点を見落としてしまうからです。

[04:25 - 04:29]
右側には

[04:27 - 04:31]
タスクリストがあり、

[04:29 - 04:33]
ここからも確認できます。

[04:31 - 04:34]
ここで「タスクの表示」をクリックすると、

[04:34 - 04:38]
アップロード機能の実装、ホームページ

[04:36 - 04:40]
ナビゲーションの作成、分析エンジンの開発といったタスクが表示されます。

[04:38 - 04:42]
これらはすべて、これから

[04:40 - 04:44]
取り組むタスクです。これは、自分が何をしているかを把握するのに非常に便利な方法です。

[04:44 - 04:48]
これは非常に便利です。

[04:46 - 04:50]
タスクを非表示にして、

[04:48 - 04:52]
エージェントとの話し合いを始めます。

[04:50 - 04:54]
ここには、これから取り組む主なタスクが記載されています。

[04:54 - 04:58]
ホームページナビゲーションの作成、

[04:56 - 04:59]
アップロードページと分析ページまたは分析ページ間のナビゲーションの設定、

[04:59 - 05:03]
アップロード機能の実装、

[05:01 - 05:06]
分析エンジンの開発です。

[05:03 - 05:09]
まず、これをクリックすると「

[05:06 - 05:11]
ページが見つかりません」と表示されるので、

[05:09 - 05:13]
ホームページは正常に動作しますが、他のページは動作しません。

[05:11 - 05:16]
まず、「

[05:13 - 05:18]
ホームページナビゲーションを作成」をクリックします。

[05:16 - 05:20]
すると、エージェントにメッセージが送信され、「

[05:21 - 05:25]
ホームページにアップロードページと

[05:23 - 05:27]
分析ページへのナビゲーションリンクを設定する」というメッセージが表示されます。ここで、

[05:25 - 05:29]
直接何かを行うのではなく、

[05:27 - 05:31]
さらに細分化されていることがわかります。

[05:29 - 05:33]
ここでは、「アップロードページ」と「

[05:31 - 05:35]
分析ページ」を作成する必要があると表示されています。

[05:33 - 05:36]
実際にはこれらのページがないため、

[05:35 - 05:38]
これを

[05:36 - 05:40]
小さなタスクに分割しますか？それとも、

[05:38 - 05:41]
ページを直接実装する方がよいでしょうか？これは、

[05:41 - 05:46]
データボタンの非常に優れた点の1つです。タスクを

[05:44 - 05:48]
小さなタスクに分割できるため、

[05:46 - 05:50]
すべてを非常にうまく追跡できます。

[05:50 - 05:55]
タスクを小さなタスクに分割するように指示し、アップロードページから開始します。

[05:55 - 05:58]
今はダミーページを作成するように指示します。

[05:56 - 06:00]
各ページは後で1つずつ実装します。これで

[06:00 - 06:04]
タスクが更新されました。「

[06:02 - 06:06]
ホームページナビゲーションを作成」がまだ表示されています。タスクの

[06:04 - 06:08]
表示に移動すると、

[06:06 - 06:10]
最初のタスクがすでに作成されていることがわかります。

[06:08 - 06:12]
ホームページナビゲーションを作成中です。

[06:12 - 06:16]
ここでサブタスクを処理しています。これから

[06:14 - 06:17]
アップロードページと

[06:16 - 06:19]
分析ページを作成するコードを記述します。

[06:17 - 06:21]
アップロードページは既に作成済みです。

[06:19 - 06:24]
分析ページもあります。

[06:21 - 06:26]
これらもホームページにリンクされると思いますが、特に

[06:26 - 06:30]
指示する必要はありません。ここで

[06:28 - 06:32]
アプリのデプロイを求めるプロンプトが表示されています。

[06:30 - 06:34]
これはデプロイ先のURLになります。

[06:34 - 06:38]
これを使ってアプリをデプロイしますが、ナビゲーション

[06:37 - 06:39]
もテストします。

[06:38 - 06:42]
アップロードステートメントをクリックすると、ページに

[06:42 - 06:46]
直接移動します。ホームページへのリンクも取得済みです。

[06:46 - 06:49]
分析を選択すると、それが表示されます。ホームに戻る

[06:48 - 06:52]
ボタンもあります。

[06:49 - 06:53]
ここまで非常にクールです。ここでは、

[06:53 - 06:57]
一貫した

[06:55 - 06:59]
スタイルと戻るナビゲーションを備えた2つのプレースホルダーページを作成しましたと表示されています。これも

[06:57 - 07:01]
非常に便利です。エージェントが

[06:59 - 07:03]
何かを完了すると、常に何を

[07:01 - 07:05]
したかが通知されます。これは非常に役立ちます。

[07:03 - 07:06]
右上には、

[07:06 - 07:10]
アプリケーションのデプロイ中と表示されています。 これで

[07:08 - 07:12]
デプロイは成功しました。「

[07:10 - 07:15]
デプロイ」をクリックすると

[07:12 - 07:17]
すぐに確認できます。これは素晴らしいですね。

[07:15 - 07:18]
デプロイされたアプリケーションができたので、

[07:17 - 07:20]
すぐにお披露目できます。これをクリックすると、

[07:18 - 07:22]
ナビゲーションも

[07:20 - 07:24]
スムーズに動作することがわかります。さて、

[07:22 - 07:26]
次のタスクに進みましょう。

[07:26 - 07:30]
このタスクを完了としてマークします。

[07:28 - 07:32]
エージェントが既にタスクを確認しているのがわかります。

[07:30 - 07:35]
タスクがリストされ、

[07:32 - 07:37]
次に何をするか尋ねられます。残っているのは

[07:35 - 07:39]
2つのオプションです。「

[07:39 - 07:43]
アップロード機能の実装」と「

[07:41 - 07:44]
分析エンジンの開発」の2つのタスクがあります。「アップロード機能の実装」を選択します。

[07:44 - 07:49]
これは

[07:47 - 07:51]
フロントエンドだけで

[07:49 - 07:52]
なくバックエンドもカバーします。「

[07:51 - 07:54]
アップロード機能の実装」をクリックします。これをさらに細分化していく

[07:52 - 07:55]
つもりです。

[07:55 - 08:00]
ついでに水も持ってきておきますね。さて、

[07:57 - 08:02]
素晴らしいですね。「

[08:00 - 08:04]
アップロード

[08:02 - 08:06]
機能の実装」と表示されているのを見れば、これをさらに

[08:04 - 08:07]
小さなタスクに分割すべきでしょうか？ とりあえずバックエンドから進めていこうと思います。

[08:07 - 08:11]
フロントエンドを実装すると

[08:09 - 08:13]
既に接続できるので、

[08:11 - 08:15]
セットアップとAPIに進みます。

[08:15 - 08:19]
ここにコンソールがあるので、これをクリックするとたくさんのログが表示されます。これは

[08:20 - 08:25]
フロントエンドアプリケーションからのログですが、

[08:22 - 08:27]
何かを試したりエージェントが何かを試みたりした場合にも

[08:27 - 08:30]
ここでログを見ることができます。特にバックエンド、

[08:29 - 08:33]
つまりPython APIを操作する場合は、バック

[08:33 - 08:37]
エンドに何かを出力して

[08:35 - 08:39]
ここでログを見ることもできます。これは非常に便利です。

[08:39 - 08:44]
アップロードAPIを作成しようとしているのがわかります。これは

[08:42 - 08:45]
アップロードステートメントです。ただし、

[08:45 - 08:50]
実際に失敗することもありますが、

[08:48 - 08:52]
自動的に回復しようとします。ここに、

[08:52 - 08:56]
PDFファイルを受け入れるバックエンドとエンドポイントを作成しました、一意のファイル名を持つ

[08:54 - 08:58]
DBストレージバイナリにのみ保存します、

[08:58 - 09:03]
成功した場合はストレージパスを返します、これがクリックさ

[09:01 - 09:06]
れると、 コードも同様に

[09:03 - 09:08]
高速 API を使用しており、この

[09:06 - 09:11]
データ ボタンも使用しています。これは基本的に、

[09:08 - 09:12]
ストレージや

[09:11 - 09:15]
その他の用途にデータ ボタンの内部 API ですが、

[09:12 - 09:18]
基本的には

[09:15 - 09:19]
Python と高速 API を使用したアップロード ステートメント エンドポイントがあり、

[09:18 - 09:23]
それらのファイルをデータベースに保存できるはずです

[09:19 - 09:25]
。 ストレージ。 バイナリ、

[09:23 - 09:27]
つまりこの場合はデータボタンです。

[09:25 - 09:29]
これで

[09:27 - 09:31]
アップロードコンポーネントを実装してみましょう。クリックして、

[09:29 - 09:32]
何が起こるか見てみましょう。

[09:31 - 09:35]
ちなみに、コードを書き込む間、コードの書き込みを

[09:35 - 09:40]
待っている部分はいくつか省略します

[09:37 - 09:41]
ので、皆さんは省略する必要はありません。

[09:40 - 09:43]
このビデオは

[09:41 - 09:45]
短くまとめますが、このビデオの目的は、

[09:43 - 09:47]
データボタンの可能性を示すことです。

[09:47 - 09:51]
トースターやトーストなどのコンポーネントも作成しました。これは

[09:49 - 09:53]
変更されたアップロードページです。PDFを

[09:51 - 09:55]
アップロードしてみます。アップロード時に、

[09:57 - 10:01]
境界の最後に「Cが見つかりませんでした」というエラーが発生しているのがわかります。

[09:59 - 10:04]
ここでも問題が発生しています。そこで、アップロード機能を

[10:01 - 10:06]
テストして

[10:04 - 10:08]
、すべてが

[10:06 - 10:10]
機能することを確認します。今のところ、まだ機能していません。データボタンの

[10:08 - 10:13]
気に入っている点の1つは、

[10:13 - 10:17]
ログを確認して

[10:15 - 10:19]
自動的に処理してくれることです。そのため、私が操作する必要はありません。そのため、

[10:17 - 10:21]
このメッセージを送信します。

[10:19 - 10:22]
データボタンに任せてみます。PDFを

[10:21 - 10:25]
アップロードしようとすると、正常に動作するはずです。

[10:22 - 10:27]
試してみましょう。ここで、

[10:25 - 10:29]
まだエラーが発生していることがわかります。これは、

[10:27 - 10:30]
以前データボタンを試していたときに発生したエラーです。

[10:30 - 10:35]
特定のファイルをストレージにアップロードしようとすると、

[10:32 - 10:37]
文字、数字、または特定の記号しか使用できませんが、

[10:37 - 10:40]
アップロードしようとしているファイルには、

[10:38 - 10:43]
小さな括弧など他の文字が含まれている可能性があります。

[10:40 - 10:45]
このログを渡して、

[10:45 - 10:48]
自動的に修正するように指示します。ログを確認して

[10:47 - 10:51]
エラーを修正するだけです。

[10:48 - 10:53]
それでは、ファイルをアップロードしてみます。

[10:53 - 10:58]
正常にアップロードできたことがわかります。下に進むと、

[10:56 - 11:00]
これがPDFファイルであることがわかります。

[10:58 - 11:03]
これをクリックすると、これが

[11:00 - 11:05]
作成またはアップロードされたファイルであることがわかります。これで、

[11:03 - 11:07]
アップロード機能が実際に機能し、

[11:05 - 11:10]
PDFステートメントが表示されました。

[11:07 - 11:11]
次は分析部分に取り組みたい

[11:10 - 11:14]
ので、これを完了としてマークします。

[11:11 - 11:17]
これで完了です。

[11:14 - 11:20]
エージェントが次に何をすべきか教えてくれました。

[11:17 - 11:22]
分析エンジンとこれらのものがあるので、

[11:22 - 11:26]
Geminiとpine conでragをセットアップする必要があります。また、ステートメントを

[11:25 - 11:28]
分析するためのエンドポイントを作成し、内部に表示する

[11:26 - 11:30]
分析UIを構築する必要があります。

[11:28 - 11:32]
提案があります。

[11:30 - 11:35]
このタスクを続行しますか？

[11:32 - 11:37]
はいと言って、データボタンに任せます。

[11:39 - 11:43]
一度に行うには多すぎるので、小さなタスクに分割されることを期待していました。

[11:41 - 11:45]
ここで、エージェントが

[11:43 - 11:47]
自動的に提案しているのがわかります。つまり、

[11:45 - 11:49]
さらにタスクに分割されているということです。PDF

[11:47 - 11:51]
抽出と

[11:49 - 11:53]
処理、Geminiを使用したラックのセットアップ、

[11:51 - 11:55]
pine coneの経費分類、

[11:53 - 11:57]
分析、分析UI、洞察と

[11:55 - 12:00]
提案があります。ここで、

[12:00 - 12:06]
PDFをアップロードするときに埋め込みを作成するように提案します。

[12:03 - 12:07]
リクエスト時に作成すると、

[12:07 - 12:11]
毎回埋め込みを再生成することになるので、PDFをアップロードするときにragの

[12:09 - 12:13]
埋め込みを生成するようにプロンプ​​トを表示します。

[12:13 - 12:18]
そのために、Geminiとpineでragをセットアップします。

[12:16 - 12:21]
分析エンドポイント部分に進んだら、

[12:18 - 12:23]
データクエリを取得するだけで済みます。

[12:23 - 12:26]
データを終了するときには埋め込みは生成されないので、

[12:24 - 12:28]
そのまま送信します。エージェントは、

[12:26 - 12:30]
アップロードエンドポイントを変更して

[12:28 - 12:32]
これを実行し、

[12:30 - 12:34]
何が起こるかを確認します。その後、調査も行います。

[12:32 - 12:37]
つまり、

[12:34 - 12:39]
さまざまな URL にアクセスしてコードを確認し、

[12:37 - 12:41]
そこから分析することがあります。

[12:39 - 12:43]
調査が完了すると、開発者のようなコードが書き込まれます。

[12:43 - 12:48]
さて、Pine con の場合、

[12:46 - 12:49]
Pine con API キーを要求されるので、

[12:48 - 12:51]
それをすぐにコピーして

[12:49 - 12:54]
ここに入力し、[

[12:51 - 12:56]
送信] をクリックします。おもしろいですね。これで失敗しました。

[12:54 - 12:59]
これで Google API キーが取得できた

[12:56 - 13:00]
ので、AI Studio に移動できます。  google.com にアクセスして

[12:59 - 13:02]
このボタンをクリックすると

[13:00 - 13:05]
API キーが生成されるので、

[13:02 - 13:07]
これも使用してここに貼り付けます。

[13:07 - 13:10]
エージェントに API キーをハードコードしたことを通知します。API

[13:10 - 13:14]
エンドポイントのテストに進みましょう。

[13:12 - 13:16]
ファイルがアップロードされたら、

[13:14 - 13:18]
Pine Cone データベースに埋め込みが生成されるかどうかを確認します。それでは

[13:16 - 13:20]
試してみましょう。

[13:18 - 13:23]
ファイルをアップロードしてみましょう。PDF

[13:20 - 13:25]
ファイルをアップロードして、問題が

[13:23 - 13:27]
解決するかどうか確認してみましょう。API

[13:27 - 13:30]
キーの提供時に間違いがあったことが分かりました。正しく提供しました。

[13:28 - 13:32]
エージェントにエンドポイントを確認して試すように指示します。

[13:32 - 13:36]
アップロード ステートメントに進みます。

[13:34 - 13:38]
新しい PDF をアップロードします。Pine

[13:36 - 13:39]
Cone からエラーが表示されます。

[13:38 - 13:41]
このログをコピーしてチャットで共有します。

[13:41 - 13:45]
以前データ ボタンを試した時にもこのエラーが発生したと思います。それでは

[13:43 - 13:48]
すぐに解決するかどうか確認しましょう。 では、

[13:45 - 13:50]
新しい PDF をアップロードしてみましょう。

[13:48 - 13:52]
クラウドとリージョンは提供していないので、

[13:50 - 13:55]
これをコピーして

[13:52 - 13:57]
データ ボタンに送信します。

[13:55 - 13:58]
これらの値がわからないか、

[13:57 - 14:01]
実際にはわかっているのですが、入力したくないので、

[13:58 - 14:02]
データ ボタンに

[14:01 - 14:04]
デフォルト値を判断させて

[14:02 - 14:07]
作成させます。では、

[14:04 - 14:10]
この場合は USW 2 を使用し、クラウドは

[14:07 - 14:12]
AWS を使用しているので、

[14:10 - 14:14]
別のファイルをアップロードしてみます。これをリロードして

[14:12 - 14:16]
ログをクリアし、ファイルを

[14:14 - 14:20]
再度アップロードします。これで、不正なリクエストがありました。

[14:16 - 14:23]
ここでは、US West 2 は

[14:20 - 14:26]
実際にはサポートされていないと表示されています。そのため、

[14:23 - 14:28]
Pine Cone には US E1 を使用することをお勧めします。以前は E1 を使用していたと思います。では、もう一度

[14:28 - 14:32]
試してみましょう。今のところエラーはありません。

[14:31 - 14:35]
どうなるか見てみましょう。

[14:32 - 14:38]
アップロードは成功しましたが、埋め込みの

[14:35 - 14:40]
実際の生成に関するログは表示されませんでした。

[14:38 - 14:42]
しかし、Pine Cone に到達すると、US

[14:40 - 14:45]
East の埋め込みがあることがわかり、

[14:42 - 14:47]
銀行の明細書も確認できます。 これは

[14:45 - 14:50]
私たちのアプリケーション用です。これが

[14:47 - 14:52]
使用されているインデックスです。

[14:50 - 14:54]
ここに明細書も表示されています。

[14:52 - 14:57]
データもあり、埋め込みが

[14:54 - 14:59]
生成されています。さあ、始めましょう。

[14:57 - 15:01]
少し時間がかかりましたが、これで完了です。

[14:59 - 15:03]
もう一度試してみたいので、

[15:01 - 15:05]
念のためこのファイルを削除し、

[15:03 - 15:07]
Pine Con に移動してこの

[15:05 - 15:09]
ベクターも削除します。ファイルを

[15:07 - 15:11]
もう一度アップロードしてみます。明細書のアップロード

[15:09 - 15:13]
に移動し、PDF を

[15:11 - 15:16]
もう一度アップロードします。現在アップロード中です。

[15:13 - 15:17]
応答が表示されません。

[15:16 - 15:19]
次に自動的に

[15:17 - 15:22]
経費の分析に進みます。これは非常に便利です。

[15:19 - 15:25]
銀行明細書に移動して再ロードすると、

[15:22 - 15:27]
ここに埋め込みがあります。

[15:25 - 15:29]
さて、この部分は完了したと思います。

[15:27 - 15:31]
実際に経費の分析に進みましょう。

[15:29 - 15:33]
エージェントにプロンプ​​トを表示します。素晴らしいですね。PDF の

[15:31 - 15:35]
アップロードと

[15:33 - 15:38]
ベクターの生成は問題なく機能しています。

[15:35 - 15:40]
分析の取得に移りましょう。分析は

[15:38 - 15:42]
PDF ファイルごとに正確である必要があり、

[15:42 - 15:46]
たとえば PDF ごとに 500 件のトランザクションを含めることができます。 支出

[15:44 - 15:49]
習慣、

[15:46 - 15:51]
カテゴリ別の一般的な加盟店に関する提案と情報が必要です。

[15:49 - 15:53]
それでは始めましょう。ここにはそれが

[15:51 - 15:55]
役立つと書かれていますので、

[15:53 - 15:57]
Pineからベクトルを取得するAPIが必要です。Geminiを使用して

[15:55 - 15:59]
トランザクションを分析し、

[15:57 - 16:01]
支出を分類して返す加盟店の

[15:59 - 16:03]
分析と

[16:01 - 16:05]
提案です。よし、最後に

[16:03 - 16:07]
エージェントが停止して、たくさんのコードを書き込みました。

[16:05 - 16:09]
ここに

[16:07 - 16:11]
分析ステートメント404ステートメントが見つかりません

[16:09 - 16:13]
最新のものが見つかりませんと表示されています。

[16:11 - 16:15]
ここでファイルを見ると、ここにファイルがあり、

[16:15 - 16:19]
分析ステートメント用に作成されたエンドポイントを見ると、

[16:17 - 16:22]
下に行くとルータがあることがわかります。

[16:19 - 16:24]
getet には analyze statement SL ファイル名と書かれています。

[16:22 - 16:26]
エージェントに、

[16:24 - 16:27]
analyze statement エンドポイントでは

[16:26 - 16:29]
ファイル名は不要だと伝えています。

[16:29 - 16:34]
データボタンストレージに既に存在する PDF ファイルを読み取り、ドラッグするだけで済みます。

[16:31 - 16:36]
期待どおりです。期待どおりです。

[16:34 - 16:38]
エージェントに、ログを見ると

[16:38 - 16:42]
Pine Cone から特に何も取得されていないか、PDF コンテンツを使用して

[16:41 - 16:45]
Gemini に送信しているようです。これは送信したくありません。

[16:42 - 16:47]
埋め込み sld qu rag だけを使用しています。

[16:45 - 16:49]
エージェントは「なるほど、埋め込みで rag を

[16:47 - 16:51]
適切に使用するようにコードを修正する必要があるのですね」と言います。

[16:51 - 16:57]
これでデプロイできますが、

[16:54 - 16:59]
リロードして

[16:57 - 17:01]
動作を確認することもできます。リロードしてどうなるか見てみましょう。

[16:59 - 17:04]
ファイルのリストが表示され、

[17:01 - 17:06]
pineco 埋め込みが作成されます。Vector

[17:06 - 17:11]
データベースにステートメントテキストが見つかりません、と表示されます。

[17:08 - 17:13]
ここでも一致するものは見つかりません。最適な一致

[17:11 - 17:16]
スコアは興味深いです。

[17:13 - 17:18]
ログを確認するようにエージェントに指示し、

[17:18 - 17:23]
ステートメントをアップロードするために使用するコードを確認します。

[17:21 - 17:25]
Pine Cone に適切なものを送信します。

[17:23 - 17:27]
見つからないので、エージェントにログを分析するように指示しています。Pine

[17:27 - 17:31]
Cone には一致するものが 1 つあるにもかかわらず、何も見つからないようです。

[17:31 - 17:35]
メタデータが見つからないと表示されます。Pine Cone にベクターを

[17:33 - 17:38]
アップロードするのに適切なものを使用しているかどうか確認します。そうで

[17:35 - 17:40]
ない場合は、エージェント

[17:38 - 17:42]
自体から何か提案します。

[17:40 - 17:43]
ここでのポイントは、

[17:42 - 17:45]
コードを 1 行も書く必要がなく、データ

[17:43 - 17:47]
ボタンですべてを実行できるようにすることです。

[17:45 - 17:49]
これで問題が見つかりました。Pine Cone にアップロードする

[17:47 - 17:51]
ときにメタデータにテキストが保存されていません。

[17:51 - 17:54]
アップロードエンドポイントと分析エンドポイントの両方を修正します。これが

[17:53 - 17:57]
私の考えです。Pine

[17:54 - 17:59]
Cone のデータを確認すると、値のみが表示され

[17:57 - 18:01]
、メタ

[17:59 - 18:03]
データがまったくありません。おそらくメタデータは必要です。

[18:01 - 18:06]
また、

[18:06 - 18:10]
Pine Cone に保存しているデータをチャンクに分割し、複数の小さなチャンクに分散させると、

[18:10 - 18:14]
クエリが高速化される可能性があります。よく

[18:12 - 18:16]
わかりませんが、確認してみましょう。

[18:14 - 18:18]
すでに Pine Cone のメタデータにチャンクが保存されているようです。

[18:16 - 18:20]
よし、

[18:20 - 18:25]
ここからファイルを削除して、Pine Cone に移動して

[18:23 - 18:27]
このベクターも削除します。エージェントはおそらく

[18:27 - 18:32]
私の考えをすでに聞いているでしょうが、

[18:29 - 18:34]
抽出したテキストを

[18:32 - 18:36]
8,000 文字のチャンクに保存しています。

[18:34 - 18:39]
新しいファイルをアップロードしようとしています。

[18:36 - 18:40]
これで何かが送信され、

[18:39 - 18:43]
分析も行われ、

[18:40 - 18:45]
データも返ってきました。これで、

[18:43 - 18:47]
分析のために Gemini に送信しています。Pine

[18:45 - 18:49]
Cone を見ると

[18:47 - 18:52]
新しいベクターが表示されるはずです。

[18:49 - 18:54]
更新すると、

[18:52 - 18:58]
ここにテキスト チャンクが表示されます。ここをクリックすると、「Expecting

[18:58 - 19:02]
delimeter blah blah blah error

[19:00 - 19:05]
passing AI response」と表示されます。そこで、少し休憩して

[19:02 - 19:07]
戻ってきて、できる限り修正するように指示を続けました。

[19:07 - 19:11]
エージェントに、Pine Cone の

[19:09 - 19:14]
すべてのベクターを使用して PDF 全体を分析するように指示しています。

[19:14 - 19:17]
支出総額が一貫しているようにして、

[19:16 - 19:20]
毎回同じ応答と

[19:17 - 19:22]
カテゴリ別の支出が得られるようにします。 うまく

[19:20 - 19:24]
動作していないようですので、エージェントが何をするか見てみましょう。

[19:22 - 19:26]
応答が表示されています。26,000

[19:24 - 19:28]
Suクラウンがあり、

[19:26 - 19:31]
送金があります。他にも

[19:28 - 19:33]
交通機関、

[19:31 - 19:35]
レストラン、カフェなどの取引があります。

[19:33 - 19:38]
ここには

[19:35 - 19:40]
100%興味深いカテゴリも表示されています。また、

[19:38 - 19:42]
トップレベルの加盟店

[19:40 - 19:44]
とすべてのトップ加盟店も表示されています。この場合、

[19:42 - 19:46]
これは実際には私のアカウントです。

[19:44 - 19:48]
ここに情報を転送しているからです。

[19:46 - 19:50]
これは3

[19:48 - 19:52]
回実行したことがわかります。これは非常に

[19:50 - 19:54]
クールです。最後に、

[19:52 - 19:56]
チャットインターフェースを作成して、

[19:56 - 20:00]
そこから質問できるようにします。

[19:58 - 20:03]
実際にラグが発生しているのを確認できます。まず、

[20:00 - 20:05]
このタスクを完了として

[20:03 - 20:09]
マークします。次に、

[20:05 - 20:12]
ユーザーが

[20:09 - 20:14]
取引について質問できるチャットインターフェースが必要です。

[20:12 - 20:17]
つまり、

[20:14 - 20:19]
UIだけでなく

[20:17 - 20:20]
バックエンドの実装も必要になります。これで

[20:19 - 20:22]
いくつかのタスクが作成されました。タスクの表示に移動すると、

[20:20 - 20:25]
トランザクション

[20:22 - 20:26]
チャットインターフェースの実装が表示されます。 いいですね。それで、

[20:25 - 20:28]
この

[20:26 - 20:30]
機能に今すぐ取り組み始めますか？と聞かれます。チャットインターフェースでは

[20:28 - 20:32]
ユーザーがこのような質問をできるようになります。

[20:30 - 20:34]
いいですね。

[20:32 - 20:36]
それでは、「CHインターフェースを実装する」としましょう。

[20:36 - 20:40]
チャット機能用の新しいAPIエンドポイントを作成しているのがわかります。

[20:40 - 20:44]
すでにこのチャットバックエンドがあるのがわかります。エージェントが

[20:42 - 20:47]
新しいAPIエンドポイントチャットをトランザクションで作成し、

[20:47 - 20:51]
分析ページを更新して実際にすべてを含めるようにしました

[20:49 - 20:54]
が、ページにアクセスすると最初にすべての

[20:51 - 20:55]
分析を取得しようとし、

[20:54 - 20:57]
その後チャットインターフェースが表示されると思います。

[20:55 - 20:59]
このUIでは、

[20:57 - 21:01]
チャットを使用するには

[20:59 - 21:04]
分析が

[21:01 - 21:06]
完了するまで待たなければならないという問題があります。エージェントに

[21:04 - 21:08]
チャット機能をこの分析ページから移動するように依頼できます。

[21:06 - 21:10]
それでは、チャット機能を

[21:08 - 21:12]
移動しました。ホーム画面に戻ると、

[21:10 - 21:14]
AIとの明細書アップロードチャット

[21:12 - 21:17]
と経費分析が表示されます。明細書のアップロードは

[21:14 - 21:19]
まだ問題なさそうです。AI

[21:17 - 21:21]
とのチャットに移動できます。ここでは、「上位3つの経費を

[21:19 - 21:24]
表示」などの質問を実際に行うことができます。

[21:21 - 21:26]
そこに入力して

[21:24 - 21:28]
送信するとどうなるか見てみましょう。

[21:26 - 21:30]
ここでは、

[21:28 - 21:33]
支出の上位3つが送金、20,000

[21:30 - 21:35]
スウェーデンCRS保険、そして

[21:33 - 21:37]
ローンであることが分かります。次に、食料品の支出はいくらで、どこで支出したかを尋ねています。これを

[21:54 - 21:59]
送信してみましょう。すると、合計支出額が分かります。また、eaxi、Samona Quantumなどにお金を使ったことがわかります。willy Smart Fenなどにもお金を使ったのが分かります。とてもいいですね。次に、旅費を日付付きでリストアップしてもらいます。これをすべて送信します。ここには

[21:56 - 22:01]
いくつかの支出があります。Monga

[21:59 - 22:03]
arbnbです。

[22:01 - 22:06]
サンフランシスコでも取引がありましたね。

[22:03 - 22:08]
興味深いですね。

[22:06 - 22:11]
応答を受け取ったときにローダーを追加して、それ

[22:08 - 22:14]
についても尋ねられるようにしたい

[22:17 - 22:20]
と思います。バックエンドからの応答を待っているときに、チャットインターフェースにローダーを追加します。すべて送信しましょう。これでローダーが必要になったようです。では、

[22:19 - 22:23]
少なくとも展開を開始します。

[22:23 - 22:28]
ポーランドで何か使ったかどうかを尋ねます。確認してみましょう。

[22:26 - 22:30]
はい、この金額をポーランドで使ったと表示されます。 ポーランドの

[22:28 - 22:33]
次の取引は、

[22:30 - 22:35]
ポーランドでの取引です。これはvwaです。これはvwaです。とても

[22:33 - 22:37]
分かりやすいですね。これは

[22:35 - 22:40]
とてもクールで、

[22:37 - 22:42]
コードを1行も書く必要がありませんでした。

[22:40 - 22:45]
私が行ったのは、

[22:42 - 22:48]
使用していたモデルをGemini

[22:45 - 22:50]
1.0からGemini 1.5 Proにアップデートしただけです。手動で行ったのはこれだけです。これで

[22:50 - 22:54]
デプロイが完了したので、テストしてみましょう。

[22:52 - 22:57]
本番環境のURLにアクセスします。

[22:54 - 23:00]
これはAI経費管理ツールです。AI

[22:57 - 23:03]
とチャットすると、同じ画面が表示されます。

[23:00 - 23:06]
ここでドイツでいくら使ったかを尋ねることができます。

[23:03 - 23:08]
ここで、ナンベルグでいくら使ったかを確認できます。

[23:08 - 23:12]
デスフェストやデベロップメントフェストのナンベルグで講演した際に使った金額です。また、

[23:12 - 23:17]
空港でもいくら使ったかを確認できます。

[23:15 - 23:19]
これでデプロイが完了し、

[23:17 - 23:22]
問題なく動作します。経費を分析したい場合は、

[23:22 - 23:26]
ここでも分析結果を確認できます。

[23:24 - 23:28]
分析結果をロードしている間に、

[23:26 - 23:30]
最後にもう1つ実装して、

[23:28 - 23:32]
皆さんと共有したいと思います。それは、

[23:30 - 23:36]
アップロードした

[23:32 - 23:38]
PDFを削除し、

[23:36 - 23:40]
Pine Coneから

[23:38 - 23:43]
も削除します。そこで、アップロードページで

[23:40 - 23:45]
すべてのPDFをリストとして表示し、

[23:45 - 23:49]
そこからPDFを削除できるようにすることをプロンプトに依頼しています。これにより、Pine Coneから

[23:47 - 23:51]
関連するベクター埋め込みも削除されるはずです。

[23:49 - 23:54]
ユーザーは

[23:51 - 23:55]
自分のPDFを試して削除できるようになります。

[23:54 - 23:57]
とりあえずこれを送信します。

[23:57 - 24:01]
分析から取得したデータもここにあります。

[23:59 - 24:03]
すべてのカテゴリも表示されています。

[24:03 - 24:08]
販売者も表示されています。これらはすべてここにあり

[24:05 - 24:10]
ます。これで、PDFファイルの削除とリスト表示のための

[24:08 - 24:13]
APIエンドポイントが既に作成されていることがわかります。

[24:13 - 24:17]
エージェントにPDFファイルが見つからないことを伝えています。

[24:17 - 24:21]
アップロードページに行ってもまだステートメントがないため、

[24:21 - 24:26]
ストレージからPDFファイルを参照するように指示しています。これは、

[24:24 - 24:29]
コードに問題がある場合は分析するものです。

[24:26 - 24:31]
これで、

[24:29 - 24:33]
アップロードステートメントがここにあります。これで

[24:31 - 24:36]
削除もできるはずです。

[24:33 - 24:38]
削除アクションはいいですね。

[24:36 - 24:39]
これで、正しいファイル名の比較を使用するように削除エンドポイントも修正されました。いいですね。これは

[24:41 - 24:45]
要求していませんでしたが、実行されているので

[24:43 - 24:47]
いいですね。

[24:45 - 24:49]
これを削除したら、PDFと

[24:47 - 24:51]
松ぼっくりも削除されるかどうかを確認したいので、今削除する場合は

[24:49 - 24:54]
削除を確認します。

[24:51 - 24:57]
この場合、500を取得しました。

[24:54 - 24:59]
詳細についてはログを確認してください。ファイルは消えています。

[24:57 - 25:01]
松ぼっくりは消えていないと思います。

[24:59 - 25:04]
更新しましょう。

[25:01 - 25:06]
ロックを確認します。削除時に500を取得しました。更新後も

[25:06 - 25:10]
ここにデータがまだ表示されます。これが

[25:08 - 25:13]
問題の原因かもしれません。ファイルは

[25:10 - 25:15]
削除されたため、もうありません。

[25:13 - 25:17]
今すぐファイルを追加してみます。

[25:15 - 25:19]
簡単に実行しますが、

[25:17 - 25:22]
ここからもすべて削除します。これで

[25:19 - 25:25]
34個のチャンクが取得されました。これは

[25:22 - 25:27]
現在そこにあるはずです。更新すると

[25:25 - 25:29]
32個のチャンクがあります。いいですね。

[25:27 - 25:32]
まずは松ぼっくりのベクターを削除する必要があります。

[25:29 - 25:35]
PDF自体な

[25:32 - 25:39]
ので、まず松ぼっくりのベクトルを削除し、

[25:35 - 25:41]
次にファイルを削除します。

[25:39 - 25:45]
これで32個のベクトルを削除できます。Pine

[25:41 - 25:47]
Coneに移動すると、データがありません。PDFも

[25:45 - 25:49]
削除されているはずです。

[25:49 - 25:54]
ここにも表示されていないはずです。

[25:52 - 25:57]
これをリロードして、実際に

[25:54 - 25:59]
デプロイしてみましょう。アプリをデプロイします。PDFをアップロードします。アップロードされています。

[26:02 - 26:07]
埋め込みも生成されています。

[26:04 - 26:09]
すべてが保存されました。

[26:07 - 26:12]
ここにPDFがあります。ファイルもあります。デプロイメントにアクセスして、

[26:15 - 26:22]
ホームページにアクセスしてAIとチャットすると、

[26:19 - 26:25]
ポーランドの取引が表示されます。

[26:22 - 26:27]
同じ取引が表示されます。これで

[26:25 - 26:29]
正常に動作しています。削除したい場合は、「削除」と入力するだけで削除できます。これで正常に動作するはずです。

[26:31 - 26:37]
松ぼっくりのベクトルを削除しました。これにより、

[26:34 - 26:39]
PDFとベクトルの情報が削減されます。

[26:39 - 26:43]
このデモを今試している場合は、簡単に削除して

[26:41 - 26:45]
確認できます。 すべて

[26:43 - 26:47]
削除されました。それでは、

[26:45 - 26:49]
この動画を楽しんでいただけたでしょうか。

[26:47 - 26:51]
データボタンの操作は本当に楽しかったです。特に、

[26:51 - 26:56]
コードを1行も書かなくて済んだのが良かったです。

[26:57 - 27:02]
シークレットがアップロードされないなど、いくつか問題が発生しましたが、

[27:00 - 27:04]
データボタンのサポートは素晴らしく、すぐに問題を解決し、

[27:04 - 27:09]
できるだけ早く連絡してくれました。また、データ

[27:07 - 27:11]
ボタンのエージェントが問題に困ったときでも、

[27:09 - 27:14]
自動的に問題を解決してくれました。

[27:11 - 27:17]
データ

[27:14 - 27:20]
ボタンは、ジュニアエンジニアからシニアエンジニアまで、あらゆるレベルのエンジニアが使用できるように感じます

[27:17 - 27:22]
が、

[27:20 - 27:24]
経験によって、データボタン

[27:24 - 27:29]
で作成できるアプリケーションの種類が大きく変わります。

[27:26 - 27:31]
私が、経験豊富な情報に基づいて、

[27:29 - 27:33]
自分がやりたいことを非常に正確に指示しているのを見ました。

[27:33 - 27:37]
また、特定の

[27:35 - 27:39]
リンクを指定したり、特定のテクニックを伝えたりする必要がありました。

[27:37 - 27:41]
ツール自体は素晴らしいですが、

[27:39 - 27:43]
誰が

[27:41 - 27:45]
ツールを使い、どのように使って

[27:43 - 27:47]
素晴らしいアプリケーションを作成しようとしているかが重要です。

[27:47 - 27:50]
動画をご覧いただきありがとうございました。気に入っていただけたら、高評価

[27:48 - 27:52]
ボタンを押してください。チャンネル登録もありがとうございます。

[27:50 - 27:53]
チャンネルはすでに

[27:52 - 27:55]
ありがとうございます。いつも

[27:53 - 27:57]
のように次のビデオでお会いしましょう。コーディングを楽しんでください。

## コメント

### 1. @khizerrehan7164 (👍 4)
Woah!! This is MIND blowing .

Q1: How did you get 2000 credits? Was it paid promotion? And It would be great how much credits utilisations was in making this back/forth? Isn't too much expensive?

Q2:
I am not sure what advancements will emerge in the AI world in the coming months, but the pace of change is remarkable. AI is increasingly taking over many tasks and, trust me, it's delivering better-quality code with fewer hallucinations. How should one approach this shift? Should we start embracing AI tools, or should we focus on learning about concepts like RAG  and diving deeper into AI/ML technologies?

what are some good resources to get started??

> **@CodeWithAhsan** (👍 0): Answer to Q1: Yes, it was a paid campaign . I got credits from them therefore

Answer to Q2: I think the price is fine, especially for senior devs who could leverage it to build mvps quickly. 200$/month with 1000 credits seems feasible to  me to be honest.
I could build this in less than 500 credits :)

> **@andrinSky** (👍 0): Yes Databutten is good but MUCH too EXPENSIVE!!!

### 2. @khusroosyed4860 (👍 0)
awesome ahsan bhai, please make more videos on these ai tools

### 3. @BamaPatriot61 (👍 0)
Wow, fantastic video! So glad i found your channel! This was a code builder i was not very familiar with.  I only knew it was a bit pricey for many people.  However, the capabilities of it seem to be much better than some others I’ve been looking at.  I’m looking to build a fairly complex website with embedded apps and this one might be the answer.  Seems like Bolt, windsurf, Cursor and VScode all have limitations that make things more complicated.  For example, building the front end in Bolt and then importing the code into Cursor.  

My main question or concern would be about the api calls and how much of a tab would that create for a website with a lot of traffic that is old be using the embedded apps? 

Definitely going to watch your other videos.  Awesome job!

### 4. @javahadoopdeveloper8885 (👍 0)
First tiime hearing this AI 😊😊

### 5. @cucciolo182 (👍 1)
Is this for real? This is even better than Devin!

> **@CodeWithAhsan** (👍 1): @@cucciolo182 this is real 😄 so far the best one that I’ve enjoyed using

> **@cucciolo182** (👍 0): @@CodeWithAhsan I got access to Devin two months ago, and I haven’t been able to do anything with it. Customer service has been completely useless.

### 6. @fredconv (👍 0)
hi great video

Some questions Please 

can you "import" ressources like , pdf and or images that could be used as reference or target designed, for fonctionnality, design or anything else ? 
do you have any idea of the cost of the app you have made , just to have an idea of the general cost ? 
once created, can you export / combine all the fiels into one app so you can export it and host it somewhere else ? like a standalone app you could download, or on any other plateform ? 

thanks :)

### 7. @Omar-s7m6h (👍 2)
One question from my side: 
Is this Databutton able to modify code, or will it rewrite the entire code, like its competitors?

> **@CodeWithAhsan** (👍 1): @@Omar-s7m6h it can rewrite the whole code. In some cases when I asked about a feature, it wrote both frontend, backend, and UI components in one go

> **@viralshah4052** (👍 1): We first try to patch code before rewriting, only rewrite when necessary

> **@stefano94103** (👍 0): you can but. it'll be expensive because it eats up your credits.

> **@TrygveKarper** (👍 2): Hi there, Databutton does only generates the code that is needed to change and don't rewrite the entire file unless that is needed (e.g changes are allover or total rewrite is needed)

### 8. @rixiofn3204 (👍 0)
-can we export the code like bolt ?
-the thing that i dont like is you should host on their server if they had what bolt have as functionnalities + this new agent  ,that would be the best combo

### 9. @andrinSky (👍 1)
Yes Databutten is good but MUCH too EXPENSIVE!!!

### 10. @ProtikPC_pro_indigo (👍 1)
Hey Ahsan, could you do me a favor? I saw a project called pet-market in your git repositories. Could you please create a live demo link for that app? I need to see that one in action. Thanks

> **@CodeWithAhsan** (👍 0): Hey, I am currently working on it for an upcoming full stack tutorial for this YouTube channel :) Stay tuned

### 11. @LucidDataAnalytics (👍 2)
This is a brilliant tutorial Ahsan, can you please make this in Urdu?

> **@CodeWithAhsan** (👍 0): @@LucidDataAnalytics i don’t think I will, since the target audience isn’t compatible that way

### 12. @mzafarr (👍 1)
It's good but seems to be quite expensive.

> **@CodeWithAhsan** (👍 0): @@mzafarr what would you suggest to them for pricing?

> **@powermyapps** (👍 1): @@CodeWithAhsan75 edits shouldn’t be $20… maybe 750 but not 75

> **@andrinSky** (👍 1): Yes Databutten is good but MUCH too EXPENSIVE!!!

### 13. @dgitalnarrative (👍 0)
One small thing, though - you have no access to the code whatsoever.

> **@CodeWithAhsan** (👍 2): @@dgitalnarrative not really. You can edit the code yourself as well. I mentioned in the video that I changed the gemini model I wanted to use.
However, I deliberately didn’t write actual code myself because that would defeat the purpose of this video

### 14. @gorandigitalnomad (👍 1)
Dislike because you not mention that this is paid promotion.
We all have 24 hours available during the day. I don't want to waste my precious time on things like this!

> **@CodeWithAhsan** (👍 0): @@gorandigitalnomad thanks for the comment. Look at the video’s paid promotion carefully next time. 
Also, I did mention in the video that this video is paid. As I said, watch more carefully in the future to save your own time

### 15. @stefano94103 (👍 0)
Is this an advertisement? Databutton is not used by most developers because you're stuck into deploying and hosting on their servers. Also you're stuck using their Ai (who knows what Ai you're getting?), and finally it's super expensive to build anything on Databutton. The iterations also can make it really expensive. This is why no one I know who are developers uses Databutton.

> **@CodeWithAhsan** (👍 0): 1. This is indeed a paid promotion video as the label of the video says
2. Databutton is relatively new and used by a lot of non-technical people to close a big knowledge gap but also developers who want to build things super fast
3. If you want full control of your AI and are a professional developer, there are definitely other tools and IDEs that might fit you better
4. I can’t comment on the pricing yet. But I do get the concern :)

> **@javahadoopdeveloper8885** (👍 0): Great question

> **@fahadhussain9824** (👍 0): So which are better alternatives to Databutton that can build apps using AI without any Issue also free or budget friendly

> **@stefano94103** (👍 1): @ for something super simple like landing page or commercial website these are excellent. But anything requiring a lot of backend processing, that is complicated or complex code none of these do to well. Maybe when open Ai comes out with their  o3 model it will be better but for now none of these LLMs can handle or remember complex apps.

> **@fahadhussain9824** (👍 0): @@stefano94103 Yeah So right but as you are seeing there's lot of tools coming in the market everyday, So how we Should know Which One build complex apps using Prompt which is the right way to track ?

