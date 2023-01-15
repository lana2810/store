import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
function ProtectedRoute({ component: Component, children, ...rest }) {
  const { isAdmin } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAdmin) {
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
ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default ProtectedRoute;
