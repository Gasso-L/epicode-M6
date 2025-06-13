const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    feedback: {
      type: String,
      required: true,
      min: 3,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("comment", CommentSchema, "comments");
