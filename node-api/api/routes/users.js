const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const ValidationGuard = require("../guards/validation.guard");
const AuthGuard = require("../guards/auth.guard");

router.get(
  "/:email",
  AuthGuard.verifyToken,
  ValidationGuard.validateEmail,
  UsersController.user_email
);

module.exports = { usersRoutes: router };
