const DBService = require("../services/db.service");
const ApiError = require("../utils/error");

exports.getUserByUsername = username => {
  return new Promise((resolve, reject) => {
    // Find a user with the provided email
    DBService.findUser({ username: username }).then(res => {
      // If a user is found resolve with user data
      if (res.length > 0) {
        resolve({
          id: res[0]._id,
          email: res[0].email,
          username: res[0].username
        });
      } else {
        // Else reject
        reject(new ApiError("No user found with that Username", 404));
      }
    });
  });
};

exports.checkEmail = email => {
  return new Promise((resolve, reject) => {
    // Find a user with the provided email
    DBService.findUser({ email: email }).then(res => {
      // If a user with that email is found
      // reject with a
      if (res.length > 0) {
        reject(new ApiError("E-Mail is already taken", 409));
      } else {
        // Else resolve
        resolve();
      }
    });
  });
};
