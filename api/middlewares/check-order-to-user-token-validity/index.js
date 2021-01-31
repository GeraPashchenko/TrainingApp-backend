const
    models = require('../../models-repository'),
    constants = require('../../services/constants'),
    createError = require('http-errors'),
    httpCodes = require('http-status-codes');

module.exports = async (req, res, next) =>  {
    try {
        if (parseInt(req.user.user_role_id) === constants.USER_ROLES.ADMIN ||
            req.user.type === constants.USER_TYPES.GUEST) {
            next();
        } else {
            const
                order = await models.order.findOne({
                    where:{
                        id: req.params.id,
                        userId: req.user.id
                    }
                });
            order ? next() : res.sendStatus(httpCodes.FORBIDDEN);
        }
    } catch (err) {
        next(createError(httpCodes.BAD_REQUEST, err));
    }
};