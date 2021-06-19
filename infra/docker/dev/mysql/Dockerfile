FROM mysql:8.0

COPY ./mysql/conf/ /etc/mysql/conf.d/
COPY ./mysql/init/ /docker-entrypoint-initdb.d/

RUN chmod 644 /etc/mysql/conf.d/*

CMD ["mysqld"]