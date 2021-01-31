const {base64encode} = require("../../lib/base64");

const httpCodes = require('http-status-codes');
const models = require('../../models-repository');

module.exports.register = async (req, res, next) => {
    try{
        req.body.password = base64encode(req.body.password);

        const user = await models.users.create({...req.body});
        res.send(user);
    }catch (e) {
        next(e);
    }
}

module.exports.signIn = async (req, res, next) =>{
    try{

        const user = await models.users.findOne({where: {email:req.body.email}});
        req.body.password = base64encode(req.body.password);

        if(req.body.password !== user.password){
            res.status(httpCodes.BAD_REQUEST).json({message: "Wrong password!"});
        }

        res.send({user});
    }catch (e){
        next(e);
    }
}