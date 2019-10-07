// JSON middleware that turns incoming request bodies into a JS object on req.body
const { json } = require("express");

// sets CORS headers to allow browser requests from the client domain
const corsMiddleware = (_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_DOMAIN);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );

  next();
};

module.exports = [corsMiddleware, json()];
