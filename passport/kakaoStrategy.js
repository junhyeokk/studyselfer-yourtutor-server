const passport = require("passport");
const { User } = require("../models");
const KakaoStrategy = require("passport-kakao").Strategy;
require("dotenv").config();

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientID : process.env.KAKAO_ID,
        callbackURL : "/auth/kakao/callback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({
                where : { kakao_id_number : profile.id }
            });

            if (user) {
                done(null, { id : user.id });
            } else {
                const newUser = await User.create({
                    kakao_id_number : profile.id,
                });
                done(null, { id : newUser.id });
            }
        } catch (error) {
            console.log(error);
            done(error);
        }
    }));
}