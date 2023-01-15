const { Schema, model } = require("mongoose");
const schema = new Schema({
  name: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: "Type" },
  description: { type: String },
  num: Number,
  image: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  price: Number,
  rating: Number,
});
module.exports = model("Good", schema);
