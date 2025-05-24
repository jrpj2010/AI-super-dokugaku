"""
ライトノベル自動生成システム

このパッケージは以下のコンポーネントから構成されています：
- plot_manager: プロット・キャラクター管理
- chapter_generator: 章生成エンジン
- validator: 品質検証システム
- auto_generate: 統合ワークフロー
"""

__version__ = "1.0.0"
__author__ = "Claude Code Assistant"

from .plot_manager import PlotManager, Character, PlotChapter
from .chapter_generator import ChapterGenerator, GenerationConfig
from .validator import Validator, QualityReport, ValidationResult
from .auto_generate import AutoGenerateWorkflow

__all__ = [
    'PlotManager',
    'Character', 
    'PlotChapter',
    'ChapterGenerator',
    'GenerationConfig',
    'Validator',
    'QualityReport',
    'ValidationResult',
    'AutoGenerateWorkflow'
]