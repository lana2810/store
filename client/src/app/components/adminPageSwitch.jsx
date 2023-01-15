import React from "react";
import AddProductCard from "./addProductCard";
import AdminPage from "./layouts/adminPage";
import { useParams } from "react-router-dom";

const AdminPageSwitch = () => {
  const params = useParams();
  const { add } = params;
  return <>{add ? <AddProductCard /> : <AdminPage />}</>;
};
export default AdminPageSwitch;
