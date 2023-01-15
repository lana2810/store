import React from "react";
import { Link } from "react-router-dom";
import TagsList from "./tagsList";
import PropTypes from "prop-types";

const Product = ({ _id, name, description, image, price, tags }) => {
  return (
    <Link to={`/products/${_id}`} className="text-link">
      <div className="card mb-3">
        <h5 className="card-title m-2">{name}</h5>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column">
            <img alt="" src={image} width="50" />

            <TagsList arr={tags} />
          </div>
          <p className="text-secondary align-self-start">{description}</p>
          <h6 className="align-self-end">
            <span className="badge bg-secondary">{`Цена ${price} p.`}</span>
          </h6>
        </div>
      </div>
    </Link>
  );
};

Product.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  type: PropTypes.string,
  tags: PropTypes.array
};
export default Product;
