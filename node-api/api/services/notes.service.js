const DBService = require("../services/db.service");
const { ApiError } = require("../utils/error");

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
      .then(res => resolve(res._id))
      .catch(err => reject(new Error(err)));
  });
};
