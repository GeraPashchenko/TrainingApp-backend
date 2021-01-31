const { INTERNAL_SERVER_ERROR } = require("http-status-codes");

module.exports = (err, req, res, next) => {
    let statusCode = err.statusCode || INTERNAL_SERVER_ERROR;

    res.status(statusCode).send(err);
};