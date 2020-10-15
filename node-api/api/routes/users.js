const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const NotesController = require("../controllers/notes.controller");
const ValidationGuard = require("../guards/validation.guard");
const AuthGuard = require("../guards/auth.guard");

router.get(
  "/:username",
  ValidationGuard.validateUsername,
  AuthGuard.verifyUser,
  UsersController.user_by_username
);

router.get(
  "/:email/notes",
  ValidationGuard.validateEmail,
  AuthGuard.verifyUser,
  NotesController.notes_by_user
);

module.exports = { usersRoutes: router };
