#!/bin/bash

docker build -t nginx-video-server . -f video-server.Dockerfile
docker build -t adserver . -f ad-server.Dockerfile