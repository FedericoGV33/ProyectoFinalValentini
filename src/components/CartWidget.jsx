import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartWidget() {
  const { getTotalQuantity } = useCart();
  const total = getTotalQuantity();

  return (
    <Link to="/cart" className="btn position-relative" aria-label="Cart">
      <FaShoppingCart size={20} />
      {total > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
          {total}
        </span>
      )}
    </Link>
  );
}
