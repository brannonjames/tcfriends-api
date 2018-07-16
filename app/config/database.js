const mongoose = require('mongoose');
mongoose.set('degub', process.env.DB_DEBUG || false);

if (process.env.NODE_ENV === 'PROD') {
  mongoose.connect(process.env.DB_URL);
} else {
  mongoose.connect('mongodb://localhost/tcfriends_api');
}

mongoose.Promise = Promise;

module.exports.Friend = require('../friends/model');
module.exports.User = require('../users/model');
module.exports.Shelter = require('../shelters/model');
module.exports.Photo = require('../photos/model');