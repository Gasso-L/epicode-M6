const HttpException = require("../index");

class invalidTokenException extends HttpException {
  constructor(
    message = "Invalid Token",
    statusCode = 401,
    error = "Token are not valid or missing"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidTokenException;
