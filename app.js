const express = require("express");
const cors = require('cors');
const { getTopics } = require("./controllers/topics.controllers");
const { getAPI } = require("./controllers/api.controllers");
const { getArticleById, getArticles, updateArticleById } = require("./controllers/articles.controllers");
const { getCommentsById, postComment, deleteCommentById } = require("./controllers/comments.controllers");
const { getUsers } = require("./controllers/users.controllers");

const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getAPI);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsById);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", updateArticleById);
app.delete("/api/comments/:comment_id", deleteCommentById);
app.get("/api/users", getUsers);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
