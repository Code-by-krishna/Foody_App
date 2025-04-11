const express = require('express');
const router = express.Router();
const controller = require('../controller/index');



router.post('/signup', controller.SignUp);
router.post('/login', controller.Login);



module.exports = router;