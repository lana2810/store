import React from "react";
import ProductCard from "./productCard";
import Shop from "./layouts/shop";
import EditProductCard from "./editProductCard";
import { useParams } from "react-router-dom";

const ProductsSwitch = () => {
  const params = useParams();
  const { productId, edit } = params;
  return (
    <>
      {productId ? (
        edit ? (
          <EditProductCard productId={productId} />
        ) : (
          <ProductCard productId={productId} />
        )
      ) : (
        <Shop />
      )}
    </>
  );
};
export default ProductsSwitch;
