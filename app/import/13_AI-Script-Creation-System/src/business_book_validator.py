"""
ビジネス書籍品質検証システム - business_book_validator.py

生成されたビジネス書籍コンテンツの品質をチェックし、
改善提案を行うモジュール
"""

import re
from typing import Dict, List, Tuple, Optional
from pathlib import Path
import json
from datetime import datetime
from dataclasses import dataclass, asdict


@dataclass
class QualityReport:
    """品質検証レポート"""
    chapter_number: int
    timestamp: str
    scores: Dict[str, float]
    issues: List[str]
    suggestions: List[str]
    overall_score: float
    passed: bool
    
    def to_dict(self) -> Dict:
        return asdict(self)
    
    def to_markdown(self) -> str:
        """マークダウン形式のレポートを生成"""
        status = "✅ 合格" if self.passed else "❌ 要改善"
        
        report = f"""# 第{self.chapter_number}章 品質検証レポート

生成日時: {self.timestamp}
総合スコア: {self.overall_score:.1f}/100 {status}

## スコア詳細
"""
        for metric, score in self.scores.items():
            report += f"- {metric}: {score:.1f}/100\n"
        
        if self.issues:
            report += "\n## 検出された問題\n"
            for issue in self.issues:
                report += f"- {issue}\n"
        
        if self.suggestions:
            report += "\n## 改善提案\n"
            for suggestion in self.suggestions:
                report += f"- {suggestion}\n"
        
        return report


class BusinessBookValidator:
    """ビジネス書籍の品質検証クラス"""
    
    def __init__(self, config: Optional[Dict] = None):
        """
        Args:
            config: 検証設定（閾値など）
        """
        self.config = config or self._get_default_config()
        
    def _get_default_config(self) -> Dict:
        """デフォルトの検証設定"""
        return {
            'min_overall_score': 75.0,
            'weights': {
                'readability': 0.20,
                'structure': 0.15,
                'content_ratio': 0.20,
                'actionability': 0.20,
                'consistency': 0.15,
                'engagement': 0.10
            },
            'thresholds': {
                'min_words': 6000,
                'max_words': 10000,
                'min_example_ratio': 0.20,
                'max_example_ratio': 0.40,
                'min_theory_ratio': 0.30,
                'max_theory_ratio': 0.50,
                'min_action_ratio': 0.20,
                'max_action_ratio': 0.35,
                'max_sentence_length': 60,
                'min_sections': 3,
                'max_sections': 7
            }
        }
    
    def validate_chapter(self, 
                        text: str, 
                        chapter_number: int,
                        chapter_context: Optional[Dict] = None) -> QualityReport:
        """
        章の品質を検証
        
        Args:
            text: 検証対象のテキスト
            chapter_number: 章番号
            chapter_context: 章のコンテキスト情報（BusinessBookManagerから取得）
            
        Returns:
            QualityReport: 品質検証レポート
        """
        scores = {}
        issues = []
        suggestions = []
        
        # 各種メトリクスを計算
        scores['readability'] = self._check_readability(text, issues, suggestions)
        scores['structure'] = self._check_structure(text, issues, suggestions)
        scores['content_ratio'] = self._check_content_ratio(text, issues, suggestions)
        scores['actionability'] = self._check_actionability(text, issues, suggestions)
        scores['consistency'] = self._check_consistency(text, chapter_context, issues, suggestions)
        scores['engagement'] = self._check_engagement(text, issues, suggestions)
        
        # 総合スコアを計算
        overall_score = self._calculate_overall_score(scores)
        
        # レポートを作成
        report = QualityReport(
            chapter_number=chapter_number,
            timestamp=datetime.now().isoformat(),
            scores=scores,
            issues=issues,
            suggestions=suggestions,
            overall_score=overall_score,
            passed=overall_score >= self.config['min_overall_score']
        )
        
        return report
    
    def _check_readability(self, text: str, issues: List[str], suggestions: List[str]) -> float:
        """読みやすさをチェック"""
        score = 100.0
        
        # 文の長さチェック
        sentences = re.split(r'[。！？]', text)
        long_sentences = [s for s in sentences if len(s) > self.config['thresholds']['max_sentence_length']]
        
        if long_sentences:
            ratio = len(long_sentences) / len(sentences)
            score -= ratio * 30
            issues.append(f"長すぎる文が{len(long_sentences)}個あります（全体の{ratio*100:.1f}%）")
            suggestions.append("長い文を短く分割して、読みやすさを向上させてください")
        
        # 専門用語の説明チェック
        jargon_pattern = r'[A-Z]{2,}|[ァ-ヶー]+(?:システム|プロセス|フレームワーク)'
        jargon_matches = re.findall(jargon_pattern, text)
        explained_jargon = 0
        
        for term in set(jargon_matches):
            if f"{term}とは" in text or f"{term}（" in text or f"※{term}" in text:
                explained_jargon += 1
        
        if jargon_matches and explained_jargon < len(set(jargon_matches)) * 0.7:
            score -= 20
            issues.append("専門用語の説明が不足しています")
            suggestions.append("初出の専門用語には必ず説明を加えてください")
        
        # 段落の長さチェック
        paragraphs = text.split('\n\n')
        long_paragraphs = [p for p in paragraphs if len(p) > 300]
        
        if long_paragraphs:
            score -= 10
            issues.append(f"長すぎる段落が{len(long_paragraphs)}個あります")
            suggestions.append("段落を適切に分割して、視覚的な読みやすさを向上させてください")
        
        return max(0, score)
    
    def _check_structure(self, text: str, issues: List[str], suggestions: List[str]) -> float:
        """構造の適切さをチェック"""
        score = 100.0
        
        # セクション数のチェック
        sections = re.findall(r'^###?\s+(.+)$', text, re.MULTILINE)
        
        if len(sections) < self.config['thresholds']['min_sections']:
            score -= 30
            issues.append(f"セクション数が少なすぎます（{len(sections)}個）")
            suggestions.append("内容を適切にセクション分けして、構造を明確にしてください")
        elif len(sections) > self.config['thresholds']['max_sections']:
            score -= 20
            issues.append(f"セクション数が多すぎます（{len(sections)}個）")
            suggestions.append("関連するセクションを統合して、構造を簡潔にしてください")
        
        # 導入と結論の存在チェック
        has_introduction = any(keyword in text[:500] for keyword in ["本章では", "この章では", "ここでは"])
        has_conclusion = any(keyword in text[-500:] for keyword in ["まとめ", "以上", "ポイント"])
        
        if not has_introduction:
            score -= 15
            issues.append("章の導入部が不明確です")
            suggestions.append("章の冒頭で、学習内容と目的を明確に示してください")
        
        if not has_conclusion:
            score -= 15
            issues.append("章のまとめが不足しています")
            suggestions.append("章の最後に、重要ポイントのまとめを追加してください")
        
        return max(0, score)
    
    def _check_content_ratio(self, text: str, issues: List[str], suggestions: List[str]) -> float:
        """コンテンツ比率をチェック（理論・事例・アクション）"""
        score = 100.0
        total_length = len(text)
        
        # 事例の比率
        example_markers = ["例えば", "事例", "ケース", "実際に", "具体的に"]
        example_sections = []
        for marker in example_markers:
            for match in re.finditer(marker, text):
                start = match.start()
                end = min(start + 500, total_length)
                example_sections.append((start, end))
        
        # 重複を除去
        example_text_length = self._merge_overlapping_sections(example_sections)
        example_ratio = example_text_length / total_length
        
        # 理論説明の比率
        theory_markers = ["とは", "定義", "概念", "原理", "理論", "仕組み"]
        theory_sections = []
        for marker in theory_markers:
            for match in re.finditer(marker, text):
                start = max(0, match.start() - 100)
                end = min(match.end() + 400, total_length)
                theory_sections.append((start, end))
        
        theory_text_length = self._merge_overlapping_sections(theory_sections)
        theory_ratio = theory_text_length / total_length
        
        # アクション項目の比率
        action_markers = ["ステップ", "手順", "方法", "実践", "してください", "しましょう"]
        action_sections = []
        for marker in action_markers:
            for match in re.finditer(marker, text):
                start = max(0, match.start() - 50)
                end = min(match.end() + 200, total_length)
                action_sections.append((start, end))
        
        action_text_length = self._merge_overlapping_sections(action_sections)
        action_ratio = action_text_length / total_length
        
        # 比率の評価
        thresholds = self.config['thresholds']
        
        if example_ratio < thresholds['min_example_ratio']:
            score -= 20
            issues.append(f"事例が不足しています（{example_ratio*100:.1f}%）")
            suggestions.append("より多くの具体例やケーススタディを追加してください")
        elif example_ratio > thresholds['max_example_ratio']:
            score -= 10
            issues.append(f"事例が多すぎます（{example_ratio*100:.1f}%）")
            suggestions.append("事例を厳選し、理論的な説明とのバランスを取ってください")
        
        if theory_ratio < thresholds['min_theory_ratio']:
            score -= 20
            issues.append(f"理論的説明が不足しています（{theory_ratio*100:.1f}%）")
            suggestions.append("概念や原理の説明を充実させてください")
        elif theory_ratio > thresholds['max_theory_ratio']:
            score -= 10
            issues.append(f"理論的説明が多すぎます（{theory_ratio*100:.1f}%）")
            suggestions.append("実践的な内容を増やし、理論と実践のバランスを取ってください")
        
        if action_ratio < thresholds['min_action_ratio']:
            score -= 20
            issues.append(f"実践的内容が不足しています（{action_ratio*100:.1f}%）")
            suggestions.append("読者が実践できる具体的なアクションを追加してください")
        
        return max(0, score)
    
    def _check_actionability(self, text: str, issues: List[str], suggestions: List[str]) -> float:
        """実践可能性をチェック"""
        score = 100.0
        
        # アクションアイテムの明確さ
        action_patterns = [
            r'(\d+)\.\s*(.+?)(?:\n|$)',  # 番号付きリスト
            r'[・•]\s*(.+?)(?:\n|$)',     # 箇条書き
            r'ステップ\d+[:：]\s*(.+?)(?:\n|$)'  # ステップ形式
        ]
        
        action_items = []
        for pattern in action_patterns:
            matches = re.findall(pattern, text, re.MULTILINE)
            action_items.extend(matches)
        
        if len(action_items) < 3:
            score -= 30
            issues.append("明確なアクションアイテムが不足しています")
            suggestions.append("読者が実践できる具体的なステップを箇条書きで追加してください")
        
        # チェックリストやテンプレートの存在
        has_checklist = "チェックリスト" in text or "確認項目" in text
        has_template = "テンプレート" in text or "フォーマット" in text or "様式" in text
        
        if not has_checklist and not has_template:
            score -= 20
            suggestions.append("実践を支援するチェックリストやテンプレートの追加を検討してください")
        
        # 実践の難易度表示
        has_difficulty = any(word in text for word in ["初級", "中級", "上級", "難易度", "レベル"])
        if not has_difficulty:
            score -= 10
            suggestions.append("実践項目の難易度やレベルを明示することを検討してください")
        
        return max(0, score)
    
    def _check_consistency(self, text: str, chapter_context: Optional[Dict], 
                          issues: List[str], suggestions: List[str]) -> float:
        """一貫性をチェック"""
        score = 100.0
        
        if not chapter_context:
            return score  # コンテキストがない場合はスキップ
        
        # 章の目的との整合性
        chapter_info = chapter_context.get('chapter')
        if chapter_info:
            # キーコンセプトの言及チェック
            for concept in chapter_info.key_concepts:
                if concept not in text:
                    score -= 10
                    issues.append(f"重要概念「{concept}」が説明されていません")
            
            # 学習目標との整合性
            if hasattr(chapter_info, 'objective') and chapter_info.objective:
                objective_keywords = re.findall(r'\w+', chapter_info.objective)
                mentioned_keywords = sum(1 for kw in objective_keywords if kw in text)
                if mentioned_keywords < len(objective_keywords) * 0.5:
                    score -= 15
                    issues.append("学習目標と内容の整合性が低い可能性があります")
        
        # 用語の一貫性
        term_variations = {
            'AI': ['AI', '人工知能', 'エーアイ'],
            'DX': ['DX', 'デジタルトランスフォーメーション', 'デジタル変革'],
            'KPI': ['KPI', '重要業績評価指標', 'ケーピーアイ']
        }
        
        for term_group in term_variations.values():
            used_terms = [term for term in term_group if term in text]
            if len(used_terms) > 1:
                score -= 5
                issues.append(f"用語の表記揺れがあります: {', '.join(used_terms)}")
                suggestions.append("用語は統一して使用してください")
        
        return max(0, score)
    
    def _check_engagement(self, text: str, issues: List[str], suggestions: List[str]) -> float:
        """読者の関心を引く要素をチェック"""
        score = 100.0
        
        # 問いかけの存在
        questions = re.findall(r'.+？', text)
        if len(questions) < 2:
            score -= 20
            issues.append("読者への問いかけが不足しています")
            suggestions.append("読者の思考を促す問いかけを追加してください")
        
        # ストーリーや逸話の存在
        story_markers = ["ある企業", "私の経験", "実は", "驚くことに", "意外にも"]
        has_story = any(marker in text for marker in story_markers)
        if not has_story:
            score -= 15
            suggestions.append("読者の興味を引くストーリーや逸話の追加を検討してください")
        
        # データや統計の活用
        has_data = bool(re.search(r'\d+[%％]|\d+倍|\d+社', text))
        if not has_data:
            score -= 15
            suggestions.append("説得力を高めるため、具体的なデータや統計を追加してください")
        
        # 視覚的要素への言及
        visual_markers = ["図", "表", "グラフ", "チャート", "イラスト"]
        has_visual_reference = any(marker in text for marker in visual_markers)
        if not has_visual_reference:
            score -= 10
            suggestions.append("図表やグラフへの参照を追加し、視覚的理解を促進してください")
        
        return max(0, score)
    
    def _merge_overlapping_sections(self, sections: List[Tuple[int, int]]) -> int:
        """重複するセクションをマージして総文字数を計算"""
        if not sections:
            return 0
        
        # セクションをソート
        sections.sort(key=lambda x: x[0])
        
        merged = [sections[0]]
        for current in sections[1:]:
            last = merged[-1]
            if current[0] <= last[1]:
                # 重複している場合はマージ
                merged[-1] = (last[0], max(last[1], current[1]))
            else:
                merged.append(current)
        
        # 総文字数を計算
        total_length = sum(end - start for start, end in merged)
        return total_length
    
    def _calculate_overall_score(self, scores: Dict[str, float]) -> float:
        """重み付けして総合スコアを計算"""
        weights = self.config['weights']
        total_score = 0.0
        total_weight = 0.0
        
        for metric, score in scores.items():
            weight = weights.get(metric, 0.0)
            total_score += score * weight
            total_weight += weight
        
        if total_weight > 0:
            return total_score / total_weight
        return 0.0
    
    def save_report(self, report: QualityReport, output_dir: Path) -> Tuple[Path, Path]:
        """レポートを保存"""
        output_dir = Path(output_dir)
        output_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Markdown形式で保存
        md_path = output_dir / f"quality_report_ch{report.chapter_number}_{timestamp}.md"
        with open(md_path, 'w', encoding='utf-8') as f:
            f.write(report.to_markdown())
        
        # JSON形式で保存
        json_path = output_dir / f"quality_report_ch{report.chapter_number}_{timestamp}.json"
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(report.to_dict(), f, ensure_ascii=False, indent=2)
        
        return md_path, json_path
    
    def suggest_improvements(self, text: str, report: QualityReport) -> str:
        """改善提案に基づいて修正案を生成（プロンプト用）"""
        prompt = f"""以下のビジネス書籍の文章を、品質検証レポートに基づいて改善してください。

【現在の文章】
{text}

【検出された問題】
{chr(10).join(f"- {issue}" for issue in report.issues)}

【改善提案】
{chr(10).join(f"- {suggestion}" for suggestion in report.suggestions)}

【改善の重点】
- 総合スコア: {report.overall_score:.1f}/100
- 最も低いスコア: {min(report.scores.items(), key=lambda x: x[1])}

上記の問題と提案を踏まえて、文章を改善してください。
"""
        return prompt


# テスト用関数
def test_business_book_validator():
    """BusinessBookValidatorのテスト"""
    sample_text = """## 第1章：AIがビジネスを変える理由

本章では、なぜ今AIがビジネスに必要なのかを解説します。

### 現代ビジネスの課題

現代のビジネス環境は、かつてないほど複雑化しています。
例えば、ある製造業の企業では、毎日数テラバイトのデータが生成されており、
人間の力だけでは分析が追いつかない状況です。

### AIによる解決

AIとは、人間の知的活動を模倣するコンピュータシステムのことです。
具体的には以下のステップで導入できます：

1. 現状分析
2. AI導入計画の策定
3. パイロットプロジェクトの実施

### まとめ

AIの導入により、業務効率が平均30%向上するというデータがあります。
次章では、具体的な導入方法を詳しく説明します。
"""
    
    validator = BusinessBookValidator()
    report = validator.validate_chapter(sample_text, 1)
    
    print("=== BusinessBookValidator テスト ===")
    print(report.to_markdown())
    
    return report.passed


if __name__ == "__main__":
    test_business_book_validator()