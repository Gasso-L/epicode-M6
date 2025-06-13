const HttpException = require("../index");

class invalidLogin extends HttpException {
  constructor(
    message = "No Author Found",
    statusCode = 403,
    error = "No Authors Found With These Credentials"
  ) {
    super(message, statusCode, error);
  }
}

module.exports = invalidLogin;
