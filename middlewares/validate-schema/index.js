const { validationResult } = require('express-validator'),
    httpCodes = require('http-status-codes'),
    errorFormatter = ({ location, msg}) => {
        return {}[location]={msg:msg};
    };

module.exports = (req, res, next) =>  {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        res.status(
            req.customValidateStatus ||
            httpCodes.UNPROCESSABLE_ENTITY
        ).send({errors:errors.mapped()});
    } else if (req.rbacErrors) {
        res.status(req.customValidateStatus).send({errors:req.rbacErrors});
        delete req.customValidateStatus;
        delete req.rbacErrors;
    } else {
        next();
    }
};
