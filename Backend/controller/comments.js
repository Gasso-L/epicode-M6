const commentsService = require("../services/comments");
const commentNotFoundException = require("../exceptions/comments/commentNotFoundException");
const invalidCommentIdException = require("../exceptions/comments/invalidCommentIdException");

const findAll = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const { id } = req.params;

    const { totalComments, totalPages, comments } =
      await commentsService.findAll(page, pageSize, id);

    if (!comments || comments.length === 0) {
      throw new commentNotFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      totalPages,
      totalComments,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

const findSingleComment = async (req, res, next) => {
  try {
    const { id, commentId } = req.params;

    const comment = await commentsService.findSingleComment(commentId, id);

    if (!comment || comment.length === 0) {
      throw new invalidCommentIdException();
    }

    res.status(200).send({
      statusCode: 200,
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const comment = await commentsService.createComment(body, id);

    res.status(200).send({
      statusCode: 201,
      message: "Comment Created",
      comment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateSingleComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const { body } = req;

    const comment = await commentsService.updateSingleComment(commentId, body);

    if (!comment) {
      throw new invalidCommentIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Comment edited correctly",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const comment = await commentsService.deleteComment(commentId);

    if (!comment) {
      throw new invalidCommentIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Comment deleted correctly",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  createComment,
  findSingleComment,
  updateSingleComment,
  deleteComment,
};
