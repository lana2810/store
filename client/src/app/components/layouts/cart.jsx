import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import localStorageService from "../../services/localStorage.service";
const Cart = () => {
  const { cart, deleteIdCart, createOrder } = useCart();
  const arr = cart.map((it) => it.num);
  const [value, setValue] = useState(arr);

  const handleInc = (id) => {
    const tmp = [...value];
    ++tmp[id];
    setValue(tmp);
  };

  const handleDec = (id) => {
    const tmp = [...value];
    if (tmp[id] > 0) {
      --tmp[id];
    }
    setValue(tmp);
  };

  const handleDelete = (prodId, index) => {
    deleteIdCart(prodId);
    const tmp = [...value].splice(index, 1);
    setValue(tmp);
  };
  const sum = cart.reduce(
    (sum, item, index) => sum + item.price * value[index],
    0
  );
  const handleSubmit = () => {
    cart.map((it, index) => (it.num = value[index]));
    const idUser = localStorageService.getUserId();
    const idProducts = cart.map((it) => ({ _id: it._id, num: it.num }));
    localStorageService.removeCart();
    createOrder({ idUser, idProducts });
  };
  return (
    <div className="container m-4 ">
      <table className="table table-striped border border-info">
        <thead className="table-info">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование</th>
            <th scope="col">Описание</th>
            <th scope="col">Цена</th>
            <th scope="col">Количество</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cart.length !== 0 ? (
            cart.map((product, index) => (
              <tr key={product._id}>
                <th scope="row" key={product._id}>
                  <img alt="" src={product.image} width="30" />
                </th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{value[index]}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleInc(index)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleDec(index)}
                  >
                    -
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product._id, index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Список пуст</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="float-end">
        <div className="fs-6">{`Итого сумма заказа: ${sum} рублей`}</div>
        <button
          className="btn btn-info text-dark fs-6 m-3"
          onClick={() => handleSubmit()}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Cart;
