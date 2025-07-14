import os
import json
import csv

# --- 設定 ---
# JSONファイルが格納されているディレクトリ
input_dir = "/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250711 SBクリエイティブ定例/第一部 JSONフォルダ"

# 出力するCSVファイル名
output_file = '/Users/jrpj2010/vibe-coding/sato_managed_contents/AI超独学　執筆関連/20250711 SBクリエイティブ定例/第一部 JSONフォルダ/output.csv'

# CSVのヘッダー（カラム名）
headers = [
    'tips', 'Name', 'targetPersona', 'level', 'problemToSolve',
    'traditionalMethodDiagram', 'aiMethodDiagram', 'solutionText',
    'step1Headline', 'step1Example', 'step2Headline', 'step2Example',
    'step3Headline', 'step3Example', 'effect'
]

# --- 技名（Name）の定義 ---
# ファイル名と日本語のキャッチーな技名を対応させる
# 営業担当者や非エンジニアにも響くような名前を考案
name_map = {
    '01_beginner_organize-thoughts.json': '10分で脳内デフラグ！AI秘書術',
    '02_intermediate_idea-100-knock.json': '脳みそが痺れる！AIアイデア100本ノック',
    '03_advanced_devil-advocate.json': 'あなたの企画、AIがぶっ壊します',
    '04_intermediate_extract-debate-axis.json': '炎上の火種、AIが見抜きます',
    '05_intermediate_concept-map.json': '思考の迷子よ、さようなら。AIコンセプトマップ術',
    '06_advanced_analyze-thinking-bias.json': 'あなたの「思い込み」、AIが炙り出します',
    '07_beginner_backward-thinking.json': 'ゴールから逆算する、AI未来予測',
    '08_intermediate_emotion-wave-analysis.json': '心の波を可視化する、AI感情分析',
    '09_advanced_summon-great-minds.json': '歴史上の偉人、AIで口寄せします',
    '10_advanced_find-life-purpose.json': '人生の目的、AIと見つけよう',
    '11_beginner_listen-to-books.json': '積読よ、さらば。AIと始める「耳読書」革命',
    '12_intermediate_translate-research-papers.json': '世界の最新論文、AIが日本語で３行解説',
    '13_beginner_youtube-to-text.json': 'YouTube学習が捗る、AI文字起こし要約術',
    '14_intermediate_exam-analysis.json': '資格試験、AIが「出題傾向」を完全分析',
    '15_beginner_ai-english-teacher.json': 'ポケットの中のネイティブ講師、24時間AI英会話',
    '16_advanced_ai-research-agent.json': '情報収集は寝て待て。AIリサーチエージェント',
    '17_intermediate_metaphor-creation.json': '難しい話も、AI比喩表現で一発理解',
    '18_advanced_fact-opinion-separation.json': 'それって「事実」？「意見」？ AIが瞬時に仕分け',
    '19_intermediate_feynman-technique.json': '専門知識を小学生に教えるつもりで、AIと学ぶ',
    '20_beginner_personalized-quiz.json': '記憶に刻む、あなただけのAIオーダーメイドクイズ',
    '21_intermediate_custom-learning-roadmap.json': '最短ルートを描く、AI学習ロードマップ設計',
    '22_advanced_historical-simulation.json': '歴史上の人物になりきり、AIと未来を語る',
    '23_intermediate_visualize-physics.json': '物理法則、AIが「見える化」します',
    '24_beginner_book-recommendation.json': '次読むべき一冊、AI書店員がオススメします',
    '25_advanced_voice-memo-research.json': 'ボイスメモが、AIで「宝の山」に変わる',
    '26_beginner_instant-writing.json': '1行の指示が、AIで1000字の文章に化ける',
    '27_beginner_prep-report.json': '会議報告書、AIが30秒で下書き作成',
    '28_intermediate_business-english.json': '海外との取引、AIが完璧なビジネス英語を指南',
    '29_advanced_presentation-story.json': '退屈なプレゼンが、心を動かす物語に。AI構成術',
    '30_intermediate_catchcopy-persona.json': 'あの人に届け！AIペルソナ別キャッチコピー',
    '31_beginner_weakness-to-strength.json': 'あなたの弱み、AIが「最強の武器」にリフレーミング',
    '32_intermediate_market-value-career.json': '自分の市場価値、AIキャリアアドバイザーが診断',
    '33_advanced_story-structure.json': '凡人の体験が、神話に変わる。AIストーリーテリング',
    '34_intermediate_blog-structure.json': '読者が最後まで離さない、AIブログ構成術',
    '35_beginner_beginner-manual.json': '初めての〇〇、AIがあなた専用マニュアル作成',
    '36_advanced_code-debug-refactor.json': 'スパゲッティコードが、AIで懐石料理に変わる',
    '37_beginner_vibe-graph.json': '人間関係の悩み、AIが相関図でスッキリ解決',
    '38_intermediate_business-plan-validation.json': 'その事業計画、AIがとことんダメ出しします',
    '39_advanced_side-business-ideas.json': '週末起業の種、AIと見つける副業アイデア',
    '40_beginner_portfolio-site.json': 'あなたの実績、AIが魅力的なポートフォリオに',
    '41_beginner_baby-step-plan.json': '大きな目標も、AIと一緒なら怖くない。ベイビーステップ計画',
    '42_intermediate_motivation-coach.json': '三日坊主を卒業！AIモチベーションコーチ',
    '43_beginner_daily-reflection.json': '１日の終わり、AIと「成長日記」をつけてみる',
    '44_intermediate_gamification-progress.json': '退屈な学びが冒険に！AIゲーミフィケーション',
    '45_advanced_learning-community.json': '仲間と学ぶ、AIがファシリテートする学習コミュニティ',
    '46_beginner_time-reminder.json': '集中しすぎても大丈夫、AIタイムキーパー',
    '47_intermediate_learning-style.json': 'あなたに合う学び方、AIが見つけます',
    '48_advanced_stumbling-prediction.json': '挫折ポイント、AIが事前に予測してお知らせ',
    '49_beginner_digital-certificate.json': '学びの証、AIがデジタル修了証を発行',
    '50_intermediate_weekly-report.json': '週報作成、AIがあなたの１週間を物語にする',
    '51_kyoko_beginner_few-shot-prompt.json': 'AIを賢くする「お手本」プロンプト術',
    '52_kyoko_beginner_persona-setting.json': 'AIよ、〇〇になりきれ！ペルソナ設定術',
    '53_kyoko_beginner_copilot-email-draft.json': '丁寧なメール、Copilotが瞬時に下書き',
    '54_kyoko_beginner_teams-summary.json': '長引くTeams会議、Copilotが要点まとめ',
    '55_kyoko_beginner_gemini-wall-hitting.json': '行き詰まったらGeminiと壁打ち',
    '56_kyoko_beginner_ai-english-conversation.json': 'AI相手に、無限に英会話スパーリング',
    '57_kyoko_beginner_100-ideas.json': 'アイデアが出ない？AIと100本ノック',
    '58_kyoko_beginner_simplification.json': '難しいことを、やさしく。AI翻訳・解説術',
    '59_kyoko_beginner_web-summary.json': 'Webサイトの内容、AIが１分で要約',
    '60_kyoko_beginner_transcription.json': '会議の音声、AIが自動で文字起こし',
    '61_kyoko_intermediate_prompt-design-4-steps.json': 'AIを操る、魔法の「プロンプト」４ステップ設計術',
    '62_kyoko_intermediate_copilot-for-excel.json': 'Excel作業よ、さらば。Copilot自動化革命',
    '63_kyoko_intermediate_gemini-in-sheets.json': 'スプレッドシートが賢くなる、Gemini連携術',
    '64_kyoko_intermediate_notion-ai-task-extraction.json': '議事録から、Notion AIがタスクを自動抽出',
    '65_kyoko_intermediate_excel-macro-automation.json': 'Excelマクロ、AIが代わりに書きます',
    '66_kyoko_intermediate_copilot-coaching.json': 'あなたの専属コーチ、Copilotが伴走します',
    '67_kyoko_intermediate_ai-brainstorming.json': '一人ブレストの限界を超える、AI発想法',
    '68_kyoko_intermediate_linkedin-profile.json': '世界に通用する、AIプロフィール作成術',
    '69_kyoko_intermediate_gemini-trip-planning.json': '最高の旅行プラン、Geminiと作ろう',
    '70_kyoko_intermediate_notebooklm-self-learning.json': '膨大な資料は、NotebookLMと“対話”して学ぶ',
    '71_kyoko_advanced_competitor-analysis.json': 'ライバル丸裸、AI競合分析レポート',
    '72_kyoko_advanced_niche-market-analysis.json': '未開拓市場はどこ？AIと探すニッチ市場',
    '73_kyoko_advanced_linkedin-career-path.json': '理想のキャリア、LinkedInデータからAIが逆算',
    '74_kyoko_advanced_copilot-illustration.json': 'イメージを形に、Copilotお絵描き術',
    '75_kyoko_advanced_dify-app-builder.json': 'アイデアを、即アプリに。チームで育てるAI工房(Dify)',
    '76_tatsuya_beginner_devils-advocate.json': 'あなたの企画、AIが「悪魔の代弁者」になります',
    '77_tatsuya_beginner_word-to-powerpoint.json': 'Word文書から、AIがパワポを自動生成',
    '78_tatsuya_beginner_copilot-notebook.json': '思考の断片、Copilotがアイデアに昇華させる',
    '79_tatsuya_beginner_gemini-in-workspace.json': 'Google WorkspaceのAIアシスタント、Gemini活用術',
    '80_tatsuya_beginner_1on1-analysis.json': '1on1の会話、AIが客観分析＆改善提案',
    '81_tatsuya_beginner_personalized-news-report.json': 'あなた専用の朝刊、AIが毎朝お届け',
    '82_tatsuya_beginner_voice-memo-structuring.json': '移動中のヒラメキ、AIが構造化メモに変換',
    '83_tatsuya_beginner_analogy-generation.json': '例え話の名人、AIアナロジー生成',
    '84_tatsuya_beginner_academic-paper-summary.json': '難解な学術論文、AIがサクッと要約',
    '85_tatsuya_beginner_chatgpt-for-management.json': 'マネージャーの悩み、ChatGPTが解決します',
    '86_tatsuya_intermediate_chain-of-thought.json': 'AIに「思考のプロセス」を語らせる秘術',
    '87_tatsuya_intermediate_self-consistency.json': 'AIの回答精度を劇的に上げる、多数決プロンプト',
    '88_tatsuya_intermediate_copilot-for-excel-insights.json': 'Excelデータから、Copilotが隠れたインサイトを発見',
    '89_tatsuya_intermediate_gemini-deep-research.json': '一つのテーマを徹底的に。Gemini深掘りリサーチ',
    '90_tatsuya_intermediate_notion-ai-project-summary.json': 'Notionの散乱した情報、AIがプロジェクト要約',
    '91_tatsuya_intermediate_work-process-redesign.json': '非効率な業務プロセス、AIがBPRを提案',
    '92_tatsuya_intermediate_content-creation.json': 'コンテンツ大量生産、AIファクトリー構築術',
    '93_tatsuya_intermediate_gemini-multimodal-analysis.json': '画像も音声もグラフも、Geminiで一括分析',
    '94_tatsuya_intermediate_ai-era-output-thinking.json': 'AI時代のアウトプット思考法',
    '95_tatsuya_intermediate_customer-feedback-analysis.json': '顧客の“声なき声”、AIがレビューから聴き取る',
    '96_tatsuya_advanced_react-prompting.json': 'AIに「考え」「行動」させる、ReActプロンプト術',
    '97_tatsuya_advanced_notebooklm-knowledge-base.json': 'あなただけの第二の脳、NotebookLMナレッジベース構築',
    '98_tatsuya_advanced_n8n-ai-agent.json': '定型業務よ、さらば。ノーコードAIエージェント作成(n8n)',
    '99_tatsuya_advanced_future-career-strategy.json': 'AIと描く、3年後のキャリア戦略',
    '100_tatsuya_advanced_dify-for-teams.json': 'チームの知恵をAIに。Difyで内製AIボット開発'
}


# --- 処理開始 ---
print(f"処理を開始します。")
print(f"入力ディレクトリ: {input_dir}")
print(f"出力ファイル: {output_file}")

# 書き込み用のリストを初期化
all_rows = []

# ディレクトリ内のファイルをループ
try:
    file_list = os.listdir(input_dir)
    json_files = [f for f in file_list if f.endswith('.json')]

    # ファイル名冒頭の数字でソートする関数
    def get_filenumber(filename):
        try:
            return int(filename.split('_')[0])
        except (ValueError, IndexError):
            return float('inf')

    # ファイルリストをソート
    json_files.sort(key=get_filenumber)

    print(f"{len(json_files)}個のJSONファイルを検出しました（ファイル名順にソート済み）。")

    for index, filename in enumerate(json_files):
        filepath = os.path.join(input_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)

                # --- ここからが修正部分 ---

                # 1. 'tips'列に連番を設定 (1から開始)
                data['tips'] = index + 1

                # 2. 'Name'列を技名マップから設定
                data['Name'] = name_map.get(filename, filename.replace('.json', ''))

                # --- 修正部分ここまで ---

                # ヘッダーに対応するデータを抽出
                row = [data.get(header, '') for header in headers]
                all_rows.append(row)
        except json.JSONDecodeError:
            print(f"警告: {filename} は不正なJSONファイルのためスキップします。")
        except Exception as e:
            print(f"警告: {filename} の処理中にエラーが発生しました: {e}")

    # CSVファイルに書き込み
    if not all_rows:
        print("警告: 書き込むデータがありませんでした。処理を終了します。")
    else:
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            writer.writerows(all_rows)
        print(f"処理が完了しました。{len(all_rows)}行のデータが {output_file} に保存されました。")

except FileNotFoundError:
    print(f"エラー: 指定されたディレクトリが見つかりません: {input_dir}")
except Exception as e:
    print(f"予期せぬエラーが発生しました: {e}")
