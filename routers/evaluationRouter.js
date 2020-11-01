const express = require("express");
const { postEvaluation, getPartsInfos } = require("../controllers/evaluationController");

const evaluationController = express.Router();

evaluationController.get("/select-parts", getPartsInfos);
evaluationController.post("/", postEvaluation);

module.exports = evaluationController;