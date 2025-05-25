#!/usr/bin/env python3
"""
執筆継続スクリプト
Claudeの制限で中断した執筆を再開するためのスクリプト
"""

import argparse
import json
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, Any, Optional

# プロジェクトルートをPythonパスに追加
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.session_manager import SessionManager, WritingProgressTracker, RestartHelper
from src.business_book_manager import BusinessBookManager
from src.outline_updater import OutlineUpdater


class WritingContinuer:
    """執筆継続のメインクラス"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.session_manager = SessionManager(project_root)
        self.progress_tracker = WritingProgressTracker(project_root)
        self.book_manager = BusinessBookManager(project_root)
        self.restart_helper = RestartHelper(project_root)
        
    def continue_chapter(self, chapter_num: Optional[int] = None, 
                        section_num: Optional[int] = None) -> Dict[str, Any]:
        """章の執筆を継続"""
        
        # セッション状態を読み込み
        session_state = self.session_manager.load_session_state()
        
        if not session_state and chapter_num is None:
            return {
                "status": "error",
                "message": "セッション情報がなく、章番号も指定されていません"
            }
            
        # 章番号の決定
        if chapter_num is None:
            chapter_num = session_state['state'].get('current_chapter', 1)
            
        # 章の進捗情報を取得
        chapter_progress = self.progress_tracker.get_chapter_progress(chapter_num)
        
        # 次に執筆するセクションを決定
        if section_num is None:
            section_num = self._find_next_section(chapter_progress)
            
        # セッション状態を更新
        new_state = {
            "current_chapter": chapter_num,
            "current_section": section_num,
            "last_action": f"第{chapter_num}章セクション{section_num}の執筆再開",
            "timestamp": datetime.now().isoformat(),
            "project_type": "business_book",
            "chapter_progress": chapter_progress
        }
        
        self.session_manager.save_session_state(new_state)
        
        # 執筆コンテキストを準備
        context = self._prepare_writing_context(chapter_num, section_num)
        
        return {
            "status": "ready",
            "chapter": chapter_num,
            "section": section_num,
            "context": context,
            "next_prompt": self._generate_writing_prompt(chapter_num, section_num, context)
        }
        
    def _find_next_section(self, chapter_progress: Dict[str, Any]) -> int:
        """次に執筆すべきセクションを特定"""
        if not chapter_progress or 'sections' not in chapter_progress:
            return 1
            
        sections = chapter_progress['sections']
        
        # 未完成のセクションを探す
        for i in range(1, 7):  # 最大6セクションを想定
            section_key = f"section_{i}"
            if section_key not in sections or sections[section_key]['status'] != 'completed':
                return i
                
        return 1  # デフォルト
        
    def _prepare_writing_context(self, chapter_num: int, section_num: int) -> Dict[str, Any]:
        """執筆用のコンテキストを準備"""
        # 章の設定を読み込み
        chapter_context = self.book_manager.get_chapter_context(chapter_num)
        
        # 既存のコンテンツを読み込み
        chapter_file = self.project_root / f"chapters/chapter_{chapter_num:02d}.md"
        existing_content = ""
        if chapter_file.exists():
            with open(chapter_file, 'r', encoding='utf-8') as f:
                existing_content = f.read()
                
        # UserInputからの素材を確認
        user_input_dir = self.project_root.parent.parent / "UserInput" / \
                        "『AI超独学法：TANREN 3Dメソッドで切り拓く、新時代の学びと成長戦略』" / \
                        f"{chapter_num:02d}_第{chapter_num}章*"
        
        source_materials = []
        for dir_path in self.project_root.parent.parent.glob(f"UserInput/*/{chapter_num:02d}_第{chapter_num}章*"):
            if dir_path.is_dir():
                for file in dir_path.glob("*.md"):
                    with open(file, 'r', encoding='utf-8') as f:
                        source_materials.append({
                            "file": file.name,
                            "content": f.read()[:1000] + "..."  # 最初の1000文字
                        })
                        
        context = {
            "chapter_num": chapter_num,
            "section_num": section_num,
            "chapter_title": chapter_context.get('title', ''),
            "chapter_overview": chapter_context.get('overview', ''),
            "existing_content": existing_content,
            "existing_chars": len(existing_content),
            "target_chars": 20000,
            "remaining_chars": 20000 - len(existing_content),
            "source_materials": source_materials,
            "writing_style": {
                "tone": "親しみやすく実践的",
                "perspective": "実体験に基づく一人称",
                "examples": "具体的な事例を多用",
                "ai_integration": "AIとの対話例を含める"
            }
        }
        
        return context
        
    def _generate_writing_prompt(self, chapter_num: int, section_num: int, 
                               context: Dict[str, Any]) -> str:
        """執筆用のプロンプトを生成"""
        prompt = f"""
## 執筆再開の準備が整いました

### 現在の状況
- **章**: 第{chapter_num}章「{context['chapter_title']}」
- **セクション**: {section_num}
- **既存文字数**: {context['existing_chars']:,}文字
- **目標文字数**: {context['target_chars']:,}文字
- **残り文字数**: {context['remaining_chars']:,}文字

### 執筆ガイドライン
1. 佐藤勝彦氏の実体験を交えた一人称で執筆
2. AIとの具体的な対話例（プロンプト例）を含める
3. 読者が実践しやすい具体的なステップを示す
4. TANREN 3Dメソッドの考え方を自然に組み込む

### 次のアクション
以下のコマンドで執筆を開始してください：

```python
# セクション{section_num}の執筆を開始
from src.chapter_writer import ChapterWriter

writer = ChapterWriter(project_root)
writer.write_section(
    chapter_num={chapter_num},
    section_num={section_num},
    target_chars=5000  # 1セクション約5000文字
)
```

または、手動で執筆する場合は、上記のコンテキストを参考に執筆してください。
"""
        
        return prompt
        
    def save_checkpoint(self, chapter_num: int, section_num: int, 
                       content: str, metadata: Optional[Dict] = None):
        """執筆内容のチェックポイントを保存"""
        if metadata is None:
            metadata = {}
            
        metadata.update({
            "action": "manual_checkpoint",
            "chars": len(content),
            "timestamp": datetime.now().isoformat()
        })
        
        checkpoint_id = self.session_manager.create_checkpoint(
            chapter_num, section_num, content, metadata
        )
        
        # 進捗を更新
        self.progress_tracker.update_progress(chapter_num, {
            "section_name": f"section_{section_num}",
            "chars": len(content),
            "status": "in_progress",
            "chars_added": metadata.get('chars_added', 0)
        })
        
        return checkpoint_id
        
    def show_status(self) -> str:
        """現在の執筆状況を表示"""
        return self.restart_helper.generate_restart_summary()


def main():
    """メイン関数"""
    parser = argparse.ArgumentParser(description='執筆を継続する')
    parser.add_argument('--project', type=str, 
                       default='/Users/jrpj2010/vibe-coding/app/import/13_AI-Script-Creation-System/projects/ai_super_learning',
                       help='プロジェクトルートパス')
    parser.add_argument('--chapter', type=int, help='章番号')
    parser.add_argument('--section', type=int, help='セクション番号')
    parser.add_argument('--status', action='store_true', help='現在の状況を表示')
    parser.add_argument('--checkpoint', action='store_true', help='チェックポイントを作成')
    parser.add_argument('--content', type=str, help='チェックポイント用のコンテンツファイル')
    
    args = parser.parse_args()
    
    continuer = WritingContinuer(args.project)
    
    if args.status:
        print(continuer.show_status())
        return
        
    if args.checkpoint and args.content:
        # チェックポイントの作成
        with open(args.content, 'r', encoding='utf-8') as f:
            content = f.read()
            
        checkpoint_id = continuer.save_checkpoint(
            args.chapter or 1, 
            args.section or 1, 
            content
        )
        print(f"チェックポイントを作成しました: {checkpoint_id}")
        return
        
    # 執筆を継続
    result = continuer.continue_chapter(args.chapter, args.section)
    
    if result['status'] == 'ready':
        print(result['next_prompt'])
    else:
        print(f"エラー: {result['message']}")


if __name__ == "__main__":
    main()