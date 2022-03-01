const express = require('express');
const router = express.Router();
const {signupPost,loginPost,logout} = require('../../Controllers/usersController');


router.post('/signup', signupPost);
router.post('/login', loginPost);
router.get('/logout', logout);

module.exports = router;