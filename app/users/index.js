const express = require('express');
const router = express.Router({mergeParams: true});
const { isLoggedIn } = require('../middleware/auth')
const {handleSignUp, handleLogin, getUser, getFavorites} = require('./handlers');

router.post('/signup', handleSignUp);
router.post('/login', handleLogin);

router.get('/favorites', isLoggedIn, getFavorites);

router.get('/:user_id', getUser);


module.exports = router;
