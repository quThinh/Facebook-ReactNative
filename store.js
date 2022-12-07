import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/index";
// import thunk from "redux-thunk";
// const middlewares = [thunk];
// const enhancers = [applyMiddleware(...middlewares)];
let store = configureStore({ reducer: reducer });
export default store;
