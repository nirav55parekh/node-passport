const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  googleId: String,
  facebookId: String,
  loginProvider: String,
  name: String,
  created: Date
});

const User = mongoose.model('users', UserSchema);

module.exports = User;