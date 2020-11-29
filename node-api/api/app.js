const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DBService = require("./services/db.service");
const ApiError = require("./utils/error");

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
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// Establish database connection
DBService.connect();

const { authRoutes } = require("./routes/auth");
app.use("/auth", authRoutes);
const { usersRoutes } = require("./routes/users");
app.use("/users", usersRoutes);
const { notesRoutes } = require("./routes/notes");
app.use("/notes", notesRoutes);

app.get("/health", (req, res, next) => {
  const health = {
    uptime: process.uptime(),
    status: "UP",
    databaseConnected: DBService.isConnected(),
    timestamp: Date.now()
  };
  try {
    res.status(200).json(health);
  } catch (e) {
    next(e);
  }
});

// If no route has matched
app.use((req, res, next) => {
  next(new ApiError("Not found!", 404));
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);
  res.json({
    result: "An error occured!",
    error: {
      message: error.message,
      status: error.statusCode || 500
    }
  });
});

module.exports = app;
