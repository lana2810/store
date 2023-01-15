import React, { useContext, useEffect, useState } from "react";
import productService from "../services/product.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ProductContext = React.createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  async function getProducts() {
    try {
      const data = await productService.get();
      console.log(data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function getProductById(productId) {
    const product = products.find((p) => p._id === productId);
    return product;
  }
  async function updateProduct(payload) {
    try {
      const updatedProduct = await productService.update(payload);
      setProducts((prevState) =>
        prevState.map((item) => {
          if (item._id === updatedProduct._id) {
            return updatedProduct;
          }
          return item;
        })
      );
      return updatedProduct;
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function deleteProduct(item) {
    try {
      await productService.remove(item);
      const tmp = products.filter((product) => product._id !== item._id);
      setProducts(tmp);
      return products;
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function createProduct(item) {
    try {
      const newProduct = await productService.create(item);
      getProducts();
      return newProduct;
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    if (error.response.data) {
      const { message } = error.response.data;
      setError(message);
      setLoading(false);
    }
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        updateProduct,
        deleteProduct,
        createProduct,
        getProductById
      }}
    >
      {!isLoading ? children : "Loading..."}
    </ProductContext.Provider>
  );
};
ProductProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default ProductProvider;
