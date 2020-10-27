const express = require("express");
const { postBookmark, getBookmark, deleteBookmark } = require("../controllers/bookmarkController");

const bookmarkRouter = express.Router();

bookmarkRouter.post("/", postBookmark);
bookmarkRouter.get("/", getBookmark);
bookmarkRouter.delete("/", deleteBookmark);

module.exports = bookmarkRouter;