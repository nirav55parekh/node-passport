var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport, User, keys) {
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
}
