const express = require("express");
const router = express.Router({ mergeParams: true });

const Type = require("../models/Type");

router.get("/", async (req, res) => {
  try {
    const list = await Type.find();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});

module.exports = router;
