import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import checkoutReducer from './checkOutSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    checkout: checkoutReducer
  }
});

export default store;
