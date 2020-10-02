const mongoose = require("mongoose");

const User = require("../models/user.model");

/**
 * Connects to the MongoDB database
 */
exports.connect = () => {
  mongoose.connect(process.env.MONGO_URL, {
    // Setting options to handle
    // deprecation warnings
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

/**
 * Creates a new User in the database
 * @param {*} userData Data (E-Mail, Username and Password) of the user to be added
 */
exports.addUser = userData => {
  // Create a new User record
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: userData.email,
    username: userData.username,
    password: userData.password
  });
  // Save the created document and return the promise
  return user.save();
};

exports.findUser = userEmail => {
  return User.find({ email: userEmail }).exec();
};
