const express = require("express");
const { postEvaluation } = require("../controllers/evaluationController");

const evaluationController = express.Router();

evaluationController.post("/", postEvaluation);

module.exports = evaluationController;