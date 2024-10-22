import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false }, // Initial state for authentication
  reducers: {
    login(state) {
      state.isLoggedIn = true; // Set the login state to true
    },
    logout(state) {
      state.isLoggedIn = false; // Set the login state to false
    },
  },
});

// Export the actions created by the slice
export const authActions = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
