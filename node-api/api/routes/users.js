const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const ValidationGuard = require("../guards/validation.guard");

router.get(
  "/:email",
  ValidationGuard.validateEmail,
  UsersController.user_email
);

module.exports = { usersRoutes: router };
