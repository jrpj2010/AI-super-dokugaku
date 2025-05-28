# TANRENロールプレイング診断・感情分析プラットフォーム開発 ToDoリスト

## 全体・共通基盤 (product_context)

- [ ] **基本情報定義:**
    - [ ] 製品名「TANREN」の確定と各所への反映
    - [ ] タグラインの最終化
    - [ ] 製品概要説明文の校正と確定
- [ ] **主要機能定義・実装:**
    - [ ] 自由対話モードのコアロジック実装
        - [ ] TANREN独自 高精度対話AIとの連携
    - [ ] マルチモーダルAIによる感情・行動分析エンジンの統合
    - [ ] 客観的フィードバック生成ロジックの実装
    - [ ] 潜在的な強み・弱み、日々の変化の可視化ロジックの設計
- [ ] **対象利用者定義:**
    - [ ] ペルソナ設定（接客従業員、営業担当者、研修担当者、自己理解を深めたい個人）
- [ ] **API連携:**
    - [ ] マルチモーダルAI API連携実装
    - [ ] 音声認識AI API連携実装
    - [ ] 映像認識AI API連携実装
    - [ ] 高精度対話AI API連携実装
- [ ] **導入効果の明確化:**
    - [ ] 各導入効果を具体的に示すユースケースの作成
- [ ] **分析可能項目の実装・マッピング:**
    - **コア感情:**
        - [ ] 幸福度 分析・表示実装
        - [ ] 怒り度 分析・表示実装
        - [ ] 哀しみ度 分析・表示実装
        - [ ] 恐れ度 分析・表示実装
        - [ ] 驚き度 分析・表示実装
        - [ ] 嫌悪度 分析・表示実装
    - **センチメント:**
        - [ ] ポジティブ度 分析・表示実装
        - [ ] ネガティブ度 分析・表示実装
        - [ ] ニュートラル度 分析・表示実装
    - **デモグラフィック (バックエンド分析、表示は要検討):**
        - [ ] 年齢推定 分析実装
        - [ ] 性別推定 分析実装
        - [ ] 表示する場合のプライバシーポリシー検討
    - **行動メトリクス:**
        - [ ] まばたき回数 分析・表示実装
        - [ ] 視線の動き 分析・表示実装
        - [ ] 顔の動き 分析・表示実装
        - [ ] 沈黙時間 分析・表示実装 (レポートでの直接表示検討)
        - [ ] 言い淀み 分析・表示実装 (レポートでの表示検討)
        - [ ] 会話スピード 分析・表示実装
        - [ ] うなずき回数 分析・表示実装 (レポートでの表示検討)
        - [ ] 声の質 分析・表示実装 (レポートでの詳細表示検討)
        - [ ] 笑い回数 分析・表示実装 (レポートでの表示検討)
- [ ] **問い合わせ情報:**
    - [ ] 問い合わせフォームへの導線設計・実装
    - [ ] サービス詳細・料金体系説明ページの準備

## 画面1: リアルタイム感情分析ダッシュボード (emotion_analysis_dashboard_alpha_v1)

- [ ] **画面基本設計:**
    - [ ] 画面ID、名称、説明文の確定
    - [ ] 画面目的の明確化とチーム内共有
    - [ ] デザインコンセプト、スタイルキーワードの確定
- [ ] **ビジュアルスタイル実装:**
    - [ ] 配色（背景グラデーション、カード背景、アクセントカラー等）実装
    - [ ] タイポグラフィ（フォントファミリー、サイズ、ウェイト）設定
    - [ ] スペーシングとパディングの統一ルール適用
    - [ ] 要素スタイル（カード角丸、シャドウ、ボタン角丸）実装
- [ ] **レイアウト構造実装:**
    - [ ] レスポンシブグリッドレイアウト実装
    - [ ] 各エリア（ヘッダー、メインコンテンツ行、フッター）配置
- [ ] **コンポーネント実装:**
    - **ヘッダー指示エリア:**
        - [ ] メインタイトル表示 (`今日の調子はいかがですか？`)
        - [ ] サブ指示表示 (`1分ほどお話をしてください`)
    - **中央ビデオ操作パネル:**
        - [ ] ユーザーカメラ映像表示 (映像認識AI入力)
        - [ ] 音声ビジュアライザー実装 (音声認識AI入力フィードバック)
        - [ ] 録画プログレスバー実装
        - [ ] ストップボタン実装
    - **左側感情分析パネル:**
        - [ ] 感情レーダーチャート (`emotion_tracker_card_realtime`)
            - [ ] 主要6感情のリアルタイム表示
        - [ ] 感情トレンドグラフ (`emotion_trend_card_realtime`)
            - [ ] ポジ/ネガ/ニュートラルの時系列表示
    - **右側行動メトリクスパネル:**
        - [ ] 視線/顔の動きゲージ (`sight_face_metrics_card_realtime`)
            - [ ] Faceゲージ、Sightゲージのリアルタイム表示
        - [ ] フェイスマップ (`face_map_visualization_card_realtime`)
            - [ ] 顔特徴点のワイヤーフレームリアルタイム表示
    - **フッター文字起こしエリア:**
        - [ ] 発話内容リアルタイム表示 (`transcription_output_card_realtime`)
- [ ] **UX検討:**
    - [ ] リアルタイムフィードバックの遅延最小化
    - [ ] 情報過多にならないバランス調整
- [ ] **アクセシビリティ対応:**
    - [ ] コントラスト確認
    - [ ] 色依存でない情報伝達の担保
    - [ ] フォントサイズの適切性確認
    - [ ] キーボード操作対応（特にストップボタン）

## 画面2: 感情分析結果レポート (emotion_analysis_report_beta_v1)

- [ ] **画面基本設計:**
    - [ ] 画面ID、名称、説明文の確定
    - [ ] 画面目的の明確化とチーム内共有
    - [ ] デザインコンセプト、スタイルキーワードの確定
- [ ] **ビジュアルスタイル実装:**
    - [ ] 配色（背景色、カード背景、アクセントカラー等）実装
    - [ ] タイポグラフィ設定 (画面1と統一)
    - [ ] スペーシングとパディングの統一ルール適用
    - [ ] 要素スタイル（カード角丸、シャドウ）実装
    - [ ] セクション区切り線スタイル実装
- [ ] **レイアウト構造実装:**
    - [ ] 単一カラムフローとグリッドセクションの組み合わせ実装
    - [ ] コンテンツ最大幅設定と中央寄せ
- [ ] **コンポーネント実装:**
    - **ヘッダータイトルグループ:**
        - [ ] "Result"ラベル表示
        - [ ] メインタイトル表示 (`感情分析結果`)
        - [ ] サブタイトル表示 (`今日のあなたの状態`)
        - [ ] 説明文表示
    - **サマリーメトリクス行 (2カラムグリッド):**
        - [ ] 会話状態レーダーチャート (`conversation_status_card`)
            - [ ] まばたき、落ち着き、会話スピード、間、滑らかさ (平均vs今日)
        - [ ] 顔/視線の動きゲージ (`sight_face_metrics_card_report`)
            - [ ] Faceゲージ、Sightゲージ (セッションサマリー)
    - **詳細分析セクショングループ:**
        - [ ] セクションタイトル表示 (`質問1を回答している時の状態`)
        - **発話/感情グリッド (2カラム):**
            - [ ] 発話内容番号付きリスト (`transcribed_speech_card_report`)
            - [ ] 発話中感情変化積み上げ棒グラフ (`emotion_change_by_utterance_card`)
                - [ ] 主要6感情の時系列構成比表示
                - [ ] 凡例実装 (幸せ, 哀しみ, 怒り, 嫌悪, 恐れ, 驚き)
    - **センチメントトレンドセクショングループ:**
        - [ ] センチメントトレンド折れ線グラフ (`overall_sentiment_trend_report`)
            - [ ] ポジ/ネガ/ニュートラルの時系列表示 (セッション全体)
- [ ] **UX検討:**
    - [ ] レポート情報の構造化と分かりやすさ
    - [ ] 各グラフの読み解きやすさ
- [ ] **アクセシビリティ対応:**
    - [ ] コントラスト確認 (特にグラフ内カラー)
    - [ ] 色依存でない情報伝達の担保 (凡例、ラベル)
    - [ ] フォントサイズの適切性確認 (グラフ軸ラベル等)
    - [ ] 情報階層の明確化
- [ ] **将来的な機能拡張検討 (`future_enhancements`):**
    - [ ] 詳細行動分析レポートセクションの設計・実装検討
        - [ ] 年齢・性別推定 (参考情報) の表示方法検討
        - [ ] 沈黙時間の詳細表示方法検討
        - [ ] 言い淀み回数・箇所の表示方法検討
        - [ ] うなずき回数の表示方法検討
        - [ ] 声の質の詳細分析表示方法検討
        - [ ] 笑い回数の表示方法検討

## テスト・品質保証

- [ ] **機能テスト:**
    - [ ] 各分析項目の精度テスト
    - [ ] リアルタイム表示の動作確認
    - [ ] レポート生成の正確性テスト
    - [ ] 自由対話モードの対話品質テスト
- [ ] **UI/UXテスト:**
    - [ ] 各画面の表示崩れチェック (レスポンシブ対応含む)
    - [ ] 操作性の確認
    - [ ] 情報の分かりやすさ評価
- [ ] **パフォーマンステスト:**
    - [ ] リアルタイム分析時の負荷テスト
    - [ ] レポート生成時間の計測
- [ ] **アクセシビリティテスト:**
    - [ ] WCAG基準に基づいた確認 (可能な範囲で)

## ドキュメント・その他

- [ ] ユーザーマニュアル作成
- [ ] API仕様書作成 (内部用・外部連携用)
- [ ] プライバシーポリシーの整備 (特にデモグラフィック情報)
- [ ] 利用規約の整備
- [ ] サービス紹介ページコンテンツ作成

```UI/UX.yaml
product_context:
  product_name: TANREN
  tagline_ja: マルチモーダルAIを活用したロールプレイング診断・感情分析プラットフォーム
  description_ja: |
    TANRENは、独自の高精度な対話AI、音声認識AI、映像認識AI、マルチモーダルAIを活用し、
    人間との会話に近い実践的な接客・営業シーンを想定したロールプレイング体験を提供します。
    「自由対話モード」では、設定した定型的な会話だけでなく、バリエーション豊富なロールプレイングを実現します。
    社員のコミュニケーションスキル向上、自己の潜在的な長所・短所の発見、日々の変化への気づきを促進することを目的としています。
  key_features_ja:
    - 自由対話モードによる実践的ロールプレイング
    - マルチモーダルAIによる詳細な感情・行動分析
    - 客観的な改善点のフィードバック (接客・営業スキル)
    - 潜在的な強み・弱み、日々の変化の可視化
  target_audience_ja:
    - 接客スキルを向上させたい従業員
    - 営業パフォーマンスを高めたい営業担当者
    - 人材育成・研修担当者
    - 自己理解を深めたい個人
  utilized_apis_ja:
    - マルチモーダルAI
    - 音声認識AI
    - 映像認識AI
    - 高精度対話AI (TANREN独自)
  expected_benefits_ja:
    - 社員の接客や営業における改善点を客観的に分析
    - 自身の潜在的な長所短所・日々の変化への気づきの促進
    - 対応品質の向上
    - トレーニング効果の最大化と効率化
  analyzable_items:
    core_emotions:
      - name_ja: 幸福度
        ui_mapping_realtime: emotion_tracker_card_realtime.emotion_distribution_radar (幸せ)
        ui_mapping_report: emotion_change_by_utterance_card.emotion_distribution_over_utterances (幸せ)
      - name_ja: 怒り度
        ui_mapping_realtime: emotion_tracker_card_realtime.emotion_distribution_radar (怒り)
        ui_mapping_report: emotion_change_by_utterance_card.emotion_distribution_over_utterances (怒り)
      - name_ja: 哀しみ度
        ui_mapping_realtime: emotion_tracker_card_realtime.emotion_distribution_radar (哀しみ)
        ui_mapping_report: emotion_change_by_utterance_card.emotion_distribution_over_utterances (哀しみ)
      - name_ja: 恐れ度
        ui_mapping_realtime: emotion_tracker_card_realtime.emotion_distribution_radar (恐れ)
        ui_mapping_report: emotion_change_by_utterance_card.emotion_distribution_over_utterances (恐れ)
      - name_ja: 驚き度
        ui_mapping_realtime: emotion_tracker_card_realtime.emotion_distribution_radar (驚き)
        ui_mapping_report: emotion_change_by_utterance_card.emotion_distribution_over_utterances (驚き)
      - name_ja: 嫌悪度
        ui_mapping_realtime: emotion_tracker_card_realtime.emotion_distribution_radar (嫌悪)
        ui_mapping_report: emotion_change_by_utterance_card.emotion_distribution_over_utterances (嫌悪)
    sentiment:
      - name_ja: ポジティブ度
        ui_mapping_realtime: emotion_trend_card_realtime.emotion_sentiment_timeseries
        ui_mapping_report: overall_sentiment_trend_report.sentiment_timeseries_report
      - name_ja: ネガティブ度
        ui_mapping_realtime: emotion_trend_card_realtime.emotion_sentiment_timeseries
        ui_mapping_report: overall_sentiment_trend_report.sentiment_timeseries_report
      - name_ja: ニュートラル度
        ui_mapping_realtime: emotion_trend_card_realtime.emotion_sentiment_timeseries
        ui_mapping_report: overall_sentiment_trend_report.sentiment_timeseries_report
    demographics:
      - name_ja: 年齢推定
        ui_mapping_realtime: not_displayed
        ui_mapping_report: not_displayed
        note_ja: バックエンドで分析可能。レポート画面での表示を検討可能 (例: 参考情報として)。個人情報保護に配慮。
      - name_ja: 性別推定
        ui_mapping_realtime: not_displayed
        ui_mapping_report: not_displayed
        note_ja: バックエンドで分析可能。レポート画面での表示を検討可能 (例: 参考情報として)。個人情報保護に配慮。
    behavioral_metrics:
      - name_ja: まばたき回数
        ui_mapping_realtime: face_map_visualization_card_realtime.facial_landmark_wireframe (間接的)
        ui_mapping_report: conversation_status_card.conversation_parameters_radar
      - name_ja: 視線の動き
        ui_mapping_realtime: sight_face_metrics_card_realtime.sight_movement_meter
        ui_mapping_report: sight_face_metrics_card_report.sight_movement_meter_report
      - name_ja: 顔の動き
        ui_mapping_realtime: sight_face_metrics_card_realtime.face_movement_meter
        ui_mapping_report: sight_face_metrics_card_report.face_movement_meter_report
        also_ui_mapping_realtime: face_map_visualization_card_realtime.facial_landmark_wireframe
      - name_ja: 沈黙時間
        ui_mapping_realtime: not_explicitly_displayed
        ui_mapping_report: conversation_status_card.conversation_parameters_radar (会話の間 に関連)
        note_ja: レポートの会話状態レーダーチャートの「会話の間」に部分的に反映。より直接的な指標としてレポートに追加検討可能。
      - name_ja: 言い淀み
        ui_mapping_realtime: not_displayed
        ui_mapping_report: not_displayed
        note_ja: 音声認識AIからの抽出項目。レポート画面の会話分析セクションに追加検討可能。
      - name_ja: 会話スピード
        ui_mapping_realtime: not_explicitly_displayed
        ui_mapping_report: conversation_status_card.conversation_parameters_radar
      - name_ja: うなずき回数
        ui_mapping_realtime: face_map_visualization_card_realtime.facial_landmark_wireframe (間接的)
        ui_mapping_report: not_displayed
        note_ja: 映像認識AIからの抽出項目。レポート画面の行動分析セクションに追加検討可能。
      - name_ja: 声の質 (例: トーン, ピッチの安定性, 声量)
        ui_mapping_realtime: audio_visualizer (音声レベルのみ表示)
        ui_mapping_report: not_displayed
        note_ja: 音声認識AIからの抽出項目。詳細な分析結果をレポート画面に追加検討可能。
      - name_ja: 笑い回数
        ui_mapping_realtime: not_displayed (感情「幸せ」とは別にカウント)
        ui_mapping_report: not_displayed
        note_ja: 映像・音声認識AIからの抽出項目。レポート画面の行動分析セクションに追加検討可能。
  contact_information_ja: |
    TANRENでは他にもマルチモーダルAIを活用した感情分析の事例がございます。
    AIとのロールプレイング診断に関するサービス詳細やご利用料金についてはお問合せフォームよりお問合せ下さい。

screens:
  - screen:
      id: emotion_analysis_dashboard_alpha_v1
      name_ja: リアルタイム感情分析ダッシュボード (TANREN自由対話モード)
      description_ja: |
        TANRENの「自由対話モード」におけるリアルタイムフィードバック画面。
        ユーザーがAIと自由な会話（例：「1分ほどお話をしてください」という指示に基づく発話）を行う際、
        音声と表情をリアルタイムで分析し、感情状態、視線・顔の動き、発話内容を多角的にフィードバックします。
        これにより、接客・営業などのロールプレイング中の自己モニタリングと即時的な気づき・改善を支援します。
      purpose_ja: |
        - ユーザーが自身のコミュニケーション中の感情や非言語的行動をリアルタイムで客観視できるようにする。
        - TANRENを用いた実践的なロールプレイングトレーニングにおいて、即座のフィードバックにより学習効果を高める。
        - 自身の潜在的な話し方の癖や感情表出のパターンに気づくきっかけを提供する。
        - セッション中のパフォーマンスを自己調整するための情報を提供する。
      design_concept: # (変更なし)
        philosophy_ja: |
          ユーザーに対する透明性の高い情報提供と、直感的で分かりやすいフィードバックを通じて、
          自己理解を深める体験を提供する。
        style_keywords_ja: [クリーン, モダン, 情報指向, ユーザーフレンドリー, ソフト, テック感, リアルタイム]
      visual_style: # (変更なし)
        # ... (前回のYAMLから省略)
      layout_structure: # (変更なし)
        # ... (前回のYAMLから省略)
      components: # (主要なコンポーネントと訴求文との関連を強化)
        - component_group: header_instruction_area
          area_name: header_instruction
          elements:
            - { element: main_title, text_ja: "今日の調子はいかがですか？", purpose_ja: "TANREN自由対話モードのセッション開始を促す問いかけ。" }
            - { element: sub_instruction, text_ja: "1分ほどお話をしてください", purpose_ja: "ユーザーに自由な発話を促し、セッション時間（目安）を提示。" }
        - component_group: center_video_interaction_panel
          # ...
          elements:
            - { element: video_feed_container, id: user_camera_feed, purpose_ja: "ユーザーの表情や顔の動きを映像認識AIで捉えるための入力。" }
            - { element: video_controls_panel, elements: [
                { element: audio_visualizer, purpose_ja: "音声認識AIが音声を捉えていることを視覚的にフィードバック。声の質分析の基礎情報。"},
                # ... 他のコントロール
              ]}
        - component_group: left_emotion_analysis_panel
          # ...
          elements:
            - element: emotion_radar_card
              id: emotion_tracker_card_realtime
              purpose_ja: |
                マルチモーダルAIが分析した現在の主要6感情（幸福、驚き、恐れ、嫌悪、怒り、哀しみ）の
                相対的な強度をリアルタイムに表示。自己の感情状態を客観視する。
                分析項目: 幸福度, 怒り度, 哀しみ度, 恐れ度, 驚き度, 嫌悪度。
            - element: emotion_trend_graph_card
              id: emotion_trend_card_realtime
              purpose_ja: |
                セッション中の感情のポジティブ・ネガティブ・ニュートラルの傾向を時系列で表示。
                感情の起伏や変化のパターンを把握する。
                分析項目: ポジティブ度, ネガティブ度, ニュートラル度。
        - component_group: right_behavioral_metrics_panel
          # ...
          elements:
            - element: gaze_face_movement_card
              id: sight_face_metrics_card_realtime
              purpose_ja: |
                映像認識AIによる顔と視線の動きの活発度をリアルタイムで数値化・ゲージ表示。
                非言語的コミュニケーションの指標。
                分析項目: 視線の動き, 顔の動き。
            - element: face_landscape_map_card
              id: face_map_visualization_card_realtime
              purpose_ja: |
                顔の特徴点の動きをワイヤーフレームでリアルタイムに可視化。
                微細な表情の変化、うなずき、まばたきなどを捉える映像認識AIの分析結果を視覚的にフィードバック。
                分析項目: 顔の動き, (間接的に)まばたき回数, うなずき回数。
        - component_group: footer_transcription_area
          # ...
          elements:
            - element: spoken_text_display_card
              id: transcription_output_card_realtime
              purpose_ja: |
                音声認識AIによるリアルタイム文字起こし。発話内容と感情・行動の変化を照らし合わせて
                自己分析する材料を提供。言い淀み分析の基礎情報。
      overall_ux_summary_ja: | # (1枚目のサマリーは変更なし)
        このUIは、ユーザーが自身の感情や行動パターンについてリアルタイムで洞察を得ることを支援する。
        ビデオフィードを通じた直接的な関与と多様な分析モジュールが、自己リフレクションを促進する。
      accessibility_notes_ja: # (1枚目のアクセシビリティノートは変更なし)
        # ... (前回のYAMLから省略)

  - screen:
      id: emotion_analysis_report_beta_v1
      name_ja: 感情分析結果レポート (TANREN)
      description_ja: |
        TANRENの自由対話セッション後、または設定シナリオに基づくロールプレイング後の詳細な分析結果レポート画面。
        ユーザーの感情の推移、会話の特徴（まばたき、落ち着き、会話スピード等）、視線や顔の動き、
        具体的な発話内容とそれに対応する感情の変化を統合的に提示します。
        これにより、接客・営業スキルの客観的な改善点の分析や、自身の潜在的な長所・短所、日々の変化への気づきを支援します。
      purpose_ja: |
        - TANRENを用いたロールプレイングセッションの結果を多角的に振り返り、自己理解を深める。
        - 客観的なデータに基づき、コミュニケーションにおける具体的な改善点を特定する。
        - 自身では気づきにくい潜在的な長所や短所、話し方の癖、感情表出のパターンを発見する。
        - 定期的な利用を通じて、日々のコンディション変化やスキルの成長を追跡・管理する。
        - 営業人材や接客担当者の対応品質向上のための分析資料として活用する。
      design_concept: # (変更なし)
        # ... (前回のYAMLから省略)
      visual_style: # (変更なし)
        # ... (前回のYAMLから省略)
      layout_structure: # (変更なし)
        # ... (前回のYAMLから省略)
      components: # (主要なコンポーネントと訴求文との関連を強化)
        - component_group: header_title_group
          # ...
          elements:
            # ...
            - element: description_text
              text_ja: |
                話している時の顔の表情、声の抑揚、発話内容から、あなたの感情と
                会話の特徴を分析します。TANRENはこれらの情報を基に、あなたの接客・営業スキル向上や
                自己理解をサポートします。
        - component_group: summary_metrics_row
          # ...
          elements:
            - element: conversation_status_radar_card
              id: conversation_status_card
              purpose_ja: |
                会話に関する複数の指標（まばたき回数、落ち着き、会話スピード、会話の間、会話の滑らかさ）を
                「平均」データ（または目標値）と「今回のセッション」データで比較。
                自身の会話スタイルや改善点を客観的に把握する。
                分析項目: まばたき回数, 会話スピード, 沈黙時間 (会話の間として関連), (間接的に)言い淀み (滑らかさとして関連)。
            - element: gaze_face_movement_card_report
              id: sight_face_metrics_card_report
              purpose_ja: |
                セッション中の顔と視線の動きの活発度を総括的に表示。
                非言語的コミュニケーションの傾向を把握する。
                分析項目: 視線の動き, 顔の動き。
        - component_group: detailed_analysis_section_group
          # ...
          elements:
            # ...
            - element: utterance_emotion_grid
              # ...
              items:
                - item: transcribed_speech_numbered_list_card
                  id: transcribed_speech_card_report
                  purpose_ja: |
                    セッション中の発話を区切りごとに表示。
                    音声認識AIによる文字起こし結果。特定の発話がどのような感情や行動と関連していたかを確認する。
                    言い淀み分析の対象テキスト。
                - item: emotion_change_stacked_bar_chart_card
                  id: emotion_change_by_utterance_card
                  purpose_ja: |
                    発話の区切りごとに、主要6感情の構成比率を積み上げ棒グラフで表示。
                    マルチモーダルAIによる分析結果。どのような話題や言葉で感情が変化したかを詳細に追跡する。
                    分析項目: 幸福度, 怒り度, 哀しみ度, 恐れ度, 驚き度, 嫌悪度。
        - component_group: sentiment_trend_section_group
          # ...
          elements:
            - element: overall_sentiment_trend_card
              id: overall_sentiment_trend_report
              purpose_ja: |
                セッション全体を通じた感情のポジティブ・ネガティブ・ニュートラルの傾向を時系列で表示。
                会話全体の雰囲気や感情の大きな流れを把握する。
                分析項目: ポジティブ度, ネガティブ度, ニュートラル度。
      overall_ux_summary_ja: |
        この分析結果レポート画面は、TANRENによるロールプレイングセッションの詳細な振り返りを可能にする。
        会話全体の傾向、非言語的行動、具体的な発話内容とそれに対応する感情のダイナミクス、
        そして全体的な感情の推移を組み合わせることで、ユーザーは多角的な自己分析を行い、
        客観的な改善点や潜在的な長所・短所を発見できる。
      accessibility_notes_ja: # (変更なし)
        # ... (前回のYAMLから省略)
      future_enhancements:
        - section_id: additional_behavioral_metrics_report
          title_ja: 詳細行動分析レポート
          description_ja: 訴求文にあるが現在のレポートUIに明示的でない分析項目を追加表示するセクション。
          items:
            - name_ja: 年齢・性別推定 (参考情報)
              display_format: テキストラベル
              note_ja: 個人情報保護に配慮し、表示は任意または集計データとしての利用を検討。
            - name_ja: 沈黙時間の詳細
              display_format: 数値 (例:総沈黙時間、平均沈黙時間、最長沈黙区間)
            - name_ja: 言い淀み回数・箇所
              display_format: 数値、発話内容テキストへのハイライト
            - name_ja: うなずき回数
              display_format: 数値
            - name_ja: 声の質の詳細分析
              display_format: グラフまたは数値 (例: ピッチの変動幅、声量の安定性、トーン分類など)
            - name_ja: 笑い回数
              display_format: 数値
              
```


以上、この設計指示書に従い、まずはモックアップを生成します