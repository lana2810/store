const products = [
  {
    _id: "21",
    name: "xnxn",
    description: "cvnfcnc",
    image: "../images/beanie.png",
    price: 20,
    rating: 4,
    type: 101,
    tags: ["12", " 15"]
  },
  {
    _id: "22",
    name: "xgngxgn",
    description: "Dafafafa",
    image: "../images/coat_3823173.png",
    price: 15,
    rating: 4,
    type: 105,
    tags: ["11", "13"]
  },
  {
    _id: "23",
    name: "fgnfng",
    description: "ddddddddddddd",
    image: "../images/dress-7425945.png",
    price: 105,
    rating: 4,
    type: 100,
    tags: ["17", "15"]
  },
  {
    _id: "24",
    name: "fgnfgn",
    description: "",
    image: "../images/dress_1.png",
    price: 50,
    rating: 4,
    type: 100,
    tags: ["12", "17"]
  },
  {
    _id: "25",
    name: "fgngfnf",
    description: "asdsaaaads",
    image: "../images/footwear-7603499.png",
    price: 40,
    rating: 4,
    type: 104,
    tags: ["11", "12"]
  },
  {
    _id: "26",
    name: "fgnfgnfgg",
    description: "ccccccccccc",
    image: "../images/graduation-7186698.png",
    price: 60,
    rating: 4,
    type: 106,
    tags: ["14", "15"]
  },
  {
    _id: "27",
    name: "nvnnf",
    description: "dddddddddddddddd",
    image: "../images/hat-6347608.png",
    price: 60,
    rating: 4,
    type: 103,
    tags: ["10", "12"]
  },
  {
    _id: "20",
    name: "vnxnx",
    description: "adadad",
    image: "../images/baby-shoes.png",
    price: 40,
    rating: 4,
    type: 104,
    tags: ["14", "13"]
  }
];

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(products);
    }, 2000);
  });
const getById = (id) =>
  new Promise((resolve) => {
    const product = products.find((p) => p._id === id);
    window.setTimeout(function () {
      resolve(product);
    }, 2000);
  });
export default {
  fetchAll,
  getById
};
