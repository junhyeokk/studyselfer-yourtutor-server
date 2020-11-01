const express = require("express");
const { getTests, getTest, postTest } = require("../controllers/testController");

const testRouter = express.Router();

testRouter.get("/", getTests);
testRouter.get("/:id", getTest);
testRouter.post("/:id", postTest);

module.exports = testRouter;