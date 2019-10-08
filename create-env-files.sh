#-- API env file --#

if [[ -e "src/api/.env" ]]; 

then
echo "API env file already exists"

else
echo "creating API env file at src/api/.env"
echo "you will need to paste in your GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET values"

cat <<- EOF > src/api/.env
CLIENT_DOMAIN=http://localhost:3000

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=http://localhost:3000/
GITHUB_ACCESS_TOKEN_ENDPOINT=https://github.com/login/oauth/access_token
EOF

fi

#-- Client env file --#

if [[ -e "src/client/.env" ]]; 

then
echo "client env file already exists"

else
echo "creating client env file at src/client/.env"
echo "you will need to paste in your client_id into the REACT_APP_GITHUB_AUTH_ENDPOINT variable in this file"

cat <<- EOF > src/client/.env
REACT_APP_API_DOMAIN=http://localhost:8008

REACT_APP_GITHUB_AUTH_ENDPOINT=https://github.com/login/oauth/authorize?client_id=REPLACE_WITH_YOUR_GITHUB_CLIENT_ID&redirect_uri=http://localhost:3000/&scope=read:user
EOF

fi
