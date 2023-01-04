import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listReducer from "./reducers/listSlice";

const rootReducer = combineReducers({ listReducer });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
