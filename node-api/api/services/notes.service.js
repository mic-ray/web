const DBService = require("../services/db.service");
const ApiError = require("../utils/error");

exports.addNote = note => {
  return new Promise((resolve, reject) => {
    // Find a user with the received username
    DBService.findUser({ username: note.createdBy })
      .then(res => {
        // If no user was found reject
        if (res.length < 1) {
          return reject(new ApiError("No user found with that username", 404));
        }
        // Replace the username with the users ID
        note.createdBy = res[0]._id;
        return DBService.addNote(note);
      })
      // Finally resolve with data of the created note
      .then(res =>
        resolve({
          id: res._id,
          title: res.title,
          description: res.description,
          createdBy: res.createdBy.username,
          createdAt: res.createdAt
        })
      )
      .catch(err => reject(new Error(err)));
  });
};

exports.deleteNote = (noteId, user) => {
  return new Promise((resolve, reject) => {
    // Find a note with the provided ID
    DBService.findNotes({ _id: noteId })
      .then(
        res => {
          // If no notes were found throw an error
          if (res.length < 1) {
            throw new ApiError("No note with that ID was found", 404);
          }
          // Otherwise if the notes creator is not equal to
          // the user who requested the deletion throw an error
          if (res[0].createdBy.username !== user.username) {
            throw new ApiError("Not allowed to delete this note", 403);
          }
          // Else delete the note
          return DBService.deleteNote(noteId);
        },
        _ => {
          // If a DB error was returned, throw an error
          throw new ApiError("Invalid note ID provided", 400);
        }
      )
      .then(res => {
        // If note was deleted resolve
        if (res.deletedCount > 0) {
          return resolve();
        }
        // Else reject with an error
        reject(new ApiError("Note was not deleted"));
      })
      // Catch and reject thrown errors
      .catch(err => reject(err));
  });
};

exports.updateNote = (note, user) => {
  return new Promise((resolve, reject) => {
    // Find a note with the provided ID
    DBService.findNotes({ _id: note.id })
      .then(
        res => {
          // If no notes were found throw an error
          if (res.length < 1) {
            throw new ApiError("No note with that ID was found", 404);
          }
          // Otherwise if the notes creator is not equal to
          // the user who requested the update throw an error
          if (res[0].createdBy.username !== user.username) {
            throw new ApiError("Not allowed to update this note", 403);
          }
          // Else update note
          return DBService.updateNote(res[0], {
            title: note.title,
            description: note.description
          });
        },
        _ => {
          // If a DB error was returned, throw an error
          throw new ApiError("Invalid note ID provided", 400);
        }
      )
      .then(res => {
        // Resolve with data of the updated note
        resolve({
          id: res._id,
          title: res.title,
          description: res.description,
          createdBy: res.createdBy.username,
          createdAt: res.createdAt
        });
      })
      // Catch and reject thrown errors
      .catch(err => reject(err));
  });
};

exports.getNotesByUser = user => {
  return new Promise((resolve, reject) => {
    // Find the requested user
    DBService.findUser({ email: user.email })
      .then(res => {
        // If no user was found reject
        if (res.length < 1) {
          return reject(new ApiError("No user found", 404));
        }
        // Otherwise find notes created by the user
        return DBService.findNotes({ createdBy: res[0]._id });
      })
      // Finally resolve with the found notes
      .then(res => {
        // Format note data to only include relevant data
        resolve(
          res.map(note => {
            return {
              id: note._id,
              title: note.title,
              description: note.description,
              createdBy: note.createdBy.username,
              createdAt: note.createdAt
            };
          })
        );
      })
      .catch(err => reject(new Error(err)));
  });
};
