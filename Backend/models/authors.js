const bcrypt = require("bcrypt"); //criptare le password
const mongoose = require("mongoose");

const AuthorsSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      max: 100,
      min: 2,
      required: true,
    },
    lastName: {
      type: String,
      max: 100,
      min: 2,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: false,
      default: new Date(),
    },
    avatar: {
      type: String,
      required: false,
      default: "https://picsum.photos/300/300",
    },
    password: {
      type: String,
      min: 8,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post", default: [] }],
  },
  { timestamps: true, strict: true }
);

//cripto la password con bcrypt
AuthorsSchema.pre("save", async function (next) {
  const author = this;

  if (!author.isModified()) {
    return next;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    author.password = await bcrypt.hash(author.password, salt);

    next();
  } catch (error) {
    next(e);
  }
});

module.exports = mongoose.model("author", AuthorsSchema, "authors");
