const User = require('../models/User');
const passport = require('passport');

var keys = require("../config/keys");

require('./passport-stratergies/passport-facebook')(passport, User, keys);
require('./passport-stratergies/passport-google')(passport, User, keys);
require('./passport-stratergies/passport-instagram')(passport, User, keys);
require('./passport-stratergies/passport-app-login')(passport, User, keys);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});