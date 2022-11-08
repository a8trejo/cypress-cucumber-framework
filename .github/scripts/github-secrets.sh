echo "$1"
echo $(env)

echo "$2"
secrets = $2

for key in "${!secrets[@]}"
do
    echo "$key : ${secrets[$key]}"
done