const users = [
  {
    _id: "21",
    email: "",
    name: "",
    password: "",
    sex: 20
  }
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users);
    }, 2000);
  });
const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex((u) => u._id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem("users", JSON.stringify(users));
    resolve(users[userIndex]);
  });

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(
        JSON.parse(localStorage.getItem("users")).find(
          (user) => user._id === id
        )
      );
    }, 1000);
  });
export default {
  fetchAll,
  getById,
  update
};
