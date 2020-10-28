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
const recommendRouter = require("./routers/recommendRouter");
const authRouter = require("./routers/authRouter");

const app = express();
sequelize.sync();

passportConfig(passport);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(passport.initialize());

app.use(localsMiddleware);

app.get("/", (req, res) => res.send("test"));   // test
app.use("/auth", authRouter);
app.use("/test", setRouter);
app.use("/question", questionRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/try", tryRouter);
app.use("/recommend", recommendRouter);

app.get("/authtest", passport.authenticate("jwt", {session : false}), (req, res) => res.send("asdf"));

module.exports = app;