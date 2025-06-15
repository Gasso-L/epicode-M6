const authorsService = require("../services/authors");
const authorNotFoundException = require("../exceptions/authors/authorNotFoundException");
const invalidAuthorIdException = require("../exceptions/authors/invalidAuthorIdException");
const EmailService = require("../services/email_services");

const email = new EmailService();

const findAll = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const { totalAuthors, totalPages, authors } = await authorsService.findAll(
      page,
      pageSize
    );

    if (!authors || authors.length === 0) {
      throw new authorNotFoundException();
    }

    res.status(200).send({
      statusCode: 200,
      page: Number(page),
      totalPages,
      totalAuthors,
      authors,
    });
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const { body } = req;

    const savedAuthor = await authorsService.createAuthor(body);

    //Quando creo l'autore del post invio una mail a lui
    await email.send(
      body.email,
      "Registrazione Completata",
      "Ciao, grazie per esserti registrato al nostro sito!"
    );

    res.status(201).send({
      statusCode: 201,
      message: "Author Created",
      author: {
        id: savedAuthor.id,
        firstName: savedAuthor.firstName,
        lastName: savedAuthor.lastName,
        email: savedAuthor.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const editAuthor = await authorsService.updateAuthor(id, body);

    if (!editAuthor) {
      throw new invalidAuthorIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Author edited successfully",
      editAuthor,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await authorsService.deleteAuthor(id);

    if (!author) {
      throw new invalidAuthorIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Author deleted",
      author,
    });
  } catch (error) {
    next(error);
  }
};

//Patch avatar author
const uploadAuthorAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const avatarUrl = req.file.path;

    const newAuthorAvatar = await authorsService.updateAuthorAvatar(
      id,
      avatarUrl
    );

    if (!newAuthorAvatar) {
      throw new invalidAuthorIdException();
    }

    res.status(200).send({
      statusCode: 200,
      message: "Avatar Edited Correctly",
      newAuthorAvatar,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  uploadAuthorAvatar,
};
