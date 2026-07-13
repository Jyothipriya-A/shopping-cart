import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productServices";
import { useCart } from "../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let isActive = true;

    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        if (isActive) {
          setProduct(data);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [id]); // re-fetch if the user navigates from one product page to another

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details">
      <img src={product.image} alt={product.title} />
      <div className="product-details__info">
        <h2 className="product-details__title">{product.title}</h2>
        <p className="product-details__desc">{product.description}</p>
        <p className="price-tag">${product.price.toFixed(2)}</p>
        <button className="btn btn-primary btn-block" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}