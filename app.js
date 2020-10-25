const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const sequelize = require("./models").sequelize;
const setRouter = require("./routers/setRouter");
const questionRouter = require("./routers/questionRouter");

const app = express();
sequelize.sync();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("test"));   // test
app.use("/test", setRouter);
app.use("/question", questionRouter);

module.exports = app;