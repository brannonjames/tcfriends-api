const mongoose = require('mongoose');


const shelterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Shelter name required'
  },
  email: {
    type: String
  },
  city: {
    type: String
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
