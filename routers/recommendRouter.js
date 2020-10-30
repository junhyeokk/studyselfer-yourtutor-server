const express = require("express");
const { getRecommend } = require("../controllers/recommendController");

const recommendRouter = express.Router();

recommendRouter.get("/", getRecommend);

module.exports = recommendRouter;