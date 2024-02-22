const {
  getAllTopics,
  selectArticleById,
  getAllArticles,
  getCommentsByArticleId,
  postNewComment,
  updateArticleVotesById,
  deleteComment
} = require("../models/models");
const endpoints = require("../endpoints.json");

exports.getTopics = (req, res, next) => {
  getAllTopics()
    .then((rows) => {
      res.status(200).send({ topics: rows });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAPI = (req, res, next) => {
  res.status(200).send(endpoints);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  getAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  postNewComment(article_id, username, body)
  .then((comment) => {
    res.status(201).send({ comment });
  })
  .catch((err) => {
    next(err);
  })
}

exports.updateArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleVotesById(article_id, inc_votes)
  .then((article) => {
    res.status(200).send({ article });
  })
  .catch((err) => {
    next(err);
  })
}

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
  .then((comment) => {
    res.status(204).send({ comment });
  })
  .catch((err) => {
    next(err);
  })
}