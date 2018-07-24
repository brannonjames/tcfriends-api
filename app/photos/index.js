const express = require('express');
const router = express.Router();
const upload = require('../config/image-storage');
const {isLoggedIn, ensureShelterMod} = require('../middleware/auth');
const { addPhoto } = require('./handlers');

router.route('/friends/:friend_id/images')
  .post(
    isLoggedIn,
    ensureShelterMod,
    upload.single('file'),
    addPhoto
  );

module.exports = router;
