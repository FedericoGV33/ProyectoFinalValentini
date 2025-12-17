// src/App.jsx
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

export default function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer greeting="Welcome to Aurel! Find your favorite pieces." />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Category results" />}
        />

        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      </Routes>
    </>
  );
}
