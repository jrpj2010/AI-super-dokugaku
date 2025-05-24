"""
品質検証システム - validator.py

生成された章の品質を検証し、改善提案を行うモジュール
"""

import re
import json
from typing import Dict, List, Any, Tuple, Optional
from dataclasses import dataclass, asdict
from datetime import datetime
from plot_manager import PlotManager, Character


@dataclass
class ValidationResult:
    """検証結果を管理するデータクラス"""
    score: float  # 0.0-1.0のスコア
    passed: bool
    issues: List[str]
    suggestions: List[str]
    details: Dict[str, Any]


@dataclass
class QualityReport:
    """品質レポートを管理するデータクラス"""
    chapter_number: int
    title: str
    timestamp: str
    overall_score: float
    overall_passed: bool
    
    # 各項目の検証結果
    character_count: ValidationResult
    dialogue_ratio: ValidationResult
    structure: ValidationResult
    character_consistency: ValidationResult
    plot_consistency: ValidationResult
    writing_quality: ValidationResult
    
    # 統計情報
    statistics: Dict[str, Any]
    
    def to_dict(self) -> Dict[str, Any]:
        """辞書形式に変換"""
        return asdict(self)
    
    def to_json(self) -> str:
        """JSON形式に変換"""
        return json.dumps(self.to_dict(), ensure_ascii=False, indent=2)


class Validator:
    """品質検証システムのメインクラス"""
    
    def __init__(self, plot_manager: PlotManager):
        self.plot_manager = plot_manager
        
        # 品質基準を設定
        self._init_quality_standards()
        
        # 検証パターンを初期化
        self._init_validation_patterns()
    
    def _init_quality_standards(self):
        """品質基準を初期化"""
        self.standards = {
            'min_characters': 20000,  # 最小文字数
            'max_characters': 50000,  # 最大文字数
            'min_dialogue_ratio': 0.30,  # 最小セリフ比率
            'max_dialogue_ratio': 0.60,  # 最大セリフ比率
            'min_sections': 3,  # 最小節数
            'max_sections': 6,  # 最大節数
            'min_paragraphs': 15,  # 最小段落数
            'min_score_threshold': 0.7  # 合格最小スコア
        }
    
    def _init_validation_patterns(self):
        """検証パターンを初期化"""
        # 問題のあるパターン
        self.problematic_patterns = [
            r'(.)\1{4,}',  # 同じ文字の連続（5回以上）
            r'[。！？]{3,}',  # 句読点の過度な連続
            r'[ぁ-ん]{20,}',  # ひらがなの長すぎる連続
            r'[ァ-ン]{15,}',  # カタカナの長すぎる連続
            r'www+',  # 不適切な表現
        ]
        
        # 良い表現パターン
        self.good_patterns = [
            r'「[^」]+」',  # セリフ
            r'[。！？]\s*\n',  # 適切な改行
            r'　[^　]',  # 適切な段落開始
            r'[、。]',  # 適切な句読点使用
        ]
        
        # ライトノベル風表現
        self.light_novel_patterns = [
            r'〜[だである]',  # ライトノベル的な語尾
            r'という[ことの]',  # 説明的表現
            r'[そういえば|ところで|それにしても]',  # 自然な話題転換
            r'[心の中で|内心では]',  # 内面描写
        ]
    
    def validate_chapter(self, chapter_content: str, chapter_number: int) -> QualityReport:
        """章の品質を総合的に検証"""
        print(f"第{chapter_number}章の品質検証を開始...")
        
        # 基本統計情報を取得
        stats = self._calculate_statistics(chapter_content)
        
        # 各項目を検証
        char_count_result = self._validate_character_count(stats)
        dialogue_result = self._validate_dialogue_ratio(stats)
        structure_result = self._validate_structure(chapter_content, stats)
        char_consistency_result = self._validate_character_consistency(chapter_content, chapter_number)
        plot_consistency_result = self._validate_plot_consistency(chapter_content, chapter_number)
        writing_quality_result = self._validate_writing_quality(chapter_content)
        
        # 総合スコアを計算
        overall_score = self._calculate_overall_score([
            char_count_result, dialogue_result, structure_result,
            char_consistency_result, plot_consistency_result, writing_quality_result
        ])
        
        overall_passed = overall_score >= self.standards['min_score_threshold']
        
        # 章情報を取得
        chapter_info = self.plot_manager.get_chapter(chapter_number)
        chapter_title = chapter_info.title if chapter_info else f"第{chapter_number}章"
        
        # レポートを作成
        report = QualityReport(
            chapter_number=chapter_number,
            title=chapter_title,
            timestamp=datetime.now().isoformat(),
            overall_score=overall_score,
            overall_passed=overall_passed,
            character_count=char_count_result,
            dialogue_ratio=dialogue_result,
            structure=structure_result,
            character_consistency=char_consistency_result,
            plot_consistency=plot_consistency_result,
            writing_quality=writing_quality_result,
            statistics=stats
        )
        
        print(f"検証完了: 総合スコア {overall_score:.2f} ({'合格' if overall_passed else '要改善'})")
        return report
    
    def _calculate_statistics(self, content: str) -> Dict[str, Any]:
        """章の統計情報を計算"""
        total_chars = len(content)
        
        # セリフ分析
        dialogue_matches = re.findall(r'「([^」]*)」', content)
        dialogue_chars = sum(len(match) for match in dialogue_matches)
        dialogue_ratio = dialogue_chars / total_chars if total_chars > 0 else 0
        dialogue_count = len(dialogue_matches)
        
        # 構造分析
        sections = content.count('##')
        paragraphs = len([p for p in content.split('\n\n') if p.strip()])
        sentences = len(re.findall(r'[。！？]', content))
        
        # 文字種分析
        hiragana_chars = len(re.findall(r'[ぁ-ん]', content))
        katakana_chars = len(re.findall(r'[ァ-ン]', content))
        kanji_chars = len(re.findall(r'[一-龯]', content))
        
        # キャラクター登場回数
        character_mentions = {}
        for char_name in self.plot_manager.get_all_characters().keys():
            mentions = content.count(char_name)
            if mentions > 0:
                character_mentions[char_name] = mentions
        
        return {
            'total_characters': total_chars,
            'dialogue_characters': dialogue_chars,
            'dialogue_ratio': dialogue_ratio,
            'dialogue_count': dialogue_count,
            'sections': sections,
            'paragraphs': paragraphs,
            'sentences': sentences,
            'hiragana_ratio': hiragana_chars / total_chars if total_chars > 0 else 0,
            'katakana_ratio': katakana_chars / total_chars if total_chars > 0 else 0,
            'kanji_ratio': kanji_chars / total_chars if total_chars > 0 else 0,
            'character_mentions': character_mentions,
            'avg_paragraph_length': total_chars / paragraphs if paragraphs > 0 else 0,
            'avg_sentence_length': total_chars / sentences if sentences > 0 else 0
        }
    
    def _validate_character_count(self, stats: Dict[str, Any]) -> ValidationResult:
        """文字数を検証"""
        total_chars = stats['total_characters']
        min_chars = self.standards['min_characters']
        max_chars = self.standards['max_characters']
        
        issues = []
        suggestions = []
        
        if total_chars < min_chars:
            issues.append(f"文字数が不足しています ({total_chars:,} < {min_chars:,})")
            suggestions.append("より詳細な描写や追加エピソードで内容を拡充してください")
        elif total_chars > max_chars:
            issues.append(f"文字数が過多です ({total_chars:,} > {max_chars:,})")
            suggestions.append("冗長な部分を削除して簡潔にしてください")
        
        # スコア計算（min_charsを基準として）
        if total_chars >= min_chars:
            score = min(1.0, min_chars / total_chars if total_chars < max_chars else 0.8)
        else:
            score = total_chars / min_chars
        
        return ValidationResult(
            score=score,
            passed=min_chars <= total_chars <= max_chars,
            issues=issues,
            suggestions=suggestions,
            details={'actual_count': total_chars, 'min_required': min_chars, 'max_allowed': max_chars}
        )
    
    def _validate_dialogue_ratio(self, stats: Dict[str, Any]) -> ValidationResult:
        """セリフ比率を検証"""
        ratio = stats['dialogue_ratio']
        min_ratio = self.standards['min_dialogue_ratio']
        max_ratio = self.standards['max_dialogue_ratio']
        
        issues = []
        suggestions = []
        
        if ratio < min_ratio:
            issues.append(f"セリフ比率が低すぎます ({ratio:.1%} < {min_ratio:.1%})")
            suggestions.append("キャラクター間の会話を増やしてライトノベル感を向上させてください")
        elif ratio > max_ratio:
            issues.append(f"セリフ比率が高すぎます ({ratio:.1%} > {max_ratio:.1%})")
            suggestions.append("地の文による描写を増やしてバランスを調整してください")
        
        # スコア計算
        if min_ratio <= ratio <= max_ratio:
            score = 1.0
        elif ratio < min_ratio:
            score = ratio / min_ratio
        else:
            score = max_ratio / ratio
        
        return ValidationResult(
            score=score,
            passed=min_ratio <= ratio <= max_ratio,
            issues=issues,
            suggestions=suggestions,
            details={
                'actual_ratio': ratio,
                'dialogue_count': stats['dialogue_count'],
                'min_required': min_ratio,
                'max_allowed': max_ratio
            }
        )
    
    def _validate_structure(self, content: str, stats: Dict[str, Any]) -> ValidationResult:
        """章の構造を検証"""
        sections = stats['sections']
        paragraphs = stats['paragraphs']
        
        issues = []
        suggestions = []
        
        # 節数チェック
        min_sections = self.standards['min_sections']
        max_sections = self.standards['max_sections']
        
        if sections < min_sections:
            issues.append(f"節数が不足しています ({sections} < {min_sections})")
            suggestions.append("内容を適切な節に分割して構造を明確にしてください")
        elif sections > max_sections:
            issues.append(f"節数が多すぎます ({sections} > {max_sections})")
            suggestions.append("関連する内容をまとめて節数を調整してください")
        
        # 段落数チェック
        min_paragraphs = self.standards['min_paragraphs']
        if paragraphs < min_paragraphs:
            issues.append(f"段落数が不足しています ({paragraphs} < {min_paragraphs})")
            suggestions.append("適切な改行で読みやすい段落構造にしてください")
        
        # 章タイトルの存在チェック
        if not re.search(r'^#\s+', content, re.MULTILINE):
            issues.append("章タイトルが見つかりません")
            suggestions.append("適切な章タイトルを追加してください")
        
        # スコア計算
        structure_score = 0.0
        if min_sections <= sections <= max_sections:
            structure_score += 0.5
        if paragraphs >= min_paragraphs:
            structure_score += 0.3
        if re.search(r'^#\s+', content, re.MULTILINE):
            structure_score += 0.2
        
        return ValidationResult(
            score=structure_score,
            passed=len(issues) == 0,
            issues=issues,
            suggestions=suggestions,
            details={
                'sections': sections,
                'paragraphs': paragraphs,
                'has_title': bool(re.search(r'^#\s+', content, re.MULTILINE))
            }
        )
    
    def _validate_character_consistency(self, content: str, chapter_number: int) -> ValidationResult:
        """キャラクターの一貫性を検証"""
        issues = []
        suggestions = []
        
        # 章に登場すべきキャラクターの確認
        chapter_info = self.plot_manager.get_chapter(chapter_number)
        if chapter_info:
            expected_characters = chapter_info.main_characters
            for char_name in expected_characters:
                if char_name not in content:
                    issues.append(f"主要キャラクター '{char_name}' が登場していません")
                    suggestions.append(f"{char_name}の登場場面を追加してください")
        
        # キャラクターの口調チェック
        all_characters = self.plot_manager.get_all_characters()
        for char_name, char_data in all_characters.items():
            if char_name in content:
                consistency_score = self._check_speaking_style_consistency(content, char_data)
                if consistency_score < 0.5:
                    issues.append(f"{char_name}の口調に一貫性がありません")
                    suggestions.append(f"{char_name}の設定に合った口調に修正してください")
        
        # 未知のキャラクター名の検出
        dialogue_lines = re.findall(r'^(.+?)「', content, re.MULTILINE)
        for line in dialogue_lines:
            # 簡単な名前候補抽出（完全ではないが基本的なチェック）
            potential_names = re.findall(r'[ァ-ンア-ン一-龯]{2,4}', line)
            for name in potential_names:
                if name not in all_characters and len(name) <= 4:
                    issues.append(f"未定義のキャラクター '{name}' が登場している可能性があります")
        
        # スコア計算
        total_checks = len(expected_characters) if chapter_info else 1
        consistency_score = max(0.0, 1.0 - (len(issues) / max(total_checks, 1)))
        
        return ValidationResult(
            score=consistency_score,
            passed=len(issues) == 0,
            issues=issues,
            suggestions=suggestions,
            details={'expected_characters': expected_characters if chapter_info else []}
        )
    
    def _check_speaking_style_consistency(self, content: str, character: Character) -> float:
        """キャラクターの口調の一貫性をチェック"""
        # キャラクターのセリフを抽出
        char_dialogues = []
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if character.name in line and '「' in line and '」' in line:
                dialogues = re.findall(r'「([^」]+)」', line)
                char_dialogues.extend(dialogues)
        
        if not char_dialogues:
            return 1.0  # セリフがない場合は問題なしとする
        
        # 口調パターンの確認
        style_score = 0.0
        total_dialogues = len(char_dialogues)
        
        for dialogue in char_dialogues:
            if self._matches_character_style(dialogue, character):
                style_score += 1.0
        
        return style_score / total_dialogues if total_dialogues > 0 else 1.0
    
    def _matches_character_style(self, dialogue: str, character: Character) -> bool:
        """セリフがキャラクターの口調に合っているかチェック"""
        if "リン" in character.name:
            # 元気で前向き、工学用語使用
            return any(pattern in dialogue for pattern in ['だね', 'よう', '〜しよう', '技術', '機械'])
        elif "ソラ" in character.name:
            # 丁寧で古風
            return any(pattern in dialogue for pattern in ['です', 'ます', 'でしょう', 'ですね'])
        elif "ローズ" in character.name:
            # 姉御肌で豪快
            return any(pattern in dialogue for pattern in ['だよ', 'だね', 'まったく', 'あんた'])
        elif "グレイソン" in character.name:
            # 冷静で知識人
            return any(pattern in dialogue for pattern in ['である', 'だ', '計画', '技術'])
        elif "アルテミス" in character.name:
            # 機械的から感情的へ
            return any(pattern in dialogue for pattern in ['理解', 'できません', 'わからない', 'です'])
        
        return True  # 不明なキャラクターは問題なしとする
    
    def _validate_plot_consistency(self, content: str, chapter_number: int) -> ValidationResult:
        """プロットの一貫性を検証"""
        issues = []
        suggestions = []
        
        # PlotManagerの一貫性チェック機能を使用
        plot_issues = self.plot_manager.validate_plot_consistency(chapter_number, content)
        issues.extend(plot_issues)
        
        # 章のテーマが反映されているかチェック
        chapter_info = self.plot_manager.get_chapter(chapter_number)
        if chapter_info:
            themes = chapter_info.themes
            theme_found = False
            for theme in themes:
                # テーマに関連するキーワードが含まれているかチェック
                theme_keywords = self._get_theme_keywords(theme)
                if any(keyword in content for keyword in theme_keywords):
                    theme_found = True
                    break
            
            if not theme_found:
                issues.append("章のテーマが内容に反映されていません")
                suggestions.append("テーマに関連する要素を追加してください")
        
        # 前章との連続性チェック（簡易版）
        if chapter_number > 1:
            prev_chapter = self.plot_manager.get_chapter(chapter_number - 1)
            if prev_chapter:
                # 前章のキャラクターが唐突に消えていないかチェック
                for char_name in prev_chapter.main_characters:
                    if char_name in chapter_info.main_characters and char_name not in content:
                        issues.append(f"前章の主要キャラクター '{char_name}' の継続性に問題があります")
        
        # スコア計算
        plot_score = max(0.0, 1.0 - (len(issues) / 5.0))  # 最大5つの問題まで許容
        
        return ValidationResult(
            score=plot_score,
            passed=len(issues) == 0,
            issues=issues,
            suggestions=suggestions,
            details={'plot_issues_count': len(issues)}
        )
    
    def _get_theme_keywords(self, theme: str) -> List[str]:
        """テーマに関連するキーワードを取得"""
        theme_keywords = {
            '自然との共生': ['自然', '植物', '動物', '環境', '調和', '共存'],
            '多様性の価値': ['違い', '理解', '協力', '多様', '受け入れ', '個性'],
            '継承と進歩': ['技術', '継承', '受け継ぐ', '発展', '進歩', '成長'],
            '心の成長': ['成長', '学ぶ', '理解', '気持ち', '心', '感情']
        }
        
        for key, keywords in theme_keywords.items():
            if key in theme:
                return keywords
        
        return [theme]  # 該当しない場合はテーマ名そのものを返す
    
    def _validate_writing_quality(self, content: str) -> ValidationResult:
        """文章品質を検証"""
        issues = []
        suggestions = []
        quality_score = 1.0
        
        # 問題のあるパターンをチェック
        for pattern in self.problematic_patterns:
            matches = re.findall(pattern, content)
            if matches:
                issues.append(f"不適切な表現パターンが検出されました: {pattern}")
                quality_score -= 0.1
        
        # ライトノベル風表現の使用度をチェック
        ln_pattern_count = 0
        for pattern in self.light_novel_patterns:
            ln_pattern_count += len(re.findall(pattern, content))
        
        ln_ratio = ln_pattern_count / len(content.split()) if content.split() else 0
        if ln_ratio < 0.02:  # 2%未満だと不足
            issues.append("ライトノベル風の表現が不足しています")
            suggestions.append("より親しみやすい文体表現を追加してください")
            quality_score -= 0.1
        
        # 文の長さのバランスチェック
        sentences = re.split(r'[。！？]', content)
        if sentences:
            avg_sentence_length = sum(len(s) for s in sentences) / len(sentences)
            if avg_sentence_length > 80:
                issues.append("文が長すぎます")
                suggestions.append("文を短く区切って読みやすくしてください")
                quality_score -= 0.1
            elif avg_sentence_length < 15:
                issues.append("文が短すぎます")
                suggestions.append("もう少し詳細な描写を追加してください")
                quality_score -= 0.1
        
        # 句読点の使用チェック
        punctuation_ratio = len(re.findall(r'[、。]', content)) / len(content) if content else 0
        if punctuation_ratio < 0.03:
            issues.append("句読点の使用が不足しています")
            suggestions.append("適切な句読点で読みやすさを向上させてください")
            quality_score -= 0.1
        
        quality_score = max(0.0, quality_score)
        
        return ValidationResult(
            score=quality_score,
            passed=len(issues) == 0,
            issues=issues,
            suggestions=suggestions,
            details={
                'ln_pattern_ratio': ln_ratio,
                'avg_sentence_length': avg_sentence_length if 'avg_sentence_length' in locals() else 0,
                'punctuation_ratio': punctuation_ratio
            }
        )
    
    def _calculate_overall_score(self, results: List[ValidationResult]) -> float:
        """総合スコアを計算"""
        if not results:
            return 0.0
        
        # 各項目の重み
        weights = [0.2, 0.2, 0.15, 0.15, 0.15, 0.15]  # 文字数、セリフ、構造、キャラ一貫性、プロット一貫性、文章品質
        
        total_weighted_score = 0.0
        total_weight = 0.0
        
        for i, result in enumerate(results):
            if i < len(weights):
                weight = weights[i]
                total_weighted_score += result.score * weight
                total_weight += weight
        
        return total_weighted_score / total_weight if total_weight > 0 else 0.0
    
    def generate_detailed_report(self, report: QualityReport) -> str:
        """詳細なレポートを生成"""
        report_text = f"""
# 品質検証レポート - {report.title}

## 総合評価
- **総合スコア**: {report.overall_score:.2f}/1.00
- **判定**: {'✅ 合格' if report.overall_passed else '❌ 要改善'}
- **検証日時**: {report.timestamp}

## 詳細検証結果

### 1. 文字数検証
- **スコア**: {report.character_count.score:.2f}
- **判定**: {'✅ 合格' if report.character_count.passed else '❌ 不合格'}
- **実際の文字数**: {report.statistics['total_characters']:,}文字
"""
        
        if report.character_count.issues:
            report_text += "- **問題点**:\n"
            for issue in report.character_count.issues:
                report_text += f"  - {issue}\n"
        
        if report.character_count.suggestions:
            report_text += "- **改善提案**:\n"
            for suggestion in report.character_count.suggestions:
                report_text += f"  - {suggestion}\n"
        
        report_text += f"""
### 2. セリフ比率検証
- **スコア**: {report.dialogue_ratio.score:.2f}
- **判定**: {'✅ 合格' if report.dialogue_ratio.passed else '❌ 不合格'}
- **セリフ比率**: {report.statistics['dialogue_ratio']:.1%}
- **セリフ数**: {report.statistics['dialogue_count']}個
"""
        
        if report.dialogue_ratio.issues:
            report_text += "- **問題点**:\n"
            for issue in report.dialogue_ratio.issues:
                report_text += f"  - {issue}\n"
        
        report_text += f"""
### 3. 構造検証
- **スコア**: {report.structure.score:.2f}
- **判定**: {'✅ 合格' if report.structure.passed else '❌ 不合格'}
- **節数**: {report.statistics['sections']}
- **段落数**: {report.statistics['paragraphs']}
"""
        
        report_text += f"""
### 4. キャラクター一貫性
- **スコア**: {report.character_consistency.score:.2f}
- **判定**: {'✅ 合格' if report.character_consistency.passed else '❌ 不合格'}
"""
        
        report_text += f"""
### 5. プロット一貫性
- **スコア**: {report.plot_consistency.score:.2f}
- **判定**: {'✅ 合格' if report.plot_consistency.passed else '❌ 不合格'}
"""
        
        report_text += f"""
### 6. 文章品質
- **スコア**: {report.writing_quality.score:.2f}
- **判定**: {'✅ 合格' if report.writing_quality.passed else '❌ 不合格'}
"""
        
        # 全体的な改善提案
        all_suggestions = []
        for result in [report.character_count, report.dialogue_ratio, report.structure, 
                      report.character_consistency, report.plot_consistency, report.writing_quality]:
            all_suggestions.extend(result.suggestions)
        
        if all_suggestions:
            report_text += "\n## 改善提案\n"
            for i, suggestion in enumerate(all_suggestions, 1):
                report_text += f"{i}. {suggestion}\n"
        
        # 統計情報
        report_text += f"""
## 統計情報
- **総文字数**: {report.statistics['total_characters']:,}文字
- **段落数**: {report.statistics['paragraphs']}
- **文数**: {report.statistics['sentences']}
- **平均段落長**: {report.statistics['avg_paragraph_length']:.0f}文字
- **ひらがな比率**: {report.statistics['hiragana_ratio']:.1%}
- **カタカナ比率**: {report.statistics['katakana_ratio']:.1%}
- **漢字比率**: {report.statistics['kanji_ratio']:.1%}
"""
        
        return report_text
    
    def save_report(self, report: QualityReport, format_type: str = "markdown") -> str:
        """レポートをファイルに保存"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        if format_type == "json":
            filename = f"quality_report_ch{report.chapter_number}_{timestamp}.json"
            content = report.to_json()
        else:  # markdown
            filename = f"quality_report_ch{report.chapter_number}_{timestamp}.md"
            content = self.generate_detailed_report(report)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return filename


# モジュールテスト用の関数
def test_validator():
    """validator.pyの動作テスト"""
    try:
        from plot_manager import PlotManager
        
        print("=== Validator テスト ===")
        
        # PlotManagerを初期化
        pm = PlotManager()
        validator = Validator(pm)
        
        # テスト用の章内容
        test_content = """# 第1章　空からの来訪者

## 第1節　静かな夜

　リンが工房で飛行機の設計図を書いている夜、突然空に巨大な流れ星が現れた。

「あれは何だろう？」

　リンは目を輝かせながら空を見上げた。

## 第2節　墜落現場

　それは流れ星ではなく、古い飛行船の残骸だった。

「大変！誰か怪我をしているかもしれない」

　ソラという少年が瓦礫の中から発見された。彼は記憶を失っていた。

「君は大丈夫？名前は覚えている？」

「ソラ...ソラという名前だけは...」

　不思議な光を放つ少年との出会いが、すべての始まりだった。
"""
        
        # 検証実行
        report = validator.validate_chapter(test_content, 1)
        
        print(f"検証結果:")
        print(f"  総合スコア: {report.overall_score:.2f}")
        print(f"  合格判定: {'✅ 合格' if report.overall_passed else '❌ 要改善'}")
        print(f"  文字数: {report.statistics['total_characters']:,}")
        print(f"  セリフ比率: {report.statistics['dialogue_ratio']:.1%}")
        
        # 詳細レポート生成テスト
        detailed_report = validator.generate_detailed_report(report)
        print(f"\n詳細レポート生成: {len(detailed_report)}文字")
        
        print("\n✅ Validator テスト完了")
        return True
        
    except Exception as e:
        print(f"❌ Validator テストエラー: {e}")
        return False


if __name__ == "__main__":
    test_validator()