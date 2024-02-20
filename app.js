const express = require("express");
const app = express();
const { getTopics, getAPI, getArticleById, getArticles } = require("./controllers/controller");
const { handleCustomErrors, handlePSQLErrors } = require("./errors");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getAPI);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);

module.exports = app;
