const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controller/users");

usersRouter.get("/users", usersController.findAll);
usersRouter.post("/users/create", usersController.createUser);
usersRouter.patch("/users/update/:id", usersController.updateUser);
usersRouter.delete("/users/delete/:id", usersController.deleteUser);

module.exports = usersRouter;
