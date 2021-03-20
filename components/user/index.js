const express = require('express');
const router = express.Router();
const userCtrl = require('./user-controller');
const validateSchema = require(__appRoot + '/middlewares/validate-schema');
const emailExists = require(__appRoot + '/middlewares/email-exists');
const schemas = require('./validation-schemas');
const passport = require(__appRoot + '/middlewares/auth');

/**
 * @swagger
 * definitions:
 *   User-sign-up:
 *     type: object
 *     description: object for creating new user
 *     properties:
 *       firstName:
 *         required: true
 *         in: body
 *         type: string
 *         example: John
 *
 *       lastName:
 *         required: true
 *         in: body
 *         type: string
 *         example: Bushes
 *
 *       bodyType:
 *         required: true
 *         in: body
 *         type: string
 *         example: Mesomorph
 *
 *       age:
 *         required: true
 *         in: body
 *         type: number
 *         example: 18
 *
 *       password:
 *         required: true
 *         in: body
 *         type: string
 *         example: mygreatpassword
 *
 *       email:
 *         required: true
 *         in: body
 *         type: string
 *         example: newuser@gmail.com
 *
 *
 *
 *   User-sign-in:
 *     type: object
 *     description: sign in user object
 *     properties:
 *       email:
 *         type: string
 *         in: body
 *         required: true
 *         example: newuser1@gmail.com
 *
 *       password:
 *         type: string
 *         in: body
 *         required: true
 *         example: mygreatpassword
 *
 *
 * /api/users/sign-up:
 *   post:
 *     tags:
 *       - Users
 *     description: Sign Up new user
 *     parameters:
 *       - name: User object
 *         description: new user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User-sign-up'
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User object + token
 *       422:
 *         description: User is already exists
 * */
router.post('/sign-up',
    validateSchema,
    schemas.schemaSignUp,
    userCtrl.register);


/**
 * @swagger
 * /api/users/sign-in:
 *   post:
 *     tags:
 *       - Users
 *     description: sign in new user
 *     parameters:
 *       - name: User object
 *         required: true
 *         in: body
 *         type: string
 *         schema:
 *           $ref: '#/definitions/User-sign-in'
 *
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User object + token
 * */
router.post('/sign-in',
    validateSchema,
    schemas.schemaSignIn,
    userCtrl.signIn);



/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     description: Get my user data
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User object
 *       401:
 *         description: Unauthorized
 * */
router.get('/me',
    passport.authenticate('jwt', {session: false}),
    userCtrl.getMe);

module.exports = router;