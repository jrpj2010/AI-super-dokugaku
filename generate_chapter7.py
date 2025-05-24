#!/usr/bin/env python3
"""
第7章生成スクリプト
"""

import sys
import os
sys.path.append('novel_system')

from novel_system.plot_manager import PlotManager
from novel_system.chapter_generator import ChapterGenerator
from novel_system.validator import Validator

def main():
    try:
        print("🚀 第7章「空中大決戦」生成開始")
        
        # システム初期化
        plot_manager = PlotManager()
        chapter_generator = ChapterGenerator(plot_manager)
        validator = Validator(plot_manager)
        
        # 第7章生成設定
        config = {
            'target_chars': 20000,
            'dialogue_ratio': 0.45,
            'sections_per_chapter': 4
        }
        
        # 章生成実行
        print("📝 第7章本文生成中...")
        content = chapter_generator.generate_chapter(7, config)
        
        # 統計情報取得
        stats = chapter_generator.get_generation_stats(content)
        print(f"✅ 生成完了: {stats['total_characters']:,}文字")
        print(f"📊 セリフ比率: {stats['dialogue_ratio']:.1%}")
        
        # ファイル保存
        with open('chapter_07.md', 'w', encoding='utf-8') as f:
            f.write(content)
        print("💾 chapter_07.md に保存しました")
        
        # 品質検証
        print("🔍 品質検証中...")
        quality_report = validator.validate_chapter(content, 7)
        print(f"📊 品質スコア: {quality_report.overall_score:.2f}")
        
        # 品質レポート保存
        detailed_report = validator.generate_detailed_report(quality_report)
        with open('chapter_07_quality_report.md', 'w', encoding='utf-8') as f:
            f.write(detailed_report)
        print("📊 品質レポートを保存しました")
        
        # 結果表示
        if quality_report.overall_passed:
            print("✅ 品質基準達成!")
        else:
            print("⚠️ 品質改善が必要です")
            
        return stats, quality_report
        
    except Exception as e:
        print(f"❌ エラー: {e}")
        return None, None

if __name__ == "__main__":
    main()