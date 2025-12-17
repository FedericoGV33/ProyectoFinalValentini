// src/components/ItemCount.jsx
import { useState } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [quantity, setQuantity] = useState(initial);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAdd = () => {
    if (stock === 0) return;

    if (onAdd) {
      onAdd(quantity);
    } else {
      console.log(`Added ${quantity} item(s) to cart (demo only).`);
    }
  };

  const isOutOfStock = stock === 0;

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleDecrement}
          disabled={quantity <= 1 || isOutOfStock}
        >
          -
        </button>

        <span className="px-3 py-1 border rounded">
          {isOutOfStock ? 0 : quantity}
        </span>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleIncrement}
          disabled={quantity >= stock || isOutOfStock}
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="btn btn-dark"
        onClick={handleAdd}
        disabled={isOutOfStock}
      >
        Add to cart
      </button>
    </div>
  );
}
