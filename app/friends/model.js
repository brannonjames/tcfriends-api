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
  age: {
    type: Number
  },
  media: {
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
      }
    ]
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

friendSchema.pre('remove', async function(next){
  try {
    //Remove all photo references
    await db.Photo.remove({
      friend: this._id
    });

    //Remove from shelter
    let shelter = await db.Shelter.findById(this.shelter);
    await shelter.friends.remove(this.id);
    await shelter.save();

    //Remove from users favorites
    let users = await db.User.find({favorites: this.id});
    for(let user of users){
      user.favorites.remove(this.id);
      user.save();
    }
    next();
  } catch(err){
    next(err);
  }
})



module.exports = mongoose.model('Friend', friendSchema)
