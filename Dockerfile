FROM nginx

COPY . /code/
WORKDIR /code/

RUN rm /etc/nginx/conf.d/default.conf
ECHO 'what is up?'
COPY docker_nginx.conf /etc/nginx/conf.d

EXPOSE 80