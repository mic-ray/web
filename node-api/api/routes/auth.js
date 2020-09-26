const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const ValidationGuard = require("../guards/validation.guard");

router.post(
  "/login",
  ValidationGuard.validateCredentials,
  AuthController.auth_login
);

router.post(
  "/signup",
  ValidationGuard.validateCredentials,
  AuthController.auth_signup
);

module.exports = { authRoutes: router };
