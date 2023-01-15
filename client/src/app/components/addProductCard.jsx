import React, { useState } from "react";
import Select from "react-select";
import { useTag } from "../hooks/useTag";
import { useType } from "../hooks/useType";
import { useProduct } from "../hooks/useProduct";
import { useHistory } from "react-router-dom";

const AddProductCard = () => {
  const { createProduct } = useProduct();
  const tags = useTag();
  const types = useType();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    tags: [],
    price: 0,
    rating: 0
  });
  const history = useHistory();

  const transformData = (data) => {
    return data.map((item) => ({ label: item.name, value: item._id }));
  };

  const handleChange = ({ target }) => {
    setProduct((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleChangeTags = (value) => {
    const tmp = [];
    value.map((v) => tmp.push(v.value));
    setProduct((prevState) => ({
      ...prevState,
      tags: tmp
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  if (product) {
    const options = transformData(tags);
    return (
      <>
        <div className="container mt-5 m-auto">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-label">
                  Название
                </label>
                <div className="input-group mb-3">
                  <textarea
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <label htmlFor="description" className="form-label">
                  Описание
                </label>
                <div className="input-group mb-3">
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <label htmlFor="price" className="form-label">
                  Цена (рублей)
                </label>
                <div className="input-group mb-3">
                  <input
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <label htmlFor="type" className="form-label">
                  Тип товара
                </label>
                <div className="input-group mb-3">
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    onChange={handleChange}
                    value={product.type || "Select..."}
                  >
                    <option selected>Select...</option>
                    {types.length > 0 &&
                      types.map((type) => (
                        <option value={type._id} key={type._id}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor={tags} className="form-label">
                    Тэги
                  </label>
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    name="tags"
                    options={options}
                    defaultValue="Select..."
                    onChange={handleChangeTags}
                  ></Select>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mx-auto mt-3"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary w-100 mx-auto mt-3"
                    onClick={() => history.push("/admin")}
                  >
                    <i className="bi bi-caret-left"></i>
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <h3>Loading</h3>;
};

export default AddProductCard;
