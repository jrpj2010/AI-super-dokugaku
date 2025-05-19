# ディレクトリ構成（2025-05-22 更新）

現在のプロジェクトの主要なディレクトリ構造は以下の通りです。
「SATO DEFAULT」ルールに基づき、「ライト・モノレポ」戦略を意識した構成を目指しています。

```
/
├── .git/                         # Gitリポジトリ管理
├── .github/                      # GitHub関連設定 (CI/CDワークフロー等)
├── .claude/                      # Claude AI関連設定
├── .cursor/                      # Cursorエディタ関連設定
├── .vscode/                      # VSCodeエディタ関連設定
├── app/                          # 主要Next.jsアプリケーション (例: gpt-image-generator)
│   ├── api/                      # APIエンドポイント
│   ├── components/               # Reactコンポーネント
│   ├── hooks/                    # カスタムReactフック
│   ├── lib/                      # ユーティリティ関数・ライブラリ
│   ├── styles/                   # スタイルシート
│   ├── favicon.ico               # ファビコン
│   ├── globals.css               # グローバルCSS
│   ├── layout.tsx                # ルートレイアウト
│   └── page.tsx                  # ルートページ
├── apps/                         # (推奨) Cloud Runサービス単位の複数アプリ格納用 (現状は空の可能性)
├── backend/                      # (現状) Pythonバックエンド等、その他サーバーサイドアプリケーション
├── docker/                       # (推奨) 共通DockerfileやDocker関連設定 (現状は空の可能性)
├── packages/                     # (推奨) 共有ライブラリ・UIキット等 (現状は空の可能性)
├── public/                       # Next.js等の静的ファイル (app/ 内のプロジェクトが利用)
├── sato_managed_contents/        # 佐藤様管理コンテンツ (ドキュメント、書籍資料、アーカイブ等)
│   ├── 『AI超独学法：TANREN 3Dメソッドで切り拓く、新時代の学びと成長戦略』/
│   ├── AI 伊藤羊一/
│   ├── AI森本千賀子/
│   ├── archives/                 # アーカイブファイル (zip等)
│   ├── documents_misc/           # その他ドキュメント類
│   ├── js/                       # (旧) ルートにあったjsファイル (AI超独学法関連)
│   ├── scripts/                  # (旧) ルートにあったスクリプト (AI超独学法関連)
│   ├── temp_html/                # 一時的なHTMLファイル
│   └── ... (その他多数のコンテンツ関連フォルダ)
├── youtube-search-app/           # 独立したYouTube検索アプリケーション
├── node_modules/                 # Node.js 依存パッケージ (各Next.jsプロジェクト配下にも存在)
├── .DS_Store                     # macOSシステムファイル (通常.gitignore対象)
├── .cursorindexingignore         # Cursorインデックス除外設定
├── .env                          # 環境変数ファイル (Git管理対象外)
├── .gitignore                    # Git管理除外設定
├── .gitmodules                   # Gitサブモジュール設定 (現在はサブモジュール解除済みの想定)
├── .next/                        # Next.jsビルド成果物 (app/ 配下のプロジェクトが生成)
├── .roo/                         # 不明な設定/作業ディレクトリ
├── .specstory/                   # 不明な設定/作業ディレクトリ (テスト関連の可能性)
├── .windsurfrules                # Windsurf設定ファイル
├── conversation_analysis_vX.Y.Z.zip # (移動済み) -> sato_managed_contents/archives/
├── create_book_structure.py      # (移動済み) -> sato_managed_contents/『AI超独学法...』/scripts/
├── create_book_structure.sh      # (移動済み) -> sato_managed_contents/『AI超独学法...』/scripts/
├── directorystructure.md         # このファイル
├── docker-compose.yml            # Docker Compose 設定ファイル
├── Dockerfile                    # ルートのDockerfile (特定のアプリ用の場合あり)
├── fix.md                        # (移動済み) -> sato_managed_contents/documents_misc/
├── fixed_head.html               # (移動済み) -> sato_managed_contents/temp_html/
├── index.html                    # (移動済み) -> sato_managed_contents/『AI超独学法...』/
├── nginx.conf                    # (移動済み) -> sato_managed_contents/archives/
├── old_modal_styles.txt          # (移動済み) -> sato_managed_contents/archives/
├── package.json                  # ルートのプロジェクト設定 (モノレポ管理ツール用など)
├── pnpm-lock.yaml                # (pnpm使用時) 依存関係ロックファイル
├── tsconfig.json                 # ルートのTypeScript設定
├── next-env.d.ts                 # (app/ 配下等) Next.js型定義
├── next.config.mjs               # (app/ 配下等) Next.js設定
├── postcss.config.mjs            # (app/ 配下等) PostCSS設定
└── technologystack.md            # 技術スタックドキュメント
```

### 主な配置ルール（Next.jsアプリケーション `app/` 内の場合）
- UIコンポーネント → `app/components/ui/`
- APIエンドポイント → `app/api/[endpoint]/route.ts` または `route.js`
- 共通処理 → `app/lib/utils/`
- API関連処理 → `app/lib/api/`

**補足：**
- `apps/`, `packages/`, `docker/` ディレクトリは、「SATO DEFAULT」ルールで推奨されているモノレポ構成の標準的なディレクトリです。現状のプロジェクトでこれらがまだ積極的に利用されていなくても、将来的な拡張性を見据えて記載しています。
- `sato_managed_contents/` は今回整理したコンテンツ管理用のディレクトリです。
- ルート直下の各種設定ファイル (`package.json`, `tsconfig.json` など) は、Turborepoのようなモノレポ管理ツールやプロジェクト全体の設定に関連するものです。
- `node_modules/` や `.next/` は、`app/` ディレクトリ直下や `youtube-search-app/` のような個別のNode.jsプロジェクト内にも存在します。ルートにあるものは、モノレポ管理ツールが利用するものである可能性があります。
