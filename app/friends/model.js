const mongoose = require('mongoose');
const db = require('../config/database');

const friendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  media: {
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
      }
    ]
  },
  description: {
    type: String
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  ups: {
    type: Number,
    default: 0
  }
});



module.exports = mongoose.model('Friend', friendSchema)
