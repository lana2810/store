const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");
const Good = require("../models/Good");

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const item = await Good.findById(productId, req.body, {
      new: true,
    });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Good.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const removedGood = await Good.findById(productId);
    await removedGood.remove();
    res.status(200).send(null);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});
router
  .route("/")
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Good.find({ [orderBy]: equalTo });
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  })
  .post(async (req, res) => {
    try {
      const newGood = await Good.create({
        ...req.body,
      });
      res.status(201).json(newGood);
    } catch (error) {
      res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  });

module.exports = router;
