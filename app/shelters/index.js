const express = require('express');
const router = express.Router();
const {getAllShelters, addShelter, getShelter} = require('./handlers');
const {isLoggedIn, isShelterCreator} = require('../middleware/auth');

router.route('/')
  .get(getAllShelters) //READ
  .post(isLoggedIn, addShelter) //CREATE

router.route('/:shelter_id')
  .get(getShelter)  //READ
  .delete(isLoggedIn, isShelterCreator) //DELETE



module.exports = router;
