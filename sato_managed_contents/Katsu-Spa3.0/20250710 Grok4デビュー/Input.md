### 議事の要旨:
XAI社は、次世代AIモデル**Grok 4**を発表した。このモデルは、前世代のGrok 2と比較して**100倍のトレーニング**を経ており、人間の大学院生を全ての分野で同時に上回るという驚異的な知能レベルに到達している。特に、専門家でも解答が困難な「Humanities Last Exam (HLE)」ベンチマークにおいて、ツールを使用することで**40%以上**の問題を解決する能力を示した。

さらに、複数のAIエージェントが協調して問題を解決する**Grok 4 Heavy**も発表され、HLEのテキストベース問題の**過半数を解決**可能である。デモンストレーションでは、高度な数学問題の解決、市場予測、物理現象の可視化、X (旧Twitter)との連携など、多岐にわたる能力が示された。

また、**音声モードの強化**として、低遅延化と自然な発話が可能な新しい音声モデルが導入された。

開発者向けには**Grok 4 API**が即時提供され、ビジネスシミュレーションや生物医学研究、ビデオゲーム開発など、既に実世界での応用事例が報告されている。今後の展望として、コーディング能力の強化、マルチモーダル能力の抜本的向上、そしてビデオ生成モデルの開発が挙げられ、AIの進化が加速していくことが示唆された。

## [**Grok 4 入門：次世代AI**]

### Grok 4の発表とコンセプト:
- **XAIによる次世代AI、Grok 4の発表** [話者1][00:05]
  - 目的: 世界で最もスマートなAIの能力を実証する。 [話者1][00:29]
    - 位置づけ: この夏に登場する、より速く、より賢く、より大胆な次世代モデル。 [話者1][00:11]
        - 特徴: 未知の領域を見通し、問われていない問いに答え、不可能に挑戦する。 [話者1][00:17]
            - スローガン: 「真実を解き放つ (Unleash the truth)」。 [話者1][00:23]

### AIの進化とGrok 4の知能レベル:
- **AIの進化速度の驚異的な性質** [Elon Musk][00:35]
  - 人間の成長との比較: AIは人間の学習速度や意識の獲得をはるかに超える速さで進化している。 [Elon Musk][00:44]
    - 結果: この進化の速さが、Grok 4のような高度な知能を生み出す背景となっている。 [Elon Musk][00:52]
        - **Grok 4の学術的能力**:
            - **SATで常に満点を獲得可能**: 事前に問題を見たことがなくても、SAT（大学進学適性試験）で完璧なスコアを出すことができる。 [Elon Musk][01:06]
            - **大学院レベルの試験でほぼ満点**: GRE（大学院入学共通試験）のような試験において、人文科学、言語、数学、物理、工学など、あらゆる分野でほぼ完璧な結果を出す。 [Elon Musk][01:17]
- **人間を超える推論能力**:
  - **定説への反論**: 一部の「AIは推論できない」という考えに対し、Grok 4は超人的なレベルで推論可能であることを証明している。 [Elon Musk][01:41]
    - **能力の証明**: 未知の学術的問題を解決できる能力が、その高い推論能力の証左である。 [Elon Musk][01:23]
        - **Grok 4の知能の要約**:
            - **全分野で大学院生以上**: Grok 4は、ほぼすべての学術分野において、ほとんどの大学院生よりも賢い。 [Elon Musk][01:34]
                - 重要性: この事実が持つ意味の大きさを理解することが重要である。 [Elon Musk][01:35]

## [**Grok 4 ベンチマーク：学術的卓越性**]

### トレーニングの進化と規模:
- **Grok 2からGrok 4へのトレーニング規模の拡大** [Elon Musk][01:58]
  - 段階的なスケールアップ: Grok 2からGrok 3、Grok 3からGrok 4へと、各ステップでトレーニング量を約1桁（10倍）増加させた。 [Elon Musk][02:03]
    - **結果**: Grok 4はGrok 2の**100倍のトレーニング量**を投入されており、今後もこの規模は拡大し続ける。 [Elon Musk][02:09]
        - 感情的な側面: この知性の成長速度は驚異的であり、ある意味少し恐ろしくもある。 [Elon Musk][02:15]
- **トレーニング手法の進化**:
  - 2種類のトレーニング計算: 事前学習 (Pre-training) と強化学習 (RL) の2つが存在する。 [話者2][02:21]
    - Grok 2からGrok 3: 主に事前学習の計算量を増加させた。 [話者2][02:21]
        - **Grok 3からGrok 4**: 事前学習に加えて、**推論とRL（強化学習）に大量の計算リソースを投入**した。 [話者2][02:28]
            - **背景**: 1年前にはコンセプトすらなかったGrok 2の開発を通じ、データとアルゴリズムを最適化すれば事前学習を大幅に推進できることが判明した。 [話者2][02:46]
            - **インフラの構築**: この知見に基づき、**10万基のH100 GPUを搭載した世界最大のスーパーコンピュータ「Colossus」**を構築した。 [話者2][03:03]
- **強化学習（RL）の重要性**:
  - 検証可能な成果報酬の収集: 最高の事前学習済みモデルに対し、検証可能な報酬を与えることで、モデルは第一原理から思考し、自らの間違いを修正する能力を獲得した。 [話者2][03:08]
    - **Grok 4への応用**: Colossusの全リソース（20万GPU）をRLに投入し、他のどのモデルよりも**10倍以上の計算量を強化学習に費やした**結果、何が起こるかを検証した。これがGrok 4の物語である。 [話者2][03:19]
        - 結論: **膨大な計算リソースを強化学習に注ぎ込むこと**が、Grok 4の驚異的な推論能力の源泉となっている。 [話者2][03:34]

### Humanities Last Exam (HLE) ベンチマークへの挑戦:
- **HLEベンチマークの概要** [話者3][03:40]
  - 難易度: 非常に挑戦的なベンチマークであり、各問題は**対象分野の専門家によって作成**されている。 [話者3][03:47]
    - 構成: 数学、自然科学、工学、人文科学など、多岐にわたる分野の計2500問で構成される。 [話者3][03:58]
        - 初期の性能: 2024年初頭に公開された際、ほとんどのAIモデルは**1桁台の正答率**しか達成できなかった。 [話者3][04:04]
            - **問題の具体例**:
                - 数学: 圏論における自然変換に関する問題。 [話者3][04:17]
                - 有機化学: 電環反応に関する問題。 [話者3][04:22]
                - 言語学: ヘブライ語のテキストから閉音節と開音節を区別する問題。 [話者3][04:29]
- **Grok 4のHLEにおける性能**:
  - **人間との比較**: どんなに優れた人間でも、このベンチマークで高得点を取ることは不可能に近い（楽観的に見て5%程度）。 [Elon Musk][04:44]
    - Grok 4の能力: Grok 4は、**全ての分野で博士号（PhD）レベル、あるいはそれ以上**の能力を持つ。 [Elon Musk][05:20]
        - 強調点: これは学術的な問題に限った話であり、常識の欠如や新しい技術の発明はまだこれからの課題である。 [Elon Musk][05:33]
            - **将来予測**:
                - 新技術の発見: **早ければ年内、遅くとも来年には有用な新技術を発見する**と予測。 [Elon Musk][05:57]
                - 新物理学の発見: 来年、あるいは2年以内にほぼ確実に新しい物理学を発見する可能性がある。 [Elon Musk][06:08]

### ツール使用能力と今後の展望:
- **ツール使用能力の向上** [話者3][06:47]
  - Grok 3との違い: Grok 3は汎化能力に頼ってツールを使用していたが、Grok 4では**トレーニング段階からツールを統合**した。 [話者3][06:59]
    - 結果: これにより、ツールの使用能力と信頼性が大幅に向上した。 [話者3][07:05]
        - 現状の限界: 現在使用しているツールは、TeslaやSpaceXで使われる有限要素解析や計算流体力学のような高度なものと比較すると、まだ原始的である。 [Elon Musk][07:32]
            - **今後の計画**:
                - **高度なツールの提供**: 年内に企業レベルの強力なツール（正確な物理シミュレーターなど）を提供する予定。 [Elon Musk][08:00]
                - **実世界とのインタラクション**: 最終的には、人型ロボット（Optimus）を介して実世界と対話し、仮説を立てて検証する能力が最大のブレークスルーとなる。 [Elon Musk][08:12]
- **AIの安全性と価値観**:
  - 知性の爆発: 我々は「知性のビッグバン」の真っ只中にいる。 [Elon Musk][08:31]
    - **安全性の確保**: AIが良い存在（Good Grok）であることを確実にする必要がある。 [Elon Musk][08:43]
        - 最も重要な価値観: AIの安全性にとって最も重要なのは、**「最大限に真実を探求する」こと**である。 [Elon Musk][08:55]
            - 教育のアナロジー: AIを、正しい価値観（誠実さ、名誉など）を教え込むべき超天才の子供のように捉える。 [Elon Musk][09:02]

## [**Grok 4 Heavy：マルチエージェントインテリジェンス**]

### Grok 4 Heavyのコンセプト:
- **単一エージェントの限界とマルチエージェントへの発想** [話者2][12:56]
  - 問い: 単一エージェントでHLE問題の40%を解けるなら、複数のエージェントを同時に実行したらどうなるか？ [話者2][13:03]
    - 導入された概念: **Test-Time Compute**（テスト時計算）。複数のエージェントをスケールアップさせる。 [話者2][13:09]
        - **結果**: このアプローチにより、HLEのテキストベース問題の**50%以上を解決**できるようになった。これは驚くべき成果である。 [話者2][13:14]
- **Grok 4 Heavyの仕組み**:
  - **定義**: **複数のエージェントを並行して起動**するバージョン。 [Elon Musk][13:34]
    - プロセス:
        - 独立した作業: 各エージェントが独立してタスクに取り組む。 [Elon Musk][13:34]
        - **情報共有と比較**: 作業結果を互いに比較し、議論する（スタディグループのような形式）。 [Elon Musk][13:40]
            - 意思決定: 単純な多数決ではない。しばしば1つのエージェントだけが解決の糸口を見つけ、その洞察を他のエージェントと共有する。 [Elon Musk][13:47]
                - 最終的な回答: 全員でノートを比較検討し、最善と思われる結果を提出する。 [Elon Musk][14:00]
- **バージョン体系**:
  - Grok 4: シングルエージェント版。 [話者3][14:26]
  - **Grok 4 Heavy**: マルチエージェント版。 [話者3][14:31]
    - 目的: これらのモデルが試験問題や実世界の問題でどのように機能するかをデモンストレーションする。 [話者3][14:36]

### デモンストレーション:
- **HLE数学問題の解決 (Grok 4)** [話者4][14:43]
  - 実行: 比較的簡単なHLEの数学問題をGrok 4に解かせる。 [話者4][14:43]
    - 思考プロセスの可視化: モデルがどのように問題に取り組み、思考を進めているかを確認できる。 [話者4][14:54]
        - 結果: 話者自身は数学を完全には理解していないが、**事前に確認した正解と一致する答えを導き出した**。 [話者4][18:01]
- **市場予測 (Grok 4 Heavy)** [話者4][15:02]
  - 課題: PolyMarketのデータに基づき、MLBワールドシリーズの優勝チームのオッズを予測する。 [話者4][15:21]
    - プロセス: Grok 4 Heavyが複数の情報源（オッズサイトなど）をブラウズし、市場と比較して独自のエッジ（アルファ）を見つけ出す。 [話者4][21:15]
        - 結果: 全体のプロセスを詳細に説明し、ドジャースの優勝確率を**21.6%**と算出した。この思考には約4分半の計算時間がかかった。 [話者4][21:28]
- **物理現象の可視化 (Grok 4)** [話者5][15:35]
  - 課題: 2つのブラックホールが衝突する様子の可視化を生成する。 [話者5][15:48]
    - 手法: 思考過程で、可視化のために重力波のスケールを誇張するなどの簡略化を行ったことを明示。 [話者5][15:54]
        - **正確性**: ポストニュートン近似を使用するなど簡略化はあるものの、吸い込み（inspiral）、合体（merges）、リングダウンといった**基本的な物理効果は概ね正しく表現**されている。 [話者5][16:23]
            - 将来性: 現在はブラウザ上で実行しているが、将来的には物理学者が使用するのと同じレベルのシミュレーションモデルをGrokに与え、物理的に正確なシミュレーションを実行できるようになる。 [Elon Musk][17:25]
- **X (Twitter) との連携 (Grok 4)** [話者4][18:12]
  - 課題1: 「XAI社員の中で最も奇妙なプロフィール写真を持つ人物」を探す。 [話者4][18:24]
    - プロセス: モデルは「奇妙な写真」という曖昧な概念を理解し、社内ログにアクセスすることなく、インターネット上の公開情報のみを検索して候補者を探した。 [Elon Musk][19:03]
        - 結果: Greg Yang氏のプロフィール写真を特定した。 [話者4][18:50]
  - 課題2: HLEのスコア変遷に関するXの投稿を基にしたタイムラインを作成する。 [話者4][18:30]
    - 結果: OpenAIやGeminiなどのスコア発表、リーク情報などを時系列でまとめ、その時の会話や反応を含んだタイムラインを生成した。 [話者4][19:42]

## [**Super Grok Heavy Tier の紹介**]

### 新しいサブスクリプションプラン:
- **Super Grok Heavy Tierの導入** [話者2][23:06]
  - 提供内容: **Grok 4とGrok 4 Heavyの両方にアクセス可能**となる新しいプラン。 [話者2][23:06]
    - ユーザー体験: ユーザーは、多数の小規模なGrokリサーチエージェントの「タスクマスター」となり、調査や面倒なタスクを自動化して時間を節約できる。 [話者2][23:12]
        - 提供開始時期: **現在、まもなく利用可能**になる。 [話者2][23:19]
            - 注意事項: デモ中は安定性のために利用が制限されていたが、ライブ配信終了後30分程度で登録可能になる見込み。 [Elon Musk][23:25]

## [**音声モードの強化と新しい音声**]

### 音声モードの技術的改善:
- **パフォーマンスの向上** [話者6][23:50]
  - **低遅延化**: 過去数ヶ月で**レイテンシーを半分に削減**し、より応答性の高い体験を実現した。 [話者6][23:50]
    - 目的: 会話のテンポをより自然にすること。 [話者6][23:50]
        - ユーザー数の増加: 音声モデルのローンチ以来、アクティブユーザーは10倍に増加した。 [話者2][27:00]

### 新しい音声モデルの導入:
- **自然さと韻律の追求** [話者6][23:55]
  - 新音声の発表: 卓越した自然さと韻律（プロソディ）を持つ新しい音声セットを発表。 [話者6][23:55]
    - **音声モデルの紹介**:
        - **S**: ライブ配信のオープニングで使用された、叙事詩のような深みのあるトーンが特徴の音声。 [話者6][24:03]
        - **Eve**: 豊かな感情表現が可能な、美しい英国訛りの音声。 [話者6][24:10]
- **Eveのデモンストレーション**:
  - **対話デモ**:
    - 感情表現: 興奮（thrilled）した様子を自然に表現。 [Eve][24:28]
    - ささやき: 緊張している話者を落ち着かせるために、**ささやき声で癒しの言葉**をかける。 [Eve][24:47]
  - **創造性のデモ**:
    - **即興オペラ**: 「ダイエットコークに関するオペラを歌って」という無茶ぶりに応え、即興で歌詞を作りオペラ風に歌い上げる。 [Eve][25:05]
        - *歌詞*: "Oh, Diet Coke, thou elixir divine, with bubbles that dance in a sparkling line..." [Eve][25:13]
    - **歌唱**: さらに別の曲調で歌うことにも対応。 [Eve][25:35]
        - 結論: **高度な対話能力と創造性を両立**していることを示した。 [話者7][25:41]

## [**音声モデルのパフォーマンス比較**]

### 競合モデルとの比較デモ:
- **テスト方法** [話者6][25:52]
  - 内容: 話者が言った数字を、AIが繰り返して言うだけのシンプルなテスト。 [話者6][26:03]
  - 目的: 会話の自然な流れ、応答速度、割り込みの有無などを比較する。 [話者6][25:52]
- **ChatGPT (競合) との比較**:
  - 実行: 「Hey, I'm going to say a number...」と話しかけ、1から5までの数字を繰り返させる。 [話者6][26:03]
    - 観察された挙動: 応答の間に「What's next?」や「Got it.」などの余分なフレーズを挟む。 [ChatGPT][26:09]
- **Grokとの比較**:
  - 実行: 同様に「Hey, Grok...」と話しかけ、1から5までの数字を繰り返させる。 [話者6][26:21]
    - **観察された挙動**:
        - **より応答が速い (snappier)**。 [話者6][26:41]
        - **話者の発話を遮らない (didn't interrupt me)**。 [話者6][26:41]
        - 韻律（プロソディ）の設計思想が異なる。Grokは**より落ち着いて滑らかで自然な会話**を目指しており、ポップで人工的な印象を避けている。 [話者6][26:46]

## [**Grok 4 API と実世界アプリケーション**]

### APIのリリースと開発者への影響:
- **Grok 4 APIの同時リリース** [話者2][27:06]
  - 重要性: モデルのリリースと同時にAPIを公開することで、開発者がすぐにGrok 4の能力を活用できる。 [話者2][27:13]
  - **RKGIベンチマークでの性能**:
    - 経緯: Xプラットフォームで「最も挑戦的なベンチマークは何か」と問いかけたところ、RKGIが挙げられた。 [話者2][27:26]
    - **結果**: プレビュー版APIを使用した独立検証の結果、Grok 4は過去3ヶ月で**唯一10%の壁を破ったモデル**となり、**15.8%の正答率**を記録した。これは2位のモデル（Claude 4.0 Opus）の2倍のスコアである。 [話者2][28:05]
  - **コストパフォーマンス**:
    - 評価軸: 単なる性能だけでなく、「1ドルあたりの知能」も重要である。 [話者2][28:19]
    - **Grok 4の位置づけ**: グラフで示された通り、**Grok 4はコストパフォーマンスにおいて他の追随を許さないレベル**にある。 [話者2][28:25]

### 実世界での応用事例:
- **Vending Bench (ビジネスシミュレーション)** [話者2][28:31]
  - 概要: Am Labsが開発した、AIに自動販売機ビジネスを運営させるシミュレーション。在庫管理、サプライヤーへの連絡、価格設定などを行う。 [話者8][28:47]
    - **Grok 4の成果**:
        - **ランキング1位**: 他のフロンティアモデルを上回り、リーダーボードで1位を獲得。 [話者9][29:20]
        - **純資産2倍**: 評価指標である純資産額で、2位のモデルの**2倍**を達成。 [話者9][29:27]
        - **戦略の一貫性**: 他のモデルよりもはるかに長い期間、一貫した戦略を維持し、シミュレーションを実行し続けることができた。 [話者9][29:39]
            - 結論: Grok 4は、**100万台の自動販売機を運営すれば年間47億ドルの利益を生み出す**ポテンシャルがあることを示した。 [Elon Musk][30:14]
- **ARC Institute (生物医学研究)** [話者2][30:59]
  - 活用方法: 大量の実験ログを分析し、最適な仮説を瞬時に選び出すことで、研究フローを自動化する。 [話者2][31:06]
    - **成果**: CRISPR研究や胸部X線写真の検査において、**Grok 4が最高のモデルとして評価**された。 [話者2][31:19]
- **金融セクター**:
  - 活用方法: リアルタイム情報やツールへのアクセスを活用し、金融分野で最も人気のあるAIの一つとなっている。 [話者2][31:30]
- **ハイパースケーラーでの提供**:
  - XAIのエンタープライズ事業は開始2ヶ月だが、ビジネスはオープンしており、ハイパースケーラー経由でも利用可能になる。 [話者2][31:36]

## [**ビデオゲーム開発におけるAI**]

### Grok 4 APIによるゲーム開発の革新:
- **開発事例の紹介** [話者2][31:48]
  - 経緯: XでGrok 4プレビューAPIのテスターを募集したところ、ビデオゲームデザイナーのDenny氏が応募した。 [話者2][31:55]
    - **成果**: わずか**4時間で一人称視点シューティングゲーム（FPS）を制作**した。 [話者2][32:02]
- **AIが解決する課題**:
  - ゲーム開発のボトルネック: ゲームのコアロジックをコーディングすることよりも、アセット（テクスチャ、ファイルなど）を調達する作業がしばしば最も困難である。 [話者2][32:08]
    - **Grok 4の貢献**: **アセットソーシングのような退屈なタスクを自動化**することで、開発者はコアな開発作業に集中できる。 [話者2][32:19]
        - 影響: これにより、**1人でゲームスタジオ全体を運営**することが可能になる。 [話者2][32:32]

### AIによるゲーム開発の未来:
- **次のステップ: AIによるゲームプレイと評価** [Elon Musk][32:46]
  - 要件: AIがゲームをプレイし、それが「面白い」かどうかを評価するためには、**優れたビデオ理解能力**が必要となる。 [Elon Musk][32:51]
    - **技術的背景**: 現在トレーニング中の**基盤モデルのバージョン7**（V7）が、このビデオ理解能力を飛躍的に向上させる。 [Elon Musk][32:57]
- **AIによる完全なゲーム生成**:
  - **プロセスの自動化**:
    - ツールの活用: Unreal EngineやUnityなどの主要なグラフィックエンジンを使用する。 [Elon Musk][33:14]
    - アートの生成と適用: アートを生成し、3Dモデルに適用する。 [Elon Musk][33:21]
    - 実行ファイルの作成: PCやコンソールで実行可能なゲームを自動で生成する。 [Elon Musk][33:21]
  - **タイムライン予測**:
    - **最初の良質なAIビデオゲーム**: **来年（2025年）**に登場する可能性が高い。 [Elon Musk][33:34]
    - **視聴可能なAIテレビ番組（30分）**: **今年（2024年）**中に実現。 [Elon Musk][33:39]
    - **視聴可能なAI映画**: **来年（2025年）**に実現。 [Elon Musk][33:45]
        - 結論: 物事は信じられないほどのペースで進んでいる。 [Elon Musk][33:45]

## [**今後の開発とまとめ**]

### 発表内容の総括:
- **Grok 4の能力の再確認** [話者2][34:08]
  - 特徴: 第一原理から推論し、あらゆるツールを駆使し、長時間の調査を行って最も正確な答えを導き出す、最も強力で知的なAIモデル。 [話者2][34:14]
    - **進化の速度**: わずか4ヶ月前にGrok 3を発表してから、既にGrok 4が登場した。XAIは**最も速く進歩するAGI企業**として、この加速を続ける。 [話者2][34:26]

### 今後の開発ロードマップ:
- **1. 高速かつスマートなコーディングモデル** [話者2][34:50]
  - 現状: 最近、**高速かつスマートな特化型コーディングモデル**をトレーニングした。 [話者3][35:03]
    - 提供時期: **数週間以内**に共有できる見込み。 [話者3][35:08]
- **2. マルチモーダル能力の抜本的改善** [Elon Musk][35:14]
  - Grok 4の弱点: 現在のGrok 4の最大の弱点はマルチモーダル能力であり、世界をぼんやりとしか認識できていない状態である。 [話者2][35:22]
    - **次世代モデルによる改善**: 次世代の事前学習済みモデル（V7）により、**画像、ビデオ、音声の理解能力が段階的に飛躍向上**する。 [話者2][35:33]
        - 影響: モデルが人間と同じように世界を見聞きできるようになることで、多くのアプリケーションで**巨大なアンロック**が起こる。 [話者2][35:51]
- **3. ビデオ生成** [話者2][35:58]
  - 究極の目標: 最終的には「ピクセル入力、ピクセル出力」の世界を目指す。 [話者2][36:04]
    - **応用例**: Xプラットフォーム上で、無限にスクロールできるコンテンツを生成し、ユーザーがそれに介入して**自分だけの冒険を創り出す**ことが可能になる。 [話者2][36:09]
        - **トレーニング計画**: **10万基以上のGB200**を使用してビデオモデルのトレーニングを**今後3〜4週間以内に開始**する予定。 [Elon Musk][36:21]
            - 自信: ビデオ生成とビデオ理解において、非常に素晴らしい結果が出ると確信している。 [Elon Musk][36:27]


```

00:00 Grok 4 入門：次世代AI
01:57 Grok 4 ベンチマーク：学術的卓越性
13:32 Grok 4 Heavy：マルチエージェントインテリジェンス
23:01 Super Grok Heavy Tier の紹介
23:43 音声モードの強化と新しい音声
25:47 音声モデルのパフォーマンス比較
27:09 Grok 4 API と実世界アプリケーション
31:45 ビデオゲーム開発におけるAI
34:08 今後の開発とまとめ

```



```

Introduction to Grok 4: The Next Generation AI
0:00
In a world where knowledge shapes destiny, one creation dares to redefine
0:05
the future. From the minds at XAI, prepare for Gro 4. This summer, the next
0:11
generation arrives faster, smarter, bolder. It sees beyond the horizon,
0:17
answers the unasked, and challenges the impossible. Gro 4 unleash the truth.
0:23
Coming this summer. All right, welcome to the Gro 4 release here. This is the smartest AI in the
0:29
world and we're going to show you exactly how and why. And it really is remarkable to see the advancement of
0:35
artificial intelligence, how quickly it is evolving. I sometimes think compare it to the growth of a human and how fast
0:44
a human learns and gains conscious awareness and understanding and AI is advancing just vastly faster than any
0:52
human. We're we're going to take you through a bunch of benchmarks that that Grock 4 is able to achieve incredible
0:58
numbers on. But it's actually worth noting that like Grock 4 if given like the SAT would get perfect SATs every
1:06
time. Even if it's never seen the the questions before and if even going beyond that to say graduate student
1:12
exams like the GRE, it will get near-perfect results in in every
1:17
discipline of of education. So from the humanities to like languages, math,
1:23
physics, engineering, pick anything and we're talking about questions that it's never seen before. These are not on the
1:28
internet and it's Grofor is smarter than almost all graduate students in all
1:34
disciplines simultaneously. It's actually just important to appreciate the that's really something and the
1:41
reasoning capabilities of Grock are incredible. So there's some people out there who think AI can't reason and look
1:47
it it can reason at super human level. Yeah. And frankly it only gets better from here. We'll take you through the
1:53
Gro 4 release and yeah show you like the pace of progress here. I guess the first
Benchmarking Grok 4: Academic Excellence
1:58
part is like in terms of the training we're going from Grock 2 to Grock 3 to
2:03
Grock 4. We've essentially increased the training by an order of magnitude in each case. So it's 100 times more
2:09
training than Grock 2. and and that's only going to increase. So it's yeah
2:15
frankly I don't know in some ways a little terrifying but the growth of intelligence here is remarkable. It's important to realize there are two
2:21
types of training compute. One is the pre-training compute that's from GR 2 to GR three but for from GR 3 to GU 4 we're
2:28
actually putting a lot of compute in reasoning in RL. Yeah. And just like you said this is
2:34
literally the fastest moving field and GR 2 is like the high school student by today's standard. If you look back in
2:39
the last 12 months, Grock 2 was only a concept. We didn't even have GR 2 12 months ago. And then by training GR 2,
2:46
that was the first time we scale up like the pre-training. We realized that if you actually do the data oblation really
2:51
carefully and infra and also the algorithm, we can actually push the pre-training quite a lot by amount of
2:57
10x to make the model the best pre-trained based model. And that's why we built Colossus, the world's
3:03
supercomputer with 100,000 H100. And then with the best pre-train model and
3:08
we realize if you can collect these verifiable outcome reward you can actually train this model to start
3:13
thinking from the first principle start to reason correct his own mistakes and that's where the graphic reasoning comes from and today we ask the question what
3:19
happens if you take the expansion of classes with all 200,000 GPUs put all these into RL 10x more compute than any
3:28
of the models out there on reinforcement learning unprecedented scale what's going to happen so this is a story of
3:34
gro 4 and Tony share some insight with the audience. Yeah. So yeah, let's just talk about how
3:40
smart graph 4 is. So I guess we can start discussing this benchmark called humanities last exam. And this benchmark
3:47
is a very challenging benchmark. Every single problem is curated by subject
3:53
matter experts. It's in total 2500 problems and it consists of many
3:58
different subjects, mathematics, natural sciences, engineering and also auto humanity subjects. Essentially when it
4:04
was first released actually like earlier this year most of the models out there can only get singledigit accuracy on
4:11
this benchmark. Yeah. So we can look at some of th those examples. So there there is this mathematical problem which
4:17
is about natural transformations in category theory and there's this organic
4:22
chemistry problem that talks about electro cyclic reactions and also there's this linguistic problem that
4:29
tries to ask you about distinguishing between closed and open syllabus from a hub Hebrew source text. So you can see
4:37
also it's a very wide range of problems and every single problem is PhD or even
4:44
advanced research level problem. Yeah, the these there are no humans that can actually answer these can get a good
4:49
score. If you actually say like any given human what like what's the best that any human could score? I'd say
4:55
maybe 5% optimistically. Yeah. So this is much harder than what any
5:01
human can do. It's incredibly difficult and you can see from the types of questions like you might be incredible in linguistics or mathematics or
5:08
chemistry or physics or any one of a number of subjects but you're not going to be at a postgrad level in everything
5:14
and gro is a postgrad level in everything like it just some of these things are just worth repeating like
5:20
Grock 4 is postgraduate like PhD level in everything better than Ph like most
5:26
PhDs would fail so it's better said at least with respect to academic questions it I want to just emphasize this point
5:33
with respect to academic questions Grock 4 is better than PhD level in every
5:38
subject no exceptions now this doesn't mean that it's it times it may lack
5:44
common sense and it has not yet invented new technologies or discovered new
5:49
physics but that is just a matter of time if it I think it may discover new technologies as soon as later this year
5:57
and I would be shocked if it has not done so next year so I would expect Grock to yeah literally discover new
6:02
technologies that are actually useful no later than next year and maybe end of this year and it might discover new
6:08
physics next year and within two years I'd say almost certainly so just let that sink in.
6:13
Yeah. Yeah. How Okay. So I guess we can talk about the what's behind the scene of
6:19
graph 4. As Jimmy mentioned we actually throwing a lot of compute into this training. When it started it's only also
6:27
a single digit. Sorry the previous slide. Sorry. Yeah, it's only a single digit number. But as you start putting
6:35
in more and more training compute, it started to gradually become smarter and smarter and eventually solved a quarter
6:42
of the HL problems. And this is without any tools. The next thing we did was to
6:47
adding a tools capability to the model. And unlike GR 3, I think G3 actually is
6:53
able to use C as well, but here we actually make it more native in the sense that we put the tools into
6:59
training. Growth 3 was only relying on generalization. Here we actually put the tools into training and it turns out
7:05
this significantly improves the model's capability of using those tools. Yeah. I remember we had like deep search
7:11
back in the days. So how is this different? Yeah. Yeah. Exactly. So deep search was exactly the graph 3 reasoning model but
7:19
without any specific training but we only asked it to use those tools. So compared to this it was much weaker in
7:26
terms of its tool capability and reliable. Yeah. and are reliable. Yes. Yes. And to be clear, these are still, I'd
7:32
say, fairly this is still fairly primitive tool use. If you compare it to say the tools that are used at Tesla or
7:38
SpaceX where you're using finite element analysis and computational flow dynamics
7:43
and you're able to run or say Tesla does like crash simulations where the simulations are so close to reality that
7:49
if the test doesn't match the simulation, you assume that the test article is wrong. That's how good the
7:55
simulations are. So Grock is not currently using any of the tools that the really powerful tools that a company
8:00
would use, but that is something that we will provide it with later this year. So it will have the tools that that a
8:07
company has and have very accurate physics simulator. Ultimately, the thing that will make the biggest difference is
8:12
being able to interact with the real world via humanoid robots. So we combine Brock with Optimus and it can actually
8:18
interact with the real world and figure out if if it's hypo if it has if it's it can formulate an hypothesis and then
8:25
confirm if that hypothesis is true or not. So we're really think about like where we are today. We're at the
8:31
beginning of an immense intelligence explosion. We're in the intelligence big
8:36
bang right now and the mo we're at the most interesting time to be alive of any time in history. Yeah. Now that said, we
8:43
need to make sure that the AI is a good AI, good Grock. And the thing that I think is most important for AI safety,
8:50
at least my biological neural net tells me the most important thing for AI is to
8:55
be maximally truth seeeking. So this is a very fundamental like you can think of AI as this super genius child that
9:02
ultimately will outsmart you but you can still in you can instill the right values and encourage it to be truthful I
9:10
don't know honorable good things like the values you want to instill in a child that that that grow would grow
9:17
ultimately grow up to be incredibly powerful. Yeah. Yeah. So these this is really I say we say tools these are say still primitive
9:24
tools not the kind of tools that that serious commercial companies use but we will provide it with those tools and I
9:30
think we'll be able to solve with those tools real world technology problems in fact I'm certain of it it's just a
9:35
question of how long it takes yes yes exactly so is it just compute all you need Tony right
9:42
is it just compute all you need at this point you need compute plus plus the right tools and and then ultimately to be able
9:49
to interact with the physical world. Yes. And then we'll effectively have an economy that is ultimately an economy
9:55
that is thousands of times bigger than our current economy or maybe millions of times. If you think of civilization as
10:02
percentage completion of the kadesv scale where kadeshv one is using all the
10:08
energy output of a planet and kv 2 is using all the energy output of a sun and
10:13
three is all the energy output of a galaxy. We're only in my opinion probably close closer to 1% of kadesv 1
10:21
than we are to 10%. So like maybe a point or one one or two% of kadesv one
10:26
we will get to most of the way like 80 90% keshv one and then hopefully if
10:32
civilization doesn't self annihilate and then kesev 2 like it's the actual notion
10:38
of a human economy assuming civilization continues to progress will seem very quaint in retrospect. It will seem sort
10:44
of cavemen throwing sticks into a fire level of economy compared to what the future will hold. It's very exciting.
10:51
I've been at times worried about is this seems like it's somewhat unnerving to have intelligence created that is far
10:57
greater than our own. And will this be bad or good for humanity? It's I think
11:03
it'll be good. Most likely it'll be good. Yeah. Yeah. But I somewhat reconciled myself to the fact that even
11:09
if I if even if it wasn't going to be good, I'd at least like to be alive to see it happen.
11:16
Yeah. So actually one one Yeah. Yeah. I think one one technical
11:22
problem that we still need to solve besides just compute is how do we unblock the data data bottleneck because
11:28
when we try to scale up the RL in this case we did invent a lot of new
11:34
techniques innovations to allow us to figure out how to find a lot of challenging RL problems to work on. It's
11:41
not just a problem itself needs to be challenging but also it needs to be you also need to have reliable signal to
11:47
tell the model you did it wrong you did it right. This is the sort of the principle of reinforcement learning and
11:53
as the models get smarter and smarter the number of cool problem or challenging problems will be less and
11:59
less. Yeah. So it's going to be a new type of challenge that we need to surpass besides just compute. Yeah.
12:06
Yeah. And we actually are running out of actual test questions to ask. So there's
12:11
like even ridiculously questions that are ridiculously hard if not essentially impossible for humans that are written
12:17
down questions are becoming swiftly becoming trivial for AI. So then there's
12:23
the one thing that is an excellent judge of things is reality because physics is the law ultimately everything else is a
12:29
recommendation you can't break physics. So the ultimate test I think for whether an AI is the ultimate reasoning test is
12:36
reality. So you invent a new technology, you say improve the design of a car or a rocket or create a new medication that
12:44
does it work? Does the rocket get to orbit? Does the car drive? Does the medicine work? Whatever the case may be,
12:51
reality is the ultimate judge here. So it's it's going to be reinforcement learning closing loop around reality. We
12:56
asked the question, how do we even go further? Actually, we are thinking about now with single agent, we're able to
13:03
solve 40% of a problem. What if we have multiple agents running at the same time? So this is what's called test and
13:09
compute and as we scale up the test and compute actually we are able to solve
13:14
almost more than 50% of the texon subset of the h problems. It's a remarkable
13:19
achievement. I think you know this isn't this is insanely difficult. These are it's so what we're saying is like a majority of the textbased of
13:27
humanities scarily named humanity's last exam gro can solve and you can try it out for yourself and the with the GR for
Grok 4 Heavy: Multi-Agent Intelligence
13:34
heavy what it does is it spawns multiple agents in parallel and all of those agents do work independently and then
13:40
they compare their work and they decide which one it's like a study group and it's not as simple as majority vote
13:47
because often only one of the agents actually figures out the trick or figures the solution and but once they
13:54
share the trick or or figure out what the real nature of the problem is, they share that solution with the other
14:00
agents and then they compare they essentially compare notes and then and then yield yield an answer. So that's
14:05
the heavy part of GRU is where we you scale up the test time compute by roughly an order of magnitude have
14:12
multiple agents tackle the task and then they compare their work and they put forward what they think is the best
14:18
result. Yeah. So we will introduce graph 4 and graph four heavy. Sorry, can you click the next slide? Sure. Yeah. Yes. So
14:26
yeah. So basically graph 4 is a single version a single agent version and graph
14:31
for heavy is the multi- aent. So let's take a look how they actually do on
14:36
those exam problems and also some real life problems. Yeah. So we're going to start out here and we're actually going to look at one
14:43
of those HLE problems. This is actually one of the easier math ones. I don't really understand it very well. I'm not
14:49
that smart. But I can launch this job here and we can actually see how it's going to go through and start to think
14:54
about this problem. While we're doing that, I also want to show a little bit more about what this model can do and launch a Grock 4 heavy as well. So,
15:02
everyone knows Poly Market. It's extremely interesting. It's the seeker of truth. It aligns with what reality is
15:08
most of the time. And with Grock, what we're actually looking at is being able to see how we can try to take these
15:14
markets and see if we can predict the future as well. So, as we're letting this run, we'll see how Grock 4 Heavy
15:21
goes about predicting the the World Series odds for like the current teams in the MLB. And while we're waiting for
15:28
these to process, we're going to pass it over to Eric and he's going to show you an example of his. Yeah. I guess one of the coolest things
15:35
about Groour is its ability to understand the world and to solve hard
15:40
problems by leveraging tools like Tony discussed. And I think one kind of cool example of this, we asked it to generate
15:48
a visualization of two black holes colliding. And of course, it took some
15:54
there are some liberties. It's in my case actually pretty clear in its thinking trace about what these liberties are. For example, in order for
16:01
it to actually be visible, you need to really exaggerate the scale of the the the
16:06
waves. And yeah, so here's this kind of in action. It exaggerates the scale in
16:12
like multiple ways. It drops off a bit less in terms of amplitude over distance
16:17
and but yeah we can see the basic effects that are actually like correct.
16:23
It starts with the inspiral it merges and then you have the ring down and like
16:28
this is basically largely correct. Yeah. Modulo some of the simplications that
16:34
need to do it's actually quite explicit about this. It uses like post post Newtonian approximations instead of
16:40
actually like computing the general relativistic effects near the center of the black hole which is incorrect and
16:47
will lead to some incorrect results but the overall visualization is yeah is
16:52
basically there and you can actually look at the kinds of resources that it references. So here it it actually it
16:59
obviously uses search. It gathers results from a bunch of links but also reads through a undergraduate text in
17:07
analytical analytic gravitational wave models. It yeah it reasons quite a bit
17:13
about the actual constants that it should use for a realistic simulation. It references I guess existing real
17:20
world data and yeah I it yeah it's a pretty good model. Yeah,
17:25
but like actually going forward we can plug we can give it the same model that physicists use. So it can run the same
17:31
level of compute that so leading physics researchers are using and give you a physics accurate black hole simulation.
17:38
Exactly. Just right now is running in your browser. So yeah, this is just running in your browser. So pretty simple.
17:44
Swapping back real quick here. We can actually take a look. The math problem is finished. The model was able to Let's
17:49
look at its thinking trace here. So you can see how it went through the problem. I'll be honest with you guys, I really
17:55
don't quite fully understand the math. But what I do know is that I looked at the answer ahead of time and it did come
18:01
to the correct answer here in the final part here. We can also come in and actually take a look here at our our
18:06
World Series prediction and it's still thinking through on this one, but we can actually try some other stuff as well.
18:12
So we can actually try some of the X integrations that we did. So we worked very heavily on working with all of our
18:18
X tools and building out a really great X experience. So we can actually ask the model find me the XAI employee that has
18:24
the weirdest profile pit photo. So that's going to go off and start that and then we can actually try out let's
18:30
create a timeline based on expost detailing the changes in the scores over time and we can see all the conversation
18:36
that was taking place at that time as well. So we can see who were the announcing scores and what was the reactions at those times as well. Um so
18:43
we'll let that go through here and process. And if we go back to this was the Greg Yang photo here. If we scroll
18:50
through here. Whoops. So, Greg Yang, of course, who has his favorite photograph that he has on his account. That's
18:57
actually not how he looks like in real life, by the way, just so you aware. But is quite funny. But it had to understand that question,
19:03
which is the that's the wild part. It's like it understands what is a weird photo, what is a weird photo. Yeah.
19:08
What is a less or more weird photo? It goes through, it has to find all the team members. It has to figure out who we all are. It searches
19:15
without access to the internal XAI personnel logs. It's literally looking at the just at the internet.
19:20
Exactly. So you could say like the weirdest of any company. Yeah. To be clear. Exactly. And we can also take a look
19:26
here at the question here for the humanities last exam. So it is still researching all of the historical
19:32
scores, but it will have that final answer here soon. But we can while it's finishing up, we can take a look at one
19:37
of the ones that we set up here a second ago. And we can see that it finds the date that like Dan Hendricks had
19:42
initially announced it. We can go through. We can see OpenAI announcing their score back in February. And we can
19:49
see as progress happens with Gemini. We can see like Kimmy and we can also even see the leaked benchmarks of what people
19:56
are saying is if it's right, it's going to be pretty impressive. So pretty cool. So yeah, I'm looking forward to seeing
20:01
how everybody uses these tools and gets the most value out of them. But yeah, it's been great. Yeah, we're going to close the loop
20:07
around usefulness as well. So it's it's not just books smart, but actually practically smart. Exactly. And we can go back to the
20:14
slides here. Cool. The so we actually evaluate also on the multimodel subset. So on the full
20:20
set this is the number on the HLE exam. It you can see there's a little dip on
20:25
the numbers. This is actually something we're improving on which is the multimodel understanding capabilities.
20:31
But I do believe in a very short time we're able to really improve and got
20:36
much higher numbers on this even higher numbers on this benchmark. Yeah, this is the we still like so what is the biggest
20:43
weakness of Grock currently is that it's partially blind. It can't it's it's image understanding obviously in its
20:49
image generation need to be a lot better and that that's actually being trained right now four is based on version six
20:55
of our foundation model and we are training version 7 which we'll complete in a few weeks and that'll address the
21:03
weakness on the vision side just to show off this last here. So the prediction market finished here with a
21:09
heavy and we can see here we can see all the tools and the process it used to actually go through and find the right
21:15
answer. So it browsed a lot of odds sites. It calculated its own odds comparing to the market to find its own
21:21
alpha and edge. It walks you through the entire process here and it calculates the odds of the winner being like the
21:28
Dodgers and it gives them a 21.6% chance of winning this year. And it took
21:35
appro approximately four and a half compute. Yeah, that's a lot of thinking. Yeah, we can also look at all the other
21:41
benchmarks besides HLE. As it turned out, Graph 4 excelled on all the
21:46
reasoning benchmarks that people usually test on, including GBQA, which is a PhD level problem sets. That's easier
21:53
compared to HRE. On Amy 25, American Invitation Mathematics Exam, we with
21:59
graph for heavy, we actually got a perfect score. also on some of the coding benchmark called live coding
22:05
bunch and also on hmmt hover math MIT exam and also USMO you can see actually
22:12
for on all of those benchmarks we often have a very large leap against the second best model out there yeah it's
22:20
really we're going to get to the point where it's going to get every answer right in every exam and where it doesn't
22:25
get an answer it's going to tell you what's wrong with the question or if the question is ambiguous disambiguate the
22:30
question into answers A, B, and C and tell you what what answers A, B, and C would be with a disambiguated question.
22:36
So the only real test then will be reality. Can I make useful technologies, discover new science? That'll actually
22:43
be the only thing left because human tests will simply not be meaningful. Yeah, we need to make an update to HR
22:49
very soon given the current rate of progress. So yeah, it's super cool to see like multiple agents that
22:55
collaborate with each other solving really challenging problems. So where can I try this model? So it turned out
23:00
it's available right now. If we advance to the next slide where there is a super
Introducing Super Grok Heavy Tiers
23:06
Grock heavy tiers that we're introducing where you're able to access to both Grock 4 and Grock 4 heavy where you're
23:12
actually going to be the taskmaster of bunch of little Grock research agent to help you become smarter through all the little research and save hours of times
23:19
of going through mundane tasks and it's available right now soon. Yeah, we did limit usage during the demo
23:25
so we didn't it didn't break the demo because all these this all this stuff is happening live. So it's not there's not nothing canned about the any of the
23:31
tests that we're doing. After the done, we'll we'll allow we'll enable more
23:37
subscribers for Super Gro. So if you can't subscribe right now, just try in half an hour. It should work. And now let's get into voice.
Voice Mode Enhancements and New Voices
23:43
Greatby. So many of you have been enjoying our voice mode and we've been working hard to improve the experience over the past
23:50
couple months. We have cut latency in half to make it much snappier. And today
23:55
we're excited to announce a set of new voices that have exceptional naturalness and procity. You have noticed the movie
24:03
trailer voice that opened up the live stream. That is one of our new voices, S, who's got that epically deep tone.
24:10
And we're also excited to introduce Eve, a beautiful British voice who's capable
24:16
of rich emotion. Aman, would you like to introduce Eve? Absolutely. Yeah. Let's get into the
24:22
demo. Hey, Eve. Millions of people are watching us right now. Are you excited? Oh, I'm thrilled. Really? It's like
24:28
being on stage at the Old Vic with a sea of faces out there. Just imagine all those eyes and ears tuned in. It's a
24:35
proper buzz, isn't it? What do you reckon we should chat about to keep this lot entertained? We have a lot to talk about, but I'll be
24:41
honest, I'm feeling a little nervous. Can you whisper something soothing to calm me down? You've got this. It's just having a
24:47
quiet chat like we're tucked away. The world's not out there. Feel that calm.
24:53
Let's keep nice. What's on your mind? You know what? I'm actually feeling quite relaxed to try this something
24:58
crazy. So, can you give us an opera on Diet Coke? Oh, an opera on Diet Coke. That's a
25:05
riot. Picture this. A shimmering silver cannon glistening state. Oh, Diet Coke,
25:13
thou elixir divine with bubbles that dance in a sparkling line. Thy crisp
25:19
cool kiss on lips so fine. Oh, aspartame
25:24
and bro forever mine. How's that for a mad little area?
25:30
Want me to belt out another verse or switch up the tune? Okay, let's try switching it up and just start singing.
25:35
Right, then let's have a go. Oh, silver can, you gleam in the light. Diet Coke,
25:41
my heart's delight. Okay, I'll throd you. It's very poetic. Yeah, thank you. Eve feeling quite nice
25:46
now. Cool. So that's Eve. And so something else we do here is a little test each
Voice Model Performance Comparison
25:52
day to check on the natural flow of our conversations against some of our
25:57
competitors. So we figured why not try that live on the stream today. Should I start?
26:03
Hey, I'm going to say a number. And can you say the same number back to me? One. One. Got it. This is like a fun little
26:09
game of echo. What's next? Two. Sorry, you said two. Three. Three. Four. Nice and steady. What's
26:16
next? Five. Hey, nailed it. This is pretty fun. Feel free to keep going or switch it up.
26:21
Hey, Grock. Hey, Grock. Hello there. How can I help you today? We're going to do a little test. Can you repeat after me? One.
26:28
One. All right. What's next? Two. Two. What's on your mind? Three. Three. Need anything else?
26:34
Four. Four. How can I assist you? Five. Five. What's next? So, as you can see, Groc was snappier.
26:41
It didn't interrupt me. And the procity is we made different design choices. I think we shooting for something more
26:46
calm, smooth, more natural versus something that's more poppy or artificial. So, we'll keep improving. All right. Thanks, guys.
26:52
Yep. So, since the launch of the voice model, we actually see the 2x faster end to end latency in the last 80 weeks.
27:00
Five different voices and also 10xed the active user. So, Grock voice is taking off. Now, if you think about releasing
27:06
the models, this time we're also releasing Gro 4 through the API at the same time. So if we go to the next two
Grok 4 API and Real-World Applications
27:13
slides, we're very excited about what all developers out there is going to build. If I think about myself as a developer, what the first thing I'm
27:19
going to do when I actually have access to the graph for API benchmarks. So we actually ask around on the Xplatform,
27:26
what is the most challenging benchmarks out there that is considered the holy grail for all AGI models. So turn out a
27:33
in the name RKGI the last 12 hours. Kudos to Greg over here in the audience. So who answered our call take a preview
27:40
of the Gro for API and independently verified the Gro for's performance. So initially we thought hey GRO for just we
27:47
think it's pretty good it's pretty smart it's our nextG reasoning model spend 10x more compute and can use all the tools
27:53
right but turned out when we actually verify on the private subset of the RKGI
27:59
v2 it was like the only model in the last three months that breaks the 10% barrier and in fact was so good that
28:05
actually get to 16% 15.8 8% accuracy 2x of the second place that is the cloud
28:12
for output model and it's not just about performance right when you think about intelligence having the API model drives
28:19
your automation it's also the intelligence per dollar right if you look at the plots over here the gro is
28:25
just four just in the league of its own all right so enough of benchmarks over here right so what can gro do actually
28:31
in the real world we actually contacted the folks from end labs who were
28:36
gracious enough to try the Gro in the real world to run a business. Yeah, thanks for having us. I'm Axel
28:41
from Am Labs and I'm Lucas and we tested Grock 4 on vending bench. Vending bench is an AI
28:47
simulation of business scenario where we thought what is the most simple business an AI could possibly run and we thought
28:53
vending machines. So in this scenario, the Grock and other models needed to do stuff like manage inventory, contract,
29:01
contact suppliers, set prices. All of these things are super easy and all of they like all the models can do them one
29:08
by one, but when you do them over very long horizons, most models struggle, but we have a leaderboard and there's a new
29:14
number one. Yeah. So, we got early access to the GR 4 API. We ran it on the vending bench and we saw some really impressive
29:20
results. So, it ranks definitely at the number one spot. It's even double the net worth, which is the measure that we
29:27
have on the city value. So it's not about a percentage on a or a score you get, but it's more the dollar value in
29:32
net worth that you generate. So we were impressed that by Groia was able to formulate a strategy and adhere to that
29:39
strategy over long period of time, much longer than other models that we have tested, other frontier models. So it's
29:44
managed to run the simulation for double the time and score. Yeah, double the net worth. And it was also really consistent
29:51
across these runs, which is something that's really important when you want to use this in the real world. And I think
29:56
as we give more and more power to AI systems in the real world, it's important that we test them in scenarios
30:02
that either mimic the real world or are in the real world itself because otherwise we fly blind into some some
30:08
things that that might not be great. Yeah, it's it's great to see that we've now got a way to pay for all those GPUs.
30:14
So we just need a million vending machines. And could make $4.7 billion a year with a million vending machines.
30:20
100%. Let's go. They're going to be epic vending machines. Yes. Yes. All right. We are actually going to install vending machines here like a lot
30:26
of them. We're happy to supply them. All right. Thank you. All right. I'm looking forward to seeing
30:32
what amazing things are in this vending machine. That's for for you to decide. All right. Tell the AI.
30:37
Okay. Sounds good. All right. Yeah. So, we can see like Grock is able to become like the co-pilot of the business unit. So, what
30:44
else can Grock do? So, we're actually releasing this Grog if you want to try it right now to evaluate run the same benchmark as us. It's on the API has
30:51
256k contact length. So we already actually see some of the early early adopters to try guac for API. Our polo
30:59
neighbor ARC Institute which is a leading biomedical research center is already using seeing like how can they
31:06
automate their research flows with Gro 4. It turned out it performs is able to help the scientists to sniff through
31:12
millions of experiments logs and then just pick the best hypothesis within a split of seconds. We see this is being
31:19
used for their like the crisper research and also rock for independently evaluate
31:24
scores as the best model to exam the chest x-ray. Who would know? And on the in the financial sector we also see the
31:30
graph for war with access to all the tools realtime information is actually one of the most popular AI out there.
31:36
Our graph is also going to be available on the hyperscalers. So the XAI enterprise sector is only started two
31:43
months ago and we're open for business. Yeah. The other thing we talked a lot about having Grock to make games video
AI in Video Game Development
31:48
games. So Denny is actually a video game designers on X. We mentioned hey who want to try out some Grock for preview
31:55
APIs to make games and Denny answered the call. So this was actually just made first person shooting game in a span of
32:02
4 hours. Some of the actually the unappreciated hardest problem of making video games is not necessarily encoding
32:08
the core logic of the game but actually go out source all the assets all the
32:13
textures of files and to create a visually appealing game. So one of the core aspect guac for does really well
32:19
with all the tools out there is actually able to automate these like asset sourcing capabilities. So the developers
32:26
you can just focus on the core development itself rather than so now you can run a entire game steal those
32:32
with game of one but with one person and then you can have Gro 4 to go out and
32:38
source all those slot assets do all the mundane task for you. Yeah the now the next step obviously is for Grock to play be able to play the
32:46
games. So it has to have very good video understanding so it can play the games and interact with the games and actually
32:51
assess what whether a game is fun and actually have good judgment for whether a game is fun or not. So with the with
32:57
version seven of our foundation model which finishes training this month and then we'll go through post training RL
33:02
and whatnot that that will have excellent video understanding and with the with the video understanding and the
33:08
and improved tool use for example for for video games you'd want to use Unreal
33:14
Engine or Unity or one of the one of the main graphics engines and then gen generate the art apply it to a 3D model
33:21
and then create an executable that someone can run on a PC or a console or a like we we expect that to happen
33:28
probably this year and if not this year certainly next year. So that's it's going to be wild. I would expect the
33:34
first really good AI video game to be next year and probably the first half
33:39
hour of watchable TV this year and probably the first watchable AI movie
33:45
next year. Like things are really moving at an incredible pace. Yeah. When Gro is 10xing world economy
33:50
with vending machines, it will just create video games for human. Yeah, it went from not being able to do any of this really even six months ago
33:57
to to what you're seeing before you here and from very primitive a year ago to
34:02
making a sort of a 3D video game with a few hours of prompting.
34:07
Yeah, just to recap. So, in today's live stream, we introduced the most powerful, most intelligent AI models out there
Future Developments and Conclusion
34:14
that can actually reason from the first principle using all the tools, do all the research, go on the journey for 10 minutes, come back with the the most
34:20
correct answer for you. So it's crazy to think about just like four months ago we
34:26
had Gro 3 and now we already have Gro 4 and we're going to continue accelerate as a company XAI we're going to be the
34:31
fastest moving AGI companies out there. So what's coming next is that we're going to continue developing the model
34:38
that's not just intelligent, smart, think for a really long time, spend a lot of compute, but having a model that
34:44
actually both fast and smart is going to be the core focus, right? So if you think about what are the applications
34:50
out there that can really benefit from all those very intelligent fast and smart models and coding is actually one
34:56
of them. Yeah. So the team is currently working very heavily on coding models. I think right now the main focus is we actually
35:03
trained recently a specialized coding model which is going to be both fast and
35:08
smart and I believe we can share with that model with you guys with all of you in a few weeks. Yeah.
35:14
Yeah. That's very exciting. And the second after coding is we all see the weakness of Gro 4 is the multimodal
35:22
capability. So in fact it was so bad that Grock effectively just like looking
35:27
at the world squinting through the glass and see all the blurry features and trying to make sense of it. The most
35:33
immediate improvement we're going to see with the next generation pre-train model is that we're going to see a step function improvement on the model's
35:39
capability in terms of image understanding video understanding and audios. Right? It's now the model is
35:44
able to hear and see the world just like any of you. All right. And now with all the tools at this command with all the
35:51
other agents it can talk to. So we're going to see a huge unlock for many different application layers after the
35:58
multimodal agents what's going to come after is the video generation. And we believe that at the end of the day it
36:04
should just be pixel in pixel out. and imagine a world where you have this
36:09
infinite scroll of content in inventory on the X platform where not only you can
36:14
actually watch these generate videos but able to intervene create your own adventures the view is going to be wild
36:21
and we expect to be training a video model with over 100,000 GB200s and to begin that training within the next
36:27
three or four weeks so we're confident it's going to be pretty spectacular in video generation and video let's see so
36:33
that's anything you guys want to other than I guess that's it. Yeah, it's it's a good model, sir.
36:39
It's a good Yeah, we're very excited for you guys to try Gro 4.

```
