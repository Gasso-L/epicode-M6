const HttpException = require("../index");

class postsNotFoundException extends HttpException {
  constructor(
    message = "Posts Not Founds",
    statusCode = 404,
    error = "There are no Posts to Show"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = postsNotFoundException;
