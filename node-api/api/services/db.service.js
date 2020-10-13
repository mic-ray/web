const mongoose = require("mongoose");

const User = require("../models/user.model");
const Note = require("../models/note.model");

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

/**
 * Find a user in the database
 * @param {*} searchCriteria Criteria to filter the search
 */
exports.findUser = searchCriteria => {
  return User.find(searchCriteria).exec();
};

/**
 * Creates a new Note in the database
 * @param {*} noteData Note data to be added
 */
exports.addNote = noteData => {
  // Add an ID prop to the note data
  noteData._id = new mongoose.Types.ObjectId();
  const note = new Note(noteData);
  // Save the created document and return the promise
  return note.save();
};

/**
 * Find notes in the database
 * @param {*} searchCriteria Criteria to filter the search
 */
exports.findNotes = searchCriteria => {
  return Note.find(searchCriteria).exec();
};
