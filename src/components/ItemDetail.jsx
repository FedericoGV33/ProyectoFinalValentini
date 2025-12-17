// src/components/ItemDetail.jsx
import { useState } from "react";
import ItemCount from "./ItemCount";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function ItemDetail({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [addedQty, setAddedQty] = useState(0);

  const handleAdd = (qty) => {
    addItem(product, qty);
    toast.success(`Added ${qty} to cart`);
    setAddedQty(qty);
  };

  return (
    <div className="row g-4">
      <div className="col-md-5">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        )}
      </div>

      <div className="col-md-7">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>

        <h1 className="h3 mb-2">{product.name}</h1>
        <p className="text-muted mb-2">{product.category}</p>
        <p className="mb-3">{product.description}</p>

        <p className="fs-4 fw-semibold mb-1">${product.price}</p>
        <p className="text-muted mb-3">Available stock: {product.stock}</p>

        {product.stock === 0 ? (
          <div className="alert alert-warning mb-0">Product without stock.</div>
        ) : addedQty === 0 ? (
          <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="alert alert-success py-2 mb-0">
              Added <strong>{addedQty}</strong> to cart.
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Link to="/cart" className="btn btn-dark">
                Go to cart
              </Link>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
