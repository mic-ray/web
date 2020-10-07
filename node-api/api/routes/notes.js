const express = require("express");
const router = express.Router();
const NotesController = require("../controllers/notes.controller");
const ValidationGuard = require("../guards/validation.guard");

router.post("/", ValidationGuard.validateNote, NotesController.note_add);

module.exports = { notesRoutes: router };
