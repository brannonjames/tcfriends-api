const express = require('express');
const router = express.Router();
const upload = require('../config/image-storage');
const {isLoggedIn, ensureShelterMod} = require('../middleware/auth');
const { addPhoto, deletePhoto } = require('./handlers');

router.route('/friends/:friend_id/images')
  .post(
    isLoggedIn,
    ensureShelterMod,
    upload.single('file'),
    addPhoto
  );

router.route('/friends/:friend_id/images/:image_id')
  .delete(
    isLoggedIn,
    ensureShelterMod,
    deletePhoto
  )  

module.exports = router;
