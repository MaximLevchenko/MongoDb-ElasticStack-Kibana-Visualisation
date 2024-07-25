#!/bin/bash

FILE=/opt/bitnami/spark/scripts/process_datasets.scala
FILE_GENERATED_FROM_SPARK=./logstash/data/processed/*.csv
FILE_GENERATED_FROM_SPARK_RIGHT_PATH=./logstash/data/games_result_processed.csv

cd ./spark
docker-compose up -d
docker exec spark bash -c "spark-shell -i $FILE > /dev/null 2>&1"
docker exec spark bash -c "ls /opt/bitnami/logstash/data/"
docker-compose down
cd ..
cp $FILE_GENERATED_FROM_SPARK $FILE_GENERATED_FROM_SPARK_RIGHT_PATH