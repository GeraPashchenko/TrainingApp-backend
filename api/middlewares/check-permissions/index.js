const
    rbac = require(__appRoot + '/lib/rbac'),
    constants = require(__appRoot + '/services/constants'),
    httpCodes = require('http-status-codes'),
    createCustomError = (req, field, message) => {
        req.customValidateStatus = httpCodes.FORBIDDEN;
        if (!req.rbacErrors){
            req.rbacErrors = {};
        }
        req.rbacErrors[field] = {
            msg: message
        };
    };
    getAction = (url, id,  method) => {
        const parsedUrl = url.split('/api')[1].split('/');
        let entity;
        parsedUrl.splice(parsedUrl.indexOf(''), 1);
        if (parsedUrl.length > 1 && id) {
            entity =  parsedUrl[parsedUrl.indexOf(id.toString()) - 1 ];
        } else {
            entity = parsedUrl.join(':');
        }
        console.log(`${entity}:${method}`);
        return `${entity}:${method}`;
    };

module.exports = (req, res, next) =>  {
    if (req.user){
        let
            userType;

        parseInt(req.user.user_role_id) === constants.USER_ROLES.ADMIN ?
            userType = 'Admin' : userType = req.user.type;

        rbac.can(userType, getAction(req.originalUrl, req.params.id, req.method.toLowerCase()))
            .then((allowed) => {
                if (allowed) {
                    next();
                } else {
                    createCustomError(req, 'rbac', 'Action not allowed.');
                    next();
                }
            });
    } else {
        next();
    }
};
