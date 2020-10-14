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
      // Finally resolve with the created note ID
      .then(res =>
        resolve({
          id: res._id,
          title: res.title,
          description: res.description,
          createdAt: res.createdAt
        })
      )
      .catch(err => reject(new Error(err)));
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
          res.map(x => {
            return {
              id: x._id,
              title: x.title,
              description: x.description,
              createdAt: x.createdAt
            };
          })
        );
      })
      .catch(err => reject(new Error(err)));
  });
};
