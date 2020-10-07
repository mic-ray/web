const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, default: "No description provided" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"]
    },
    createdAt: { type: Date, default: Date.now }
  },
  { collection: "notes" }
);

module.exports = mongoose.model("Note", noteSchema);
