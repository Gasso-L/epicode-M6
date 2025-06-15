const jwt = require("jsonwebtoken");

const authGoogle = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      firstName: user.name.givenName,
      lastName: user.name.familyName,
      email: user.emails[0].value,
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
  authGoogle,
};
