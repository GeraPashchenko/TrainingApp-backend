const loggerService = require("../../services/logger");

module.exports = function(err, req, res, next) {
    if ( typeof err.statusCode !== "number" || err.statusCode < 500 )
        // use "warn" log level, because the app terminates when using the "error" level
        loggerService.log("warn", err);

    return next(err);
}