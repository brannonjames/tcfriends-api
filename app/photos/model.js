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
  },
  mimetype: String,
  originalname: String

});

module.exports = mongoose.model('Photo', photoSchema)


// { fieldname: 'file',
//   originalname: '73beb2a70497ca28a9e2d6d7b1056e9b.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'public/images',
//   filename: '73beb2a70497ca28a9e2d6d7b1056e9b.jpg',
//   path: 'public/images/73beb2a70497ca28a9e2d6d7b1056e9b.jpg',
//   size: 31292 }
