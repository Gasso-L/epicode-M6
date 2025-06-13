const HttpException = require("../index");

class authorNotFoundException extends HttpException {
  constructor(
    message = "Author not Found",
    statusCode = 404,
    error = "There are no Authors to show"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = authorNotFoundException;
