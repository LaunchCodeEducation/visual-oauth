Write-Output '`nYou will be prompted for your GitHub client ID and secret`n'
Write-Output '`nThese values will be stored in src/api.env and src/client/.env`n`n'

$ClientId = ReadHost -Prompt '[GitHub Client ID]: '
$ClientSecret = ReadHost -Prompt '[GitHub Client Secret]: '

$ApiOrigin = 'http://localhost:8008'
$RedirectUri = 'http://localhost:3000/'

$ApiEnvPath = 'src/api/.env'
$ClientEnvPath = 'src/client/.env'

if (Test-Path "$ClientEnvPath") {
  Write-Output '`nclient env file already exists`n'
} else {
  Write-Output "`ncreating client env file at $ClientEnvPath`n"

  $ClientEnv = @"
REACT_APP_API_DOMAIN=$ApiOrigin

REACT_APP_GITHUB_AUTH_ENDPOINT=https://github.com/login/oauth/authorize?client_id=${ClientId}&redirect_uri=${$RedirectUri}&scope=read:user
"@

  Set-Content -Path "$ClientEnvPath" -Value $ClientEnv
}

if (Test-Path "$ApiEnvPath") {
  Write-Output '`nAPI env file already exists`n'
} else {
  Write-Output "`ncreating API env file at $ApiEnvPath`n"

  $ApiEnv = @"
CLIENT_ORIGIN=http://localhost:3000

GITHUB_CLIENT_ID=$ClientId
GITHUB_CLIENT_SECRET=$ClientSecret
GITHUB_REDIRECT_URI=$RedirectUri
GITHUB_ACCESS_TOKEN_ENDPOINT=https://github.com/login/oauth/access_token
"@

  Set-Content -Path "$ApiEnvPath" -Value $ApiEnv
}

Write-Output '`n`ninstalling API and Client dependencies`n`n'

cd src/api && npm install && cd ../client && npm install

Write-Output '`n`neverything is ready to go! to begin enter: npm start`n`n'