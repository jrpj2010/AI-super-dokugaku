"""
統合ワークフロー - auto_generate.py

ライトノベル章の自動生成から品質検証まで統合的に実行するモジュール
"""

import os
import sys
import argparse
import json
from datetime import datetime
from typing import Dict, List, Any, Optional
from pathlib import Path

# 同じディレクトリの他のモジュールをインポート
from plot_manager import PlotManager
from chapter_generator import ChapterGenerator, GenerationConfig
from validator import Validator, QualityReport


class AutoGenerateWorkflow:
    """自動生成ワークフローの統合管理クラス"""
    
    def __init__(self, project_root: str = ".."):
        self.project_root = Path(project_root)
        self.output_dir = Path("generated_chapters")
        self.report_dir = Path("quality_reports")
        
        # 出力ディレクトリを作成
        self.output_dir.mkdir(exist_ok=True)
        self.report_dir.mkdir(exist_ok=True)
        
        # コンポーネントを初期化
        try:
            self.plot_manager = PlotManager(self.project_root)
            self.chapter_generator = ChapterGenerator(self.plot_manager)
            self.validator = Validator(self.plot_manager)
            print("✅ システムコンポーネント初期化完了")
        except Exception as e:
            print(f"❌ システム初期化エラー: {e}")
            raise
    
    def generate_single_chapter(
        self, 
        chapter_number: int, 
        config: Optional[Dict[str, Any]] = None,
        validate: bool = True,
        save_output: bool = True
    ) -> Dict[str, Any]:
        """単一章の生成・検証ワークフロー"""
        
        print(f"\n🚀 第{chapter_number}章の生成ワークフローを開始")
        
        workflow_result = {
            'chapter_number': chapter_number,
            'timestamp': datetime.now().isoformat(),
            'success': False,
            'content': '',
            'stats': {},
            'quality_report': None,
            'files_created': []
        }
        
        try:
            # 1. 章生成
            print(f"\n📝 第{chapter_number}章の本文生成中...")
            content = self.chapter_generator.generate_chapter(chapter_number, config)
            workflow_result['content'] = content
            
            # 生成統計
            stats = self.chapter_generator.get_generation_stats(content)
            workflow_result['stats'] = stats
            
            print(f"✅ 章生成完了: {stats['total_characters']:,}文字")
            
            # 2. ファイル保存
            if save_output:
                chapter_file = self._save_chapter_content(chapter_number, content)
                workflow_result['files_created'].append(chapter_file)
                print(f"💾 章ファイル保存: {chapter_file}")
            
            # 3. 品質検証
            if validate:
                print(f"\n🔍 第{chapter_number}章の品質検証中...")
                quality_report = self.validator.validate_chapter(content, chapter_number)
                workflow_result['quality_report'] = quality_report
                
                # レポート保存
                if save_output:
                    report_file = self._save_quality_report(quality_report)
                    workflow_result['files_created'].append(report_file)
                    print(f"📊 品質レポート保存: {report_file}")
                
                print(f"✅ 品質検証完了: スコア {quality_report.overall_score:.2f}")
                
                # 品質基準チェック
                if not quality_report.overall_passed:
                    print(f"⚠️ 品質基準未達成 - 改善が必要です")
                    self._print_improvement_suggestions(quality_report)
            
            workflow_result['success'] = True
            print(f"\n🎉 第{chapter_number}章のワークフロー完了")
            
        except Exception as e:
            print(f"❌ ワークフローエラー: {e}")
            workflow_result['error'] = str(e)
        
        return workflow_result
    
    def generate_multiple_chapters(
        self, 
        chapter_numbers: List[int], 
        config: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """複数章の生成ワークフロー"""
        
        print(f"\n🚀 複数章生成ワークフロー開始: 第{min(chapter_numbers)}章-第{max(chapter_numbers)}章")
        
        batch_result = {
            'timestamp': datetime.now().isoformat(),
            'total_chapters': len(chapter_numbers),
            'successful_chapters': 0,
            'failed_chapters': 0,
            'results': {},
            'summary': {}
        }
        
        for chapter_num in chapter_numbers:
            print(f"\n--- 第{chapter_num}章の処理 ---")
            result = self.generate_single_chapter(chapter_num, config)
            batch_result['results'][str(chapter_num)] = result
            
            if result['success']:
                batch_result['successful_chapters'] += 1
            else:
                batch_result['failed_chapters'] += 1
        
        # バッチ処理サマリー
        batch_result['summary'] = self._create_batch_summary(batch_result)
        
        # バッチレポート保存
        batch_report_file = self._save_batch_report(batch_result)
        print(f"\n📊 バッチレポート保存: {batch_report_file}")
        
        print(f"\n🎉 複数章生成ワークフロー完了")
        print(f"   成功: {batch_result['successful_chapters']}/{batch_result['total_chapters']}章")
        
        return batch_result
    
    def regenerate_with_improvements(
        self, 
        chapter_number: int, 
        quality_report: QualityReport,
        max_attempts: int = 3
    ) -> Dict[str, Any]:
        """品質基準を満たすまで章を再生成"""
        
        print(f"\n🔄 第{chapter_number}章の改善再生成開始 (最大{max_attempts}回)")
        
        for attempt in range(1, max_attempts + 1):
            print(f"\n--- 再生成試行 {attempt}/{max_attempts} ---")
            
            # 品質問題に基づく設定調整
            improved_config = self._create_improved_config(quality_report)
            
            # 再生成実行
            result = self.generate_single_chapter(
                chapter_number, 
                improved_config, 
                validate=True, 
                save_output=False
            )
            
            if result['success'] and result['quality_report'] and result['quality_report'].overall_passed:
                print(f"✅ 第{attempt}回目で品質基準達成")
                
                # 最終版を保存
                final_file = self._save_chapter_content(chapter_number, result['content'], suffix=f"_improved_v{attempt}")
                final_report_file = self._save_quality_report(result['quality_report'], suffix=f"_improved_v{attempt}")
                
                result['files_created'] = [final_file, final_report_file]
                return result
            
            quality_report = result.get('quality_report')
        
        print(f"⚠️ {max_attempts}回の試行でも品質基準に到達できませんでした")
        return result
    
    def _save_chapter_content(self, chapter_number: int, content: str, suffix: str = "") -> str:
        """章の内容をファイルに保存"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chapter_{chapter_number:02d}{suffix}_{timestamp}.md"
        filepath = self.output_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return str(filepath)
    
    def _save_quality_report(self, report: QualityReport, suffix: str = "") -> str:
        """品質レポートをファイルに保存"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Markdownレポート
        md_filename = f"quality_report_ch{report.chapter_number:02d}{suffix}_{timestamp}.md"
        md_filepath = self.report_dir / md_filename
        
        detailed_report = self.validator.generate_detailed_report(report)
        with open(md_filepath, 'w', encoding='utf-8') as f:
            f.write(detailed_report)
        
        # JSONレポート
        json_filename = f"quality_report_ch{report.chapter_number:02d}{suffix}_{timestamp}.json"
        json_filepath = self.report_dir / json_filename
        
        with open(json_filepath, 'w', encoding='utf-8') as f:
            f.write(report.to_json())
        
        return str(md_filepath)
    
    def _save_batch_report(self, batch_result: Dict[str, Any]) -> str:
        """バッチ処理レポートを保存"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"batch_report_{timestamp}.json"
        filepath = self.report_dir / filename
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(batch_result, f, ensure_ascii=False, indent=2, default=str)
        
        return str(filepath)
    
    def _create_improved_config(self, quality_report: QualityReport) -> Dict[str, Any]:
        """品質レポートに基づいて改善された設定を作成"""
        config = {}
        
        # 文字数問題の対応
        if not quality_report.character_count.passed:
            if 'が不足' in str(quality_report.character_count.issues):
                config['target_chars'] = 25000  # 目標文字数を増やす
                config['sections_per_chapter'] = 5  # 節数を増やす
            elif 'が過多' in str(quality_report.character_count.issues):
                config['target_chars'] = 18000  # 目標文字数を減らす
        
        # セリフ比率問題の対応
        if not quality_report.dialogue_ratio.passed:
            current_ratio = quality_report.statistics.get('dialogue_ratio', 0.4)
            if current_ratio < 0.3:
                config['dialogue_ratio'] = 0.5  # セリフ比率を上げる
            elif current_ratio > 0.6:
                config['dialogue_ratio'] = 0.35  # セリフ比率を下げる
        
        # 構造問題の対応
        if not quality_report.structure.passed:
            config['sections_per_chapter'] = 4
            config['paragraphs_per_section'] = 10
        
        return config
    
    def _print_improvement_suggestions(self, quality_report: QualityReport):
        """改善提案を表示"""
        print("\n💡 改善提案:")
        
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
    
    def _create_batch_summary(self, batch_result: Dict[str, Any]) -> Dict[str, Any]:
        """バッチ処理のサマリーを作成"""
        total_chars = 0
        total_score = 0.0
        passed_count = 0
        
        for result in batch_result['results'].values():
            if result['success']:
                if 'stats' in result:
                    total_chars += result['stats'].get('total_characters', 0)
                
                if 'quality_report' in result and result['quality_report']:
                    total_score += result['quality_report'].overall_score
                    if result['quality_report'].overall_passed:
                        passed_count += 1
        
        successful_count = batch_result['successful_chapters']
        
        return {
            'total_characters': total_chars,
            'average_score': total_score / successful_count if successful_count > 0 else 0.0,
            'pass_rate': passed_count / successful_count if successful_count > 0 else 0.0,
            'total_files_generated': sum(len(r.get('files_created', [])) for r in batch_result['results'].values())
        }
    
    def run_interactive_mode(self):
        """対話モードでシステムを実行"""
        print("\n🎮 ライトノベル自動生成システム - 対話モード")
        print("=" * 50)
        
        while True:
            print("\n📋 選択してください:")
            print("1. 単一章を生成")
            print("2. 複数章を生成")
            print("3. 章を改善再生成")
            print("4. プロット情報を表示")
            print("5. システム統計を表示")
            print("0. 終了")
            
            choice = input("\n選択 (0-5): ").strip()
            
            if choice == "0":
                print("👋 システムを終了します")
                break
            elif choice == "1":
                self._interactive_single_chapter()
            elif choice == "2":
                self._interactive_multiple_chapters()
            elif choice == "3":
                self._interactive_improvement()
            elif choice == "4":
                self._show_plot_info()
            elif choice == "5":
                self._show_system_stats()
            else:
                print("❌ 無効な選択です")
    
    def _interactive_single_chapter(self):
        """対話モードで単一章を生成"""
        try:
            chapter_num = int(input("章番号を入力 (1-8): "))
            
            if not (1 <= chapter_num <= 8):
                print("❌ 章番号は1-8の範囲で入力してください")
                return
            
            # カスタム設定
            use_custom = input("カスタム設定を使用しますか？ (y/n): ").lower() == 'y'
            config = None
            
            if use_custom:
                config = {}
                target_chars = input("目標文字数 (デフォルト: 20000): ").strip()
                if target_chars:
                    config['target_chars'] = int(target_chars)
                
                dialogue_ratio = input("セリフ比率 (デフォルト: 0.45): ").strip()
                if dialogue_ratio:
                    config['dialogue_ratio'] = float(dialogue_ratio)
            
            result = self.generate_single_chapter(chapter_num, config)
            
            if result['success']:
                print(f"\n✅ 第{chapter_num}章生成成功!")
                if result['quality_report']:
                    print(f"品質スコア: {result['quality_report'].overall_score:.2f}")
            else:
                print(f"\n❌ 第{chapter_num}章生成失敗: {result.get('error', '不明なエラー')}")
                
        except ValueError:
            print("❌ 数値を正しく入力してください")
        except Exception as e:
            print(f"❌ エラーが発生しました: {e}")
    
    def _interactive_multiple_chapters(self):
        """対話モードで複数章を生成"""
        try:
            start_chapter = int(input("開始章番号 (1-8): "))
            end_chapter = int(input("終了章番号 (1-8): "))
            
            if not (1 <= start_chapter <= end_chapter <= 8):
                print("❌ 章番号の範囲が無効です")
                return
            
            chapter_numbers = list(range(start_chapter, end_chapter + 1))
            result = self.generate_multiple_chapters(chapter_numbers)
            
            print(f"\n✅ バッチ処理完了!")
            print(f"成功: {result['successful_chapters']}/{result['total_chapters']}章")
            
        except ValueError:
            print("❌ 数値を正しく入力してください")
        except Exception as e:
            print(f"❌ エラーが発生しました: {e}")
    
    def _interactive_improvement(self):
        """対話モードで改善再生成"""
        print("💡 この機能は品質レポートが必要です")
        print("   まず章を生成してから使用してください")
    
    def _show_plot_info(self):
        """プロット情報を表示"""
        print("\n📖 プロット情報:")
        
        chapters = self.plot_manager.get_all_chapters()
        print(f"総章数: {len(chapters)}")
        
        for num, chapter in chapters.items():
            print(f"  第{num}章: {chapter.title}")
        
        characters = self.plot_manager.get_all_characters()
        print(f"\nキャラクター数: {len(characters)}")
        
        for name, char in characters.items():
            print(f"  {name} ({char.age}歳) - {char.role}")
    
    def _show_system_stats(self):
        """システム統計を表示"""
        print("\n📊 システム統計:")
        
        # 生成ファイル数
        generated_files = list(self.output_dir.glob("chapter_*.md"))
        report_files = list(self.report_dir.glob("quality_report_*.md"))
        
        print(f"生成済み章ファイル: {len(generated_files)}")
        print(f"品質レポート: {len(report_files)}")
        
        # ディレクトリサイズ
        total_size = sum(f.stat().st_size for f in generated_files + report_files)
        print(f"総ファイルサイズ: {total_size / 1024:.1f} KB")


def main():
    """メイン関数"""
    parser = argparse.ArgumentParser(description="ライトノベル自動生成システム")
    parser.add_argument("--chapter", "-c", type=int, help="生成する章番号")
    parser.add_argument("--batch", "-b", nargs=2, type=int, metavar=('START', 'END'), 
                       help="生成する章の範囲 (開始 終了)")
    parser.add_argument("--interactive", "-i", action="store_true", help="対話モードで実行")
    parser.add_argument("--target-chars", type=int, default=20000, help="目標文字数")
    parser.add_argument("--no-validate", action="store_true", help="品質検証を無効化")
    parser.add_argument("--config", type=str, help="設定JSONファイルのパス")
    parser.add_argument("--workflow", "-w", type=int, help="ワークフロー番号 (1: 第1章生成)")
    
    args = parser.parse_args()
    
    try:
        # システム初期化
        workflow = AutoGenerateWorkflow()
        
        # 設定読み込み
        config = None
        if args.config and os.path.exists(args.config):
            with open(args.config, 'r', encoding='utf-8') as f:
                config = json.load(f)
        elif args.target_chars != 20000:
            config = {'target_chars': args.target_chars}
        
        # 実行モード選択
        if args.interactive:
            workflow.run_interactive_mode()
        elif args.workflow:
            # ワークフロー実行
            if args.workflow == 1:
                print("🚀 ワークフロー1: 第1章生成を開始")
                result = workflow.generate_single_chapter(1, config, not args.no_validate)
                if result['success']:
                    print("✅ ワークフロー1完了")
                else:
                    print("❌ ワークフロー1失敗")
                    sys.exit(1)
            else:
                print(f"❌ ワークフロー{args.workflow}は定義されていません")
                sys.exit(1)
        elif args.chapter:
            # 単一章生成
            result = workflow.generate_single_chapter(args.chapter, config, not args.no_validate)
            if not result['success']:
                sys.exit(1)
        elif args.batch:
            # バッチ生成
            start, end = args.batch
            chapter_numbers = list(range(start, end + 1))
            result = workflow.generate_multiple_chapters(chapter_numbers, config)
            if result['failed_chapters'] > 0:
                sys.exit(1)
        else:
            # デフォルト: 対話モード
            workflow.run_interactive_mode()
            
    except KeyboardInterrupt:
        print("\n\n👋 ユーザーによる中断")
    except Exception as e:
        print(f"\n❌ システムエラー: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()