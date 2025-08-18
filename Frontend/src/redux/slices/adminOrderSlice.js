import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("userToken");
      if (!token) throw new Error("Not authorized");

      const { data } = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Update order status (admin only)
export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data; // must return updated order object
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Delete order (admin only)
export const deleteAdminOrder = createAsyncThunk(
  "adminOrders/deleteAdminOrder",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
          const idx = state.orders.findIndex((o) => o._id === action.payload._id);
          if (idx !== -1) {
            state.orders[idx] = action.payload; // replace the whole order object
            }
          })
      .addCase(deleteAdminOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload);
      });
  },
});

export default adminOrderSlice.reducer;
