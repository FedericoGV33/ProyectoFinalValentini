// src/components/CheckoutForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function CheckoutForm() {
  const { cart, getTotalPrice, clearCart } = useCart();

  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const total = getTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!buyer.name.trim() || !buyer.phone.trim() || !buyer.email.trim()) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {
      const createdOrderId = await runTransaction(db, async (transaction) => {
        // 1) verificar stock y descontar
        for (const item of cart) {
          const productRef = doc(db, "products", item.id);
          const productSnap = await transaction.get(productRef);

          if (!productSnap.exists()) {
            throw new Error(`Product not found: ${item.name}`);
          }

          const currentStock = productSnap.data().stock ?? 0;

          if (currentStock < item.quantity) {
            throw new Error(`Not enough stock for: ${item.name}`);
          }

          transaction.update(productRef, {
            stock: currentStock - item.quantity,
          });
        }

        // 2) crear orden
        const orderRef = doc(collection(db, "orders"));
        transaction.set(orderRef, {
          buyer,
          items: cart.map(({ id, name, price, quantity }) => ({
            id,
            name,
            price,
            quantity,
          })),
          total,
          createdAt: serverTimestamp(),
        });

        return orderRef.id;
      });

      setOrderId(createdOrderId);
      clearCart();
    } catch (err) {
      console.error(err);
      setError(err?.message || "Checkout failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section className="container py-4 px-3">
        <h1 className="h3 mb-2">Order completed ✅</h1>
        <p className="mb-2">Your order ID is:</p>
        <p className="fw-bold">{orderId}</p>

        <Link to="/" className="btn btn-dark mt-2">
          Back to catalog
        </Link>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="container py-4 px-3">
        <h1 className="h3 mb-2">Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn btn-dark">
          Go shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-4 px-3">
      <h1 className="h3 mb-3">Checkout</h1>

      <p className="text-muted mb-3">
        Total to pay: <strong>${total}</strong>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12 col-md-6">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-dark" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm purchase"}
          </button>

          <Link to="/cart" className="btn btn-outline-secondary">
            Back to cart
          </Link>
        </div>
      </form>
    </section>
  );
}
