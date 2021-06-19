.PHONY: docker/*

DOCKER_COMPOSER := docker-compose

docker/up:
	$(DOCKER_COMPOSER) up -d
docker/build:
	$(DOCKER_COMPOSER) build --no-cache --force-rm
docker/stop:
	$(DOCKER_COMPOSER) stop
docker/exec/%:
	$(DOCKER_COMPOSER) exec app $(MAKE) $*

.PHONY: init/*

docker/init/all:
	$(MAKE) docker/build
	$(MAKE) docker/up
	$(MAKE) docker/exec/init/all

init/all:
	composer install
	cp .env.example .env
	$(MAKE) init/laravel

init/laravel:
	php artisan key:generate
	php artisan storage:link
	chmod -R 777 storage boostrap/cache
	php artisan migrate:fresh --seed


