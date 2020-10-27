const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const sequelize = require("./models").sequelize;
const { localsMiddleware } = require("./middlewares");
const setRouter = require("./routers/setRouter");
const questionRouter = require("./routers/questionRouter");
const bookmarkRouter = require("./routers/bookmarkRouter");
const tryRouter = require("./routers/tryRouter");
const recommendRouter = require("./routers/recommendRouter");

const app = express();
sequelize.sync();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

app.get("/", (req, res) => res.send("test"));   // test
app.use("/test", setRouter);
app.use("/question", questionRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/try", tryRouter);
app.use("/recommend", recommendRouter);

module.exports = app;