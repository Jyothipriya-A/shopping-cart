import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar__brand">
          Shop
        </Link>
        <div className="navbar__links">
          <Link to="/" className="navbar__link">
            Home
          </Link>
          <Link to="/cart" className="navbar__cart">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </nav>
  );
}