const mongoose = require('mongoose');
mongoose.set('degub', process.env.DB_DEBUG || false);
mongoose.connect(process.env.DB_URL || 'mongodb://localhost/tcfriends_api');

mongoose.Promise = Promise;

module.exports.Friend = require('../friends/model');
module.exports.User = require('../users/model');
module.exports.Shelter = require('../shelters/model');
module.exports.Photo = require('../photos/model');