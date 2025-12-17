// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (product, quantity) => {
    if (!product?.id) return;
    if (quantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (!existing) {
        return [...prev, { ...product, quantity }];
      }

      // suma y topea por stock si existe
      const nextQty =
        typeof product.stock === "number"
          ? Math.min(existing.quantity + quantity, product.stock)
          : existing.quantity + quantity;

      return prev.map((p) =>
        p.id === product.id ? { ...p, quantity: nextQty } : p
      );
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const getTotalQuantity = () => cart.reduce((acc, p) => acc + p.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart,
      getTotalQuantity,
      getTotalPrice,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
