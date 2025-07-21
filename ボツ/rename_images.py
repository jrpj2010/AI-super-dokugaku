#!/usr/bin/env python3
"""
画像ファイルをリネームするスクリプト
image_1_xxx.png から image_100_xxx.png を指定された順番でリネーム
"""

import os
import shutil
from pathlib import Path

# スクリプトが存在するディレクトリを取得
script_dir = Path(__file__).parent
images_dir = script_dir / "images"

# リネームマッピング (順番 -> 新しいファイル名)
rename_mapping = {
    1: "13_beginner_portfolio-site-01-Before",
    2: "13_beginner_portfolio-site-02-After",
    3: "12_tatsuya_beginner_copilot-notebook-01-Before",
    4: "12_tatsuya_beginner_copilot-notebook-02-After",
    5: "11_kyoko_beginner_gemini-wall-hitting-01-Before",
    6: "11_kyoko_beginner_gemini-wall-hitting-02-After",
    7: "10_tatsuya_beginner_voice-memo-structuring-01-Before",
    8: "10_tatsuya_beginner_voice-memo-structuring-02-After",
    9: "09_kyoko_advanced_copilot-illustration-01-Before",
    10: "09_kyoko_advanced_copilot-illustration-02-After",
    11: "08_tatsuya_beginner_word-to-powerpoint-01-Before",
    12: "08_tatsuya_beginner_word-to-powerpoint-02-After",
    13: "07_kyoko_beginner_simplification-01-Before",
    14: "07_kyoko_beginner_simplification-02-After",
    15: "06_kyoko_intermediate_copilot-coaching-01-Before",
    16: "06_kyoko_intermediate_copilot-coaching-02-After",
    17: "05_tatsuya_beginner_gemini-in-workspace-01-Before",
    18: "05_tatsuya_beginner_gemini-in-workspace-02-After",
    19: "04_advanced_ai-research-agent-01-Before",
    20: "04_advanced_ai-research-agent-02-After",
    21: "03_tatsuya_beginner_personalized-news-report-01-Before",
    22: "03_tatsuya_beginner_personalized-news-report-02-After",
    23: "02_kyoko_beginner_web-summary-01-Before",
    24: "02_kyoko_beginner_web-summary-02-After",
    25: "01_beginner_organize-thoughts-01-Before",
    26: "01_beginner_organize-thoughts-02-After",
    27: "34_advanced_learning-community-01-Before",
    28: "34_advanced_learning-community-02-After",
    29: "33_intermediate_weekly-report-01-Before",
    30: "33_intermediate_weekly-report-02-After",
    31: "32_intermediate_gamification-progress-01-Before",
    32: "32_intermediate_gamification-progress-02-After",
    33: "31_beginner_digital-certificate-01-Before",
    34: "31_beginner_digital-certificate-02-After",
    35: "30_intermediate_motivation-coach-01-Before",
    36: "30_intermediate_motivation-coach-02-After",
    37: "29_intermediate_business-english-01-Before",
    38: "29_intermediate_business-english-02-After",
    39: "28_beginner_ai-english-teacher-01-Before",
    40: "28_beginner_ai-english-teacher-02-After",
    41: "27_intermediate_feynman-technique-01-Before",
    42: "27_intermediate_feynman-technique-02-After",
    43: "26_beginner_daily-reflection-01-Before",
    44: "26_beginner_daily-reflection-02-After",
    45: "25_intermediate_exam-analysis-01-Before",
    46: "25_intermediate_exam-analysis-02-After",
    47: "24_beginner_personalized-quiz-01-Before",
    48: "24_beginner_personalized-quiz-02-After",
    49: "23_kyoko_intermediate_notebooklm-self-learning-01-Before",
    50: "23_kyoko_intermediate_notebooklm-self-learning-02-After",
    51: "22_tatsuya_beginner_academic-paper-summary-01-Before",
    52: "22_tatsuya_beginner_academic-paper-summary-02-After",
    53: "21_beginner_youtube-to-text-01-Before",
    54: "21_beginner_youtube-to-text-02-After",
    55: "20_beginner_listen-to-books-01-Before",
    56: "20_beginner_listen-to-books-02-After",
    57: "19_beginner_time-reminder-01-Before",
    58: "19_beginner_time-reminder-02-After",
    59: "18_intermediate_emotion-wave-analysis-01-Before",
    60: "18_intermediate_emotion-wave-analysis-02-After",
    61: "17_intermediate_learning-style-01-Before",
    62: "17_intermediate_learning-style-02-After",
    63: "16_advanced_stumbling-prediction-01-Before",
    64: "16_advanced_stumbling-prediction-02-After",
    65: "15_beginner_backward-thinking-01-Before",
    66: "15_beginner_backward-thinking-02-After",
    67: "14_intermediate_custom-learning-roadmap-01-Before",
    68: "14_intermediate_custom-learning-roadmap-02-After",
    69: "49_beginner_book-recommendation-01-Before",
    70: "49_beginner_book-recommendation-02-After",
    71: "47_intermediate_market-value-career-01-Before",
    72: "47_intermediate_market-value-career-02-After",
    73: "45_intermediate_visualize-physics-01-Before",
    74: "45_intermediate_visualize-physics-02-After",
    75: "44_intermediate_metaphor-creation-01-Before",
    76: "44_intermediate_metaphor-creation-02-After",
    77: "43_advanced_voice-memo-research-01-Before",
    78: "43_advanced_voice-memo-research-02-After",
    79: "42_advanced_analyze-thinking-bias-01-Before",
    80: "42_advanced_analyze-thinking-bias-02-After",
    81: "41_intermediate_business-plan-validation-01-Before",
    82: "41_intermediate_business-plan-validation-02-After",
    83: "40_advanced_devil-advocate-01-Before",
    84: "40_advanced_devil-advocate-02-After",
    85: "39_tatsuya_beginner_devils-advocate-01-Before",
    86: "39_tatsuya_beginner_devils-advocate-02-After",
    87: "38_tatsuya_intermediate_chain-of-thought-01-Before",
    88: "38_tatsuya_intermediate_chain-of-thought-02-After",
    89: "37_advanced_fact-opinion-separation-01-Before",
    90: "37_advanced_fact-opinion-separation-02-After",
    91: "36_tatsuya_intermediate_gemini-deep-research-01-Before",
    92: "36_tatsuya_intermediate_gemini-deep-research-02-After",
    93: "35_intermediate_concept-map-01-Before",
    94: "35_intermediate_concept-map-02-After",
    95: "50_tatsuya_intermediate_ai-era-output-thinking-01-Before",
    96: "50_tatsuya_intermediate_ai-era-output-thinking-02-After",
    97: "46_tatsuya_advanced_notebooklm-knowledge-base-01-Before",
    98: "46_tatsuya_advanced_notebooklm-knowledge-base-02-After",
    99: "48_tatsuya_advanced_future-career-strategy-01-Before",
    100: "48_tatsuya_advanced_future-career-strategy-02-After"
}

def main():
    """メイン処理"""
    if not images_dir.exists():
        print(f"エラー: imagesディレクトリが存在しません: {images_dir}")
        return
    
    # リネーム処理の実行
    print("画像ファイルのリネームを開始します...")
    
    # まず一時的な名前にリネーム（ファイル名の重複を避けるため）
    temp_renames = []
    for num, new_name in rename_mapping.items():
        old_filename = f"image_{num}_"
        
        # 該当するファイルを探す
        found = False
        for file in images_dir.glob(f"{old_filename}*.png"):
            temp_name = f"temp_{num}_{file.name}"
            temp_path = images_dir / temp_name
            
            try:
                file.rename(temp_path)
                temp_renames.append((temp_path, f"{new_name}.png"))
                print(f"✓ 一時リネーム: {file.name} → {temp_name}")
                found = True
                break
            except Exception as e:
                print(f"✗ エラー: {file.name} のリネームに失敗: {e}")
        
        if not found:
            print(f"⚠️  警告: image_{num}_*.png が見つかりません")
    
    # 最終的な名前にリネーム
    print("\n最終的な名前にリネーム中...")
    success_count = 0
    for temp_path, final_name in temp_renames:
        final_path = images_dir / final_name
        
        try:
            temp_path.rename(final_path)
            print(f"✓ 最終リネーム: {temp_path.name} → {final_name}")
            success_count += 1
        except Exception as e:
            print(f"✗ エラー: {temp_path.name} → {final_name} のリネームに失敗: {e}")
    
    print(f"\n完了: {success_count}/{len(rename_mapping)} ファイルを正常にリネームしました")

if __name__ == "__main__":
    main()