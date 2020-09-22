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

// If no route has matched
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    result: "An error occured!",
    error: {
      message: error.message,
      status: error.status
    }
  });
});

module.exports = app;
