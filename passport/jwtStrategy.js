const passport = require("passport");
const { User } = require("../models");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

module.exports = (passport) => {
    passport.use(new JwtStrategy({
        jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.JWT_SECRET,
    }, async (jwtPayload, done) => {
        try {
            user = await User.findByPk(jwtPayload.id);
            done(null, user);
        } catch (error) {
            console.log(error);
            done(error);
        }
    }))
}