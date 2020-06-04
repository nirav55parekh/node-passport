var BaseController = require('./baseController');
var User = require("../models/User");
const bcrypt = require('bcryptjs');
const passport = require('passport');

class AuthController extends BaseController {
    constructor() {
        super();
        this.user = User;
    }

    login(req, res,next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
              return next(err);
            }

            if (! user) {
              return res.send({ success : false, message : 'authentication failed' });
            }
            
            req.login(user, loginErr => {
              if (loginErr) {
                return next(loginErr);
              }
              return res.send({ success : true, message : 'authentication succeeded' });
            });      
          })(req, res, next);
    }

    async signup(req, res) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const data = { ...req.body, password: hashedPassword };

        const newUser = new this.user(data);

        const response = await newUser.save();

        this.send(res, 200, "User created", response);
    }

    userinfo(req, res) {
        this.send(res, 200, "User", req.user);
    }

    logout(req,res){
        req.logOut();

        this.send(res, 200, "Logged out", true);
    }
}

module.exports = AuthController;