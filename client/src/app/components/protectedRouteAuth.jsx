import React from "react";
import { Route, Redirect } from "react-router-dom";
import localStorageService from "../services/localStorage.service";
import PropTypes from "prop-types";

function ProtectedRouteAuth({ component: Component, children, ...rest }) {
  const currentUserId = localStorageService.getUserId();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUserId) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
}
ProtectedRouteAuth.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default ProtectedRouteAuth;
