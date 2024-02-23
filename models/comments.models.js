const db = require("../db/connection");

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

  exports.deleteComment = (comment_id) => {
    return db
      .query(`SELECT * FROM comments WHERE comment_id = $1;`, [comment_id])
      .then((comment) => {
        if (!comment.rows.length) {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
        return db
          .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
            comment_id,
          ])
          .then((data) => {
            if (!data.rows.length) {
              return Promise.reject({ status: 404, msg: "Not found" });
            }
            return data.rows[0];
          });
      });
  };