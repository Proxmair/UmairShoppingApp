import {useEffect,useState} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import React from "react";
import Home from './component/Home/Home.js';
import { loadUser } from "./actions/userAction";
import UserOptions from './component/layout/Header/UserOptions.js';
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from './component/Route/ProtectedRoute';
import Products from "./component/Product/Products";
import About from './component/About/About.js';
import Contact from './component/Contact/Contact.js'
import Search from './component/Product/Search.js';
import LoginSignUp from "./component/User/LoginSignup.js";
import ProductDetail from './component/Product/ProductDetail.js';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import BannerList from './component/Admin/BannerList.js';
import NewBanner from './component/Admin/NewBanner.js'
import UpdateBanner from './component/Admin/UpdateBanner.js'
import OrderList from './component/Admin/OrderList.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import Payment from './component/Cart/Payment.js';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
function  App()  {
  const dispatch=useDispatch();
  
  const { isAuthenticated, user } = useSelector(state=>state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  
  async function getStripeApuKey(){
    const {data}=await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    dispatch(loadUser());
    getStripeApuKey();
  }, [dispatch])
 
  
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  
  return (
    <Router>
      
      <Header />
      {isAuthenticated && <UserOptions user={user}/>}
      {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
       )}
          <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/products" component={Products} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route path="/products/:keyword" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={LoginSignUp} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/success" component={OrderSuccess}/>
          <ProtectedRoute exact path="/orders" component={MyOrders}/>
          <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/banners" component={BannerList}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/banner" component={NewBanner}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/banner/:id" component={UpdateBanner}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews}/>
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;

