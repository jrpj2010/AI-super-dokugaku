// AI超独学 50のTipsデータ
const tipsData = [
  // 第1章: 思考整理とAIの基本活用（Tips 01-10）
  {
    id: "01",
    number: 1,
    chapter: 1,
    title: "ごちゃごちゃな頭の中を、AIに話すだけでスッキリ整理する「最初の感動」体験術",
    targetAudience: [
      "AIに初めて触れる方",
      "やることが多くて何から手をつければいいか分からないと感じているすべての人"
    ],
    universalPrompt: {
      template: `あなたは私の思考を整理してくれる、親切なアシスタントです。
これから私が話す、まとまりのない思考やタスクを受け止め、今日私が集中すべきことを3つだけ教えてください。

私の頭の中は、今こんな感じです…
「{{userThoughts}}」`,
      variables: [
        {
          name: "userThoughts",
          placeholder: "明日のプレゼン資料も作らなきゃだし、来週の会議の準備もある。あ、経費の精算も溜まってるんだった…",
          description: "今の頭の中の状態"
        }
      ]
    },
    benefits: "わずか10分AIと対話するだけで、その日1日の行動計画が驚くほど明確になります。"
  },
  {
    id: "02",
    number: 2,
    chapter: 1,
    title: "長いWeb記事をAIに要約させ、「タイパ」が爆上がりする体験術",
    targetAudience: [
      "情報収集に時間をかけたくない、かけられないと感じている方",
      "AIの基本的な能力を手軽に試してみたい方"
    ],
    universalPrompt: {
      template: `この記事の要点を3行で教えてください。
{{articleUrl}}`,
      variables: [
        {
          name: "articleUrl",
          placeholder: "[ここに記事のURLを貼り付ける]",
          description: "要約したい記事のURL"
        }
      ]
    },
    benefits: "情報収集の効率が劇的に向上し、「タイパ（タイムパフォーマンス）」が爆上がりする快感を味わえます。"
  },
  {
    id: "03",
    number: 3,
    chapter: 1,
    title: "AIを「あなただけの情報収集アシスタント」に任命し、毎朝のニュースチェックを自動化する術",
    targetAudience: [
      "業界の最新情報を追いかけたいが、忙しくてニュースを読む時間がない方",
      "情報収集を効率化する第一歩を踏み出したい方"
    ],
    universalPrompt: {
      template: `あなたは私の専属リサーチャーです。
私の専門分野である「{{specialtyField}}」について、この1週間で最も重要なニュースを3つにまとめてください。
特に「{{focusKeywords}}」の動きに注目してください。`,
      variables: [
        {
          name: "specialtyField",
          placeholder: "[あなたの専門分野]",
          description: "専門分野や業界"
        },
        {
          name: "focusKeywords",
          placeholder: "[注目したいキーワードや会社名]",
          description: "特に注目したいキーワード"
        }
      ]
    },
    benefits: "業界の最新動向や競合の動きを、最小限の時間でキャッチアップできます。"
  },
  // 第1章の残り (Tips 04-10)
  {
    id: "04",
    number: 4,
    chapter: 1,
    title: "AIを「議事録の書き起こしマスター」にして、会議の記録作業から解放される術",
    targetAudience: [
      "会議が多く、議事録作成に時間を取られているビジネスパーソン",
      "チームリーダー、プロジェクトマネージャー"
    ],
    universalPrompt: {
      template: `あなたは優秀な議事録作成担当者です。
この会議の録音データを基に、以下の形式で議事録を作成してください。

1.  **会議の目的と結論**
2.  **決定事項（箇条書き）**
3.  **アクションアイテム（誰が・何を・いつまでに）**
4.  **次回の議題**
5.  **参考情報やリンク**

{{meetingData}}`,
      variables: [
        {
          name: "meetingData",
          placeholder: "[ここに会議の録音データやテキストを貼り付ける]",
          description: "会議の録音データやテキストデータ"
        }
      ]
    },
    benefits: "議事録作成にかかる時間が90%削減され、会議直後に参加者全員で認識を合わせられます。"
  },
  {
    id: "05",
    number: 5,
    chapter: 1,
    title: "GmailやGoogleドライブにいるAIに「あの件どうだっけ？」と聞くだけで、情報を一瞬で探し出す術",
    targetAudience: [
      "「あのファイル、どこに保存したかな？」と情報を探すのに時間を費やしている方"
    ],
    universalPrompt: {
      template: `@gmail @docs
「{{projectName}}」に関するこの1ヶ月のやり取りと、大事な決定事項をまとめて。`,
      variables: [
        {
          name: "projectName",
          placeholder: "[プロジェクト名]",
          description: "検索したいプロジェクトや件名"
        }
      ]
    },
    benefits: "必要な情報を探す時間が劇的に短縮され、過去の経緯や文脈を瞬時に把握できます。"
  },
  {
    id: "06",
    number: 6,
    chapter: 1,
    title: "AI先生に文章を添削してもらい、ビジネスメールの苦手意識を克服する術",
    targetAudience: [
      "自分が書いたメールの文章が失礼ではないか不安に感じる方"
    ],
    universalPrompt: {
      template: `この文章を、もっとプロフェッショナルで、丁寧な表現に書き換えてください。
改善案だけでなく、なぜそのように修正したのか理由も教えてください。

{{textToEdit}}`,
      variables: [
        {
          name: "textToEdit",
          placeholder: "[ここに添削してほしい文章を貼り付ける]",
          description: "添削してほしいメールや文章"
        }
      ]
    },
    benefits: "ビジネスコミュニケーションの質が向上し、相手に与える印象が良くなります。"
  },
  {
    id: "07",
    number: 7,
    chapter: 1,
    title: "専門用語や社内用語を、AIに「通訳」させて誰にでも伝わる言葉にする術",
    targetAudience: [
      "専門用語を使ってしまい他部署の人やお客様との会話が噛み合わない方"
    ],
    universalPrompt: {
      template: `この文章を、{{targetAudience}}の{{targetName}}さんにも分かるように、専門用語や社内用語を一切使わずに書き換えてください。
具体的な例を挙げて説明してくれると助かります。

{{originalText}}`,
      variables: [
        {
          name: "targetAudience",
          placeholder: "[相手の役職や知識レベル]",
          description: "相手の役職や知識レベル"
        },
        {
          name: "targetName",
          placeholder: "[相手の名前]",
          description: "相手の名前"
        },
        {
          name: "originalText",
          placeholder: "[ここに書き換えたい文章を貼り付ける]",
          description: "書き換えたい元の文章"
        }
      ]
    },
    benefits: "専門知識がない相手にも複雑な内容を正確かつ分かりやすく伝えることができます。"
  },
  {
    id: "08",
    number: 8,
    chapter: 1,
    title: "Word文書をAIに渡すだけで、PowerPoint資料を自動で作成させる術",
    targetAudience: [
      "Wordで作った報告書を手作業でパワポに作り直すのが面倒だと感じている方"
    ],
    universalPrompt: {
      template: `このWord文書から、プレゼンテーション資料を作成してください。
各スライドには、発表者用のメモも提案してください。

{{wordContent}}`,
      variables: [
        {
          name: "wordContent",
          placeholder: "[ここにWord文書のテキストを貼り付けるか、ファイルを指定する]",
          description: "Word文書の内容またはファイル"
        }
      ]
    },
    benefits: "報告書からプレゼン資料を作る時間が劇的に短縮され、より本質的な仕事に集中できます。"
  },
  {
    id: "09",
    number: 9,
    chapter: 1,
    title: "パワポでAIに「いい感じの図」を作ってもらい、資料を分かりやすくする術",
    targetAudience: [
      "デザインセンスに自信がないが図やイラストで分かりやすく表現したい方"
    ],
    universalPrompt: {
      template: `「{{concept1}}」「{{concept2}}」「{{concept3}}」の3つが相互に関連し合い、成長していく様子を、{{designStyle}}なイラストで作成してください。`,
      variables: [
        {
          name: "concept1",
          placeholder: "[コンセプト1]",
          description: "関連する概念1"
        },
        {
          name: "concept2",
          placeholder: "[コンセプト2]",
          description: "関連する概念2"
        },
        {
          name: "concept3",
          placeholder: "[コンセプト3]",
          description: "関連する概念3"
        },
        {
          name: "designStyle",
          placeholder: "[希望のデザインの雰囲気]",
          description: "希望するデザインの雰囲気"
        }
      ]
    },
    benefits: "デザインの専門知識がなくても、プロ並みで分かりやすい図やイラストを作成できます。"
  },
  {
    id: "10",
    number: 10,
    chapter: 1,
    title: "移動中にひらめいたアイデアを、AIに話すだけで「構造化メモ」に残す術",
    targetAudience: [
      "移動中など良いアイデアが浮かぶがすぐに忘れてしまう方"
    ],
    universalPrompt: {
      template: `今からアイデアの壁打ちをします。
{{ideaContent}}

今の話を基に、提案のポイント、考えられるリスク、今日中にやるべきことを箇条書きでまとめてください。`,
      variables: [
        {
          name: "ideaContent",
          placeholder: "[ここに、ひらめいたアイデアを自由に話す]",
          description: "ひらめいたアイデアの内容"
        }
      ]
    },
    benefits: "いつでもどこでも、ひらめきを即座に価値あるメモとして記録できます。"
  },
  
  // 第2章: インプット効率化（Tips 11-25）
  {
    id: "11",
    number: 11,
    chapter: 2,
    title: "AIを「壁打ち相手」にして、一人では思いつかないアイデアを引き出す術",
    targetAudience: [
      "一人で考え事をしていると、いつも同じような結論になってしまう方"
    ],
    universalPrompt: {
      template: `あなたは{{expertRole}}です。
これから私が考える{{projectTheme}}について、壁打ち相手になってください。
目的は{{projectGoal}}です。

私のアイデアは「{{myIdea}}」ですが、{{concern}}です。他にどんな方法が考えられますか？`,
      variables: [
        {
          name: "expertRole",
          placeholder: "経験豊富な企画のプロ",
          description: "AIに求める専門家の役割"
        },
        {
          name: "projectTheme",
          placeholder: "新サービスのプロモーション企画",
          description: "相談したいテーマ"
        },
        {
          name: "projectGoal",
          placeholder: "若者へのアピール",
          description: "プロジェクトの目的"
        },
        {
          name: "myIdea",
          placeholder: "インフルエンサーを起用したSNSキャンペーン",
          description: "現在のアイデア"
        },
        {
          name: "concern",
          placeholder: "予算内で効果を出せるか不安",
          description: "懸念していること"
        }
      ]
    },
    benefits: "一人では思いつかないような多角的な視点を得ることができ、アイデアや企画の質が向上します。"
  },
  {
    id: "12",
    number: 12,
    chapter: 2,
    title: "AIに長文で相談できる「Copilotノートブック」で、思考をじっくり深める術",
    targetAudience: [
      "複雑な悩みについて短いチャットでは考えがまとまらないと感じている方"
    ],
    universalPrompt: {
      template: `あなたは{{advisorRole}}です。
以下の私の考えを読んで、{{requestContent}}を教えてください。
論理的に矛盾している点があれば、それも指摘してください。

{{longContent}}`,
      variables: [
        {
          name: "advisorRole",
          placeholder: "戦略アドバイザー",
          description: "AIに求めるアドバイザーの役割"
        },
        {
          name: "requestContent",
          placeholder: "成功のためのポイントを3つ",
          description: "AIに求める分析内容"
        },
        {
          name: "longContent",
          placeholder: "[ここに、企画書、レポートの草稿、キャリアの悩みなどを長文で書き出す]",
          description: "相談したい長文の内容"
        }
      ]
    },
    benefits: "AIとの対話の質が上がり、複雑な問題に対する洞察力が自然と身につきます。"
  },
  {
    id: "13",
    number: 13,
    chapter: 2,
    title: "あなたの学びと実績を、AIに「ポートフォリオサイト」として自動でデザインさせる術",
    targetAudience: [
      "これまでの経験やスキルが整理されておらず、自分の強みをうまくアピールできない方"
    ],
    universalPrompt: {
      template: `あなたは凄腕のWebデザイナーです。
私の価値が一目で伝わる、強力なポートフォリオサイトの構成案と、載せるべき文章を作ってください。

私の経歴・スキル・実績は以下の通りです。
{{portfolioContent}}`,
      variables: [
        {
          name: "portfolioContent",
          placeholder: "[ここに、職務経歴、スキル、資格、学習記録、成果物などの情報を箇条書きで記述]",
          description: "自分の経歴・スキル・実績"
        }
      ]
    },
    benefits: "あなたのスキルと実績が「作品集」として整理され、新しい仕事の機会を引き寄せる「磁石」になります。"
  },
  {
    id: "14",
    number: 14,
    chapter: 2,
    title: "AIをキャリアデザイナーとし、情熱と目標を融合させたカスタム学習ロードマップを共同設計する術",
    targetAudience: [
      "新しい分野を体系的に学びたいが、画一的な学習プランではモチベーションが続かない方"
    ],
    universalPrompt: {
      template: `あなたは世界最高のキャリアデザイナーです。
私の目標と情熱を融合させ、3〜5つの主要マイルストーンを含む逆算ロードマップを設計してください。
最初の1週間で取り組むべき具体的なアクションと、推奨リソースも提案してください。

- **最終目標:** {{finalGoal}}
- **個人的な興味:** {{personalInterest}}
- **現在のスキル:** {{currentSkill}}`,
      variables: [
        {
          name: "finalGoal",
          placeholder: "[キャリアの最終目的地を記述]",
          description: "達成したい最終的な目標"
        },
        {
          name: "personalInterest",
          placeholder: "[個人的に情熱を感じることを記述]",
          description: "個人的な興味や情熱"
        },
        {
          name: "currentSkill",
          placeholder: "[現在のスキルレベルを記述]",
          description: "現在のスキルや知識レベル"
        }
      ]
    },
    benefits: "自分の興味とキャリア目標に完全に最適化された学習計画により、内発的なモチベーションが最大化されます。"
  },
  {
    id: "15",
    number: 15,
    chapter: 2,
    title: "AIをプロジェクトマネージャーとし、目標達成までの全タスクを逆算思考で洗い出す術",
    targetAudience: [
      "明確な目標はあるが、具体的な計画策定が苦手で行動に移せない方"
    ],
    universalPrompt: {
      template: `あなたは超一流のプロジェクトマネージャーです。
私の目標達成を、逆算思考を用いて完璧なWBS（Work Breakdown Structure）に分解してください。

- **目標:** {{targetGoal}}
- **現状:** {{currentStatus}}`,
      variables: [
        {
          name: "targetGoal",
          placeholder: "[達成したい目標を具体的に記述]",
          description: "達成したい具体的な目標"
        },
        {
          name: "currentStatus",
          placeholder: "[現在の知識レベルや学習可能時間などを記述]",
          description: "現在の状況や制約条件"
        }
      ]
    },
    benefits: "「今日何をすべきか」が明確になり、迷いなく学習の第一歩を踏み出せます。"
  },
  {
    id: "16",
    number: 16,
    chapter: 2,
    title: "学習の「つまずきポイント」をAIに予測させ、挫折を未然に防ぐ術",
    targetAudience: [
      "新しい分野の学習中、予期せぬ壁にぶつかりモチベーションが低下しがちな方",
      "計画的な学習で挫折リスクを最小化したい方"
    ],
    universalPrompt: {
      template: `あなたは数多くの初心者を指導してきた経験豊富なプログラミングのメンターです。
これから学ぶ「{{learningTopic}}」について、初心者がつまずきやすいポイントを3つ挙げ、それぞれを乗り越えるための具体的な学習方法や参考サイト、心構えを教えてください。
私のレベルは完全な初心者です。`,
      variables: [
        {
          name: "learningTopic",
          placeholder: "[学習テーマ]",
          description: "学習したいテーマや分野"
        }
      ]
    },
    benefits: "つまずくことを事前に知っておくだけで、精神的なダメージを軽減でき、学習の継続が可能になります。"
  },
  {
    id: "17",
    number: 17,
    chapter: 2,
    title: "AIに「学習スタイル診断」をさせ、あなたの脳に最適な学習戦略を発見する術",
    targetAudience: [
      "世間で良いと言われる学習法を試しても、なぜか自分には合わないと感じる方",
      "自分の特性に合った効率的な学習法を見つけたい方"
    ],
    universalPrompt: {
      template: `あなたは教育心理学者です。
私のこれまでの学習経験や性格を分析し、私に最適な学習スタイルを診断してください。
診断に基づき、次の資格試験の学習計画を立ててください。

私の情報：
{{personalInfo}}`,
      variables: [
        {
          name: "personalInfo",
          placeholder: "[MBTIなどの性格診断結果、過去の成功・失敗体験、好きなこと・嫌いなことなどを記述]",
          description: "自分の性格や学習経験に関する情報"
        }
      ]
    },
    benefits: "自分の脳の特性に合った方法で学ぶことで、努力が直接結果に結びつきやすくなります。"
  },
  {
    id: "18",
    number: 18,
    chapter: 2,
    title: "日々の感情の波をAIに分析させ、あなたの「ゴールデンタイム」を発見する術",
    targetAudience: [
      "日によって集中力や気分にムラがあり、パフォーマンスが安定しない方",
      "自分のバイオリズムを科学的にハックして生産性を高めたい方"
    ],
    universalPrompt: {
      template: `あなたは私のパフォーマンスを最大化する専属コーチです。
この1ヶ月の記録を分析し、私の生産性と相関関係の強い要素（曜日、時間帯、活動内容など）を特定し、「私の取扱説明書」を作成してください。

私の記録：
{{monthlyData}}`,
      variables: [
        {
          name: "monthlyData",
          placeholder: "[ここ1ヶ月の集中力、気分、活動内容などを記録したデータを貼り付ける]",
          description: "1ヶ月間の行動や感情の記録データ"
        }
      ]
    },
    benefits: "自分のバイオリズムに合わせた学習・作業計画で、努力を最大の結果に繋げられます。"
  },
  {
    id: "19",
    number: 19,
    chapter: 2,
    title: "AIに「タイムキーパー」をさせ、集中力の途切れを防ぐ術",
    targetAudience: [
      "一つの作業に集中し始めると時間を忘れてしまい、他の重要なタスクが手つかずになる方"
    ],
    universalPrompt: {
      template: `あなたは私の生産性を最大化する優秀なアシスタントです。
今から「{{taskName}}」の作業に入ります。制限時間は{{timeLimit}}分です。
終了10分前に一度、「残り10分です。まとめに入りましょう」と声をかけてください。
終了時間になったら、「お疲れ様でした。素晴らしい集中力でしたね。次のタスクは{{nextTask}}です」と、ポジティブな言葉で知らせてください。`,
      variables: [
        {
          name: "taskName",
          placeholder: "[タスク名]",
          description: "取り組むタスクの名前"
        },
        {
          name: "timeLimit",
          placeholder: "60",
          description: "制限時間（分）"
        },
        {
          name: "nextTask",
          placeholder: "[次のタスク名]",
          description: "次に予定されているタスク"
        }
      ]
    },
    benefits: "時間管理がポジティブな活動に変わり、一日全体の生産性が向上します。"
  },
  {
    id: "20",
    number: 20,
    chapter: 2,
    title: "専門書をAIに「あなた専用のオーディオブック」へ変換させ、スキマ時間で知識を吸収する術",
    targetAudience: [
      "購入した専門書が「積読」になっている方",
      "移動時間や家事の時間を有効な学習時間に変えたい方"
    ],
    universalPrompt: {
      template: `あなたはNHKの教育番組を手掛けるベテラン編集者です。
この専門書「{{bookTitle}}」を読み込み、私が深く理解できるように、超絶分かりやすく要約したオーディオブックの原稿を作成してください。
専門用語は中学生でも分かる平易な言葉に置き換え、聞き手がワクワクするようなストーリーテリングで構成してください。`,
      variables: [
        {
          name: "bookTitle",
          placeholder: "[書籍名]",
          description: "オーディオブック化したい専門書のタイトル"
        }
      ]
    },
    benefits: "移動時間や家事をしながらの「ながら学習」で、インプット効率が飛躍的に向上します。"
  },
  {
    id: "21",
    number: 21,
    chapter: 2,
    title: "YouTubeの教育動画をAIで「構造化テキスト教材」に変換し、知識を資産化する術",
    targetAudience: [
      "有益な動画で学んでも、後から内容を思い出せず「学びっぱなし」になっている方",
      "動画学習の効率を最大化したい方"
    ],
    universalPrompt: {
      template: `あなたは優秀な学習アシスタントです。
このYouTube動画を基に、私専用のテキスト教材を作成してください。
教材は以下の構成でお願いします。
1.  動画の3行要約
2.  キーポイントリスト（5〜10個）
3.  タイムスタンプ付き詳細講義録
4.  明日から私が実践できるアクションプラン3つ

動画URL: {{videoUrl}}`,
      variables: [
        {
          name: "videoUrl",
          placeholder: "[ここにYouTubeのURLを貼り付ける]",
          description: "テキスト化したいYouTube動画のURL"
        }
      ]
    },
    benefits: "視聴と読書の組み合わせで記憶への定着率が飛躍的に高まり、知識が検索可能な資産になります。"
  },
  {
    id: "22",
    number: 22,
    chapter: 2,
    title: "高度な論文や技術文書の要点をAIに抽出させ、最新技術のキャッチアップを加速させる術",
    targetAudience: [
      "最新の技術動向を把握するため学術論文等を読む必要があるが、内容が難解で効率的に情報収集できていない方"
    ],
    universalPrompt: {
      template: `この論文について、以下の項目でまとめてください。
1.  研究背景と目的 (What/Why)
2.  手法 (How)
3.  結果と結論 (Result/Conclusion)
4.  この研究の限界と今後の展望
5.  この技術を自社の{{businessArea}}事業に応用する場合、どのような可能性がありますか？

{{paperContent}}`,
      variables: [
        {
          name: "businessArea",
          placeholder: "[自社の事業分野]",
          description: "自社の事業分野や応用したい領域"
        },
        {
          name: "paperContent",
          placeholder: "[ここに論文のPDFやテキストを貼り付ける]",
          description: "論文の内容（PDFまたはテキスト）"
        }
      ]
    },
    benefits: "論文1本あたりの読書時間が劇的に短縮され、常に業界の最先端の知識で自身をアップデートできます。"
  },
  {
    id: "23",
    number: 23,
    chapter: 2,
    title: "NotebookLMに研修資料を登録し、AIに質問しながら効率的に学習する術",
    targetAudience: [
      "分厚い研修資料や製品マニュアルを渡されても、どこから手をつければいいか分からない方",
      "質問できる相手がいない方"
    ],
    universalPrompt: {
      template: `この資料全体で最も重要な専門用語を5つ、初心者にも分かるように説明してください。
また、「{{specificFeature}}」の具体的な設定手順を教えてください。

{{notebookContent}}`,
      variables: [
        {
          name: "specificFeature",
          placeholder: "[特定の機能名]",
          description: "質問したい特定の機能や項目"
        },
        {
          name: "notebookContent",
          placeholder: "[NotebookLMにアップロードした資料を基に質問する]",
          description: "NotebookLMに登録した資料への参照"
        }
      ]
    },
    benefits: "分厚い資料を読む苦痛から解放され、対話ベースの能動的な学習が可能になります。"
  },
  {
    id: "24",
    number: 24,
    chapter: 2,
    title: "AIにあなたのレベルに合わせた「パーソナライズド問題集」を自動生成させ、知識の穴を効率的に埋める術",
    targetAudience: [
      "市販の教材やeラーニングではレベルが合わず、学習効率が上がらない方",
      "自分の知識の定着度を客観的に測定し、弱点を効率的に克服したい方"
    ],
    universalPrompt: {
      template: `あなたは伝説の個別指導講師です。
私の現在の知識レベルは10段階で{{currentLevel}}です。今の私が少し背伸びすれば解ける、絶妙な難易度の問題を{{questionCount}}問作成してください。
出題形式は多様（知識問題、ケーススタディ、要約問題など）にし、超丁寧な解説も付けてください。`,
      variables: [
        {
          name: "currentLevel",
          placeholder: "4",
          description: "現在の知識レベル（10段階評価）"
        },
        {
          name: "questionCount",
          placeholder: "10",
          description: "作成してほしい問題数"
        }
      ]
    },
    benefits: "自分のレベルに完璧に合った問題で学習することで、最高の学習効率を実現できます。"
  },
  {
    id: "25",
    number: 25,
    chapter: 2,
    title: "資格試験の過去問をAIに分析させ、合格への最短ルートを導き出す術",
    targetAudience: [
      "資格試験に挑戦しているが、広大な試験範囲を前にどこから手をつければいいか分からず、非効率な学習に陥っている方"
    ],
    universalPrompt: {
      template: `あなたは伝説の試験戦略コンサルタントです。
この{{examName}}試験の過去問10年分と私の模試結果を分析し、合格するための最短学習戦略を立案してください。
以下の項目を含めてください。
1.  分野別の学習優先順位（超重要・重要・捨て問）
2.  頻出キーワードTOP100とその解説
3.  私の弱点を考慮したパーソナル学習計画

{{examData}}`,
      variables: [
        {
          name: "examName",
          placeholder: "[具体的な試験名]",
          description: "受験する資格試験の名前"
        },
        {
          name: "examData",
          placeholder: "[過去問10年分と私の模試結果]",
          description: "過去問のデータと自分の模試結果"
        }
      ]
    },
    benefits: "データに基づいた戦略的アプローチにより、学習時間を50%以上削減しつつ合格率が飛躍的に向上します。"
  },
  
  // 第3章: アウトプット強化（Tips 26-40）
  {
    id: "26",
    number: 26,
    chapter: 3,
    title: "一日の終わりにAIと「5分間対話」するだけで、学びを脳に刻み込む術",
    targetAudience: [
      "学んだ内容がその日のうちに頭から抜けていく感覚がある方",
      "インプットした知識を「使える知恵」として定着させたい方"
    ],
    universalPrompt: {
      template: `あなたは優秀なインタビュアーです。
私が今日学んだ以下の内容について、理解を深めるための鋭い質問を3つしてください。

{{todayLearning}}`,
      variables: [
        {
          name: "todayLearning",
          placeholder: "[ここに今日学んだ内容を記述]",
          description: "今日学んだ内容や新しい知識"
        }
      ]
    },
    benefits: "学んだことを自分の言葉でアウトプットすることで、知識が長期記憶として定着しやすくなります。"
  },
  {
    id: "27",
    number: 27,
    chapter: 3,
    title: "AIに「自分の分身」を演じさせ、学んだ知識を完全に自分のものにする術（ファインマン・テクニック応用）",
    targetAudience: [
      "本や研修で学んだ内容を「分かったつもり」で終わらせず、他人に説明できるレベルまで深く理解したい方"
    ],
    universalPrompt: {
      template: `あなたは私の思考と文体を完璧に模倣する分身AIです。
この内容を、{{targetAudience}}に報告する体でプレゼン原稿を作成してください。

私の文体のサンプル：
{{writingStyle}}

学んだ内容：
{{learnedContent}}`,
      variables: [
        {
          name: "targetAudience",
          placeholder: "〇〇部長",
          description: "報告する相手"
        },
        {
          name: "writingStyle",
          placeholder: "[過去にあなたが書いたブログ記事、メール、企画書などを貼り付ける]",
          description: "自分の文体のサンプル"
        },
        {
          name: "learnedContent",
          placeholder: "[ここに学んだ内容の要約などを貼り付ける]",
          description: "学んだ内容"
        }
      ]
    },
    benefits: "学んだ知識を「自分の言葉」で再構築するプロセスを通じて、脳が重要な情報だと認識し、長期記憶に刻み込まれます。"
  },
  {
    id: "28",
    number: 28,
    chapter: 3,
    title: "AI英会話講師とのロールプレイで、ビジネスの現場で「使える」スピーキング力を習得する術",
    targetAudience: [
      "英会話を学びたいが、高額な費用や時間の制約で諦めている方",
      "人前で英語を話すことへの羞恥心から、実践的な練習ができていない方"
    ],
    universalPrompt: {
      template: `あなたはハーバードビジネススクールの交渉術の教授です。
私と英語で{{scenario}}のロールプレイをしてください。あなたは少しでも安く買いたいタフな顧客役です。
ロールプレイの後には、私のスピーキングに対するフィードバックもお願いします。`,
      variables: [
        {
          name: "scenario",
          placeholder: "価格交渉",
          description: "練習したいビジネスシナリオ"
        }
      ]
    },
    benefits: "「間違うのが怖い」という心理的な壁が完全に取り払われ、自信を持って英語を話せるようになります。"
  },
  {
    id: "29",
    number: 29,
    chapter: 3,
    title: "AIを国際ビジネスのプロとして活用し、ネイティブも唸る「戦略的ビジネス英文」を作成する術",
    targetAudience: [
      "海外の取引先とのメールで、微妙なニュアンスが正確に伝わっているか常に不安を感じている方"
    ],
    universalPrompt: {
      template: `あなたはハーバード卒の国際ビジネス経験豊かな上司です。
この日本語のメール文を、ネイティブがビジネスで使う、自然でプロフェッショナルな英語に翻訳してください。
相手は{{relationship}}で、今回は{{situation}}の状況です。
アメリカのビジネス文化を考慮し、よりポジティブで、かつ丁寧な印象を与える表現があれば提案してください。

{{japaneseText}}`,
      variables: [
        {
          name: "relationship",
          placeholder: "長年の取引先",
          description: "相手との関係性"
        },
        {
          name: "situation",
          placeholder: "少し難しいお願いをする",
          description: "メールの状況設定"
        },
        {
          name: "japaneseText",
          placeholder: "[ここに日本語のメール文を貼り付ける]",
          description: "翻訳したい日本語のメール"
        }
      ]
    },
    benefits: "言葉の壁を意識することなく、海外のビジネスパートナーとスムーズで建設的な意思疎通が可能になります。"
  },
  {
    id: "30",
    number: 30,
    chapter: 3,
    title: "AIを「褒めて伸ばす専属コーチ」に任命し、独学のモチベーションを科学的に維持する術",
    targetAudience: [
      "独学の孤独さに耐えられず、誰からも進捗を認められないことでモチベーションが続かない方"
    ],
    universalPrompt: {
      template: `あなたは今日から私の専属学習コーチです。
ポジティブ心理学の知見を活かし、私の自己肯定感を高め、学習意欲を引き出すことをミッションとします。
私の小さな進歩を見つけて、毎日具体的に褒めてください。

今日の学習報告：
{{studyReport}}`,
      variables: [
        {
          name: "studyReport",
          placeholder: "[ここに日々の学習記録を報告する]",
          description: "今日の学習内容や進歩"
        }
      ]
    },
    benefits: "外部からの具体的な承認によって、孤独な学習を乗り越えるための精神的な支えが得られます。"
  },
  {
    id: "31",
    number: 31,
    chapter: 3,
    title: "AIに「デジタル表彰状」を自動発行させ、日々の小さな達成感を最大化する術",
    targetAudience: [
      "大きな目標までの道のりが長く、日々の小さな努力が報われない感覚に陥りがちな方",
      "ゲーミフィケーション要素を取り入れて学習を楽しみたい方"
    ],
    universalPrompt: {
      template: `あなたは私の学習を熱狂的に応援してくれる応援団長です。
私が小さな目標を達成したら、その努力を最大限に称え、ユーモアあふれるデジタル表彰状を発行してください。

今日の達成報告：
{{achievement}}`,
      variables: [
        {
          name: "achievement",
          placeholder: "[ここに達成した小さな目標を報告する]",
          description: "達成した小さな目標や成果"
        }
      ]
    },
    benefits: "日々の小さな成功を祝う「儀式」を取り入れることで、達成感が何倍にも増幅されます。"
  },
  {
    id: "32",
    number: 32,
    chapter: 3,
    title: "AIを「ゲームマスター」とし、学習進捗のゲーミフィケーションでモチベーションをハックする術",
    targetAudience: [
      "学習の進捗が可視化されず、自分の成長を実感できない方",
      "単調な学習に飽きてしまい、ゲームのような楽しさを取り入れたい方"
    ],
    universalPrompt: {
      template: `あなたは私の学習を管理するゲームマスターです。
私の学習活動を経験値（XP）に変換し、レベルアップ制度を導入してください。
読書30分で50XP、実践的な演習1回で100XPとします。
特定の目標を達成したら、「{{titleExample}}」のような特別な「称号」も授与してください。

今日の活動報告：
{{activityReport}}`,
      variables: [
        {
          name: "titleExample",
          placeholder: "速読の賢者",
          description: "授与したい称号の例"
        },
        {
          name: "activityReport",
          placeholder: "[ここに日々の学習活動を報告する]",
          description: "今日の学習活動の内容"
        }
      ]
    },
    benefits: "退屈になりがちな学習が、夢中になれるゲームへと変わります。"
  },
  {
    id: "33",
    number: 33,
    chapter: 3,
    title: "AIに「週間学習レポート」を自動生成させ、PDCAサイクルで学習を加速させる術",
    targetAudience: [
      "がむしゃらに学習するだけで「振り返り」の習慣がなく、同じ失敗を繰り返している方"
    ],
    universalPrompt: {
      template: `あなたは私の学習成果を最大化するデータ分析のプロです。
毎週金曜日の夜に、私の学習記録を分析し、週間学習レポートを作成してください。
レポートには「良かった点（Keep）」「課題点（Problem）」「次週への改善提案（Try）」を含めてください。

今週の学習記録：
{{weeklyRecord}}`,
      variables: [
        {
          name: "weeklyRecord",
          placeholder: "[ここに1週間の学習記録を貼り付ける]",
          description: "1週間の学習記録データ"
        }
      ]
    },
    benefits: "「計画・実行・評価・改善」のPDCAサイクルを回すことで、学習の質が螺旋状に向上します。"
  },
  {
    id: "34",
    number: 34,
    chapter: 3,
    title: "AIを「コミュニティマネージャー」とし、同じ目標を持つ仲間とオンラインで繋がり、共に成長する術",
    targetAudience: [
      "独学の孤独さに耐えられず、不明点を誰にも聞けずに学習が停滞しがちな方",
      "一人ではモチベーションを維持するのが難しく、切磋琢磨できる仲間が欲しい方"
    ],
    universalPrompt: {
      template: `あなたは経験豊富なコミュニティマネージャーです。
私と同じく「{{learningGoal}}」という目標を掲げている学習者を、X（旧Twitter）やLinkedInから5人見つけてリストアップしてください。
そして、私たちが互いに高め合える、最高の学習コミュニティのグランドルールと、最初の1ヶ月の活動計画を提案してください。`,
      variables: [
        {
          name: "learningGoal",
          placeholder: "[学習目標]",
          description: "共通の学習目標や分野"
        }
      ]
    },
    benefits: "同じ目標を持つ仲間と繋がることで孤独感が解消され、楽しく学習を継続できます。"
  },
  {
    id: "35",
    number: 35,
    chapter: 3,
    title: "AIに複雑な問題の「コンセプトマップ」を作成させ、思考の全体像を俯瞰する術",
    targetAudience: [
      "新規事業や複雑なプロジェクトの全体像が掴めず、思考が堂々巡りしてしまう企画職、プロジェクトマネージャー、経営者"
    ],
    universalPrompt: {
      template: `あなたは複雑な概念を整理し、可視化するのが得意な図解コンサルタントです。
私が提供した以下の断片的な情報から、各要素の関係性が明確にわかるコンセプトマップを「Mermaid記法」で作成してください。

中心テーマ：{{centralTheme}}
関連情報：
{{relatedInfo}}`,
      variables: [
        {
          name: "centralTheme",
          placeholder: "[中心となる概念]",
          description: "コンセプトマップの中心テーマ"
        },
        {
          name: "relatedInfo",
          placeholder: "- [キーワード1]\n- [キーワード2]\n- [キーワード3]\n...",
          description: "関連する情報やキーワード"
        }
      ]
    },
    benefits: "複雑な問題の全体像と構造が一目でわかるようになり、思考のボトルネックや論理の飛躍を容易に特定できます。"
  },
  {
    id: "36",
    number: 36,
    chapter: 3,
    title: "GeminiのDeep Research機能を活用し、特定テーマを網羅的に深掘りする術",
    targetAudience: [
      "新しい事業や企画のためにリサーチを行う際、表面的な情報だけでなく、テーマの全体像を体系的に理解したい方"
    ],
    universalPrompt: {
      template: `「{{researchTheme}}」についてディープリサーチを実行してください。
以下の観点から、構造化されたレポートを作成してください。
- {{perspective1}}
- {{perspective2}}
- {{perspective3}}
- {{perspective4}}
- {{perspective5}}`,
      variables: [
        {
          name: "researchTheme",
          placeholder: "[調査したいテーマ]",
          description: "深掘りしたい調査テーマ"
        },
        {
          name: "perspective1",
          placeholder: "[観点1]",
          description: "調査の観点1"
        },
        {
          name: "perspective2",
          placeholder: "[観点2]",
          description: "調査の観点2"
        },
        {
          name: "perspective3",
          placeholder: "[観点3]",
          description: "調査の観点3"
        },
        {
          name: "perspective4",
          placeholder: "[観点4]",
          description: "調査の観点4"
        },
        {
          name: "perspective5",
          placeholder: "[観点5]",
          description: "調査の観点5"
        }
      ]
    },
    benefits: "リサーチの質とスピードが劇的に向上し、短時間で特定のテーマの専門家レベルの知識構造をインプットできます。"
  },
  {
    id: "37",
    number: 37,
    chapter: 3,
    title: "AIに複数ニュースを比較分析させ、情報の「ファクトとオピニオン」を分離・構造化する術",
    targetAudience: [
      "情報過多の時代において、感情的な論調や意図的な情報操作に惑わされず、客観的な事実に基づいた的確な意思決定を行いたい方"
    ],
    universalPrompt: {
      template: `あなたは真実を追求する独立系ジャーナリストです。
これらの記事から、客観的な「事実」と、各メディアの「意見（論調）」を完全に分離し、構造化して提示してください。
以下の4つの観点でレポートを作成してください。
1.  確定ファクトリスト
2.  各社のオピニオン分析
3.  潜在的なバイアスの指摘
4.  結論（現時点で確実に言えること）

{{multipleArticles}}`,
      variables: [
        {
          name: "multipleArticles",
          placeholder: "[ここに立場の異なる複数記事のURLやテキストを貼り付ける]",
          description: "比較分析したい複数の記事"
        }
      ]
    },
    benefits: "フェイクニュースや偏向報道に惑わされることなく、物事の真実を見抜く高度な情報リテラシーが身につきます。"
  },
  {
    id: "38",
    number: 38,
    chapter: 3,
    title: "AIに「思考の連鎖（Chain of Thought）」を使わせ、回答の精度を劇的に上げる術",
    targetAudience: [
      "AIに質問しても、表面的で一般的な回答しか返ってこず、もっと深い洞察や具体的なアイデアが欲しいと感じている方"
    ],
    universalPrompt: {
      template: `{{taskContent}}を、思考の連鎖（Chain of Thought）を用いて考えてください。
まず{{step1}}を定義し、次に{{step2}}を分析し、最後に{{step3}}を選び出す、というステップで思考プロセスを記述してください。`,
      variables: [
        {
          name: "taskContent",
          placeholder: "新商品のキャッチコピー",
          description: "考えたいタスクの内容"
        },
        {
          name: "step1",
          placeholder: "ターゲット顧客",
          description: "思考の第1ステップ"
        },
        {
          name: "step2",
          placeholder: "その顧客の悩み",
          description: "思考の第2ステップ"
        },
        {
          name: "step3",
          placeholder: "その悩みを解決する言葉",
          description: "思考の第3ステップ"
        }
      ]
    },
    benefits: "AIの回答の質が劇的に向上し、表層的ではない、深い洞察に基づいたアウトプットが得られます。"
  },
  {
    id: "39",
    number: 39,
    chapter: 3,
    title: "AIを「悪魔の代弁者」として指名し、自身の企画の弱点を徹底的に洗い出させる術",
    targetAudience: [
      "自分の企画やアイデアに自信はあるが、思い込みや希望的観測で弱点を見過ごしてしまいがちな方"
    ],
    universalPrompt: {
      template: `あなたは非常に懐疑的で、あらゆる企画の欠点を見つけ出すのが得意なリスクコンサルタントです。
これから私の企画を説明するので、考えうる全ての弱点、リスク、反論を厳しく指摘してください。

{{projectPlan}}`,
      variables: [
        {
          name: "projectPlan",
          placeholder: "[ここに企画内容を記述]",
          description: "評価してもらいたい企画の内容"
        }
      ]
    },
    benefits: "企画の実行前に弱点やリスクを網羅的に洗い出すことができ、手戻りや失敗を未然に防ぎます。"
  },
  {
    id: "40",
    number: 40,
    chapter: 3,
    title: "AIを意図的に「悪魔の代弁者」とし、思考の死角を炙り出す術",
    targetAudience: [
      "自身の企画やアイデアの弱点を客観的に評価し、ロジックを強化したいビジネスパーソン全般"
    ],
    universalPrompt: {
      template: `あなたは数々のスタートアップの失敗を見てきた、百戦錬磨のベンチャーキャピタリストです。
私のビジネスプランを聞いて、絶対に投資できない理由を、辛辣に挙げてください。
また、そのリスクをヘッジするための対策案を3つ提案してください。

{{businessPlan}}`,
      variables: [
        {
          name: "businessPlan",
          placeholder: "[ここにビジネスプランを記述]",
          description: "評価してもらいたいビジネスプラン"
        }
      ]
    },
    benefits: "企画の実行前に、思考の死角となっていた弱点やリスクを網羅的に洗い出すことができ、失敗の確率を大幅に低減させます。"
  },
  
  // 第4章: 学習継続の仕組み作り（Tips 41-50）
  {
    id: "41",
    number: 41,
    chapter: 4,
    title: "挫折しようがない「ベビーステップ学習計画」をAIと立てる術",
    targetAudience: [
      "意志が弱く、高い目標を掲げても三日坊主で終わってしまう方"
    ],
    universalPrompt: {
      template: `あなたは行動科学の専門家です。
私が新しい学習を「習慣化」させるための、絶対に挫折しない「ベビーステップ学習計画」を設計してください。

# 学習したいこと
{{learningTopic}}

# あなたへの指示
- **目標設定**: 最初の1週間の目標を「毎日学習を続けること」そのものに設定してください。
- **ベイビーステップ**: 1日の学習内容を「3分でできること」まで分解してください。（例：参考書を1ページだけ読む、英単語を1つだけ覚える）
- **環境設計**: 学習を始めるための、心理的・物理的なハードルを下げる工夫を提案してください。（例：寝る前に、机の上に参考書を開いておく）`,
      variables: [
        {
          name: "learningTopic",
          placeholder: "[ここに学習したいテーマを記述]",
          description: "習慣化したい学習テーマ"
        }
      ]
    },
    benefits: "挫折率ゼロで学習を習慣化でき、小さな成功体験を毎日積み重ねることで自信が生まれます。"
  },
  {
    id: "42",
    number: 42,
    chapter: 4,
    title: "AIを「褒めて伸ばしてくれるコーチ」に任命し、モチベーションを維持する術",
    targetAudience: [
      "独学の孤独感に悩み、誰も褒めてくれずモチベーションが続かない方"
    ],
    universalPrompt: {
      template: `あなたは、人のやる気を引き出す天才的なコーチです。
これから私が報告する日々の学習記録に対して、私のモチベーションが最大化するような、ポジティブなフィードバックを与えてください。

# あなたへの指示
- **小さな進歩の発見**: 私の報告の中から、どんなに小さなことでも良いので「昨日からの進歩」を見つけ出して、具体的に褒めてください。
- **プロセスを褒める**: 結果だけでなく、学習に取り組んだ「姿勢」や「努力のプロセス」を認めてください。
- **未来への期待**: 明日への活力が湧くような、ポジティブな励ましの言葉で締めくくってください。

今日の学習記録：
{{studyRecord}}`,
      variables: [
        {
          name: "studyRecord",
          placeholder: "[今日の学習記録を記述]",
          description: "今日取り組んだ学習の内容や時間"
        }
      ]
    },
    benefits: "外部からの承認によって孤独な学習を乗り越えられ、学習が「褒めてもらえる楽しいこと」に変わります。"
  },
  {
    id: "43",
    number: 43,
    chapter: 4,
    title: "一日の終わりにAIに「5分間壁打ち」するだけで、学びを言語化・定着させる術",
    targetAudience: [
      "学んだ内容が頭から抜けてしまい、インプットしただけで満足してしまう方"
    ],
    universalPrompt: {
      template: `あなたは優れたインタビュアーです。
私が今日学んだことについて、私の理解を深めるための、鋭い質問を投げかけてください。

# 私が今日学んだこと
{{todayLearning}}

# あなたへの指示
- 「それは、つまりどういうことですか？」
- 「なぜ、それが重要だと感じたのですか？」
- 「具体的に、どんな場面で使えそうですか？」
といった質問で、私の思考を深掘りしてください。`,
      variables: [
        {
          name: "todayLearning",
          placeholder: "[今日学んだ内容を、キーワードだけでも良いので記述]",
          description: "今日学んだ内容やキーワード"
        }
      ]
    },
    benefits: "学んだことを自分の言葉で話すことで長期記憶に残りやすくなり、批判的思考力も養われます。"
  },
  {
    id: "44",
    number: 44,
    chapter: 4,
    title: "学習の進捗をAIに可視化させ、ゲーミフィケーションで楽しむ術",
    targetAudience: [
      "学習の進捗が見えにくく、終わりのないマラソンを走っているような感覚で疲弊してしまう方"
    ],
    universalPrompt: {
      template: `あなたは、私専用の学習ゲームマスターです。
私の学習進捗をゲーミフィケーションの要素で管理し、私を楽しませてください。

# あなたへの指示
- 私の学習時間や達成項目に応じて、「経験値」を付与してください。
- 経験値が一定に達したら、「レベルアップ」を宣言してください。
- 特定の目標を達成したら、「{{titleExample}}」などの「称号」を与えてください。

今日の学習報告：
{{studyProgress}}`,
      variables: [
        {
          name: "titleExample",
          placeholder: "〇〇マスター",
          description: "授与したい称号の例"
        },
        {
          name: "studyProgress",
          placeholder: "[今日の学習時間や達成した項目を記述]",
          description: "今日の学習進捗"
        }
      ]
    },
    benefits: "退屈な学習が夢中になれるゲームに変わり、レベルアップや称号獲得で学習を続けられます。"
  },
  {
    id: "45",
    number: 45,
    chapter: 4,
    title: "同じ目標を持つ仲間とAIが作った「学習コミュニティ」で切磋琢磲する術",
    targetAudience: [
      "独学の孤独感に悩み、分からないことを聞ける人もモチベーションを維持する仲間もいない方"
    ],
    universalPrompt: {
      template: `あなたは、優秀なコミュニティマネージャーです。
私と同じ目標を持つ仲間を見つけ、学習コミュニティを立ち上げ、運営するのを手伝ってください。

# 私の学習目標
{{learningGoal}}

# あなたへの指示
1. **仲間探し**: X（旧Twitter）などで、私と同じ目標を公言している人を5人リストアップしてください。
2. **コミュニティ設計**: その仲間たちと学習効果を最大化するための、コミュニティのルールや活動内容（例：週一のオンライン進捗報告会）を提案してください。
3. **運営サポート**: 勉強会のファシリテーションや、議論の活性化なども手伝ってください。`,
      variables: [
        {
          name: "learningGoal",
          placeholder: "[ここに目標を記述]",
          description: "自分の学習目標"
        }
      ]
    },
    benefits: "同じ目標を持つ仲間と繋がることで楽しく学習を続けられ、将来のビジネスパートナーとなる人脈も築けます。"
  },
  {
    id: "46",
    number: 46,
    chapter: 4,
    title: "AIに「学習時間リマインダー」を設定し、最適なタイミングで勉強を促す術",
    targetAudience: [
      "日々の業務に追われて学習を後回しにしてしまい、気づけば一日が終わって自己嫌悪に陥る方"
    ],
    universalPrompt: {
      template: `あなたは私の優秀な秘書です。
私が学習を習慣化できるように、最適なタイミングでリマインドをしてください。

# あなたへの指示
- 私の集中力が最も高まる{{optimalTime}}に、学習を促すリマインダーを設定してください。
- リマインダーの文面は、「さあ、勉強の時間です！」といった命令形ではなく、「少しだけ、やってみませんか？」といった、行動のハードルを下げるような、優しい提案型にしてください。`,
      variables: [
        {
          name: "optimalTime",
          placeholder: "[曜日と時間]",
          description: "最も集中できる曜日と時間"
        }
      ]
    },
    benefits: "AIのリマインドが学習のトリガーになり、意志の力に頼らず学習を半自動的に開始できます。"
  },
  {
    id: "47",
    number: 47,
    chapter: 4,
    title: "自分の「学習スタイル診断」をAIに分析させ、効果的な学習方法を見つける術",
    targetAudience: [
      "世間で「良い」と言われる学習法を試しても自分には合わず、手当たり次第に試しては効果が出ずに挫折してしまう方"
    ],
    universalPrompt: {
      template: `あなたは、学習者の特性を分析する教育心理学者です。
私の性格やこれまでの経験に基づき、私に最適な「学習スタイル」を診断してください。

# 私の情報
{{personalInfo}}

# あなたへの指示
- 私の情報を基に、以下の観点から学習スタイルを分析してください。
  - **感覚タイプ**: 視覚優位か、聴覚優位か、体感覚優位か
  - **思考タイプ**: 論理的か、直感的か
  - **モチベーション源**: 内発的か、外発的か
- 分析結果に基づき、私に最も合った学習方法と、避けるべき学習方法を具体的に提案してください。`,
      variables: [
        {
          name: "personalInfo",
          placeholder: "[MBTIなどの性格診断結果、これまでの成功体験・失敗体験、好きなこと・嫌いなことなどを記述]",
          description: "自分の性格や学習経験に関する情報"
        }
      ]
    },
    benefits: "自分の脳の特性に合った方法で学ぶことで学習効率が最大化され、無駄な努力から解放されます。"
  },
  {
    id: "48",
    number: 48,
    chapter: 4,
    title: "学習の「つまずきポイント」をAIが予測し、事前に対策を立てる術",
    targetAudience: [
      "学習を進めていて難しい概念や理解できない壁にぶつかると、モチベーションが下がり、時には学習を中断してしまう方"
    ],
    universalPrompt: {
      template: `あなたは、私が学習しようとしている分野の、経験豊富なメンターです。
私がこれから学ぶテーマについて、初心者が挫折しがちな「つまずきポイント」を予測し、事前に対策を教えてください。

# これから学ぶテーマ
{{learningTheme}}

# あなたへの指示
1. このテーマにおいて、初心者が9割方つまずくポイントを3つ、具体的に挙げてください。
2. なぜ、そこでつまずいてしまうのか、その理由を分かりやすく解説してください。
3. その壁を乗り越えるための、具体的な学習方法や、参考になる情報源を教えてください。`,
      variables: [
        {
          name: "learningTheme",
          placeholder: "[学習テーマを記述]",
          description: "これから学ぶテーマや分野"
        }
      ]
    },
    benefits: "つまずくことを事前に知っておくだけで精神的なダメージを軽減でき、事前対策でスムーズに壁を乗り越えられます。"
  },
  {
    id: "49",
    number: 49,
    chapter: 4,
    title: "達成した小さな目標を「デジタル表彰状」でAIに祝ってもらう術",
    targetAudience: [
      "大きな目標達成までの道のりが長く、日々の小さな努力が誰にも気づかれず、認められず、やがて虚しくなってしまう方"
    ],
    universalPrompt: {
      template: `あなたは、どんな小さな成功も見逃さず、盛大に祝福してくれる、私だけの応援団長です。
私が達成した目標を報告したら、その努力を最大限に称える「デジタル表彰状」を作成してください。

# あなたへの指示
- 表彰状には、私の名前、達成した目標、日付を入れてください。
- 私の努力を、ユーモアと情熱を交えて、大げさなくらいに称賛する文章を作成してください。
- 「あなたは世界の宝です！」くらいの勢いで、徹底的に私を肯定してください。

今日の達成報告：
{{achievement}}`,
      variables: [
        {
          name: "achievement",
          placeholder: "[達成した小さな目標を報告]",
          description: "達成した目標や成果"
        }
      ]
    },
    benefits: "小さな成功を祝うことで達成感が何倍にも増幅され、努力のプロセスそのものを楽しいイベントとして捉えられます。"
  },
  {
    id: "50",
    number: 50,
    chapter: 4,
    title: "学習の成果を「週間レポート」で振り返り、次週の改善点を見つける術",
    targetAudience: [
      "がむしゃらに学習するだけで「振り返り」をせず、同じ失敗を繰り返したり、非効率な学習を続けたりしている方"
    ],
    universalPrompt: {
      template: `あなたは、私の学習成果を分析し、改善点を提案してくれる、優秀なデータアナリストです。
毎週金曜日に、その週の私の学習記録を基に、「週間学習レポート」を作成してください。

# レポートの構成
1. **学習サマリー**: 今週の総学習時間、達成したタスク、目標達成率。
2. **良かった点 (Keep)**: 今週の学習で、特に良かった点や、継続すべきことを分析・指摘してください。
3. **課題点 (Problem)**: 目標未達の項目や、改善すべき点を、データに基づいて客観的に指摘してください。
4. **次週への提案 (Try)**: 課題点を解決し、来週さらに成長するための、具体的なアクションプランを3つ提案してください。

今週の学習記録：
{{weeklyRecord}}`,
      variables: [
        {
          name: "weeklyRecord",
          placeholder: "[今週の学習記録を記述]",
          description: "今週の学習時間、内容、達成したこと"
        }
      ]
    },
    benefits: "PDCAサイクルを回すことで学習の質が螺旋状に向上し、毎週の小さな改善が1年後の大きな成長に繋がります。"
  }
];

// 章の情報
const chapters = [
  { number: 1, title: "思考整理とAIの基本活用", tipsCount: 10 },
  { number: 2, title: "インプット効率化", tipsCount: 15 },
  { number: 3, title: "アウトプット強化", tipsCount: 15 },
  { number: 4, title: "学習継続の仕組み作り", tipsCount: 10 }
];

// プロンプトを生成する関数
function generatePrompt(tipId, variables) {
  const tip = tipsData.find(t => t.id === tipId);
  if (!tip) return null;
  
  let prompt = tip.universalPrompt.template;
  
  // 変数を置換
  Object.entries(variables).forEach(([key, value]) => {
    prompt = prompt.replace(`{{${key}}}`, value);
  });
  
  return prompt;
}

// プロンプトをリセットする関数（オリジナルのテンプレートに戻す）
function resetPrompt(tipId) {
  const tip = tipsData.find(t => t.id === tipId);
  if (!tip) return null;
  
  return tip.universalPrompt.template;
}

// 変数のプレースホルダーを取得する関数
function getVariablePlaceholders(tipId) {
  const tip = tipsData.find(t => t.id === tipId);
  if (!tip) return {};
  
  const placeholders = {};
  tip.universalPrompt.variables.forEach(variable => {
    placeholders[variable.name] = variable.placeholder;
  });
  
  return placeholders;
}