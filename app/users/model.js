const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email address is required',
    unique: 'That email is already registed'
  },
  password: {
    type: String,
    required: 'You must provide a password'
  },
  displayPhoto: {
    type: String
  },
  name: {
    first: {
      type: String,
      required: 'First name is required'
    },
    last: {
      type: String,
      required: 'Last name is required'
    },
    full: {
      type: String
    }
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter'
  },
  sheltersModerating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shelter'
    }
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friend'
    }
  ]
});

userSchema.pre('save', async function(next){
  try {
    if(this.name.first && this.name.last){
      this.name.full = `${this.name.first} ${this.name.last}`;
    }
    if(!this.isModified('password')){
      next();
    }
    this.password = await bcrypt.hash(this.password, 11);
  } catch(err){
    next(err);
  }
});

userSchema.methods.checkPassword = async function(plainTextPass, next){
  try {
    return await bcrypt.compare(plainTextPass, this.password);
  } catch(err){
    next(err);
  }
}

module.exports = mongoose.model('User', userSchema);
