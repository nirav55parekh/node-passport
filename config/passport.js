const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Load User model
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy({
      clientID: "1049238632240-1n50kghrlk86tqkknrc581rfcjteafcm.apps.googleusercontent.com",
      clientSecret: "0VsNfP6cKzNL3bhoUgmt48vX",
      callbackURL: "/api/google/callback"
    },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};