import { useCart } from "../context/useCart";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} width={60} />
      <div className="cart-item__info">
        <h4 className="cart-item__title">{item.title}</h4>
        <p className="cart-item__price">${item.price.toFixed(2)}</p>
      </div>
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
      />
      <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
}