# AIアカデミア「君だけのAIエージェントPJ」 事前学習３　「NotebookLMの基礎活用」

- 目次

▶︎AIアカデミア「君だけのAIエージェントプロジェクト」 事前学習３

[https://youtu.be/KxOFyRFOALM](https://youtu.be/KxOFyRFOALM)

[**https://youtu.be/KxOFyRFOALM**](https://youtu.be/KxOFyRFOALM?fbclid=IwZXh0bgNhZW0CMTAAAR5F5lbfpfhWKt3WzSGsvvz7HA_zpj0Js-ZylA_NAkK_wz3PF21T_HyGRHLXog_aem_KsXhdcRYo2wPrBjXtUnmTA)

▶︎スライド：

[https://www.docswell.com/s/TERRAISE/ZN12JR-2025-03](https://www.docswell.com/s/TERRAISE/ZN12JR-2025-03)

[https://www.docswell.com/s/TERRAISE/ZN12JR-2025-03](https://www.docswell.com/s/TERRAISE/ZN12JR-2025-03)

## はじめに：AIで「自分だけの学習パートナー」を！

皆さん、こんにちは！ このページは、動画教材「生成AI講座：NotebookLM編」の補助教材です。

この講座（動画とこのページ）では、Googleが提供する無料ツール「**NotebookLM**」を使って、まるで「**自分だけのAIエージェント（学習パートナー）**」を作るような体験をします。これまで学んだAIの基本やプロンプトの使い方の実践編として、ピッタリのツールですよ！

**今日のゴール（このページと動画で目指すこと）**

- ✅ NotebookLMのアカウントを作成する
- ✅ 自分で選んだ資料をNotebookLMにアップロードする
- ✅ 実際にNotebookLMを操作して、質問したり要約させたりしてみる
- ✅ NotebookLMが **高校生の学習にどう役立つのか**、具体的な場面をイメージできるようになる
- ✅ NotebookLMを **効果的に使うためのヒント** や、**使う上での注意点** を理解できる

さあ、動画とこのページを行き来しながら、NotebookLMの世界を探検し、君だけのAI学習パートナーを手に入れましょう！

## 1. NotebookLMってなんだろう？ 〜君の資料がAIの先生になる〜

まずは、「NotebookLMって一体何？」というところから見ていきましょう。

### 基本的な特徴

- **Googleが提供するAIツール:** あのGoogleが作っている、AIを活用したノートツールです。しかも**無料**で使えます！
- **君の資料だけを読むAI:** 普通のAI（ChatGPTなど）はインターネット全体の膨大な情報から答えますが、NotebookLMは **君がアップロードした資料（教科書、プリント、ノートなど）だけ** を読んで、質問に答えたり、要約を作ったりします。
- **引用元がわかる:** AIの回答が、資料の **どの部分に基づいているか** を番号で示してくれます（これを**引用元表示**と言います）。だから、情報の出どころがハッキリわかって安心！
- **できること色々:** 文章の要約、難しい言葉の説明、内容についての質問応答、さらにはアイデア出しまで、学習に役立つ機能がたくさんあります。

**(画像：NotebookLMのメイン画面イメージ)**

![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image.png)

### ChatGPTとの違いは？

よく聞くChatGPTとはどう違うのでしょうか？

- **ChatGPT:** インターネット全体という**巨大な図書館**から、関連しそうな情報を探し出して答えてくれるイメージ。とても物知りだけど、どの本のどのページから情報を得たのかまでは、教えてくれないことも。
- **NotebookLM:** 君が選んで渡した教科書やプリントが入った**「君専用の本棚」**から、必要な情報だけを探して教えてくれるイメージ。情報源が限定されているから、より正確で、しかも「この本のここに書いてあったよ」と引用元を教えてくれます。

![6.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/6.png)

![8.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/8.png)

**💡 ポイント！**

どちらが良い悪いではなく、**目的に合わせて使い分ける**ことが大切です。NotebookLMは、特定の資料の内容を深く理解したい時や、信頼できる情報源に基づいてレポートを書きたい時などに特に役立ちます。

### つまり、どういうこと？

NotebookLMは、君が持っている資料をAIに学ばせて、**その資料に関する「あなた専用のAI先生」や「賢いアシスタント」を作る**ようなツールなんです。

---

🤔 **考えてみよう**

「自分の資料だけを読むAI」と聞いて、どんなことに使えそうだと思いましたか？ ちょっと想像してみてください。

---

## 2. 使ってみよう！NotebookLMの基本操作

理屈がわかったら、次は実際に触ってみましょう！ ここでは、動画で見せた操作の基本的な流れをテキストで確認できます。

- **ステップ1: アクセスとログイン**
    1. Webブラウザで NotebookLM と検索するか、[**https://notebooklm.google.com/**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnotebooklm.google.com%2F) にアクセスします。
    2. Googleアカウントでログインします。（持っていない場合は作成しましょう）
    3. 「+ New notebook」をクリックして、新しいノートブックを作成します。
- **ステップ2: 画面の見方**
    - 画面は主に２つのエリアに分かれています。
        - **左側 (Sources):** 資料（ソース）をアップロードしたり、どの資料をAIに読ませるか選んだりする場所。
        - **中央 (Chat):** AIに質問を入力したり、AIからの回答が表示されたりする場所。
    - (右側に「Noteboard」というメモスペースもありますが、まずは左と中央を使えればOK！)
    - **(画像：NotebookLMの基本画面構成)**
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image.png)
        

- **ステップ3: 資料（ソース）をアップロード**
    1. 左側の「+ Add sources」をクリックします。
    2. アップロードしたい資料の種類を選びます。色々な形式に対応しています！
        - **ファイル:** PDF、テキストファイル (.txt)
        - **Googleドライブ:** Googleドキュメント、Googleスライド
        - **Webサイト:** URLを貼り付け
        - **コピーしたテキスト:** テキストを直接貼り付け
        - **(他にも音声ファイルなど、対応形式が増えています)**
    3. ファイルを選んだり、URLやテキストを貼り付けたりして、資料をNotebookLMに読み込ませます。
    4. 読み込みが終わると、左側のリストに資料名が表示されます。複数の資料を追加することも可能です。
    - **(画像：ソース追加の選択肢、ソースが追加された画面)**
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%201.png)
        
        - 
- **ステップ4: AIと対話してみよう！**
    1. **質問する:** 画面下のチャットボックスに、聞きたいことやAIにしてほしいこと（指示）を入力します。（例：「この資料を3行で要約して」「〇〇について詳しく教えて」）
    2. **資料を選ぶ:** 特定の資料について聞きたい場合は、左側の資料名の横にあるチェックボックスにチェックを入れます。複数の資料にまたがって聞きたい場合は、複数にチェックを入れます。（チェックを入れないと、基本的にすべての資料が対象になります）
    3. **送信する:** 質問を入力したら、送信ボタン（紙飛行機マーク）をクリック！
    - **(画像：質問入力ボックスとソース選択チェックボックス)**
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%202.png)
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%203.png)
        
        - 
- **ステップ5: 回答を確認＆深掘り！**
    1. AIからの回答がチャット形式で表示されます。
    2. **引用元をチェック！:** 回答の文末についている丸付き数字（例: ¹, ²）は、その情報がソースのどの部分に基づいているかを示しています。**必ずクリックして、元の資料の該当箇所を確認しましょう！** これがNotebookLMを賢く使うコツです。
    3. **さらに質問:** 回答内容について、もっと詳しく聞きたいことがあれば、続けて質問できます。（例：「その点について、具体例を挙げて説明して」）
    - **(画像：AIの回答と引用元表示)**
        - 
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%204.png)
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%205.png)
        
- **ステップ6: (応用) ノートスペースを活用**
    - AIの回答の右側にあるピン📌マーク「メモに保存」をクリックすると、その回答を右側の「ノートスペース(Noteboard)」に保存できます。
    - ノートスペースには、自分でメモを書き加えたり、考えをまとめたりすることもできます。学習の記録やレポートの下書きに便利です。
    - **(画像：回答をピン留めするボタンとノートスペース)**
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%206.png)
        
        ![image.png](AI%E3%82%A2%E3%82%AB%E3%83%86%E3%82%99%E3%83%9F%E3%82%A2%E3%80%8C%E5%90%9B%E3%81%9F%E3%82%99%E3%81%91%E3%81%AEAI%E3%82%A8%E3%83%BC%E3%82%B7%E3%82%99%E3%82%A7%E3%83%B3%E3%83%88PJ%E3%80%8D%20%E4%BA%8B%E5%89%8D%E5%AD%A6%E7%BF%92%EF%BC%93%20%E3%80%8CNotebookLM%E3%81%AE%E5%9F%BA%E7%A4%8E%E6%B4%BB%E7%94%A8%E3%80%8D%201c731bbd522c8071b194dd919d2a53ca/image%207.png)
        
        - 

---

🚀 **試してみよう！**

動画で紹介したように、何か手元にある資料（授業プリントのPDF、自分で書いた文章のテキストファイル、気になるニュース記事のURLなど）をアップロードして、いくつか質問を試してみましょう！

- 「この記事の要点を3つ教えて」
- 「〇〇という言葉の意味を説明して」
- 「△△について、筆者はどう考えている？」

**引用元の数字をクリックして、ちゃんと元の資料の場所を指しているか確認するのを忘れずに！**

---

## 3. もっと活用！NotebookLMでできること 〜君の学習がどう変わる？〜

基本的な使い方がわかったところで、NotebookLMをどんな風に活用できるか、高校生の皆さんにとっての具体的な例を見ていきましょう。アイデア次第で使い方は無限大です！

- **学習・勉強の強力サポーターとして:**
    - **苦手科目の克服:** 苦手な単元の教科書や参考書を読み込ませて、分からない箇所をピンポイントで質問！🤖「この数学の公式が使われる例題を、ステップバイステップで解説して」
    - **定期テスト対策:** 授業ノートやプリントをまとめて読み込ませ、重要事項を要約させたり、AIに先生役をしてもらって想定問題を出してもらったり！🤖「この範囲から出題されそうな記述問題を3つ作って、模範解答も教えて」
    - **英単語・古文単語の暗記:** 単語リストを読み込ませて、意味や例文を質問したり、自分だけのオリジナル単語クイズを作ってもらったり！🤖「この英単語リストを使って、意味を答えるクイズを10問出して」
    - **長文読解の相棒:** 英語や現代文の長文問題を読み込ませて、段落ごとの要約、登場人物の関係性、難しい語句の意味などを質問！🤖「この評論の筆者の主張を、100字以内でまとめて」
- **レポート・探究学習の効率アップ:**
    - **情報収集・整理:** 複数の参考文献（Web記事やPDF論文など）を読み込ませて、関連情報を横断的に検索したり、内容を比較検討させたり！🤖「資料Aと資料Bで、〇〇に対する意見の共通点と相違点をリストアップして」
    - **アイデア出し:** 集めた資料を元に、レポートの構成案や、面白い切り口のアイデアを出してもらう！🤖「このテーマについて、探究学習で深掘りできそうな問いを5つ提案して」
    - **引用リスト作成補助:** レポートに必要な参考文献リストを作る際に、AIに手伝ってもらう。（ただし、最終的な形式は自分で確認・修正が必要です）
- **その他にも…**
    - **読書ノート作成:** 読んだ本の内容をテキスト化して読み込ませ、あらすじや登場人物、自分の感想をメモするベースを作る。
    - **ニュースの理解:** 複数のニュース記事を読み込ませて、事件やトピックの概要、各社の論調の違いなどをまとめる。

**💡 ポイント！**

NotebookLMは、単に答えを教えてくれるだけでなく、**君自身の思考を整理したり、深めたりするための「壁打ち相手」** にもなってくれます。

---

🤔 **考えてみよう**

ここに挙げた例以外に、NotebookLMをあなたの学校生活（授業、部活、委員会など）や学習で活用できそうな場面はありますか？ 具体的に「こんな資料を読み込ませて、こんな質問をしてみたい！」と考えてみましょう。

---

## 4. 安全に使うためのヒントと注意点 〜賢く付き合うために〜

NotebookLMは非常に便利なツールですが、使う上で知っておきたいヒントと注意点があります。

### NotebookLMを使いこなすヒント💡

- **ヒント1: 具体的な「良い質問」をする:**
    - 漠然と聞くより、「〇〇の定義を、中学生にも分かるように教えて」「△△の原因を、重要だと思う順に3つ挙げて」「□□の箇所について、筆者の意図を説明して」のように、**何を・どのように知りたいのか**を明確に伝える（＝良いプロンプトを意識する）と、AIは的確に答えてくれやすくなります。
- **ヒント2: 資料（ソース）は「質」で選ぶ:**
    - AIはアップロードされた資料に基づいてしか回答できません。**信頼できる、内容が正確な資料**を選ぶことが超重要です。情報が古い資料や、間違いが含まれている資料を使うと、AIの回答もその影響を受けてしまいます。
- **ヒント3: ノートスペースを思考の整理箱に:**
    - AIとのやり取りで「これは！」と思った回答や、自分で考えたこと、レポートの構成案などを、右側の**ノートスペース(Noteboard)にこまめにメモ・保存**しましょう。ピン📌機能も活用！ 後で見返したり、まとめたりするのに役立ちます。
- **ヒント4: 色々試して、自分なりの使い方を見つける:**
    - 教科書やプリントだけでなく、Web記事、自分で書いた文章、小説、説明書など、**様々な種類の資料**をアップロードして、どんなことができるか試してみましょう。意外な活用法が見つかるかもしれません。

### 利用上の注意点 ⚠️

- **注意点1: AIの回答を鵜呑みにしない！ 必ず引用元を確認！**
    - AIは時々、事実と異なる情報（ハルシネーション）を作ったり、情報を間違って解釈したりすることがあります。**生成された情報が常に正しいとは限りません！** 回答についている引用元（丸付き数字）をクリックして、**必ず元の資料で裏付けを確認する**習慣をつけましょう。これはNotebookLMを使う上で最も大切なことです。
    - レポートや発表で使う情報は、特に慎重に確認してください。
- **注意点2: 個人情報・機密情報は扱わない！**
    - **氏名、住所、電話番号、パスワードなどの個人情報**や、**他人に見られて困る秘密の情報（クラスの友達の個人的な話など）**は、ソースとしてアップロードしたり、質問内容に含めたりしないようにしましょう。Googleはセキュリティに配慮していますが、リスクはゼロではありません。
- **注意点3: 著作権に配慮する**
    - **インターネット上の記事や、購入した電子書籍など、著作権で保護されているもの**をアップロードする場合は、**自分で学習するために使う範囲（私的利用）**にとどめましょう。AIが生成した要約や文章を、そのまま自分のレポートや作品として提出・公開することは、著作権の問題や、学校のルールに抵触する可能性があるので注意が必要です。（迷ったら先生に相談しましょう）
- **注意点4: ファイルがうまく読み込めない場合**
    - **スキャンしただけの画像のようなPDF**（文字情報が含まれていないもの）は、うまく読み込めないことがあります（OCRという文字認識処理が必要な場合があります）。
    - 特殊な形式のファイルや、手書き文字が多い資料なども、AIが内容を正確に理解できない可能性があります。なるべく**文字情報がしっかり含まれたデジタルデータ**（テキストファイル、Word/Googleドキュメント、文字情報付きPDFなど）を使うのがおすすめです。
- **注意点5: メニューは英語（2024年5月現在）**
    - 動画でも触れたように、ボタンなどの表示は基本的に英語です。でも、**日本語の資料をアップロードして日本語で質問すれば、ちゃんと日本語で答えてくれます！** 基本的な操作で使う英単語（Add source, New notebook, Saveなど）は限られているので、すぐに慣れるはずです。

---

🤔 **考えてみよう**

これらの注意点の中で、特に高校生が日常生活や学習で気を付けるべきだと思うことは何ですか？ その理由も合わせて考えてみましょう。

---

## 5. まとめ 〜NotebookLMで、君の学びをアップデート！〜

今日の授業（動画とこのページ）では、NotebookLMについて学びました。

**NotebookLMのすごいところ:**

- 君が選んだ**信頼できる資料だけ**を情報源にするAI
- Googleアカウントがあれば**無料**で使える
- AIの回答の**引用元（根拠）がわかる**から安心
- 要約、質問応答、アイデア出しなど、**学習の様々な場面で役立つ**

**賢く使うためのポイント:**

- AIの回答は**鵜呑みにせず、必ず引用元を確認**する！
- **個人情報や機密情報**は扱わない
- **著作権**に配慮する
- **具体的な質問**を心がける

NotebookLMは、上手に使えば、君の学習をより効率的で、より深いものにしてくれる強力なパートナーになります。ぜひ、今日学んだことを活かして、実際にアカウントを作り、色々な資料をアップロードして試してみてください。

使っていく中で、「こんな使い方ができた！」「ここが便利！」といった発見がきっとあるはずです。NotebookLMと共に、未来の学びを体験していきましょう！

## 6. さらに学びたい人へ

- **動画教材をもう一度チェック！:** 操作方法が分からなくなった時や、応用のヒントが欲しい時は、動画教材「生成AI講座：NotebookLM編」をもう一度見てみましょう。
- **Google AIの公式サイト:** NotebookLMに関する最新情報や、Googleが提供する他のAIツールについて知りたい場合は、公式サイトも参考になります。
- **とにかく使ってみる！:** 何よりも、実際に色々な資料をアップロードして、たくさん質問してみることが一番の学びになります。失敗を恐れずに、どんどん試してみましょう！