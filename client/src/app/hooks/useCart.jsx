import React, { useContext, useState, useEffect } from "react";
import localStorageService from "../services/localStorage.service";
import cartService from "../services/cart.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const CartContext = React.createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  function getCart() {
    const data = localStorageService.getCartLocalStorage();
    setCart(data);
    return;
  }

  function addCart(item) {
    const newCart = localStorageService.addCartLocalStorage(item);
    getCart();
    return newCart;
  }
  function deleteIdCart(id) {
    const newCart = localStorageService.deleteIdCartLocalStorage(id);
    getCart();
    return newCart;
  }
  async function createOrder(payload) {
    try {
      const data = await cartService.create(payload);
      setCart([]);
      return data;
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    if (error.response.data) {
      const { message } = error.response.data;
      setError(message);
    }
  }
  return (
    <CartContext.Provider value={{ addCart, cart, deleteIdCart, createOrder }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default CartProvider;
