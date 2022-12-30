echo "$1"

SECRETS_LIST=$(cat .env)
ENV_KEY=$(echo $1 | tr '[:lower:]' '[:upper:]')

echo $GITHUB_ENV
echo "----------------------------------------------------------------------"

while IFS= read -r secret; do
    echo $secret | sed "s/=/_$ENV_KEY=/g"
    SECRET_CYPRESS=$(echo $secret | sed "s/=/_$ENV_KEY=\"/g" | sed "s/$/\"/")
    # SECRET_CYPRESS=$(echo $secret | sed "s/=/_$ENV_KEY=/g")
    echo $SECRET_CYPRESS

    if [ -z "$2" ]; then
        echo "Normal Export"
        export $SECRET_CYPRESS
    else
        echo "Github Export"
        echo $SECRET_CYPRESS >> $GITHUB_ENV
    fi
    
  
done <<< "$SECRETS_LIST"

echo "----------------------------------------------------------------------"