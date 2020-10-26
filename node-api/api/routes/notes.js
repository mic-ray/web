const express = require("express");
const router = express.Router();
const NotesController = require("../controllers/notes.controller");
const AuthGuard = require("../guards/auth.guard");
const ValidationGuard = require("../guards/validation.guard");

router.delete("/:noteId", AuthGuard.verifyToken, NotesController.notes_delete);

router.patch(
  "/:noteId",
  ValidationGuard.validateNote,
  AuthGuard.verifyToken,
  NotesController.notes_update
);

module.exports = { notesRoutes: router };
