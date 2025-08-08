import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
