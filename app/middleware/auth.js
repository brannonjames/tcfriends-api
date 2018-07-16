const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.isLoggedIn = async function(req, res, next){
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async function(err, decodedUser){
      if(decodedUser){
        res.locals.user = await db.User.findById(decodedUser._id);
        console.log(res.locals);
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
    console.log(err)
    next({
      status: 401,
      message: "You do not have permission to do that"
    })
  }
}
