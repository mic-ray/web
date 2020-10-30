const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const ValidationGuard = require("../guards/validation.guard");
const AuthGuard = require("../guards/auth.guard");

router.post(
  "/login",
  ValidationGuard.validateLoginCredentials,
  AuthController.auth_login
);

router.post(
  "/signup",
  ValidationGuard.validateSignupCredentials,
  AuthController.auth_signup
);

router.post("/check", AuthGuard.verifyToken, AuthController.auth_check);

module.exports = { authRoutes: router };
