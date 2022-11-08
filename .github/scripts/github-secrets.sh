echo "$1"

SECRETS_LIST=$(cat .env)
ENV_KEY=$(echo $1 | tr '[:lower:]' '[:upper:]')

echo $(cat .env)
echo "----------------------------------------------------------------------"

while IFS= read -r secret; do
    echo $secret | sed "s/=/_$ENV_KEY=/g"
    SECRET_CYPRESS=$(echo $secret | sed "s/=/_$ENV_KEY=\"/g" | sed "s/$/\"/")
    # SECRET_CYPRESS=$(echo $secret | sed "s/=/_$ENV_KEY=/g" | sed "s/'//g")
    export $SECRET_CYPRESS
  
done <<< "$SECRETS_LIST"

echo "----------------------------------------------------------------------"

echo $(env)