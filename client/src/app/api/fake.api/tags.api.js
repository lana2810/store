const tags = [
  {
    _id: "10",
    name: "Каждый день",
    color: "primary"
  },
  {
    _id: "11",
    name: "Свадьба",
    color: "secondary"
  },
  {
    _id: "12",
    name: "Спорт",
    color: "success"
  },
  {
    _id: "13",
    name: "Офис",
    color: "danger"
  },
  {
    _id: "14",
    name: "Вечеринка",
    color: "info"
  },
  {
    _id: "15",
    name: "Сон",
    color: "dark"
  },
  {
    _id: "16",
    name: "Отдых",
    color: "info"
  },
  {
    _id: "17",
    name: "Дом",
    color: "info"
  }
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(tags);
    }, 2000);
  });

export default {
  fetchAll
};
