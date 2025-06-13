const CommentSchema = require("../models/comments");
const PostSchema = require("../models/posts");

//Ritorna tutti i commenti di uno specifico post
const findAll = async (page, pageSize, postID) => {
  const comments = await CommentSchema.find({ post: postID })
    .limit(pageSize)
    .skip((page - 1) * pageSize)
    .populate("post", ["category", "title"]);

  const totalComment = await CommentSchema.countDocuments({ post: postID });
  const totalPages = Math.ceil(totalComment / pageSize);

  return {
    page,
    pageSize,
    totalComment,
    totalPages,
    comments,
  };
};

const findSingleComment = async (commentID, postID) => {
  return (
    (await CommentSchema.findOne({
      _id: commentID,
      post: postID,
    }).populate("post", ["category", "title"])) || null
  );
};

const createComment = async (comments, postId) => {
  const post = await PostSchema.findById(postId);

  if (!post) {
    throw new Error("Post non trovato");
  }

  const newComment = new CommentSchema({
    feedback: comments.feedback,
    post: postId,
  });

  const saveComment = await newComment.save();

  await PostSchema.updateOne(
    { _id: post._id },
    { $push: { comments: newComment } }
  );

  return saveComment;
};

//Modifico il commento di un post specifico
const updateSingleComment = async (commentID, feedback) => {
  const options = { new: true };

  return CommentSchema.findByIdAndUpdate(commentID, feedback, options);
};

const deleteComment = async (commentID) => {
  const deleteComment = await CommentSchema.findByIdAndDelete(commentID);

  if (!deleteComment) {
    return null;
  }

  //aggiorno anche il post
  await PostSchema.updateOne(
    { _id: deleteComment.post },
    { $pull: { comments: commentID } }
  );

  return deleteComment;
};

module.exports = {
  findAll,
  createComment,
  findSingleComment,
  updateSingleComment,
  deleteComment,
};
