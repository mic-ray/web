const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const DBService = require("../services/db.service");
const { ApiError } = require("../utils/error");

/**
 * Generates a JWT
 * @param {*} payload Data to be put in the token
 */
const generateToken = payload => {
  return jwt.sign(payload, process.env.CRYPTO_KEY, { expiresIn: "1h" });
};

exports.login = credentials => {
  return new Promise((resolve, reject) => {
    // Find a user with the provided email
    DBService.findUser(credentials.email)
      .then(res => {
        // If no user is found reject
        if (res.length < 1) {
          return reject(new ApiError("Wrong E-Mail provided", 401));
        }
        // Otherwise compare the passwords
        bcrypt.compare(
          credentials.password,
          res[0].password,
          (error, success) => {
            // If passwords are not equal reject
            if (error) {
              reject(new ApiError("Wrong Password provided", 401));
              // Otherwise resolve with a JWT
            } else if (success) {
              resolve(
                generateToken({ email: res[0].email, userId: res[0]._id })
              );
            }
          }
        );
      })
      // Reject in case an error was catched
      .catch(err => reject(new Error(err.message)));
  });
};

/**
 * Handles the signup process, by creating a new user
 * @param {*} credentials E-Mail and Password to be used for signup
 */
exports.signup = credentials => {
  return new Promise((resolve, reject) => {
    // Find a user with the provided email
    DBService.findUser(credentials.email).then(res => {
      // If a user is found reject
      if (res.length > 0) {
        reject(new ApiError("E-Mail is already taken", 409));
      } else {
        bcrypt
          .hash(credentials.password, 10)
          // Create a new user with the password hash and provided email
          .then(hash =>
            DBService.addUser({ email: credentials.email, password: hash })
          )
          // Resolve the promise with a JWT
          .then(() => {
            resolve(generateToken({ email: credentials.email }));
          })
          // In case of an error reject with catched error
          .catch(err => {
            reject(new Error(err));
          });
      }
    });
    // Hash the password using bcrypt
  });
};
