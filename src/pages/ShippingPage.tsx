import ShippingForm from "../components/ShippingForm";
import OrderSummary from "../components/OrderSummary";
import CheckoutStepper from "../components/CheckoutStepper";
import type { CartItem } from "../store/cartStore";
import type { ShippingDetails } from "../utils/shippingSchema";

type Props = { items: CartItem[]; shippingDetails: ShippingDetails; onBack: () => void; onContinue: (details: ShippingDetails) => void };

export default function ShippingPage({ items, shippingDetails, onBack, onContinue }: Props) {
  return <section className="checkout-page">
    <div className="checkout-topline"><button className="back-link" onClick={onBack}>← Back to Cart</button><p className="eyebrow">YOUR ORDER, YOUR WAY</p></div>
    <h1 className="checkout-title">Delivery details</h1>
    <CheckoutStepper activeStep={2} />
    <div className="checkout-two-column"><ShippingForm initialDetails={shippingDetails} onBack={onBack} onContinue={onContinue} /><div className="summary-column"><OrderSummary items={items} /></div></div>
  </section>;
}
