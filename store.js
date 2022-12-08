import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/index";
// import thunk from "redux-thunk";
// const middlewares = [thunk];
// const enhancers = [applyMiddleware(...middlewares)];
const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default store;
