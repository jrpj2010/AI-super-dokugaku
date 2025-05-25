"""
UserInput自動展開システム - user_input_processor.py

UserInputフォルダーに投入された素材を自動的に解析し、
適切な場所に展開・整理するシステム
"""

import os
import shutil
import yaml
import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from datetime import datetime
import re
import hashlib


class UserInputProcessor:
    """UserInputフォルダーの素材を自動処理するクラス"""
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.user_input_dir = self.project_root / "UserInput"
        self.user_input_dir.mkdir(exist_ok=True)
        
        # 処理済みファイルの記録
        self.processed_log = self.user_input_dir / ".processed_log.json"
        self.processed_files = self._load_processed_log()
        
        # 展開先ディレクトリ
        self.outline_file = self.project_root / "outline.md"
        self.concepts_dir = self.project_root / "concepts"
        self.case_studies_dir = self.project_root / "case_studies"
        self.references_dir = self.project_root / "references"
        self.chapters_dir = self.project_root / "chapters"
        
        # ディレクトリ作成
        for dir_path in [self.concepts_dir, self.case_studies_dir, 
                        self.references_dir, self.chapters_dir]:
            dir_path.mkdir(exist_ok=True)
    
    def _load_processed_log(self) -> Dict:
        """処理済みファイルのログを読み込み"""
        if self.processed_log.exists():
            with open(self.processed_log, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {"processed": {}, "timestamp": None}
    
    def _save_processed_log(self):
        """処理済みファイルのログを保存"""
        self.processed_files["timestamp"] = datetime.now().isoformat()
        with open(self.processed_log, 'w', encoding='utf-8') as f:
            json.dump(self.processed_files, f, ensure_ascii=False, indent=2)
    
    def _get_file_hash(self, file_path: Path) -> str:
        """ファイルのハッシュ値を計算"""
        with open(file_path, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    
    def scan_and_process(self) -> Dict[str, List[str]]:
        """UserInputフォルダーをスキャンして新規ファイルを処理"""
        results = {
            "processed": [],
            "skipped": [],
            "errors": []
        }
        
        # サポートする拡張子
        supported_extensions = {
            '.txt', '.md', '.yaml', '.yml', '.json', 
            '.docx', '.pdf', '.csv', '.tsv'
        }
        
        # UserInputフォルダー内のファイルをスキャン
        for file_path in self.user_input_dir.iterdir():
            if file_path.is_file() and not file_path.name.startswith('.'):
                file_hash = self._get_file_hash(file_path)
                
                # 既に処理済みかチェック
                if file_path.name in self.processed_files.get("processed", {}):
                    if self.processed_files["processed"][file_path.name]["hash"] == file_hash:
                        results["skipped"].append(file_path.name)
                        continue
                
                # ファイルタイプによって処理を分岐
                try:
                    if file_path.suffix.lower() in supported_extensions:
                        self._process_file(file_path)
                        
                        # 処理済みとして記録
                        self.processed_files["processed"][file_path.name] = {
                            "hash": file_hash,
                            "processed_at": datetime.now().isoformat(),
                            "type": self._detect_file_type(file_path)
                        }
                        results["processed"].append(file_path.name)
                    else:
                        results["skipped"].append(f"{file_path.name} (未対応の形式)")
                        
                except Exception as e:
                    results["errors"].append(f"{file_path.name}: {str(e)}")
        
        # ログを保存
        self._save_processed_log()
        
        return results
    
    def _detect_file_type(self, file_path: Path) -> str:
        """ファイルの内容から種別を判定"""
        content = file_path.read_text(encoding='utf-8')
        content_lower = content.lower()
        
        # キーワードベースの判定
        if any(keyword in content_lower for keyword in ['概念', 'concept', 'definition', '定義']):
            return "concept"
        elif any(keyword in content_lower for keyword in ['事例', 'case', 'study', '企業', 'company']):
            return "case_study"
        elif any(keyword in content_lower for keyword in ['参考', 'reference', '文献', 'bibliography']):
            return "reference"
        elif any(keyword in content_lower for keyword in ['章', 'chapter', '節', 'section']):
            return "chapter_material"
        elif any(keyword in content_lower for keyword in ['目次', 'outline', '構成', 'structure']):
            return "outline_material"
        else:
            return "general"
    
    def _process_file(self, file_path: Path):
        """ファイルタイプに応じて適切に処理"""
        file_type = self._detect_file_type(file_path)
        
        if file_type == "concept":
            self._process_concept_file(file_path)
        elif file_type == "case_study":
            self._process_case_study_file(file_path)
        elif file_type == "reference":
            self._process_reference_file(file_path)
        elif file_type == "chapter_material":
            self._process_chapter_material(file_path)
        elif file_type == "outline_material":
            self._process_outline_material(file_path)
        else:
            self._process_general_file(file_path)
    
    def _process_concept_file(self, file_path: Path):
        """概念定義ファイルを処理"""
        content = file_path.read_text(encoding='utf-8')
        
        # 概念名を抽出または生成
        concept_name = self._extract_concept_name(content, file_path.stem)
        
        # 概念ファイルのテンプレートに変換
        if file_path.suffix in ['.yaml', '.yml']:
            # YAMLの場合はそのままコピー
            target_path = self.concepts_dir / f"{concept_name}.yaml"
            shutil.copy2(file_path, target_path)
        else:
            # テキストファイルの場合は構造化
            structured_content = self._structure_concept_content(content, concept_name)
            target_path = self.concepts_dir / f"{concept_name}.md"
            target_path.write_text(structured_content, encoding='utf-8')
    
    def _process_case_study_file(self, file_path: Path):
        """ケーススタディファイルを処理"""
        content = file_path.read_text(encoding='utf-8')
        
        # ケーススタディ情報を抽出
        if file_path.suffix in ['.yaml', '.yml']:
            target_path = self.case_studies_dir / file_path.name
            shutil.copy2(file_path, target_path)
        elif file_path.suffix == '.json':
            # JSONをYAMLに変換
            data = json.loads(content)
            target_path = self.case_studies_dir / f"{file_path.stem}.yaml"
            with open(target_path, 'w', encoding='utf-8') as f:
                yaml.dump(data, f, allow_unicode=True, default_flow_style=False)
        else:
            # テキストファイルからケーススタディ情報を抽出
            case_data = self._extract_case_study_info(content, file_path.stem)
            target_path = self.case_studies_dir / f"{case_data['id']}.yaml"
            with open(target_path, 'w', encoding='utf-8') as f:
                yaml.dump(case_data, f, allow_unicode=True, default_flow_style=False)
    
    def _process_reference_file(self, file_path: Path):
        """参考資料ファイルを処理"""
        # 参考資料ディレクトリにコピー
        target_path = self.references_dir / file_path.name
        shutil.copy2(file_path, target_path)
        
        # 参考資料インデックスを更新
        self._update_reference_index(file_path.name)
    
    def _process_chapter_material(self, file_path: Path):
        """章の素材ファイルを処理"""
        content = file_path.read_text(encoding='utf-8')
        
        # 章番号を推定
        chapter_num = self._extract_chapter_number(content, file_path.stem)
        
        # 素材ディレクトリに保存
        material_dir = self.chapters_dir / f"chapter_{chapter_num:02d}_materials"
        material_dir.mkdir(exist_ok=True)
        
        target_path = material_dir / file_path.name
        shutil.copy2(file_path, target_path)
        
        # メタデータを保存
        metadata = {
            "original_filename": file_path.name,
            "added_date": datetime.now().isoformat(),
            "content_summary": content[:500] + "..." if len(content) > 500 else content,
            "word_count": len(content)
        }
        
        metadata_path = material_dir / f"{file_path.stem}_metadata.json"
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, ensure_ascii=False, indent=2)
    
    def _process_outline_material(self, file_path: Path):
        """アウトライン素材を処理"""
        content = file_path.read_text(encoding='utf-8')
        
        # バックアップを作成
        backup_dir = self.project_root / "outline_backups"
        backup_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = backup_dir / f"outline_backup_{timestamp}.md"
        
        if self.outline_file.exists():
            shutil.copy2(self.outline_file, backup_path)
        
        # アウトライン更新の提案を生成
        suggestions_path = self.project_root / f"outline_suggestions_{timestamp}.md"
        suggestions = self._generate_outline_suggestions(content)
        suggestions_path.write_text(suggestions, encoding='utf-8')
        
        print(f"アウトライン更新の提案を生成しました: {suggestions_path}")
    
    def _process_general_file(self, file_path: Path):
        """一般的なファイルを処理"""
        # その他ディレクトリに保存
        misc_dir = self.project_root / "miscellaneous"
        misc_dir.mkdir(exist_ok=True)
        
        target_path = misc_dir / file_path.name
        shutil.copy2(file_path, target_path)
    
    def _extract_concept_name(self, content: str, default_name: str) -> str:
        """コンテンツから概念名を抽出"""
        # パターンマッチングで概念名を探す
        patterns = [
            r'概念名[:：]\s*(.+)',
            r'concept:\s*(.+)',
            r'#\s+(.+)',
            r'【(.+?)】'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, content)
            if match:
                return self._sanitize_filename(match.group(1).strip())
        
        return self._sanitize_filename(default_name)
    
    def _structure_concept_content(self, content: str, concept_name: str) -> str:
        """概念コンテンツを構造化"""
        return f"""# {concept_name}

概念名: {concept_name}
カテゴリ: 一般

## 定義
{content}

## 要点
- [要点1]
- [要点2]

## 事例
- [事例1]
- [事例2]

## 関連概念
- [関連概念1]
- [関連概念2]

## 実践のコツ
[実践のコツを記述]

## よくある間違い
[よくある間違いを記述]

---
*自動生成日: {datetime.now().strftime('%Y-%m-%d')}*
"""
    
    def _extract_case_study_info(self, content: str, default_id: str) -> Dict:
        """テキストからケーススタディ情報を抽出"""
        case_data = {
            "id": self._sanitize_filename(default_id),
            "title": f"{default_id}の事例",
            "company": "不明",
            "industry": "不明",
            "challenge": "",
            "solution": "",
            "verified_date": datetime.now().strftime('%Y-%m-%d')
        }
        
        # パターンマッチングで情報を抽出
        patterns = {
            "company": r'企業[:：]\s*(.+)',
            "industry": r'業界[:：]\s*(.+)',
            "challenge": r'課題[:：]\s*(.+?)(?=解決|$)',
            "solution": r'解決[:：]\s*(.+)'
        }
        
        for key, pattern in patterns.items():
            match = re.search(pattern, content, re.MULTILINE | re.DOTALL)
            if match:
                case_data[key] = match.group(1).strip()
        
        # タイトルを更新
        if case_data["company"] != "不明":
            case_data["title"] = f"{case_data['company']}の事例"
        
        return case_data
    
    def _extract_chapter_number(self, content: str, filename: str) -> int:
        """章番号を抽出または推定"""
        # ファイル名から
        num_match = re.search(r'(\d+)', filename)
        if num_match:
            return int(num_match.group(1))
        
        # コンテンツから
        patterns = [
            r'第(\d+)章',
            r'Chapter\s*(\d+)',
            r'章\s*(\d+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, content, re.IGNORECASE)
            if match:
                return int(match.group(1))
        
        # デフォルト
        return 0
    
    def _update_reference_index(self, filename: str):
        """参考資料インデックスを更新"""
        index_path = self.references_dir / "index.md"
        
        if index_path.exists():
            content = index_path.read_text(encoding='utf-8')
        else:
            content = "# 参考資料一覧\n\n"
        
        # 新しいエントリを追加
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M')
        new_entry = f"- [{filename}]({filename}) - 追加日: {timestamp}\n"
        
        if filename not in content:
            content += new_entry
            index_path.write_text(content, encoding='utf-8')
    
    def _generate_outline_suggestions(self, new_content: str) -> str:
        """アウトライン更新の提案を生成"""
        suggestions = f"""# アウトライン更新提案

生成日時: {datetime.now().strftime('%Y-%m-%d %H:%M')}

## 新規追加された内容

```
{new_content[:1000]}
{"..." if len(new_content) > 1000 else ""}
```

## 提案される変更

### 章構成への反映案

1. 既存の章に内容を統合
2. 新しい章を追加
3. セクションの再構成

### 具体的な提案

[ここに手動で具体的な提案を記述してください]

## アクション

1. この提案を確認
2. outline.mdを手動で更新
3. バージョン管理システムで変更を記録

---
*この提案は自動生成されました。実際の更新は手動で行ってください。*
"""
        return suggestions
    
    def _sanitize_filename(self, name: str) -> str:
        """ファイル名として使える形式に変換"""
        # 特殊文字を除去
        name = re.sub(r'[<>:"/\\|?*]', '', name)
        # スペースをアンダースコアに
        name = name.replace(' ', '_')
        # 長さ制限
        if len(name) > 50:
            name = name[:50]
        return name
    
    def get_status_report(self) -> str:
        """処理状況レポートを生成"""
        total_processed = len(self.processed_files.get("processed", {}))
        
        report = f"""# UserInput処理状況レポート

最終更新: {self.processed_files.get("timestamp", "未処理")}
処理済みファイル数: {total_processed}

## 処理済みファイル一覧
"""
        
        for filename, info in self.processed_files.get("processed", {}).items():
            report += f"- {filename}\n"
            report += f"  - タイプ: {info['type']}\n"
            report += f"  - 処理日時: {info['processed_at']}\n"
        
        return report


# 監視スクリプト
def watch_user_input(project_root: str, interval: int = 60):
    """UserInputフォルダーを定期的に監視"""
    import time
    
    processor = UserInputProcessor(project_root)
    print(f"UserInputフォルダーの監視を開始します: {processor.user_input_dir}")
    
    while True:
        try:
            results = processor.scan_and_process()
            
            if results["processed"]:
                print(f"\n新規ファイルを処理しました:")
                for file in results["processed"]:
                    print(f"  - {file}")
            
            if results["errors"]:
                print(f"\nエラーが発生しました:")
                for error in results["errors"]:
                    print(f"  - {error}")
            
            time.sleep(interval)
            
        except KeyboardInterrupt:
            print("\n監視を終了します")
            break
        except Exception as e:
            print(f"エラー: {e}")
            time.sleep(interval)


if __name__ == "__main__":
    # テスト実行
    import sys
    
    if len(sys.argv) > 1:
        project_root = sys.argv[1]
    else:
        project_root = "."
    
    processor = UserInputProcessor(project_root)
    results = processor.scan_and_process()
    
    print("処理結果:")
    print(f"処理済み: {results['processed']}")
    print(f"スキップ: {results['skipped']}")
    print(f"エラー: {results['errors']}")
    
    print("\n" + processor.get_status_report())