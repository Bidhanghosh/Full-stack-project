import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth"; // Ensure the path to authReducer is correct

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // Attach the auth reducer
  },
});

// Export the store as the default export
export default store;
