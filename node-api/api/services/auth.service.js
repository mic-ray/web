const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const DBService = require("../services/db.service");

/**
 * Generates a JWT
 * @param {*} payload Data to be put in the token
 */
const generateToken = payload => {
  return jwt.sign(payload, process.env.CRYPTO_KEY, { expiresIn: "1h" });
};

exports.login = credentials => {
  return generateToken({ email: credentials.email });
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
        reject(new Error("E-Mail is already in use"));
      } else {
        bcrypt
          .hash(credentials.password, 12)
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
