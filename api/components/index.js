const express = require('express');
const router = express.Router();
const userComponent = require('./user');

router.use('/user', userComponent);


module.exports = router;