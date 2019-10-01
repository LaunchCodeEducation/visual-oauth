const express = require("express");
const axios = require("axios").default;
const queryString = require("querystring");

const app = express();

// JSON middleware that turns incoming request bodies into a JS object on req.body
app.use(express.json());

const getAccessTokenByAuthCode = code => {
  const queryStringParams = {
    code,
    grant_type: "authorization_code",
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    client_secret: process.env.CLIENT_SECRET,
  };

  return axios.post(process.env.OAUTH_TOKEN_ENDPOINT, queryStringParams, {
    // converts an object of parameters into a URL query string then appends it to the request
    // by default separates params by '&' and key:value pairs by '='
    // ex: { name: 'vamp', age: 131 } -> baseURL?name=vamp&age=131
    paramsSerializer: params => queryString.stringify(params),
  });
};

const authCodeFlowHandler = async (req, res) => {
  const { code } = req.body;

  const response = await getAccessTokenByAuthCode(code).catch(console.error);

  console.log(response.data);

  return res.sendStatus(response ? 200 : 500);
};

app.post("/oauth", authCodeFlowHandler);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log(`app server listening on port ${PORT}`));
