// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// React Router
import { BrowserRouter } from "react-router-dom";

// Bootstrap (CSS + JS para el toggler)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Estilos propios
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <ToastContainer position="bottom-right" autoClose={1800} />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
