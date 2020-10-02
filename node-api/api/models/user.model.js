const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: [true, "E-Mail is required"]
    },
    username: {
      type: String,
      required: [true, "Username is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    }
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
