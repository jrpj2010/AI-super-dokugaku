"""
ビジネス書籍管理システム - business_book_manager.py

outline.mdと概念定義ファイルを解析し、章生成に必要な情報を提供するモジュール
PlotManagerのビジネス書籍版として、plot.mdの代わりにoutline.mdを使用し、
バージョン管理と差分記録機能を含む
"""

import re
import os
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime

from version_manager import BusinessBookVersionManager
from outline_updater import OutlineUpdater


@dataclass
class BusinessConcept:
    """ビジネス概念・用語を管理するデータクラス"""
    name: str
    category: str  # 理論、フレームワーク、手法、etc
    definition: str
    key_points: List[str]
    examples: List[str]
    related_concepts: List[str]
    application_tips: str = ""
    common_mistakes: str = ""
    
    def get_explanation_style(self) -> str:
        """概念の説明スタイルを返す"""
        if self.category == "理論":
            return "学術的な背景を含めて体系的に説明"
        elif self.category == "フレームワーク":
            return "図解を意識した構造的な説明"
        elif self.category == "手法":
            return "具体的なステップとコツを含む実践的な説明"
        return "分かりやすく簡潔な説明"


@dataclass
class BusinessChapter:
    """ビジネス書籍の章情報を管理するデータクラス"""
    number: int
    title: str
    objective: str  # 読者が得られる学び
    summary: str
    key_concepts: List[str]  # この章で扱う主要概念
    case_studies: List[str]  # 事例のリスト
    action_items: List[str]  # 実践項目
    sections: List[Dict[str, str]]  # セクション構成
    target_words: int = 8000
    current_words: int = 0
    status: str = "pending"  # pending, in_progress, completed


@dataclass
class CaseStudy:
    """ケーススタディを管理するデータクラス"""
    id: str
    company: str
    industry: str
    challenge: str
    solution: str
    results: Dict[str, str]  # 定量的・定性的結果
    lessons: List[str]
    applicable_to: List[str]  # 適用可能な業界・規模


class BusinessBookManager:
    """ビジネス書籍のアウトライン・概念情報を管理するメインクラス"""
    
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.outline_file = self.project_root / "outline.md"
        self.concepts_dir = self.project_root / "concepts"
        self.case_studies_dir = self.project_root / "case_studies"
        
        # バージョン管理とアウトライン更新システム
        self.version_manager = BusinessBookVersionManager(project_root)
        self.outline_updater = OutlineUpdater(project_root)
        
        # データストレージ
        self.concepts: Dict[str, BusinessConcept] = {}
        self.chapters: Dict[int, BusinessChapter] = {}
        self.case_studies: Dict[str, CaseStudy] = {}
        self.book_metadata: Dict[str, Any] = {}
        
        # 初期データ読み込み
        self._load_outline_data()
        self._load_concepts()
        self._load_case_studies()
    
    def _load_outline_data(self):
        """outline.mdからアウトライン情報を読み込み"""
        if not self.outline_file.exists():
            raise FileNotFoundError(f"アウトラインファイルが見つかりません: {self.outline_file}")
        
        with open(self.outline_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # メタデータ抽出
        self._extract_metadata(content)
        
        # 章情報抽出
        self._extract_chapters(content)
        
        # 全体構成情報抽出
        self._extract_book_structure(content)
    
    def _extract_metadata(self, content: str):
        """書籍のメタデータを抽出"""
        # YAMLフロントマター形式を想定
        metadata_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
        if metadata_match:
            metadata_text = metadata_match.group(1)
            for line in metadata_text.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    self.book_metadata[key.strip()] = value.strip()
        
        # デフォルト値設定
        self.book_metadata.setdefault('title', '{{book_title}}')
        self.book_metadata.setdefault('subtitle', '{{book_subtitle}}')
        self.book_metadata.setdefault('author', '{{author_name}}')
        self.book_metadata.setdefault('target_words', 80000)
        self.book_metadata.setdefault('target_audience', 'ビジネスパーソン')
    
    def _extract_chapters(self, content: str):
        """章情報を抽出"""
        # 章パターン: ## 第N章：タイトル または ## 第N章 タイトル
        chapter_pattern = r'## 第(\d+)章[：:]?\s*(.+?)(?:\n|$)'
        
        # 全章を検索
        for match in re.finditer(chapter_pattern, content, re.MULTILINE):
            chapter_num = int(match.group(1))
            title = match.group(2).strip()
            
            # ステータスマーカーとメタ情報を除去
            title_clean = re.sub(r'[✅📝⏳⏸️❌]\s*', '', title)
            title_clean = re.sub(r'\[\d+字\]', '', title_clean).strip()
            
            # 章の詳細情報を取得
            chapter_detail = self._extract_chapter_detail(content, chapter_num)
            
            self.chapters[chapter_num] = BusinessChapter(
                number=chapter_num,
                title=title_clean,
                objective=chapter_detail.get('objective', ''),
                summary=chapter_detail.get('summary', ''),
                key_concepts=chapter_detail.get('concepts', []),
                case_studies=chapter_detail.get('cases', []),
                action_items=chapter_detail.get('actions', []),
                sections=chapter_detail.get('sections', []),
                target_words=chapter_detail.get('target_words', 8000),
                current_words=chapter_detail.get('current_words', 0),
                status=chapter_detail.get('status', 'pending')
            )
    
    def _extract_chapter_detail(self, content: str, chapter_num: int) -> Dict[str, Any]:
        """章の詳細情報を抽出"""
        # 章セクションを特定
        chapter_pattern = rf'## 第{chapter_num}章.*?\n(.*?)(?=\n## 第\d+章|\Z)'
        chapter_match = re.search(chapter_pattern, content, re.DOTALL)
        
        if not chapter_match:
            return {}
        
        chapter_text = chapter_match.group(1)
        details = {}
        
        # 学習目標
        objective_match = re.search(r'学習目標[：:]\s*(.+)', chapter_text)
        if objective_match:
            details['objective'] = objective_match.group(1).strip()
        
        # 概要
        summary_match = re.search(r'概要[：:]\s*(.+?)(?=\n[#\-]|\Z)', chapter_text, re.DOTALL)
        if summary_match:
            details['summary'] = summary_match.group(1).strip()
        
        # セクション構成
        sections = []
        section_pattern = r'### (.+)'
        for section_match in re.finditer(section_pattern, chapter_text):
            sections.append({
                'title': section_match.group(1).strip(),
                'completed': '✓' in section_match.group(0)
            })
        details['sections'] = sections
        
        # ステータス判定
        if '✅' in chapter_text:
            details['status'] = 'completed'
        elif '📝' in chapter_text:
            details['status'] = 'in_progress'
        else:
            details['status'] = 'pending'
        
        # 文字数
        word_count_match = re.search(r'\[(\d+)字\]', chapter_text)
        if word_count_match:
            details['current_words'] = int(word_count_match.group(1))
        
        return details
    
    def _extract_book_structure(self, content: str):
        """書籍全体の構成情報を抽出"""
        # 部構成がある場合
        part_pattern = r'# 第(\d+)部[：:]?\s*(.+)'
        parts = []
        for match in re.finditer(part_pattern, content):
            parts.append({
                'number': int(match.group(1)),
                'title': match.group(2).strip()
            })
        
        if parts:
            self.book_metadata['structure'] = 'parts_and_chapters'
            self.book_metadata['parts'] = parts
        else:
            self.book_metadata['structure'] = 'chapters_only'
    
    def _load_concepts(self):
        """概念定義ディレクトリから概念情報を読み込み"""
        if not self.concepts_dir.exists():
            print(f"警告: 概念定義ディレクトリが見つかりません: {self.concepts_dir}")
            self.concepts_dir.mkdir(exist_ok=True)
            return
        
        for concept_file in self.concepts_dir.glob("*.md"):
            concept_data = self._parse_concept_file(concept_file)
            if concept_data:
                self.concepts[concept_data.name] = concept_data
    
    def _parse_concept_file(self, file_path: Path) -> Optional[BusinessConcept]:
        """概念定義ファイルを解析してBusinessConceptオブジェクトを作成"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 基本情報抽出
            name = self._extract_field(content, r'概念名[：:]\s*(.+)')
            category = self._extract_field(content, r'カテゴリ[：:]\s*(.+)')
            definition = self._extract_field(content, r'定義[：:]\s*(.+?)(?=\n##|\Z)', re.DOTALL)
            
            # リスト情報抽出
            key_points = self._extract_list_items(content, '要点')
            examples = self._extract_list_items(content, '事例')
            related = self._extract_list_items(content, '関連概念')
            
            # 追加情報
            tips = self._extract_field(content, r'実践のコツ[：:]\s*(.+?)(?=\n##|\Z)', re.DOTALL)
            mistakes = self._extract_field(content, r'よくある間違い[：:]\s*(.+?)(?=\n##|\Z)', re.DOTALL)
            
            return BusinessConcept(
                name=name or file_path.stem,
                category=category or "一般",
                definition=definition,
                key_points=key_points,
                examples=examples,
                related_concepts=related,
                application_tips=tips,
                common_mistakes=mistakes
            )
            
        except Exception as e:
            print(f"概念ファイル読み込みエラー {file_path}: {e}")
            return None
    
    def _load_case_studies(self):
        """ケーススタディディレクトリから事例情報を読み込み"""
        if not self.case_studies_dir.exists():
            print(f"警告: ケーススタディディレクトリが見つかりません: {self.case_studies_dir}")
            self.case_studies_dir.mkdir(exist_ok=True)
            return
        
        for case_file in self.case_studies_dir.glob("*.md"):
            case_data = self._parse_case_study_file(case_file)
            if case_data:
                self.case_studies[case_data.id] = case_data
    
    def _parse_case_study_file(self, file_path: Path) -> Optional[CaseStudy]:
        """ケーススタディファイルを解析"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 基本情報
            company = self._extract_field(content, r'企業名[：:]\s*(.+)')
            industry = self._extract_field(content, r'業界[：:]\s*(.+)')
            challenge = self._extract_field(content, r'課題[：:]\s*(.+?)(?=\n##|\Z)', re.DOTALL)
            solution = self._extract_field(content, r'解決策[：:]\s*(.+?)(?=\n##|\Z)', re.DOTALL)
            
            # 結果
            results = {}
            results_section = re.search(r'## 結果\s*\n(.*?)(?=\n##|\Z)', content, re.DOTALL)
            if results_section:
                results_text = results_section.group(1)
                result_items = re.findall(r'- (.+?)[:：]\s*(.+)', results_text)
                results = dict(result_items)
            
            # 教訓
            lessons = self._extract_list_items(content, '教訓')
            applicable = self._extract_list_items(content, '適用可能')
            
            return CaseStudy(
                id=file_path.stem,
                company=company,
                industry=industry,
                challenge=challenge,
                solution=solution,
                results=results,
                lessons=lessons,
                applicable_to=applicable
            )
            
        except Exception as e:
            print(f"ケーススタディファイル読み込みエラー {file_path}: {e}")
            return None
    
    def _extract_field(self, content: str, pattern: str, flags=re.MULTILINE) -> str:
        """正規表現を使ってフィールドを抽出"""
        match = re.search(pattern, content, flags)
        return match.group(1).strip() if match else ""
    
    def _extract_list_items(self, content: str, section_name: str) -> List[str]:
        """セクションからリストアイテムを抽出"""
        section_pattern = rf'## {section_name}\s*\n(.*?)(?=\n##|\Z)'
        section_match = re.search(section_pattern, content, re.DOTALL)
        
        if section_match:
            section_text = section_match.group(1)
            items = re.findall(r'- (.+)', section_text)
            return items
        return []
    
    # 公開メソッド
    def get_concept(self, name: str) -> Optional[BusinessConcept]:
        """概念情報を取得"""
        # 完全一致または部分一致
        for concept_name, concept_data in self.concepts.items():
            if name.lower() in concept_name.lower() or concept_name.lower() in name.lower():
                return concept_data
        return None
    
    def get_chapter(self, number: int) -> Optional[BusinessChapter]:
        """章情報を取得"""
        return self.chapters.get(number)
    
    def get_case_study(self, id_or_company: str) -> Optional[CaseStudy]:
        """ケーススタディを取得"""
        # IDで検索
        if id_or_company in self.case_studies:
            return self.case_studies[id_or_company]
        
        # 企業名で検索
        for case in self.case_studies.values():
            if id_or_company.lower() in case.company.lower():
                return case
        return None
    
    def get_chapter_context(self, chapter_num: int) -> Dict[str, Any]:
        """指定章の生成に必要なコンテキスト情報を取得"""
        chapter = self.get_chapter(chapter_num)
        if not chapter:
            raise ValueError(f"章 {chapter_num} が見つかりません")
        
        # 章で使用する概念の詳細情報
        chapter_concepts = {}
        for concept_name in chapter.key_concepts:
            concept_data = self.get_concept(concept_name)
            if concept_data:
                chapter_concepts[concept_name] = concept_data
        
        # 章で使用するケーススタディ
        chapter_cases = {}
        for case_ref in chapter.case_studies:
            case_data = self.get_case_study(case_ref)
            if case_data:
                chapter_cases[case_ref] = case_data
        
        # 前章の情報（連続性のため）
        previous_chapter = self.get_chapter(chapter_num - 1) if chapter_num > 1 else None
        
        return {
            'chapter': chapter,
            'concepts': chapter_concepts,
            'case_studies': chapter_cases,
            'previous_chapter': previous_chapter,
            'book_metadata': self.book_metadata,
            'all_concepts': self.get_all_concepts()
        }
    
    def update_chapter_progress(self, chapter_num: int, words_written: int, 
                              sections_completed: List[str] = None, 
                              status: str = None) -> bool:
        """章の進捗を更新し、outline.mdを自動更新"""
        chapter = self.get_chapter(chapter_num)
        if not chapter:
            return False
        
        # 章オブジェクトを更新
        chapter.current_words = words_written
        if status:
            chapter.status = status
        
        # outline.mdを更新
        success = self.outline_updater.update_chapter_status(
            chapter_num, 
            status or chapter.status,
            words_written,
            sections_completed
        )
        
        if success and status == "completed":
            # 章完了時は自動でバージョン保存
            self.version_manager.save_chapter_completion(chapter_num, chapter.title)
        
        return success
    
    def validate_consistency(self, chapter_num: int, generated_text: str) -> List[str]:
        """生成されたテキストの整合性をチェック"""
        issues = []
        chapter = self.get_chapter(chapter_num)
        
        if not chapter:
            issues.append(f"章 {chapter_num} の情報が見つかりません")
            return issues
        
        # 必須概念のチェック
        for concept_name in chapter.key_concepts:
            if concept_name not in generated_text:
                issues.append(f"重要概念 '{concept_name}' が本文で説明されていません")
        
        # ケーススタディの参照チェック
        mentioned_cases = 0
        for case_ref in chapter.case_studies:
            case = self.get_case_study(case_ref)
            if case and case.company in generated_text:
                mentioned_cases += 1
        
        if mentioned_cases < len(chapter.case_studies) * 0.8:
            issues.append(f"計画されたケーススタディの多くが言及されていません")
        
        # 文字数チェック
        actual_words = len(generated_text)
        if actual_words < chapter.target_words * 0.8:
            issues.append(f"文字数が目標の80%未満です（{actual_words}字/{chapter.target_words}字）")
        elif actual_words > chapter.target_words * 1.2:
            issues.append(f"文字数が目標の120%を超えています（{actual_words}字/{chapter.target_words}字）")
        
        return issues
    
    def get_all_concepts(self) -> Dict[str, BusinessConcept]:
        """全概念情報を取得"""
        return self.concepts.copy()
    
    def get_all_chapters(self) -> Dict[int, BusinessChapter]:
        """全章情報を取得"""
        return self.chapters.copy()
    
    def get_all_case_studies(self) -> Dict[str, CaseStudy]:
        """全ケーススタディを取得"""
        return self.case_studies.copy()
    
    def generate_progress_report(self) -> str:
        """執筆進捗レポートを生成"""
        return self.outline_updater.generate_status_report()


# モジュールテスト
def test_business_book_manager():
    """BusinessBookManagerの動作テスト"""
    try:
        # テスト用のoutline.mdを作成
        test_dir = Path("test_business_book")
        test_dir.mkdir(exist_ok=True)
        
        outline_content = """---
title: AI時代の経営戦略
subtitle: デジタル変革を成功に導く10の法則
author: 山田太郎
target_words: 80000
---

## 📊 執筆進捗サマリー

## 第1章：なぜ今AIが必要なのか
学習目標: AI導入の必要性を理解する
概要: 現代ビジネスにおけるAIの重要性を解説

### 現代ビジネスの課題
### AIがもたらす変革
### 本書の活用方法

## 第2章：AIの基本理解 📝 [5000字]
学習目標: AIの基本概念を習得する
更新: 2024-01-15 10:30
"""
        
        with open(test_dir / "outline.md", 'w', encoding='utf-8') as f:
            f.write(outline_content)
        
        # テスト実行
        bbm = BusinessBookManager(str(test_dir))
        
        print("=== BusinessBookManager テスト ===")
        print(f"読み込まれた章数: {len(bbm.chapters)}")
        print(f"書籍タイトル: {bbm.book_metadata.get('title')}")
        
        # 章情報テスト
        chapter1 = bbm.get_chapter(1)
        if chapter1:
            print(f"\n第1章情報:")
            print(f"  タイトル: {chapter1.title}")
            print(f"  ステータス: {chapter1.status}")
        
        # 進捗更新テスト
        success = bbm.update_chapter_progress(1, 3000, status="in_progress")
        print(f"\n進捗更新: {'成功' if success else '失敗'}")
        
        print("\n✅ BusinessBookManager テスト完了")
        
        # クリーンアップ
        import shutil
        shutil.rmtree(test_dir)
        
        return True
        
    except Exception as e:
        print(f"❌ BusinessBookManager テストエラー: {e}")
        return False


if __name__ == "__main__":
    test_business_book_manager()