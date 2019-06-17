#!/bin/bash

echo "chose which service you would like to rebuild:"
read service

docker-compose stop $service && \
docker-compose build $service && \
docker-compose up -d $service && \
docker-compose logs && \


echo "---RESET COMPLETE---"