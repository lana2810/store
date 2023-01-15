import React from "react";
import { Link } from "react-router-dom";
import localStorageService from "../services/localStorage.service";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
  const { currentUser } = useAuth();
  const isAdmin =
    localStorageService.getUserId() === "62fe305f41718780bbbb9891";

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              Main
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Shop
            </Link>
          </li>
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center">
          <Link to="/cart">
            {currentUser && (
              <i className="position-relative bi bi-basket p-2 fs-3"></i>
            )}
          </Link>
          {currentUser ? (
            <Link className="nav-link" aria-current="page" to="/logout">
              Logout
            </Link>
          ) : (
            <Link className="nav-link" aria-current="page" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
