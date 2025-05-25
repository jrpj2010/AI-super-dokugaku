#!/usr/bin/env python3
"""
第1章の品質検証スクリプト
"""

import sys
import os
from pathlib import Path

# novel_systemモジュールを追加
sys.path.append(str(Path(__file__).parent.parent / "novel_system"))

def main():
    try:
        # モジュールをインポート
        from plot_manager import PlotManager
        from validator import Validator
        
        print("🔍 第1章「空からの来訪者」品質検証開始")
        print("=" * 50)
        
        # chapter_01.mdファイルを読み込み
        chapter_file = Path(__file__).parent.parent / "chapter_01.md"
        if not chapter_file.exists():
            print("❌ chapter_01.mdファイルが見つかりません")
            return False
        
        with open(chapter_file, 'r', encoding='utf-8') as f:
            chapter_content = f.read()
        
        print(f"📄 ファイル読み込み完了: {len(chapter_content):,}文字")
        
        # プロット管理と検証システムを初期化
        plot_manager = PlotManager(str(Path(__file__).parent.parent))
        validator = Validator(plot_manager)
        
        print("🚀 品質検証実行中...")
        
        # 品質検証実行
        quality_report = validator.validate_chapter(chapter_content, 1)
        
        # 結果表示
        print("\n" + "=" * 50)
        print("📊 検証結果")
        print("=" * 50)
        
        print(f"📈 総合スコア: {quality_report.overall_score:.2f}/1.00")
        print(f"🎯 判定: {'✅ 合格' if quality_report.overall_passed else '❌ 要改善'}")
        print(f"📅 検証日時: {quality_report.timestamp}")
        
        print("\n📋 詳細結果:")
        print(f"  📝 文字数: {quality_report.statistics['total_characters']:,}文字 - {'✅' if quality_report.character_count.passed else '❌'} (スコア: {quality_report.character_count.score:.2f})")
        print(f"  💬 セリフ比率: {quality_report.statistics['dialogue_ratio']:.1%} - {'✅' if quality_report.dialogue_ratio.passed else '❌'} (スコア: {quality_report.dialogue_ratio.score:.2f})")
        print(f"  📐 構造: {quality_report.statistics['sections']}節、{quality_report.statistics['paragraphs']}段落 - {'✅' if quality_report.structure.passed else '❌'} (スコア: {quality_report.structure.score:.2f})")
        print(f"  👥 キャラクター一貫性: {'✅' if quality_report.character_consistency.passed else '❌'} (スコア: {quality_report.character_consistency.score:.2f})")
        print(f"  📖 プロット一貫性: {'✅' if quality_report.plot_consistency.passed else '❌'} (スコア: {quality_report.plot_consistency.score:.2f})")
        print(f"  ✍️ 文章品質: {'✅' if quality_report.writing_quality.passed else '❌'} (スコア: {quality_report.writing_quality.score:.2f})")
        
        # 詳細レポート生成
        detailed_report = validator.generate_detailed_report(quality_report)
        
        # レポートファイル保存
        report_filename = Path(__file__).parent.parent / "quality_report_chapter01.md"
        with open(report_filename, 'w', encoding='utf-8') as f:
            f.write(detailed_report)
        
        print(f"\n📄 詳細レポート保存: {report_filename}")
        
        # 要件達成確認
        print("\n" + "=" * 50)
        print("✅ 要件達成確認")
        print("=" * 50)
        
        char_count = quality_report.statistics['total_characters']
        dialogue_ratio = quality_report.statistics['dialogue_ratio']
        
        print(f"📏 20,000文字以上: {'✅ 達成' if char_count >= 20000 else '❌ 未達成'} ({char_count:,}文字)")
        print(f"💬 セリフ比率30-60%: {'✅ 達成' if 0.30 <= dialogue_ratio <= 0.60 else '❌ 未達成'} ({dialogue_ratio:.1%})")
        print(f"🎯 品質スコア0.8以上: {'✅ 達成' if quality_report.overall_score >= 0.8 else '❌ 未達成'} ({quality_report.overall_score:.2f})")
        
        # キャラクター登場確認
        print(f"\n👥 主要キャラクター登場確認:")
        for char_name, count in quality_report.statistics['character_mentions'].items():
            print(f"  {char_name}: {count}回登場 ✅")
        
        return True
        
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)