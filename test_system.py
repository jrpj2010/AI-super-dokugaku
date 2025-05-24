#!/usr/bin/env python3
"""
システム動作テスト
"""

import sys
import os

# novel_systemディレクトリをパスに追加
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'novel_system'))

try:
    print("=== ライトノベル自動生成システム 動作テスト ===")
    
    # 各モジュールのインポートテスト
    print("\n1. モジュールインポートテスト...")
    
    from plot_manager import PlotManager
    print("✅ plot_manager インポート成功")
    
    from chapter_generator import ChapterGenerator
    print("✅ chapter_generator インポート成功")
    
    from validator import Validator
    print("✅ validator インポート成功")
    
    from auto_generate import AutoGenerateWorkflow
    print("✅ auto_generate インポート成功")
    
    # システム初期化テスト
    print("\n2. システム初期化テスト...")
    
    # カレントディレクトリをプロジェクトルートに変更
    project_root = os.path.dirname(__file__)
    os.chdir(project_root)
    
    pm = PlotManager(".")
    print(f"✅ PlotManager初期化成功 - 章数: {len(pm.chapters)}, キャラクター数: {len(pm.characters)}")
    
    generator = ChapterGenerator(pm)
    print("✅ ChapterGenerator初期化成功")
    
    validator = Validator(pm)
    print("✅ Validator初期化成功")
    
    # 簡単な動作テスト
    print("\n3. 基本機能テスト...")
    
    # 第1章の情報取得
    chapter_1 = pm.get_chapter(1)
    if chapter_1:
        print(f"✅ 第1章情報取得成功: {chapter_1.title}")
    
    # キャラクター情報取得
    rin = pm.get_character("リン")
    if rin:
        print(f"✅ リン情報取得成功: {rin.age}歳, {rin.role}")
    
    # 短いテスト章生成
    print("\n4. 章生成テスト...")
    test_config = {
        'target_chars': 1000,  # テスト用に短く設定
        'sections_per_chapter': 2
    }
    
    test_content = generator.generate_chapter(1, test_config)
    print(f"✅ テスト章生成成功: {len(test_content)}文字")
    
    # 生成統計
    stats = generator.get_generation_stats(test_content)
    print(f"   セリフ比率: {stats['dialogue_ratio']:.1%}")
    print(f"   段落数: {stats['paragraphs']}")
    
    # 品質検証テスト
    print("\n5. 品質検証テスト...")
    
    quality_report = validator.validate_chapter(test_content, 1)
    print(f"✅ 品質検証完了: スコア {quality_report.overall_score:.2f}")
    print(f"   合格判定: {'✅ 合格' if quality_report.overall_passed else '❌ 要改善'}")
    
    # 統合ワークフローテスト
    print("\n6. 統合ワークフローテスト...")
    
    workflow = AutoGenerateWorkflow(".")
    print("✅ AutoGenerateWorkflow初期化成功")
    
    print("\n🎉 全テスト完了 - システム正常動作確認")
    print("\n💡 実際の章生成を開始するには:")
    print("   cd novel_system")
    print("   python auto_generate.py --workflow 1")
    print("   または")
    print("   python auto_generate.py --chapter 1")
    
except ImportError as e:
    print(f"❌ インポートエラー: {e}")
    sys.exit(1)
except Exception as e:
    print(f"❌ テストエラー: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)