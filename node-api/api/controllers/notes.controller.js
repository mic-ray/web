const NotesService = require("../services/notes.service");

exports.note_add = (req, res, next) => {
  const note = req.body.note;

  NotesService.addNote(note).then(
    result => {
      return res.status(200).json({
        result: "Note added!",
        note: result
      });
    },
    err => next(err)
  );
};
