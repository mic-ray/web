const NotesService = require("../services/notes.service");

exports.note_add = (req, res, next) => {
  const note = req.body.note;
  note.createdBy = req.params.username;

  NotesService.addNote(note).then(
    result => {
      return res.status(201).json({
        result: "Note added!",
        note: result
      });
    },
    err => next(err)
  );
};

exports.notes_delete = (req, res, next) => {
  const noteId = req.params.noteId;
  NotesService.deleteNote(noteId, req.user).then(
    _ => {
      return res.status(200).json({
        result: `Note deleted!`
      });
    },
    err => next(err)
  );
};

exports.notes_by_user = (req, res, next) => {
  NotesService.getNotesByUser(req.user).then(
    result => {
      return res.status(200).json({
        result: `Found notes!`,
        notesCount: result.length,
        notes: result
      });
    },
    err => next(err)
  );
};
