const mongoose = require('mongoose');
const db = require('../config/database');


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
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend'
  }]
});

shelterSchema.pre('remove', async function (next) {
  try {
    //Remove shelter from creator
    let user = await db.User.findById(this.creator);
    user.shelter = undefined;
    await user.save();

    //Remove shelter from mods
    let users = await db.User.find({
      sheltersModerating: this.id
    });
    for (let user of users) {
      user.sheltersModerating.remove(this.id);
      user.save();
    }

    //delete shelter friends
    let friends = this.friends;
    for (let friend of friends) {
      console.log(friend._id)
      this.friends.remove(friend.id);
    }

    next()
    
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Shelter', shelterSchema);