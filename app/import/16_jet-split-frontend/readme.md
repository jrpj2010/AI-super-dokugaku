# 使用要件定義書 (ユーザ要件)

## 1. 目的
1 時間超のセミナー動画から **章・チャプター単位のダイジェスト情報抽出** と
**無劣化動画分割** を、非エンジニアでもブラウザ操作だけで完結させる。

## 2. 対象ユーザー
- TANREN 社内の講師・マーケ担当・動画チーム
- 外部講師へも展開予定（Mac ユーザー想定）

## 3. 用語定義
| 用語 | 定義 |
|-----|-----|
| 章 (Sho) | 複数のチャプターを束ねる大テーマ。1章, 2章… |
| チャプター (Chapter) | 30–120 秒のサブテーマ。チャプター番号は章をまたいでも 1,2,3… とグローバル連番 |
| SRT | タイムコード付き字幕ファイル。UTF-8 |
| ジェットスプリット | 本システムの自動分割機能の呼称 |

## 4. 機能要件
1. **SRT アップロード** (UTF-8, 最大 5MB)
2. Gemini により章・チャプター抽出
   - 章番号 (sho)
   - グローバル連番チャプター番号 (chapter)
   - サブテーマ (title)
   - 開始タイムコード (start HH:MM:SS)
   - 終了タイムコード (end HH:MM:SS)
3. ブラウザで抽出結果を**表形式でプレビュー**
4. **Excel / CSV ダウンロード**
   - 列: `sho,chapter,title,start,end`
   - Excel は UTF-8-SIG、CSV は UTF-8 で文字化け対策
5. **Batch ZIP ダウンロード**
   - `jet_split.sh` (動画分割用シェルスクリプト)
   - `chapters.xlsx` (章・チャプター一覧 Excel)
   - `chapters.csv` (章・チャプター一覧 CSV)
6. `jet_split.sh` 実行 (ユーザーの Mac ローカル環境)
   - ユーザーが指定した入力動画ファイルに対し、`chapters.xlsx` または `chapters.csv` (実質的には `jet_split.sh` に埋め込まれた情報) に基づき無劣化分割
   - 分割された動画ファイル名は `{sho}_{chapter:03d}_{slugified_title}.mp4` (例: `1_001_はじめに.mp4`, `2_005_質疑応答.mp4`)
     - `chapter` は3桁ゼロ埋め
     - `slugified_title` はファイル名として安全な形式に変換されたタイトル
   - 分割完了メッセージ表示

## 5. 非機能要件
| 区分 | 要件 |
|-----|-----|
| 品質 | FFmpeg `-c copy` により画質劣化ゼロ |
| 性能 | 90 分・2 GB 動画を元に生成されたバッチスクリプトによる分割処理が、ユーザーのローカル環境で現実的な時間（目安として数分以内）で完了すること (※AI処理時間は除く) |
| 利便性 | ブラウザ操作数回で、SRTアップロードから分割用バッチファイル一式のダウンロードまで完了 |
| セキュリティ | 動画ファイルはローカルのみで処理しサーバーへ送信しない。SRTファイルは処理後サーバーに保存しない |
| 拡張性 | 章・チャプター情報を API で再利用可能な設計とする (将来的には) |
| 互換性 | 生成された Excel/CSV は macOS の Numbers、Microsoft Excel で文字化けなく開けること |

## 6. 運用フロー
1. ユーザーが何らかの方法 (例: Whisper) で動画の SRT ファイルを生成する。
2. Web UI (本システム) へ SRT ファイルをドラッグ＆ドロップまたはファイル選択でアップロードする。
3. ブラウザ上で、AI によって抽出された章・チャプターの一覧（プレビュー表）を確認する。
4. 必要に応じて「Excel ダウンロード」または「CSV ダウンロード」ボタンで章・チャプター一覧ファイルを取得し、内容を確認する。(現時点では一覧の直接編集・再アップロード機能はなし。修正が必要な場合はSRTを修正して再アップロード)
5. 「Batch ZIP ダウンロード」ボタンをクリックし、`jet_split_pack.zip` (仮称) を取得する。
6. ユーザーはローカル Mac 上で新規フォルダを作成し、そのフォルダに分割対象の動画ファイルと、ダウンロードした ZIP ファイルの中身 (`jet_split.sh`, `chapters.xlsx`, `chapters.csv`) を配置する。
7. ターミナルを開き、そのフォルダに移動して `chmod +x jet_split.sh` で実行権限を付与後、`./jet_split.sh 元動画ファイル名.mp4` を実行する。
8. 同フォルダ内に、指定された命名規則で動画ファイルが分割生成される。

## 7. 受入条件
- 仕様書通りのファイル名 (`{sho}_{chapter:03d}_{slugified_title}.mp4`) で 10 以上のチャプターが正確に分割されること。
- 生成された Excel, CSV ファイルが macOS の Numbers および Microsoft Excel で文字化けなく開けること。
- CLI に慣れていないユーザーでも、提供されるであろう README や簡単なガイドに従い、SRTアップロードから動画分割までの一連の操作を10分程度で完了できること。

--- END OF FILE 使用要件定義書.md ---

--- START OF FILE 技術要件定義書.md ---

# 技術要件定義書

## 1. システム構成
```
ブラウザ ──HTTP──> Flask API ──Gemini API (Structured Output)
                              └─Excel/CSV/Shell Script 生成 ──> ZIP Archive ──> ブラウザ
                                                                                   └─ユーザ Mac (ローカル FFmpeg で Shell Script 実行)
```

### コンポーネント概要
| コンポーネント | 技術 | 役割 |
|--------------|------|------|
| フロントエンド | HTML5, JavaScript (ES6), Fetch API | SRTファイルアップロード、章・チャプター表描画、ZIPファイルダウンロード |
| バックエンド | Python 3.12 + Flask | SRT受信 → Gemini API呼び出し (Structured Output) → 章・チャプターデータ処理 → Excel/CSV/Bashスクリプト生成 → ZIPアーカイブ化して返却 |
| AI モデル | Google Gemini 1.5 Pro (推奨) / 2.5 Pro | SRTから章・チャプター構造 (章番号、グローバル連番チャプター番号、タイトル、開始/終了時間) をJSON形式で抽出 |
| 分割スクリプト | Bash (生成される `jet_split.sh`) + FFmpeg 4.x (ユーザーローカル) | 動画の無劣化分割 (`-c copy`)、指定命名規則でのファイル保存 |
| データ処理 (Python) | pandas, openpyxl, python-slugify | GeminiからのJSONをDataFrame化、Excel/CSV出力、ファイル名用slug生成 |
| 保存領域 | メモリ / BytesIO (Python) | サーバー側にはSRTファイルや動画ファイルを永続保存しない設計 |

## 2. データモデル
### 2.1 Gemini API 出力期待値 (JSON Schema for Structured Output)
```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "sho":      {"type": "integer", "description": "章番号 (例: 1, 2)"},
      "chapter":  {"type": "integer", "description": "グローバル連番チャプター番号 (例: 1, 2, ..., 15)"},
      "title":    {"type": "string", "description": "チャプターのサブテーマ/タイトル"},
      "start":    {"type": "string", "pattern": "^[0-9]{2}:[0-9]{2}:[0-9]{2}$", "description": "開始タイムコード HH:MM:SS"},
      "end":      {"type": "string", "pattern": "^[0-9]{2}:[0-9]{2}:[0-9]{2}$", "description": "終了タイムコード HH:MM:SS"}
    },
    "required": ["sho", "chapter", "title", "start", "end"]
  }
}
```

### 2.2 Excel / CSV 列定義
`sho,chapter,title,start,end`
- `sho`: 章番号
- `chapter`: グローバル連番チャプター番号
- `title`: サブテーマ
- `start`: 開始タイムコード (HH:MM:SS)
- `end`: 終了タイムコード (HH:MM:SS)

## 3. API 設計
| メソッド | パス | 概要 | 入力 (Request) | 出力 (Response) | ステータスコード |
|---------|-----|-----|----------------|-----------------|----------------|
| POST | `/generate-batch` | SRTファイルを解析し、章・チャプター情報を抽出し、Excel/CSVファイルと動画分割用シェルスクリプトをZIPアーカイブして返す。 | `multipart/form-data` (`file`: アップロードされたSRTファイル) | `application/zip` (ファイル名例: `jet_split_pack.zip`) | 200 OK, 400 Bad Request, 500 Internal Server Error |

## 4. 処理詳細
1.  **SRTアップロードと受信 (Flask):**
    *   フロントエンドから `multipart/form-data` でSRTファイルを受信。
    *   ファイルサイズチェック (例: 5MB上限)。
    *   SRTファイルの内容を文字列として読み込む (UTF-8)。
2.  **Gemini API 呼び出し:**
    *   適切なプロンプト (SRT内容、出力形式の指示、章・チャプター抽出ロジックの指示を含む) と上記 2.1 のJSON Schema を `tools` パラメータに設定し、Gemini 1.5 Pro API (Structured Output) へ送信。
    *   Gemini から章・チャプター情報がJSON形式で返却される。
3.  **データ整形とファイル生成:**
    *   返却されたJSONをパースし、`pandas.DataFrame` に変換。
    *   DataFrame から `openpyxl` を使用して Excel ファイル (`chapters.xlsx`) をメモリ上に生成 (UTF-8-SIGエンコード)。
    *   DataFrame から `to_csv()` メソッドを使用して CSV ファイル (`chapters.csv`) をメモリ上に生成 (UTF-8エンコード)。
    *   `jet_split.sh` (Bashスクリプト) を動的に生成。
        *   スクリプト内で使用する入力動画ファイル名は引数 (`$1`) で受け取る。
        *   DataFrame の各行に基づき、`ffmpeg` コマンド列を生成。
        *   ファイル名 `{sho}_{chapter:03d}_{slug}.mp4` の `{slug}` 部分は、`python-slugify` を使用して各チャプターの `title` からファイル名として安全な文字列を生成する。
        *   `chapter` は3桁のゼロ埋め (`:03d`)。
4.  **ZIPアーカイブ化とレスポンス:**
    *   生成された `chapters.xlsx`, `chapters.csv`, `jet_split.sh` を `io.BytesIO` を使用してメモリ上でZIPアーカイブにまとめる。
    *   ZIPファイルを `application/zip` としてHTTPレスポンスで返す。`Content-Disposition` ヘッダーでダウンロードファイル名を指定。

### `jet_split.sh` 生成ロジック (Pythonテンプレート風)
```python
# (DataFrame df に sho, chapter, title, start, end が格納されている前提)
script_parts = [
    "#!/bin/bash",
    "set -euo pipefail", # エラー発生時にスクリプトを停止
    'INPUT_VIDEO="$1"',
    'if [ -z "$INPUT_VIDEO" ]; then echo "エラー: 動画ファイルを指定してください。"; echo "使用法: ./jet_split.sh <動画ファイルパス>"; exit 1; fi',
    'if [ ! -f "$INPUT_VIDEO" ]; then echo "エラー: 指定された動画ファイルが見つかりません: $INPUT_VIDEO"; exit 1; fi',
    'BASE_NAME=$(basename "${INPUT_VIDEO%.*}")', # 拡張子なしのファイル名
    'OUTPUT_DIR="." ', # 出力先はカレントディレクトリ
    # 'OUTPUT_DIR="${BASE_NAME}_split_videos"', # またはサブディレクトリ作成
    # 'mkdir -p "$OUTPUT_DIR"',
]

for index, row in df.iterrows():
    sho = row["sho"]
    chapter = f"{row['chapter']:03d}" # 3桁ゼロ埋め
    title_slug = slugify(row["title"], max_length=50, word_boundary=True, separator="_") # python-slugify
    if not title_slug: title_slug = "untitled" # slugが空になる場合

    output_filename = f"{sho}_{chapter}_{title_slug}.mp4"

    ffmpeg_command = (
        f'ffmpeg -y -i "$INPUT_VIDEO" '
        f'-ss {row["start"]} -to {row["end"]} '
        f'-c copy -avoid_negative_ts 1 ' # -c copy で無劣化、avoid_negative_tsでタイムスタンプ問題を避ける
        f'"$OUTPUT_DIR/{output_filename}"'
    )
    script_parts.append(ffmpeg_command)

script_parts.append('echo "✅ 動画分割が正常に完了しました。"')
# script_content = "\n".join(script_parts)
```

## 5. セキュリティ / エラー処理
| 項目 | 内容 |
|------|------|
| 認証・認可 | 想定: 社内VPN経由でのアクセス、または将来的にCloud RunならIAP、Basic認証などを検討。現時点ではAPIキーはサーバーサイドで管理。 |
| 入力バリデーション | SRTファイルサイズ上限 (例: 5MB)、SRTファイル形式の簡易チェック (必須ではないが望ましい)。Geminiからのレスポンスに対するJSON Schema ValidationはGemini側(Structured Output)で行う。 |
| 例外処理 | Gemini APIタイムアウト、APIキーエラー、不正なSRT内容によるGemini処理エラー、生成JSONの構造不正 (Structured Outputでほぼ回避されるが念のため) など。適切なHTTPステータスコード (400, 500, 503など) とエラーメッセージをフロントエンドに返す。 |
| ログ | gunicornのアクセスログ、アプリケーションログ (エラー発生時など) を標準出力。Cloud Run環境ではCloud Loggingに自動集約。個人情報（SRT内容そのもの）のロギングは避ける。 |
| 依存ライブラリ | 定期的な脆弱性スキャン (例: `pip-audit`, GitHub Dependabot)。 |

## 6. 環境
-   **実行環境 (ユーザー):** macOS 14 (Apple Silicon / Intel 両対応想定)。ローカルに FFmpeg 4.x 以上がインストール済みであること。
-   **サーバーサイド (開発/本番):**
    -   Python 3.12.3+
    -   Flask
    -   gunicorn (本番時)
    -   Google Generative AI Python SDK 0.5+
    -   pandas, openpyxl, python-slugify
-   **AIモデル:** Google Gemini 1.5 Pro (推奨) または 2.5 Pro。APIキーが必要。

## 7. デプロイ
-   **開発環境:** `python app.py` (Flask組み込みサーバー) または `gunicorn app:app` でローカル実行。
-   **本番環境:** Cloud Run コンテナ (Dockerfileを用意し、gunicornで起動)。
    -   推奨リソース: CPU 1, メモリ 512MB (SRTサイズや同時アクセス数により調整)。
    -   環境変数で `GOOGLE_API_KEY` を設定。
-   **CI/CD (推奨):** GitHub Actions を利用。
    1.  Push/PR時にテスト実行 (pytestなど)。
    2.  mainブランチへのマージをトリガーにコンテナイメージをビルドし、Artifact Registry にプッシュ。
    3.  Artifact Registry の新しいイメージを Cloud Run にデプロイ。

## 8. 拡張方針
-   **Google認証 + Google Drive連携:** ユーザー認証を導入し、Google Drive上のSRTファイルを直接読み込めるようにする。
-   **音声トラック指定オプション:** `-map 0:a:0` のように、多言語音声トラックを持つ動画の場合に、どの音声トラックを対象にするかユーザーが選択できるようにする (UIと `jet_split.sh` の変更が必要)。
-   **チャプターごとのタイトルカード自動生成:** FFmpegの `drawtext` フィルタや、画像オーバーレイ機能を利用し、各分割動画の冒頭にタイトルカードを挿入するオプション。
-   **編集機能:** Web UI上でGeminiが抽出した章・チャプター情報を編集 (タイムコード修正、タイトル変更、追加、削除) し、それを反映したExcel/CSV/Batchを再生成する機能。
-   **動画プレビュー連携:** 元動画をブラウザで表示し、抽出されたチャプターのタイムコードをクリックすると該当箇所を再生する機能 (サーバー負荷に注意)。

--- END OF FILE 技術要件定義書.md ---

--- START OF FILE 作業工程管理書.md ---

# 作業工程管理書 (To-Do リスト)
*更新日: 2025-06-03* (仮)

| ID | タスク | 担当 | 開始 | 期限 | 状態 | 依存 | 備考 |
|----|--------|------|------|------|------|------|------|
| T01 | 要件定義最終確認・FIX | 勝さん, 美佳 | 2025-06-03 | 2025-06-04 | 完了 | - | 本ドキュメント群作成 |
| T02 | Flask バックエンド プロトタイプ作成 (SRT受信、ZIP返却の骨子) | 美佳 | 2025-06-05 | 2025-06-07 | 🔲 | T01 |  |
| T03 | Gemini API連携実装 (Structured Output, スキーマ定義) | 美佳 | 2025-06-06 | 2025-06-10 | 🔲 | T01, T02 | 章・チャプター抽出ロジック含む |
| T04 | Excel/CSV生成ロジック実装 (pandas, openpyxl) | 美佳 | 2025-06-07 | 2025-06-11 | 🔲 | T03 | UTF-8-SIG, UTF-8対応 |
| T05 | `jet_split.sh` 生成ロジック実装 (python-slugify含む) | 美佳 | 2025-06-08 | 2025-06-12 | 🔲 | T03 | ファイル名規則、ゼロ埋め |
| T06 | フロントエンド UI開発 (HTML, JS, Fetch API) | デザイン担当, 美佳 | 2025-06-07 | 2025-06-13 | 🔲 | T01 | SRTアップロード、表プレビュー、DLボタン |
| T07 | バックエンドとフロントエンド結合・テスト | 美佳 | 2025-06-13 | 2025-06-17 | 🔲 | T05, T06 | E2Eでの動作確認 |
| T08 | エラー処理・入力バリデーション実装 | 美佳 | 2025-06-14 | 2025-06-18 | 🔲 | T07 |  |
| T09 | 単体テスト・結合テスト (QAチームと連携) | QA, 美佳 | 2025-06-18 | 2025-06-21 | 🔲 | T08 |  |
| T10 | 社内ユーザーテスト準備・実施 | 勝さん | 2025-06-24 | 2025-06-26 | 🔲 | T09 | テストケース、フィードバック収集 |
| T11 | Dockerfile作成、Cloud Runデプロイ準備 | DevOps, 美佳 | 2025-06-20 | 2025-06-25 | 🔲 | T09 |  |
| T12 | ユーザードキュメント作成 (README, 簡単な使い方ガイド) | 美佳 | 2025-06-25 | 2025-06-28 | 🔲 | T10 |  |
| T13 | Cloud Run 本番デプロイ | DevOps | 2025-06-28 | 2025-06-28 | 🔲 | T10, T11 |  |
| T14 | リリース・社内アナウンス | 勝さん | 2025-07-01 | 2025-07-01 | 🔲 | T13 |  |

--- END OF FILE 作業工程管理書.md ---

--- START OF FILE README.md ---

# ジェットスプリッター (Jet Splitter)

長尺セミナー動画などのSRT字幕ファイルをアップロードするだけで、AI (Google Gemini) が内容を解析し、章・チャプター構造を自動抽出。抽出結果はブラウザで確認でき、Excel/CSVファイルおよびMacで実行可能な動画無劣化分割用シェルスクリプト (`jet_split.sh`) を一括でダウンロードできるWebアプリケーションです。

ユーザーは動画ファイル自体をサーバーにアップロードする必要がなく、ローカル環境でシェルスクリプトを実行するだけで、指定された命名規則 (`{章番号}_{チャプター連番:03d}_{タイトル}.mp4`) に従って高速かつ無劣化で動画を分割できます。

## 特徴

-   **AIによる自動チャプター抽出:** Google Gemini 1.5 Pro/2.5 Pro の Structured Output 機能を利用し、SRT字幕から章・チャプターのタイムコード、タイトルを高い精度で抽出。
-   **シンプルなWeb UI:** ブラウザ上でSRTファイルをアップロードし、抽出結果を表で確認、ワンクリックで必要なファイル群をダウンロード。
-   **Excel/CSV出力:** 抽出された章・チャプター一覧をExcel (`.xlsx`) およびCSV (`.csv`) 形式でダウンロード可能。内容確認や別途資料としての利用が容易です。
-   **無劣化・高速動画分割:** 生成されるシェルスクリプトは、ユーザーのローカルMac環境のFFmpegを使用し、`-c copy` オプションにより動画を再エンコードせずに分割するため、画質劣化がなく高速です。
-   **セキュリティ配慮:** 動画ファイルはサーバーに送信されません。SRTファイルも処理後にサーバーには保存されません。
-   **Macユーザーフレンドリー:** 生成されるシェルスクリプトはMacのターミナルで簡単に実行できるよう設計されています。

## システム構成図

```
ブラウザ ──HTTP──> Flask API ──Gemini API (Structured Output)
                              └─Excel/CSV/Shell Script 生成 ──> ZIP Archive ──> ブラウザ
                                                                                   └─ユーザ Mac (ローカル FFmpeg で Shell Script 実行)
```

## 主な機能

1.  **SRTファイルアップロード:** Web UIからSRTファイルをアップロード。
2.  **章・チャプター自動抽出:** AIがSRT内容を解析し、章番号、グローバル連番チャプター番号、タイトル、開始/終了タイムコードを抽出。
3.  **プレビュー表示:** 抽出結果をブラウザ上のテーブルで表示。
4.  **データダウンロード:**
    *   章・チャプター一覧 (Excel形式)
    *   章・チャプター一覧 (CSV形式)
    *   動画分割用シェルスクリプト (`jet_split.sh`)
    *   上記3点をまとめたZIPファイル
5.  **ローカルでの動画分割:** ダウンロードしたシェルスクリプトをMacのターミナルで実行し、元動画を無劣化分割。

## 使い方 (ユーザー向け)

1.  **事前準備:**
    *   分割したい元動画ファイル (`.mp4` などFFmpegが扱える形式)。
    *   元動画に対応するSRT字幕ファイル (`.srt`)。
    *   MacにFFmpegがインストールされていること。
        ```bash
        # Homebrewでインストールする場合
        brew install ffmpeg
        ```
2.  **Webアプリケーションを開き、SRTファイルをアップロードします。**
3.  **抽出結果の確認:** ブラウザに表示される章・チャプターの表を確認します。
4.  **ZIPファイルダウンロード:** 「Batch ZIPダウンロード」ボタン（または類似のボタン）をクリックし、`jet_split_pack.zip` (仮称) をダウンロードします。
5.  **ローカルでの準備:**
    *   Mac上で新規フォルダを作成します。
    *   作成したフォルダに、分割対象の**元動画ファイル**をコピーまたは移動します。
    *   ダウンロードした **ZIPファイルの中身** (`jet_split.sh`, `chapters.xlsx`, `chapters.csv`) を同じフォルダに展開・配置します。
6.  **シェルスクリプトの実行:**
    *   ターミナルを開き、`cd` コマンドで上記5で作成したフォルダに移動します。
    *   シェルスクリプトに実行権限を付与します。
        ```bash
        chmod +x jet_split.sh
        ```
    *   シェルスクリプトを実行します。引数として元動画ファイル名を指定します。
        ```bash
        ./jet_split.sh あなたの動画ファイル名.mp4
        ```
        例: `./jet_split.sh seminar_video.mp4`
7.  **分割完了:** 同じフォルダ内に、`{章番号}_{チャプター連番:03d}_{タイトルスラグ}.mp4` という形式のファイル名で動画が分割生成されます。

## 開発者向けセットアップ (ローカル実行)

### 前提条件

-   Python 3.12+
-   Flask
-   Google Generative AI Python SDK (`google-generativeai`)
-   pandas, openpyxl, python-slugify
-   FFmpeg (ローカルにインストール済みであること)
-   Google Gemini APIキー

### セットアップ手順

1.  **リポジトリをクローンします (存在する場合)。**
2.  **Python仮想環境を作成し、アクティベートします。**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```
3.  **必要なライブラリをインストールします。**
    ```bash
    pip install Flask google-generativeai pandas openpyxl python-slugify gunicorn
    ```
4.  **環境変数を設定します。**
    プロジェクトルートに `.env` ファイルを作成し、Gemini APIキーを記述します。
    ```
    GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
    ```
5.  **Flaskアプリケーションを実行します。**
    ```bash
    python app.py
    # または gunicorn で実行する場合
    # gunicorn --bind 0.0.0.0:8080 app:app
    ```
6.  ブラウザで `http://localhost:5000` (またはgunicornで指定したポート) にアクセスします。

## 技術スタック

-   **フロントエンド:** HTML5, JavaScript (ES6), Fetch API
-   **バックエンド:** Python 3.12, Flask
-   **AIモデル:** Google Gemini 1.5 Pro / 2.5 Pro (Structured Output)
-   **動画処理:** FFmpeg (ユーザーローカル)
-   **データ処理:** pandas, openpyxl, python-slugify
-   **デプロイ (推奨):** Docker, Cloud Run, gunicorn

## 今後の拡張方針

-   Google認証連携とGoogle DriveからのSRT直接読み込み
-   多言語音声トラック選択オプション
-   チャプターごとのタイトルカード自動生成 (FFmpeg drawtext)
-   Web UI上での抽出結果編集機能と再生成
-   動画プレビューとの連携
