const express = require('express');
const router = express.Router();
const {isLoggedIn, ensureShelterMod} = require('../middleware/auth');
const {addFriend, getFriends, updateFriend, getFriend, deleteFriend} = require('./handlers');

router.route('/')
  .get(getFriends)
  .post(isLoggedIn, ensureShelterMod, addFriend) //create

  
router.route('/:friend_id')
  .get(getFriend) //read
  .put(isLoggedIn, updateFriend) //update
  .delete(deleteFriend) // delete




module.exports = router;
