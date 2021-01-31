const
    constants = require('../../services/constants'),
    httpCodes = require('http-status-codes');

module.exports = (req, res, next) =>  {
    if (req.user.type === constants.USER_TYPES.GUEST){
        parseInt(req.user.orderId) === parseInt(req.params.id) ? next() :
            res.sendStatus(httpCodes.FORBIDDEN);
    } else {
        next();
    }
};