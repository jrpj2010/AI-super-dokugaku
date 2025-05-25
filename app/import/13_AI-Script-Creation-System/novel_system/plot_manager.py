"""
プロット管理システム - plot_manager.py

plot.mdとキャラクターファイルを解析し、章生成に必要な情報を提供するモジュール
"""

import re
import os
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass


@dataclass
class Character:
    """キャラクター情報を管理するデータクラス"""
    name: str
    age: int
    role: str
    appearance: Dict[str, str]
    personality: Dict[str, str]
    abilities: List[str]
    relationships: Dict[str, str]
    background: str
    speaking_style: str = ""
    
    def __post_init__(self):
        """キャラクターの口調を推定"""
        if not self.speaking_style:
            self.speaking_style = self._estimate_speaking_style()
    
    def _estimate_speaking_style(self) -> str:
        """キャラクターの性格から口調を推定"""
        if "リン" in self.name:
            return "元気で前向き、時々工学用語を使う。「〜だね！」「やってみよう！」"
        elif "ソラ" in self.name:
            return "丁寧で物静か、古風な言い回し。「〜ですね」「そうですか」"
        elif "ローズ" in self.name:
            return "姉御肌で豪快、海賊らしい口調。「〜だよ」「まったく」"
        elif "グレイソン" in self.name:
            return "冷静で計算高い、知識人の口調。「〜である」「計画通りだ」"
        elif "アルテミス" in self.name:
            return "最初は機械的、徐々に感情を学ぶ。「理解できません」→「分からないけれど...」"
        return "標準的な口調"


@dataclass
class PlotChapter:
    """章の情報を管理するデータクラス"""
    number: int
    title: str
    summary: str
    key_events: List[str]
    main_characters: List[str]
    themes: List[str]


class PlotManager:
    """プロット・キャラクター情報を管理するメインクラス"""
    
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.plot_file = self.project_root / "plot.md"
        self.character_dir = self.project_root / "キャラクター"
        
        self.characters: Dict[str, Character] = {}
        self.chapters: Dict[int, PlotChapter] = {}
        self.themes: List[str] = []
        self.world_settings: Dict[str, Any] = {}
        
        # データを読み込み
        self._load_plot_data()
        self._load_characters()
    
    def _load_plot_data(self):
        """plot.mdからプロット情報を読み込み"""
        if not self.plot_file.exists():
            raise FileNotFoundError(f"プロットファイルが見つかりません: {self.plot_file}")
        
        with open(self.plot_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # タイトル抽出
        title_match = re.search(r'^#\s+(.+)', content, re.MULTILINE)
        if title_match:
            self.world_settings['title'] = title_match.group(1)
        
        # テーマ抽出
        theme_section = re.search(r'## 主要テーマ\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
        if theme_section:
            self.themes = self._extract_themes(theme_section.group(1))
        
        # 章情報抽出
        self._extract_chapters(content)
        
        # 世界設定抽出
        self._extract_world_settings(content)
    
    def _extract_themes(self, theme_text: str) -> List[str]:
        """テーマセクションからテーマを抽出"""
        themes = []
        theme_patterns = [
            r'\*\*(.+?)\*\*',  # **テーマ名**
            r'- (.+)',         # - テーマ名
        ]
        
        for pattern in theme_patterns:
            matches = re.findall(pattern, theme_text)
            themes.extend(matches)
        
        return themes[:4] if themes else ["自然との共生", "多様性の価値", "継承と進歩", "心の成長"]
    
    def _extract_chapters(self, content: str):
        """章情報を抽出"""
        chapter_pattern = r'## (第.+章)：(.+?)\n\n(.*?)(?=\n##|\Z)'
        matches = re.findall(chapter_pattern, content, re.DOTALL)
        
        for i, (chapter_num, title, summary) in enumerate(matches, 1):
            # 章番号を抽出
            num_match = re.search(r'第(.+)章', chapter_num)
            if num_match:
                try:
                    chapter_number = self._kanji_to_number(num_match.group(1))
                except:
                    chapter_number = i
            else:
                chapter_number = i
            
            self.chapters[chapter_number] = PlotChapter(
                number=chapter_number,
                title=title,
                summary=summary.strip(),
                key_events=self._extract_events(summary),
                main_characters=self._extract_characters_from_text(summary),
                themes=self.themes
            )
    
    def _kanji_to_number(self, kanji: str) -> int:
        """漢数字を数字に変換"""
        kanji_dict = {
            '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
            '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
        }
        return kanji_dict.get(kanji, 1)
    
    def _extract_events(self, text: str) -> List[str]:
        """テキストから主要イベントを抽出"""
        sentences = re.split(r'[。！？]', text)
        return [s.strip() for s in sentences if len(s.strip()) > 10][:3]
    
    def _extract_characters_from_text(self, text: str) -> List[str]:
        """テキストからキャラクター名を抽出"""
        character_names = ["リン", "ソラ", "ローズ", "グレイソン", "アルテミス", "パズー"]
        found_characters = []
        for name in character_names:
            if name in text:
                found_characters.append(name)
        return found_characters
    
    def _extract_world_settings(self, content: str):
        """世界設定を抽出"""
        self.world_settings.update({
            'genre': 'ファンタジー・冒険',
            'setting': '空に浮かぶ古代文明',
            'time_period': '前作から20年後',
            'main_location': 'アルカディア（第二のラピュタ）',
            'conflict': '自然と科学技術の調和'
        })
    
    def _load_characters(self):
        """キャラクターディレクトリからキャラクター情報を読み込み"""
        if not self.character_dir.exists():
            print(f"警告: キャラクターディレクトリが見つかりません: {self.character_dir}")
            return
        
        for char_file in self.character_dir.glob("*.md"):
            char_data = self._parse_character_file(char_file)
            if char_data:
                self.characters[char_data.name] = char_data
    
    def _parse_character_file(self, file_path: Path) -> Optional[Character]:
        """キャラクターファイルを解析してCharacterオブジェクトを作成"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 基本情報抽出
            name = self._extract_field(content, r'名前[：:]\s*(.+)')
            age_str = self._extract_field(content, r'年齢[：:]\s*(\d+)')
            age = int(age_str) if age_str.isdigit() else 16
            role = self._extract_field(content, r'職業[：:]\s*(.+)')
            
            # 外見抽出
            appearance = {
                'height': self._extract_field(content, r'身長[：:]\s*(.+)'),
                'hair': self._extract_field(content, r'髪[：:]\s*(.+)'),
                'eyes': self._extract_field(content, r'瞳[：:]\s*(.+)'),
                'clothing': self._extract_field(content, r'服装[：:]\s*(.+)')
            }
            
            # 性格抽出
            personality = {
                'core': self._extract_field(content, r'核心的性格[：:]\s*(.+)'),
                'virtues': self._extract_field(content, r'美徳[：:]\s*(.+)'),
                'flaws': self._extract_field(content, r'欠点[：:]\s*(.+)')
            }
            
            # 能力抽出
            abilities = self._extract_abilities(content)
            
            # 人間関係抽出
            relationships = self._extract_relationships(content)
            
            # 背景抽出
            background = self._extract_background(content)
            
            return Character(
                name=name,
                age=age,
                role=role,
                appearance=appearance,
                personality=personality,
                abilities=abilities,
                relationships=relationships,
                background=background
            )
            
        except Exception as e:
            print(f"キャラクターファイル読み込みエラー {file_path}: {e}")
            return None
    
    def _extract_field(self, content: str, pattern: str) -> str:
        """正規表現を使ってフィールドを抽出"""
        match = re.search(pattern, content, re.MULTILINE)
        return match.group(1).strip() if match else ""
    
    def _extract_abilities(self, content: str) -> List[str]:
        """能力リストを抽出"""
        abilities_section = re.search(r'## 能力・技能\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
        if abilities_section:
            abilities_text = abilities_section.group(1)
            abilities = re.findall(r'- \*\*(.+?)\*\*:', abilities_text)
            return abilities
        return []
    
    def _extract_relationships(self, content: str) -> Dict[str, str]:
        """人間関係を抽出"""
        relationships = {}
        rel_section = re.search(r'## 人間関係\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
        if rel_section:
            rel_text = rel_section.group(1)
            rel_matches = re.findall(r'- \*\*(.+?)\*\*:\s*(.+)', rel_text)
            relationships = dict(rel_matches)
        return relationships
    
    def _extract_background(self, content: str) -> str:
        """背景情報を抽出"""
        bg_section = re.search(r'## 背景・来歴\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
        if bg_section:
            return bg_section.group(1).strip()
        return ""
    
    # 公開メソッド
    def get_character(self, name: str) -> Optional[Character]:
        """キャラクター情報を取得"""
        # 部分一致も許可
        for char_name, char_data in self.characters.items():
            if name in char_name or char_name in name:
                return char_data
        return None
    
    def get_chapter(self, number: int) -> Optional[PlotChapter]:
        """章情報を取得"""
        return self.chapters.get(number)
    
    def get_all_characters(self) -> Dict[str, Character]:
        """全キャラクター情報を取得"""
        return self.characters.copy()
    
    def get_all_chapters(self) -> Dict[int, PlotChapter]:
        """全章情報を取得"""
        return self.chapters.copy()
    
    def get_themes(self) -> List[str]:
        """テーマリストを取得"""
        return self.themes.copy()
    
    def get_world_settings(self) -> Dict[str, Any]:
        """世界設定を取得"""
        return self.world_settings.copy()
    
    def get_chapter_context(self, chapter_num: int) -> Dict[str, Any]:
        """指定章の生成に必要なコンテキスト情報を取得"""
        chapter = self.get_chapter(chapter_num)
        if not chapter:
            raise ValueError(f"章 {chapter_num} が見つかりません")
        
        # 章に登場するキャラクターの詳細情報を取得
        chapter_characters = {}
        for char_name in chapter.main_characters:
            char_data = self.get_character(char_name)
            if char_data:
                chapter_characters[char_name] = char_data
        
        # 前の章の情報も取得（連続性のため）
        previous_chapter = self.get_chapter(chapter_num - 1) if chapter_num > 1 else None
        
        return {
            'chapter': chapter,
            'characters': chapter_characters,
            'previous_chapter': previous_chapter,
            'themes': self.themes,
            'world_settings': self.world_settings,
            'all_characters': self.get_all_characters()
        }
    
    def validate_plot_consistency(self, chapter_num: int, generated_text: str) -> List[str]:
        """生成されたテキストのプロット整合性をチェック"""
        issues = []
        chapter = self.get_chapter(chapter_num)
        
        if not chapter:
            issues.append(f"章 {chapter_num} の情報が見つかりません")
            return issues
        
        # キャラクター名の整合性チェック
        for char_name in chapter.main_characters:
            if char_name not in generated_text:
                issues.append(f"主要キャラクター '{char_name}' が本文に登場しません")
        
        # 不正なキャラクター名のチェック
        known_characters = list(self.characters.keys())
        for line in generated_text.split('\n'):
            if '「' in line and '」' in line:  # セリフ行
                for char_name in known_characters:
                    if char_name in line and char_name not in chapter.main_characters:
                        issues.append(f"この章に登場しないキャラクター '{char_name}' がセリフを話しています")
        
        return issues


# モジュールテスト用の関数
def test_plot_manager():
    """plot_manager.pyの動作テスト"""
    try:
        pm = PlotManager()
        
        print("=== PlotManager テスト ===")
        print(f"読み込まれた章数: {len(pm.chapters)}")
        print(f"読み込まれたキャラクター数: {len(pm.characters)}")
        print(f"テーマ数: {len(pm.themes)}")
        
        # 第1章のコンテキスト取得テスト
        if 1 in pm.chapters:
            context = pm.get_chapter_context(1)
            print(f"\n第1章コンテキスト:")
            print(f"  タイトル: {context['chapter'].title}")
            print(f"  登場キャラクター: {list(context['characters'].keys())}")
        
        # キャラクター情報テスト
        rin = pm.get_character("リン")
        if rin:
            print(f"\nリンの情報:")
            print(f"  年齢: {rin.age}")
            print(f"  役割: {rin.role}")
            print(f"  口調: {rin.speaking_style}")
        
        print("\n✅ PlotManager テスト完了")
        return True
        
    except Exception as e:
        print(f"❌ PlotManager テストエラー: {e}")
        return False


if __name__ == "__main__":
    test_plot_manager()