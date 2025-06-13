const HttpException = require("../index");

class invalidCommentIdException extends HttpException {
  constructor(
    message = "Comment ID not Found",
    statusCode = 404,
    error = "The requested commentId does not exists!"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidCommentIdException;
