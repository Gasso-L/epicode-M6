const invalidTokenException = require("../../exceptions/auth/invalidTokenException");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  //specifico che la rotta login è pubblica e la rotta per creare un nuovo autore, per la registrazione
  if (
    req.path === "/login" ||
    (req.path === "/authors" && req.method === "POST") ||
    req.path === "/github" ||
    req.path === "/github/callback" ||
    req.path === "/google" ||
    req.path === "/google/callback"
  )
    return next();

  const token = req.header("authorization");

  if (!token) {
    throw new invalidTokenException();
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.author = verifiedToken;

    next();
  } catch (error) {
    throw new invalidTokenException();
  }
};

module.exports = verifyToken;
