import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import checkoutReducer from './checkOutSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    checkout: checkoutReducer,
    cartItems: cartReducer,
    orders: orderReducer
  }
});

export default store;
