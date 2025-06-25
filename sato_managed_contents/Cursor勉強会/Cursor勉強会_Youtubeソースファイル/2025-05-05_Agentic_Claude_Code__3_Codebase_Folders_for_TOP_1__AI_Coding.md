# Agentic Claude Code: 3 Codebase Folders for TOP 1% AI Coding

**チャンネル:** IndyDevDan
**公開日:** 2025-05-05
**URL:** https://www.youtube.com/watch?v=hGg3nWp7afg

## 説明

MOST devs are OVERLOADING their AI tools with USELESS files… and tanking their own productivity. 

Want the TOP-1% edge? Slice your repo down to 3 laser-focused folders and watch Claude Code, Codex, Cursor – with ANY SOTA model – crank out features while you sip coffee LIKE A TOP G CODER. 🔥🤯

🎥 VIDEO REFERENCES
- Principled AI Coding: https://agenticengineer.com/principled-ai-coding?y=hGg3nWp7afg_a
- Pocket Pick: https://github.com/disler/pocket-pick
- AI Coding is NOT ENOUGH: https://youtu.be/2TIXl2rlA6Q
- Claude Code: https://www.anthropic.com/claude-code

Why you should care
- Context is KING. These 3 folders (ai-docs, specs, .claude) give your agentic coding workflow an instant memory palace, letting any ai coding assistant understand your project in seconds.
- Turn “prompt engineering” into rocket fuel: reusable commands, self-validating plans, and feature-specific context primes.
- See IndyDevDan demo real code changes with Claude Code, then rinse-and-repeat the exact same pattern with Codex, Cursor, or your favorite LLM.
- Inside specs lives the PLAN, and in principled ai coding the plan IS the prompt. Bigger specs = bigger compute swings.
- Pocket Pick shows how a tiny SQLite MCP server + these folders creates a personal knowledge base that scales across projects and time.
- Whether you’re shipping micro-features or entire services, this structure keeps your AI on target and your token bill low.

Key Wins
- Agentic coding supercharges ai coding by adding planning, testing, and tooling loops.
- Claude code’s slash-commands (aka prompt templates) prove reusable prompts beat ad-hoc iterative ai coding every time.
- cursor & codex users: drop these folders in and watch your agentic coding tool GET TO WORK FOR YOU.

Deploy the pattern today, level up with principled ai coding tomorrow, and join indydevdan on the road to repos that build themselves. 💪🚀

📖 Chapters
00:00 Three ESSENTIAL Folders
01:04 AI Docs - AI Agent Memory
02:12 Specs - Your AI Coding Plans
04:38 Dot Claude - Your Reusable Prompts
08:34 Agentic Coding with Plan Drafting
15:20 Execute the Plan

#agenticcoding #aicoding #promptengineering

## 字幕

[00:00 - 00:05]
エンジニアの皆さん、元気ですか?  IndydevのDanです。

[00:03 - 00:08]
コードベースを開くと、

[00:05 - 00:10]
AI コーディング ツールが Readme を読むよりも速く、より正確にコードベースを瞬時に理解することを想像してみてください

[00:10 - 00:16]
。

[00:16 - 00:21]
あなたが関わるすべてのプロジェクトでそのスーパーパワーを発揮できるシンプルなフォルダーが 3 つあります

[00:19 - 00:23]
。 これらを

[00:21 - 00:26]
原子レベルまで分解して、

[00:23 - 00:29]
コンピューティングの優位性を高めるために活用できるようにします。

[00:26 - 00:32]
使用する AI コーディング ツールによって、生成 AI 時代のエンジニアリングのこの重要な事実が変わることはありません

[00:32 - 00:37]
。

[00:35 - 00:41]
カーソルファン、Windsor、Fline、

[00:37 - 00:43]
Codeex、あるいはClaude コードのファンであっても問題ありません。

[00:41 - 00:46]
このアイデアが何であるかは、すでにご存じでしょう。 文脈が

[00:43 - 00:49]
すべてです。 文脈こそが重要です。

[00:46 - 00:52]
エージェントが重要な情報を確認できない場合は、

[00:49 - 00:54]
必要なものを構築することができません。

[00:52 - 00:56]
これら 3 つの重要な

[00:54 - 00:59]
ディレクトリがそれを解決します。 包括的かつ

[00:56 - 01:02]
体系的に。 これら

[00:59 - 01:06]
3 つの重要なディレクトリと、

[01:02 - 01:06]
それらがエンジニアリング作業にとってなぜ価値があるのか​​について説明しましょう

[01:07 - 01:14]
。 まずは基礎 AI ドキュメントから始めましょう

[01:11 - 01:17]
。 これは、AI コーディング

[01:14 - 01:20]
ツールの永続メモリ、つまり

[01:17 - 01:22]
AI ツールが即座にアクセスできる知識リポジトリと考えてください

[01:20 - 01:25]
。 クラウド コードの内部は

[01:22 - 01:27]
プログラム可能なコードベースです。

[01:25 - 01:30]
先週のビデオで議論した大きなアイデア。

[01:27 - 01:32]
AI ドキュメント ディレクトリがあることがわかります。

[01:30 - 01:35]
このディレクトリ内には 2 つのマークダウン ファイルがあります

[01:32 - 01:39]
。 クラウド コードのベスト プラクティスと

[01:35 - 01:41]
オープン AI のエージェント SDK。 これで、

[01:39 - 01:44]
任意のエージェントを起動して、これらのファイルをすぐに読み取ることができるようになりました

[01:41 - 01:46]
。 その後、方向転換して

[01:44 - 01:48]
すぐに仕事を終わらせることができます。 では、

[01:46 - 01:50]
AI ドキュメントには何が含まれているのでしょうか? ここには、

[01:48 - 01:52]
サードパーティの API ドキュメント、

[01:50 - 01:54]
統合の詳細、カスタム

[01:52 - 01:56]
パターンと規則、

[01:54 - 01:58]
実装に関するメモ、コードベースに固有のあらゆる情報があり

[01:56 - 02:01]
、すべてが AI ドキュメントに含まれます

[01:58 - 02:04]
。 私は主にこれをサードパーティのドキュメント作成に使用して、

[02:04 - 02:09]
コード ベースを何度も簡単に強化できるようにしています。

[02:06 - 02:14]
AI ドキュメント ディレクトリは、AI エージェントの永続的な

[02:09 - 02:14]
データベースです。

[02:15 - 02:19]
したがって、もちろん、specs ディレクトリがあります

[02:17 - 02:22]
。 仕様ディレクトリには何を入れますか

[02:19 - 02:24]
?  Specs は

[02:22 - 02:27]
specification の略で、計画という意味もあります

[02:24 - 02:29]
。 これらは、PRD、

[02:27 - 02:32]
製品ドキュメントなど、何と

[02:29 - 02:33]
呼んでも構いません。 これらは、

[02:33 - 02:38]
AI コーディング ツールを使用して膨大な量の作業を実行するための新しい単位です。 そして、

[02:35 - 02:41]
エージェント コーディング ツールを使用すると、

[02:43 - 02:48]
クロー コード、カーソル、ラインなどの強力なエージェント コーディング ツールによって、単一のプロンプト内で複数のツールを使用できるようになりました

[02:46 - 02:52]
。  specs ディレクトリは、コードベース

[02:48 - 02:55]
全体の中で最も重要なフォルダーです

[02:52 - 02:57]
。 ここで素晴らしい計画を書きます

[02:55 - 03:00]
。 ここでコンピューティングをスケールアップし

[02:57 - 03:04]
、一度に大量の処理をこれまで以上に実行します

[03:00 - 03:08]
。 この 1,000 トークンの

[03:04 - 03:10]
プロンプトはコードベース全体に拡張されました。

[03:08 - 03:12]
これは私たちがエージェントコーディングをしているという事実によるものです

[03:10 - 03:15]
よね？

[03:12 - 03:18]
プロンプト内に自己検証ループを記述できます。

[03:15 - 03:21]
覚えておいてください、エージェント コーディングは

[03:18 - 03:23]
AI コーディングのスーパーセットであり、大規模なスーパーセットです。

[03:21 - 03:25]
Claw Code のような優れたツールを使用すると、

[03:23 - 03:28]
すべてのリポジトリからすべての計画を

[03:25 - 03:30]
仕様ディレクトリから取得し

[03:28 - 03:33]
、完全なコード

[03:30 - 03:35]
ベースと機能に展開することができます。 このため、

[03:40 - 03:45]
強力なエージェント コーディング ツールに引き渡すすべての作業の計画を詳細に示す仕様ディレクトリを常に用意しておく必要があります。 もし、あなたが

[03:43 - 03:47]
まだ何度も何度も繰り返しプロンプトを出し続けているなら

[03:47 - 03:51]
、あなたは

[03:49 - 03:53]
時間を無駄にしており、

[03:51 - 03:58]
コンピューティング能力を最大限に拡張できていないと断言できます。

[03:53 - 04:00]
座って、時間をかけて、考え、計画を立て、

[03:58 - 04:02]
そして構築します。

[04:02 - 04:07]
このビデオでは、

[04:04 - 04:09]
計画内でコンピューティングを使用して

[04:07 - 04:12]
AI コーディング ツールでより速く反復できる、強力な新しい計画手法を紹介します。

[04:09 - 04:14]
ここでの重要な考え方は非常にシンプルです。

[04:12 - 04:16]
原則を重んじる AI コーディングのメンバーは皆これを知っており、

[04:14 - 04:19]
このチャンネルをフォローしている人も皆

[04:16 - 04:22]
これを知っています。 計画は

[04:19 - 04:24]
促しであり、優れた計画は優れた

[04:22 - 04:28]
促しです。

[04:24 - 04:30]
詳細で包括的な

[04:28 - 04:32]
仕様計画、PRD（何と呼んでも構いません）を作成することで、実行できることを拡大できます

[04:30 - 04:34]
。 その後、この作業を

[04:32 - 04:37]
AI コーディング ツールとエージェント

[04:34 - 04:41]
コーディング ツールに引き渡すと、

[04:37 - 04:41]
自動的に作業が完了します。

[04:41 - 04:46]
そのため、私が構築するすべてのコードベースには、

[04:44 - 04:48]
AI ドキュメント ディレクトリと、

[04:46 - 04:51]
プラン

[04:48 - 04:54]
とクロードの仕様ディレクトリが含まれるようになりました。 現在、dotcloud は新しく

[04:51 - 04:56]
登場したディレクトリです。 明確に言うと、

[04:54 - 04:58]
これは claw コードに固有のものですが、

[04:56 - 05:01]
これらのディレクトリに書き込む内容は

[04:58 - 05:04]
claw コードに固有のものではありません。

[05:01 - 05:06]
just prompt コードベースに移動し、up.claude を開いて

[05:04 - 05:08]
コマンド ディレクトリに移動すると、

[05:06 - 05:10]
いくつかの異なるコマンドがあることがわかります。

[05:08 - 05:13]
では、これらは何であり、

[05:10 - 05:15]
エンジニアリング作業のスケーリングにどのように役立つのでしょうか?

[05:13 - 05:17]
これらは単なるプロンプトにすぎません。

[05:15 - 05:20]
ここで、Just Prompt コードベースでクラウド コードを開き

[05:17 - 05:23]
、スラッシュと入力すると、

[05:20 - 05:25]
すべてのコマンドの名前が上部に表示されます

[05:23 - 05:27]
。 これらは、セッション間で使用

[05:25 - 05:30]
できる再利用可能な実行可能なプロンプトです

[05:27 - 05:33]
。 すべてのコードベース内で

[05:30 - 05:35]
設定することをお勧めする最も重要な再利用可能なプロンプトは、

[05:35 - 05:40]
コンテキスト プライミング プロンプトです。 ここで、

[05:37 - 05:42]
クラウド コード、CodeEx、カーソルなど、

[05:40 - 05:44]
使用しているツールを入力します。 これは

[05:42 - 05:46]
クラウド コードに特有のものではありませんよね?

[05:44 - 05:48]
これらのディレクトリの名前は、実際には

[05:46 - 05:50]
何でも構いません。 したがって、

[05:48 - 05:53]
ここでサーバーをプライミングするかプロンプトするだけで、

[05:50 - 05:54]
基本的なコンテキスト プライミングが実行されます。 これらのコマンドを実行することになります

[05:53 - 05:56]
か? ツール呼び出しを使用して

[05:54 - 05:59]
、

[05:56 - 06:00]
readme を読み取り、get ls files を実行して

[05:59 - 06:02]
このプロジェクトのコンテキストを理解します。

[06:00 - 06:05]
したがって、重要なファイルやアイデアをすばやく操作できるように、すべてのコードベースでこれを設定することをお勧めします

[06:05 - 06:09]
。

[06:08 - 06:12]
私たちがここでやっていることの大きな目的は何でしょうか

[06:09 - 06:15]
? 私たちは、エージェントツールの新しいインスタンスを簡単にセットアップできるようにしています

[06:15 - 06:20]
。 わかった？ 時間の経過とともにというのは、

[06:19 - 06:23]
日単位だけでなく、

[06:20 - 06:25]
セッションごとにも意味します。

[06:23 - 06:28]
クラウド コードや CodeEx、またはいずれかの

[06:25 - 06:30]
AI コーディング ツールを使用したことがある場合は、

[06:28 - 06:32]
コンテキストが失われます。 最先端のモデルの現在のコンテキスト ウィンドウを表示できます

[06:30 - 06:35]
。

[06:32 - 06:36]
これらの多くは 20 万または 100 万トークンに制限されています

[06:35 - 06:38]
。  AI コーディング ツールを使用すると

[06:36 - 06:39]
、最終的には

[06:38 - 06:42]
コンテキストがなくなり、

[06:39 - 06:44]
リセットする必要が生じます。 これがコンテキスト プライムが行うことであり

[06:42 - 06:46]
、これが が行うことです。 クラウド

[06:44 - 06:48]
コマンド ディレクトリは

[06:46 - 06:50]
クラウド コード専用ですが、

[06:48 - 06:52]
任意の AI コーディング ツールに展開できます。   右

[06:50 - 06:55]
？ したがって、

[06:52 - 06:58]
ここで新しいウィンドウを開いて

[06:55 - 07:01]
codeex-m3 を開き、相対パスをコピーして

[06:58 - 07:03]
これを実行すると、まったく同じ機能が実行されます

[07:01 - 07:04]
。 わかった。 それで、私たちはここで何をしているのでしょうか

[07:03 - 07:06]
? クラウド コードで行ったのと同じことを行っています

[07:04 - 07:10]
。

[07:06 - 07:12]
AI コーディング ツールが

[07:10 - 07:14]
すべてを理解して、

[07:12 - 07:16]
すべてがどこにあるかわかるように、初期コンテキストを設定しています。 はい、

[07:14 - 07:18]
ここにすばらしい要約が出力されており

[07:16 - 07:20]
、準備は完了です。

[07:18 - 07:23]
それは文脈が重要です。 これらのディレクトリは

[07:20 - 07:26]
コンテキストプライミングに限定されません。 私たちは、

[07:26 - 07:31]
差分を作成し、複数の

[07:28 - 07:33]
言語モデルで差分をレビューしてフィードバックを

[07:31 - 07:34]
提供する、超差分レビューを構築しました。 これについては、

[07:33 - 07:35]
このチャンネルでたくさん話していく予定です

[07:34 - 07:37]
。  Agentic コーディング ツール

[07:35 - 07:40]
のおかげで、プロンプトの機能は無制限になりました

[07:37 - 07:42]
。 任意のツールを実行できます

[07:40 - 07:44]
。

[07:42 - 07:47]
ここで紹介したように、カスタム MCP サーバーを実行できます。 コードベース内に

[07:44 - 07:50]
再利用可能なプロンプトを用意することで、非常に多くのことが可能になります

[07:47 - 07:52]
。 これらは、

[07:52 - 07:56]
私のすべてのコード ベースに存在する 3 つの必須ディレクトリです

[07:53 - 07:59]
。  AI ドキュメントは、

[07:56 - 08:02]
AI コーディング ツールの永続的なナレッジ ベースになります。

[07:59 - 08:03]
仕様は計画を定義する場所です。

[08:02 - 08:05]
ここで、実行したいすべての作業を定義し、

[08:03 - 08:07]
それを

[08:05 - 08:09]
AI コーディング ツールとエージェント

[08:07 - 08:11]
コーディング ツールに引き渡すことができます。 そして、dotcloud があります

[08:09 - 08:12]
。 繰り返しますが、これらには好きな名前を付けることができます

[08:11 - 08:15]
。 ここは、エージェント コーディング ツール内ですぐに使える

[08:12 - 08:18]
再利用可能なプロンプトを配置する場所です

[08:18 - 08:22]
。 再利用可能なプロンプトは、コーディング

[08:20 - 08:24]
以外でも重要なパターンです

[08:22 - 08:26]
。

[08:24 - 08:29]
コンピューティングをさまざまな

[08:26 - 08:31]
形や形式で何度も使用できるようにしたいと考えています。 特に [Music] メールを作成する場合は、

[08:29 - 08:33]
再利用、検証、改善できるプロンプトを作成することでこれを実現します

[08:37 - 08:42]
。 これは実際どのように見えるのでしょうか

[08:39 - 08:44]
? さあ、

[08:44 - 08:48]
Pocket Pick の中にシンプルで簡潔な新しい機能を構築してみましょう。 ちょっと調整し

[08:46 - 08:49]
たいところがありました。

[08:48 - 08:51]
早速これを開いて、

[08:49 - 08:53]
Pocket Pick について簡単に説明しましょう。

[08:51 - 08:55]
エンジニアとして、私たちはアイデア、パターン、

[08:53 - 08:58]
コード スニペットを常に再利用しますが、

[08:55 - 09:00]
これらを追跡するのは難しい場合があります。  Pocket Pick が

[08:58 - 09:03]
その問題を解決します。 この

[09:00 - 09:04]
単純な MCP サーバーは、個人の知識ベースのアイテムをすべて作成して保存します。

[09:09 - 09:14]
シンプルな SQL 軽量データベース内で再利用したいコード スニペット、ファイル、ドキュメント。

[09:12 - 09:16]
ここに表示できるすべてのツールがあります。  Pocket の

[09:14 - 09:18]
追加、ファイルの追加、リストの検索

[09:16 - 09:22]
など。 今日行う主な変更は、

[09:18 - 09:24]
add コマンドの更新です。

[09:22 - 09:26]
ここで、ポケット ピック データベースに新しいアイテムを追加するためのデータ型を見ると、

[09:26 - 09:32]
テキスト、タグ、データベース パスがあります。

[09:29 - 09:33]
現在、IDは自動的に

[09:32 - 09:35]
生成されます。

[09:38 - 09:42]
ポケット広告とポケット追加ファイルを使用してポケットアイテムを作成するときに ID を渡せるように、検索機能を改善したいと考えています

[09:40 - 09:46]
。 これにより、

[09:42 - 09:47]
ID によって pocket git と pocket to file を実行するのが非常に簡単になります。

[09:46 - 09:49]
それをどうやってやるのでしょうか?

[09:47 - 09:51]
これら 3 つの重要なディレクトリを使用します

[09:49 - 09:54]
。 これらのディレクトリを使用すると、

[09:51 - 09:55]
このセッション中および時間の経過とともに、より速く移動できます

[09:54 - 09:57]
。 それでは先に進みましょう。

[09:55 - 09:58]
もちろんクローコードを使います。 今

[09:57 - 10:00]
のところ私のお気に入りのツールです。 最初に

[09:58 - 10:03]
行うことはプライミングです。 したがって、

[10:00 - 10:06]
このコマンドをすでにここに用意しておけば、時間を節約できます

[10:03 - 10:08]
。 はい、ツリーが無視されるように実行されます

[10:06 - 10:11]
。

[10:08 - 10:13]
コーディングツールで確認できる、わかりやすいツリー形式が提供されます。

[10:11 - 10:14]
そこでそれが機能しているのがわかります。 さあ、

[10:13 - 10:16]
これを全画面表示にしてみましょう。 そして、

[10:14 - 10:18]
次のファイルを読むように言っているのがわかります

[10:16 - 10:21]
。 これですべて完了です。 すべて

[10:18 - 10:23]
ロードされました。  /cost と入力すると、

[10:21 - 10:26]
正確な費用がわかります。

[10:23 - 10:27]
エージェントを準備するために 20 セントあります。 さて、いよいよ

[10:26 - 10:29]
実際の作業を開始するときです。

[10:27 - 10:32]
実際の作業はどのように行うのでしょうか? 繰り返し

[10:29 - 10:36]
プロンプトは表示しません。 それは2024年の古いやり方です

[10:32 - 10:38]
。 私たちは簡潔で効果的なプランを作成します

[10:36 - 10:40]
。 私たちは、私が計画立案と呼んでいる新しい手法を使って、これをさらに一歩進めていきます

[10:40 - 10:45]
。

[10:42 - 10:47]
ここでの大きな違いは、私自身と

[10:45 - 10:49]
AI コーディング ツールの両方が

[10:47 - 10:50]
この計画の草案作成に参加することです。 したがって、

[10:49 - 10:53]
自分で計画を書いたり、

[10:50 - 10:55]
自分でファイルを作成したり、そういった作業を行う代わりに、

[10:53 - 10:58]
クラウド コードで

[10:55 - 11:04]
この計画の最初のドラフトを作成することになります。 仕様/

[10:58 - 11:07]
要求IDを作成し、新しい機能IDを

[11:04 - 11:09]
内部でかき混ぜます。Readme に戻ると、

[11:09 - 11:17]
ここで少し簡単な計画を立てることができます。これを

[11:12 - 11:18]
ポケット広告とポケットの中に入れます。計画をこれらの

[11:18 - 11:23]
セクションに分割します。この計画を記述します。

[11:21 - 11:24]
ここでは Ultraink を使用します。

[11:23 - 11:26]
明らかにやり過ぎですが、これにより

[11:24 - 11:29]
Claw Code の推論機能がトリガーされます

[11:26 - 11:32]
。 ここで行っているのは、

[11:29 - 11:34]
クラウド コード ドラフトで

[11:32 - 11:36]
このコードベースの最初のドラフトを作成することです。 このコードベースを簡単に見てみました

[11:34 - 11:38]
。 アーキテクチャとその動作を大まかに覚えています

[11:36 - 11:40]
。 しかし、私たちの

[11:38 - 11:43]
エージェントコーディングツールは、文字通り

[11:40 - 11:45]
私たちよりも何百倍も速く読み取ることができます

[11:43 - 11:47]
。

[11:45 - 11:50]
このコードベースについては私よりもよく理解しています。 ご存知のとおり、

[11:47 - 11:52]
SQL のようなテーブル構造を持っています。

[11:50 - 11:54]
コマンドはすべて揃っていますよね？

[11:52 - 11:56]
UVピエストも見れますよね？ このコードベースについては認識しています

[11:54 - 11:58]
。 構造がわかります。 ご存知のとおり、

[11:58 - 12:03]
このコードベースについては、

[12:00 - 12:04]
私たちが適切に準備したため、文字通り私よりも多くのことを知っています。 そして今、

[12:03 - 12:07]
政府は、これまでに知っていることすべてを

[12:04 - 12:08]
踏まえて、この計画の最初の草案を作成しようとしています

[12:07 - 12:10]
。 わかった。 それで、

[12:08 - 12:12]
ここでの新しい種類のフローとは何でしょうか?

[12:10 - 12:15]
流れとしては、まず計画の基礎を構築し

[12:12 - 12:17]
、AI コーディング ツールでドラフトを作成し、

[12:15 - 12:20]
次に計画を繰り返し

[12:17 - 12:21]
、最後に実際に計画を実行します

[12:20 - 12:23]
。 だから私は

[12:21 - 12:26]
これを受け入れることにします。 ここで

[12:23 - 12:28]
新しい仕様が作成されたことがわかります。それでは、

[12:26 - 12:30]
これがどのように見えるか見てみましょう。 これが

[12:28 - 12:32]
計画です。 これは最初のドラフトですが、

[12:30 - 12:34]
かなり良い出来だと分かりますよね?

[12:32 - 12:36]
問題を非常に簡潔に詳述しています

[12:34 - 12:38]
ね。 ユーザーが追加

[12:36 - 12:40]
ツールとファイル追加ツールを使用してポケット ピック データベースにアイテムを追加すると、

[12:38 - 12:42]
ID が

[12:40 - 12:44]
自動的に生成されます。 はい、まずは

[12:42 - 12:46]
問題の説明、次に解決策の

[12:44 - 12:48]
説明です。 この機能により、これらのツールが変更され、

[12:46 - 12:51]
ユーザーは

[12:48 - 12:53]
必須パラメータとして ID を入力する必要が生じ、

[12:51 - 12:55]
より詳細な制御とより容易な

[12:53 - 12:57]
識別が可能になります。 その通り。 それで、今私たちは

[12:55 - 12:59]
復習しているんですよね？ 私たちは

[12:57 - 13:02]
日々、コード

[12:59 - 13:04]
レビュー担当者、計画レビュー担当者へと移行しています。 私たちは

[13:02 - 13:07]
情報のキュレーターになりつつある、そうでしょう？

[13:04 - 13:08]
コードのアイデアをキュレーターとして管理し、

[13:07 - 13:10]
それを AI コーディング ツールに渡します。

[13:08 - 13:13]
そして、これの素晴らしい点は、

[13:13 - 13:18]
コードベースを繰り返し更新して

[13:15 - 13:20]
一時的に悪い状態にすることがないことです。 私たちはこのファイルのみで作業しています

[13:18 - 13:21]
。 はい、それではすべて見ていきます

[13:20 - 13:24]
。

[13:21 - 13:26]
サーバー モジュールに新しい ID フィールドがあることがわかります

[13:24 - 13:29]
ね。 これも重要な

[13:26 - 13:32]
変化です。 機能を追加します。 はい、

[13:29 - 13:35]
素晴らしいですね。 サーバーの実装は素晴らしいようです

[13:32 - 13:36]
。 変更をテストします。

[13:35 - 13:38]
これらすべてのファイルがどこにあるかわかっていることがわかりますね?

[13:36 - 13:41]
ここが本当に重要な部分です

[13:38 - 13:44]
よね？ 私たちはそのコンテキストプライムを結び付けています

[13:41 - 13:46]
。 ここでは AI ドキュメント ディレクトリをスキップしますが、

[13:46 - 13:51]
これは実際には必要ではないので、そうではありませんか? 最初に

[13:48 - 13:53]
このコードベースをインスタンス化していた場合は、さらに重要になる可能性があります

[13:51 - 13:55]
。 わかりました。

[13:53 - 13:57]
ここには自己検証

[13:55 - 13:59]
セクションが構築されており、その後

[13:57 - 14:02]
Readme に更新されていることがわかります。 つまり、コンテキストプライムの再利用可能なプロンプト

[13:59 - 14:05]
で適切なコンテキストを提供し、

[14:05 - 14:10]
非常に短い

[14:07 - 14:12]
3 文 (IDK など) の豊富なプロンプトを書くだけで済みます。

[14:10 - 14:13]
推論モデル機能を有効にしました

[14:12 - 14:15]
。 私たちにはかなり素晴らしい計画があります

[14:13 - 14:18]
。 これで

[14:15 - 14:20]
80% の目標が達成できると確信しています。

[14:18 - 14:22]
ここでやろうとしていることは、ここにある余分なものの一部を削除することです

[14:20 - 14:23]
。 いくつか

[14:22 - 14:25]
推奨事項があります。 エージェント

[14:23 - 14:29]
コーディング ツールで

[14:25 - 14:30]
これらの追加のオプションのアイデアのいずれかを構築することは望ましくありません。 多くの場合、

[14:29 - 14:32]
コーディング ツールや言語モデルでは、

[14:30 - 14:34]
テキストが多いと意味を作成しようとします

[14:32 - 14:36]
。 その中にパターンを見つけようとします

[14:34 - 14:38]
。 そこで、

[14:36 - 14:41]
このスキーマ関連のものを削除します。

[14:38 - 14:46]
ここで 1 つの調整を加えます。 他のテストをチェックして、

[14:41 - 14:48]
広告機能が使用されているかどうかを確認し

[14:46 - 14:50]
、これを使用するように更新します

[14:48 - 14:52]
。 これは重要です。 そして、

[14:50 - 14:54]
この

[14:52 - 14:56]
道を開いて、どこを見ればよいかが非常に明確になるようにします

[14:54 - 14:58]
。 正直に言うと、これはまったく

[14:56 - 15:00]
必要ありませんが、明確にするためにこれを行うのが好きです

[14:58 - 15:02]
。 はい、

[15:00 - 15:05]
素晴らしいです。 ここに素晴らしい計画があります。 さあ、

[15:02 - 15:08]
始めましょう。素晴らしい習慣として、

[15:05 - 15:09]
計画を実行する前に、私は

[15:08 - 15:11]
いつもそこにコミットを入れるようにしています。

[15:11 - 15:16]
ここで行ったすべての操作、つまりこのファイルを元に戻すようにしましょう。 そして、

[15:14 - 15:18]
その計画を実行します。 そして、

[15:16 - 15:21]
その計画に基づいて行動します。

[15:18 - 15:25]
さて、

[15:21 - 15:27]
このファイルを実装してみましょう。 はい、以上です。

[15:25 - 15:29]
クラウド コードにはこの新しい機能があります。

[15:27 - 15:32]
ToDoリストシステムがあります。 これは、

[15:29 - 15:33]
エージェントコーディングツール内で新たに出現したパターンであり、

[15:33 - 15:37]
最初に効果的に計画を作成し、次に

[15:35 - 15:39]
その計画に沿って作業を進めます。 素晴らしいですね。

[15:37 - 15:42]
先に進んで、aentic

[15:39 - 15:43]
モードまたは yolo モードに入ります。 これで自動承認が

[15:42 - 15:44]
オンになり、AI コーディング ツールが

[15:43 - 15:47]
これをすばやく実行できるようになります。 それは

[15:44 - 15:49]
私たちに代わってすべての作業を実行します。

[15:49 - 15:56]
AID ドキュメント MCP サーバー Git リポジトリ

[15:53 - 15:58]
ミックス統合を追加する必要があったことを言及することが重要です。 同時に、

[15:56 - 16:00]
この

[15:58 - 16:03]
機能はすでに稼働しているので、必要ありませんでした。

[16:06 - 16:11]
コードベース内にまだ埋め込まれていないサードパーティのドキュメントからの追加情報は実際にはここにはありません。 そして、

[16:09 - 16:13]
すべてのディレクトリの中で、AI

[16:11 - 16:15]
ドキュメントは、

[16:13 - 16:16]
統合がうまくいけば、

[16:15 - 16:18]
おそらく最も重要ではないことが分かっていますが、同時に、特にコンテキスト ウィンドウを何度も何度も拡大しているときに、

[16:26 - 16:30]
作業に必要なときにいつでも参照できる、AI コーディング ツールや H エンジン コーディング ツールの永続的なナレッジ ベースを持つことの威力を過小評価

[16:28 - 16:32]
したくないことも分かっています

[16:30 - 16:35]
。 また、

[16:35 - 16:40]
機能固有のコンテキストプライミングを行う場合もあることにも注意してください。 つまり、

[16:38 - 16:44]
プライムをコピーして、

[16:40 - 16:46]
プライムに ID 機能を追加したいと言うことができます

[16:44 - 16:48]
。 ええと、ご存じのとおり、

[16:46 - 16:50]
ここでは当社の優れたエージェント

[16:48 - 16:52]
コーディング ツールがすべての変更を通じて機能していることがわかります

[16:50 - 16:54]
。 これは本当にすごいですね。

[16:52 - 16:57]
機能固有のコンテキスト プライムでこれを見るのが楽しみです

[16:54 - 16:59]
。 これを追加して、

[16:59 - 17:06]
ここに特定のファイルを追加したいとしますよね? いくつかの機能固有の

[17:02 - 17:07]
ファイル (1 つまたは複数)、そして py などがあり、

[17:07 - 17:13]
これらが複数あるため、

[17:10 - 17:15]
特定の機能セットでコンテキスト プライムを何度も実行できます。これは、

[17:15 - 17:18]
大規模な変更に取り組んでいるときには明らかに便利です。多くの

[17:17 - 17:21]
場合、これは必要ありません。必要なのは、

[17:18 - 17:23]
キー プライム メソッド エージェント コーディング ツールだけです。

[17:21 - 17:25]
これらの変更が処理されているため、

[17:23 - 17:26]
非常に迅速に実装されたことがわかります。結局のところ、

[17:25 - 17:28]
優れた計画を作成することに尽きます。

[17:28 - 17:33]
私の IDK は非常に詳細かつ簡潔でした。 えっと、

[17:33 - 17:36]
あなたの IDK を知っている主要なコーディング メンバー全員に声をかけてください。

[17:35 - 17:38]
ここにあるすべてのキーワードには情報が詰まっています

[17:36 - 17:40]
。 私は自分が何を望んでいるのかを非常に詳しく述べています

[17:38 - 17:41]
。 これらの

[17:40 - 17:43]
アイテムが参照されていることがわかります。  Read me は

[17:41 - 17:46]
現在更新中です。 これはすべて、

[17:43 - 17:49]
コーディング ツールに適切な情報を表示させ、

[17:49 - 17:55]
その情報と、うまく

[17:55 - 17:58]
機能することがわかっている特定の構造セットを使用してプランを作成するように指示したからです。 右？ ここで、

[17:56 - 18:00]
あなたの経験、判断力、そして

[17:58 - 18:02]
好みが重要になります。

[18:00 - 18:05]
コードベースをある程度高度なレベルで理解している必要があります。

[18:02 - 18:07]
そして、自己検証が行われていることがわかります

[18:05 - 18:09]
。 それは自分自身をテストしています

[18:07 - 18:11]
。 それを見て嬉しいです。 そして、

[18:09 - 18:13]
これが本当に重要であることがわかります。 最後にこれを追加しました

[18:11 - 18:15]
。

[18:13 - 18:17]
ID パラメータを含めるように他のテスト ファイルを更新します。 しかし、

[18:15 - 18:19]
要約すると、私たちは

[18:19 - 18:24]
計画を立てるこの素晴らしいプロンプトを作成しました。 ちょっとメタになってきましたね

[18:21 - 18:27]
。 現在、私たちはエージェントに

[18:24 - 18:29]
計画の作成を促し、それを微調整して

[18:27 - 18:32]
繰り返し実行し、その

[18:29 - 18:33]
計画を AI

[18:32 - 18:35]
コーディング ツールまたはエージェント デコード ツールに

[18:33 - 18:37]
再度渡しています。 さて、ここで

[18:35 - 18:39]
これらのテストが機能していることがわかります。

[18:39 - 18:44]
これが確実に機能するには、すべての広告コマンドにその ID パラメータを追加する必要があります

[18:42 - 18:47]
。 そしてまた、それは

[18:44 - 18:49]
私たちにとってはただ順調に進んでいるだけです。 これがクローコードが優れている理由です

[18:47 - 18:52]
。 動作が停止することはありません。

[18:52 - 18:58]
さらに作業を続けるかどうかを尋ねられません。 ただ調理するだけですよね？ 私

[18:55 - 18:59]
は Cloud Code のこの点が本当に気に入っています。

[18:58 - 19:01]
彼らはそのようにモデルを設計したのです。

[18:59 - 19:03]
プロンプトはこのように設計されています。

[19:01 - 19:05]
何度も言いますが、Anthropic

[19:03 - 19:08]
Cloud Co チームは素晴らしい仕事をしており

[19:05 - 19:09]
、彼らがこれらのツールを使用していることは明らかです

[19:08 - 19:11]
。  1 つのテスト

[19:09 - 19:13]
ケースとテストが見つからないことがわかります。 並べて見

[19:11 - 19:16]
たいときは、いつでも開くことができます

[19:13 - 19:19]
。 その

[19:16 - 19:21]
機能では、現在追加された ID を取得する必要があることがわかります

[19:19 - 19:23]
。

[19:21 - 19:24]
この作品の簡潔な概要を記載します。 さあ、

[19:23 - 19:26]
これを見てみましょう。 ここで最も重要な

[19:24 - 19:29]
ことは、自己検証がオンになっていることです。

[19:26 - 19:32]
つまり、

[19:29 - 19:34]
ここにあるものはすべて機能するとほぼ保証できるということ

[19:32 - 19:37]
ですね? すべてのテストに合格しました。 私たちのヘント

[19:34 - 19:40]
コーディングツールは自己テスト中です。

[19:37 - 19:41]
その仕様を開くと、

[19:40 - 19:44]
ここでもう一度言及しておくと、

[19:41 - 19:46]
自己検証が非常に重要であることがわかります。 私たちは

[19:44 - 19:48]
それに命令を下した。

[19:46 - 19:49]
自ら高揚させる必要があります。 もう一度強調しておきますが、

[19:48 - 19:52]
これが

[19:49 - 19:54]
エージェントコーディングと AI コーディングの大きな違いです。

[19:52 - 19:57]
コードを生成するプロンプトを書いているだけではありません。

[19:54 - 19:59]
わかった？ 私はエンジニアリング作業を行うプロンプトを書いています

[19:57 - 20:02]
。 それは建物です。

[19:59 - 20:05]
それは計画です。 それはテストです。 わかった？

[20:02 - 20:06]
それは開発ライフサイクル全体です。

[20:05 - 20:09]
これが力だ。 これは

[20:06 - 20:11]
あなたがロックを解除できる機能です。 毎週月曜日にここで議論してきた

[20:09 - 20:13]
ような貴重なアイデアを皆さんに共有し、お届けすることを目指しています

[20:13 - 20:17]
。 あなたは私がどこにいるか正確に知っています

[20:15 - 20:19]
。 まだ登録していない場合は、

[20:17 - 20:22]
ぜひこの旅に参加してください。 私たちは、

[20:22 - 20:28]
寝ている間にも私たちのために構築される生きたソフトウェアを構築します。 そして、これら 3 つの

[20:24 - 20:31]
重要なディレクトリは、AI、docs、spec、

[20:28 - 20:33]
clude です。 これが、私たちがエンジニアリング作業を拡大していく方法です

[20:31 - 20:36]
。 このようにして、私たちは

[20:33 - 20:39]
より多くの作業を AI コーディング ツールに渡し、

[20:36 - 20:41]
さらにエージェント コーディング ツールにも渡します。

[20:39 - 20:42]
よし、このビデオを気に入ってください。

[20:42 - 20:46]
興味があることをアルゴリズムに知らせましょう。 ここですべてのテストが

[20:44 - 20:50]
合格したことを確認できます。 これを実際に実行する必要はありませんが

[20:46 - 20:53]
、もちろん実行することもできます。 ポケットピックを更新しました

[20:50 - 20:55]
。 ここで何を渡す必要がありますか

[20:53 - 20:57]
?  readmeを確認してみましょう。 これは

[20:55 - 20:59]
比較的簡単なはずです。 はい、

[20:57 - 21:03]
とても簡単です。 さあ、

[20:59 - 21:05]
これを使いましょう。 アップデートと言います。 さあ、行きましょう。

[21:03 - 21:07]
はい、データベースです。 それはいいです。

[21:05 - 21:09]
現在の作業ディレクトリを使用できます。 それは

[21:07 - 21:11]
いいです。 では、クロードを開けてみましょう。

[21:09 - 21:13]
この MCP サーバーをアクティブ化します。

[21:11 - 21:14]
そこにそれが見つかるのがわかります。 はいを押します。

[21:13 - 21:18]
さて、ここで私はプロンプトを非常に具体的にするつもりです

[21:14 - 21:21]
。 ポケットピックを更新しました。

[21:18 - 21:24]
ポケットアドと言います。 ここでの ID は、

[21:24 - 21:28]
ランダムなコードをコピーしたものになります。 たとえば、

[21:26 - 21:30]
MCP.json JSON

[21:28 - 21:33]
形式をコード スニペットとして覚えておきたいとします。 なので、

[21:30 - 21:36]
それをコピーします。 追加と言います。  IDを渡します

[21:33 - 21:39]
。 これは MCP JSON になり、

[21:36 - 21:42]
コンテンツは次のようになります。 わかった。 それで、そこへ行きます。

[21:42 - 21:46]
更新された Pocket Pick MCP サーバーを使用して、新しい Pocket 広告を実行します。

[21:44 - 21:48]
そこにあるよ。 ポケットピックを更新しました。 追加。

[21:46 - 21:51]
IDはここにあります。 そこにテキストがあります。

[21:48 - 21:54]
どうぞ。  Enterキーを押します。 これで、

[21:51 - 21:55]
新しく追加されたアイテムが取得されるはずです。 そのツールは何と呼ばれていますか?

[21:55 - 22:00]
見つかりました。 これをやります。 右。 つまり、

[21:58 - 22:03]
IDごとにポケットにファイルします。

[22:00 - 22:05]
私がそこで走るのが好きなのがこれです。  ID を指定すると、

[22:05 - 22:14]
mcp_json になります。出力ファイルは

[22:09 - 22:17]
絶対パスを指定して、mcpnew.json を取得します

[22:14 - 22:20]
。 これからは新しい ID で検索することになります

[22:17 - 22:22]
。

[22:20 - 22:24]
更新された Pocket Pick MCP サーバーを実行していて

[22:22 - 22:26]
、このディレクトリに出力していることがわかります

[22:24 - 22:27]
。 さあ、これを実行してみましょう

[22:26 - 22:29]
。 どのように動作するか見てみましょう。 コンテンツが

[22:27 - 22:31]
正常に書き込まれました。 開けてみましょう。

[22:29 - 22:34]
そして、MCP

[22:31 - 22:37]
サーバーの SQLite データベースから、この

[22:34 - 22:38]
機能が実行されていることがわかります。 素晴らしい。

[22:37 - 22:40]
そこに新しいローカル データベースがあることがわかります

[22:38 - 22:42]
。 これはスニペットを保存して再利用するのに最適な方法です

[22:40 - 22:44]
。 ご興味があれば、この

[22:42 - 22:45]
コードベースへのリンクが説明に記載されています

[22:45 - 22:50]
。 ですから、

[22:47 - 22:52]
私たちがそれをここでいかに早く構築できたかというのは、本当に驚くべきことです

[22:50 - 22:54]
。 今変更されたすべてのファイルを確認します

[22:52 - 22:57]
。 そして

[22:54 - 22:59]
何が行われたかを思い出してください。 これらすべての変化ですよね？

[22:57 - 23:02]
非常に正確で、非常に精密です。 それは

[22:59 - 23:05]
すべてこれらの重要なファイルのせいです

[23:02 - 23:07]
よね？ これらの重要なディレクトリにより、

[23:07 - 23:12]
このコードベース内およびすべてのコードベース内で実行できる内容を拡張できるようになります。

[23:12 - 23:16]
皆さんがこのチャンネルを観て、一緒に過ごす時間が増えるにつれて、それが明らかになっていくことを願っています。

[23:14 - 23:18]
それは本当にパターンに関することです。 それは

[23:16 - 23:20]
原則についてです。 それは、

[23:18 - 23:22]
エンジニアリングの新しい時代にどのようにアプローチするかということです。

[23:20 - 23:25]
特定のツールに固執しないでください。

[23:22 - 23:28]
そして、

[23:25 - 23:30]
仕事全体、コード

[23:28 - 23:33]
ベース全体、そして最も重要なことに、時間を超えて拡張できないアイデアにこだわらないでください

[23:30 - 23:35]
。  AI ドキュメントは、

[23:33 - 23:38]
AI ツールに関する永続的なナレッジ ベースです。

[23:35 - 23:40]
スペックは作業を計画する場所です。

[23:38 - 23:43]
ここで、

[23:40 - 23:45]
コンピューティングの作業をエージェント コーディング ツールにどんどん引き渡します。

[23:43 - 23:48]
覚えておいてください、素晴らしい計画は素晴らしい

[23:45 - 23:50]
促進です。 そして、doclude があります。

[23:48 - 23:53]
ここで、

[23:50 - 23:55]
コードベース内で時間の経過とともに使用される再利用可能なプロンプトを構築します。

[23:53 - 23:57]
ここで設定する最も重要なプロンプトは、

[23:55 - 23:59]
コンテキスト プライム プロンプトです。

[23:57 - 24:02]
エージェントが簡潔に作業するために必要な情報が得られるように設定します

[23:59 - 24:05]
。 コードベース全体

[24:02 - 24:07]
へのアクセスを許可してトークンを無駄にしないでください

[24:05 - 24:10]
。 正確にしてください。 集中してください。

[24:07 - 24:12]
コンテキストが多すぎるのは、コンテキストが

[24:10 - 24:15]
足りないのと同じくらい悪いです。 コンテキストが多すぎると

[24:12 - 24:17]
エージェントが混乱する可能性があります。

[24:15 - 24:19]
少なすぎると仕事を

[24:17 - 24:21]
成し遂げることができません。 これらを組み合わせることで、

[24:19 - 24:24]
エンジニアリング作業をさらに拡張することができます

[24:21 - 24:29]
。 ご視聴ありがとうございました。

[24:24 - 24:29]
集中して構築を続けてください。

## コメント

### 1. @synthclub (👍 18)
Watching this video really hammers home that software engineers aren't going away; they're just using their skills to become 'agentic platform engineers.' Maximizing the development workflow value chain,  is clearly an engineering skill in itself. Quality context priming is key to maximizing AI reasoning.

> **@heyaisdabomb** (👍 2): YES! I realized this a few days ago when I started using claude code. The options of how you configure your environment are endless, and you can even build your own tools to help with this. Thus engineering the environment the agents run in are  going to be a huge part of software engineering going forward.

> **@MaelSimonApprenTyr** (👍 0): @@heyaisdabomb we can continue to engineer our tools to be more efficient, so yeah we are still there !

> **@willtyler** (👍 0): Amen.  It's going to quickly retire people that haven't kept up as people that stay current will blow past them in productivity though.

### 2. @aproperhooligan5950 (👍 8)
This is the most useful thing I've encountered on YT re: Agentic AI. Was asking myself how to accomplish similar just this morning. Thought I'd need to create embeddings first. This approach is sensible and enables mgmt of context windows. Thanks, @IDD!

> **@MaelSimonApprenTyr** (👍 0): What does mgmt means?

> **@---xu8kc** (👍 1): @MaelSimonApprenTyr managment

> **@MaelSimonApprenTyr** (👍 0): @@---xu8kc thanks!

### 3. @oceanheartai (👍 4)
The undisputed king of agentic coding. All hail. XD

### 4. @jordanembry2772 (👍 7)
I look forward to these every Monday morning, thanks Dan!

> **@MaelSimonApprenTyr** (👍 0): Same thing, it is always gold

### 5. @IlkkaNisula (👍 15)
Good topic again. One thing I have noticed with larger projects is the "spec rot". You should prune also specs folder to avoid agents reading outdated docs.

> **@SiaBarz** (👍 0): Good point, i have an archive sub folder for this same to just keep the in progress docs for ai

### 6. @orthodox_gentleman (👍 5)
Dude pocket pick looks awesome! I am going to check it out!

### 7. @asianddrmaniac (👍 0)
Literally what I've been looking for

### 8. @nlarchive (👍 3)
i love your work, nice to have a channel with modern techniques to apply and speed up our work, this little details of designing vs just promoting really make the difference !!!!

> **@MaelSimonApprenTyr** (👍 1): Clearly, the real promotion is in how much value he gives for free, to the point were you want to reward him for what you've learned

### 9. @permaMidlertidig (👍 1)
this guy is the most interesstin llm-commentor/educational-youtuber right now.... no black/white shit... just pragmatism.. perfect

### 10. @yarzar360-hq (👍 2)
Great content! You just gained a new subscriber—keep it up!

> **@MaelSimonApprenTyr** (👍 0): @@yarzar360-hq following this channel for over a year, I can assure you that you wont regret it !

### 11. @guyguy467 (👍 4)
Very nice! IDD is the Alex Hormozi of AI engineering

> **@MaelSimonApprenTyr** (👍 0): Clearly!

### 12. @DuggsTube (👍 1)
Awesome. Looking forward to diving deeper into this. 

Your timing is (likely not a coincidence) excellent. I just swapped to the Max plan so I can actually use CC freely without anxiety. 

I spent the weekend optimizing my planning workflow with /commands and context priming docs and am really looking forward to continuing to refine the process.

### 13. @danieldalton1757 (👍 2)
From one Dan to another, good stuff, thanks Dan.  :)

### 14. @liquathrushbane2003 (👍 4)
I am not a coder (yet).  Admittedly I didn't understand half of what you said, but even to these newbie ears I can tell you are extremely organised, efficient, and give off an air of knowledge - Subbed.

Do you have  any plans to release courses for someone of my level?  Help in setting up the environment? Taking you through from A to Z some more practical examples? (This vid was great, but I think I may need to watch it a number of times - you're very fast on the KB!!)

> **@MaelSimonApprenTyr** (👍 0): Hey! Being a coder is helpful because you have all the patterns for classic problems and know how to translate that into code.
But it's just a part of "problem solving", so logics. You'll have more work to do compare to developers, because developers already made a part of the job ahah

He already made a course, where he goes through setting up aider, then different concepts. The course suppose you already know how to solve your problem programmatically, so I really encourage you to learn at list just the basics and then you could go to the course. Create examples that you think you could do without AI, to control the output of the AI and to learn at the same time.

Enjoy the process, the programmer's high is the best feeling in the world !

### 15. @sam-bartlett (👍 1)
This is a tremendously helpful video; thank you!

### 16. @PatBishopwellness (👍 18)
Dan, I knew my investment in your program was work it.  BOOM, you have provided a clear and concise way of getting the most out of our tools.  I have found that Augment is magic, I think it is maybe 20% better at the engineering, when you develop the PRD with Augment you get allot of value, then you hand off work parts to Claude Code and I have found this to be very valuable.  Now, with your framework - I appreciate your work in developing power in compute.  Great work!!!

> **@MausiMisty** (👍 2): I just did it as well. It was a really good feeling to know my intuition about what was possible was correct; I just didn’t have enough experience until I took his class. I’m great at planning and designing so now I’m creating things, MUCH faster. It’s like 10x.

> **@DePistolero** (👍 1): Augment is magic... just incredible tool ...

> **@MaelSimonApprenTyr** (👍 1): What is augment exactly ? A mcp, an IDE?..

> **@MaelSimonApprenTyr** (👍 0): @PatBishopwellness I completely agree, I loved his program

> **@VincentOrtegaJr** (👍 0): @@DePistoleroaugment ai the extension?

### 17. @foreverunknown23 (👍 0)
Impressive project! Extremely useful. It would be amazing to be able to dump the database as a set of files to share with others in git

### 18. @nathanwilton3383 (👍 2)
Love it. One thing to add. Your PRD/Specs should stand alone as requirements with dependencies. It should not be a plan. Plan has the connotation of timing to it, like a project plan. That should be something atomic & separate from the PRD. because ultimately thats what customers care about - when do i get the work? Only applicable if you are work for hire or part of a larger org, which should cover most ppl.

> **@MaelSimonApprenTyr** (👍 0): Do you have a background in project management?

Because for me all this is the same, so your definition and the implications surprised me :)

> **@nathanwilton3383** (👍 1): @MaelSimonApprenTyr indeed I do. When you have larger projects and teams, it (used to be) important to break apart Design work, timelines, requirements, Dev, QA, DevOps. Re: implications - i think its surprising how quickly hese lines are being blurred and will change in the coming months/years with novel AI stacks replacing traditional enterprise Dev process.

> **@MaelSimonApprenTyr** (👍 0): @@nathanwilton3383 not sure to fully understand, so I'll rephrase 
It is important to split all the process to get a quality product (which I agree, being also a dev)
For the implications, you suspect that the way he currently work is going to change fast because of the coming ai stacks?
I feel like you would do something differently and/or there is something that bother you in his way of doing, but I can't really get it for now
Could you reexplain me please? :)

> **@nathanwilton3383** (👍 1): @MaelSimonApprenTyr To clarify - the implication is that the way Dan is thinking about things (and I suspect Open AI, Anthropic, etc) will expand to cover more than Dev. It will cover more of the stack - to automate upstream work, like product, project and go-to-market work as well as downstream including QA, DevOps, Rollout and sustain work.  To go back to the original comment - PRD should standalone and project plan work - we have to remember that most people dont understand what AI can do. As Dan says, we are in the 1%. We still need the upstream artifacts that allow business decisions when you are working for a customer, in an org, or test plans, Deployment plans, etc. Dans workflow to create markdown and human readable artifacts accounts for this..For example, PRD can now be auto-populated to requirements tools like Jama or Productboard. My original comment - around breaking out timelines - this should be atomic, and ideally transferrable to MS Project, Airtable, JIRA or whatever. Eventually this need will melt away due to lines being blurred. But we need the interstitial state in order to get the non-1% to buy in and begin the transition to fully AI enterprise projects.

> **@MaelSimonApprenTyr** (👍 0): @@nathanwilton3383 ooooh okay I get it now! It's about the next steps of what we (enterprises + us) will do for product development, and how to bring the other into this shift

### 19. @VincentOrtegaJr (👍 1)
Claude Max+ gives us finally the monthly semi unlimited to use Claude code.  🥳

### 20. @edlok3104 (👍 0)
Appreciate the content—saved me a significant amount of time.

