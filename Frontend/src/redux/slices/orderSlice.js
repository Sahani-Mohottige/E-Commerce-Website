import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

//async thunk to user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/my-orders`, 
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//async thunk to fetch order details by Id
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (fetchOrderDetails, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${fetchOrderDetails}`, 
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        //fetch user orders
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalOrders = action.payload.totalOrders;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch user orders";
            })
            //fetch order details
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch order details";
            });            
    }
})

export default orderSlice.reducer;