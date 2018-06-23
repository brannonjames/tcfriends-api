const express = require('express');
const router = express.Router();
const {getAllShelters, addShelter, getShelter} = require('./handlers');
const {isLoggedIn, ensureShelterMod} = require('../middleware/auth');


router.route('/')
  .get(getAllShelters)


router.route('/:shelter_id')
  .get(getShelter)  


router.route('/:user_id')
  .post(isLoggedIn, addShelter)



module.exports = router;
