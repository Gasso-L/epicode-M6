const HttpException = require("../index");

class invalidPasswordException extends HttpException {
  constructor(
    message = "Invalid Credentials",
    statusCode = 403,
    error = "Credentials Email or Password are not valid"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidPasswordException;
