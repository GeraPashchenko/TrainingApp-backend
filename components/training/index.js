const express = require('express');
const router = express.Router();
const trainingCtrl = require('./training-controller');
const validateSchema = require(__appRoot + '/middlewares/validate-schema');
const emailExists = require(__appRoot + '/middlewares/email-exists');
const schemas = require('./validation-schemas');
const paginate = require(__appRoot + '/services/paginate');
const passport = require(__appRoot + '/middlewares/auth');
const { multerConfigured } = require(__appRoot + '/services/multer');

/** @swagger
 * definitions:
 *   Training:
 *     type: object
 *     properties:
 *       trainingType:
 *         in: body
 *         required: true
 *         type: string
 *         example: Muscle gain
 *
 *       exercises:
 *         in: body
 *         required: true
 *         type: string
 *         example: "[{'name':'Bench Press','repeats':12}]"
 *
 *       trainingName:
 *         in: body
 *         required: true
 *         type: string
 *         example: My Muscle Gain training
 *
 *       trainingPicture:
 *         description: path to file
 *         in: body
 *         required: true
 *         type: string
 *         example: 'data/Rainbow.jpg'
 *
 *
 *
 * /api/trainings/:
 *  post:
 *     tags:
 *       - Trainings
 *     description: Create new training
 *     parameters:
 *       - name: Organization object
 *         type: object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Training'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Training is already exists
 *
 */
router.post('/',
    multerConfigured,
    validateSchema,
    schemas.schemaCreateTraining,
    passport.authenticate('jwt', { session: false }),
    trainingCtrl.createTraining
);


/** @swagger
 * /api/trainings/:
 *   get:
 *     tags:
 *       - Trainings
 *     description: Get all trainings
 *     parameters:
 *       - name: limit
 *         description: specify how much trainings to return
 *         in: query
 *         required: false
 *         type: number
 *         example: 20
 *       - name: offset
 *         description: specify how much trainings to skip
 *         in: query
 *         required: false
 *         type: number
 *         example: 0
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All trainings
 */
router.get('/',
    validateSchema,
    schemas.schemaGetAllTrainings,
    paginate.limitOffset,
    trainingCtrl.getAllTrainings);


/**
 * @swagger
 * /api/trainings/saved-trainings:
 *   get:
 *     tags:
 *       - Trainings
 *     description: Get user's saved trainings
 *     parameters:
 *       - name: limit
 *         description: specify how much trainings to return
 *         in: query
 *         required: false
 *         type: number
 *         example: 20
 *       - name: offset
 *         description: specify how much trainings to skip
 *         in: query
 *         required: false
 *         type: number
 *         example: 0
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Saved trainings list
 *       401:
 *         description: Unauthorized
 * */
router.get('/saved-trainings',
    validateSchema,
    schemas.schemaGetAllTrainings,
    paginate.limitOffset,
    passport.authenticate('jwt', {session: false}),
    trainingCtrl.getSavedTrainings);

/**
 * @swagger
 * /api/trainings/user-trainings:
 *   get:
 *     tags:
 *       - Trainings
 *     description: Get all trainings that were created by specific user or me
 *     parameters:
 *       - name: userId
 *         type: number
 *         in: query
 *         required: false
 *         example: 5
 *       - name: limit
 *         description: specify how much trainings to return
 *         in: query
 *         required: false
 *         type: number
 *         example: 20
 *       - name: offset
 *         description: specify how much trainings to skip
 *         in: query
 *         required: false
 *         type: number
 *         example: 0
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Saved trainings list
 *       401:
 *         description: Unauthorized
 * */
router.get('/user-trainings',
    validateSchema,
    schemas.schemaGetUserTrainings,
    passport.authenticate('jwt', {session: false}),
    trainingCtrl.getUserTrainings);



/**
 * @swagger
 * /api/trainings/save-training:
 *   post:
 *     tags:
 *       - Trainings
 *     description: Save training to user's library
 *     parameters:
 *       - name: Body
 *         type: object
 *         required: true
 *         in: body
 *         schema:
 *           properties:
 *             trainingId:
 *               type: number
 *               required: true
 *               in: body
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Saved successfully
 *       401:
 *         description: Unauthorized
 * */
router.post('/save-training',
    validateSchema,
    schemas.schemaSaveTraining,
    passport.authenticate('jwt', {session: false}),
    trainingCtrl.saveTraining);



/**
 * @swagger
 * /api/trainings/adjust-review:
 *   post:
 *     tags:
 *       - Trainings
 *     description: Adjust reviews counter of the training
 *     parameters:
 *       - name: Body
 *         type: object
 *         required: true
 *         in: body
 *         schema:
 *           properties:
 *             trainingId:
 *               type: number
 *               required: true
 *               in: body
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Updated training object
 *       401:
 *         description: Unauthorized
 * */
router.post('/adjust-review',
    validateSchema,
    schemas.schemaTrainingId,
    passport.authenticate('jwt', {session: false}),
    trainingCtrl.adjustReview);


/**
 * @swagger
 * /api/trainings/like-review:
 *   post:
 *     tags:
 *       - Trainings
 *     description: Adjust likes counter of the training
 *     parameters:
 *       - name: Body
 *         type: object
 *         required: true
 *         in: body
 *         schema:
 *           properties:
 *             trainingId:
 *               type: number
 *               required: true
 *               in: body
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Updated training object
 *       401:
 *         description: Unauthorized
 * */
router.post('/like-review',
    validateSchema,
    schemas.schemaTrainingId,
    passport.authenticate('jwt', {session: false}),
    trainingCtrl.like);


router.get('/image', trainingCtrl.getImage);

module.exports = router;