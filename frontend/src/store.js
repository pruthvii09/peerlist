import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./store/postSlice";

const store = configureStore({
  reducer: {
    post: postReducer,
    // Add other reducers as needed
  },
});

export default store;
