#!usr/bin/env bash

echo "$1"

SECRETS_LIST=$(cat .env)
ENV_KEY=$(echo $1 | tr '[:lower:]' '[:upper:]')

while IFS= read -r secret; do

    SECRET_CYPRESS=$(echo $secret | sed "s/=/_$ENV_KEY=/g" | sed "s/'//g")
    export $SECRET_CYPRESS
  
done <<< "$SECRETS_LIST"
