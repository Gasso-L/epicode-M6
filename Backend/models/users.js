const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      max: 20,
      min: 2,
    },
    lastName: {
      type: String,
      required: true,
      max: 100,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 8,
    },
    dob: {
      type: Date,
      required: false,
      default: new Date(),
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("user", UserSchema, "users");
