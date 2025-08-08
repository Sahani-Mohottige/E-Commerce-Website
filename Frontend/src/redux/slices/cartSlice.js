import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

//helper function to retrieve user info and token from localStorage if available
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : {products: [], totalPrice: 0, totalItems: 0};
};

//helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({userId,guestId},{rejectWithValue}) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        params: { userId, guestId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity,size,color, userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId,
        quantity,
        size,
        color,
        userId,
        guestId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); 

//update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, userId, guestId ,size,color}, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId,
        quantity,
        userId,
        guestId,
        size,
        color
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, userId, guestId ,size,color }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: { productId, userId, guestId ,size,color },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//merge guest cart with user cart
export const mergeGuestCart = createAsyncThunk(
  "cart/mergeGuestCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method:"POST",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        data: { userId, guestId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
    initialState: {
        cart :loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], totalPrice: 0, totalItems: 0 };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
                saveCartToStorage(state.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to add item to cart";
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to update item quantity";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to remove item from cart";
            })
            .addCase(mergeGuestCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeGuestCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeGuestCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to merge guest cart";
            });
},
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;