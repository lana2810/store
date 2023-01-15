const express = require("express");
const router = express.Router({ mergeParams: true });
const Tag = require("../models/Tag");

router.get("/", async (req, res) => {
  try {
    const list = await Tag.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});

module.exports = router;
