var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var keys = require("../../config/keys");

const User = require('../../models/User');

module.exports = function (passport) {
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
}