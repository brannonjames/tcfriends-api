const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.isLoggedIn = async function(req, res, next){
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async function(err, decodedUser){
      if(decodedUser){
        res.locals.user = await db.User.findById(decodedUser._id);
        next()
      } else {
        throw Error();
      }
    })

  } catch(err){
    return next({
      status: 401,
      message: 'Please login first'
    })
  }
}

exports.isShelterCreator = async function(req, res, next){
  try {
    let shelter = await db.Shelter.findById(req.params.shelter_id);
    let {_id:userId} = res.locals.user; 
    if(shelter._id.equals(userId)){
      res.locals.shelter = shelter;
      next();
    } else {
      throw Error()
    }
  } catch(err){
    next({
      status: 401,
      message: "You do not ave permission to do that"
    })
  }
}

exports.ensureShelterMod = async function(req, res, next){
  try {
    let shelter = await db.Shelter.findById(req.query.shelterId).populate('moderators');
    let userId = res.locals.user._id;
    res.locals.shelter = shelter;
    let userIsMod = shelter.moderators.some(mod => {
      return mod._id.equals(userId);
    });
    if(userIsMod){
      next();
    } else {
      throw Error()
    }
  } catch(err){
    next({
      status: 401,
      message: "You do not have permission to do that"
    })
  }
}
