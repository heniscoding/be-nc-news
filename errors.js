exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === "23502" || err.code === "22P02") {
      res.status(400).send({ error: "Bad request"  });
    } else {
      next(err);
    }
  };
  
  exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ error: err.msg });
    } else {
      next(err);
    }
  };
  
  exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal server error" });
  };