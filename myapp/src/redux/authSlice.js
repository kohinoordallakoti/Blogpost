import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage
const savedUser = localStorage.getItem("user");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: savedUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // persist
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // remove on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
