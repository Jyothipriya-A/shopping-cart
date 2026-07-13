import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cartItems, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h3>Your cart is empty.</h3>
        <p>Pick a few favorites and bring them home.</p>
        <Link to="/" className="btn btn-primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="cart-total">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="cart-page__actions">
        <Link to="/" className="btn btn-primary">
          Continue shopping
        </Link>
        <button className="btn btn-danger" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}