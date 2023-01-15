import React from "react";
import PropTypes from "prop-types";

const Rating = ({ num }) => {
  const tmp = [];
  for (let i = 0; i < num; i++) {
    tmp.push(i);
  }
  return (
    <>
      {tmp.map((it) => (
        <i key={it} className="bi bi-star-fill"></i>
      ))}
    </>
  );
};
Rating.propTypes = {
  num: PropTypes.number
};
export default Rating;
