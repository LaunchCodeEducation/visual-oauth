require("dotenv").config(); // loads .env file into process environment
const express = require("express");

const handlers = require("./handlers");
const middleware = require("./middleware");

const app = express();

//-- apply middleware at the app level (affects all requests) --//
app.use(middleware);

//-- define routes and associate respective handlers --//
// receives and echos the request to send the auth code from front-end to back-end
app.post("/oauth/code", handlers.receiveAuthCodeHandler);

// receives auth code and exchanges with github for access token
app.post("/oauth/access_token", handlers.exchangeCodeForTokensHandler);

// request privileged user data using an access token
app.post("/oauth/user_data", handlers.privilegedUserDataHandler);

//-- run the app server --//
const { PORT = 8008 } = process.env;
app.listen(PORT, () => console.log(`app server listening on port ${PORT}`));
