const DBService = require("../services/db.service");

exports.getUserByEmail = email => {
  return new Promise((resolve, reject) => {
    // Find a user with the provided email
    DBService.findUser(email).then(res => {
      // If a user is found resolve with user data
      if (res.length > 0) {
        resolve({ id: res[0]._id, email: res[0].email });
      } else {
        // Else reject
        reject(new Error("No user found with that E-Mail"));
      }
    });
  });
};
