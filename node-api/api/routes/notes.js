const express = require("express");
const router = express.Router();
const NotesController = require("../controllers/notes.controller");
const AuthGuard = require("../guards/auth.guard");

router.delete("/", AuthGuard.verifyToken, NotesController.notes_delete);

module.exports = { notesRoutes: router };
