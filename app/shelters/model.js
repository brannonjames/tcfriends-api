const mongoose = require('mongoose');


const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Shelter name required'
  },
  contact: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String
    },
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    latitude: {
      type: String
    },
    longitude: {
      type: String
    },
  },
  moderators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friend'
    }
  ]
});

module.exports = mongoose.model('Shelter', shelterSchema);
