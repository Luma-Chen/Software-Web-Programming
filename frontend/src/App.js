import { React } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/Product";
import ProductRegister from "./pages/ProductRegister";
import WishList from "./pages/WishList";
import Booking from "./pages/Booking";
import BookingList from "./pages/BookingList";
import "./App.css";
import SellerRegister from "./pages/SellerRegister";
import Seller from "./pages/Seller";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import BeASeller from "./pages/BeASeller";
import MyProducts from "./pages/MyProducts";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route exact path="/product/:id">
            <Product />
          </Route>
          <Route path="/productForm/new">
            <ProductRegister title={"Cadastrar produto"} />
          </Route>
          <Route path="/productForm/:id">
            <ProductRegister title={"Editar produto"} />
          </Route>
          <Route path="/sellerForm/new">
            <SellerRegister title={"Cadastrar vendedor"} />
          </Route>
          <Route path="/sellerForm/:id">
            <SellerRegister title={"Atualizar cadastro do vendedor"} />
          </Route>
          <Route path="/seller">
            <Seller />
          </Route>
          <Route path="/booking/:id">
            <Booking />
          </Route>
          <Route path="/bookingList">
            <BookingList />
          </Route>
          <Route path="/wishList">
            <WishList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/userRegister">
            <UserRegister />
          </Route>
          <Route path="/sellerProfile">
            <BeASeller />
          </Route>
          <Route path="/myProducts">
            <MyProducts />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
