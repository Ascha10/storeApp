const express = require('express');
const router = express.Router();
const usersController = require('../../Controllers/usersController');


router.post('/signup', usersController.signupPost);
router.post('/login', usersController.loginPost);
router.get('/logout', usersController.logout);

module.exports = router;