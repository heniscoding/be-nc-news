const {
    getAllUsers
  } = require("../models/users.models");

exports.getUsers = (req, res, next) => {
    getAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err)
    })
  }