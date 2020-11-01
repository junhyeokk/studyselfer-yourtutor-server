/*
Program id : STS-S-1000-S
Program name : app.js
Writer : junhyeok(chlwnsgur205@naver.com)
Date : 2020-10-30
Version : 0.9
Description : 
- 서버 엔트리 포인트
*/
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const sequelize = require("./models").sequelize;
const passport = require("passport");
const passportConfig = require("./passport");
const { localsMiddleware } = require("./middlewares");
const setRouter = require("./routers/setRouter");
const questionRouter = require("./routers/questionRouter");
const bookmarkRouter = require("./routers/bookmarkRouter");
const tryRouter = require("./routers/tryRouter");
const recommendationRouter = require("./routers/recommendationRouter");       // 추천 관련 라우터
const authRouter = require("./routers/authRouter");                 // 인증 관련 라우터
const testRouter = require("./routers/testRouter");
const evaluationRouter = require("./routers/evaluationRouter");

const app = express();
sequelize.sync();

passportConfig(passport);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// passport(nodejs 인증 라이브러리) 초기화
app.use(passport.initialize());

app.use(localsMiddleware);

app.get("/", (req, res) => res.send("test"));   // test
app.use("/auth", authRouter);
app.use("/set", setRouter);
app.use("/question", questionRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/try", tryRouter);
app.use("/test", testRouter);
app.use("/recommendation", recommendationRouter);
app.use("/evaluation", evaluationRouter);

app.get("/authtest", passport.authenticate("jwt", {session : false}), (req, res) => res.send("asdf"));

module.exports = app;