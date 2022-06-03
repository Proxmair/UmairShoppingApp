import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { productsReducer,productDetailReducer ,newReviewReducer,newProductReducer,productReducer, reviewReducer, productReviewsReducer} from './reducres/productReducre';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducres/userReducer';
import { cartReducer } from './reducres/cartReducer';
import {allOrdersReducer, myOrdersReducer, newOrderReducer,orderDetailsReducer, orderReducer} from './reducres/orderReducer';
import { bannerReducer, bannersReducer, newBannerReducer } from './reducres/bannerReducer';
const reducer=combineReducers({
    products:productsReducer,
    banners:bannersReducer,
    productDetail:productDetailReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrder:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    newBanner:newBannerReducer,
    product:productReducer,
    banner:bannerReducer,
    allOrder:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let innitialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
        shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
      },
    
};

const middleware=[thunk];

const store=createStore(
    reducer,
    innitialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;
