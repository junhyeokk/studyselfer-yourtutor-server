const express = require("express");
const {
    getSets,
    getSet
} = require("../controllers/setController");

const testRouter = express.Router();

testRouter.get("/", getSets);
testRouter.get("/:id", getSet);

module.exports = testRouter;