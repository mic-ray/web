const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/users.controller");
const NotesController = require("../controllers/notes.controller");
const ValidationGuard = require("../guards/validation.guard");
const AuthGuard = require("../guards/auth.guard");

router.get(
  "/:email",
  ValidationGuard.validateEmail,
  AuthGuard.verifyUser,
  UsersController.user_email
);

router.get(
  "/:email/notes",
  ValidationGuard.validateEmail,
  AuthGuard.verifyUser,
  NotesController.notes_by_user
);

module.exports = { usersRoutes: router };
