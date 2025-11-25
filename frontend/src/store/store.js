import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../entities/user/models/user.slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
