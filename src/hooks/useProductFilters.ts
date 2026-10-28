import { useMemo, useState } from "react";
import type { Product } from "../types/product";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesCategory =
      category === "all" || product.category === category;

    const matchesPrice =
      maxPrice === "" || maxPrice === "all" || product.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort a copy so the original API data remains unchanged.
  const sorted = [...filtered];

  switch (sortBy) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "name":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sorted;
}, [products, search, category, maxPrice, sortBy]);

  function clearFilters() {
    setCategory("all");
    setMaxPrice("");
    setSortBy("default");
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    categories,
    filteredProducts,
    clearFilters,

  };
}
