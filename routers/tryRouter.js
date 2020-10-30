const express = require("express");
const { postTry, getTry } = require("../controllers/tryController");

const tryRouter = express.Router();

tryRouter.post("/", postTry);
tryRouter.get("/", getTry);

module.exports = tryRouter;