// redux/slices/adminSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

//admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:9000/api/admin/login", {
        email,
        password,
      });
      // Save token in localStorage
      localStorage.setItem("adminToken", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
// inside fetchUsers thunk
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:9000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);


// Create, delete, update user thunks (example)
export const createUser = createAsyncThunk(
  "admin/createUser",
  async (user, thunkAPI) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:9000/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Failed to create user");
      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const deleteUser = createAsyncThunk("admin/deleteUser", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await fetch(`http://localhost:9000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateUser = createAsyncThunk("admin/updateUser", async ({ id, role }, thunkAPI) => {
  try {
    const token = localStorage.getItem("adminToken");
    const response = await fetch(`http://localhost:9000/api/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    if (!response.ok) throw new Error("Failed to update user");
    const data = await response.json();
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: { users: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(createUser.fulfilled, (state, action) => { state.users.push(action.payload); })
      .addCase(deleteUser.fulfilled, (state, action) => { state.users = state.users.filter(u => u._id !== action.payload); })
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(u => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      });
  },
});

export default adminSlice.reducer;
