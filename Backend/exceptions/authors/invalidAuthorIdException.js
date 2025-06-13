const HttpException = require("../index");

class invalidAuthorIdException extends HttpException {
  constructor(
    message = "Author ID not Found",
    statusCode = 404,
    error = "The requested authorID does not exist!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidAuthorIdException;
