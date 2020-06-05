var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authController');
var passport = require("passport");
const { ensureAuthenticated } = require("../config/auth");

var authRoute = function (expressApp) {
    var authController = new AuthController();

    router.post('/login', authController.login.bind(authController));
    router.post('/signup', authController.signup.bind(authController));

    router.get('/loginWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));
    router.get('/google/callback', passport.authenticate('google'), authController.googleCallback.bind(authController));

    router.get('/loginWithFacebook', passport.authenticate('facebook'));
    router.get('/facebook/callback', passport.authenticate('facebook'), authController.googleCallback.bind(authController));

    router.get('/loginWithInstagram', passport.authenticate('instagram',{ scope: ['user_profile']}));
    router.get('/instagram/callback', passport.authenticate('instagram'), authController.googleCallback.bind(authController));

    router.get('/userinfo', ensureAuthenticated, authController.userinfo.bind(authController));

    router.delete('/logout', ensureAuthenticated, authController.logout.bind(authController));

    router.use(authController.handleServerError.bind(authController));

    expressApp.use('/api', router);
};

module.exports = authRoute;