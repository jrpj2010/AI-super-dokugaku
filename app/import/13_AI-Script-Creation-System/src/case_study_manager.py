"""
ケーススタディ管理システム - case_study_manager.py

ビジネス書籍で使用する事例・ケーススタディを体系的に管理し、
章生成時に適切な事例を提供するシステム
"""

import json
import yaml
from pathlib import Path
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from datetime import datetime
import re


@dataclass
class CaseStudy:
    """ケーススタディの詳細情報"""
    id: str
    title: str
    company: str
    industry: str
    company_size: str  # 大企業、中堅企業、中小企業、スタートアップ
    region: str  # 日本、北米、欧州、アジア等
    
    # 課題と解決策
    background: str
    challenge: str
    solution: str
    implementation_period: str
    
    # 成果
    quantitative_results: Dict[str, str]  # 数値的成果
    qualitative_results: List[str]  # 定性的成果
    
    # 学習ポイント
    key_takeaways: List[str]
    success_factors: List[str]
    challenges_faced: List[str]
    
    # メタ情報
    tags: List[str]
    applicable_industries: List[str]
    related_concepts: List[str]
    source: str
    verified_date: str
    
    def to_dict(self) -> Dict:
        return asdict(self)
    
    def to_markdown(self) -> str:
        """ケーススタディをマークダウン形式で出力"""
        md = f"""# {self.title}

## 企業概要
- **企業名**: {self.company}
- **業界**: {self.industry}
- **企業規模**: {self.company_size}
- **地域**: {self.region}

## 背景と課題
### 背景
{self.background}

### 直面した課題
{self.challenge}

## 解決策
{self.solution}

**実施期間**: {self.implementation_period}

## 成果
### 定量的成果
"""
        for metric, value in self.quantitative_results.items():
            md += f"- {metric}: {value}\n"
        
        md += "\n### 定性的成果\n"
        for result in self.qualitative_results:
            md += f"- {result}\n"
        
        md += "\n## 学びとポイント\n### 主要な学び\n"
        for takeaway in self.key_takeaways:
            md += f"- {takeaway}\n"
        
        md += "\n### 成功要因\n"
        for factor in self.success_factors:
            md += f"- {factor}\n"
        
        if self.challenges_faced:
            md += "\n### 直面した困難\n"
            for challenge in self.challenges_faced:
                md += f"- {challenge}\n"
        
        md += f"\n---\n*出典: {self.source} (確認日: {self.verified_date})*"
        
        return md


class CaseStudyManager:
    """ケーススタディを管理するメインクラス"""
    
    def __init__(self, project_root: str = "."):
        self.project_root = Path(project_root)
        self.case_studies_dir = self.project_root / "case_studies"
        self.case_studies_dir.mkdir(exist_ok=True)
        
        self.templates_dir = self.case_studies_dir / "templates"
        self.templates_dir.mkdir(exist_ok=True)
        
        self.index_file = self.case_studies_dir / "index.json"
        self.case_studies: Dict[str, CaseStudy] = {}
        
        # 初期化
        self._load_case_studies()
        self._create_default_template()
    
    def _create_default_template(self):
        """デフォルトのケーススタディテンプレートを作成"""
        template_path = self.templates_dir / "case_study_template.yaml"
        if not template_path.exists():
            template = {
                "id": "{{case_id}}",
                "title": "{{case_title}}",
                "company": "{{company_name}}",
                "industry": "{{industry}}",
                "company_size": "{{大企業|中堅企業|中小企業|スタートアップ}}",
                "region": "{{region}}",
                "background": "{{background_description}}",
                "challenge": "{{challenge_description}}",
                "solution": "{{solution_description}}",
                "implementation_period": "{{period}}",
                "quantitative_results": {
                    "{{metric_1}}": "{{value_1}}",
                    "{{metric_2}}": "{{value_2}}"
                },
                "qualitative_results": [
                    "{{qualitative_result_1}}",
                    "{{qualitative_result_2}}"
                ],
                "key_takeaways": [
                    "{{key_takeaway_1}}",
                    "{{key_takeaway_2}}"
                ],
                "success_factors": [
                    "{{success_factor_1}}",
                    "{{success_factor_2}}"
                ],
                "challenges_faced": [
                    "{{challenge_1}}",
                    "{{challenge_2}}"
                ],
                "tags": ["{{tag_1}}", "{{tag_2}}"],
                "applicable_industries": ["{{industry_1}}", "{{industry_2}}"],
                "related_concepts": ["{{concept_1}}", "{{concept_2}}"],
                "source": "{{source_reference}}",
                "verified_date": "{{YYYY-MM-DD}}"
            }
            
            with open(template_path, 'w', encoding='utf-8') as f:
                yaml.dump(template, f, allow_unicode=True, default_flow_style=False)
    
    def _load_case_studies(self):
        """ケーススタディディレクトリから全事例を読み込み"""
        # YAMLファイルから読み込み
        for case_file in self.case_studies_dir.glob("*.yaml"):
            if case_file.stem != "index":
                case_data = self._load_case_study_file(case_file)
                if case_data:
                    self.case_studies[case_data.id] = case_data
        
        # JSONファイルから読み込み
        for case_file in self.case_studies_dir.glob("*.json"):
            if case_file.stem != "index":
                case_data = self._load_case_study_file(case_file)
                if case_data:
                    self.case_studies[case_data.id] = case_data
        
        # インデックスを更新
        self._update_index()
    
    def _load_case_study_file(self, file_path: Path) -> Optional[CaseStudy]:
        """個別のケーススタディファイルを読み込み"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                if file_path.suffix == '.yaml':
                    data = yaml.safe_load(f)
                else:
                    data = json.load(f)
            
            # 必須フィールドの検証
            required_fields = ['id', 'title', 'company', 'industry', 'challenge', 'solution']
            for field in required_fields:
                if field not in data:
                    print(f"警告: {file_path} に必須フィールド '{field}' がありません")
                    return None
            
            # デフォルト値の設定
            data.setdefault('company_size', '不明')
            data.setdefault('region', '不明')
            data.setdefault('background', '')
            data.setdefault('implementation_period', '不明')
            data.setdefault('quantitative_results', {})
            data.setdefault('qualitative_results', [])
            data.setdefault('key_takeaways', [])
            data.setdefault('success_factors', [])
            data.setdefault('challenges_faced', [])
            data.setdefault('tags', [])
            data.setdefault('applicable_industries', [])
            data.setdefault('related_concepts', [])
            data.setdefault('source', file_path.stem)
            data.setdefault('verified_date', datetime.now().strftime('%Y-%m-%d'))
            
            return CaseStudy(**data)
            
        except Exception as e:
            print(f"ケーススタディファイル読み込みエラー {file_path}: {e}")
            return None
    
    def _update_index(self):
        """ケーススタディのインデックスを更新"""
        index_data = {
            'total_cases': len(self.case_studies),
            'last_updated': datetime.now().isoformat(),
            'by_industry': {},
            'by_company_size': {},
            'by_region': {},
            'by_tags': {},
            'cases': {}
        }
        
        for case_id, case in self.case_studies.items():
            # 業界別
            if case.industry not in index_data['by_industry']:
                index_data['by_industry'][case.industry] = []
            index_data['by_industry'][case.industry].append(case_id)
            
            # 企業規模別
            if case.company_size not in index_data['by_company_size']:
                index_data['by_company_size'][case.company_size] = []
            index_data['by_company_size'][case.company_size].append(case_id)
            
            # 地域別
            if case.region not in index_data['by_region']:
                index_data['by_region'][case.region] = []
            index_data['by_region'][case.region].append(case_id)
            
            # タグ別
            for tag in case.tags:
                if tag not in index_data['by_tags']:
                    index_data['by_tags'][tag] = []
                index_data['by_tags'][tag].append(case_id)
            
            # 基本情報
            index_data['cases'][case_id] = {
                'title': case.title,
                'company': case.company,
                'industry': case.industry,
                'tags': case.tags
            }
        
        # インデックスファイルを保存
        with open(self.index_file, 'w', encoding='utf-8') as f:
            json.dump(index_data, f, ensure_ascii=False, indent=2)
    
    def add_case_study(self, case_data: Dict) -> CaseStudy:
        """新しいケーススタディを追加"""
        # IDの自動生成（指定されていない場合）
        if 'id' not in case_data:
            case_data['id'] = self._generate_case_id(case_data.get('company', 'unknown'))
        
        case = CaseStudy(**case_data)
        self.case_studies[case.id] = case
        
        # ファイルに保存
        file_path = self.case_studies_dir / f"{case.id}.yaml"
        with open(file_path, 'w', encoding='utf-8') as f:
            yaml.dump(case.to_dict(), f, allow_unicode=True, default_flow_style=False)
        
        # インデックスを更新
        self._update_index()
        
        return case
    
    def _generate_case_id(self, company_name: str) -> str:
        """ケースIDを自動生成"""
        base_id = re.sub(r'[^\w\s-]', '', company_name.lower())
        base_id = re.sub(r'[-\s]+', '_', base_id)
        
        # 重複チェック
        if base_id not in self.case_studies:
            return base_id
        
        # 重複がある場合は番号を付与
        counter = 1
        while f"{base_id}_{counter}" in self.case_studies:
            counter += 1
        
        return f"{base_id}_{counter}"
    
    def search_cases(self, 
                    industry: Optional[str] = None,
                    company_size: Optional[str] = None,
                    region: Optional[str] = None,
                    tags: Optional[List[str]] = None,
                    keywords: Optional[List[str]] = None) -> List[CaseStudy]:
        """条件に基づいてケーススタディを検索"""
        results = list(self.case_studies.values())
        
        # 業界でフィルタ
        if industry:
            results = [c for c in results if c.industry.lower() == industry.lower()]
        
        # 企業規模でフィルタ
        if company_size:
            results = [c for c in results if c.company_size == company_size]
        
        # 地域でフィルタ
        if region:
            results = [c for c in results if c.region == region]
        
        # タグでフィルタ
        if tags:
            results = [c for c in results if any(tag in c.tags for tag in tags)]
        
        # キーワード検索
        if keywords:
            keyword_results = []
            for case in results:
                case_text = f"{case.title} {case.challenge} {case.solution} {' '.join(case.key_takeaways)}"
                if any(keyword.lower() in case_text.lower() for keyword in keywords):
                    keyword_results.append(case)
            results = keyword_results
        
        return results
    
    def get_case_for_chapter(self, chapter_context: Dict) -> List[CaseStudy]:
        """章のコンテキストに基づいて適切なケーススタディを推薦"""
        recommendations = []
        
        # 章のキーコンセプトに関連するケースを検索
        if 'chapter' in chapter_context:
            chapter = chapter_context['chapter']
            
            # 関連概念でフィルタ
            for case in self.case_studies.values():
                relevance_score = 0
                
                # キーコンセプトとの一致
                for concept in chapter.key_concepts:
                    if concept in case.related_concepts:
                        relevance_score += 2
                    elif concept.lower() in case.title.lower() or concept.lower() in case.challenge.lower():
                        relevance_score += 1
                
                # タグとの一致
                chapter_tags = self._extract_tags_from_title(chapter.title)
                for tag in chapter_tags:
                    if tag in case.tags:
                        relevance_score += 1
                
                if relevance_score > 0:
                    recommendations.append((relevance_score, case))
        
        # スコア順にソート
        recommendations.sort(key=lambda x: x[0], reverse=True)
        
        # 上位の結果を返す
        return [case for _, case in recommendations[:5]]
    
    def _extract_tags_from_title(self, title: str) -> List[str]:
        """章タイトルからタグを抽出"""
        # 一般的なビジネスキーワード
        keywords = ['AI', 'DX', 'イノベーション', '戦略', '変革', '効率化', 
                   'マーケティング', '組織', 'リーダーシップ', 'データ']
        
        found_tags = []
        for keyword in keywords:
            if keyword in title:
                found_tags.append(keyword)
        
        return found_tags
    
    def format_case_for_chapter(self, case: CaseStudy, style: str = "detailed") -> str:
        """章の中で使用するためにケーススタディをフォーマット"""
        if style == "brief":
            # 簡潔版
            return f"""**事例：{case.company}**
{case.challenge}という課題に対し、{case.solution}を実施。
結果として{'、'.join(list(case.quantitative_results.values())[:2])}を達成。"""
        
        elif style == "detailed":
            # 詳細版
            return case.to_markdown()
        
        elif style == "inline":
            # インライン引用版
            result_summary = list(case.quantitative_results.values())[0] if case.quantitative_results else "大幅な改善"
            return f"{case.company}社の事例では、{result_summary}という成果を達成しています"
        
        else:
            return case.title
    
    def export_statistics(self) -> Dict:
        """ケーススタディの統計情報をエクスポート"""
        stats = {
            'total_cases': len(self.case_studies),
            'by_industry': {},
            'by_company_size': {},
            'by_region': {},
            'most_common_challenges': {},
            'most_common_tags': {}
        }
        
        # 統計を集計
        for case in self.case_studies.values():
            # 業界別
            stats['by_industry'][case.industry] = stats['by_industry'].get(case.industry, 0) + 1
            
            # 企業規模別
            stats['by_company_size'][case.company_size] = stats['by_company_size'].get(case.company_size, 0) + 1
            
            # 地域別
            stats['by_region'][case.region] = stats['by_region'].get(case.region, 0) + 1
            
            # タグ別
            for tag in case.tags:
                stats['most_common_tags'][tag] = stats['most_common_tags'].get(tag, 0) + 1
        
        return stats


# テスト用関数
def test_case_study_manager():
    """CaseStudyManagerのテスト"""
    
    # テストディレクトリ作成
    test_dir = Path("test_case_studies")
    test_dir.mkdir(exist_ok=True)
    
    manager = CaseStudyManager(str(test_dir))
    
    # テストケースを追加
    test_case = {
        'title': 'トヨタ自動車のAI活用による生産性向上',
        'company': 'トヨタ自動車',
        'industry': '製造業',
        'company_size': '大企業',
        'region': '日本',
        'background': '世界的な競争激化と労働力不足',
        'challenge': '製造ラインの効率化と品質管理の両立',
        'solution': 'AIを活用した予知保全システムの導入',
        'implementation_period': '2年間',
        'quantitative_results': {
            '設備稼働率': '15%向上',
            '不良品率': '30%削減',
            'メンテナンスコスト': '25%削減'
        },
        'qualitative_results': [
            '作業員の負担軽減',
            '品質の安定化'
        ],
        'key_takeaways': [
            'データ収集基盤の重要性',
            '現場との協働'
        ],
        'success_factors': [
            '経営層のコミットメント',
            '段階的な導入アプローチ'
        ],
        'challenges_faced': [
            '初期の現場の抵抗',
            'データ統合の技術的課題'
        ],
        'tags': ['AI', '製造業', '予知保全'],
        'applicable_industries': ['製造業', '物流業'],
        'related_concepts': ['IoT', '予知保全', 'データ分析'],
        'source': 'トヨタ自動車プレスリリース',
        'verified_date': '2024-01-15'
    }
    
    # ケース追加
    case = manager.add_case_study(test_case)
    print(f"追加されたケース: {case.id}")
    
    # 検索テスト
    results = manager.search_cases(industry='製造業', tags=['AI'])
    print(f"検索結果: {len(results)}件")
    
    # フォーマットテスト
    if results:
        print("\n=== 簡潔版 ===")
        print(manager.format_case_for_chapter(results[0], style="brief"))
        
        print("\n=== インライン版 ===")
        print(manager.format_case_for_chapter(results[0], style="inline"))
    
    # クリーンアップ
    import shutil
    shutil.rmtree(test_dir)
    
    print("\n✅ CaseStudyManager テスト完了")
    return True


if __name__ == "__main__":
    test_case_study_manager()