FROM ubuntu:18.04

RUN apt-get update \
    && apt-get install -y redis-server curl \
    && curl -sL https://deb.nodesource.com/setup_11.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY . /code/

WORKDIR /code

CMD ["sh", "-c", "/code/startup.sh"]
