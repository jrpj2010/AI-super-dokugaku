"""
バージョン管理システム
plot.md（ビジネス書籍ではoutline.md）のバージョン管理と差分記録を行う
"""

import hashlib
import json
import shutil
from datetime import datetime
from difflib import unified_diff
from pathlib import Path
from typing import Dict, List, Optional, Tuple


class VersionManager:
    """ドキュメントのバージョン管理と差分記録を行うクラス"""
    
    def __init__(self, project_root: Path, target_file: str = "plot.md"):
        """
        Args:
            project_root: プロジェクトのルートディレクトリ
            target_file: バージョン管理対象のファイル名（plot.mdまたはoutline.md）
        """
        self.project_root = Path(project_root)
        self.target_file = target_file
        self.current_file = self.project_root / target_file
        self.version_dir = self.project_root / "versions"
        self.version_dir.mkdir(exist_ok=True)
        
        # メタデータファイル
        self.metadata_file = self.version_dir / "version_metadata.json"
        self.metadata = self._load_metadata()
        
    def _load_metadata(self) -> Dict:
        """バージョンメタデータを読み込む"""
        if self.metadata_file.exists():
            with open(self.metadata_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {"versions": [], "current_version": None}
    
    def _save_metadata(self):
        """バージョンメタデータを保存"""
        with open(self.metadata_file, 'w', encoding='utf-8') as f:
            json.dump(self.metadata, f, ensure_ascii=False, indent=2)
    
    def _calculate_hash(self, file_path: Path) -> str:
        """ファイルのハッシュ値を計算"""
        with open(file_path, 'rb') as f:
            return hashlib.sha256(f.read()).hexdigest()
    
    def save_version(self, reason: str, author: str = "system") -> Dict:
        """
        現在のファイルをバージョンとして保存
        
        Args:
            reason: バージョン保存の理由（例：「第3章執筆完了」）
            author: 変更者名
            
        Returns:
            バージョン情報の辞書
        """
        if not self.current_file.exists():
            raise FileNotFoundError(f"{self.target_file} が見つかりません")
        
        # タイムスタンプ生成
        timestamp = datetime.now()
        version_id = timestamp.strftime("%Y%m%d_%H%M%S")
        
        # バージョンファイル名
        version_filename = f"{self.target_file.stem}_v{version_id}{self.current_file.suffix}"
        version_path = self.version_dir / version_filename
        
        # ファイルをコピー
        shutil.copy2(self.current_file, version_path)
        
        # バージョン情報を作成
        version_info = {
            "version_id": version_id,
            "timestamp": timestamp.isoformat(),
            "filename": version_filename,
            "reason": reason,
            "author": author,
            "hash": self._calculate_hash(version_path),
            "size": version_path.stat().st_size,
            "parent_version": self.metadata.get("current_version")
        }
        
        # 差分を計算（親バージョンがある場合）
        if version_info["parent_version"]:
            parent_info = self._get_version_info(version_info["parent_version"])
            if parent_info:
                diff_filename = f"diff_{version_info['parent_version']}_to_{version_id}.txt"
                diff_path = self.version_dir / diff_filename
                self._create_diff(
                    self.version_dir / parent_info["filename"],
                    version_path,
                    diff_path
                )
                version_info["diff_file"] = diff_filename
        
        # メタデータを更新
        self.metadata["versions"].append(version_info)
        self.metadata["current_version"] = version_id
        self._save_metadata()
        
        return version_info
    
    def _get_version_info(self, version_id: str) -> Optional[Dict]:
        """指定されたバージョンIDの情報を取得"""
        for version in self.metadata["versions"]:
            if version["version_id"] == version_id:
                return version
        return None
    
    def _create_diff(self, old_file: Path, new_file: Path, diff_file: Path):
        """2つのファイル間の差分を作成"""
        with open(old_file, 'r', encoding='utf-8') as f:
            old_lines = f.readlines()
        with open(new_file, 'r', encoding='utf-8') as f:
            new_lines = f.readlines()
        
        diff = unified_diff(
            old_lines,
            new_lines,
            fromfile=old_file.name,
            tofile=new_file.name,
            lineterm=''
        )
        
        with open(diff_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(diff))
    
    def get_version_history(self) -> List[Dict]:
        """バージョン履歴を取得"""
        return self.metadata["versions"]
    
    def get_diff(self, version1_id: str, version2_id: str) -> str:
        """2つのバージョン間の差分を取得"""
        v1_info = self._get_version_info(version1_id)
        v2_info = self._get_version_info(version2_id)
        
        if not v1_info or not v2_info:
            raise ValueError("指定されたバージョンが見つかりません")
        
        v1_path = self.version_dir / v1_info["filename"]
        v2_path = self.version_dir / v2_info["filename"]
        
        with open(v1_path, 'r', encoding='utf-8') as f:
            v1_lines = f.readlines()
        with open(v2_path, 'r', encoding='utf-8') as f:
            v2_lines = f.readlines()
        
        diff = unified_diff(
            v1_lines,
            v2_lines,
            fromfile=f"{v1_info['filename']} ({version1_id})",
            tofile=f"{v2_info['filename']} ({version2_id})",
            lineterm=''
        )
        
        return '\n'.join(diff)
    
    def restore_version(self, version_id: str) -> bool:
        """指定されたバージョンを現在のファイルとして復元"""
        version_info = self._get_version_info(version_id)
        if not version_info:
            return False
        
        version_path = self.version_dir / version_info["filename"]
        
        # 現在のファイルをバックアップ
        if self.current_file.exists():
            self.save_version(f"復元前のバックアップ（{version_id}に復元）", "system")
        
        # バージョンファイルを現在のファイルにコピー
        shutil.copy2(version_path, self.current_file)
        
        return True
    
    def get_changes_summary(self, version_id: str) -> Dict:
        """指定バージョンの変更サマリーを取得"""
        version_info = self._get_version_info(version_id)
        if not version_info:
            return {}
        
        summary = {
            "version_id": version_id,
            "timestamp": version_info["timestamp"],
            "reason": version_info["reason"],
            "author": version_info["author"],
            "size_change": 0,
            "lines_added": 0,
            "lines_removed": 0
        }
        
        # 親バージョンとの比較
        if version_info.get("parent_version"):
            parent_info = self._get_version_info(version_info["parent_version"])
            if parent_info:
                summary["size_change"] = version_info["size"] - parent_info["size"]
                
                # 差分ファイルから行数を計算
                if version_info.get("diff_file"):
                    diff_path = self.version_dir / version_info["diff_file"]
                    if diff_path.exists():
                        with open(diff_path, 'r', encoding='utf-8') as f:
                            for line in f:
                                if line.startswith('+') and not line.startswith('+++'):
                                    summary["lines_added"] += 1
                                elif line.startswith('-') and not line.startswith('---'):
                                    summary["lines_removed"] += 1
        
        return summary
    
    def auto_save_checkpoint(self, checkpoint_name: str):
        """自動チェックポイント保存（章の執筆完了時など）"""
        return self.save_version(f"自動保存: {checkpoint_name}", "auto-save")


class BusinessBookVersionManager(VersionManager):
    """ビジネス書籍用のバージョン管理（outline.md用）"""
    
    def __init__(self, project_root: Path):
        super().__init__(project_root, "outline.md")
    
    def save_chapter_completion(self, chapter_number: int, chapter_title: str):
        """章の執筆完了時の自動保存"""
        return self.save_version(
            f"第{chapter_number}章「{chapter_title}」執筆完了",
            "chapter-generator"
        )
    
    def save_structure_update(self, update_description: str):
        """構成変更時の保存"""
        return self.save_version(
            f"構成変更: {update_description}",
            "structure-editor"
        )
    
    def get_chapter_progress(self) -> Dict[int, bool]:
        """各章の執筆完了状況を取得"""
        progress = {}
        for version in self.get_version_history():
            if "章" in version["reason"] and "執筆完了" in version["reason"]:
                # 章番号を抽出
                import re
                match = re.search(r'第(\d+)章', version["reason"])
                if match:
                    chapter_num = int(match.group(1))
                    progress[chapter_num] = True
        
        return progress