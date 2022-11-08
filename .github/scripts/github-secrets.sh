#!/bin/sh

echo "$1"
echo "$2"

while IFS= read -r secret; do
  
    # SECRET_CYPRESS=$(echo $secret | sed "s/'//g")
    export $SECRET_CYPRESS
  
done <<< "$2"

echo "$env"