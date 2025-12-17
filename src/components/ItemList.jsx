// src/components/ItemList.jsx
import Item from "./Item";

export default function ItemList({ products }) {
  return (
    <div className="row g-3">
      {products.map((product) => (
        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
          <Item product={product} />
        </div>
      ))}
    </div>
  );
}
