var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/authController');
var passport = require("passport");
const {ensureAuthenticated} = require("../config/auth");

var authRoute = function (expressApp) {
    var authController = new AuthController();

    router.post('/login',passport.authenticate('local'), authController.login.bind(authController));
    router.post('/signup', authController.signup.bind(authController));
    router.delete('/logout',ensureAuthenticated, authController.logout.bind(authController));

    router.use(authController.handleServerError.bind(authController));

    expressApp.use('/api', router);
};

module.exports = authRoute;