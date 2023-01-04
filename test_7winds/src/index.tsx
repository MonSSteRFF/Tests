import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const store = setupStore();

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
