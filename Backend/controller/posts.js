const postsService = require("../services/posts");
const invalidPostIdException = require("../exceptions/posts/invalidPostIdException");
const postsNotFoundException = require("../exceptions/posts/postsNotFoundException");
const EmailService = require("../services/email_services");

const email = new EmailService();

const findAll = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const { totalPosts, totalPages, posts } = await postsService.findAll(
      page,
      pageSize
    );

    if (!posts || posts.length === 0) {
      throw new postsNotFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      totalPages,
      totalPosts,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsService.findOne(id);

    if (!post) {
      throw new invalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { body } = req;
    const post = await postsService.createPost(body, body.author);

    /* await email.send(
      "lorenzo.crf.dev@gmail.com",
      "New Post Create Correctly From SendGrid",
      "Ciao sono un test. Hai creato un nuovo post"
    ); */

    res.status(201).send({
      statusCode: 201,
      message: "Post Created",
      post,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const post = await postsService.updatePost(id, body);

    if (!post) {
      throw new invalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post Edited Correctly",
      post,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postsService.deletePost(id);

    if (!post) {
      throw new invalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Post Deleted Correctly",
      post,
    });
  } catch (error) {
    next(error);
  }
};

const uploadFileOnDisk = async (req, res, next) => {
  try {
    const url = `${req.protocol}://${req.get("host")}`;
    const imgUrl = req.file.filename;

    res.status(200).json({
      img: `${url}/uploads/${imgUrl}`,
    });
  } catch (error) {
    next(error);
  }
};

const uploadFileOnCloudinary = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cover = req.file.path;
    const newCoverPost = await postsService.updateCover(id, cover);

    if (!newCoverPost) {
      throw new invalidPostIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Cover Edited Correctly",
      newCoverPost,
    });

    /* res.status(200).json({ img: req.file.path }); restituisce l'url dell'immagine come risposta*/
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const findPostByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;
    const post = await postsService.findPostByTitle(title);

    if (!post || post.length === 0) {
      throw new postsNotFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      post,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  createPost,
  updatePost,
  deletePost,
  uploadFileOnDisk,
  uploadFileOnCloudinary,
  findPostByTitle,
};
