const express = require("express");

const utils = require("./utils");

const app = express();

// set CORS headers
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );

  next();
});

// JSON middleware that turns incoming request bodies into a JS object on req.body
app.use(express.json());

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

app.post("/oauth/code", receiveAuthCodeHandler);

const exchangeCodeForTokensHandler = async (req, res) => {
  const { code } = req.body;

  try {
    const response = await utils.exchangeAuthCodeForTokens(code);
    return res.sendStatus(response ? 200 : 500);
  } catch (error) {
    console.error({ error });
    res.status(5);
  }

  console.log(response.data);
};

app.post("/oauth/tokens", exchangeCodeForTokensHandler);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log(`app server listening on port ${PORT}`));
