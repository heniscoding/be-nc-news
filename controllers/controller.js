
const { getAllTopics } = require("../models/models");

exports.getTopics = (req, res, next) => {
  getAllTopics().then((rows) => {
    res.status(200).send({ topics: rows });
  }).catch((err) => {
    next(err)
  })
};