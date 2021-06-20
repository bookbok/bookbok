FROM php:8.0-fpm-buster
SHELL ["/bin/bash", "-oeux", "pipefail", "-c"]

ENV TZ=Asia/Tokyo \
  # locale
  LANG="ja_JP.UTF-8" \
  LANGUAGE="ja_JP:ja" \
  LC_ALL="ja_JP.UTF-8" \
  COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

# 公式イメージがzz-docker.confという名前で設定をつぶしてくるので、それより後に読み込まれるようにするための名前
COPY ./php-fpm.d/zzz-www.conf /usr/local/etc/php-fpm.d/zzz-www.conf
COPY ./php.ini /usr/local/etc/php/php.ini

# いろいろな初期設定
RUN apt-get update && \
  apt-get -y install git libicu-dev libcurl4-gnutls-dev libonig-dev libzip-dev unzip locales && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  locale-gen ja_JP.UTF-8 && \
  localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
  mkdir /var/run/php-fpm

# phpの追加で必要なパッケージをインストール
RUN docker-php-ext-install curl intl pdo_mysql zip

# composerをインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer config -g process-timeout 3600 && \
  composer config -g repos.packagist composer https://packagist.org

# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update && apt-get install -y nodejs

# yarnをインストール
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install yarn

WORKDIR /var/www/html

CMD ["php-fpm", "--allow-to-run-as-root"]
