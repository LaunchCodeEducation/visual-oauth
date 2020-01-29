// JSON middleware that turns incoming request bodies into a JS object on req.body
const { json } = require("express");

// sets CORS headers to allow browser requests from the client origin
const corsMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN);

  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );

    return res.sendStatus(200);
  }

  next();
};

module.exports = [corsMiddleware, json()];
