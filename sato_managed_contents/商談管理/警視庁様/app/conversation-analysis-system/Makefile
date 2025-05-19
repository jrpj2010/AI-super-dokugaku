.PHONY: build run dev stop clean

# Dockerイメージをビルド
build:
	docker-compose build

# コンテナを起動
run:
	docker-compose up -d

# 開発モードで起動
dev:
	npm run dev

# コンテナを停止
stop:
	docker-compose down

# コンテナとイメージを削除
clean:
	docker-compose down --rmi all

# ログを表示
logs:
	docker-compose logs -f
