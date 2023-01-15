import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={`list-group-item ${
            item._id === selectedItem ? "active" : ""
          }`}
          onClick={() => onItemSelect(item._id)}
          role="button"
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
GroupList.propTypes = {
  items: PropTypes.array,
  selectedItem: PropTypes.string,
  onItemSelect: PropTypes.func
};
export default GroupList;
