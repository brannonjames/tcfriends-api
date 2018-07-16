const express = require('express');
const router = express.Router();
const {isLoggedIn, ensureShelterMod} = require('../middleware/auth');
const {addFriend, getFriends, updateFriend, getFriend} = require('./handlers');

router.route('/')
  .get(getFriends)
  .post(isLoggedIn, ensureShelterMod, addFriend)


router.route('/:friend_id')
  .get(getFriend)
  .put(isLoggedIn, updateFriend)




module.exports = router;
