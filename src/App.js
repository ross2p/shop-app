import { Container, CssBaseline } from "@mui/material";
import ResponsiveAppBar from "./component/AppBar/AppBar";
import { Home } from "./component/Home/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./component/Auth/SignIn";
import SignUp from "./component/Auth/SignUp";
import ShoppingCart from "./component/ShoppingCart/ShoppingCart";
import OrderList from "./component/OrderList/OrderList";
import OrderTracking from "./component/OrderTracking/OrderTracking";
import ProductPage from "./component/ProductPage/ProductPage";
import ProductCreate from "./component/ProductCreate/ProductCreate";

import { AppRoutes } from "./utils/routes";
import Profile from "./component/Profile/Profile";
import ProductEdit from "./component/ProductEdit/ProductEdit";
import Orders from "./component/Orders/Orders";

function App() {
  return (
    <>
      <Router>
        <CssBaseline />
        <ResponsiveAppBar>
          <Routes>
            <Route path={AppRoutes.Home} element={<Home />} />
            <Route path={AppRoutes.SignIn} element={<SignIn />} />
            <Route path={AppRoutes.SignUp} element={<SignUp />} />
            <Route path={AppRoutes.Profile} element={<Profile />} />
            <Route path={AppRoutes.ShoppingCart} element={<ShoppingCart />} />
            <Route path={AppRoutes.OrderList} element={<OrderList />} />
            <Route path="/order-trecking/:id" element={<OrderTracking />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/product-edit/:id" element={<ProductEdit />} />
            <Route path="/order" element={<Orders />} />
            <Route path="/product-create" element={<ProductCreate />} />
          </Routes>
          {/* <Footer /> */}
        </ResponsiveAppBar>
      </Router>
    </>
  );
}

export default App;
