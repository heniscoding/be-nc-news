const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
    if (isNaN(article_id)) {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db
      .query(
        `SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;`,
        [article_id]
      )
      .then((data) => {
        if (!data.rows.length || data.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
        const article = data.rows[0];
        return article;
      });
  };

  exports.getAllArticles = (topic) => {
    if (topic) {
      return db
        .query("SELECT * FROM topics WHERE slug = $1", [topic])
        .then((data) => {
          if (data.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Not found" });
          } else {
            return fetchArticles(topic);
          }
        });
    } else {
      return fetchArticles();
    }
  };

  const fetchArticles = (topic) => {
    let dbQuery = `
      SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      COUNT(comments.comment_id) AS comment_count 
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id`;
  
    let params = [];
  
    if (topic) {
      dbQuery += " WHERE articles.topic = $1";
      params.push(topic);
    }
  
    dbQuery += `
      GROUP BY 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url
      ORDER BY created_at DESC;`;
  
    return db
      .query(dbQuery, params)
      .then((data) => {
        return data.rows;
      })
      .catch((err) => {
        throw err;
      });
  };

  exports.updateArticleVotesById = (article_id, inc_votes) => {
    if (inc_votes === undefined) {
      return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db
      .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
      .then((article) => {
        if (!article.rows.length) {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
        return db
          .query(
            `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *;`,
            [article_id, inc_votes]
          )
          .then((data) => {
            if (!data.rows.length) {
              return Promise.reject({ status: 404, msg: "Not found" });
            }
            return data.rows[0];
          });
      });
  };