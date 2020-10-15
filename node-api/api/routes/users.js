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
  "/:username/notes",
  ValidationGuard.validateUsername,
  AuthGuard.verifyUser,
  NotesController.notes_by_user
);

router.post(
  "/:username/notes",
  ValidationGuard.validateUsername,
  ValidationGuard.validateNote,
  AuthGuard.verifyUser,
  NotesController.note_add
);

module.exports = { usersRoutes: router };
