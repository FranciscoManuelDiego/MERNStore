const express = require("express");
const category = require("../models/Category");
const router = express.Router();

router.get("/", async (req , res) => {
    const categories = await category.find();
    res.json(categories);
});

module.exports = router;