#!/bin/bash
# MD Buddy PM2起動スクリプト

echo "🚀 MD Buddyを起動しています..."

# MD Buddyのディレクトリに移動
cd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web

# PM2でMD Buddyが既に起動しているか確認
if pm2 status | grep -q "md-buddy"; then
  echo "✅ MD Buddyは既に起動しています"
  pm2 restart md-buddy
else
  echo "🔄 新規にMD Buddyを起動します"
  pm2 start "pnpm dev" --name md-buddy --cwd /Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web
fi

# ステータス表示
pm2 status

echo ""
echo "📱 MD Buddyにアクセス: http://localhost:8081"
echo ""
echo "便利なPM2コマンド:"
echo "  pm2 logs md-buddy     - ログを表示"
echo "  pm2 restart md-buddy  - 再起動"
echo "  pm2 stop md-buddy     - 停止"
echo "  pm2 monit            - リアルタイム監視"