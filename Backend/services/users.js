const UserSchema = require("../models/users");

const findAll = async () => {
  return UserSchema.find(); //ritorna tutti i documenti della collezione
};

const createUser = async (user) => {
  const newUser = new UserSchema({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    dob: user.dob,
    role: user.role,
  });

  const savedUser = await newUser.save();
  return {
    message: "User saved successfully",
    user: savedUser,
  };
};

const updateUser = async (user, id) => {
  const options = { new: true };
  return UserSchema.findByIdAndUpdate(id, user, options);
};

const deleteUser = async (id) => {
  return UserSchema.findByIdAndDelete(id);
};

module.exports = {
  findAll,
  createUser,
  updateUser,
  deleteUser,
};
