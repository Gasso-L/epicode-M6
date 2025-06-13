const usersService = require("../services/users");

const findAll = async (req, res) => {
  try {
    const users = await usersService.findAll();

    if (!users || users.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Users not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { body } = req;
    const user = await usersService.createUser(body);
    res.status(201).send({
      statusCode: 201,
      message: "User Created",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await usersService.updateUser(body, id);

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User edited successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.deleteUser(id);

    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "User delited correctly",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  findAll,
  createUser,
  updateUser,
  deleteUser,
};
