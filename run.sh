#!/bin/bash

docker build -t redcraft/lain .
docker network create lain
docker run -d -p 11211:11211 --net lain --name memcached memcached
docker run -d -p 3000:3000 --net lain --name lain redcraft/lain