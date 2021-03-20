const express = require('express');
const router = express.Router();

const userComponent = require('./user');
const trainingsComponent = require('./training');





router.use('/api/users', userComponent);
router.use('/api/trainings', trainingsComponent)



module.exports = router;