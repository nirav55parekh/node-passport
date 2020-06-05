var InstagramStrategy = require('passport-instagram').Strategy;
var keys = require("../../config/keys");

const User = require('../../models/User');

module.exports = function (passport, User, keys) {
    passport.use(new InstagramStrategy({
        clientID: keys.INSTAGRAM_CLIENT_ID,
        clientSecret: keys.INSTAGRAM_CLIENT_SECRET,
        callbackURL: keys.INSTAGRAM_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ instagramId: profile.id }, function (err, user) {
            if (err) return callback(err);
            if (user) {
                return done(null, user);
            } else {
                user = new User({
                    instagramId: profile.id,
                    loginProvider: profile.provider,
                    name: profile.full_name,
                    bio: profile.bio,
                    counts: profile.counts,
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
    }))
}