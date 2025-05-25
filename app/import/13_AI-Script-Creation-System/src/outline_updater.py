"""
アウトライン更新システム
outline.md（plot.md相当）を章の執筆進捗に応じて自動更新する
"""

import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

from version_manager import BusinessBookVersionManager


class OutlineUpdater:
    """ビジネス書籍のアウトラインを管理・更新するクラス"""
    
    def __init__(self, project_root: Path):
        self.project_root = Path(project_root)
        self.outline_file = self.project_root / "outline.md"
        self.version_manager = BusinessBookVersionManager(project_root)
        
    def _parse_outline(self) -> Dict:
        """現在のoutline.mdを解析"""
        if not self.outline_file.exists():
            return {"chapters": [], "metadata": {}}
        
        with open(self.outline_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        outline = {
            "chapters": [],
            "metadata": {},
            "raw_content": content
        }
        
        # メタデータの抽出
        metadata_match = re.search(r'---\n(.*?)\n---', content, re.DOTALL)
        if metadata_match:
            metadata_text = metadata_match.group(1)
            for line in metadata_text.split('\n'):
                if ':' in line:
                    key, value = line.split(':', 1)
                    outline["metadata"][key.strip()] = value.strip()
        
        # 章情報の抽出
        chapter_pattern = r'## 第(\d+)章[：:]\s*(.+?)(?:\n|$)'
        for match in re.finditer(chapter_pattern, content):
            chapter_num = int(match.group(1))
            chapter_title = match.group(2).strip()
            
            # 章の詳細情報を取得
            chapter_info = {
                "number": chapter_num,
                "title": chapter_title,
                "status": "pending",
                "word_count": 0,
                "last_updated": None,
                "sections": []
            }
            
            # ステータスマーカーを確認
            status_markers = {
                "✅": "completed",
                "📝": "in_progress",
                "⏸️": "paused",
                "❌": "cancelled"
            }
            
            for marker, status in status_markers.items():
                if marker in match.group(0):
                    chapter_info["status"] = status
                    break
            
            # 文字数情報を抽出
            word_count_match = re.search(
                rf'第{chapter_num}章.*?\[(\d+)字\]',
                content
            )
            if word_count_match:
                chapter_info["word_count"] = int(word_count_match.group(1))
            
            outline["chapters"].append(chapter_info)
        
        return outline
    
    def update_chapter_status(
        self,
        chapter_number: int,
        status: str,
        word_count: Optional[int] = None,
        sections_completed: Optional[List[str]] = None
    ) -> bool:
        """
        章のステータスを更新
        
        Args:
            chapter_number: 章番号
            status: 新しいステータス（completed, in_progress, pending, paused）
            word_count: 現在の文字数
            sections_completed: 完了したセクションのリスト
        """
        outline = self._parse_outline()
        content = outline["raw_content"]
        
        # ステータスマーカー
        status_markers = {
            "completed": "✅",
            "in_progress": "📝",
            "pending": "⏳",
            "paused": "⏸️",
            "cancelled": "❌"
        }
        
        # 章の行を検索
        chapter_pattern = rf'(## 第{chapter_number}章[：:].*?)(?=\n##|\n\n|\Z)'
        chapter_match = re.search(chapter_pattern, content, re.DOTALL)
        
        if not chapter_match:
            return False
        
        old_chapter_text = chapter_match.group(1)
        new_chapter_text = old_chapter_text
        
        # 既存のステータスマーカーを削除
        for marker in status_markers.values():
            new_chapter_text = new_chapter_text.replace(marker, '')
        
        # 新しいステータスマーカーを追加
        if status in status_markers:
            # 章タイトルの最後にマーカーを追加
            title_match = re.match(r'(## 第\d+章[：:].*?)(\n|$)', new_chapter_text)
            if title_match:
                new_chapter_text = (
                    title_match.group(1).rstrip() + 
                    f" {status_markers[status]}" + 
                    title_match.group(2)
                )
        
        # 文字数を更新
        if word_count is not None:
            # 既存の文字数表記を削除
            new_chapter_text = re.sub(r'\[\d+字\]', '', new_chapter_text)
            # 新しい文字数を追加
            title_match = re.match(r'(## 第\d+章[：:].*?)(\n|$)', new_chapter_text)
            if title_match:
                marker = status_markers.get(status, '')
                title_without_marker = title_match.group(1).replace(marker, '').rstrip()
                new_chapter_text = (
                    title_without_marker + 
                    f" [{word_count}字] {marker}" + 
                    title_match.group(2)
                )
        
        # 更新日時を追加
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
        if "更新:" not in new_chapter_text:
            new_chapter_text += f"\n   更新: {timestamp}"
        else:
            new_chapter_text = re.sub(
                r'更新: \d{4}-\d{2}-\d{2} \d{2}:\d{2}',
                f'更新: {timestamp}',
                new_chapter_text
            )
        
        # セクション完了状況を更新
        if sections_completed:
            section_text = "\n   完了セクション:\n"
            for section in sections_completed:
                section_text += f"   - ✓ {section}\n"
            
            # 既存のセクション情報を置換または追加
            if "完了セクション:" in new_chapter_text:
                new_chapter_text = re.sub(
                    r'完了セクション:.*?(?=\n\n|\n##|\Z)',
                    section_text.strip(),
                    new_chapter_text,
                    flags=re.DOTALL
                )
            else:
                new_chapter_text += section_text
        
        # 内容を更新
        new_content = content.replace(old_chapter_text, new_chapter_text)
        
        # ファイルを保存
        with open(self.outline_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        # バージョンを保存
        self.version_manager.save_version(
            f"第{chapter_number}章 ステータス更新: {status}",
            "outline-updater"
        )
        
        return True
    
    def add_progress_summary(self) -> bool:
        """全体の進捗サマリーをoutlineに追加"""
        outline = self._parse_outline()
        
        # 進捗を計算
        total_chapters = len(outline["chapters"])
        completed_chapters = sum(
            1 for ch in outline["chapters"] 
            if ch["status"] == "completed"
        )
        in_progress_chapters = sum(
            1 for ch in outline["chapters"] 
            if ch["status"] == "in_progress"
        )
        
        total_words = sum(ch["word_count"] for ch in outline["chapters"])
        target_words = int(outline["metadata"].get("target_words", 80000))
        
        # 進捗サマリーを作成
        progress_summary = f"""
## 📊 執筆進捗サマリー

- **完了章数**: {completed_chapters}/{total_chapters} 章
- **進行中**: {in_progress_chapters} 章
- **進捗率**: {(completed_chapters / total_chapters * 100):.1f}%
- **総文字数**: {total_words:,} / {target_words:,} 字 ({(total_words / target_words * 100):.1f}%)
- **最終更新**: {datetime.now().strftime("%Y-%m-%d %H:%M")}

### 章別進捗
"""
        
        # 章別の進捗バーを追加
        for chapter in outline["chapters"]:
            status_emoji = {
                "completed": "✅",
                "in_progress": "📝",
                "pending": "⏳",
                "paused": "⏸️",
                "cancelled": "❌"
            }.get(chapter["status"], "⏳")
            
            chapter_target = target_words // total_chapters
            progress_percent = min(100, (chapter["word_count"] / chapter_target * 100))
            progress_bar = self._create_progress_bar(progress_percent)
            
            progress_summary += (
                f"- 第{chapter['number']}章 {status_emoji} "
                f"{progress_bar} {chapter['word_count']:,}字\n"
            )
        
        # outlineの内容を更新
        content = outline["raw_content"]
        
        # 既存のサマリーを削除
        content = re.sub(
            r'## 📊 執筆進捗サマリー.*?(?=\n##|\Z)',
            '',
            content,
            flags=re.DOTALL
        )
        
        # メタデータの後に新しいサマリーを挿入
        if '---' in content:
            # メタデータブロックの後に挿入
            parts = content.split('---', 2)
            if len(parts) >= 3:
                new_content = (
                    f"---{parts[1]}---\n" +
                    progress_summary + "\n" +
                    parts[2].lstrip()
                )
            else:
                new_content = content + "\n" + progress_summary
        else:
            new_content = progress_summary + "\n" + content
        
        # ファイルを保存
        with open(self.outline_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True
    
    def _create_progress_bar(self, percent: float, width: int = 20) -> str:
        """プログレスバーを作成"""
        filled = int(width * percent / 100)
        empty = width - filled
        return f"[{'█' * filled}{'░' * empty}] {percent:.0f}%"
    
    def generate_status_report(self) -> str:
        """執筆状況レポートを生成"""
        outline = self._parse_outline()
        
        report = f"""# 執筆状況レポート
生成日時: {datetime.now().strftime("%Y-%m-%d %H:%M")}

## プロジェクト情報
- タイトル: {outline['metadata'].get('title', '未設定')}
- 著者: {outline['metadata'].get('author', '未設定')}
- 目標文字数: {outline['metadata'].get('target_words', '未設定')}

## 章別詳細
"""
        
        for chapter in outline["chapters"]:
            report += f"\n### 第{chapter['number']}章: {chapter['title']}\n"
            report += f"- ステータス: {chapter['status']}\n"
            report += f"- 文字数: {chapter['word_count']:,}字\n"
            report += f"- 最終更新: {chapter.get('last_updated', '未更新')}\n"
            
            if chapter.get('sections'):
                report += "- セクション:\n"
                for section in chapter['sections']:
                    report += f"  - {section}\n"
        
        # バージョン履歴を追加
        history = self.version_manager.get_version_history()
        if history:
            report += "\n## 最近の更新履歴\n"
            for version in history[-10:]:  # 最新10件
                report += (
                    f"- {version['timestamp']}: "
                    f"{version['reason']} (by {version['author']})\n"
                )
        
        return report