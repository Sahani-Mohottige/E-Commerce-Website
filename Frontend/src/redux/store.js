import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
  },
});

export default store;
