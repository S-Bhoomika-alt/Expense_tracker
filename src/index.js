import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { GlobalProvider } from "./context/GlobalContext";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <GlobalProvider>
      <App />
    </GlobalProvider>
  
);

