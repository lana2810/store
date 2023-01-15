const { Schema, model } = require("mongoose");
const schema = new Schema({
  idUser: { type: Schema.Types.ObjectId, ref: "User" },
  idProducts: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Good" },
      num: Number,
    },
  ],
});
module.exports = model("Cart", schema);
