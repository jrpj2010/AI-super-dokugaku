# Supabase セットアップガイド

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com)にアクセスしてアカウントを作成
2. 新しいプロジェクトを作成
3. プロジェクトのURLとAnon Keyを取得

## 2. データベーススキーマの設定

Supabaseダッシュボードの「SQL Editor」で以下の手順を実行：

1. 新しいクエリを作成
2. `schema.sql`の内容をコピー＆ペースト
3. 「Run」ボタンをクリックして実行

## 3. 環境変数の設定

プロジェクトルートの`.env`ファイルに以下を設定：

```env
VITE_SUPABASE_URL=https://[プロジェクトID].supabase.co
VITE_SUPABASE_ANON_KEY=[Anon Key]
```

## 4. Storage（オプション）

将来的にファイルをSupabase Storageに保存する場合：

1. Supabaseダッシュボードの「Storage」セクションへ
2. 新しいバケットを作成（例: `shared-files`）
3. バケットのポリシーを設定

## 5. 定期的なクリーンアップ（オプション）

期限切れファイルを自動削除するCronジョブの設定：

```sql
-- Supabase Edge Functionまたは外部Cronサービスで実行
SELECT delete_expired_files();
```

## トラブルシューティング

### CORS エラーが発生する場合

1. Supabaseダッシュボードの「Authentication」→「URL Configuration」
2. 「Site URL」にフロントエンドのURLを追加（例: `http://localhost:5173`）

### RLS（Row Level Security）エラー

1. テーブルのRLSポリシーが正しく設定されているか確認
2. 必要に応じてポリシーを調整

### パフォーマンスの最適化

1. インデックスが正しく作成されているか確認
2. 大量のデータがある場合は、パーティショニングを検討