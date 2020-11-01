const express = require("express");
const { getRecommendation, postRecommendation } = require("../controllers/recommendationController");

const recommendRouter = express.Router();

recommendRouter.get("/", getRecommendation);
recommendRouter.get("/", postRecommendation);

module.exports = recommendRouter;