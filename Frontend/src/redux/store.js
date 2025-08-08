import authReducer from './slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export default store;
