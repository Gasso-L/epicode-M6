const AuthorsSchema = require("../models/authors");

const findAll = async (page, pageSize) => {
  const authors = await AuthorsSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("posts", ["_id", "title", "category"]);

  const totalAuthors = await AuthorsSchema.countDocuments();
  const totalPages = Math.ceil(totalAuthors / pageSize);

  return {
    page,
    pageSize,
    totalAuthors,
    totalPages,
    authors,
  };
};

const createAuthor = async (author) => {
  const newAuthor = new AuthorsSchema({
    firstName: author.firstName,
    lastName: author.lastName,
    email: author.email,
    dob: author.dob,
    avatar: author.avatar,
    password: author.password,
  });

  const savedAuthor = await newAuthor.save();

  return {
    message: "Author created correctly",
    savedAuthor,
  };
};

const updateAuthor = async (id, author) => {
  const options = { new: true };
  return AuthorsSchema.findByIdAndUpdate(id, author, options);
};

const deleteAuthor = async (id) => {
  return AuthorsSchema.findByIdAndDelete(id);
};

const updateAuthorAvatar = async (id, avatar) => {
  const options = { new: true };
  return AuthorsSchema.findByIdAndUpdate(id, { avatar }, options);
};

module.exports = {
  findAll,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  updateAuthorAvatar,
};
