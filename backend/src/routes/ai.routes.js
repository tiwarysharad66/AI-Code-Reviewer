const express = require("express");
const { getReview } = require("../controllers/aiController.js");
const router = express.Router();

router.post("/get-review", getReview);

module.exports = router;

//ye controller is used to handle the AI response generation
// this is controller not created here it is created under controller in src foldrer but in production everything has its own space in folder but in routes we only batate ha controller
