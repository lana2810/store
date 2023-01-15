import React from "react";
import Main from "./components/layouts/main";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/layouts/login";
import ProductsSwitch from "./components/productsSwitch";
import AdminPageSwitch from "./components/adminPageSwitch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductProvider from "./hooks/useProduct";
import TagProvider from "./hooks/useTag";
import TypeProvider from "./hooks/useType";
import Cart from "./components/layouts/cart";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/protectedRoute";
import ProtectedRouteAuth from "./components/protectedRouteAuth";
import Logout from "./components/layouts/logout";
import CartProvider from "./hooks/useCart";
const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <CartProvider>
          <ProductProvider>
            <TagProvider>
              <TypeProvider>
                <Switch>
                  <Route path="/" exact component={Main} />
                  <Route
                    path="/products/:productId?/:edit?"
                    component={ProductsSwitch}
                  />
                  <Route path="/login/:type?" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <ProtectedRoute
                    path="/admin/:add?"
                    component={AdminPageSwitch}
                  />
                  <ProtectedRouteAuth>
                    <Route path="/cart" component={Cart} />
                  </ProtectedRouteAuth>
                </Switch>
              </TypeProvider>
            </TagProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};
export default App;
