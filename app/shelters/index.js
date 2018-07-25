const express = require('express');
const router = express.Router();
const {getAllShelters, addShelter, getShelter} = require('./handlers');
const {isLoggedIn} = require('../middleware/auth');

router.route('/')
  .get(getAllShelters)
  .post(isLoggedIn, addShelter)

router.route('/:shelter_id')
  .get(getShelter)  

module.exports = router;
