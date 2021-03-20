const {base64encode} = require("../../lib/base64");
const httpCodes = require('http-status-codes');
const models = require('../../models-repository');
const createError = require("http-errors");
const authUtils = require(__appRoot + '/services/auth-utils');


module.exports.register = async (req, res, next) => {
    try {
        const userDB = await models.users.findOne({where: {email: req.body.email}});
        const token = authUtils.createToken(req.body);

        if (!userDB) {
            req.body.password = base64encode(req.body.password);
            let user = await models.users.create({...req.body});
            user = await models.users.scope('userObject').findByPk(user.id);

            res.send({user, token});
        } else {
            next(createError(httpCodes.UNPROCESSABLE_ENTITY, 'User is already exists'));
        }

    } catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.signIn = async (req, res, next) => {
    try {

        const userDB = await models.users.findOne({where: {email: req.body.email}});

        if (userDB) {
            const token = authUtils.createToken(req.body);

            if (base64encode(req.body.password) !== userDB.password) {
                res.status(httpCodes.BAD_REQUEST).json({message: "Wrong password!"});
            } else {
                const user = await models.users.scope('userObject').findByPk(userDB.id);
                res.send({user, token});
            }
        } else {
            next(createError(httpCodes.UNPROCESSABLE_ENTITY, 'User is not exists'));
        }

    } catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};



module.exports.getMe = async (req, res, next) => {
    try {
        res.send(await models.users.scope('userObject').findByPk(req.user.id));
    } catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};