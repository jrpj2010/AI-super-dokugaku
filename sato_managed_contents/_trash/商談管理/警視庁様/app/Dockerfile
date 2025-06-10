# Nginxの公式イメージをベースイメージとして使用
FROM nginx:alpine

# デフォルトのNginx設定ファイルを上書きするために削除する (推奨)
RUN rm /etc/nginx/conf.d/default.conf

# カスタムNginx設定ファイルをコピー
COPY nginx.conf /etc/nginx/conf.d/default.conf

# アプリケーションの静的ファイル (HTML, CSS, JS) をNginxの配信用ディレクトリにコピー
COPY . /usr/share/nginx/html

# Nginxがリッスンするポート (デフォルトは80)
EXPOSE 80

# Nginxをフォアグラウンドで起動
CMD ["nginx", "-g", "daemon off;"]
