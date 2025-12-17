// src/components/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { cart, removeItem, clearCart, getTotalPrice, getTotalQuantity } =
    useCart();

  if (cart.length === 0) {
    return (
      <section className="container py-4 px-3">
        <h1 className="h3 mb-2">Cart</h1>
        <p className="mb-3">Your cart is empty.</p>
        <Link to="/" className="btn btn-dark">
          Go shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-4 px-3">
      <h1 className="h3 mb-3">Cart</h1>

      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="list-group">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          <button
            type="button"
            className="btn btn-outline-danger mt-3"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="h6 mb-2">Summary</h2>
              <p className="mb-1">
                Items: <strong>{getTotalQuantity()}</strong>
              </p>
              <p className="mb-3">
                Total: <strong>${getTotalPrice()}</strong>
              </p>

              <Link to="/checkout" className="btn btn-dark w-100">
                Checkout
              </Link>

              <Link to="/" className="btn btn-link w-100 mt-2">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
