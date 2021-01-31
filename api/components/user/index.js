const express = require('express');
const router = express.Router();
const userCtrl = require('./user-controller');

router.post('/register', userCtrl.register );
router.post('/signIn', userCtrl.signIn);

module.exports = router;