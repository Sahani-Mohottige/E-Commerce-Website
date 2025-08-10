import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// Helper: retrieve cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : { products: [], totalPrice: 0, totalItems: 0 };
};

// Helper: save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Helper: calculate total items
const calculateTotalItems = (products) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

// ========================== Async Thunks ==========================

// Fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
    console.log("Calling fetchCart API:", url, { userId, guestId });

    try {
      const response = await axios.get(url, { params: { userId, guestId } });
      return response.data;
    } catch (error) {
      console.error("fetchCart error:", error?.response || error);
      return rejectWithValue(error.response?.data || { message: "Network error" });
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
    console.log("Calling addToCart API:", url);

    try {
      const response = await axios.post(url, {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response.data;
    } catch (error) {
      console.error("addToCart error:", error?.response || error);
      return rejectWithValue(error.response?.data || { message: "Network error" });
    }
  }
);

// Update item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, userId, guestId, size, color }, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
    console.log("Calling updateCartItemQuantity API:", url);

    try {
      const response = await axios.put(url, {
        productId,
        quantity,
        userId,
        guestId,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      console.error("updateCartItemQuantity error:", error?.response || error);
      return rejectWithValue(error.response?.data || { message: "Network error" });
    }
  }
);

// Remove item
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId, guestId, size, color }, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
    console.log("Calling removeFromCart API:", url);

    try {
      const response = await axios.delete(url, {
        data: { productId, userId, guestId, size, color },
      });
      return response.data;
    } catch (error) {
      console.error("removeFromCart error:", error?.response || error);
      return rejectWithValue(error.response?.data || { message: "Network error" });
    }
  }
);

// Merge guest cart
export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`;
    console.log("Calling mergeGuestCart API:", url);

    try {
      const response = await axios.post(url, { userId, guestId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
      });
      return response.data;
    } catch (error) {
      console.error("mergeGuestCart error:", error?.response || error);
      return rejectWithValue(error.response?.data || { message: "Network error" });
    }
  }
);

// ========================== Slice ==========================

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0, totalItems: 0 };
      localStorage.removeItem("cart");
    },
    refreshCart: (state, action) => {
      const cart = action.payload;
      if (cart && typeof cart === "object" && Array.isArray(cart.products)) {
        cart.totalItems = calculateTotalItems(cart.products);
        state.cart = cart;
        saveCartToStorage(state.cart);
      } else {
        console.error("Invalid cart passed to refreshCart:", cart);
      }
    },
    addToCartLocal: (state, action) => {
      const { productId, quantity, size, color, name, image, price } = action.payload;
      const productIndex = state.cart.products.findIndex(
        (p) => p.productId === productId && p.size === size && p.color === color
      );

      if (productIndex > -1) {
        state.cart.products[productIndex].quantity += quantity;
      } else {
        state.cart.products.push({ productId, name, image, price, size, color, quantity });
      }

      state.cart.totalPrice = state.cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
      );
      state.cart.totalItems = calculateTotalItems(state.cart.products);
      saveCartToStorage(state.cart);
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (state, action) => {
      if (!action.payload || typeof action.payload !== "object" || !Array.isArray(action.payload.products)) {
        console.error("Invalid cart payload from API:", action.payload);
        state.error = "Invalid cart data";
        state.loading = false;
        return;
      }
      const cart = action.payload;
      cart.totalItems = calculateTotalItems(cart.products || []);
      state.cart = cart;
      state.loading = false;
      saveCartToStorage(state.cart);
    };

    const handleRejected = (state, action, msg) => {
      state.loading = false;
      state.error = action.payload?.message || msg;
    };

    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCart.fulfilled, handleFulfilled)
      .addCase(fetchCart.rejected, (state, action) => {
        if (action.payload?.message === "Cart not found") {
          state.cart = { products: [], totalPrice: 0, totalItems: 0 };
          state.error = null;
        } else {
          handleRejected(state, action, "Failed to fetch cart");
        }
      })

      .addCase(addToCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addToCart.fulfilled, handleFulfilled)
      .addCase(addToCart.rejected, (state, action) => handleRejected(state, action, "Failed to add item"))

      .addCase(updateCartItemQuantity.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateCartItemQuantity.fulfilled, handleFulfilled)
      .addCase(updateCartItemQuantity.rejected, (state, action) => handleRejected(state, action, "Failed to update quantity"))

      .addCase(removeFromCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeFromCart.fulfilled, handleFulfilled)
      .addCase(removeFromCart.rejected, (state, action) => handleRejected(state, action, "Failed to remove item"))

      .addCase(mergeGuestCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(mergeGuestCart.fulfilled, handleFulfilled)
      .addCase(mergeGuestCart.rejected, (state, action) => handleRejected(state, action, "Failed to merge guest cart"));
  },
});

export const { clearCart, refreshCart, addToCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
