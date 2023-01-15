import React from "react";
import { useTag } from "../hooks/useTag";
import PropTypes from "prop-types";
const TagsList = ({ arr }) => {
  const tags = useTag();
  const tagsProduct = tags.filter((it) => arr.includes(it._id));
  if (tagsProduct.length === 0) return "-";
  return (
    <>
      {tagsProduct.map((item) => (
        <div key={item._id} className={`m-1 badge bg-${item.color}`}>
          {item.name}
        </div>
      ))}
    </>
  );
};
TagsList.propTypes = {
  arr: PropTypes.array
};
export default TagsList;
