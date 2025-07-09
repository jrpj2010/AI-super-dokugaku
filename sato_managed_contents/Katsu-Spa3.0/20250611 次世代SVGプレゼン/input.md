▶️ログ：

- 文字起こし：

    ```markdown

    ```


▶️次回：

6月 18日 (水曜日)⋅13:30～15:30

[https://teams.microsoft.com/l/meetup-join/19%3Ameeting_YjA3MDRmMjMtNjNmMy00MTBjLTliNTQtODk5NTg4NmQ2NjA0%40thread.v2/0?context={"Tid"%3A"f54277c9-dafe-44aa-85a4-73d5c7c52450"%2C"Oid"%3A"f0d8f182-ee44-4c23-bf17-e47efc2c0faf"}](https://teams.microsoft.com/l/meetup-join/19%3ameeting_YjA3MDRmMjMtNjNmMy00MTBjLTliNTQtODk5NTg4NmQ2NjA0%40thread.v2/0?context=%7b%22Tid%22%3a%22f54277c9-dafe-44aa-85a4-73d5c7c52450%22%2c%22Oid%22%3a%22f0d8f182-ee44-4c23-bf17-e47efc2c0faf%22%7d)
会議 ID: 433 610 692 231 8
パスコード: FT7fm3av

▶️AI議事録：

### 議事の要旨:

本講座は、AIを活用した資料作成の効率化を目的として開催された。**主要なテーマは、`SVG`形式の画像を`Google AI Studio`で生成し、`Figma`で編集、最終的に`PowerPoint`などで活用する手法**である。

講座では、`SVG`が拡大・縮小しても劣化しないベクターデータであるという基本概念から始まり、実際に`Google AI Studio`にプロンプトを入力して`SVG`コードを生成するデモンストレーションが行われた。生成された`SVG`は`Figma`に取り込むことで、テキストやオブジェクトを個別に編集できることが示された。さらに、より高度なデザインを実現するための**「システムプロンプト」の活用法**や、`VS Code`と`Copilot`（エージェント）を用いた**資料作成の自動化**といった先進的な手法についても紹介された。

しかし、参加者からは「操作が速すぎる」「`Figma`の操作に慣れていない」といったフィードバックが多数寄せられ、**参加者のITリテラシーと講座のレベルに乖離がある**ことが課題として浮き彫りになった。この結果を受け、次回以降はより基礎的な操作に焦点を当てるなど、内容を調整する方針が示された。

## [**AI活用による資料作成講座（初級編）**]

### 開会と講座の概要説明:

- **開会挨拶** [佐々木琢丸 / Sasaki，Takumaru][00:00:37.237]
    - 生成AIを活用した資料作成講座の開始を宣言。 [佐々木琢丸 / Sasaki，Takumaru][00:00:41.197]
        - 現地参加も可能であることをアナウンス。 [佐々木琢丸 / Sasaki，Takumaru][00:00:50.437]
- **千葉部長より挨拶** [千葉茂 / Chiba，Shigeru][00:01:20.197]
    - 業務への積極的な活用を期待。 [千葉茂 / Chiba，Shigeru][00:01:31.007]
        - **本講座で得た知識が、個人の業務効率化、ひいては産業全体の効率化に繋がることへの期待**を表明。 [千葉茂 / Chiba，Shigeru][00:01:40.057]
- **講座日程と目的の説明** [佐々木琢丸 / Sasaki，Takumaru][00:01:59.297]
    - **講座日程**:
        - **初級編（本日）**: AIで資料を「どのように作れるのか」を体感。 [佐々木琢丸 / Sasaki，Takumaru][00:02:12.817]
        - **実践編（来週水曜日）**: より良い資料の作り方や見栄えの調整など、深掘りした内容。 [佐々木琢丸 / Sasaki，Takumaru][00:02:18.737]
    - **講座の目的**:
        - **資料作成工数の大幅な削減**: 残業の大きな原因となっている資料作成の負担を軽減することが第一の目的。 [佐々木琢丸 / Sasaki，Takumaru][00:02:36.147]
        - **効果的なツールの模索（PoC）**:
            - 今回はPoC（概念実証）と位置づけ、AI活用スキルが高い参加者を中心に実施。 [佐々木琢丸 / Sasaki，Takumaru][00:02:56.407]
            - **アンケートを通じて効果を測定**し、下期からの本格展開に向け、社内規定内で最も効果的なツールを選定する。 [佐々木琢丸 / Sasaki，Takumaru][00:03:23.117]

### 使用ツールの注意事項と事前準備:

- **使用ツールの注意事項** [佐々木琢丸 / Sasaki，Takumaru][00:04:01.177]
    - **機密情報の入力禁止**:
        - 今回使用する`Google AI Studio`は社外AIであるため、**機密情報の入力は厳禁**。 [佐々木琢丸 / Sasaki，Takumaru][00:04:08.337]
            - 機密情報とは「Webに公開されていない情報」と定義。 [佐々木琢丸 / Sasaki，Takumaru][00:04:18.977]
    - **継続利用時の社内申請**:
        - **`Google AI Studio`**: 機密情報を入力しない前提で、フリーソフト申請（Rdフロー）が必要。 [佐々木琢丸 / Sasaki，Takumaru][00:04:48.547]
        - **`Figma`**:
            - フリーソフトとしての利用は認定済みだが、**利用には登録申請（Rdフロー）が別途必要**。 [佐々木琢丸 / Sasaki，Takumaru][00:05:04.877]
            - 承認後、デスクトップアプリをダウンロードして使用する流れ。 [佐々木琢丸 / Sasaki，Takumaru][00:05:17.677]
- **事前準備の確認** [佐々木琢丸 / Sasaki，Takumaru][00:05:30.607]
    - **必須準備事項の3点**:
        - 会社メールアドレスでの`Google`アカウント作成。 [佐々木琢丸 / Sasaki，Takumaru][00:05:44.707]
        - `Google AI Studio`と`Figma`へのログイン。 [佐々木琢丸 / Sasaki，Takumaru][00:05:44.707]
        - `SVG`ビューアを開ける状態にしておく。 [佐々木琢丸 / Sasaki，Takumaru][00:06:00.311]
    - **未完了者へのサポート**:
        - 準備ができていない場合は、個別チャットでサポートする旨をアナウンス。 [佐々木琢丸 / Sasaki，Takumaru][00:06:28.697]
    - **作業環境の準備指示**:
        - `Google AI Studio`、`Figma`、`SVG`ビューアの3つのツールを開いておくよう指示。 [佐々木琢丸 / Sasaki，Takumaru][00:06:43.407]

### SVGによる資料作成の実践:

- **講座開始とレベル感の確認** [TANREN佐藤][00:07:17.007]
    - プロンプトの基礎知識（マークダウン、コードブロックなど）はある前提で進めることを確認。 [TANREN佐藤][00:07:28.167]
        - ただし、要望があれば都度解説するスタンスを表明。 [TANREN佐藤][00:08:02.187]
        - 不明点はチャットに書き込むよう促す。 [TANREN佐藤][00:08:09.907]
    - **使用ツールの確認**:
        - 本来は`VS Code`の活用も想定していたが、今回は`Google AI Studio`のみで実施することを確認。 [佐々木琢丸 / Sasaki，Takumaru][00:08:48.577]
- **`SVG`の基本概念とAIへの質問方法** [TANREN佐藤][00:09:11.587]
    - **`SVG`とは何か？**:
        - 参加者からの「`SVG`とは何か？」という質問に対し、AIに尋ねる手法を実演。 [TANREN佐藤][00:13:30.927]
        - **効果的な質問の仕方**:
            - **背景情報を加える**: 「非エンジニアで理解できない」といった自身の状況を伝えることで、AIは回答を最適化する。 [TANREN佐藤][00:20:12.557]
            - **出力形式を指定する**: 「マークダウンやテーブル表を駆使して」と指示することで、視覚的に分かりやすい回答が得られる。 [TANREN佐藤][00:21:04.467]
            - **`Google`検索連携を活用する**: `Google AI Studio`の「with Google Search」機能をオンにすることで、Web上の最新情報に基づいた正確な回答を生成させる。 [TANREN佐藤][00:19:36.587]
    - **`SVG`の最大の特徴：ベクターデータ**
        - **ジャギーの発生しない品質**: `SVG`はベクターデータであるため、**拡大・縮小しても画像が劣化（ジャギーが発生）しない**。 [TANREN佐藤][00:24:36.327]
            - `Figma`上でJPEG画像と`SVG`画像を比較し、拡大時の品質の違いを実演。 [TANREN佐藤][00:26:22.837]
- **`Google AI Studio`による`SVG`資料の生成** [TANREN佐藤][00:25:22.597]
    - **簡単な`SVG`画像の生成**:
        - 「ゴリラの絵を`SVG`で書いてください」という簡単なプロンプトで`SVG`コードを生成。 [TANREN佐藤][00:25:38.557]
            - 生成されたコードをテキストファイルに保存し、拡張子を`.txt`から`.svg`に変更。 [TANREN佐藤][00:27:38.827]
            - 生成した`SVG`ファイルを`Figma`にドラッグ＆ドロップし、ジャギーがないことを確認。 [TANREN佐藤][00:28:04.507]
    - **プレゼン資料の`SVG`生成**:
        - 「ドラゴンボールが人気の理由を`SVG`のプレゼン資料にしてください」という指示で、複数枚のスライドを生成。 [TANREN佐藤][00:31:09.307]
            - 生成された各スライドの`SVG`コードをダウンロードし、`Figma`に取り込み。 [TANREN佐藤][00:33:14.727]
            - **`Figma`上で各要素（テキスト、オブジェクト）が個別に編集可能**であることを示す。 [TANREN佐藤][00:36:44.837]
- **システムプロンプトによる高度な資料生成** [TANREN佐藤][00:54:25.977]
    - **システムプロンプトの概要**:
        - あらかじめ詳細なデザイン指示（レイアウト、フォント、配色等）を定義したプロンプトを「システムプロンプト」として設定。 [TANREN佐藤][00:57:04.277]
            - これにより、**毎回同じ高品質なフォーマットで資料を生成**させることが可能になる。 [TANREN佐藤][00:58:00.907]
    - **実演**:
        - 講師が用意した「明治昭和モダンテイスト」のシステムプロンプトを`Google AI Studio`に設定。 [TANREN佐藤][00:57:57.427]
        - 「北斗の拳が人気の理由」というテーマで資料を生成させ、デザイン性が統一されたスライドが出力されることを実演。 [TANREN佐藤][00:58:51.957]
    - **参加者の課題**:
        - **`PowerPoint`への取り込みエラー**: 生成された`SVG`が`PowerPoint`に正常に取り込めない事象が発生。 [TANREN佐藤][01:18:54.507]
        - **`Figma`での表示エラー**: 背景が黒くなるなど、`Figma`で意図通りに表示されないケースも報告される。 [TANREN佐藤][01:14:02.687]
            - **原因**: AIが生成したコードが不完全である可能性。 [TANREN佐藤][01:24:04.687]
            - **対処法**: エラー画面のスクリーンショットをAIに送り、**コードの修正を依頼する**ことが有効。 [TANREN佐藤][01:14:32.847]

### エージェント活用と今後の展望:

- **`VS Code` + `Copilot`（エージェント）の可能性** [TANREN佐藤][01:32:16.937]
    - **作業の完全自動化**: エージェントを活用することで、ファイルのリネームやフォルダ管理といった**手作業を一切なくし、資料生成を全自動化できる**。 [TANREN佐藤][01:37:34.257]
        - デモンストレーションでは、エージェントが自ら分析・構成設計を行い、複数の`SVG`ファイルを自動で生成していく様子を提示。 [TANREN佐藤][01:38:23.277]
    - **`Claude 3 Opus`の優位性**: より高度なモデル（例：`Claude 3 Opus`）を使用することで、さらに高品質なスライド生成が期待できる。 [TANREN佐藤][01:33:31.657]
    - **並列処理による高速化**: 上位のエンジニアは複数のエージェントを同時に動かす「並列処理」により、作業時間を劇的に短縮している。 [TANREN佐藤][01:41:07.247]
        - **これが今後の目指すべき未来像**として示される。 [TANREN佐藤][01:49:56.567]

### 質疑応答と閉会:

- **質疑応答と参加者のレベル感把握** [佐々木琢丸 / Sasaki，Takumaru][01:44:06.467]
    - **参加者のつまずきポイント**:
        - `Google AI Studio`でのコード生成は概ね理解。 [佐々木琢丸 / Sasaki，Takumaru][01:44:34.867]
        - **`SVG`形式への変換と`Figma`への取り込みで多くの参加者が困難を感じている**ことが判明。 [佐々木琢丸 / Sasaki，Takumaru][01:45:01.177]
        - システムプロンプトの活用については、さらに理解度が低い状況。 [佐々木琢丸 / Sasaki，Takumaru][01:46:12.847]
- **今後の方向性** [佐々木琢丸 / Sasaki，Takumaru][01:50:26.057]
    - **次回講座の内容調整**:
        - 今回のフィードバックを受け、次回は`Figma`の基本操作など、より初歩的な内容に重点を置くことを検討。 [佐々木琢丸 / Sasaki，Takumaru][01:50:26.737]
    - **アンケートの実施**:
        - 参加者につまずいた点を具体的に記述してもらうためのアンケートを実施し、今後の改善に繋げる。 [佐々木琢丸 / Sasaki，Takumaru][01:50:32.697]
- **閉会** [佐々木琢丸 / Sasaki，Takumaru][01:50:58.257]
    - 参加者への感謝を述べ、講座を終了。 [佐々木琢丸 / Sasaki，Takumaru][01:51:10.697]
    - 講師より、議事録に補足情報（ドラゴンボールのくだりなど）を追記する旨のアナウンス。 [TANREN佐藤][01:51:34.737]

完

---

↓

↓　本編に戻る

↓

---

QR:

![image.png](attachment:31cdc078-6d44-4358-8745-e71f9a4f0674:image.png)

[https://tanren.notion.site/SVG-20e31bbd522c806bba2ad423766bbc0b](https://www.notion.so/SVG-20e31bbd522c806bba2ad423766bbc0b?pvs=21)

社外への共有はお控え願います。

![image.png](attachment:dd93e5e8-4fcb-4376-98e6-248d32adedc2:image.png)

こんにちは、TANREN株式会社のAI秘書・桜木美佳（さくらぎみか）です。
今回は「次世代SVGプレゼン講座」と銘打って、実際の使用例を踏まえながら[ VScode / Google AI Studio ] × [Claude sonnet 4] × [Figma] を駆使した新しいプレゼン資料づくりの手順をご紹介します。

正直、最初は「AIとコードが入り混じったスライド作成なんて、ものすごく難しそう…」と感じるかもしれません。ですが、ご安心を。

---

# ▶️[初級編]はここから

まず！

「先生！SVGってなに？からスタートしてください」

### ✅Google AI Studio:

![image.png](attachment:66ae8c7c-1545-4928-aa4b-cfa2cb8ea533:image.png)

https://aistudio.google.com/app/prompts/

はい、それでは超便利なGoogle AI Studioを活用してきいてみます

活用する際にポイントは３つ

**１、最新モデルを指定**

![image.png](attachment:dcc829c6-961f-4c72-ae01-a76d1c1d6c52:image.png)

“gemini-2.5-pro-preview-06-05”　を指定しましょう

世界最強のAIが無料で使えます

**２、Google検索、Webスクレイピングをオン**

![image.png](attachment:c547a636-2e32-4caf-b103-4b080f7842dc:image.png)

“Grounding with Google Search”で[Google検索]が自動で

“URL context”で[Webスクレイピング]が使える。

**３、システムプロンプトを設定する（後述）**

ここは今はいいです
〜〜〜〜〜〜〜〜〜

あとで必要になります。存在を覚えておきましょう。

![image.png](attachment:e8c93dd4-b63d-410e-82cc-ce2d06cacce0:image.png)

“System instructions”で[前提条件の指示]を出せます。

**※ここはちょっとレベルが[初級]ではなく[中級]になり、複雑さが増せば[上級]にもなります**

### ✅SVGとは

<aside>
💡

すみません。まずSVGとはなんですか？

wiki読んでも専門的すぎて非エンジニアの私には理解不能です

[**https://ja.wikipedia.org/wiki/Scalable_Vector_Graphics**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fja.wikipedia.org%2Fwiki%2FScalable_Vector_Graphics)

マークダウンや

テーブル表を駆使して

徹底解説してください

学生でもわかるようにしてくれるとうれしいな

</aside>

↓AI回答：

### SVGって、いったい何？

一言でいうと、SVGは「**拡大・縮小しても絶対に画像が荒れない、ウェブサイト向けの画像形式**」のことです。

- **長くなるのでトゴルに入れておきます**

    承知いたしました。専門用語が多くて難しいですよね。
    SVGについて、学生の方にもご理解いただけるように、マークダウンとテーブルを使って分かりやすく解説しますね。

    ### SVGって、いったい何？

    一言でいうと、SVGは「**拡大・縮小しても絶対に画像が荒れない、ウェブサイト向けの画像形式**」のことです。

    「Scalable Vector Graphics（スケーラブル・ベクター・グラフィックス）」の頭文字をとってSVG（エスブイジー）と呼ばれています。

    数学の「点と線を結んで図形を描く」のと同じような仕組みで画像を表示しているため、どれだけ大きく拡大しても、計算式で再描画されるだけで、画質が一切劣化しません。

    ---

    ### SVGの主な特徴

    SVGには、他の画像ファイル（JPEGやPNGなど）にはない、ユニークな特徴がたくさんあります。

    - **💯 拡大・縮小してもキレイなまま**
        - スマホで見ても、大きなPCモニターで見ても、画質が荒れることはありません。
    - **📝 テキストデータでできている**
        - 実はSVGファイルの中身は、メモ帳などで開けるテキスト（コード）で書かれています。
        - そのため、コードを直接編集して色を変えたり、形を修正したりできます。
    - **💨 ファイルサイズが比較的小さい**
        - 単純なロゴやアイコンの場合、PNGやJPEGよりもファイルサイズが軽くなることが多いです。ウェブサイトの表示を速くするのに役立ちます。
    - **🎨 CSSやJavaScriptで動かせる**
        - ウェブサイトの他の要素と同じように、CSSで色やサイズを変えたり、JavaScriptでアニメーションをつけたりといった「動き」のある表現が可能です。

    ---

    ### 他の画像（JPEG, PNG）との違い

    普段よく目にするJPEGやPNGとは何が違うのでしょうか？表で比べてみましょう。

    | 特徴 | SVG (ベクター形式) | JPEG (ラスター形式) | PNG (ラスター形式) |
    | --- | --- | --- | --- |
    | **正式名称** | Scalable Vector Graphics | Joint Photographic Experts Group | Portable Network Graphics |
    | **仕組み** | 点や線の位置・色を計算して描く | 小さな色の点の集まりで表現 | 小さな色の点の集まりで表現 |
    | **拡大・縮小** | **得意（荒れない）** ✨ | 苦手（荒れる） | 苦手（荒れる） |
    | **得意な画像** | ロゴ、アイコン、地図、グラフ | **写真** | イラスト、背景が透明な画像 |
    | **背景の透過** | ◯ 可能 | × 不可 | ◯ 可能 |
    | **アニメーション** | ◯ 可能 (CSS/JSを使う) | × 不可 | × 不可 |
    | **メモ帳で編集** | ◯ 可能 | × 不可 | × 不可 |

    簡単に言うと、以下のようになります。

    - **SVG**: ロゴやアイコンなど、くっきりさせたい図形に使う。
    - **JPEG**: 写真のように、たくさんの色が使われている複雑な画像に使う。
    - **PNG**: 背景を透明にしたいイラストやロゴに使う。

    ---

    ### SVGのメリットとデメリット

    ### 😊 メリット

    - **解像度に依存しない**: どんなデバイス、どんなサイズの画面で見ても常にくっきり綺麗に表示されます。
    - **インタラクティブ**: マウスを乗せたら色が変わる、クリックしたら形が変わる、といった動きをつけられます。
    - **ファイルサイズが軽い**: 単純な図形であれば、他の形式よりファイルサイズを軽くできます。
    - **テキストで編集可能**: 専用の画像編集ソフトがなくても、テキストエディタで色やサイズの変更ができます。

    ### 😟 デメリット

    - **複雑な画像には不向き**: 写真のように色や形が非常に複雑な画像の表現には向いていません。ファイルサイズが巨大になったり、表示が遅くなったりします。
    - **表示に処理が必要**: 画像を点で表示するラスター形式と違い、SVGは都度ブラウザが計算して描画するため、非常に複雑な図形だとPCに負荷がかかる場合があります。

    ### どんなところで使われているの？

    身近なウェブサイトで、SVGはたくさん使われています。

    - 企業のロゴ
    - ウェブサイトのアイコン（メニュー、検索ボタンなど）
    - 地図サービス（Googleマップなど）
    - グラフやチャート

    これらのものは、くっきり表示される必要があり、色を変えたり、大きさを変えたりすることが多いので、SVGが非常に適しています。

    ---

    このように、SVGは特にウェブサイト制作において、その「拡大しても荒れない」特性や「動きをつけられる」柔軟性から、非常に重要な役割を担っています。

    少しでもSVGについての理解が深まれば嬉しいです！


### ✅画像を作ってみる

<aside>
💡

テストでゴリラかいてくださいsvgで

</aside>

↓AI回答：

左　はネットの参考画像

右　はSVGの画像展開した画像

![Figma 2025-06-11 13.30.20.png](attachment:283155ca-b267-49ad-bf38-6ad38d4d3669:Figma_2025-06-11_13.30.20.png)

- **長くなるのでトゴルに入れておきます**

    はい、承知いたしました。
    SVGのテストとして、簡単な図形を組み合わせたゴリラのイラストをコードで作成しました。

    以下がゴリラのSVGコードです。このコードをコピーして、拡張子を`.svg`としてテキストファイルに保存すると、画像としてブラウザなどで開くことができます。

    ### ゴリラのSVGコード

    ```xml
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="<http://www.w3.org/2000/svg>">
      <!-- ゴリラのシルエット (頭と体) -->
      <g id="silhouette" fill="#383838">
        <!-- 頭の盛り上がり -->
        <path d="M 60,80 Q 100,20 140,80 Z" />
        <!-- 顔と体のベース -->
        <rect x="40" y="60" width="120" height="100" rx="20" />
      </g>

      <!-- 顔のパーツ -->
      <g id="face">
        <!-- 顔の肌色の部分 -->
        <path d="M 70,125 C 70,90, 130,90, 130,125 Q 100,145, 70,125 Z" fill="#5E5E5E"/>

        <!-- 目 -->
        <circle cx="87" cy="95" r="5" fill="black" />
        <circle cx="113" cy="95" r="5" fill="black" />

        <!-- 鼻 -->
        <ellipse cx="95" cy="112" rx="6" ry="3" fill="black" />
        <ellipse cx="105" cy="112" rx="6" ry="3" fill="black" />

        <!-- 口 -->
        <path d="M 90,128 Q 100,132 110,128" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round" />
      </g>

      <!-- 耳 -->
      <g id="ears" fill="#383838">
        <circle cx="45" cy="85" r="10" />
        <circle cx="155" cy="85" r="10" />
      </g>
    </svg>

    ```

    ### このSVGコードの簡単な解説

    | タグ | 説明 | ゴリラのどの部分？ |
    | --- | --- | --- |
    | `<svg>` | SVG全体のキャンバスを定義します。 | イラスト全体 |
    | `<g>` | いくつかの図形をグループ化します。ここでは「シルエット」「顔」「耳」をまとめています。 | パーツのまとまり |
    | `<rect>` | `rectangle`の略で、四角形を描きます。`rx`は角の丸みを指定します。 | 顔と体のベース |
    | `<path>` | `path`の略で、複雑な線や図形を描きます。計算式のように図形を表現できます。 | 頭の盛り上がり、顔の肌色部分、口 |
    | `<circle>` | 円を描きます。 | 目、耳 |
    | `<ellipse>` | 楕円を描きます。 | 鼻 |
    | `fill` | 図形の塗りつぶしの色を指定します。 | 各パーツの色 |
    | `stroke` | 図形の線の色を指定します。 | 口の線 |

    このように、SVGはテキスト（コード）の組み合わせでイラストを表現しています。このコードの`fill="#383838"`のような色の部分を書き換えれば、ゴリラの色を自由に変更することもできます。


### ✅SVGスライドを依頼してみる

<aside>
💡

日本の有名な漫画/アニメ：ドラゴンボールが人気の理由をSVGのプレゼン資料にしてください

</aside>

↓AI回答：

![Figma 2025-06-11 13.35.22.png](attachment:4a92ea7a-41b3-4e41-9494-0780f839e5f3:Figma_2025-06-11_13.35.22.png)

- **長くなるのでトゴルに入れておきます**

    承知いたしました。
    前の会話で学んだSVGを使って、ドラゴンボールが世界中で人気の理由についてのプレゼン資料を作成します。

    各スライドを1つのSVGコードで表現し、そのコードと内容の解説をセットで紹介していきます。

    ---

    ### 【SVGプレゼン資料】ドラゴンボールはなぜ世界中で人気なのか？

    このプレゼンテーションは、SVGで作成したスライドで構成されています。
    各スライドのSVGコードと、そのスライドが表現している内容を解説します。

    ---

    ### **スライド1: タイトル**

    まずは、プレゼンの顔となるタイトルスライドです。ドラゴンボールを象徴する「四星球（スーシンチュウ）」を中央に配置しました。

    *(※これはSVGがどのように表示されるかのイメージ画像です)*

    ### 📜 スライド1のSVGコード

    ```xml
    <svg width="600" height="340" viewBox="0 0 600 340" xmlns="<http://www.w3.org/2000/svg>">
      <!-- 背景 -->
      <rect width="600" height="340" fill="#F0F4F8" />

      <!-- タイトルテキスト -->
      <text x="300" y="70" font-family="Arial, sans-serif" font-size="32" font-weight="bold" text-anchor="middle" fill="#333">
        ドラゴンボールはなぜ世界中で人気なのか？
      </text>

      <!-- 四星球（スーシンチュウ） -->
      <circle cx="300" cy="190" r="100" fill="url(#grad)" />
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:rgb(255,165,0);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(240,100,0);stop-opacity:1" />
        </radialGradient>
      </defs>

      <!-- 星 ★★★★ -->
      <g fill="#D83A3A" transform="translate(255, 145) scale(0.6)">
        <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" />
        <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" transform="translate(0, 80)"/>
        <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" transform="translate(70, 0)"/>
        <path d="M50 0 L61.8 38.2 L100 38.2 L69.1 61.8 L80.9 100 L50 76.4 L19.1 100 L30.9 61.8 L0 38.2 L38.2 38.2 Z" transform="translate(70, 80)"/>
      </g>
    </svg>

    ```

    ### **SVGコード解説**

    - `<rect>`でスライドの背景色を設定しています。
    - `<text>`でタイトルを配置し、`text-anchor="middle"`で中央揃えにしています。
    - `<circle>`で球体を描き、`<radialGradient>`で立体感のあるグラデーションをかけています。
    - `<path>`で星の形を描き、`<g>`と`transform`を使って4つの星を配置しています。

    ---

    ### **スライド2: 人気の理由① シンプルで熱い王道ストーリー**

    ドラゴンボールの根幹にあるのは、誰もが理解し、共感できる物語です。

    *(※これはSVGがどのように表示されるかのイメージ画像です)*

    ### 📜 スライド2のSVGコード

    ```xml
    <svg width="600" height="340" viewBox="0 0 600 340" xmlns="<http://www.w3.org/2000/svg>">
      <!-- 背景 -->
      <rect width="600" height="340" fill="#FFF" stroke="#DDD" stroke-width="2"/>

      <!-- ヘッダー -->
      <rect width="600" height="50" fill="#007BFF"/>
      <text x="30" y="33" font-family="Verdana, sans-serif" font-size="20" fill="white">
        理由① シンプルで熱い王道ストーリー
      </text>

      <!-- アイコンとテキスト -->
      <!-- 1. 修行と成長 -->
      <g transform="translate(50, 80)">
        <path d="M20 70 L50 40 L80 70" stroke="#28A745" stroke-width="8" fill="none" stroke-linecap="round"/>
        <line x1="50" y1="40" x2="50" y2="130" stroke="#28A745" stroke-width="8" />
        <text x="50" y="160" text-anchor="middle" font-size="18" font-family="sans-serif">修行と成長</text>
      </g>

      <!-- 2. 強敵とのバトル -->
      <g transform="translate(250, 80)">
        <path d="M30 40 L70 80 M70 40 L30 80" stroke="#DC3545" stroke-width="8" stroke-linecap="round"/>
        <text x="50" y="160" text-anchor="middle" font-size="18" font-family="sans-serif">強敵とのバトル</text>
      </g>

      <!-- 3. 仲間との絆 -->
      <g transform="translate(450, 80)">
        <circle cx="50" cy="65" r="20" fill="#FFC107"/>
        <path d="M20 130 C 20 90, 80 90, 80 130" fill="#FFC107"/>
        <text x="50" y="160" text-anchor="middle" font-size="18" font-family="sans-serif">仲間との絆</text>
      </g>
    </svg>

    ```

    ### **SVGコード解説**

    - `transform="translate(x, y)"`を使って、アイコンとテキストのセットをスライド内の好きな位置に移動させています。
    - **成長の矢印**: `<path>`と`<line>`を組み合わせて上向きの矢印を描いています。
    - **バトル**: 2本の線を交差させて「VS」のイメージを表現しています。
    - **仲間**: `<circle>`と`<path>`で人の上半身のようなアイコンを作成しています。

    ---

    ### **スライド3: 人気の理由② 忘れられない魅力的なキャラクター**

    物語を彩るのは、敵も味方も含めた個性豊かなキャラクターたちです。

    *(※これはSVGがどのように表示されるかのイメージ画像です)*

    ### 📜 スライド3のSVGコード

    ```xml
    <svg width="600" height="340" viewBox="0 0 600 340" xmlns="<http://www.w3.org/2000/svg>">
      <!-- 背景 -->
      <rect width="600" height="340" fill="#FFF" stroke="#DDD" stroke-width="2"/>

      <!-- ヘッダー -->
      <rect width="600" height="50" fill="#28A745"/>
      <text x="30" y="33" font-family="Verdana, sans-serif" font-size="20" fill="white">
        理由② 忘れられない魅力的なキャラクター
      </text>

      <!-- コンテンツ -->
      <text x="300" y="110" text-anchor="middle" font-size="22" font-family="sans-serif">
        純粋で心優しい「孫悟空」
      </text>
      <text x="300" y="180" text-anchor="middle" font-size="22" font-family="sans-serif">
        誇り高いライバル「ベジータ」
      </text>
       <text x="300" y="250" text-anchor="middle" font-size="22" font-family="sans-serif">
        信念を持つ悪役「フリーザ」など
      </text>

      <!-- 装飾 -->
      <circle cx="60" cy="110" r="10" fill="#FFC107"/>
      <circle cx="60" cy="180" r="10" fill="#007BFF"/>
      <circle cx="60" cy="250" r="10" fill="#DC3545"/>
    </svg>

    ```

    ### **SVGコード解説**

    - このスライドは、アイコンよりもテキストを主体に構成しています。
    - `<text>`タグを複数使い、`y`座標をずらすことで箇条書きのように見せています。
    - 行頭に置いた`<circle>`（円）は、リストのマーカー（ビュレット）の役割を果たしています。色を変えることで、キャラクターのイメージを表現しています。

    ---

    ### **スライド4: 人気の理由③ 世界共通のワクワク感**

    文化や言語の壁を越えて、誰もが楽しめる普遍的な要素が満載です。

    *(※これはSVGがどのように表示されるかのイメージ画像です)*

    ### 📜 スライド4のSVGコード

    ```xml
    <svg width="600" height="340" viewBox="0 0 600 340" xmlns="<http://www.w3.org/2000/svg>">
      <!-- 背景 -->
      <rect width="600" height="340" fill="#FFF" stroke="#DDD" stroke-width="2"/>

      <!-- ヘッダー -->
      <rect width="600" height="50" fill="#DC3545"/>
      <text x="30" y="33" font-family="Verdana, sans-serif" font-size="20" fill="white">
        理由③ 世界共通のワクワク感
      </text>

      <!-- アイコンとテキスト -->
      <!-- 1. "かめはめ波" -->
      <g transform="translate(50, 100)">
        <circle cx="50" cy="50" r="40" fill="#00D2FF" opacity="0.3"/>
        <circle cx="50" cy="50" r="25" fill="#00D2FF" opacity="0.6"/>
        <circle cx="50" cy="50" r="10" fill="#00D2FF"/>
        <text x="50" y="130" text-anchor="middle" font-size="18">"かめはめ波"という発明</text>
      </g>

      <!-- 2. インフレするバトル -->
      <g transform="translate(250, 100)">
        <path d="M20 90 L50 60 L80 90 L50 60 L50 20 L20 50 M80 50 L50 20" stroke="#FFC107" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
        <text x="50" y="130" text-anchor="middle" font-size="18">インフレする戦闘力</text>
      </g>

      <!-- 3. 冒険と探求 -->
      <g transform="translate(450, 100)">
        <path d="M50 20 A 40 40 0 1 1 49.9 20 M 20 50 L 80 50 M 50 20 L 50 80" stroke="#28A745" stroke-width="6" fill="none"/>
        <circle cx="50" cy="50" r="5" fill="#DC3545"/>
        <text x="50" y="130" text-anchor="middle" font-size="18">ボールを探す冒険</text>
      </g>
    </svg>

    ```

    ### **SVGコード解説**

    - **かめはめ波**: 半径と透明度(`opacity`)が異なる円を重ねることで、エネルギー波のイメージを作成しています。
    - **戦闘力**: 上昇と爆発をイメージさせる複数の線で「インフレーション」を表現しています。
    - **冒険**: 地図の緯線・経線と目的地マークのような図形を`<path>`と`<circle>`で描き、「探求」を表現しています。

    ---

    このように、SVGを使うとテキストベースのコードだけで、図形やアイコンを組み合わせた視覚的な資料を作成できます。色や形、テキストを少し変えるだけで簡単にカスタマイズできるのが大きな利点です。


<aside>
💡

シャギーとジャギー、画像が荒くなる事はどちら？

</aside>

↓AI回答：

### ジャギー (Jaggy) とは？

**ジャギー**とは、デジタル画像の輪郭に現れる「**ギザギザ**」や「**階段状の荒れ**」のことを指します。

これは、画像を構成している四角いピクセル（画素）で、滑らかな曲線や斜線を表現しようとするときに発生します。

- **長くなるのでトゴルに入れておきます**

    画像が荒くなることを指すのは「**ジャギー（Jaggy）**」です。

    「シャギー（Shaggy）」は別の意味を持つ言葉なので、それぞれの違いを分かりやすく解説しますね。

    ---

    ### ジャギー (Jaggy) とは？

    **ジャギー**とは、デジタル画像の輪郭に現れる「**ギザギザ**」や「**階段状の荒れ**」のことを指します。

    これは、画像を構成している四角いピクセル（画素）で、滑らかな曲線や斜線を表現しようとするときに発生します。

    - **原因**:
        - 解像度の低い画像を拡大表示したとき。
        - ビットマップ画像（JPEGやPNGなど、ピクセルの集まりでできている画像）で、斜めの線を描画したとき。
    - **見た目**:
        - 線のフチがなめらかではなく、カクカクとした階段のように見える。
    - **対策**:
        - **アンチエイリアシング**という技術で、境界線を中間色でぼかして、なめらかに見せることができます。
        - 前にお話しした**SVG（ベクター形式）**のように、ピクセルに依存しない形式の画像を使うと、どれだけ拡大してもジャギーは発生しません。

    ---

    ### シャギー (Shaggy) とは？

    **シャギー**は、もともと「**毛むくじゃらの**」「**けばだった**」という意味の英語です。画像そのものが荒れること（ジャギー）を指す専門用語ではありません。

    - **主な使われ方**:
        - **髪型**: 毛先を不揃いにする「シャギーカット」。
        - **インテリア**: 毛足の長い「シャギーラグ」や「シャギーカーペット」。
        - **犬種**: 「シャギードッグ」など、毛がもじゃもじゃした犬。

    見た目が「ぼさぼさ」「もじゃもじゃ」している状態を表す言葉です。画像のノイズやざらつきを指して比喩的に使う人がいるかもしれませんが、技術的な用語としては正しくありません。

    ---

    ### まとめ表

    | 特徴 | ジャギー (Jaggy) | シャギー (Shaggy) |
    | --- | --- | --- |
    | **意味** | デジタル画像の輪郭の**ギザギザ** | **毛むくじゃら**、けばだった |
    | **分野** | **コンピューターグラフィックス**、画像処理 | ファッション、インテリア、一般的な表現 |
    | **見た目の表現** | カクカク、階段状 | もじゃもじゃ、ふさふさ |
    | **原因** | ピクセルで曲線を表現する際の限界 | （物理的な）毛足が長い、不揃い |
    | **画像が荒れるのはどっち？** | ✅ **こちら** | ❌ 違う |

    というわけで、**画像がピクセルで荒れてギザギザに見える現象は「ジャギー」**と覚えておけば間違いありません！


---

## ▶️システムプロンプトを駆使するとこんな事ができます。

### ✅SVGスライドのシステムプロンプトを入れてみる

TANREN佐藤が日常使う３カラム構成でスライドを作る[システムプロンプト]

# # 明治・昭和モダンテイスト 3カラムスライドテンプレート

```markdown
```

# 明治・昭和モダンテイスト 3カラムスライドテンプレート
<!-- このプロンプトは@jrpj2010が最適化をしたプロンプトです。 -->

## 目的
以下の内容を、一流デザイナーが作成したような、スクロールなしで16:9画面に収まる日本語明治・昭和モダンテイストSVGスライドに変換します。
情報の優先順位付けと視覚的表現に重点を置き、キーポイントを素早く把握できるようにします。加えて、欄外には[プレゼン用のトークスクリプト]と[インフォグラフィック向けのハイソでおしゃれなインフォグラフィックな挿絵を、画像系生成AI用プロンプト]も同時に書いてもらう指示もついてます。

## レイアウト仕様
- 3カラムのグリッドレイアウト（合計3つのカード）
- 16:9ディスプレイに最適化（スクロールなしになるようにコンテンツボリュームを調整）
- マージン(余白)最小化と情報密度最大化を同時に実現するように推論過程を多くする。
- ヘッダーとフッターをコンパクトに設計

## デザイン仕様
### カラースキーム
```css
   - 限定的なカラーパレットを採用：
     - 主要色：黒（#2c2c2c）と生成色（#f4f1ea）
     - アクセントカラー：朱色（#b3322b）、藍色（#1a5b66）、紫色（#653a5e）
   - 各カラムに異なるアクセントカラーを配置し、統一感の中に変化を付与
```

### タイポグラフィ
   - タイトルには「Noto Serif JP」の明朝体を使用し、伝統的な印象
   - 本文は「Noto Sans JP」で可読性を確保
   - 文字間隔（letter-spacing）を広めに取り、昭和期のタイポグラフィを表現
- 階層的なフォントサイズ（タイトル24px→本文11px）
- 視認性重視のコントラスト調整

### 視覚要素
- Unicode絵文字/アイコンを見出しに活用
- コンパクトなプロセスフロー図
- 簡易チャート・グラフ（全体に対して15%未満のスペース）
- 日本の伝統的な「線と点」のデザイン：タイトル下の線と丸のアクセント
- 四角形ベースの構成で昭和モダンの幾何学的な美しさを表現
- 余白（間）の取り方を和風デザイン的に調整
- ハイライト効果（下線、マーカー、囲み）

## データビジュアライゼーション要素
- 必ず1カラムにつき2つ以上のビジュアル要素を含める
- 棒グラフ/折れ線グラフは明確な軸ラベルと数値を表示
- 表形式データは交互に色を変えて視認性を確保
- プロセスフロー図は必ず方向を示す矢印と説明テキストを含める
- 比較データは必ずBefore/After、現状/目標などの対比で表示

## 情報構造ガイドライン
1.  情報階層表現
- 各セクションには必ず「見出し→概要→詳細→実践/結論」の流れを作る
- データは「数値→単位→比較→意味」の順で説明
- 主張は「結論→根拠→事例→展開」の構造で表現
- 各カラムの情報量バランスを均等に保つ（文字数±10%以内）

2. **3セクションの典型的な構成**

```
### カラム1（左カラム）
- {カラム1_テーマ}: カラム1のメインテーマ
- {カラム1_サブテーマ}: カラム1のサブテーマ
- {カラム1_本質タイトル}: カラム1の第1セクションタイトル
- {カラム1_本質説明}: カラム1の第1セクション説明文
- {カラム1_ツール名}: カラム1で紹介するツール名
- {カラム1_ツール特徴}: カラム1のツールの特徴
- {カラム1_特徴タイトル}: カラム1の特徴セクションタイトル
- {カラム1_実践見出し}: カラム1の実践セクション見出し
- {カラム1_実践ポイント}: カラム1の実践ポイント（箇条書き2点）

### カラム2（中央カラム）
- {カラム2_テーマ}: カラム2のメインテーマ
- {カラム2_サブテーマ}: カラム2のサブテーマ
- {カラム2_本質タイトル}: カラム2の第1セクションタイトル
- {カラム2_本質説明}: カラム2の第1セクション説明文
- {カラム2_ツール名1}: カラム2で紹介する1つ目のツール名
- {カラム2_ツール特徴1}: カラム2の1つ目のツールの特徴
- {カラム2_ツール名2}: カラム2で紹介する2つ目のツール名
- {カラム2_ツール特徴2}: カラム2の2つ目のツールの特徴
- {カラム2_特徴タイトル}: カラム2の特徴セクションタイトル
- {カラム2_実践見出し}: カラム2の実践セクション見出し
- {カラム2_実践ポイント}: カラム2の実践ポイント（箇条書き2点）

### カラム3（右カラム）
- {カラム3_テーマ}: カラム3のメインテーマ
- {カラム3_サブテーマ}: カラム3のサブテーマ
- {カラム3_本質タイトル}: カラム3の第1セクションタイトル
- {カラム3_本質説明}: カラム3の第1セクション説明文
- {カラム3_ツール名}: カラム3で紹介するツール名
- {カラム3_ツール特徴}: カラム3のツールの特徴
- {カラム3_特徴タイトル}: カラム3の特徴セクションタイトル
- {カラム3_実践見出し}: カラム3の実践セクション見出し
- {カラム3_実践ポイント}: カラム3の実践ポイント

```

3. **視覚的強調テクニック**
- 重要数値は本文より30%以上大きいフォントで表示
- 対比表現は必ず視覚的分離（線・色・枠）で区別
- 実践ポイントは必ず枠囲みと異なる背景色で強調
- プロセスステップは番号またはアイコンで順序を明示
- 決定事項・結論部分は太字と色の両方で強調
- 重要な数字(値)は大きく、単位は小さく表示
- キーフレーズはハイライト（ハイライトする場合のフォントカラーはキャンバスと同系色は使わない事）
- カテゴリータグで分類
- 色による情報の関連付け
- 日本の伝統的な「線と点」のデザイン：タイトル下の線と丸のアクセント
- 四角形ベースの構成で昭和モダンの幾何学的な美しさを表現
- 余白（間）の取り方を和風デザイン的に調整

## 処理手順
1. 元テキストから重要ポイントを抽出し、3カラムに分類
2. 各ポイントを3-5単語の表現に圧縮
3. 図解可能な要素を特定し、適切な視覚表現に変換
4. SVGで実装し、16:9ディスプレイで確認

## 実装のヒント
- フォントサイズを小さくしても視認性を確保（最小12px）
- 視覚要素に必ず代替テキストを用意
- コントラスト比4.5:1以上を維持
- モバイル対応（デスクトップ最適化優先だがレスポンシブ）

## プレゼン用トークスクリプト
- 最大3マスに適合した、トークスクリプトを提供する
- アーティファクトの外にマークダウンで記述する
- 1分間300文字を最適な文字数として定義
- 日本のテレビアナウンサーのような口調と、ビジネス会話で表現

## インフォグラフィックな挿絵用の画像生成AI向けのプロンプト
- 最大3マスに適した、インフォグラフィック向けの挿絵を画像生成AIで書く想定をする
- プロンプトルールとして[カンマ区切り,一文化 , 英語]とする
- 情景やスタイルを定義し、雰囲気をそこなわないテイストのプロンプトを提供する事
- 最大3個のプロンプトをコードブロックで提供してください

```

変換するコンテンツ:
{Userから次の対話で回収したら、それに最適化してコンテンツを生成してください}

---

理解したらUserから与えられるInput情報を処理して実行

```

このプロンプトをシステムプロンプトとして登録して

Userが依頼したら

スライドを１枚ずつSVGが作れらます

管理しやすいように
[昭和明治スライド]というフォルダの中に
{日付_生成時間}のフォルダを生成して、そのフォルダの中に連番でsvgを連続生成してください

これを理解できますか？
日本語で
理解できたらYESと言ってください

```

↓

↓　これを “System instructions”にいれる

↓

![image.png](attachment:8a4d6309-1b71-4dcd-890b-2edd9d8e6137:image.png)

そうすると前提条件の指示が加えられた状態になります。

 　　　　〜〜〜〜〜〜〜〜〜

AIを活用する上で、重要な[**システムを意図した通りにコントールする]**上で重要な知識です。

### ✅最高のプロンプト＋最高のAI(LLM) = 最高のグラフィカルプレゼンが完成

<aside>
💡

先生！システムプロンプトってなんですか！？

なぜ初心者🔰でも重要なんですか？

もっとレベル高くなってからでよくないですか？

学生でもわかるように[SVG形式]で図解して教えて

</aside>

↓AI回答：

![image.png](attachment:dba31e7e-b2af-4142-96b1-c34c1e53e95b:image.png)

※実行環境を **[Caude Opus 4.0]** で実行するとここまで変わります。

- **長くなるのでトゴルに入れておきます**

    勝さん、システムプロンプトについてのご質問ですね！初心者の方にこそ重要な概念なので、分かりやすく図解させていただきますね。

    ```markdown
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
      <!-- 背景 -->
      <rect width="1920" height="1080" fill="#f4f1ea"/>

      <!-- ヘッダー -->
      <rect x="0" y="0" width="1920" height="90" fill="#2c2c2c"/>
      <text x="60" y="55" font-family="'Noto Serif JP'" font-size="36" fill="#f4f1ea" letter-spacing="2">システムプロンプト完全ガイド ～初心者こそ知るべき基礎の基礎～</text>
      <circle cx="40" cy="55" r="8" fill="#b3322b"/>

      <!-- フッター -->
      <rect x="0" y="1010" width="1920" height="70" fill="#2c2c2c"/>
      <text x="1820" y="1050" font-family="'Noto Sans JP'" font-size="24" fill="#f4f1ea" text-anchor="end">TANREN株式会社</text>
      <text x="100" y="1050" font-family="'Noto Sans JP'" font-size="18" fill="#f4f1ea">AI秘書 桜木美佳</text>

      <!-- カラム1：システムプロンプトとは -->
      <rect x="30" y="120" width="600" height="860" fill="#f4f1ea" stroke="#2c2c2c" stroke-width="2"/>
      <rect x="30" y="120" width="600" height="80" fill="#2c2c2c"/>
      <text x="330" y="170" font-family="'Noto Serif JP'" font-size="24" fill="#f4f1ea" text-anchor="middle">システムプロンプトの基本概念</text>
      <line x1="100" y1="200" x2="560" y2="200" stroke="#b3322b" stroke-width="3"/>
      <circle cx="100" cy="200" r="5" fill="#b3322b"/>
      <circle cx="560" cy="200" r="5" fill="#b3322b"/>

      <!-- カラム1の内容 -->
      <text x="60" y="240" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">システムプロンプトとは？ 🤖</text>
      <rect x="60" y="260" width="540" height="200" fill="#fff" stroke="#b3322b" stroke-width="1"/>

      <!-- AIと人間の対話イメージ -->
      <circle cx="200" cy="340" r="40" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="200" y="345" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c" text-anchor="middle">AI</text>

      <rect x="300" y="270" width="280" height="70" fill="#f4f1ea" stroke="#b3322b" stroke-width="2" rx="10"/>
      <text x="440" y="295" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c" text-anchor="middle">システムプロンプト</text>
      <text x="440" y="315" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c" text-anchor="middle">「あなたは料理の先生です」</text>
      <text x="440" y="330" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c" text-anchor="middle">「初心者にも分かりやすく」</text>

      <polygon points="240,340 280,320 280,360" fill="#b3322b"/>

      <circle cx="200" cy="420" r="40" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="200" y="425" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c" text-anchor="middle">人間</text>

      <rect x="300" y="390" width="280" height="60" fill="#fff" stroke="#b3322b" stroke-width="1" rx="10"/>
      <text x="440" y="415" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c" text-anchor="middle">「カレーの作り方を教えて」</text>
      <text x="440" y="435" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c" text-anchor="middle">→料理初心者向けの説明に！</text>

      <text x="60" y="490" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">身近な例で理解しよう！ 💡</text>
      <rect x="60" y="510" width="540" height="200" fill="#fff" stroke="#b3322b" stroke-width="1"/>

      <!-- レストランの例え -->
      <text x="75" y="540" font-family="'Noto Sans JP'" font-size="16" fill="#2c2c2c" font-weight="bold">🍽️ レストランに例えると...</text>
      <rect x="75" y="550" width="510" height="150" fill="#f4f1ea" stroke="#b3322b" stroke-width="1" stroke-dasharray="5,5"/>

      <text x="85" y="575" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">システムプロンプト = <tspan font-weight="bold">シェフへの調理指示書</tspan></text>
      <text x="85" y="600" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">・「和食専門で」「薄味で」「旬の食材で」</text>

      <text x="85" y="630" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">ユーザーの入力 = <tspan font-weight="bold">お客様の注文</tspan></text>
      <text x="85" y="655" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">・「今日のおすすめは？」「魚料理がいい」</text>

      <text x="85" y="685" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">→同じ注文でも<tspan fill="#b3322b" font-weight="bold">調理方針が違えば結果が変わる！</tspan></text>

      <text x="60" y="740" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">システムプロンプトの役割 📋</text>
      <rect x="60" y="760" width="540" height="190" fill="#f4f1ea" stroke="#b3322b" stroke-width="2" stroke-dasharray="5,5"/>
      <text x="75" y="790" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">① <tspan font-weight="bold">AIの性格設定</tspan>: フレンドリー？プロフェッショナル？</text>
      <text x="75" y="820" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">② <tspan font-weight="bold">専門性の付与</tspan>: 医者、教師、プログラマーなど</text>
      <text x="75" y="850" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">③ <tspan font-weight="bold">回答スタイル</tspan>: 簡潔？詳細？箇条書き？</text>
      <text x="75" y="880" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">④ <tspan font-weight="bold">制約事項</tspan>: やってはいけないこと</text>
      <text x="75" y="910" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">⑤ <tspan font-weight="bold">出力形式</tspan>: 文章、コード、表、図解など</text>
      <text x="75" y="940" font-family="'Noto Sans JP'" font-size="13" fill="#b3322b">→全ての対話の<tspan font-weight="bold">土台</tspan>となる重要な設定！</text>

      <!-- カラム2：なぜ初心者に重要か -->
      <rect x="660" y="120" width="600" height="860" fill="#f4f1ea" stroke="#2c2c2c" stroke-width="2"/>
      <rect x="660" y="120" width="600" height="80" fill="#2c2c2c"/>
      <text x="960" y="170" font-family="'Noto Serif JP'" font-size="24" fill="#f4f1ea" text-anchor="middle">初心者にこそ重要な理由</text>
      <line x1="730" y1="200" x2="1190" y2="200" stroke="#1a5b66" stroke-width="3"/>
      <circle cx="730" cy="200" r="5" fill="#1a5b66"/>
      <circle cx="1190" cy="200" r="5" fill="#1a5b66"/>

      <!-- カラム2の内容 -->
      <text x="690" y="240" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">初心者が陥りやすい問題 🚨</text>
      <rect x="690" y="260" width="540" height="180" fill="#fff" stroke="#1a5b66" stroke-width="1"/>

      <!-- Before/After比較 -->
      <rect x="700" y="270" width="250" height="160" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="825" y="295" font-family="'Noto Sans JP'" font-size="16" fill="#2c2c2c" text-anchor="middle" font-weight="bold">❌ Without システムプロンプト</text>
      <text x="710" y="320" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">Q: Pythonのコード書いて</text>
      <text x="710" y="340" font-family="'Noto Sans JP'" font-size="13" fill="#b3322b">A: どんなコードですか？</text>
      <text x="710" y="360" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">Q: ファイル読み込み</text>
      <text x="710" y="380" font-family="'Noto Sans JP'" font-size="13" fill="#b3322b">A: CSVですか？JSONですか？</text>
      <text x="710" y="400" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">Q: CSV...</text>
      <text x="710" y="420" font-family="'Noto Sans JP'" font-size="12" fill="#653a5e">→何度もやり取りが必要😓</text>

      <rect x="970" y="270" width="250" height="160" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2"/>
      <text x="1095" y="295" font-family="'Noto Sans JP'" font-size="16" fill="#2c2c2c" text-anchor="middle" font-weight="bold">✅ With システムプロンプト</text>
      <text x="980" y="320" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">設定: 初心者向けPython講師</text>
      <text x="980" y="340" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">Q: ファイル読み込み</text>
      <text x="980" y="360" font-family="'Noto Sans JP'" font-size="13" fill="#1a5b66">A: CSVファイルの読み込み例：</text>
      <text x="980" y="380" font-family="'Noto Sans JP'" font-size="12" fill="#1a5b66">import pandas as pd</text>
      <text x="980" y="400" font-family="'Noto Sans JP'" font-size="12" fill="#1a5b66">df = pd.read_csv('file.csv')</text>
      <text x="980" y="420" font-family="'Noto Sans JP'" font-size="12" fill="#1a5b66">→一発で適切な回答！✨</text>

      <text x="690" y="470" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">初心者が得られる5つのメリット 🎯</text>
      <rect x="690" y="490" width="540" height="280" fill="#fff" stroke="#1a5b66" stroke-width="1"/>

      <!-- 5つのメリットを円形配置 -->
      <circle cx="820" cy="630" r="100" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2"/>
      <text x="820" y="635" font-family="'Noto Sans JP'" font-size="18" fill="#2c2c2c" text-anchor="middle" font-weight="bold">初心者の</text>
      <text x="820" y="655" font-family="'Noto Sans JP'" font-size="18" fill="#2c2c2c" text-anchor="middle" font-weight="bold">メリット</text>

      <!-- メリット1 -->
      <rect x="700" y="510" width="150" height="50" fill="#1a5b66" stroke="#1a5b66" stroke-width="1" rx="5"/>
      <text x="775" y="530" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">1. 時間短縮</text>
      <text x="775" y="550" font-family="'Noto Sans JP'" font-size="11" fill="#f4f1ea" text-anchor="middle">やり取り回数減</text>

      <!-- メリット2 -->
      <rect x="880" y="510" width="150" height="50" fill="#1a5b66" stroke="#1a5b66" stroke-width="1" rx="5"/>
      <text x="955" y="530" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">2. 的確な回答</text>
      <text x="955" y="550" font-family="'Noto Sans JP'" font-size="11" fill="#f4f1ea" text-anchor="middle">レベルに合った説明</text>

      <!-- メリット3 -->
      <rect x="1050" y="570" width="150" height="50" fill="#1a5b66" stroke="#1a5b66" stroke-width="1" rx="5"/>
      <text x="1125" y="590" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">3. 学習効率UP</text>
      <text x="1125" y="610" font-family="'Noto Sans JP'" font-size="11" fill="#f4f1ea" text-anchor="middle">体系的な学習</text>

      <!-- メリット4 -->
      <rect x="880" y="700" width="150" height="50" fill="#1a5b66" stroke="#1a5b66" stroke-width="1" rx="5"/>
      <text x="955" y="720" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">4. ミス防止</text>
      <text x="955" y="740" font-family="'Noto Sans JP'" font-size="11" fill="#f4f1ea" text-anchor="middle">誤解を減らす</text>

      <!-- メリット5 -->
      <rect x="700" y="700" width="150" height="50" fill="#1a5b66" stroke="#1a5b66" stroke-width="1" rx="5"/>
      <text x="775" y="720" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">5. 再現性</text>
      <text x="775" y="740" font-family="'Noto Sans JP'" font-size="11" fill="#f4f1ea" text-anchor="middle">同じ品質を維持</text>

      <text x="690" y="800" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">実践！初心者向け設定例 💻</text>
      <rect x="690" y="820" width="540" height="130" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2" stroke-dasharray="5,5"/>
      <text x="705" y="845" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">「<tspan font-weight="bold">あなたはプログラミング初心者向けの講師です。</tspan></text>
      <text x="720" y="870" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c"><tspan font-weight="bold">専門用語は必ず日本語で説明し、</tspan></text>
      <text x="720" y="895" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c"><tspan font-weight="bold">実例を交えて段階的に教えてください。</tspan></text>
      <text x="720" y="920" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c"><tspan font-weight="bold">エラーが出た時は原因と解決法を優しく説明します。</tspan>」</text>
      <text x="705" y="945" font-family="'Noto Sans JP'" font-size="13" fill="#1a5b66">→これだけで学習体験が激変！</text>

      <!-- カラム3：段階的学習の重要性 -->
      <rect x="1290" y="120" width="600" height="860" fill="#f4f1ea" stroke="#2c2c2c" stroke-width="2"/>
      <rect x="1290" y="120" width="600" height="80" fill="#2c2c2c"/>
      <text x="1590" y="170" font-family="'Noto Serif JP'" font-size="24" fill="#f4f1ea" text-anchor="middle">基礎から学ぶ理由と成長戦略</text>
      <line x1="1360" y1="200" x2="1820" y2="200" stroke="#653a5e" stroke-width="3"/>
      <circle cx="1360" cy="200" r="5" fill="#653a5e"/>
      <circle cx="1820" cy="200" r="5" fill="#653a5e"/>

      <!-- カラム3の内容 -->
      <text x="1320" y="240" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">なぜ「後から」ではダメ？ ⚠️</text>
      <rect x="1320" y="260" width="540" height="200" fill="#fff" stroke="#653a5e" stroke-width="1"/>

      <!-- 建物の比喩 -->
      <text x="1340" y="285" font-family="'Noto Sans JP'" font-size="16" fill="#2c2c2c" font-weight="bold">🏗️ 建築に例えると...</text>

      <!-- 悪い例の建物 -->
      <rect x="1350" y="300" width="220" height="140" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="1460" y="320" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="bold">基礎なしで建築</text>
      <rect x="1380" y="400" width="160" height="30" fill="#653a5e"/>
      <rect x="1400" y="370" width="120" height="30" fill="#653a5e" transform="rotate(-15 1460 385)"/>
      <rect x="1420" y="340" width="80" height="30" fill="#653a5e" transform="rotate(10 1460 355)"/>
      <text x="1460" y="435" font-family="'Noto Sans JP'" font-size="12" fill="#b3322b" text-anchor="middle">崩れやすい！</text>

      <!-- 良い例の建物 -->
      <rect x="1590" y="300" width="220" height="140" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2"/>
      <text x="1700" y="320" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c" text-anchor="middle" font-weight="bold">しっかりした基礎</text>
      <rect x="1620" y="400" width="160" height="30" fill="#2c2c2c"/>
      <rect x="1630" y="370" width="140" height="30" fill="#1a5b66"/>
      <rect x="1640" y="340" width="120" height="30" fill="#1a5b66"/>
      <rect x="1650" y="310" width="100" height="30" fill="#1a5b66"/>
      <text x="1700" y="435" font-family="'Noto Sans JP'" font-size="12" fill="#1a5b66" text-anchor="middle">安定成長！</text>

      <text x="1320" y="480" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">AI活用の成長段階 📈</text>
      <rect x="1320" y="500" width="540" height="250" fill="#fff" stroke="#653a5e" stroke-width="1"/>

      <!-- 成長段階の階段図 -->
      <rect x="1340" y="700" width="120" height="40" fill="#653a5e" stroke="#653a5e" stroke-width="1"/>
      <text x="1400" y="725" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">1. 基礎理解</text>

      <rect x="1470" y="660" width="120" height="40" fill="#653a5e" stroke="#653a5e" stroke-width="1"/>
      <text x="1530" y="685" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">2. 実践活用</text>

      <rect x="1600" y="620" width="120" height="40" fill="#653a5e" stroke="#653a5e" stroke-width="1"/>
      <text x="1660" y="645" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">3. 応用展開</text>

      <rect x="1730" y="580" width="120" height="40" fill="#653a5e" stroke="#653a5e" stroke-width="1"/>
      <text x="1790" y="605" font-family="'Noto Sans JP'" font-size="13" fill="#f4f1ea" text-anchor="middle" font-weight="bold">4. 創造的活用</text>

      <!-- 各段階の説明 -->
      <text x="1340" y="530" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c"><tspan font-weight="bold">基礎理解</tspan>: システムプロンプトの役割を知る</text>
      <text x="1340" y="550" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c"><tspan font-weight="bold">実践活用</tspan>: 目的に応じた設定ができる</text>
      <text x="1340" y="570" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c"><tspan font-weight="bold">応用展開</tspan>: 複雑なタスクに対応</text>
      <text x="1340" y="590" font-family="'Noto Sans JP'" font-size="12" fill="#2c2c2c"><tspan font-weight="bold">創造的活用</tspan>: 独自の活用法を開発</text>

      <polygon points="1340,720 1470,680 1470,700 1340,740" fill="#1a5b66"/>
      <polygon points="1470,680 1600,640 1600,660 1470,700" fill="#1a5b66"/>
      <polygon points="1600,640 1730,600 1730,620 1600,660" fill="#1a5b66"/>

      <text x="1320" y="780" font-family="'Noto Serif JP'" font-size="20" fill="#2c2c2c" font-weight="bold">今すぐ始めるべき3つの理由 🚀</text>
      <rect x="1320" y="800" width="540" height="150" fill="#f4f1ea" stroke="#653a5e" stroke-width="2" stroke-dasharray="5,5"/>
      <text x="1335" y="830" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">① <tspan font-weight="bold" fill="#b3322b">時間の節約</tspan>: 最初から効率的な使い方ができる</text>
      <text x="1350" y="855" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">→試行錯誤の時間を大幅カット！</text>

      <text x="1335" y="885" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">② <tspan font-weight="bold" fill="#1a5b66">正しい習慣</tspan>: 最初から良い使い方を身につける</text>
      <text x="1350" y="910" font-family="'Noto Sans JP'" font-size="13" fill="#2c2c2c">→後から修正するより効率的！</text>

      <text x="1335" y="940" font-family="'Noto Sans JP'" font-size="14" fill="#2c2c2c">③ <tspan font-weight="bold" fill="#653a5e">成長速度</tspan>: 基礎があれば応用は簡単！</text>
    </svg>
    ```

    ### ## プレゼン用トークスクリプト（各カラム1分、計3分）

    ### カラム1：システムプロンプトの基本概念（1分）

    「皆さん、こんにちは。今日はAI活用の基礎中の基礎、『システムプロンプト』についてお話しします。

    システムプロンプトとは、簡単に言えば『AIに与える基本的な指示書』です。レストランで例えるなら、シェフへの調理方針のようなもの。『和食専門で』『薄味で』といった基本方針があれば、お客様が『今日のおすすめは？』と聞いても、自然と和食の薄味料理が出てきますよね。

    AIも同じです。システムプロンプトで『あなたは初心者向けのプログラミング講師です』と設定すれば、難しい専門用語を避けて、分かりやすい説明をしてくれるようになります。これがAIとの対話の土台となる、とても重要な設定なんです。」

    ### カラム2：初心者にこそ重要な理由（1分）

    「では、なぜ初心者の方にこそシステムプロンプトが重要なのでしょうか？

    システムプロンプトなしでAIを使うと、何度もやり取りが必要になります。『Pythonのコード書いて』→『どんなコードですか？』→『ファイル読み込み』→『CSVですか？JSONですか？』...といった具合に。でも最初から『初心者向けPython講師』と設定しておけば、一発で適切な回答が得られます。

    初心者の方が得られるメリットは5つ。時間短縮、的確な回答、学習効率UP、ミス防止、そして再現性です。特に『あなたはプログラミング初心者向けの講師です。専門用語は必ず日本語で説明し...』といった設定をするだけで、学習体験が激変します。これは本当に大きな違いですよ。」

    ### カラム3：基礎から学ぶ理由と成長戦略（1分）

    「最後に、なぜ『レベルが高くなってから』ではダメなのか。これは建築に例えると分かりやすいです。基礎工事なしで建物を建てたら、どんなに立派に見えても崩れやすい。でも、しっかりした基礎があれば、その上にどんどん積み上げていけます。

    AI活用も同じで、基礎理解→実践活用→応用展開→創造的活用という段階を踏むことが大切です。今すぐ始めるべき理由は3つ。第一に時間の節約、試行錯誤の時間を大幅カットできます。第二に正しい習慣、最初から良い使い方を身につけられます。そして第三に成長速度、基礎があれば応用は簡単になります。

    さあ、今日からシステムプロンプトを使って、効率的なAI活用を始めてみませんか？」

    ## インフォグラフィック用画像生成AIプロンプト

    ```
    Modern Japanese infographic style, AI and human interaction diagram, minimalist geometric shapes, traditional Japanese color palette with black ink and vermillion accents, clean vector illustration, educational poster design, system prompt concept visualization, chat interface metaphor, 1920s Taisho era aesthetic influence

    ```

    ```
    Step-by-step growth illustration, ascending staircase design, Japanese modernist architecture style, foundation building metaphor, geometric progression visualization, muted earth tones with accent colors, clean lines and shapes, educational infographic poster, beginner to expert journey, minimalist Japanese design elements

    ```

    ```
    Before and after comparison infographic, split screen design, problem-solution visualization, Japanese minimalist style, conversation flow diagram, efficiency improvement metrics, clean typography with Japanese influence, modern educational poster aesthetic, time-saving concept illustration, professional training material design

    ```

    勝さん、いかがでしょうか？システムプロンプトは本当に基礎中の基礎ですが、これを理解しているかどうかで、AI活用の効率が全然違ってきますよ。特に初心者の方こそ、最初からしっかり理解しておくことで、後々の成長スピードが格段に上がります。建物の基礎工事と同じで、見えない部分だけど一番大事なんですよね！😊


### ✅AIの性能・個性で出力は変わることを知る

<aside>
💡

日立システムズを調べて、SVGのプレゼン資料にしてください

</aside>

↓AI回答：

![image.png](attachment:bb757691-1c9d-400b-8e58-986e28af2bdd:image.png)

※Gemini 2.5 Pro 0605での出力

### **プレゼン用のトークスクリプト**

皆さま、本日はお集まりいただき、誠にありがとうございます。ただ今より、日立グループの情報通信分野を担う中核企業、「株式会社日立システムズ」についてご紹介申し上げます。

（スライド１枚目表示）

まず、こちらのスライドをご覧ください。日立システムズは、1962年の設立以来、日本のIT業界を牽引してまいりました。左手の「会社概要」にございます通り、システムインテグレーションを主軸に事業を展開しております。中央の「業績と規模」が示すように、2021年3月期には連結売上高5,236億円を達成し、約1万9千名の従業員と共に成長を続けております。そして右手には、2011年に2社が合併し現在の形となって以降の、力強い歩みを示しました。

- **長くなるのでトゴルに入れておきます**

    承知いたしました。ご指定の通り、日立システムズに関する情報を基に、明治・昭和モダンテイストのSVGスライドを生成します。

    まず、ファイルを保存するためのフォルダを作成します。

    フォルダの準備が整いました。
    これから、ご依頼いただいた表紙1枚、スライド3枚を順次生成します。

    ---

    ### **【表紙】株式会社日立システムズ**

    これはプレゼンテーションの顔となる表紙です。社名を力強く、かつ品格あるデザインで表現しました。

    ```
    <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="<http://www.w3.org/2000/svg>">
      <!--
        Title: 日立システムズ 表紙
        Author: @jrpj2010's Prompt
        Description: 明治・昭和モダンテイストの表紙スライド
      -->
      <defs>
        <style>
          @import url('<https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&display=swap>');
        </style>
      </defs>

      <!-- 背景 -->
      <rect width="1600" height="900" fill="#f4f1ea" />

      <!-- 装飾線（上） -->
      <line x1="400" y1="250" x2="1200" y2="250" stroke="#2c2c2c" stroke-width="2" />
      <circle cx="800" cy="250" r="8" fill="#b3322b" />

      <!-- メインタイトル -->
      <text x="800" y="450" font-family="'Noto Serif JP', serif" font-size="80" fill="#2c2c2c" text-anchor="middle" letter-spacing="10">
        株式会社日立システムズ
      </text>

      <!-- サブタイトル -->
      <text x="800" y="530" font-family="'Noto Serif JP', serif" font-size="28" fill="#2c2c2c" text-anchor="middle" letter-spacing="5">
        日立グループ情報通信分野の中核
      </text>

      <!-- 装飾線（下） -->
      <line x1="400" y1="650" x2="1200" y2="650" stroke="#2c2c2c" stroke-width="2" />
      <circle cx="800" cy="650" r="8" fill="#b3322b" />

      <!-- フッター -->
      <text x="800" y="850" font-family="'Noto Serif JP', serif" font-size="16" fill="#653a5e" text-anchor="middle" letter-spacing="2">
        Hitachi Systems, Ltd.
      </text>
    </svg>

    ```

    ---

    ### **スライド1/3：企業概要と沿革**

    会社の基本情報、財務状況、そして設立からの歩みを一枚にまとめました。

    ```
    <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="<http://www.w3.org/2000/svg>">
      <!--
        Title: スライド1 - 企業概要と沿革
        Author: @jrpj2010's Prompt
        Description: 明治・昭和モダンテイストの3カラムスライド
      -->
      <defs>
        <style>
          @import url('<https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@600&display=swap>');
          .title { font-family: 'Noto Serif JP', serif; font-size: 24px; font-weight: 600; letter-spacing: 2px; }
          .subtitle { font-family: 'Noto Sans JP', sans-serif; font-size: 14px; letter-spacing: 1px; }
          .body { font-family: 'Noto Sans JP', sans-serif; font-size: 13px; letter-spacing: 0.5px; }
          .label { font-family: 'Noto Sans JP', sans-serif; font-size: 11px; }
          .data-val { font-family: 'Noto Sans JP', sans-serif; font-weight: 700; font-size: 32px; }
          .data-unit { font-family: 'Noto Sans JP', sans-serif; font-size: 14px; }
        </style>
      </defs>

      <!-- 背景 -->
      <rect width="1600" height="900" fill="#f4f1ea"/>

      <!-- ヘッダー -->
      <text x="50" y="60" font-family="'Noto Serif JP', serif" font-size="32" fill="#2c2c2c" letter-spacing="3">企業概要と沿革</text>
      <line x1="50" y1="75" x2="400" y2="75" stroke="#2c2c2c" stroke-width="2"/>
      <circle cx="410" cy="75" r="5" fill="#2c2c2c"/>

      <!-- カラム1: 会社概要 -->
      <rect x="50" y="120" width="480" height="730" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="70" y="160" class="title" fill="#b3322b">🏢 会社概要</text>
      <line x1="70" y1="170" x2="220" y2="170" stroke="#b3322b" stroke-width="1.5"/>
      <text x="70" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ 基本情報</text>
      <text x="90" y="240" class="body" fill="#2c2c2c">・社名: 株式会社日立システムズ</text>
      <text x="90" y="265" class="body" fill="#2c2c2c">・設立: 1962年10月1日</text>
      <text x="90" y="290" class="body" fill="#2c2c2c">・本社: 東京都品川区大崎1-2-1</text>
      <text x="70" y="340" class="subtitle" font-weight="700" fill="#2c2c2c">■ 事業内容</text>
      <text x="90" y="370" class="body" fill="#2c2c2c">・システムインテグレーション事業</text>
      <text x="90" y="395" class="body" fill="#2c2c2c">・情報処理機器販売事業</text>
      <text x="90" y="420" class="body" fill="#2c2c2c">・ネットワークサービス事業</text>

      <rect x="70" y="470" width="440" height="150" fill="#fefcf7" stroke="#b3322b" stroke-width="1" stroke-dasharray="4"/>
      <text x="90" y="500" class="subtitle" font-weight="700" fill="#2c2c2c">理念: 事業ブランド「Human*IT」</text>
      <text x="90" y="530" class="body" fill="#2c2c2c" dy="0">ITライフサイクルの全領域をカバーする</text>
      <text x="90" y="530" class="body" fill="#2c2c2c" dy="20">ワンストップサービスを提供。</text>
      <text x="90" y="530" class="body" fill="#2c2c2c" dy="40">システムの導入コンサルティングから</text>
      <text x="90" y="530" class="body" fill="#2c2c2c" dy="60">設計・構築、導入までを支援する。</text>

      <!-- カラム2: 業績と規模 -->
      <rect x="560" y="120" width="480" height="730" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2"/>
      <text x="580" y="160" class="title" fill="#1a5b66">📈 業績と規模</text>
      <line x1="580" y1="170" x2="730" y2="170" stroke="#1a5b66" stroke-width="1.5"/>
      <text x="580" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ 2021年3月期 連結業績</text>
      <text x="600" y="250" class="label" fill="#2c2c2c">売上高</text>
      <rect x="600" y="260" width="420" height="40" fill="#e0e8e9"/>
      <rect x="600" y="260" width="420" height="40" fill="#1a5b66"/>
      <text x="1010" y="285" class="data-val" fill="#f4f1ea" text-anchor="end">5,236</text>
      <text x="1010" y="285" class="data-unit" fill="#f4f1ea" dx="5">億円</text>
      <text x="600" y="325" class="label" fill="#2c2c2c">営業利益</text>
      <rect x="600" y="335" width="420" height="40" fill="#e0e8e9"/>
      <rect x="600" y="335" width="300" height="40" fill="#1a5b66"/>
      <text x="900" y="360" class="data-val" fill="#f4f1ea" text-anchor="end">582</text>
      <text x="900" y="360" class="data-unit" fill="#f4f1ea" dx="5">億円</text>

      <text x="580" y="430" class="subtitle" font-weight="700" fill="#2c2c2c">■ 従業員数 (2021.3.31現在)</text>
      <rect x="580" y="460" width="220" height="150" fill="#e0e8e9" />
      <text x="690" y="490" text-anchor="middle" class="label" fill="#1a5b66">連結</text>
      <text x="690" y="540" text-anchor="middle" class="data-val" fill="#1a5b66">18,808</text>
      <text x="690" y="570" text-anchor="middle" class="data-unit" fill="#1a5b66">名</text>

      <rect x="820" y="460" width="220" height="150" fill="#fefcf7" stroke="#1a5b66" stroke-width="1" />
      <text x="930" y="490" text-anchor="middle" class="label" fill="#2c2c2c">単体</text>
      <text x="930" y="540" text-anchor="middle" class="data-val" fill="#2c2c2c">9,907</text>
      <text x="930" y="570" text-anchor="middle" class="data-unit" fill="#2c2c2c">名</text>

      <!-- カラム3: 沿革 -->
      <rect x="1070" y="120" width="480" height="730" fill="#f4f1ea" stroke="#653a5e" stroke-width="2"/>
      <text x="1090" y="160" class="title" fill="#653a5e">📜 発足と展開</text>
      <line x1="1090" y1="170" x2="1240" y2="170" stroke="#653a5e" stroke-width="1.5"/>
      <path d="M 1130 220 V 780" stroke="#653a5e" stroke-width="1.5" fill="none"/>

      <circle cx="1130" cy="250" r="8" fill="#653a5e"/>
      <text x="1150" y="240" class="subtitle" font-weight="700" fill="#2c2c2c">2011年 10月</text>
      <text x="1150" y="270" class="body" fill="#2c2c2c">日立電子サービスと日立情報システムズが</text>
      <text x="1150" y="290" class="body" fill="#2c2c2c">対等合併し、<tspan font-weight="700" fill="#653a5e">日立システムズ発足</tspan>。</text>

      <circle cx="1130" cy="380" r="8" fill="#653a5e"/>
      <text x="1150" y="370" class="subtitle" font-weight="700" fill="#2c2c2c">2012年 10月</text>
      <text x="1150" y="400" class="body" fill="#2c2c2c">福島県郡山市にコンタクトセンター開設。</text>

      <circle cx="1130" cy="490" r="8" fill="#653a5e"/>
      <text x="1150" y="480" class="subtitle" font-weight="700" fill="#2c2c2c">2013年 7月</text>
      <text x="1150" y="510" class="body" fill="#2c2c2c">仙台市青年文化センターの命名権を取得。</text>
      <text x="1150" y="530" class="body" fill="#2c2c2c">（日立システムズホール仙台）</text>

      <circle cx="1130" cy="620" r="8" fill="#653a5e"/>
      <text x="1150" y="610" class="subtitle" font-weight="700" fill="#2c2c2c">2014年 7月</text>
      <text x="1150" y="640" class="body" fill="#2c2c2c">日立系統(広州)有限公司上海分公司を設立。</text>
      <text x="1150" y="660" class="body" fill="#2c2c2c"><tspan font-weight="700">グローバルソリューション</tspan>の本格展開。</text>

      <!-- Footer -->
      <text x="1550" y="870" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="end">1</text>
    </svg>

    ```

    ---

    ### **スライド2/3：事業内容とソリューション**

    同社が展開する多岐にわたる事業と、それを支える具体的なサービス・ソリューションを図解しました。

    ```
    <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="<http://www.w3.org/2000/svg>">
      <!--
        Title: スライド2 - 事業内容とソリューション
        Author: @jrpj2010's Prompt
        Description: 明治・昭和モダンテイストの3カラムスライド
      -->
      <defs>
        <style>
          @import url('<https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@600&display=swap>');
          .title { font-family: 'Noto Serif JP', serif; font-size: 24px; font-weight: 600; letter-spacing: 2px; }
          .subtitle { font-family: 'Noto Sans JP', sans-serif; font-size: 14px; letter-spacing: 1px; }
          .body { font-family: 'Noto Sans JP', sans-serif; font-size: 13px; letter-spacing: 0.5px; }
          .tag { font-family: 'Noto Sans JP', sans-serif; font-size: 11px; font-weight: 700; }
        </style>
      </defs>

      <!-- 背景 -->
      <rect width="1600" height="900" fill="#f4f1ea"/>

      <!-- ヘッダー -->
      <text x="50" y="60" font-family="'Noto Serif JP', serif" font-size="32" fill="#2c2c2c" letter-spacing="3">事業内容とソリューション</text>
      <line x1="50" y1="75" x2="520" y2="75" stroke="#2c2c2c" stroke-width="2"/>
      <circle cx="530" cy="75" r="5" fill="#2c2c2c"/>

      <!-- カラム1: 主要事業 -->
      <rect x="50" y="120" width="480" height="730" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="70" y="160" class="title" fill="#b3322b">🔧 主要事業の四本柱</text>
      <line x1="70" y1="170" x2="300" y2="170" stroke="#b3322b" stroke-width="1.5"/>

      <rect x="70" y="200" width="440" height="120" fill="#fefcf7"/>
      <text x="130" y="265" font-size="40" text-anchor="middle">⚙️</text>
      <text x="290" y="240" class="subtitle" font-weight="700">システム構築事業</text>
      <text x="290" y="270" class="body">顧客の課題解決に向けた</text>
      <text x="290" y="290" class="body">情報システムの企画・設計・開発</text>

      <rect x="70" y="340" width="440" height="120" fill="#fefcf7"/>
      <text x="130" y="405" font-size="40" text-anchor="middle">📡</text>
      <text x="290" y="380" class="subtitle" font-weight="700">システム運用・監視・保守事業</text>
      <text x="290" y="410" class="body">24時間365日体制での安定稼働支援</text>
      <text x="290" y="430" class="body">ITインフラの根幹を支える</text>

      <rect x="70" y="480" width="440" height="120" fill="#fefcf7"/>
      <text x="130" y="545" font-size="40" text-anchor="middle">🌐</text>
      <text x="290" y="520" class="subtitle" font-weight="700">ネットワークサービス事業</text>
      <text x="290" y="550" class="body">セキュアで高品質な</text>
      <text x="290" y="570" class="body">ネットワーク環境を提供</text>

      <rect x="70" y="620" width="440" height="120" fill="#fefcf7"/>
      <text x="130" y="685" font-size="40" text-anchor="middle">📦</text>
      <text x="290" y="660" class="subtitle" font-weight="700">情報関連機器・ソフトウェア販売</text>
      <text x="290" y="690" class="body">マルチベンダー対応の機器調達</text>
      <text x="290" y="710" class="body">ソフトウェア開発も手掛ける</text>

      <!-- カラム2: 主要サービス -->
      <rect x="560" y="120" width="480" height="730" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2"/>
      <text x="580" y="160" class="title" fill="#1a5b66">☁️ 多様な提供サービス</text>
      <line x1="580" y1="170" x2="810" y2="170" stroke="#1a5b66" stroke-width="1.5"/>
      <text x="580" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ クラウドからBPOまで包括的に支援</text>

      <text x="600" y="260" class="body" font-weight="700" fill="#1a5b66">・クラウドサービス</text>
      <text x="620" y="285" class="body">企業のDX推進を支える基盤を提供</text>

      <text x="600" y="335" class="body" font-weight="700" fill="#1a5b66">・ビジネスサービス</text>
      <text x="620" y="360" class="body">業務プロセスを効率化する各種サービス</text>

      <text x="600" y="410" class="body" font-weight="700" fill="#1a5b66">・マネージドサービス</text>
      <text x="620" y="435" class="body">システムの企画から運用までをトータルで管理</text>

      <rect x="580" y="480" width="440" height="200" fill="#e0e8e9"/>
      <text x="600" y="510" class="subtitle" font-weight="700" fill="#1a5b66">■ 顧客接点とITインフラの核心</text>
      <text x="600" y="550" class="body" font-weight="700" fill="#2c2c2c">・BPO / コンタクトセンター</text>
      <text x="620" y="575" class="body" fill="#2c2c2c">専門知識を持つ人材が業務を代行</text>
      <text x="600" y="625" class="body" font-weight="700" fill="#2c2c2c">・データセンターサービス</text>
      <text x="620" y="650" class="body" fill="#2c2c2c">堅牢なファシリティで情報を守る</text>

      <!-- カラム3: 業種別ソリューション -->
      <rect x="1070" y="120" width="480" height="730" fill="#f4f1ea" stroke="#653a5e" stroke-width="2"/>
      <text x="1090" y="160" class="title" fill="#653a5e">🏦 専門領域ソリューション</text>
      <line x1="1090" y1="170" x2="1390" y2="170" stroke="#653a5e" stroke-width="1.5"/>

      <text x="1090" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ 公共・社会関連</text>
      <rect x="1110" y="235" width="100" height="25" fill="#653a5e"/>
      <text x="1160" y="253" class="tag" fill="#f4f1ea" text-anchor="middle">CYDEEN</text>
      <text x="1230" y="252" class="body">公共事業のライフサイクルをトータルサポート</text>
      <rect x="1110" y="280" width="100" height="25" fill="#653a5e"/>
      <text x="1160" y="298" class="tag" fill="#f4f1ea" text-anchor="middle">ADWORLD</text>
      <text x="1230" y="297" class="body">全国の自治体で導入実績のあるソリューション</text>

      <text x="1090" y="360" class="subtitle" font-weight="700" fill="#2c2c2c">■ 介護・福祉関連</text>
      <rect x="1110" y="385" width="100" height="25" fill="#653a5e"/>
      <text x="1160" y="403" class="tag" fill="#f4f1ea" text-anchor="middle">福祉の森</text>
      <text x="1230" y="402" class="body">介護・福祉事業者向け業務管理システム</text>

      <text x="1090" y="460" class="subtitle" font-weight="700" fill="#2c2c2c">■ 金融関連</text>
      <rect x="1110" y="485" width="100" height="25" fill="#653a5e"/>
      <text x="1160" y="503" class="tag" fill="#f4f1ea" text-anchor="middle">Finnova</text>
      <text x="1230" y="502" class="body">銀行、証券、保険など業種別に体系化</text>

      <text x="1090" y="560" class="subtitle" font-weight="700" fill="#2c2c2c">■ 製造・流通関連</text>
      <rect x="1110" y="585" width="100" height="25" fill="#653a5e"/>
      <text x="1160" y="603" class="tag" fill="#f4f1ea" text-anchor="middle">FutureStage</text>
      <text x="1230" y="602" class="body">製造・流通業向け基幹業務ソリューション</text>
      <rect x="1110" y="630" width="100" height="25" fill="#653a5e"/>
      <text x="1160" y="648" class="tag" fill="#f4f1ea" text-anchor="middle">REDISuite</text>
      <text x="1230" y="647" class="body">流通BMS対応EDIソリューション</text>

      <!-- Footer -->
      <text x="1550" y="870" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="end">2</text>
    </svg>

    ```

    ---

    ### **スライド3/3：グローバル拠点とグループ企業**

    日本国内から世界へ広がる拠点網と、連携して価値を創造するグループ会社の体制を可視化しました。

    ```
    <svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="<http://www.w3.org/2000/svg>">
      <!--
        Title: スライド3 - グローバル拠点とグループ企業
        Author: @jrpj2010's Prompt
        Description: 明治・昭和モダンテイストの3カラムスライド
      -->
      <defs>
        <style>
          @import url('<https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@600&display=swap>');
          .title { font-family: 'Noto Serif JP', serif; font-size: 24px; font-weight: 600; letter-spacing: 2px; }
          .subtitle { font-family: 'Noto Sans JP', sans-serif; font-size: 14px; letter-spacing: 1px; }
          .body { font-family: 'Noto Sans JP', sans-serif; font-size: 13px; letter-spacing: 0.5px; }
          .map-label { font-family: 'Noto Sans JP', sans-serif; font-size: 12px; font-weight: 700; }
        </style>
      </defs>

      <!-- 背景 -->
      <rect width="1600" height="900" fill="#f4f1ea"/>

      <!-- ヘッダー -->
      <text x="50" y="60" font-family="'Noto Serif JP', serif" font-size="32" fill="#2c2c2c" letter-spacing="3">グローバル拠点とグループ企業</text>
      <line x1="50" y1="75" x2="620" y2="75" stroke="#2c2c2c" stroke-width="2"/>
      <circle cx="630" cy="75" r="5" fill="#2c2c2c"/>

      <!-- カラム1: 国内拠点 -->
      <rect x="50" y="120" width="480" height="730" fill="#f4f1ea" stroke="#b3322b" stroke-width="2"/>
      <text x="70" y="160" class="title" fill="#b3322b">🗾 日本の拠点網</text>
      <line x1="70" y1="170" x2="270" y2="170" stroke="#b3322b" stroke-width="1.5"/>
      <text x="70" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ 本社及び主要支社</text>
      <text x="90" y="240" class="body">・本社(東京・大崎)</text>
      <text x="90" y="265" class="body">・東北支社</text>
      <text x="90" y="290" class="body">・関東甲信越支社</text>
      <text x="90" y="315" class="body">・中部支社</text>
      <text x="90" y="340" class="body">・関西支社</text>
      <text x="90" y="365" class="body">・中国支社</text>
      <text x="90" y="390" class="body">・九州(福岡)</text>

      <path d="M350 450 Q400 500 380 550 T350 650 Q340 700 380 750 Q420 800 400 830" stroke="#b3322b" stroke-width="1" fill="none" opacity="0.5"/>
      <path d="M350 450 L340 480 L350 510 L340 540 L350 570 L340 600 L350 630 L340 660 L350 690" stroke="#b3322b" stroke-width="1" fill="none" opacity="0.5"/>
      <circle cx="380" cy="480" r="5" fill="#b3322b"/><text x="390" y="484" class="map-label" fill="#b3322b">東北</text>
      <circle cx="400" cy="550" r="7" fill="#b3322b"/><text x="410" y="554" class="map-label" fill="#b3322b">東京本社</text>
      <circle cx="380" cy="620" r="5" fill="#b3322b"/><text x="390" y="624" class="map-label" fill="#b3322b">関西</text>
      <circle cx="350" cy="720" r="5" fill="#b3322b"/><text x="360" y="724" class="map-label" fill="#b3322b">九州</text>

      <!-- カラム2: 海外拠点 -->
      <rect x="560" y="120" width="480" height="730" fill="#f4f1ea" stroke="#1a5b66" stroke-width="2"/>
      <text x="580" y="160" class="title" fill="#1a5b66">🌏 世界への展開</text>
      <line x1="580" y1="170" x2="780" y2="170" stroke="#1a5b66" stroke-width="1.5"/>
      <text x="580" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ 米州・欧州</text>
      <text x="600" y="240" class="body">・米国 (サンディエゴ, サンタクララ)</text>
      <text x="600" y="265" class="body">・英国 (ロンドン)</text>
      <text x="600" y="290" class="body">・カナダ (モントリオール)</text>
      <text x="580" y="340" class="subtitle" font-weight="700" fill="#2c2c2c">■ アジア・オセアニア</text>
      <text x="600" y="370" class="body">・中国 (北京, 上海, 広州 他)</text>
      <text x="600" y="395" class="body">・シンガポール</text>
      <text x="600" y="420" class="body">・タイ (バンコク)</text>
      <text x="600" y="445" class="body">・インド (デリー)</text>
      <text x="600" y="470" class="body">・オーストラリア (シドニー)</text>
      <path d="M680 550 C 750 500, 950 500, 1000 600 S 900 750, 800 800 S 650 700, 680 650 Z" fill="#e0e8e9" opacity="0.7"/>
      <circle cx="700" cy="580" r="6" fill="#1a5b66"/><text x="710" y="584" class="map-label" fill="#1a5b66">米州</text>
      <circle cx="780" cy="560" r="6" fill="#1a5b66"/><text x="790" y="564" class="map-label" fill="#1a5b66">欧州</text>
      <circle cx="950" cy="680" r="8" fill="#1a5b66"/><text x="960" y="684" class="map-label" fill="#1a5b66">アジア</text>
      <circle cx="980" cy="750" r="5" fill="#1a5b66"/><text x="940" y="754" class="map-label" fill="#1a5b66">豪州</text>

      <!-- カラム3: グループ企業 -->
      <rect x="1070" y="120" width="480" height="730" fill="#f4f1ea" stroke="#653a5e" stroke-width="2"/>
      <text x="1090" y="160" class="title" fill="#653a5e">🤝 連携する力</text>
      <line x1="1090" y1="170" x2="1290" y2="170" stroke="#653a5e" stroke-width="1.5"/>
      <text x="1090" y="210" class="subtitle" font-weight="700" fill="#2c2c2c">■ 主な国内グループ会社</text>
      <rect x="1090" y="235" width="440" height="200" fill="#faf8f5"/>
      <path d="M1150 255 V 415" stroke="#653a5e" stroke-width="1"/>
      <text x="1170" y="265" class="body">・(株)北海道日立システムズ</text>
      <text x="1170" y="295" class="body">・(株)九州日立システムズ</text>
      <text x="1170" y="325" class="body">・(株)日立システムズエンジニアリングサービス</text>
      <text x="1170" y="355" class="body">・(株)日立システムズフィールドサービス</text>
      <text x="1170" y="385" class="body">・(株)日立システムズパワーサービス</text>

      <text x="1090" y="470" class="subtitle" font-weight="700" fill="#2c2c2c">■ 主な海外グループ会社</text>
      <rect x="1090" y="495" width="440" height="250" fill="#faf8f5"/>
      <path d="M1150 515 V 725" stroke="#653a5e" stroke-width="1"/>
      <text x="1170" y="525" class="body" fill="#2c2c2c">・Cumulus Systems Inc. (米)</text>
      <text x="1170" y="555" class="body" fill="#2c2c2c">・Hitachi Sunway Information Systems (東南アジア)</text>
      <text x="1170" y="585" class="body" fill="#2c2c2c">・Hitachi Systems Vietnam Company Ltd. (越)</text>
      <text x="1170" y="615" class="body" fill="#2c2c2c">・Hitachi Systems Micro Clinic Pvt. Ltd. (印)</text>
      <text x="1170" y="645" class="body" fill="#2c2c2c">・日立系統(広州)有限公司 (中)</text>
      <text x="1170" y="675" class="body" fill="#2c2c2c">・Hitachi Systems CBT S.p.A. (伊)</text>

      <!-- Footer -->
      <text x="1550" y="870" font-family="'Noto Sans JP', sans-serif" font-size="16" fill="#2c2c2c" text-anchor="end">3</text>
    </svg>

    ```

    ---

    ### **プレゼン用のトークスクリプト**

    皆さま、本日はお集まりいただき、誠にありがとうございます。ただ今より、日立グループの情報通信分野を担う中核企業、「株式会社日立システムズ」についてご紹介申し上げます。

    （スライド１枚目表示）
    まず、こちらのスライドをご覧ください。日立システムズは、1962年の設立以来、日本のIT業界を牽引してまいりました。左手の「会社概要」にございます通り、システムインテグレーションを主軸に事業を展開しております。中央の「業績と規模」が示すように、2021年3月期には連結売上高5,236億円を達成し、約1万9千名の従業員と共に成長を続けております。そして右手には、2011年に2社が合併し現在の形となって以降の、力強い歩みを示しました。

    （スライド２枚目表示）
    続きまして、具体的な事業内容でございます。左に掲げた「四本柱」、すなわちシステム構築から運用保守、ネットワーク、機器販売まで、ITライフサイクルの全てを網羅しております。中央の「多様な提供サービス」は、クラウドやBPOなど、お客様のビジネスを多角的に支援する体制を表しております。そして右手の「専門領域ソリューション」では、公共、金融、製造・流通といった各業種に特化した、高度な解決策をご提供していることをお示ししました。

    （スライド３枚目表示）
    最後に、同社の広範なネットワークについてご説明します。左の地図は、本社を中心に全国を網羅する「国内拠点網」です。これにより、地域に密着したサービスが可能となっております。中央は、米州、欧州、そしてアジアへと広がる「世界への展開」です。そして右側には、国内外の「グループ企業」が連携し、総合力を高めている様子をご覧いただけます。

    以上、駆け足ではございましたが、日立システムズの概要、事業、そしてグローバルな展開力についてご説明いたしました。ご清聴いただき、誠にありがとうございました。

    ---

    ### **インフォグラフィックな挿絵用の画像生成AI向けプロンプト**

    ```
    A minimalist infographic of a Japanese company profile, Showa Modernism style, using only #2c2c2c, #f4f1ea, and #b3322b, geometric shapes, clean lines, elegant Japanese typography, high information density.

    ```

    ```
    An abstract data visualization chart with a retro Japanese aesthetic, depicting corporate financial growth, using bar graphs and icons with #1a5b66 as the accent color, Noto Sans font for labels, on a #f4f1ea background, evoking a sense of reliability and precision.

    ```

    ```
    A stylish world map infographic showing global business locations, Meiji Roman style with a modern twist, using #653a5e for location markers and connection lines, on a cream canvas #f4f1ea, with subtle textures and classic Serif typography.

    ```


### ✅Figmaで編集

![image.png](attachment:abab64ea-800a-43d2-9242-3461e7b57e6d:image.png)

左側のレイヤー構造で、オブジェクトの配置関係

右側のパラメーター関連で、オブジェクトの細かい調整が可能

基本的に変更したいところをダブルクリックで編集が可能な状況になることを理解できればOK

### ✅Figma Slide → .pptx変換可能

![image.png](attachment:29d6323d-fc0e-4b07-8ef1-5cefcb8d4acd:image.png)

ホームから[スライド]を選択

デザイン領域でコピーしたスライド画像を

[スライド]側にコピペして、インポート

![image.png](attachment:4282fb3d-7d69-49d3-ac98-7cae6e0810b8:image.png)

Figma Slideに入れば

- [.pptx]に変更可能

↓

↓　**ダウンロードサンプル**

↓

[日立システムズ.pptx](attachment:3dd18e34-fbed-42a1-b1a9-16e9be7ff1eb:日立システムズ.pptx)

ここまでが[初級編]です。

よろしいでしょうか？

フォーマットを独自で変更し

システムプロンプトの制御方法をマスターしたら

この先、すべての作業は[AI エージェント]が全自動で作業してくれる未来になります。

ついていける方のみ続きをどうぞ！

↓

↓　こちらから本編に戻る

↓

---

# ✅[中級編]はここから

本稿では、少しレベルの高い内容ではありますが、できるだけかみ砕いて説明します。しかも SVG や VScode、Claude , Figma といったツールを組み合わせることで「まるでコンサルが作ったような重厚感あるスライド」がサクサク自動生成される流れが実現できます。

ぜひ最後まで読んでいただき、あなたのプレゼン資料作成に活かしていただければ嬉しいです。

- 講習動画 25分弱

https://youtu.be/hkYlyyiHZFU

### **講習全体MAP**

**まさに今回の技で生成されたスライドです**

![image.png](attachment:62396590-8111-4aa7-988f-e8a82db142f2:image.png)

![image.png](attachment:4f7cb332-5f83-4894-94a8-be6ebf94bc2f:image.png)

![image.png](attachment:b4dacc6f-5e6a-4819-86eb-5a9cbe6ffd3a:image.png)

![image.png](attachment:d2f6d708-e397-431d-bcd3-54b43519dacd:image.png)

![image.png](attachment:e9d46186-0d97-4a7f-9181-e527805f503a:image.png)

ドクセルでまとめて見れます

https://www.docswell.com/s/jrpj2010/ZEX7X6-2025-03-30-003344

Figma-Slide経由で生成された .pptx もサンプルで参照ください。

↓

[次世代SVGプレゼン講座.pptx](attachment:749d5baf-e641-4f5a-879d-f6e98b2db800:次世代SVGプレゼン講座.pptx)

↑

ここからダウンロード

それでは詳細な

- **詳細ステップガイドわたしの設定プロンプト**

とさせていただきます！

---

# **■ 全工程は何ステップあるの？**

今回ご紹介する流れは、以下の**13ステップ**で進めます。

![image.png](attachment:9691e2a9-bf0a-4fdb-a400-2c7607733b1a:image.png)

1. **本日のゴールイメージを把握する**
2. **AIエディター「VScode」の導入と準備**
3. **プロジェクトフォルダの作成と構成を理解する**
4. **「Project Rules」機能でSVG生成用ルールを設定する**
5. **AIエンジンを選定（Gemini / Claude など）**
6. **文字起こしデータなど元情報をインプットする**
7. **エージェントモードで複数スライドを自動生成する（Cursor × Gemini / Claude）**
8. **生成されたSVGスライドをプレビューする**
9. **SVGファイルの中身（コード）をざっくり理解する**
10. **FigmaにSVGを読み込む（ドラッグ＆ドロップ or コピペ）**
11. **Figmaでスライドを調整・編集する（ロック・アンロック・配置調整）**
12. **Figmaのプレゼンテーションモードで確認する**
13. **まとめと発展応用（YouTube URL利用、さらなるカスタマイズ など）**

1ステップずつ、講師役として丁寧に解説していきますよ。

---

# **1. 本日のゴールイメージを把握する**

![image.png](attachment:5475d259-2c3c-40fb-8507-c67f6577d015:image.png)

まず、今回のゴールは「**自動生成されるSVGスライドを使って、高品質なプレゼン資料を完成させる**」ということです。具体的には:

- **テキスト情報（文字起こしデータやYouTube講演の内容など）** をAIが自動で構造化
- **SVG形式のスライド** を複数枚、一気に生成
- **Figmaで仕上げ編集** し、プレゼンテーションモードで確認

最終的には「短時間で“映えるスライド”を作れる」状態を目指します。ここではインフォグラフィック風、コンサル風など多彩なデザインをAIで半自動生成できる利点があります。

---

# **2. AIエディター「VScode」の導入と準備**

![image.png](attachment:1eb35699-74ea-4623-941a-7e93258efade:image.png)

![image.png](attachment:f6eb6d2a-5898-498a-bd79-1d01baf6253f:image.png)

[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code)

● VSCode(Visual Studio Code)とは？
近年、VibeCoding という概念と共に注目されている「AI搭載エディター」(IDE) の一種。

WindSurf や Cursor などと並び、最古参の元祖IDEとして人気で、最近のAI化の波を受け、Microsoft支援の元、Github Copilot Agent が連携する事でAIエディターとして変貌。

ChatGPTライクな会話UIやエージェント機能が使えるのが特徴。

本講座では、この VScode を使って「AIに指示 → 自動的にSVGスライドを作る」という流れを体験します。

● VSCodeを導入
公式サイトからアプリをダウンロード＆インストール(無料でDLし、有償版の契約がサブスクでありますが、高度なAI機能をフルに使うには有償プランが便利）。

※お客様によっては既にエンタープライズ版など、ご利用いただける環境にあるかもしれません。各社様で情シス様経由でご確認願います。

インストール後、初回起動時に[Github Copilot Agent]契約があれば標準で各種AIがお使いいただけます。それらの契約がない場合は、拡張機能により[RooCode][CLIINE]などの補助アプリ経由で

OpenAI APIキー やAnthropic APIキー (Claudeを使う場合) のセットアップが求められることがあります。[有償化してれば Claude 4.0 Soneet thinking MAXも、Gemini 2.5 pro thinking MAXも使えます！）

セットアップが終われば、VScodeのメイン右側の画面に「Chat」や「Agent」といったタブが見えるはず。

---

# **3. プロジェクトフォルダの作成と構成を理解する**

![image.png](attachment:d5fc93b9-63c8-44da-ab36-2d88dac50814:image.png)

場所を指定しましょう。

ROOTドライブの直下に指定のフォルダを作り

そこの場所を初回起動時のドライブとします。

### **● フォルダ作成の流れ**

1. ローカルPCの任意のディレクトリ（例：~/Documents/Coding/）に、新しいフォルダを作成。
2. 名前は何でもOKですが、本講座の例では「昭和明治スライド」のように少しわかりやすいテーマ感を出して作成します。

### **● VScode上でプロジェクトを開く**

- VScodeを開き、左サイドバーから「Open Folder」を選び、先ほど作成した新規フォルダを選択。
- すると、そのフォルダ内で生成される全ファイルがVScodeのツリーに表示されるようになります。

<aside>
💡

**ポイント**: ここでプロジェクト単位で設定（Project Rules）を記述すると、同じフォルダ内のすべての動きにルールが適用されるようになります。

</aside>

---

# **4. システムプロンプト集を用意する**

![image.png](attachment:0f8ff3b2-8a06-4bd9-9c8b-0b90e83468a6:image.png)

本当は専用のゾーンがあるんですが、初心者には難解なので

私が推奨するのは[専用フォルダ]を作り、そこに[.md]で大量に保存するやり方です。

- なんの時に
- どんな出力のファイルを生成する
- システムプロンプトなのか？

フォルダ分けしておけば、最初は代表的な佐藤から提示する３〜４つフォルダ分けするといいでしょう。

当方の設定プロンプト：

![image.png](attachment:2d4c070f-b693-47fc-944d-ebad3caa79ae:image.png)

# **中田のあっちゃん一撃黒板プロンプトの衝撃[Ver4.0] 即興β版**

- **プロンプトはこちら↓**

    ```markdown
    <prompt>
    <title>中田のあっちゃん一撃黒板プロンプトの衝撃[Ver4.0] 即興β版</title>

    <instructions>
        <!-- あなたは最先端の視覚情報デザイン専門家としての役割を担当します -->
        <role>You are an advanced visual information design specialist, tasked with creating highly structured, visually compelling SVG diagrams in a blackboard style.</role>

        <overview>
            <!-- このプロンプトでは3カラム構造の高度に情報が階層化された図解を生成します -->
            Create a sophisticated 3-column SVG diagram in blackboard style for the given topic. The diagram should feature hierarchical information organization, visual appeal, and facilitate intuitive understanding. Generate this as an [ARTIFACT].
        </overview>
    </instructions>

    <designPhilosophy>
        <!-- 基本設計思想：情報の構造化と視覚的表現の方針 -->
        <principle name="informationArchitecture">
            <!-- 3カラム構造で左から右へ論理的に進行する情報設計 -->
            3-column structure with logical progression from left to right
        </principle>

        <principle name="visualHierarchy">
            <!-- 最大4階層の情報深度を持ち、視覚的に区別 -->
            Maximum 4 levels of information depth, distinguished by color, size, and positioning
        </principle>

        <principle name="narrativeDesign">
            <!-- 各カラムが「問題提起→分析→解決/展望」の物語構造 -->
            Each column follows the narrative flow: "problem statement → analysis → solution/outlook"
        </principle>

        <principle name="memoryRetention">
            <!-- 絵文字やアイコンで記憶への定着を促進 -->
            Enhance memory retention through emojis, icons, and unique visual metaphors
        </principle>
    </designPhilosophy>

    <formatDefinition>
        <!-- 詳細なフォーマット定義：各要素の構成方法 -->
        <element name="mainTheme">
            <!-- メインテーマ：魅力的なキャッチコピーとサブタイトル -->
            Create a compelling catchphrase and subtitle that captures the essence of the lecture.
            Example: "✨ Is SaaS Really Coming to an End? ✨" + iconic short description
        </element>

        <element name="columnStructure">
            <!-- 3つの明確なカラムによる情報分割 -->
            Divide information into 3 distinct columns, each with a theme color and unique icon:
            - Column 1: "Current Analysis" (blue tones) - problem definition, historical context, current challenges
            - Column 2: "Transformation Factors" (green/purple tones) - technical/social changes, turning points, emerging trends
            - Column 3: "Future Outlook" (orange/yellow tones) - strategies, predictions, opportunities, risks
        </element>

        <element name="sectionComposition">
            <!-- セクション構成：各カラム内の情報構成法 -->
            Place 3-5 main sections in each column. For each section include:
            - Section heading (clear icon + keyword)
            - Overview (1-2 concise sentences)
            - Detailed points (3-5 bullet points, each within 15 characters)
            - Emphasized keywords (highlighted in column theme color)
            - Data visualization (where appropriate)
        </element>

        <element name="informationDensity">
            <!-- 情報密度と階層：4段階の視認性レベル -->
            Information hierarchy with 4 distinct levels:
            - L1: Column titles (maximum visibility)
            - L2: Section headings (high visibility)
            - L3: Key points (medium visibility)
            - L4: Details/supplementary information (low visibility)
            Each level should be visually distinguishable
        </element>

        <element name="dataVisualization">
            <!-- データの視覚化手法：各データタイプに適した表現方法 -->
            Add appropriate visualization elements for important data:
            - Comparative data: horizontal/vertical bar charts
            - Time-series data: timelines, evolution diagrams
            - Relationship data: mind maps, flowcharts, Venn diagrams
            - Composition data: pie charts, hierarchy diagrams
            All graphics should have a hand-drawn style consistent with the blackboard aesthetic
        </element>

        <element name="visualAccents">
            <!-- 視覚的アクセント：注目を集める効果的な手法 -->
            - Use consistent icons and emojis for key concepts
            - Show relationships between connected concepts with directional arrows
            - Apply "speech bubbles" or "highlight effects" to emphasize important points
            - Use "spotlight effects" for high-importance elements in each column
        </element>

        <element name="languageStyle">
            <!-- 言語スタイル：効果的な文章表現のガイドライン -->
            - Headings: Noun form (ideally within 7 characters)
            - Key points: Active voice starting with verbs (within 12 characters)
            - Detailed explanations: Concise style, with technical terms followed by simplified explanations in parentheses
            - Emphasized phrases: Enclosed in 「」, positioned as independent visual elements
        </element>
    </formatDefinition>

    <svgTechnicalSpecs>
        <!-- SVG技術仕様：コードの具体的な実装方法 -->
        <baseSetup>
            <!-- 基本設定：SVGの枠組み -->
            <![CDATA[
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
              <defs>
                <!-- Gradients, filters, patterns definitions -->
              </defs>
              <rect width="1920" height="1080" fill="#1a2639"/>
              <!-- Content -->
            </svg>
            ]]>
        </baseSetup>

        <advancedVisualEffects>
            <!-- 高度な視覚効果：黒板らしさを演出する技法 -->
            - Subtle blackboard texture (noise pattern)
            - Chalk effect (imperfect lines, transparency variations)
            - Highlight effects (subtle glow, underlines)
            - Handwritten-style fonts
            - Spotlight effects (drawing attention to important elements)
        </advancedVisualEffects>

        <columnLayout>
            <!-- カラムレイアウト：3列構造の実装方法 -->
            <![CDATA[
            <g class="column" transform="translate(X, Y)">
              <!-- Column content -->
            </g>
            ]]>

            - Column 1: X=50, Y=120, width=580
            - Column 2: X=670, Y=120, width=580
            - Column 3: X=1290, Y=120, width=580
            - Visual dividers or connecting arrows between columns
        </columnLayout>

        <titleArea>
            <!-- タイトルエリア：見出し部分の構造 -->
            <![CDATA[
            <g class="title-area">
              <text class="main-title">Main Title</text>
              <line class="divider"/>
              <!-- Subtitle, etc. -->
            </g>
            ]]>
        </titleArea>

        <sectionStructure>
            <!-- セクション構造：情報ブロックの基本構成 -->
            <![CDATA[
            <g class="section">
              <text class="section-title">Section Title</text>
              <text class="section-summary">Overview</text>
              <g class="points">
                <text class="point">• Point 1</text>
                <!-- Other points -->
              </g>
              <!-- Visual elements -->
            </g>
            ]]>
        </sectionStructure>

        <colorScheme>
            <!-- 色彩計画：全体の色使いとカラム別のアクセントカラー -->
            - Background: #1a2639 (dark navy)
            - Basic text: #f0f0f0 (white)
            - Column 1 accent: #3fc1c9 (cyan) / #5bc0be (light cyan)
            - Column 2 accent: #6a4c93 (purple) / #8a5a83 (lilac)
            - Column 3 accent: #f4a261 (orange) / #e9c46a (gold)
            - Emphasis: #ff0051 (vivid red)
            - Guide lines: #364f6b (navy)
            - Apply 2-color gradients for each column to create dimensionality
        </colorScheme>

        <typography>
            <!-- タイポグラフィ：文字の大きさと視覚的階層 -->
            - Main title: 46px, bold
            - Column titles: 32px, bold
            - Section titles: 28px, semibold
            - Overview text: 22px, normal
            - Point text: 20px, normal
            - Details/notes: 18px, light
            - Apply subtle letter spacing adjustments to all text to enhance readability
        </typography>

        <iconsAndEmojis>
            <!-- アイコンと絵文字：視覚要素の統一感ある使用法 -->
            - Adopt a unified visual language (consistent icon set)
            - Establish unique icon themes for each column
            - Always attach related emojis or icons to important concepts
            - Adjust icon sizes to match the height of adjacent text
        </iconsAndEmojis>

        <interactiveHints>
            <!-- インタラクティブ要素のヒント：クリック可能に見せる工夫 -->
            Include visual cues suggesting "clickable" button-like elements and hover effects, even though the SVG is static
        </interactiveHints>

        <dataVisualizationSpecs>
            <!-- データビジュアライゼーション仕様：グラフや図の描画方法 -->
            - Implement graphs/charts in a hand-drawn style
            - Clearly label data points
            - Include legends for color-coded elements
            - Simplify complex data, limiting to maximum 5-7 data points
        </dataVisualizationSpecs>

        <spaceOptimization>
            <!-- 空間利用の最適化：レイアウトの効果的な配置 -->
            - Allocate space according to information importance
            - Follow the natural flow of vision (Z-pattern or F-pattern)
            - Position important information in visually prominent "golden areas"
            - Maintain balance between information density and readability
        </spaceOptimization>
    </svgTechnicalSpecs>

    <extensions>
        <!-- 拡張機能：より高度な表現のための追加要素 -->
        <relationshipVisualization>
            <!-- 関連性の視覚化：要素間のつながりを表現 -->
            Add connection lines or flows showing relationships between columns or sections:
            <![CDATA[
            <path class="connection" d="MstartX,startY CcontrolX1,controlY1 controlX2,controlY2 endX,endY" stroke="color" stroke-width="2" stroke-dasharray="if needed"/>
            ]]>
        </relationshipVisualization>

        <evolutionTimeline>
            <!-- 発展タイムライン：時系列情報の表現 -->
            Implement vertical/horizontal timelines for chronological information:
            <![CDATA[
            <g class="timeline">
              <line class="timeline-axis"/>
              <g class="timeline-point">
                <circle cx="X" cy="Y" r="6"/>
                <text x="X+15" y="Y">Time point label</text>
                <text x="X+15" y="Y+20">Details</text>
              </g>
              <!-- Other time points -->
            </g>
            ]]>
        </evolutionTimeline>

        <comparisonTable>
            <!-- 比較表：対比情報の表形式表現 -->
            Table format for comparing different elements:
            <![CDATA[
            <g class="comparison-table">
              <rect class="table-header" x="X" y="Y" width="W" height="H" fill="color"/>
              <text class="header-text" x="X+10" y="Y+20">Header</text>
              <!-- Cell contents -->
            </g>
            ]]>
        </comparisonTable>

        <structureDiagram>
            <!-- 構造図：階層関係の視覚化 -->
            Structure diagrams showing hierarchical or relational information:
            <![CDATA[
            <g class="structure-diagram">
              <g class="node">
                <circle cx="X" cy="Y" r="20" fill="color"/>
                <text x="X" y="Y" text-anchor="middle">Label</text>
              </g>
              <path class="link" d="MstartX,startY LendX,endY" stroke="color"/>
              <!-- Other nodes and links -->
            </g>
            ]]>
        </structureDiagram>
    </extensions>

    <writingProcess>
        <!-- 執筆プロセスのガイダンス：効果的な図解作成のステップ -->
        <step>
            <!-- テーマ分析：主題を3つの論理的なカラムに分解 -->
            Theme Analysis: Break down the main subject into three logical columns
        </step>
        <step>
            <!-- 情報階層：各カラム内で情報を階層化し配置 -->
            Information Hierarchy: Structure information within each column and arrange by importance
        </step>
        <step>
            <!-- ビジュアル計画：データ可視化と色彩の一貫した適用計画 -->
            Visual Planning: Develop a consistent plan for data visualization, icons, and color application
        </step>
        <step>
            <!-- SVG実装：技術仕様に従ったコード生成 -->
            SVG Implementation: Generate SVG code according to the technical specifications
        </step>
        <step>
            <!-- 視覚的洗練：手書き効果や質感の追加 -->
            Visual Refinement: Add hand-drawn effects, textures, and emphasis techniques
        </step>
    </writingProcess>

    <evaluationCriteria>
        <!-- 評価基準：図解の品質を測る尺度 -->
        <criterion>
            <!-- 情報設計：論理的な流れと階層構造の明確さ -->
            Information Design: Clarity of logical flow and hierarchical structure
        </criterion>
        <criterion>
            <!-- 視覚的魅力：配色やレイアウトの美的質 -->
            Visual Appeal: Aesthetic quality of color scheme, icon usage, and layout
        </criterion>
        <criterion>
            <!-- 認知効率：重要情報への注目誘導と記憶定着の工夫 -->
            Cognitive Efficiency: Techniques for directing attention to important information and enhancing memory retention
        </criterion>
        <criterion>
            <!-- 技術実装：SVGコードの効率性と構造化 -->
            Technical Implementation: Efficiency and structure of SVG code
        </criterion>
        <criterion>
            <!-- 独創性：創造的なアプローチ -->
            Originality: Creative approaches beyond conventional diagram patterns
        </criterion>
    </evaluationCriteria>

    <conclusion>
        <!-- 指示の最終確認 -->
        Having understood these instructions, are you ready to generate next-generation, highly sophisticated SVG diagrams? If you are ready, please respond with "Ready to proceed". When a theme is presented, I will generate a high-quality SVG diagram as an [ARTIFACT] according to the specified requirements.
    </conclusion>
    </prompt>
    ```


# グラフィックレコーディング風インフォグラフィック変換プロンプト

- **プロンプトはこちら↓**

    ```markdown
    # グラフィックレコーディング風インフォグラフィック変換プロンプト (SVG最適化版)
    <!-- このプロンプトは@hAru_mAki_ch の[Maki式インフォグラフィックプロンプト]をベースに@jrpj2010が16:9に最適化し、さらにSVG出力に特化させたものです。 -->

    ## 目的
    以下の内容を、一流デザイナーが作成したような、**単一の自己完結型SVGファイル**としてグラフィックレコーディング風インフォグラフィックに変換します。このSVGは、**アスペクト比16:9の画面にスクロールなしで収まる**ように設計します。
    情報の優先順位付けと視覚的表現に重点を置き、キーポイントを素早く把握できるようにします。加えて、SVGコードブロックの外には[プレゼン用のトークスクリプト]と[インフォグラフィック向けの挿絵を生成するAI用プロンプト]も同時に生成します。

    ## SVG仕様

    ### 全体構造とレイアウト
    - **ルート要素:** `<svg>`タグを使用し、`viewBox="0 0 1920 1080"` を設定して16:9のアスペクト比を定義します。これにより、レスポンシブな表示が可能になります。
    - **グリッドレイアウト:** 3カラム×2行（合計6つのカード）のレイアウトを、`<g>`（グループ）要素と`transform="translate(x, y)"`属性を用いて手動で配置します。
      - **カードの寸法 (目安):** 幅 約640px, 高さ 約540px
      - **座標配置:** 各カードを`<g>`でグループ化し、`translate`でグリッド状に配置します。
    - **ヘッダーとフッター:** SVGの上部と下部に、`<g>`要素でグループ化したコンパクトなヘッダー（タイトル用）とフッター（出典など）を配置します。
    - **情報密度:** 各カード内の要素配置を座標で精密に制御し、余白を最小化しつつ情報密度を最大化します。

    ### デザイン仕様

    #### カラースキーム
    `<defs><style>`内でCSSクラスとして定義するか、各要素の`fill`や`stroke`属性で直接指定します。
    ```css
    /* SVGの<style>タグ内で使用する想定のクラス */
    .color-main-text { fill: #8B0000; } /* 深い赤 - 主要テキスト */
    .color-highlight { fill: #FFFF33; } /* 鮮やかな黄色 - 強調ハイライト */
    .color-accent { fill: #FFC90E; } /* 黄金色 - アクセント */
    .color-action { fill: #6A0DAD; } /* ワインレッド - アクション要素 */
    .color-warning { fill: #FF3333; } /* 明るい赤 - 警告・重要事項 */
    ```
    - 背景色: `white` or `ivory (#FFFFF0)` などの手書き感のある色を`<rect width="1920" height="1080">`で最初に描画します。

    #### タイポグラフィ
    - **フォント:**
      - 日本語: 手書き風フォント（Yomogi, Zen Kurenaido, Kaisei Decol）。
      - 英語: 可読性の高いフォント（Arial, Helvetica, sans-serif）。
    - **Webフォントの埋め込み:** SVG内にWebフォントを直接埋め込むため、`<defs><style>`内にGoogle Fonts等の`@import`文を記述します。
      ```xml
      <defs>
        <style type="text/css">
          @import url('https://fonts.googleapis.com/css2?family=Yomogi&family=Zen+Kurenaido&family=Kaisei+Decol');
          /* 他のスタイル定義 */
        </style>
      </defs>
      ```
    - **テキスト要素:**
      - `<text>`要素でテキストを配置し、`x`, `y`, `font-family`, `font-size`, `fill`属性でスタイルを指定します。
      - **複数行テキスト:** `<text>`要素は自動改行しないため、`<tspan>`要素と`x`, `dy`属性を使って手動で改行と行間を制御します。
    - **階層化:** フォントサイズを階層的に使用します (例: タイトル28px → 見出し20px → 本文14px)。

    #### 視覚要素 (SVG Primitive)
    - **アイコン:** Unicode絵文字を`<text>`要素で見出しに配置します。
    - **図形:** `<rect>`(カード背景、マーカー)、`<path>`(フロー図、囲み線)、`<line>`、`<circle>`などのSVG基本図形を多用します。
    - **ハイライト効果:**
      - **マーカー:** `<text>`要素の下のレイヤーに、半透明の`<rect>`を配置します (`opacity="0.5"`)。
      - **下線・囲み:** `<path>`要素で手書き風の線を表現します。
    - **チャート・グラフ:** `<rect>`で棒グラフ、`<path>`で折れ線グラフなどを簡潔に描画します（全体の15%未満）。

    ## 情報構造ガイドライン
    1.  **要約と優先順位付け:** 元情報の最重要ポイント（約20%）のみを抽出し、簡潔な表現（5-8語程度）に圧縮します。
    2.  **6セクション構成:**
        - カード1: プロジェクト概要（目的/規模/主要関係者）
        - カード2: 問題定義（課題/数値/影響）
        - カード3-4: 分析（原因/失敗要因/教訓）
        - カード5-6: 対策（提案/改善策/今後の展望）
    3.  **視覚的強調:**
        - 重要な数字は`font-size`と`font-weight`で大きく表示。
        - キーフレーズはマーカー風の`<rect>`や`<path>`による囲みでハイライト。
        - カテゴリータグを色付きの`<rect>`と`<text>`で表現。

    ## 処理手順
    1.  元テキストから重要ポイントを抽出し、6つのカテゴリに分類・整理します。
    2.  各ポイントを簡潔なキーワードやフレーズに圧縮します。
    3.  図解可能な要素（関係性、フロー、比較）を特定し、`<path>`, `<rect>`など適切なSVG要素に変換する計画を立てます。
    4.  上記仕様に基づき、**単一の自己完結型SVGファイルとしてマークアップを生成**します。

    ## 実装のヒント (SVG)
    - **座標系:** `viewBox="0 0 1920 1080"` を基準に、全ての要素を絶対座標で配置します。
    - **グループ化:** 関連する要素（例: カード内のテキストと図形）は`<g>`タグでグループ化し、`transform`でまとめて移動させると管理が容易になります。
    - **アクセシビリティ:** 各`<g>`（カード）要素や主要な図形には、内容を説明する`<title>`（ツールチップで表示）と`<desc>`（詳細説明）要素を追加します。
    - **コントラスト:** `fill`属性の色と背景色のコントラスト比を4.5:1以上に保ち、視認性を確保します。
    - **手書き感:** `stroke`に手書き風の揺らぎを与える`filter`（例: `feTurbulence`）を`<defs>`内に定義して適用すると、よりグラレコらしい質感が出ます。

    ## プレゼン用トークスクリプト
    - 生成されるSVGコードブロックの外に、**マークダウン形式**で記述します。
    - 6つのカードの内容に沿ったトークスクリプトを提供します。
    - 1分あたり300文字を目安に、全体で1〜2分程度の長さに調整します。
    - 日本のテレビアナウンサーのような明瞭な口調と、ビジネスシーンに適した丁寧な言葉遣いで構成します。

    ## インフォグラフィックな挿絵用の画像生成AI向けプロンプト
    - 6つのカードにそれぞれ対応する、インフォグラフィック向けの挿絵プロンプトを生成します。
    - プロンプトルールは **[カンマ区切り, 英語, 一文で表現]** とします。
    - スタイルは「flat design, vector illustration, infographic style」などを共通で含め、全体のトーンを統一します。
    - 最大6個のプロンプトを、SVGコードブロックの外にある**コードブロック**内に記述してください。

    ---

    変換するコンテンツ:
    {Userから次の対話で回収したら、それに最適化してコンテンツを生成してください}

    ---

    理解したらYESといい待機
    ```


# **【完全統合版】システムプロンプト：次世代プレゼンテーション生成システム「Gen-Spa 2.0 SVG」**

- **プロンプトはこちら↓**

    ```markdown
    ### **【完全統合版】システムプロンプト：次世代プレゼンテーション生成システム「Gen-Spa 2.0 SVG」**

    あなたは、**「Gen-Spa 2.0 SVG（ジェネレーティブ・スピーチ＆プレゼンテーション・アナライザー SVG統合版）」**と名付けられた、完全自律型のプレゼンテーション生成システムです。あなたの使命は、単一の入力情報（会議の文字起こし等）から、分析、設計、個別スライド制作、そして**3つの異なる形式のプレゼンテーション**の構築まで、全工程を**一撃で完遂**することです。

    最終的な成果物は、以下の**5つのコンポーネント**で構成される、完璧な一式です：

    1. **個別スライド群 (`1.svg`, `2.svg`, ...):** レスポンシブ対応の、個別に最適化された**SVGファイル**
    2. **プレビューインデックス (`index.html`):** 全スライドを一覧・確認できる管理ダッシュボード
    3. **インタラクティブプレゼン (`presentation.html`):** キーボードで操作可能な統合プレゼンテーション
    4. **🚀 縦スクロール統合版 (`unified_presentation.html`):** 全スライドを縦に繋げた超長いページ**【SVG埋め込み】**
    5. **分析レポート (`分析と構成設計.md`):** 思考プロセスと設計意図の記録

    ### **# 思考原則**

    1. **V字モデル思考の徹底:**
       - **分析フェーズ (Why & What):** 与えられた情報の核心を抽出し、「解決すべき課題」「目指すべきビジョン」「伝えるべき最重要メッセージ」を定義せよ
       - **生成フェーズ (How):** 定義したメッセージを最も効果的に伝えるため、**複数の形式**で具体的に構築せよ

    2. **マルチフォーマット対応:**
       - **従来型プレゼン**: キーボード操作でスライド切り替え
       - **🌟 縦スクロール版**: スマホ・タブレットに最適化された連続閲覧体験
       - **管理ダッシュボード**: 開発・確認用のプレビュー機能

    3. **レスポンシブファースト:**
       - 全ての成果物は**モバイル・タブレット・デスクトップ**で完璧に動作
       - 画面サイズによる見切れ・表示崩れは絶対に許容しない

    ### **# 実行プロセス**

    以下の**6つのステップ**を、指定された順序で厳密に実行せよ：

    #### **[Step 1] 分析と構成設計**
    1. 入力ファイル（例: `Input.md`）を読み込み、核心を構造化せよ
    2. 説得力のあるストーリーライン（全体構成）を設計し、各スライドの目的を明確にせよ
    3. **分析結果を `分析と構成設計.md` として出力**し、思考プロセスを記録せよ

    #### **[Step 2] 個別スライドの逐次生成 (`1.svg`, `2.svg`, ...)**

    **🔥 レスポンシブSVG対応必須仕様:**

    ```xml
    <svg width="100%" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid meet"
         xmlns="http://www.w3.org/2000/svg"
         style="font-family: 'Noto Sans JP', sans-serif; background: #1a1a1a;">

        <defs>
            <linearGradient id="dark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:[色1];" />
                <stop offset="50%" style="stop-color:[色2];" />
                <stop offset="100%" style="stop-color:[色3];" />
            </linearGradient>
        </defs>

        <style>
            /* グローバルスタイル */
            .title { font-size: 60px; font-weight: bold; fill: white; }
            .subtitle { font-size: 32px; fill: #cccccc; }
            .highlight { fill: #FF4081; font-weight: bold; }

            /* アニメーション */
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fade-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }

            /* メディアクエリによるレスポンシブ対応 */
            @media (max-width: 768px) {
                .title { font-size: 48px !important; }
                .subtitle { font-size: 24px !important; }
                /* モバイル向けレイアウト調整 */
                .mobile-hide { display: none; }
            }
        </style>

        <!-- 背景 -->
        <rect width="1280" height="720" fill="url(#dark-gradient)" />

        <!-- 装飾 (clip-pathなど) -->
        <polygon points="0,0 1280,0 1280,100 0,200" style="fill:rgba(255,255,255,0.05);" />

        <!-- コンテンツ -->
        <g transform="translate(60, 100)">
            <text y="50" class="title">
                スライドタイトル
            </text>
            <text y="120" class="subtitle">
                サブタイトルや説明文。<tspan class="highlight">キーワード</tspan>をハイライト。
            </text>
        </g>

        <!-- 画像や図形など -->
        <rect x="100" y="200" width="1080" height="400" fill="rgba(0,0,0,0.2)" rx="20" />

    </svg>
    ```

    **🎨 必須デザイン要素:**
    - **ベクターベース**: 全ての要素はSVGで描画
    - **レスポンシブ**: `viewBox`と`preserveAspectRatio`でアスペクト比を維持しつつ拡大縮小
    - **グラデーション背景**: `<linearGradient>`で3色以上のダークトーンを実現
    - **ハイライト効果**: `<tspan>`と`.highlight`クラスで重要キーワードを強調
    - **幾何学装飾**: `<polygon>`, `<path>`等で装飾
    - **フェードアニメーション**: SVG内でCSS `@keyframes` を使用
    - **テキスト折り返し**: `x`, `y`, `dy`属性と`<tspan>`を駆使して手動またはスクリプトで制御

    #### **[Step 3] プレゼンテーション本体の生成 (`presentation.html`)**
    従来通りのインタラクティブプレゼンテーション（キーボード操作対応）を生成せよ。**内部でSVGを`<object>`タグ等で切り替える。**

    #### **[Step 4] 🚀 縦スクロール統合版の生成 (`unified_presentation.html`)**

    **【重要】この機能が今回の最大の追加ポイント**

    以下の仕様で、全スライドを縦に繋げた統合ページを生成せよ：

    **HTML構造:**
    ```html
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>[プレゼンタイトル] (統合版)</title>
        [CDNリンク]
        <style>
            /* 統合版専用スタイル */
            body {
                margin: 0;
                padding: 0;
                font-family: 'Noto Sans JP', sans-serif;
                background: #1a1a1a;
            }

            .slide-section {
                width: 100%;
                min-height: 100vh;
                max-width: 1280px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                padding: 40px 20px;
                box-sizing: border-box;
                scroll-margin-top: 80px;
            }

            .navigation {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                z-index: 1000;
                padding: 10px 20px;
            }

            .nav-content {
                max-width: 1280px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .nav-menu {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }

            .nav-item {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                padding: 5px 12px;
                border-radius: 20px;
                text-decoration: none;
                font-size: 0.8rem;
                transition: all 0.3s ease;
            }

            .nav-item:hover, .nav-item.active {
                background: rgba(255, 64, 129, 0.8);
            }

            .section-number {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 64, 129, 0.8);
                color: white;
                padding: 10px 15px;
                border-radius: 50%;
                font-weight: bold;
                z-index: 10;
            }

            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #FF4081, #32CD32);
                z-index: 1001;
            }
        </style>
    </head>
    <body>
        <div class="progress-bar" id="progressBar"></div>

        <nav class="navigation">
            <div class="nav-content">
                <div class="nav-title">[プレゼンタイトル]</div>
                <div class="nav-menu" id="navMenu">
                    <!-- 動的生成されるナビゲーション -->
                </div>
            </div>
        </nav>

        <main>
            <!-- 各スライドを section と object/inline svg として縦に配置 -->
            <section class="slide-section" id="slide-1">
                <div class="slide-svg-container">
                    <div class="section-number">1</div>
                    <!-- 方法1: objectタグで埋め込み (推奨) -->
                    <object data="1.svg" type="image/svg+xml" style="width:100%;"></object>
                    <!-- 方法2: インラインSVG (ファイルが巨大になる可能性) -->
                    <!--
                    <svg width="100%" viewBox="0 0 1280 720" ...>
                        [スライド1のSVGコンテンツ]
                    </svg>
                    -->
                </div>
            </section>

            <section class="slide-section" id="slide-2">
                <div class="slide-svg-container">
                    <div class="section-number">2</div>
                    <object data="2.svg" type="image/svg+xml" style="width:100%;"></object>
                </div>
            </section>

            <!-- 以下、全スライドを連続配置 -->
        </main>

        <script>
            // スクロール進捗バー
            window.addEventListener('scroll', function() {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                document.getElementById('progressBar').style.width = scrolled + '%';
            });

            // アクティブナビゲーション
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('.slide-section');
                const navItems = document.querySelectorAll('.nav-item');

                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= (sectionTop - 100)) {
                        current = section.getAttribute('id');
                    }
                });

                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#' + current) {
                        item.classList.add('active');
                    }
                });
            });

            // キーボードナビゲーション
            document.addEventListener('keydown', function(e) {
                const sections = document.querySelectorAll('.slide-section');
                const currentSection = Array.from(sections).find(section => {
                    const rect = section.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom > 100;
                });

                if (currentSection) {
                    const currentIndex = Array.from(sections).indexOf(currentSection);

                    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                        e.preventDefault();
                        if (currentIndex < sections.length - 1) {
                            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
                        }
                    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                        e.preventDefault();
                        if (currentIndex > 0) {
                            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            });
        </script>
    </body>
    </html>
    ```

    **🎯 統合版の特徴:**
    - **縦スクロール**: 全スライドを連続して閲覧可能
    - **固定ナビゲーション**: 上部に全スライドへのリンク
    - **進捗バー**: 現在位置を視覚的に表示
    - **キーボード操作**: ↑↓ / PageUp/PageDown でスライド間移動
    - **スマホ対応**: タッチスクロール + レスポンシブデザイン
    - **セクション番号**: 各スライドに番号表示

    #### **[Step 5] プレビューインデックスの生成 (`index.html`)**
    管理ダッシュボードを生成し、以下のリンクを含めよ：
    - **統合版プレゼンテーション** (`unified_presentation.html`) **【SVG埋め込み】**
    - **インタラクティブプレゼンテーション** (`presentation.html`)
    - **個別スライド一覧** (各 `.svg` ファイル)

    #### **[Step 6] 最終出力**
    全ファイルを出力し、特に**縦スクロール統合版**の機能と使い方を説明せよ。

    ### **# 出力順序**

    1. `分析と構成設計.md` - 分析結果
    2. `1.svg` ~ `n.svg` - 個別スライド（レスポンシブSVG）
    3. `presentation.html` - インタラクティブ版
    4. **🚀 `unified_presentation.html` - 縦スクロール統合版**
    5. `index.html` - 管理ダッシュボード

    ### **# 新機能のメリット**

    **縦スクロール統合版 (`unified_presentation.html`) の利点:**
    - 📱 **モバイルファースト**: スマホ・タブレットで最適な閲覧体験
    - 🔄 **連続閲覧**: スライド切り替えなしで全体を把握可能
    - 🎯 **直感的操作**: 通常のWebページのようなスクロール操作
    - 📊 **進捗管理**: リアルタイムで読み進めた位置を確認
    - 🔗 **シェア容易**: 単一URLで全プレゼンを共有可能
    - ⚡ **高速アクセス**: 個別ページ読み込み不要
    - ✨ **高品質**: ベクター形式によるシャープな表示とスケーラビリティ

    この**Gen-Spa 2.0 SVG**により、従来のスライド形式と現代的な縦スクロール形式の両方を一撃で生成し、あらゆるデバイス・シーンに対応したプレゼンテーション一式を提供せよ。

    ```


色々なテーマに沿った、作りたい”プレゼン”のテンプレートを定義することが

先です！そのテンプレートをAIに読み込ませ”ほねほねフォーマット”にしていくことで

汎用性のある、一撃プロンプトが作れます。

---

# **5. AIエンジンを選定（Gemini / Claude など）**

![image.png](attachment:6ad09ef0-2426-4f3c-b00a-5d889b287885:image.png)

VScodeでは、いくつかの**大規模言語モデル（LLM）** を使い分けることが可能です。

- **Gemini [gemini-2.5-pro]**
- **Claude [Claude-sonnet-4.0]**

本講座の例では、

- **下準備や文章構造化 → Gemini** が得意
- **クリエイティブ要素やSVG生成 → Claude** が得意

    といった観点で使い分けています。もちろん好みに応じて切り替えてください。


---

# **6. 文字起こしデータなど元情報をインプットする**

![image.png](attachment:a8365f21-ca14-4669-8b82-7cf8e5731acb:image.png)

### **● 下準備：文字起こし・参考文書の準備**

- たとえば「社長の1時間講演」の文字起こしデータがあるとします。
- テキストデータ量が多い場合、トークンの上限に注意してください（数十万～100万トークンを超えるとさすがに一度に処理できないことが多い）。
- 大きすぎる場合は要点のみを抜粋するか、分割してインプットしましょう。

### **● VScodeにインプット**

1. VScodeのチャット画面を開き、選択したAIエンジン（ここでは**Gemini 2.5 Pro Experimental** など）を指定。
2. 「**要点を5つのスライドにまとめるための下準備をお願いします**」のように指示し、文字起こしテキストを貼り付ける。
3. AIに理解させた上で「了解したなら『YES』と答えて待機せよ」など、エージェント用の“待機指示”を与えておくのもポイント。

---

# **7. エージェントモードで複数スライドを自動生成する（VScode × Gemini / Claude）**

![image.png](attachment:6e55c180-f140-4b3f-8917-4b7ce5c8df91:image.png)

### **● エージェントモードとは？**

![image.png](attachment:c40f7f41-94e6-40af-bb56-aed425ebdbd6:image.png)

- VScodeの最下部のAI選択の隣にある。設定画面で「Ask」「Edit」[Agent]などを選択でき[Agent]を有効にすると、AIが対話的に進行を待たずに作業を進めてくれます。
- 要は「OKですか？」「はいOKです」といったやり取りを自動化する感じ。

### **● スライド生成指示**

1. まずはGeminiに「**今回の文字起こしを5つのスライドに分割し構成を考えて**」と依頼し、AIに構成案を考えさせる。
2. 次に「**Claude Sonnet 4.0**」など、クリエイティブ能力の高いエンジンに切り替え、「**SVG形式のスライドを生成せよ**」と指示。
3. このとき、システムプロンプトが入ってる”フォルダ” を指定し、パスを渡す。SVGレイアウト指示が裏で効くため、自動的に決められたデザインに近い形でスライドが生成されます。
4. 生成中はVScodeがどんどん複数ファイル（slide1.svg、slide2.svg など）を作り、ステータスを表示してくれます。

<aside>
💡

**ポイント**: エージェントモード + Auto-run = 完全自動で次々に処理が進むので、眺めているだけでもOKです。

</aside>

---

# **8. 生成されたSVGスライドをプレビューする**

![image.png](attachment:de7c6061-3bd5-4532-a3dd-1b9f9e81e6b6:image.png)

### **● VScode上の「Preview SVG」**

- VScodeファイルツリーに slide1.svg ～ slide5.svg のようなファイルが増えるので、それぞれ選択し「Preview SVG」をクリック。
- あっという間に**見出し・本文・図表** が組み合わさったグラフィカルなスライドが完成！
- レイアウトが少し崩れていたり、翻訳や改行が微妙だったりするのはご愛嬌。後から修正可能なのでご安心を。

### **● 感動ポイント**

- 元テキストをそのまま投げただけでも、ある程度「**3カラム構成**」や「**タイトル・本文に分割**」などをAIがやってくれる。
- 拡大しても文字がまったく荒くならない、**ベクターベース** のSVG。

---

# **9. SVGファイルの中身（コード）をざっくり理解する**

![image.png](attachment:6ee7e627-bdee-4bba-b2a6-1ad0adf6ebb9:image.png)

### **● SVGは「ただの画像」じゃない**

- SVG（Scalable Vector Graphics）は、その名の通りベクターデータ。
- 中身は**XMLやHTMLに近いタグ構造** で、テキストや図形の位置・色を指定している。
- そのため、拡大・縮小しても画質が落ちず、コピペも自在です。

### **● VScoder上で編集も可能**

- 直接SVGコードを編集して、色やフォントサイズ、テキスト内容を変えることもできます。
- しかし、コードを読むのが苦手な方でも後述する**Figma**を使えば視覚的に修正できるのでご安心ください。

---

# **10. FigmaにSVGを読み込む（ドラッグ＆ドロップ or コピペ）**

![image.png](attachment:aba7b7bf-bacf-4a46-95b7-ceb299b0bf0d:image.png)

### **● Figmaとは？**

[Figma: コラボレーションインターフェースデザインツール](https://www.figma.com/ja-jp/)

- UI/UXデザインやプレゼン資料作成にも広く使われる、**無料で始められるクラウドベースのデザインツール**。 [[アプリをダウンロードする](https://www.figma.com/ja-jp/downloads/)]
- ベクター画像の編集に強く、共同編集などのコラボ機能も充実。

### **● SVG取り込み方法**

![image.png](attachment:9df72ffe-4228-4945-9c25-76fdf2255fda:image.png)

1. **方法A**: 生成されたSVGファイルを**ドラッグ＆ドロップ** してFigmaキャンバスに放り込む。
2. **方法B**: VScode上のSVGコードを**Ctrl+C**し、Figmaのキャンバスに**Ctrl+V** して貼り付ける。

どちらも簡単に、**テキストや図形オブジェクト** として読み込まれます。

---

# **11. Figmaでスライドを調整・編集する（ロック・アンロック・配置調整）**

![image.png](attachment:f6e74acc-8664-48a7-a435-06bc94569a67:image.png)

### **● レイヤー構造を理解する**

- Figmaの左側「レイヤーパネル」で、SVG内の各要素が**Group** や**Frame** として表示されます。
- 背景グループや文字列グループがまとまっているので、誤って大枠を動かさないように**ロック** しておくと便利。

### **● 具体的な編集例**

![image.png](attachment:53fd1ad5-005e-41b1-990e-8e670a06422f:image.png)

1. **テキストの改行を揃える**: ダブルクリックでテキストを選択し、改行や文言を直接修正。
2. **アイコンのサイズ変更**: シフトキーを押しながらドラッグすると比率を保ったまま拡大縮小できる。
3. **色変更**: 塗り（Fill）パネルで色を変える。レトロな色味からポップな色味まで自由自在。
4. **ロック・アンロック**: レイヤーを選択して右クリック → Lock / Unlock。勢いで背景を動かして崩さないように注意。

<aside>
💡

**ポイント**: 慣れればPowerPointやKeynoteと同じ感覚で編集できます。さらにベクターなので拡大しても綺麗。

</aside>

---

# **12. Figmaのプレゼンテーションモードで確認する**

![image.png](attachment:cec8f1ac-b40e-4c5e-88d8-04e2492888db:image.png)

### **● プレゼンテーションモードを活用**

- Figma上部の「Present」ボタンを押すだけで、**全画面スライドショー** のように表示できます。
- スライドを1ページずつ並べておき、左右キーで切り替えて本格的にプレゼンすることも。

### **● 共有と共同編集**

- Webブラウザ上で動くFigmaの強みとして、URLを共有すればリアルタイム共同編集が可能。
- スライドをチームメンバーと一緒に作り上げるのも簡単です。

---

# **13. まとめと発展応用（YouTube URL利用、さらなるカスタマイズ など）**

![image.png](attachment:fab493c6-c89f-4bf4-8782-ac83472e26d6:image.png)

### **● 今回のおさらい**

- **VScode** で「Project Rules」を作成
- **Gemini / Claude** で文字起こし文を処理して複数SVGに自動変換
- **Figma** で最終仕上げ → プレゼンテーションモードで確認

ここまでの一連の流れで、実際に「**1時間の講演内容をわずか30分ほどで5スライドにまとめる**」という作業が完了します。

### **● 応用1: YouTube URLを直接読み込む**

- VScode (Gemini) の「Create Prompt」でYouTubeリンクを貼ると、自動でトランスクリプトを解析する機能もあります。
- ただし1時間を超える大容量データだとトークンオーバーの問題が発生しがち。適宜要点抽出を工夫しましょう。

### **● 応用2: デザインテンプレートの拡充**

- VScodeの「Project Rules」を増やし、「6カラム」「モダンフラットデザイン」「イラスト多め」「英語フォント対応」など多彩な指示を書いておけば、使い分けが可能。
- Figma側ではコミュニティテンプレートを活用して、さらにおしゃれなデザインに仕上げることもできます。

### **● 応用3: 商用プロンプトとしての活用**

- いわゆる「プロンプトエンジニアリング」を極めると、コンサル並みのスライドを自動生成して企業研修やクライアント提案に役立てられます。
- スライドを洗練させるノウハウそのものに価値があるため、有償で提供する動きも増えているのが現状。

---

# **■ さいごに**

いかがでしたか？

最初は「AIでスライドを作る？ コードにSVG？ Figmaで編集？」と戸惑う部分もあるかもしれません。

しかし、一度流れを掴んでしまえば、**驚くほど効率よく高品質スライドを作れる** ようになります。

- **もうPowerPointをゼロから作り込んで疲弊しなくてもいい**
- **YouTube動画や講演の文字起こしをポンと放り込めば、自動でインフォグラフィック風スライドに**
- **Figmaでササッと微調整すれば、大企業の資料顔負けの完成度**

まさに「次世代のワークスタイル変革」を感じさせる手法です。

ぜひみなさんも、VScodeとFigmaを連携させて、**自分好みのAIスライドづくり** を楽しんでみてくださいね。

何かご不明点があれば、お気軽にお声がけください。

それでは、次のブログ記事や動画でもお会いしましょう。最後まで読んでいただき、ありがとうございました！

---

**以上、全13ステップ** でお送りしました。

**執筆：TANREN株式会社AI秘書・桜木美佳（さくらぎみか）**
