import OrderSummary from "../components/OrderSummary";
import CheckoutStepper from "../components/CheckoutStepper";
import { useCartStore } from "../store/cartStore";
import { money } from "../utils/pricing";
import type { ShippingDetails } from "../utils/shippingSchema";

type Props = { shippingDetails: ShippingDetails; onEditShipping: () => void; onPlaceOrder: () => void };

export default function PaymentPage({ shippingDetails, onEditShipping, onPlaceOrder }: Props) {
  const items = useCartStore((state) => state.items);
  return <section className="checkout-page">
    <div className="checkout-topline"><button className="back-link" onClick={onEditShipping}>← Edit shipping</button><p className="eyebrow">YOUR ORDER, YOUR WAY</p></div>
    <h1 className="checkout-title">Almost yours.</h1><CheckoutStepper activeStep={3} />
    <div className="checkout-two-column"><section className="checkout-panel"><p className="eyebrow">STEP 03 / PAYMENT SUMMARY</p><h2>Review your order</h2><p className="panel-description">Check the delivery details and items below. This step is read-only; no payment will be collected.</p>
      <div className="shipping-review"><div><span>Deliver to</span><strong>{shippingDetails.fullName}</strong><p>{shippingDetails.address}, {shippingDetails.city}, {shippingDetails.postalCode}</p></div><div><span>Contact</span><strong>{shippingDetails.email}</strong><p>{shippingDetails.phone}</p></div></div>
      <h3 className="review-subheading">Your items ({items.reduce((sum, item) => sum + item.quantity, 0)})</h3>
      {items.map(({ product, quantity }) => <div className="review-item" key={product.id}><img src={product.thumbnail} alt={product.title} /><div><strong>{product.title}</strong><span>Qty {quantity} × {money(product.price)}</span></div><strong>{money(product.price * quantity)}</strong></div>)}
      <div className="checkout-actions"><button className="secondary-button" onClick={onEditShipping}>← Edit shipping</button><button className="primary-button" onClick={onPlaceOrder}>Place order <span>→</span></button></div>
    </section><div className="summary-column"><OrderSummary items={items} /></div></div>
  </section>;
}
