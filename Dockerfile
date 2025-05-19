FROM nginx:alpine

# 作業ディレクトリの設定
WORKDIR /usr/share/nginx/html

# 静的ファイルをコピー
COPY app/ .

# FontAwesomeのCDN設定
RUN sed -i 's|https://kit.fontawesome.com/a076d05399.js|https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js|g' page.html || true

# Nginxの追加設定
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ポート80を公開
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
