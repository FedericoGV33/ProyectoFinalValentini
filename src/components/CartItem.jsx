// src/components/CartItem.jsx
export default function CartItem({ item, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="list-group-item">
      <div className="d-flex gap-3 align-items-start">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="rounded border"
            style={{ width: 72, height: 72, objectFit: "cover" }}
          />
        )}

        <div className="flex-grow-1">
          <div className="d-flex justify-content-between gap-2">
            <div>
              <h3 className="h6 mb-1">{item.name}</h3>
              <p className="text-muted mb-1">
                ${item.price} • Qty {item.quantity}
              </p>
              <p className="mb-0 fw-semibold">Subtotal: ${subtotal}</p>
            </div>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={onRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
