const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

exports.handleKakaoCallback = (req, res) => {
    passport.authenticate("kakao", {
        session : false,
    }, (error, user) => {
        if (error) {
            res.json(error);
        }

        req.login(user, {session : false}, (error) => {
            if (error) {
                res.json(error);
            }

            const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
            // TODO : check expired
            
            res.json({token});
        })
    })(req, res);
}