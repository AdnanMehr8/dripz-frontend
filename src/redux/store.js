import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import checkoutReducer from './checkOutSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    checkout: checkoutReducer,
    cartItems: cartReducer
  }
});

export default store;
