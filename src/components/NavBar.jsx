// src/components/NavBar.jsx
import CartWidget from "./CartWidget";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white border-bottom sticky-top">
      <div className="container-fluid px-3">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
        >
          <img src="/logo.svg" alt="Aurel" height="24" />
          <span>Aurel</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto me-3 gap-2">
            <li className="nav-item">
              <NavLink to="/category/rings" className="nav-link">
                Rings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/necklaces" className="nav-link">
                Necklaces
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category/gems" className="nav-link">
                Gems
              </NavLink>
            </li>
          </ul>

          <CartWidget />
        </div>
      </div>
    </nav>
  );
}
