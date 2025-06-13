const HttpException = require("../index");

class invalidPostIdException extends HttpException {
  constructor(
    message = "Post ID not Found",
    statusCode = 404,
    error = "The requested postID does not exists!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidPostIdException;
