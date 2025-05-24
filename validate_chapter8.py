#!/usr/bin/env python3
"""
第8章品質検証スクリプト - Chapter 8 Quality Validation Script
"""

import os
import sys
import json
import re
from datetime import datetime
from pathlib import Path

# novel_systemモジュールのパスを追加
sys.path.append(os.path.join(os.path.dirname(__file__), 'novel_system'))

try:
    from plot_manager import PlotManager
    from validator import Validator, QualityReport
except ImportError as e:
    print(f"❌ モジュールインポートエラー: {e}")
    sys.exit(1)

def validate_chapter_8():
    """第8章の品質検証を実行"""
    print("🔍 第8章品質検証開始")
    
    try:
        # 第8章ファイルを読み込み
        chapter_file = "chapter_08.md"
        if not os.path.exists(chapter_file):
            print(f"❌ ファイルが見つかりません: {chapter_file}")
            return False, None
        
        with open(chapter_file, 'r', encoding='utf-8') as f:
            chapter_content = f.read()
        
        # PlotManagerとValidatorを初期化
        plot_manager = PlotManager()
        validator = Validator(plot_manager)
        
        # 品質検証を実行
        quality_report = validator.validate_chapter(chapter_content, 8)
        
        # 詳細レポートを生成
        detailed_report = validator.generate_detailed_report(quality_report)
        
        # レポートファイルを保存
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = f"chapter_08_quality_report_{timestamp}.md"
        
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(detailed_report)
        
        # JSONレポートも保存
        json_file = f"chapter_08_quality_report_{timestamp}.json"
        with open(json_file, 'w', encoding='utf-8') as f:
            f.write(quality_report.to_json())
        
        # 結果を表示
        print(f"✅ 品質検証完了:")
        print(f"  📊 総合スコア: {quality_report.overall_score:.2f}")
        print(f"  📋 総合判定: {'✅ 合格' if quality_report.overall_passed else '❌ 不合格'}")
        print(f"  📄 詳細レポート: {report_file}")
        print(f"  📄 JSONレポート: {json_file}")
        
        # 個別項目の結果
        print(f"\n📈 詳細評価:")
        print(f"  文字数: {'✅' if quality_report.character_count.passed else '❌'} (スコア: {quality_report.character_count.score:.2f})")
        print(f"  セリフ比率: {'✅' if quality_report.dialogue_ratio.passed else '❌'} (スコア: {quality_report.dialogue_ratio.score:.2f})")
        print(f"  構成: {'✅' if quality_report.structure.passed else '❌'} (スコア: {quality_report.structure.score:.2f})")
        print(f"  キャラクター整合性: {'✅' if quality_report.character_consistency.passed else '❌'} (スコア: {quality_report.character_consistency.score:.2f})")
        print(f"  プロット整合性: {'✅' if quality_report.plot_consistency.passed else '❌'} (スコア: {quality_report.plot_consistency.score:.2f})")
        print(f"  文章品質: {'✅' if quality_report.writing_quality.passed else '❌'} (スコア: {quality_report.writing_quality.score:.2f})")
        
        # 改善提案があれば表示
        if not quality_report.overall_passed:
            print(f"\n💡 改善提案:")
            all_suggestions = []
            for result in [
                quality_report.character_count, 
                quality_report.dialogue_ratio, 
                quality_report.structure,
                quality_report.character_consistency, 
                quality_report.plot_consistency, 
                quality_report.writing_quality
            ]:
                all_suggestions.extend(result.suggestions)
            
            for i, suggestion in enumerate(all_suggestions, 1):
                print(f"   {i}. {suggestion}")
        
        return True, quality_report
        
    except Exception as e:
        print(f"❌ 品質検証エラー: {e}")
        return False, None

if __name__ == "__main__":
    success, quality_report = validate_chapter_8()
    if success:
        print(f"\n🎉 第8章品質検証完了！")
        if quality_report and quality_report.overall_passed:
            print("📊 品質基準をクリアしています！")
        else:
            print("⚠️ 一部改善の余地があります")
    else:
        print("\n❌ 品質検証に失敗しました")
        sys.exit(1)