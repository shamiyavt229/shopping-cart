import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useCartStore } from "./store/cartStore";
import { calculateTotals } from "./utils/pricing";
import { emptyShippingDetails, ShippingSchema } from "./utils/shippingSchema";
import type { ShippingDetails } from "./utils/shippingSchema";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";

function CheckoutGuard({ children, allowed }: { children: ReactNode; allowed: boolean }) {
  return allowed ? <>{children}</> : <Navigate to="/cart" replace />;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const buyNowItem = useCartStore((state) => state.buyNowItem);
  const checkoutMode = useCartStore((state) => state.checkoutMode);
  const setCheckoutMode = useCartStore((state) => state.setCheckoutMode);
  const clearCart = useCartStore((state) => state.clearCart);
  const clearBuyNow = useCartStore((state) => state.clearBuyNow);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const setBuyNowQuantity = useCartStore((state) => state.setBuyNowQuantity);
  const [isDarkMode, setIsDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

useEffect(() => {
  document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}, [isDarkMode]);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const checkoutItems = checkoutMode === "buyNow"
    ? buyNowItem ? [buyNowItem] : []
    : items;
  const totals = calculateTotals(checkoutItems);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(emptyShippingDetails);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const currentPage = location.pathname === "/cart" || location.pathname.startsWith("/checkout") ? "cart" : "shop";

  function goToCart() {
    navigate(checkoutMode === "buyNow" ? "/checkout/buy-now" : "/cart");
  }

  function placeOrder() {
    setOrderPlaced(true);
    if (checkoutMode === "buyNow") {
      clearBuyNow();
    } else {
      clearCart();
    }
    setCheckoutMode("cart");
    navigate("/success", { replace: true });
  }

  function resetAfterOrder() {
    setOrderPlaced(false);
    setShippingDetails(emptyShippingDetails);
    navigate("/");
  }

  return (
    <div className="app-shell">
      <div className="announcement-bar">A little something for your everyday <span>✳</span> Thoughtfully chosen for your everyday</div>
      <Header
  cartCount={cartCount}
  page={currentPage}
  onNavigate={(page) => {
    setOrderPlaced(false);
    navigate(page === "shop" ? "/" : "/cart");
  }}
  isDarkMode={isDarkMode}
  onToggleTheme={() => setIsDarkMode((current) => !current)}
/>
      <main className="container page-content">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={
            <CartPage
              checkoutMode="cart"
              items={items}
              onBackToShop={() => navigate("/")}
              onCheckout={() => { setCheckoutMode("cart"); navigate("/checkout/shipping"); }}
              onSetQuantity={setQuantity}
              onRemove={removeFromCart}
              onClear={clearCart}
            />
          } />
          <Route path="/checkout/buy-now" element={
            <CheckoutGuard allowed={checkoutMode === "buyNow" && buyNowItem !== null}>
              <CartPage
                checkoutMode="buyNow"
                items={buyNowItem ? [buyNowItem] : []}
                onBackToShop={() => navigate("/")}
                onCheckout={() => navigate("/checkout/shipping")}
                onSetQuantity={(_productId, quantity) => setBuyNowQuantity(quantity)}
                onRemove={() => clearBuyNow()}
                onClear={clearBuyNow}
              />
            </CheckoutGuard>
          } />
          <Route
            path="/checkout/shipping"
            element={
              <CheckoutGuard allowed={checkoutItems.length > 0 && totals.checkoutAllowed}>
                <ShippingPage
                  items={checkoutItems}
                  shippingDetails={shippingDetails}
                  onBack={goToCart}
                  onContinue={(details) => {
                    setShippingDetails(details);
                    navigate("/checkout/payment");
                  }}
                />
              </CheckoutGuard>
            }
          />
          <Route
            path="/checkout/payment"
            element={
              <CheckoutGuard allowed={checkoutItems.length > 0 && totals.checkoutAllowed && ShippingDetailsAreValid(shippingDetails)}>
                <PaymentPage items={checkoutItems} shippingDetails={shippingDetails} onEditShipping={() => navigate("/checkout/shipping")} onPlaceOrder={placeOrder} />
              </CheckoutGuard>
            }
          />
          <Route path="/success" element={orderPlaced ? <SuccessPage onBackToShop={resetAfterOrder} /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-brand">everyday<span className="brand-dot">.</span></span>
          <span>Thoughtfully chosen. Made for real life.</span>
          <span>Have a good day</span>
        </div>
      </footer>
    </div>
  );
}

function ShippingDetailsAreValid(details: ShippingDetails) {
  return ShippingSchema.safeParse(details).success;
}
