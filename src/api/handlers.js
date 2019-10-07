const utils = require("./utils");

const receiveAuthCodeHandler = (req, res) => {
  const output = {
    error: null,
    received: req.body,
  };

  if (!req.body.code) {
    output.error = "Missing authorization code";
    return res.status(400).send(output);
  }

  return res.send(output);
};

const exchangeCodeForTokensHandler = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send({
      error: "Missing authorization code",
      received: req.body,
    });
  }

  try {
    const response = await utils.getAccessTokenByAuthCode(code);

    const { data } = response;

    // github sends a 200 status on success or failure
    // translate error messages to appropriate status codes for front-end
    if (data.error) {
      res.status(utils.githubErrorStatus[data.error]);
    }

    return res.send({
      received: data,
      // display what was sent to github on front-end
      // this util is used internally and for this response
      // second param is 'sanatized = true' to hide client secret for response
      sent: utils.buildQueryStringParams(code, true),
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      error: "Network Error Connecting to GitHub",
      received: null,
    });
  }
};

const privilegedUserDataHandler = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).send({
      error: "Missing Access Token",
      received: req.body,
    });
  }

  try {
    const response = await utils.getPrivilegedUserData(accessToken);
    const { data } = response;

    return res.send(data);
  } catch (error) {
    if (!error.response) {
      return res.status(500).send({
        error: "Network Error Connecting to GitHub",
        received: null,
      });
    }

    const { status, data } = error.response;

    return res.status(status).send({
      received: data,
    });
  }
};

module.exports = {
  receiveAuthCodeHandler,
  privilegedUserDataHandler,
  exchangeCodeForTokensHandler,
};
