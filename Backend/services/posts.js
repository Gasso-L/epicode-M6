const authors = require("../models/authors");
const PostSchema = require("../models/posts");

//Ritorna tutti i post
const findAll = async (page, pageSize) => {
  const posts = await PostSchema.find()
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("author")
    .populate("comments", "feedback");

  const totalPosts = await PostSchema.countDocuments();
  const totalPages = Math.ceil(totalPosts / pageSize);

  return {
    page,
    pageSize,
    totalPosts,
    totalPages,
    posts,
  };
};

//Cerca un singolo post per id
const findOne = async (id) => {
  return PostSchema.findById(id);
};

//Crea il post
const createPost = async (post, authorId) => {
  //query per trovare l'autore per quel determinato post
  const author = await authors.findOne({ _id: authorId });

  const newPost = new PostSchema({
    category: post.category,
    title: post.title,
    cover: post.cover,
    readTime: {
      value: post.readTime.value,
      unit: post.readTime.unit,
    },
    author: post.author,
    content: post.content,
  });

  const savedPost = await newPost.save();
  //associo quel post a quel determinato autore
  await authors.updateOne({ _id: author._id }, { $push: { posts: newPost } });

  return {
    message: "Post saved correctly",
    post: savedPost,
  };
};

//Modifico il post tramite id
const updatePost = async (id, post) => {
  const options = { new: true };
  return PostSchema.findByIdAndUpdate(id, post, options);
};

//Update Cover Img
const updateCover = async (id, cover) => {
  const options = { new: true };
  return PostSchema.findByIdAndUpdate(id, { cover }, options);
};

//Cancello il post tramite id
const deletePost = async (id) => {
  const deletepost = await PostSchema.findByIdAndDelete(id);
  //aggiorno anche l'autore, togliendo il post id
  await authors.updateOne({ _id: deletepost.author }, { $pull: { posts: id } });

  return deletepost;
};

module.exports = {
  findAll,
  findOne,
  createPost,
  updatePost,
  deletePost,
  updateCover,
};
