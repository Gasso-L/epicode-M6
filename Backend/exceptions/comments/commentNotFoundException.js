const HttpException = require("../index");

class commentNotFoundException extends HttpException {
  constructor(
    message = "Comments not Found",
    statusCode = 404,
    error = "There are no comments"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = commentNotFoundException;
