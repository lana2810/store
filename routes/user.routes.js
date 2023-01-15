const express = require("express");
const router = express.Router({ mergeParems: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unautorised" });
    }
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  }
});

module.exports = router;
