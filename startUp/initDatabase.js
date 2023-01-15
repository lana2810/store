const Good = require("../models/Good");
const goodMock = require("../mock/goods.json");
const Type = require("../models/Type");
const typeMock = require("../mock/types.json");
const Tag = require("../models/Tag");
const tagMock = require("../mock/tags.json");
const User = require("../models/User");
const Token = require("../models/Token");

async function initDatabase() {
  const users = await User.find();
  const goods = await Good.find();
  // if (goods.length !== goodMock.length) {
  //   createInitialEntity(Good, goodMock);
  // }
  // const types = await Type.find();
  // if (types.length !== typeMock.length) {
  //   createInitialEntity(Type, typeMock);
  // }
  // const tags = await Tag.find();
  // if (tags.length !== tagMock.length) {
  //   createInitialEntity(Tag, tagMock);
  // }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}

module.exports = { initDatabase };
