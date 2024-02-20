const db = require("../db/connection");

exports.getAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((result) => {
    return result.rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      const article = result.rows[0];
      return article;
    });
};

exports.getAllArticles = () => {
  return db
    .query(
      `
  SELECT 
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments.comment_id) AS comment_count
FROM 
  articles
LEFT JOIN 
  comments ON articles.article_id = comments.article_id
GROUP BY 
  articles.article_id
ORDER BY 
  articles.created_at DESC;`
    )
    .then((result) => {
      const articles = result.rows;
      return articles;
    });
};

exports.getCommentsByArticleId = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return db
        .query(
          `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
          [article_id]
        )
        .then((data) => {
          const comments = data.rows;
          return comments;
        });
    });
};

exports.postNewComment = (article_id, author, body) => {
  if (!author || !body) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows: articles }) => {
      if (!articles.length)
        return Promise.reject({ status: 404, msg: "Not found" });
      return db.query("SELECT * FROM users WHERE username = $1", [author]);
    })
    .then(({ rows: users }) => {
      if (!users.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return db
        .query(
          `INSERT INTO comments (article_id, author, body)
          VALUES ($1, $2, $3) RETURNING *;`,
          [article_id, author, body]
        )
        .then(({ rows: [comment] }) => {
          return comment;
        });
    });
};
