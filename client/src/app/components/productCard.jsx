import React from "react";
import { useProduct } from "../hooks/useProduct";
import { useHistory } from "react-router-dom";
import Rating from "./rating";
import { useCart } from "../hooks/useCart";
import PropTypes from "prop-types";

const ProductCard = ({ productId }) => {
  const { getProductById } = useProduct();
  const product = getProductById(productId);
  const history = useHistory();

  const handleClick = () => {
    history.push(history.location.pathname + "/edit");
  };
  const { addCart } = useCart();
  const handleBuy = (item) => {
    addCart(item);
    history.push("/cart");
  };
  return (
    <div className="card m-auto w-75">
      <div className="card-body">
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm"
          onClick={handleClick}
        >
          <i className="bi bi-gear"></i>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={product.image} className="rounded-circle" width="150" />
          <div className="d-flex">
            {product.rating && <Rating num={product.rating} />}
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div>
            <h4>{product.name}</h4>
            <p className="text-secondary mb-1">{product.description}</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => handleBuy(product)}
          >
            <i className="bi bi-basket p-2"></i>В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  productId: PropTypes.string
};
export default ProductCard;
