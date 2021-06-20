FROM mysql:8.0

ENV TZ=Asia/Tokyo \
  LANG="ja_JP.UTF-8" \
  LANGUAGE="ja_JP:ja" \
  LC_ALL="ja_JP.UTF-8"

# 初期SQL投入（データベース作成）
COPY ./init /docker-entrypoint-initdb.d
# MySQL設定投入
COPY ./my.conf /etc/mysql/conf.d/

RUN apt-get update
RUN apt-get -y install locales-all
