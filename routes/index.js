const express = require("express");
const cors = require("cors");
const router = express.Router({ mergeParams: true });

router.use("/auth", cors(), require("./auth.routes"));
router.use("/products", cors(), require("./good.routes"));
router.use("/tag", cors(), require("./tag.routes"));
router.use("/type", cors(), require("./type.routes"));
router.use("/user", cors(), require("./user.routes"));
router.use("/cart", cors(), require("./cart.routes"));

module.exports = router;
