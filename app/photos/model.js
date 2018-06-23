const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  friend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdDate: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Photo', photoSchema)
