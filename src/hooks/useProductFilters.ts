import { useMemo, useState } from "react";
import type { Product } from "../types/product";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const parsedMaxPrice = maxPrice.trim() === "" ? NaN : Number(maxPrice);
    const hasMaxPrice = Number.isFinite(parsedMaxPrice);

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = !hasMaxPrice || product.price <= parsedMaxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, maxPrice]);

  function clearFilters() {
    setCategory("all");
    setMaxPrice("");
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    categories,
    filteredProducts,
    clearFilters,
  };
}
