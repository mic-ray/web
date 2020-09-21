const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.auth_login);

router.post("/signup", AuthController.auth_signup);

module.exports = { authRoutes: router };
