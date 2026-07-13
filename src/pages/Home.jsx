import { useEffect, useState } from "react";
import { getProducts } from "../services/productServices";
import ProductCard from "../components/ProductCard";

const PAGE_SIZE = 12;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts({ limit: PAGE_SIZE, offset });
        if (!ignore) setProducts(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadProducts();
    return () => {
      ignore = true;
    };
  }, [offset]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="cart-page__actions">
        <button
          className="btn btn-primary"
          disabled={offset === 0}
          onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setOffset((o) => o + PAGE_SIZE)}
        >
          Next
        </button>
      </div>
    </>
  );
}