const db = require('../config/database');
const jwt = require('jsonwebtoken');

exports.handleSignUp = async function(req, res, next){
  try {
    let user = await db.User.create(req.body);
    let {name, createdDate, _id, email, displayPhoto} = user;
    let token = jwt.sign({
      name,
      createdDate,
      _id,
      email,
      displayPhoto
    }, process.env.JWT_KEY);
    res.status(200).json(token);
  } catch(err){
    if(err.code === 11000){
      return next({
        status: 401,
        message: "That email is already registered"
      })
    } else {
      return next(err);
    }
  }
}

exports.handleLogin = async function(req, res, next){
  try {
    let user = await db.User
    .findOne({
      email: req.body.email
    })
    .populate('shelter', 'name');
    if(!user){
      return next({
        status: 401,
        message: 'Incorrect Email/Password'
      })
    }
    let correctPass = await user.checkPassword(req.body.password)
    if(correctPass){
      let {name, createdDate, _id, email, displayPhoto, shelter, favorites} = user;
      let token = jwt.sign({
        name,
        createdDate,
        _id,
        email,
        displayPhoto,
        shelter,
        favorites
      }, process.env.JWT_KEY);
      res.status(200).json(token);
    } else {
      return next({
        status: 401,
        message: 'Incorrect Email/Password'
      })
    }
  } catch(err){
    next(err);
  }
}

exports.getUser = async function(req, res, next){
  try {
    let user = await db.User.findById(req.params.user_id)
    .populate('shelter', 'name')
    let {_id, email, name, createdDate, displayPhoto, shelter, favorites} = user;
    let token = jwt.sign({
      name,
      createdDate,
      _id,
      email,
      displayPhoto,
      shelter,
      favorites
    }, process.env.JWT_KEY);
    res.status(200).json(token);
  } catch(err){
    err.message = 'User not found';
    next(err);
  }
}


exports.getFavorites = async function(req, res, next){
  try {
    const user = await db.User.findById(res.locals.user._id) 
      .populate({
        path: 'favorites',
        populate: {
          path: 'media.photos'
        }
      })
    res.status(200).json(user.favorites);
  } catch(err) {
    next(err);
  }
}
