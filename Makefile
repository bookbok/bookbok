.PHONY: docker/*

DOCKER_COMPOSER := docker-compose
CONTAINER := app # デフォルトは一番扱うapp

docker/up:
	$(DOCKER_COMPOSER) up -d
docker/build:
	$(DOCKER_COMPOSER) build --no-cache --force-rm
docker/stop:
	$(DOCKER_COMPOSER) stop
docker/exec/%:
	$(DOCKER_COMPOSER) exec $(CONTAINER) make $*

.PHONY: init/*

docker/init/all:
	make docker/build
	make docker/up
	cp .env.example .env
	make docker/exec/init/laravel CONTAINER=app
	make docker/exec/init/react CONTAINER=nginx

init/react:
	yarn install

init/laravel:
	composer install
	php artisan key:generate
	php artisan storage:link
	chmod -R 777 storage bootstrap/cache
	php artisan migrate:fresh --seed

