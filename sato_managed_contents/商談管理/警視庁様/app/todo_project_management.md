# To-Do工程管理表：会話分析＆フィードバックHTML生成アプリケーション (MVP)

## フェーズ1: 基本設計と基盤構築 (期間: 約1週間)

| No. | タスク名                             | 担当   | 期限     | ステータス | 備考                                          |
|-----|--------------------------------------|--------|----------|----------|-----------------------------------------------|
| 1.1 | 要件定義の再確認と詳細化             | 全員   | Day 1    | 未着手   | 本ドキュメント群のレビュー                        |
| 1.2 | 基本HTML構造作成 (2カラムレイアウト)   | FE     | Day 2    | 未着手   | サイドバーとメインコンテンツエリアの骨格          |
| 1.3 | CSS基本スタイリング (全体、ヘッダー等) | FE     | Day 3    | 未着手   |                                               |
| 1.4 | サイドバーナビゲーション実装 (HTML/CSS)| FE     | Day 3    | 未着手   | アンカーリンク、ホバーエフェクト                  |
| 1.5 | XYZタグ凡例UI実装 (HTML/CSS/JS)    | FE     | Day 4    | 未着手   | ツールチップ機能含む                            |
| 1.6 | LINE風会話表示UIコンポーネント作成   | FE     | Day 5    | 未着手   | 発言者アイコン、吹き出しスタイル                 |

## フェーズ2: コア機能開発 (期間: 約2週間)

| No. | タスク名                                     | 担当   | 期限     | ステータス | 備考                                          |
|-----|----------------------------------------------|--------|----------|----------|-----------------------------------------------|
| 2.1 | JS: トークスクリプト入力処理                   | FE     | Day 7    | 未着手   | テキストエリアからの取得、基本パース             |
| 2.2 | JS: 発言者と内容の分離ロジック実装             | FE     | Day 8    | 未着手   |                                               |
| 2.3 | JS: XYZタグ自動割り当てロジック (ルールベース) | FE     | Day 10   | 未着手   | X, Y, Z軸それぞれ実装                        |
| 2.4 | JS: 会話ブロックの動的生成とDOM挿入            | FE     | Day 11   | 未着手   | パース結果とタグ情報を元にHTMLを生成             |
| 2.5 | XYZ軸ビジュアライゼーション表示実装 (CSS/JS) | FE     | Day 12   | 未着手   | アクティブタグの強調表示                      |
| 2.6 | JS: コミュニケーション評価コメントのテンプレート定義 | 全員   | Day 13   | 未着手   | GOOD/CONSIDER等のパターン定義                  |
| 2.7 | JS: 評価コメント自動生成ロジック (簡易版)      | FE     | Day 14   | 未着手   | XYZタグの組み合わせに応じたコメント選択          |
| 2.8 | 分析ブロック2カラム表示と評価コメント埋め込み    | FE     | Day 15   | 未着手   |                                               |

## フェーズ3: 統合とテスト、調整 (期間: 約1週間)

| No. | タスク名                               | 担当   | 期限     | ステータス | 備考                                       |
|-----|----------------------------------------|--------|----------|----------|--------------------------------------------|
| 3.1 | 全機能の統合と動作確認                   | FE     | Day 17   | 未着手   |                                            |
| 3.2 | サンプルスクリプトでのテストとデバッグ     | QA/FE  | Day 18   | 未着手   | 今回の警視庁vs佐藤氏のスクリプトを使用         |
| 3.3 | UI/UXの調整と改善                      | FE/全員| Day 19   | 未着手   | フィードバックに基づき調整                    |
| 3.4 | 簡単なレスポンシブ対応                   | FE     | Day 20   | 未着手   | スマホでもある程度閲覧可能にする                |
| 3.5 | ドキュメント最終化（簡易マニュアルなど） | 全員   | Day 21   | 未着手   |                                            |
| 3.6 | MVPデプロイ準備 (静的ホスティング)      | FE     | Day 21   | 未着手   |                                            |

## 担当者凡例
-   **FE**: フロントエンドエンジニア
-   **QA**: 品質保証担当
-   **全員**: プロジェクト関係者全員

## 注意事項
-   上記はあくまで目安であり、進捗に応じて柔軟に見直す。
-   各タスクの粒度は、より詳細なWBS（Work Breakdown Structure）で管理することを推奨。
-   MVPでは機能の完璧さよりも、コアバリューを迅速に検証することを優先する。
