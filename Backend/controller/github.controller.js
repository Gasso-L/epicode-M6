const jwt = require("jsonwebtoken");

const authGithub = async (req, res, next) => {
  try {
    const redirectUrl = `${
      process.env.CLIENT_BASE_URL
    }/success?user=${encodeURIComponent(JSON.stringify(req.user))}`;
    res.redirect(redirectUrl);
  } catch (e) {
    next(e);
  }
};

const manageOauthCallback = async (req, res, next) => {
  try {
    const { user } = req;
    //prendo solo i valori utili
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email || `${user.username}@noemail.github.local`,
      avatar: user.photos[0].value,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const redirectUrl = `${
      process.env.CLIENT_BASE_URL
    }/success?token=${encodeURIComponent(token)}`;

    res.redirect(redirectUrl);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  authGithub,
  manageOauthCallback,
};
