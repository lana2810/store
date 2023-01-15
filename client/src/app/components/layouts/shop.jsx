import React, { useEffect, useState } from "react";
import Product from "../product";
import Pagination from "../pagination";
import GroupList from "../groupList";
import { useProduct } from "../../hooks/useProduct";
import { useType } from "../../hooks/useType";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

const Shop = () => {
  const { products } = useProduct();
  const types = useType();
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState();
  const [sortBy, setSortBy] = useState("asc");
  const [dataSearchProduct, SetDataSearchProduct] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType]);
  const handleTypeSelect = (item) => {
    setSelectedType(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSorted = () => {
    sortBy === "asc" ? setSortBy("desc") : setSortBy("asc");
  };

  const onChangeSearchProduct = ({ target }) => {
    SetDataSearchProduct(target.value);
  };
  let filteredProducts = selectedType
    ? products.filter((product) => product?.type === selectedType)
    : products;

  filteredProducts = dataSearchProduct
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(dataSearchProduct.toLowerCase())
      )
    : filteredProducts;

  const count = filteredProducts.length;
  const sortedProducts = _.orderBy(filteredProducts, ["price"], [sortBy]);
  const productsCrop = paginate(sortedProducts, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedType();
  };
  return (
    <div className="d-flex justify-content-center">
      {types && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            items={types}
            selectedItem={selectedType}
            onItemSelect={handleTypeSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
          <button className="btn btn-secondary mt-2" onClick={handleSorted}>
            Стоимость
            <i
              className={
                "bi bi-caret-" + (sortBy === "asc" ? "up" : "down") + "-fill"
              }
            >
              {" "}
            </i>
          </button>
        </div>
      )}

      <div className="d-flex flex-column mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="searchProduct"
            placeholder="search...."
            onChange={onChangeSearchProduct}
          />
        </div>
        {count !== 0 ? (
          productsCrop.map((product) => (
            <Product key={product._id} {...product} />
          ))
        ) : (
          <h4>Нет в наличии</h4>
        )}
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Shop;
