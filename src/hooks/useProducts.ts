import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

/** Product data belongs to TanStack Query, not the cart store. */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60_000,
  });
}
