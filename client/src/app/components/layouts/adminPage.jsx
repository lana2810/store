import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useType } from "../../hooks/useType";
import TagsList from "../tagsList";
import Pagination from "../pagination";
import { paginate } from "../../utils/paginate";

const AdminPage = () => {
  const { products, deleteProduct } = useProduct();
  const count = products.length;
  const types = useType();
  const history = useHistory();

  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleAdd = () => {
    history.push("/admin/add");
  };

  const handleEdit = (id) => {
    history.push(`/products/${id}/edit`);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };
  const productsCrop = paginate(products, currentPage, pageSize);
  return (
    <>
      <button className="btn btn-danger m-2" onClick={() => handleAdd()}>
        New product
      </button>
      <table className="table table-striped">
        <thead className="table-info">
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID</th>
            <th scope="col">Наименование товара</th>
            <th scope="col">Описание</th>
            <th scope="col">Цена</th>
            <th scope="col">Количество</th>
            <th scope="col">Категория</th>
            <th scope="col">Тэги</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            productsCrop.map((product) => (
              <tr key={product._id}>
                <th scope="row" key={product._id}>
                  <img alt="" src={product.image} width="30" />
                </th>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>10</td>
                <td>
                  {product.type &&
                    types.find((t) => t._id === product.type).name}
                </td>
                <td>{product.tags && <TagsList arr={product.tags} />}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AdminPage;
