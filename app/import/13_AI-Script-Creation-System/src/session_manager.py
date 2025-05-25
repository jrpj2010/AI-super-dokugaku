"""
セッション管理システム
Claudeの制限による中断と再開を管理するモジュール
"""

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Any
import hashlib


class SessionManager:
    """執筆セッションの管理と再開支援"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.session_file = self.project_root / ".session_state.json"
        self.checkpoint_dir = self.project_root / ".checkpoints"
        self.checkpoint_dir.mkdir(exist_ok=True)
        
    def save_session_state(self, state: Dict[str, Any]) -> str:
        """現在のセッション状態を保存"""
        session_id = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        session_data = {
            "session_id": session_id,
            "timestamp": datetime.now().isoformat(),
            "state": state,
            "project_info": {
                "root": str(self.project_root),
                "type": state.get("project_type", "business_book")
            }
        }
        
        # メインセッションファイルを更新
        with open(self.session_file, 'w', encoding='utf-8') as f:
            json.dump(session_data, f, ensure_ascii=False, indent=2)
            
        # チェックポイントとしても保存
        checkpoint_file = self.checkpoint_dir / f"checkpoint_{session_id}.json"
        with open(checkpoint_file, 'w', encoding='utf-8') as f:
            json.dump(session_data, f, ensure_ascii=False, indent=2)
            
        return session_id
        
    def load_session_state(self) -> Optional[Dict[str, Any]]:
        """最新のセッション状態を読み込み"""
        if not self.session_file.exists():
            return None
            
        with open(self.session_file, 'r', encoding='utf-8') as f:
            return json.load(f)
            
    def get_session_summary(self) -> str:
        """セッション状態のサマリーを生成"""
        state = self.load_session_state()
        if not state:
            return "セッション情報なし"
            
        session_info = state.get("state", {})
        timestamp = state.get("timestamp", "不明")
        
        summary = f"""
## 前回のセッション情報
- **日時**: {timestamp}
- **作業中の章**: 第{session_info.get('current_chapter', '?')}章
- **執筆済み文字数**: {session_info.get('written_chars', 0):,}文字
- **進捗率**: {session_info.get('progress_percent', 0):.1f}%
- **最後の作業**: {session_info.get('last_action', '不明')}

### 執筆状況
"""
        
        if 'section_status' in session_info:
            for section, status in session_info['section_status'].items():
                symbol = "✅" if status == "completed" else "📝" if status == "in_progress" else "⏳"
                summary += f"- {symbol} {section}\n"
                
        if 'next_steps' in session_info:
            summary += "\n### 次のステップ\n"
            for step in session_info['next_steps']:
                summary += f"- {step}\n"
                
        return summary
        
    def create_checkpoint(self, chapter_num: int, section_num: int, 
                         content: str, metadata: Dict[str, Any]) -> str:
        """執筆チェックポイントを作成"""
        checkpoint_id = f"ch{chapter_num:02d}_sec{section_num}_" + \
                       datetime.now().strftime("%Y%m%d_%H%M%S")
        
        checkpoint_data = {
            "checkpoint_id": checkpoint_id,
            "chapter": chapter_num,
            "section": section_num,
            "timestamp": datetime.now().isoformat(),
            "content_hash": hashlib.md5(content.encode()).hexdigest(),
            "content_length": len(content),
            "metadata": metadata
        }
        
        # チェックポイントファイルを保存
        checkpoint_file = self.checkpoint_dir / f"{checkpoint_id}.json"
        with open(checkpoint_file, 'w', encoding='utf-8') as f:
            json.dump(checkpoint_data, f, ensure_ascii=False, indent=2)
            
        # コンテンツも別ファイルで保存
        content_file = self.checkpoint_dir / f"{checkpoint_id}_content.md"
        with open(content_file, 'w', encoding='utf-8') as f:
            f.write(content)
            
        return checkpoint_id
        
    def list_checkpoints(self, chapter_num: Optional[int] = None) -> List[Dict]:
        """チェックポイントの一覧を取得"""
        checkpoints = []
        
        for file in self.checkpoint_dir.glob("ch*.json"):
            if file.name.endswith("_content.md"):
                continue
                
            with open(file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            if chapter_num is None or data['chapter'] == chapter_num:
                checkpoints.append(data)
                
        return sorted(checkpoints, key=lambda x: x['timestamp'], reverse=True)


class WritingProgressTracker:
    """執筆進捗の詳細追跡"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.progress_file = self.project_root / ".writing_progress.json"
        self.daily_log_dir = self.project_root / ".daily_logs"
        self.daily_log_dir.mkdir(exist_ok=True)
        
    def update_progress(self, chapter_num: int, section_info: Dict[str, Any]):
        """進捗情報を更新"""
        progress_data = self._load_progress()
        
        chapter_key = f"chapter_{chapter_num:02d}"
        if chapter_key not in progress_data:
            progress_data[chapter_key] = {
                "total_chars": 0,
                "sections": {},
                "last_updated": None,
                "status": "not_started"
            }
            
        chapter_data = progress_data[chapter_key]
        chapter_data["sections"][section_info['section_name']] = {
            "chars": section_info['chars'],
            "status": section_info['status'],
            "last_updated": datetime.now().isoformat()
        }
        
        # 章全体の文字数を再計算
        total_chars = sum(s['chars'] for s in chapter_data['sections'].values())
        chapter_data['total_chars'] = total_chars
        chapter_data['last_updated'] = datetime.now().isoformat()
        
        # ステータスを更新
        if all(s['status'] == 'completed' for s in chapter_data['sections'].values()):
            chapter_data['status'] = 'completed'
        elif any(s['status'] in ['in_progress', 'completed'] for s in chapter_data['sections'].values()):
            chapter_data['status'] = 'in_progress'
            
        self._save_progress(progress_data)
        self._update_daily_log(chapter_num, section_info)
        
    def get_chapter_progress(self, chapter_num: int) -> Dict[str, Any]:
        """特定の章の進捗情報を取得"""
        progress_data = self._load_progress()
        chapter_key = f"chapter_{chapter_num:02d}"
        return progress_data.get(chapter_key, {})
        
    def get_overall_progress(self) -> Dict[str, Any]:
        """全体の進捗サマリーを取得"""
        progress_data = self._load_progress()
        
        total_chapters = 11  # 0章から10章まで
        completed_chapters = sum(1 for ch in progress_data.values() 
                               if ch.get('status') == 'completed')
        in_progress_chapters = sum(1 for ch in progress_data.values() 
                                 if ch.get('status') == 'in_progress')
        
        total_chars = sum(ch.get('total_chars', 0) for ch in progress_data.values())
        target_chars = 200000  # 20万字
        
        return {
            "total_chapters": total_chapters,
            "completed_chapters": completed_chapters,
            "in_progress_chapters": in_progress_chapters,
            "not_started_chapters": total_chapters - completed_chapters - in_progress_chapters,
            "total_chars": total_chars,
            "target_chars": target_chars,
            "overall_progress_percent": (total_chars / target_chars) * 100,
            "chapters_progress_percent": (completed_chapters / total_chapters) * 100
        }
        
    def _load_progress(self) -> Dict[str, Any]:
        """進捗データを読み込み"""
        if not self.progress_file.exists():
            return {}
            
        with open(self.progress_file, 'r', encoding='utf-8') as f:
            return json.load(f)
            
    def _save_progress(self, data: Dict[str, Any]):
        """進捗データを保存"""
        with open(self.progress_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
    def _update_daily_log(self, chapter_num: int, section_info: Dict[str, Any]):
        """日次ログを更新"""
        today = datetime.now().strftime("%Y-%m-%d")
        log_file = self.daily_log_dir / f"log_{today}.json"
        
        if log_file.exists():
            with open(log_file, 'r', encoding='utf-8') as f:
                daily_data = json.load(f)
        else:
            daily_data = {
                "date": today,
                "activities": []
            }
            
        activity = {
            "timestamp": datetime.now().isoformat(),
            "chapter": chapter_num,
            "section": section_info['section_name'],
            "chars_written": section_info.get('chars_added', 0),
            "total_chars": section_info['chars'],
            "action": section_info.get('action', 'update')
        }
        
        daily_data['activities'].append(activity)
        
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(daily_data, f, ensure_ascii=False, indent=2)


class RestartHelper:
    """再開時の支援機能"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.session_manager = SessionManager(project_root)
        self.progress_tracker = WritingProgressTracker(project_root)
        
    def generate_restart_summary(self) -> str:
        """再開時のサマリーを生成"""
        summary = "# 執筆再開サマリー\n\n"
        
        # セッション情報
        summary += self.session_manager.get_session_summary()
        
        # 全体進捗
        overall = self.progress_tracker.get_overall_progress()
        summary += f"""
## 全体進捗
- **完成章数**: {overall['completed_chapters']}/{overall['total_chapters']}章
- **執筆中**: {overall['in_progress_chapters']}章
- **総文字数**: {overall['total_chars']:,}/{overall['target_chars']:,}文字
- **進捗率**: {overall['overall_progress_percent']:.1f}%
"""
        
        # 最近のチェックポイント
        recent_checkpoints = self.session_manager.list_checkpoints()[:5]
        if recent_checkpoints:
            summary += "\n## 最近のチェックポイント\n"
            for cp in recent_checkpoints:
                summary += f"- {cp['timestamp']}: 第{cp['chapter']}章 セクション{cp['section']} "
                summary += f"({cp['content_length']:,}文字)\n"
                
        return summary
        
    def get_next_action_commands(self) -> List[str]:
        """次のアクションのためのコマンドリストを生成"""
        state = self.session_manager.load_session_state()
        if not state:
            return ["# セッション情報がありません。新規に開始してください。"]
            
        session_info = state.get("state", {})
        chapter = session_info.get('current_chapter', 1)
        
        commands = [
            f"# 第{chapter}章の執筆を再開",
            f"python src/continue_writing.py --chapter {chapter}",
            "",
            "# または、特定のセクションから再開",
            f"python src/continue_writing.py --chapter {chapter} --section 3",
            "",
            "# 進捗状況の確認",
            "python src/show_progress.py",
            "",
            "# 最後のチェックポイントから復元",
            "python src/restore_checkpoint.py --latest"
        ]
        
        return commands


# 使用例
if __name__ == "__main__":
    # プロジェクトルートを指定
    project_root = "/Users/jrpj2010/vibe-coding/app/import/13_AI-Script-Creation-System/projects/ai_super_learning"
    
    # 再開ヘルパーを初期化
    helper = RestartHelper(project_root)
    
    # 再開サマリーを表示
    print(helper.generate_restart_summary())
    
    # 次のアクションを表示
    print("\n## 次のアクション")
    for cmd in helper.get_next_action_commands():
        print(cmd)