import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

import "@fontsource/merriweather/700.css";

import "@fortawesome/fontawesome-free/css/all.css";

import "./index.scss";

const root = document.getElementById("root");

createRoot(root).render(<App />);

// 3:40 - 06.01.2023
