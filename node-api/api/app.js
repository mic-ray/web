const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const { infoRoutes } = require("./routes/info");
app.use("/info", infoRoutes);
const { authRoutes } = require("./routes/auth");
app.use("/auth", authRoutes);

app.use((req, res) => {
  return res.status(404).send("<h1>Nothing found<h1>");
});

module.exports = app;
