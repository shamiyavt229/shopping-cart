import { useEffect, useRef, useState } from "react";
import { useProductFilters } from "../hooks/useProductFilters";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../store/cartStore";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const { data: products = [], isPending, isError, error, refetch, isFetching } = useProducts();
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const { search, setSearch, category, setCategory, maxPrice, setMaxPrice, categories, filteredProducts, clearFilters } = useProductFilters(products);
  const [categorySearch, setCategorySearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const categoryComboboxRef = useRef<HTMLDivElement>(null);

  const matchingCategories = categories.filter((item) =>
    item.replaceAll("-", " ").toLowerCase().includes(categorySearch.trim().toLowerCase()),
  );

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!categoryComboboxRef.current?.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function handleClearFilters() {
    clearFilters();
    setCategorySearch("");
    setCategoryOpen(false);
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">THE EVERYDAY EDIT</p>
          <h1>Good things.<br /><em>Thoughtfully</em> chosen.</h1>
          <p className="hero-description">Useful little upgrades for your space, your routine, and all the moments in between.</p>
          <a className="hero-link" href="#products">Explore the collection <span>↓</span></a>
        </div>
        <div className="hero-art" aria-label="Decorative shopping illustration">
          <div className="hero-sun" /><div className="hero-circle circle-one" /><div className="hero-circle circle-two" />
          <div className="hero-product product-vase"><span /></div>
          <div className="hero-product product-book"><span>THE<br />GOOD<br />LIFE</span></div>
          <div className="hero-product product-cup"><span /></div>
          <div className="hero-caption">Small things,<br />better days.</div>
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-heading">
          <div><p className="eyebrow">MADE FOR YOUR EVERYDAY</p><h2>Find your new favourite</h2></div>
          <span className="results-count">{isPending ? "Loading…" : `${filteredProducts.length} ${filteredProducts.length === 1 ? "item" : "items"}`}</span>
        </div>
        {!isPending && !isError && products.length > 0 && (
          <div className="filter-toolbar">
            <div className="search-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search products by title"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the collection..."
              />
            </div>

            <div className="category-combobox" ref={categoryComboboxRef}>
              <input
                type="text"
                className="form-control custom-input filter-select category-combobox-input"
                role="combobox"
                aria-label="Search or select a category"
                aria-autocomplete="list"
                aria-expanded={categoryOpen}
                aria-controls="category-options"
                placeholder="All categories"
                value={categorySearch}
                onFocus={() => setCategoryOpen(true)}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setCategorySearch(nextValue);
                  setCategory("all");
                  setCategoryOpen(true);
                }}
              />

              {categoryOpen && (
                <div className="category-options" id="category-options" role="listbox">
                  <button
                    type="button"
                    className={`category-option${category === "all" ? " is-selected" : ""}`}
                    role="option"
                    aria-selected={category === "all"}
                    onClick={() => {
                      setCategory("all");
                      setCategorySearch("");
                      setCategoryOpen(false);
                    }}
                  >
                    All categories
                  </button>

                  {matchingCategories.map((item) => (
                    <button
                      type="button"
                      className={`category-option${category === item ? " is-selected" : ""}`}
                      role="option"
                      aria-selected={category === item}
                      key={item}
                      onClick={() => {
                        setCategory(item);
                        setCategorySearch(item.replaceAll("-", " "));
                        setCategoryOpen(false);
                      }}
                    >
                      {item.replaceAll("-", " ")}
                    </button>
                  ))}

                  {matchingCategories.length === 0 && (
                    <div className="category-option category-option-empty">No categories found</div>
                  )}
                </div>
              )}
            </div>

            <input
              aria-label="Filter by maximum price"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="Max price ($)"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="form-control custom-input filter-select filter-price-input"
            />
            <button className="clear-filters" onClick={handleClearFilters} type="button">Clear filters</button>
          </div>
        )}

        {isPending && <div className="state-panel" role="status"><div className="spinner-border" aria-hidden="true" /><h3>Finding the good stuff</h3><p>Loading products from the store…</p></div>}
        {isError && <div className="state-panel error-panel" role="alert"><div className="state-symbol">!</div><h3>We couldn't load the products.</h3><p>{error instanceof Error ? error.message : "Please check your internet connection and try again."}</p><button className="primary-button" onClick={() => void refetch()} disabled={isFetching}>{isFetching ? "Trying again…" : "Try again"}</button></div>}
        {!isPending && !isError && products.length === 0 && <div className="state-panel"><div className="state-symbol">□</div><h3>No products are available.</h3><p>The product service returned an empty collection. Please try again shortly.</p><button className="secondary-button" onClick={() => void refetch()} disabled={isFetching}>Refresh products</button></div>}
        {!isPending && !isError && products.length > 0 && filteredProducts.length === 0 && <div className="state-panel"><div className="state-symbol">⌕</div><h3>No matching products.</h3><p>Try a different title, category, or price range.</p><button className="secondary-button" onClick={handleClearFilters}>Clear filters</button></div>}
        {!isPending && !isError && filteredProducts.length > 0 && <div className="row g-4 product-grid">{filteredProducts.map((product) => { const cartItem = items.find((item) => item.product.id === product.id); return <div className="col-6 col-md-4 col-xl-3" key={product.id}><ProductCard product={product} quantityInCart={cartItem?.quantity ?? 0} onAdd={addToCart} /></div>; })}</div>}
      </section>
    </>
  );
}
