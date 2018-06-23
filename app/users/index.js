const express = require('express');
const router = express.Router({mergeParams: true});
const {handleSignUp, handleLogin, getUser} = require('./handlers');

router.post('/signup', handleSignUp);
router.post('/login', handleLogin);

router.get('/:user_id', getUser);


module.exports = router;
