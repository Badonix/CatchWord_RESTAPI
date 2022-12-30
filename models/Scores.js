const mongoose = require("mongoose");

const Scores = new mongoose.Schema(
  {
    Author: {
      type: String,
      required: true,
      unique: true,
    },
    Score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scores", Scores);
