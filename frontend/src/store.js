import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./store/postSlice";
import userReducer from "./store/userSlice";
import modalReducer from "./store/modalSlice";
const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    modal: modalReducer,
    // Add other reducers as needed
  },
});

export default store;
