const express = require("express");
const {
    getQuestions,
    getQuestion
} = require("../controllers/questionController");

const questionRouter = express.Router();

questionRouter.get("/", getQuestions);
questionRouter.get("/:id", getQuestion);

module.exports = questionRouter;