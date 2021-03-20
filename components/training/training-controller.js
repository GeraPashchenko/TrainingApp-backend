const httpCodes = require('http-status-codes');
const models = require(__appRoot + '/models-repository');
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");

module.exports.createTraining = async (req, res, next) => {
    try{
        if(!req.file) next(createError(httpCodes.INTERNAL_SERVER_ERROR, "Error while file uploading"));

        req.body.userId = req.user.id;
        req.body.trainingPicture = req.file.filename;

        const training = await models.trainings.findRecord(req.body);

        if(!training){
            res.send(await models.trainings.create({...req.body, likes: 0, reviews: 0}));
        }else{
            next(createError(httpCodes.UNPROCESSABLE_ENTITY, "Training like this is already exists"));
        }
    }catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.getImage = async (req, res, next) => {
    try{
        fs.access(path.join(__appRoot + "/" + process.env.FILE_UPLOAD_DIR + "/" + req.query.fileName), (err) => {
            if(err) next(createError(httpCodes.INTERNAL_SERVER_ERROR, err));
            res.sendFile(path.join(__appRoot + "/" + process.env.FILE_UPLOAD_DIR + "/" + req.query.fileName));
        } );
    }catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
}


module.exports.getAllTrainings = async (req, res, next) => {
    try{
        res.send(await models.trainings.findAndPaginate(req.query, 'findWithAuthor'));
    }catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.saveTraining = async (req, res, next) => {
    try {
        const saved_training = await models.user_saved_trainings.findSavedTraining({
            trainingId: req.body.trainingId,
            userId: req.user.id
        });

        if (!saved_training) {
            await models.user_saved_trainings.create({
                trainingId: req.body.trainingId,
                userId: req.user.id
            });

            res.send("Successfully saved");
        } else {
            next(createError(httpCodes.UNPROCESSABLE_ENTITY, 'Training is already saved'));
        }
    } catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.getSavedTrainings = async (req, res, next) => {
    try {
        res.send(await models.user_saved_trainings.findAndPaginate(req.query, {method: ['savedTrainings', req.user.id]}));
    } catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.getUserTrainings = async (req, res, next) => {
    try{
        if(req.query.userId){
            res.send(await models.trainings.findAndPaginate(req.query,{method: ['findByUserId', req.query.userId]}));
        }else{
            res.send(await models.trainings.findAndPaginate(req.query,{method: ['findByUserId', req.user.id]}));
        }

    }catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.adjustReview = async (req, res, next) => {
    try{
      const training = await models.trainings.findByPk(req.body.trainingId);

      if(training){
          res.send(await training.update({reviews: training.reviews + 1}));
      }else {
          next(createError(httpCodes.UNPROCESSABLE_ENTITY, "Training like this is not exists"));
      }
    }catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};


module.exports.like = async (req, res, next) => {
    try{
        const training = await models.trainings.findByPk(req.body.trainingId);
        const liked = await models.user_liked_trainings.findAndPaginate(req.body,
            {method: ['liked', {trainingId: req.body.trainingId, userId: req.user.id}]});

        if(training && !liked.data.length){
            await models.user_liked_trainings.create(
                {
                    userId: req.user.id,
                    trainingId: req.body.trainingId
                });

            res.send(await training.update({likes: training.likes + 1}));
        }else if(!training){
            next(createError(httpCodes.UNPROCESSABLE_ENTITY, "Training like this is not exists"));
        }else if(liked.data.length){
            next(createError(httpCodes.INTERNAL_SERVER_ERROR, "Training is already liked by you!"));
        }
    }catch (e) {
        next(createError(httpCodes.INTERNAL_SERVER_ERROR, e));
    }
};

