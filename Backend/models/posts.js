const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      max: 20,
      min: 2,
    },
    title: {
      type: String,
      required: true,
      max: 100,
      min: 2,
    },
    cover: {
      type: String,
    },
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["minutes", "hours"],
        required: true,
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
    content: {
      type: String,
      required: true,
      min: 2,
    },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "comment", default: [] },
    ],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("post", PostSchema, "posts");
