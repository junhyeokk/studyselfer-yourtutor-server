const express = require("express");
const { getRecommendation, postRecommendation } = require("../controllers/recommendationController");

const recommendRouter = express.Router();

recommendRouter.get("/", getRecommendation);
recommendRouter.post("/", postRecommendation);

module.exports = recommendRouter;