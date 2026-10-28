import { useState } from "react";
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
  const clearCart = useCartStore((state) => state.clearCart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totals = calculateTotals(items);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(emptyShippingDetails);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const currentPage = location.pathname === "/cart" || location.pathname.startsWith("/checkout") ? "cart" : "shop";

  function goToCart() {
    navigate("/cart");
  }

  function placeOrder() {
    setOrderPlaced(true);
    clearCart();
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
      <Header cartCount={cartCount} page={currentPage} onNavigate={(page) => { setOrderPlaced(false); navigate(page === "shop" ? "/" : "/cart"); }} />
      <main className="container page-content">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage onBackToShop={() => navigate("/")} onCheckout={() => navigate("/checkout/shipping")} />} />
          <Route
            path="/checkout/shipping"
            element={
              <CheckoutGuard allowed={items.length > 0 && totals.checkoutAllowed}>
                <ShippingPage
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
              <CheckoutGuard allowed={items.length > 0 && totals.checkoutAllowed && ShippingDetailsAreValid(shippingDetails)}>
                <PaymentPage shippingDetails={shippingDetails} onEditShipping={() => navigate("/checkout/shipping")} onPlaceOrder={placeOrder} />
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
          <span>Checkout preview · No payment gateway configured</span>
        </div>
      </footer>
    </div>
  );
}

function ShippingDetailsAreValid(details: ShippingDetails) {
  return ShippingSchema.safeParse(details).success;
}
