const mongoose = require('mongoose');
const { Friend } = require('../config/database');

const photoSchema = new mongoose.Schema({
  url: {
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

photoSchema.pre('remove', async function(next){
  try {
    const friend = await Friend.findById(this.friend);
    friend.media.photos.remove(this._id);
    await friend.save();
    next();
  } catch(err) {
    next(err);
  }
})


module.exports = mongoose.model('Photo', photoSchema);
