const axios = require("axios").default;
const queryString = require("querystring");

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

module.exports = {
  getAccessTokenByAuthCode,
};
