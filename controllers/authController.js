//include controllers
var BaseController = require('./baseController');
var User = require("../models/User");
const bcrypt = require('bcryptjs');

class AuthController extends BaseController {
    constructor() {
        super();
        this.user = User;
    }

    login(req, res) {
        this.send(res, 200, "login ok", {})
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