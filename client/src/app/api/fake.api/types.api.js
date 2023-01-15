const types = [
  { _id: "100", name: "Платье" },
  { _id: "101", name: "Жакет" },
  { _id: "102", name: "Шорты" },
  { _id: "103", name: "Брюки" },
  { _id: "104", name: "Обувь" },
  { _id: "105", name: "Куртка" },
  { _id: "106", name: "Пальто" }
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(types);
    }, 2000);
  });

export default {
  fetchAll
};
