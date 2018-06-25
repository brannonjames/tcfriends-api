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

shelterSchema.pre('remove', async function(next){
  try {
   let friends = this.friends;
   let user = await db.Shelter.findById(this.creator);
   user.shelter.remove();
   for(let friend of friends){
     friend.remove();
   }
  } catch(err){

  }
})

module.exports = mongoose.model('Shelter', shelterSchema);
