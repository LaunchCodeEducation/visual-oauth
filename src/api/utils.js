const axios = require("axios").default;
const queryString = require("querystring");

const buildQueryStringParams = (code, sanitized = false) => {
  const output = {
    code,
    client_secret: "XXX",
    grant_type: "authorization_code",
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URI,
  };

  // sanitized for front-end response (hides client secret)
  if (sanitized) return output;

  // for internal use send actual client secret to github
  output.client_secret = process.env.GITHUB_CLIENT_SECRET;
  return output;
};

const getAccessTokenByAuthCode = code => {
  const queryStringParams = buildQueryStringParams(code);

  return axios.post(
    process.env.GITHUB_ACCESS_TOKEN_ENDPOINT,
    queryStringParams,
    {
      // converts and appends an object of parameters into a URL encoded query string
      // by default separates params by '&' and key:value pairs by '='
      // ex: { name: 'vamp', age: 131 } -> ?name=vamp&age=131
      paramsSerializer: params => queryString.stringify(params),
      headers: {
        // request JSON response from github for front-end viewing
        Accept: "application/json",
      },
    },
  );
};

const getPrivilegedUserData = accessToken =>
  axios.get("https://api.github.com/user", {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

// github sends a 200 on success or failure
// translation dict for github error messages to appropriate status code
// used to display (expected) status codes on front-end during failure
const githubErrorStatus = {
  redirect_uri_mismatch: 400,
  bad_verification_code: 400,
  incorrect_client_credentials: 401,
};

module.exports = {
  githubErrorStatus,
  getPrivilegedUserData,
  buildQueryStringParams,
  getAccessTokenByAuthCode,
};
