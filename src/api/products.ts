import { ProductsResponseSchema } from "../types/product";

export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=50");

  if (!response.ok) {
    throw new Error(`Could not load products (HTTP ${response.status}).`);
  }

  // API data is untrusted until we validate its shape.
  const rawData: unknown = await response.json();
  const parsed = ProductsResponseSchema.safeParse(rawData);

  if (!parsed.success) {
    throw new Error("The product API returned data in an unexpected format.");
  }

  return parsed.data.products;
}