import React, { useContext, useEffect, useState } from "react";
import tagService from "../services/tag.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const TagContext = React.createContext();

export const useTag = () => {
  return useContext(TagContext);
};

const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getTags();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  async function getTags() {
    try {
      const data = await tagService.get();
      setTags(data);
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
    <TagContext.Provider value={tags}>
      {!isLoading ? children : "Loading..."}
    </TagContext.Provider>
  );
};
TagProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default TagProvider;
