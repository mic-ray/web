const DBService = require("../services/db.service");

exports.addNote = note => {
  return new Promise((resolve, reject) => {
    DBService.addNote(note)
      .then(
        res => resolve(res._id),
        err => reject(new Error(err))
      )
      .catch(err => reject(new Error(err)));
  });
};
