FROM mysql:8.0

COPY ./docker/mysql/conf/ /etc/mysql/conf.d/
COPY ./docker/mysql/initialize_databases.sql /docker-entrypoint-initdb.d/

ENV TZ=Asia/Tokyo \
  LANG=ja_JP.UTF-8 \
  LANGUAGE=ja_JP:ja \
  LC_ALL=ja_JP.UTF-8

RUN apt-get update
RUN apt-get -y install locales-all
