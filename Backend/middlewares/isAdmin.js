//Middlewares per gestire gli accessi solo all'admin
const idAdmin = (req, res, next) => {
  const { role } = req.body;

  if (role !== "admin") {
    return res.status(403).send({
      message: "You Need To Be An Admin to Access This Resource",
    });
  }

  next();
};

module.exports = isAdmin;
