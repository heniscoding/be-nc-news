
const { getAllTopics } = require("../models/models");
const endpoints = require("../endpoints.json");

exports.getTopics = (req, res, next) => {
  getAllTopics().then((rows) => {
    res.status(200).send({ topics: rows });
  }).catch((err) => {
    next(err)
  })
};

exports.getAPI = (req, res, next) => {
  res.status(200).send(endpoints);
};