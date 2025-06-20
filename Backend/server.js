const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 9099;
const startServer = require("../Backend/config/db");
//ROTTE
const usersRoute = require("../Backend/routes/users");
const authorsRoute = require("../Backend/routes/authors");
const postsRoute = require("../Backend/routes/posts");
const commentsRouter = require("./routes/comments");
const authRouter = require("./routes/auth");
const oauthRoute = require("../Backend/routes/oauth.route");
const tokenVerified = require("./middlewares/auth/verifyToken");
const path = require("path");

const server = express();
server.use("/uploads", express.static(path.join(__dirname, "./uploads"))); //cartella che conterrà dei file statici, sempre serviti

server.use(express.json());
server.use(
  cors({
    origin: [
      "https://epicode-m6-fawn.vercel.app",
      "https://epicode-m6-ea0q69w4l-lorenzos-projects-a2690337.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

server.use(tokenVerified);

server.use("/", usersRoute);
server.use("/", authorsRoute);
server.use("/", postsRoute);
server.use("/", commentsRouter);
server.use("/", authRouter);
server.use("/", oauthRoute);

server.use(errorHandler);

startServer(PORT, server);
