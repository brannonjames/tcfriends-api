const express = require('express');
const router = express.Router();

const upload = require('../config/image-storage');

const {isLoggedIn, ensureShelterMod} = require('../middleware/auth');
const {
  addFriend,
  getFriends,
  updateFriend,
  getFriend,
  handleNewImages
} = require('./handlers');

router.route('/')
  .get(getFriends)
  .post(isLoggedIn, ensureShelterMod, addFriend)


router.route('/:friend_id')
  .get(getFriend)
  .put(isLoggedIn, updateFriend)

router.route('/:friend_id/images')
  .post(
    isLoggedIn,
    ensureShelterMod,
    upload.single('file'),
    handleNewImages
  );




module.exports = router;
