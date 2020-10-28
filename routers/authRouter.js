const express = require("express");
const passport = require("passport");
const { handleKakaoCallback } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/kakao", passport.authenticate("kakao"));
authRouter.get("/kakao/callback", handleKakaoCallback);

module.exports = authRouter;