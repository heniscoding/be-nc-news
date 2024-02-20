const express = require("express");
const app = express();
const { getTopics, getAPI, getArticleById, getArticles, getCommentsById } = require("./controllers/controller");
const { handleCustomErrors, handlePSQLErrors, handleServerErrors } = require("./errors");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getAPI);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsById)

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
