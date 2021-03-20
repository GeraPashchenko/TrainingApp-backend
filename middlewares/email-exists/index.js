const models = require(__appRoot + '/models-repository');
const httpCodes = require('http-status-codes');
const createError = require('http-errors');

module.exports = async (req, res, next) =>{
    try{
        const email = req.user ? req.user.email : req.body.email;
        const user = await models.users.findOne({where: {email}, attributes: ['email']});

        if(user){
            res.status(httpCodes.BAD_REQUEST).send({message: 'Email already exists'});
        }else{
            next();
        }

    }catch(err){
        console.log(err)
        next(createError(httpCodes.BAD_REQUEST, err))
    }
}
