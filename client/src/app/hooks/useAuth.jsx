import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import localStorageService from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import config from "../config.json";

export const httpAuth = axios.create({
  baseURL: config.apiEndpoint + "auth/"
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(false);
  // -----------------------
  async function signUp({ email, password }) {
    try {
      const { data } = await httpAuth.post(`signUp`, {
        email,
        password,
        returnSecureToken: true
      });
      console.log(data);
      localStorageService.setTokens(data);
      setCurrentUser(true);
      history.push("/products");
    } catch (error) {
      if (error.response.data.error) {
        const { code, message } = error.response.data.error;
        setError(message);
        if (code === 400) {
          if (message === "EMAIL_EXISTS") {
            const errorObject = {
              email: "Пользователь с таким Email уже существует"
            };
            throw new errorObject();
          }
        }
      }
    }
  }
  // -----------------------
  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      console.log(data);
      localStorageService.setTokens(data);
      setCurrentUser(true);
      history.push("/products");
    } catch (error) {
      if (error.response.data.error) {
        const { code, message } = error.response.data.error;
        setError(message);
        if (code === 400) {
          switch (message) {
            case "INVALID_PASSWORD":
              throw new Error("Email или пароль введены некорректно");
            default:
              throw new Error("Слишком много попыток входа. Попробуйте позже");
          }
        }
      }
    }
  }

  // -----------------------
  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(false);
    history.push("/");
  }
  // -----------------------

  useEffect(() => {
    if (localStorageService.getUserId()) {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default AuthProvider;
