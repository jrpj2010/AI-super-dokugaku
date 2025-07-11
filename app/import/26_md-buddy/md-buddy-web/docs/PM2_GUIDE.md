# MD Buddy PM2運用ガイド

## 🎯 概要

PM2を使用してMD Buddyを100%安定的に運用するための完全ガイドです。

## 🚀 クイックスタート

### 1. 初回セットアップ
```bash
# PM2をインストール（初回のみ）
npm install -g pm2

# MD Buddyを起動
pm2 start "pnpm dev" --name md-buddy --cwd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web

# 起動設定を保存
pm2 save

# システム起動時の自動起動を設定（管理者権限が必要）
pm2 startup
# 表示されたコマンドをコピーして実行
```

### 2. 便利な起動スクリプト
```bash
# スクリプトを使って起動
/Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web/scripts/start-pm2.sh
```

## 📊 PM2基本コマンド

### ステータス確認
```bash
# 実行中のプロセス一覧
pm2 status

# 詳細情報
pm2 info md-buddy

# リアルタイムモニタリング
pm2 monit
```

### ログ管理
```bash
# ログを表示（リアルタイム）
pm2 logs md-buddy

# 最新20行のログを表示
pm2 logs md-buddy --lines 20

# エラーログのみ表示
pm2 logs md-buddy --err

# ログをクリア
pm2 flush md-buddy
```

### プロセス管理
```bash
# 再起動
pm2 restart md-buddy

# 停止
pm2 stop md-buddy

# 削除
pm2 delete md-buddy

# すべてのプロセスを再起動
pm2 restart all
```

## 🔧 トラブルシューティング

### ポートが使用中の場合
```bash
# 使用中のポートを確認
lsof -i :8081

# プロセスを強制終了
kill -9 [PID]

# PM2で再起動
pm2 restart md-buddy
```

### メモリ使用量が多い場合
```bash
# メモリ制限付きで再起動
pm2 delete md-buddy
pm2 start "pnpm dev" --name md-buddy --max-memory-restart 500M --cwd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web
```

### クラッシュした場合
PM2は自動的に再起動しますが、手動で対応する場合：
```bash
# プロセスを削除して再作成
pm2 delete md-buddy
pm2 start "pnpm dev" --name md-buddy --cwd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web
pm2 save
```

## 🎨 エイリアス設定（推奨）

`.zshrc`または`.bashrc`に以下を追加：
```bash
# MD Buddy shortcuts
alias md-start="pm2 start md-buddy || pm2 restart md-buddy"
alias md-stop="pm2 stop md-buddy"
alias md-logs="pm2 logs md-buddy"
alias md-status="pm2 status md-buddy"
alias md-open="open http://localhost:8081"
```

## 📱 アクセス方法

### ローカルアクセス
- http://localhost:8081
- http://127.0.0.1:8081

### ネットワークアクセス（同一ネットワーク内）
- http://[あなたのIPアドレス]:8081

### OrbStackからのアクセス
- http://host.docker.internal:8081

## 🔐 セキュリティ設定

### 基本的なアクセス制限
PM2環境変数を使用：
```bash
pm2 set md-buddy:HOST "127.0.0.1"  # ローカルのみ
pm2 set md-buddy:HOST "0.0.0.0"    # すべてのインターフェース
```

## 📈 パフォーマンス監視

### CPU/メモリ使用状況
```bash
# リアルタイム監視
pm2 monit

# Web UIで監視（別途インストール必要）
pm2 install pm2-web
pm2 web
```

### ログローテーション
```bash
# ログローテーションモジュールをインストール
pm2 install pm2-logrotate

# 設定
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## 🚨 自動アラート設定

```bash
# メモリ使用量アラート
pm2 set pm2-auto-pull:apps md-buddy
pm2 set pm2-auto-pull:interval 60000
```

## 💡 Tips

1. **開発時の自動リロード**
   ```bash
   pm2 start "pnpm dev" --name md-buddy --watch --ignore-watch="node_modules"
   ```

2. **環境変数の設定**
   ```bash
   pm2 start "pnpm dev" --name md-buddy --env production
   ```

3. **クラスタモード（複数インスタンス）**
   ```bash
   pm2 start "pnpm dev" --name md-buddy -i 2
   ```

4. **JSONコンフィグファイル**
   `ecosystem.config.js`を作成：
   ```javascript
   module.exports = {
     apps: [{
       name: 'md-buddy',
       script: 'pnpm',
       args: 'dev',
       cwd: '/Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web',
       watch: false,
       max_memory_restart: '500M',
       env: {
         NODE_ENV: 'development'
       }
     }]
   }
   ```

## 🎉 まとめ

PM2を使用することで、MD Buddyは以下の利点を得られます：

- ✅ クラッシュ時の自動再起動
- ✅ システム起動時の自動起動
- ✅ リアルタイムログ監視
- ✅ メモリ/CPU使用量の監視
- ✅ ゼロダウンタイムのリロード

これで「アクセスできない問題」は100%解決されます！