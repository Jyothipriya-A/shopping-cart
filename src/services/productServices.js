const BASE_URL = "https://api.escuelajs.co/api/v1";

/**
 * Platzi's API sometimes returns image URLs wrapped like:
 * "[\"https://picsum.photos/id/1/300\"]" or with stray quotes.
 * This strips that down to a clean, usable URL, and falls back
 * to a placeholder if the URL is broken/missing entirely.
 */
function sanitizeImage(url) {
  if (!url) return "https://placehold.co/400x400?text=No+Image";
  const cleaned = url.replace(/[[\]"]/g, "").trim();
  return cleaned.startsWith("http")
    ? cleaned
    : "https://placehold.co/400x400?text=No+Image";
}
/**
 * Normalizes a raw Platzi product into the shape our components use,
 * so the rest of the app doesn't need to know which API we're on.
 */
function normalizeProduct(raw) {
  return {
    id: raw.id,
    title: raw.title,
    price: raw.price,
    description: raw.description,
    image: sanitizeImage(raw.images?.[0]),
    images: (raw.images || []).map(sanitizeImage),
    category: raw.category?.name ?? "Uncategorized",
    categoryId: raw.category?.id,
  };
}

export async function getProducts({ limit, offset } = {}) {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit);
  if (offset) params.set("offset", offset);

  const res = await fetch(`${BASE_URL}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.map(normalizeProduct);
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return normalizeProduct(data);
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProductsByCategory(categoryId) {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}/products`);
  if (!res.ok) throw new Error("Failed to fetch category products");
  const data = await res.json();
  return data.map(normalizeProduct);
}