const authService = require("../services/auth");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, author } = await authService.login(email, password);

    res.header("authorization", token).status(200).send({
      statusCode: 200,
      message: "Login successfully",
      token,
      authorId: author.id,
    });
  } catch (error) {
    next(error);
  }
};

const authorDetail = async (req, res, next) => {
  try {
    const token = req.header("authorization");
    const userData = await authService.authorDetail(token);

    res.status(200).send({
      statusCode: 200,
      message: "Author Info",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, authorDetail };
