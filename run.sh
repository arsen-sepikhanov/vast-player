#!/bin/bash

docker stop nginx-video-server
docker rm nginx-video-server
docker run -d -p 8690:80 --name nginx-video-server  nginx-video-server

docker stop adserver
docker rm adserver
docker run -d -p 5000:5000 --name adserver  adserver