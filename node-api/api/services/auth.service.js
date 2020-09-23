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
 * @param {*} callback Function to be called, with the signup process result, which is either  an Error (in case a problem occured) or a JWT Token
 */
exports.signup = (credentials, callback) => {
  // Hash the password using bcrypt
  bcrypt
    .hash(credentials.password, 12)
    // Create a new user with the password hash and provided email
    .then(hash =>
      DBService.addUser({ email: credentials.email, password: hash })
    )
    // Call the provided callback function with a JWT
    .then(() => {
      callback(generateToken({ email: credentials.email }));
    })
    // In case of an error call the callback function
    // with the catched error
    .catch(err => {
      callback(new Error(err));
    });
};
