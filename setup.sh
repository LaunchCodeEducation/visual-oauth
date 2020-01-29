printf "\nYou will be prompted for your GitHub client ID and secret\n"
printf "\nThese values will be stored in src/api.env and src/client/.env\n\n"

read -p '[GitHub Client ID]: ' client_id
read -p '[GitHub Client Secret]: ' client_secret

api_origin=http://localhost:8008
redirect_uri=http://localhost:3000/

if [[ -e "src/client/.env" ]]; 
then
  printf "\nclient env file already exists\n"
else
  printf "\ncreating client env file at src/client/.env\n"

cat <<- EOF > src/client/.env
REACT_APP_API_DOMAIN=$api_origin

REACT_APP_GITHUB_AUTH_ENDPOINT=https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=read:user
EOF

fi

if [[ -e "src/api/.env" ]]; 
then
  printf "\nAPI env file already exists\n"
else
  printf "\ncreating API env file at src/api/.env\n"

cat <<- EOF > src/api/.env
CLIENT_ORIGIN=http://localhost:3000

GITHUB_CLIENT_ID=$client_id
GITHUB_CLIENT_SECRET=$client_secret
GITHUB_REDIRECT_URI=$redirect_uri
GITHUB_ACCESS_TOKEN_ENDPOINT=https://github.com/login/oauth/access_token
EOF

fi

printf "\n\ninstalling API and Client dependencies\n\n"

cd src/api && npm install && cd ../client && npm install

printf "\n\neverything is ready to go! to begin enter: npm start\n\n"