## 開発環境の用意

## clone したらまずすること

> TODO:  
- シェルスクリプトにまとめて、一括で実行できるようにする
- DBのセットアップがまだ
- execで指定するコンテナ名を一意にしておく設定がまだ

```bash
docker-compose -f docker-compose.dev.yml up -d
docker exec -it bookbok_app_1 bash

[docker] cp .env.example .env
[docker] php artisan key:generate
[docker] cd front
[docker] yarn install
```

## 「よし！開発だ」と思ったときにすること

```bash
docker-compose -f docker-compose.dev.yml up -d
docker exec -it bookbok_app_1 bash

[docker] cd front
[docker] yarn watch
```

> NOTE:  
「今日はjavascriptを触らない！」という日は、`yarn watch`を実行しなくてもいい。  
逆にjavascriptを触るのであれば、開発中常に実行状態にしておく。

## 「今日は終わり！」と思ったときにすること

```bash
docker-compose -f docker-compose.dev.yml down
```
