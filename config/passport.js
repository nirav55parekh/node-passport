const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
FacebookStrategy = require('passport-facebook').Strategy;
var keys = require("../config/keys");

const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

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
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: keys.GOOGLE_CALLBACK_URL
    },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }, function (err, user) {
          if (err) {
            console.log(err);
          }
          if (!err && user !== null) {
            done(null, user);
          } else {
            user = new User({
              googleId: profile.id,
              loginProvider: profile.provider,
              name: profile.displayName,
              created: Date.now()
            });
            user.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                done(null, user);
              }
            });
          }
        });
      }
    ));

  passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK_CLIENT_ID,
    clientSecret: keys.FACEBOOK_CLIENT_SECRET,
    callbackURL: keys.FACEBOOK_CALLBACK_URL
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) {
          console.log(err);
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          user = new User({
            facebookId: profile.id,
            loginProvider: profile.provider,
            name: profile.displayName,
            created: Date.now()
          });
          user.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              done(null, user);
            }
          });
        }
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};