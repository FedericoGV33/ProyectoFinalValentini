// src/components/Item.jsx
import { Link } from "react-router-dom";

export default function Item({ product }) {
  return (
    <article className="card h-100">
      {product.image && (
        <img
          src={product.image}
          className="card-img-top product-card-image"
          alt={product.name}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h2 className="h6 card-title">{product.name}</h2>
        <p className="card-text text-muted mb-2">{product.description}</p>
        <p className="fw-semibold mb-3">${product.price}</p>

        <Link to={`/item/${product.id}`} className="btn btn-dark mt-auto">
          View details
        </Link>
      </div>
    </article>
  );
}
