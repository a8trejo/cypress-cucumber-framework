#!/bin/sh

echo "$1"

echo "$2"

secrets=$2

for key in "${!secrets[@]}"
do
    echo "$key : ${secrets[$key]}"
done