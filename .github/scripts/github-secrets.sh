#!/bin/sh

echo "$1"

secrets=$2
echo $secrets

for key in "${!secrets[@]}"
do
    echo "$key : ${secrets[$key]}"
done