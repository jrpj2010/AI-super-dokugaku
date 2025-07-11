module.exports = {
  apps: [{
    name: 'md-buddy',
    script: 'pnpm',
    args: 'dev',
    cwd: '/Users/jrpj2010/vibe-coding/app/import/26_md-buddy/md-buddy-web',
    watch: false,
    max_memory_restart: '500M',
    autorestart: true,
    restart_delay: 1000,
    env: {
      NODE_ENV: 'development',
      PORT: 8081
    },
    error_file: '~/.pm2/logs/md-buddy-error.log',
    out_file: '~/.pm2/logs/md-buddy-out.log',
    log_file: '~/.pm2/logs/md-buddy-combined.log',
    time: true
  }]
};