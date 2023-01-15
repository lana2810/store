import React, { useContext, useEffect, useState } from "react";
import typeService from "../services/type.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const TypeContext = React.createContext();

export const useType = () => {
  return useContext(TypeContext);
};

const TypeProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getType();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  async function getType() {
    try {
      const data = await typeService.get();
      setType(data);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    if (error.response.data) {
      const { message } = error.response.data;
      setError(message);
      setLoading(false);
    }
  }
  return (
    <TypeContext.Provider value={type}>
      {!isLoading ? children : "Loading..."}
    </TypeContext.Provider>
  );
};
TypeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default TypeProvider;
