const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Author = require("../models/authors");
const invalidLogin = require("../exceptions/auth/invalidLogin");
const invalidPasswordException = require("../exceptions/auth/invalidPasswordException");
const invalidTokenException = require("../exceptions/auth/invalidTokenException");

const login = async (email, password) => {
  const author = await Author.findOne({ email });

  if (!author) {
    throw new invalidLogin();
  }

  const isPasswordValid = await bcrypt.compare(password, author.password);

  if (!isPasswordValid) {
    throw new invalidPasswordException();
  }

  const token = jwt.sign(
    {
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );

  return {
    token,
  };
};

const authorDetail = async (token) => {
  if (!token) {
    throw new invalidTokenException();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const author = await Author.findOne({ email: decoded.email });

    if (!author) {
      throw new invalidTokenException();
    }

    return {
      firstName: author.firstName,
      lastName: author.lastName,
      email: author.email,
    };
  } catch (error) {
    throw new invalidTokenException();
  }
};

module.exports = { login, authorDetail };
