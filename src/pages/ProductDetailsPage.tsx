import { Link, useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from "../store/cartStore";
import { money } from "../utils/pricing";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);
  const { data: products = [], isPending, isError, error, refetch, isFetching } = useProducts();
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const startBuyNow = useCartStore((state) => state.startBuyNow);
  const setCheckoutMode = useCartStore((state) => state.setCheckoutMode);

  const product = Number.isFinite(productId)
    ? products.find((item) => item.id === productId)
    : undefined;
  const quantityInCart = items.find((item) => item.product.id === productId)?.quantity ?? 0;

  return (
    <section className="product-details-page">
      <div className="checkout-topline">
        <Link className="back-link" to="/">← Back to shop</Link>
        <p className="eyebrow">PRODUCT DETAILS</p>
      </div>

      {isPending && (
        <div className="state-panel" role="status">
          <div className="spinner-border" aria-hidden="true" />
          <h3>Loading product</h3>
          <p>Fetching details from the store…</p>
        </div>
      )}

      {isError && (
        <div className="state-panel error-panel" role="alert">
          <div className="state-symbol">!</div>
          <h3>We couldn't load this product.</h3>
          <p>{error instanceof Error ? error.message : "Please check your internet connection and try again."}</p>
          <button className="primary-button" onClick={() => void refetch()} disabled={isFetching}>
            {isFetching ? "Trying again…" : "Try again"}
          </button>
        </div>
      )}

      {!isPending && !isError && !product && (
        <div className="state-panel">
          <div className="state-symbol">□</div>
          <h3>Product not found.</h3>
          <p>This item isn't in the current collection. Browse the shop to find something else.</p>
          <Link className="primary-button" to="/">Explore products</Link>
        </div>
      )}

      {!isPending && !isError && product && (
        <div className="product-details-layout">
          <div className="product-details-media">
            <img src={product.thumbnail} alt={product.title} className="product-details-image" />
          </div>
          <div className="product-details-copy">
            <p className="eyebrow">{product.category.replaceAll("-", " ")}</p>
            <h1 className="product-details-title">{product.title}</h1>
            <div className="product-rating product-details-rating">
              <span aria-hidden="true">★</span> {product.rating.toFixed(1)}{" "}
              <span className="rating-label">rating</span>
            </div>
            <p className="product-details-price">{money(product.price)}</p>
            <p className="product-details-description">{product.description}</p>
            {quantityInCart > 0 && (
              <p className="product-details-cart-note">
                {quantityInCart} in bag
              </p>
            )}
            <div className="product-details-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  if (quantityInCart > 0) {
                    setCheckoutMode("cart");
                    navigate("/cart");
                  } else {
                    addToCart(product);
                  }
                }}
              >
                {quantityInCart > 0 ? "Go to Cart" : "Add to Cart"}
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  startBuyNow(product);
                  navigate("/checkout/buy-now");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
