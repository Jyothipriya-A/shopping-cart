import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <div className="product-card__body">
          <h3 className="product-card__title">{product.title}</h3>
          <p className="price-tag">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="product-card__footer">
        <button className="btn btn-primary btn-block" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}