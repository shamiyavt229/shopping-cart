import type { CartItem } from "../store/cartStore";
import { calculateTotals, money } from "../utils/pricing";

type OrderSummaryProps = {
  items: CartItem[];
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
  buttonLabel?: string;
  disabled?: boolean;
  note?: string;
};

export default function OrderSummary({
  items, showCheckoutButton = false, onCheckout, buttonLabel = "Continue to checkout",
  disabled = false, note,
}: OrderSummaryProps) {
  const totals = calculateTotals(items);

  return (
    <aside className="summary-card">
      <p className="eyebrow">THE BREAKDOWN</p>
      <h2>Order summary</h2>
      <div className="summary-items">
  
<div className="summary-items">
  {items.map((item) => (
    <div className="summary-item" key={item.product.id}>
      <div className="summary-item-info">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="summary-product-image"
        />

        <div>
          <p className="summary-item-name">{item.product.title}</p>
          <p className="summary-item-quantity">
            {item.quantity} × {money(item.product.price)}
          </p>
        </div>
      </div>

      <strong>
        {money(item.product.price * item.quantity)}
      </strong>
    </div>
  ))}
</div>

</div>
      <div className="summary-line"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
      <div className="summary-line"><span>Estimated tax (5%)</span><span>{money(totals.tax)}</span></div>
      <div className="summary-line discount-line"><span>Discount</span><span>{totals.discount > 0 ? `−${money(totals.discount)}` : money(0)}</span></div>
      {totals.discount === 0 && <p className="discount-hint">Spend over $100 to unlock 10% off.</p>}
      <div className="summary-total"><span>Total</span><strong>{money(totals.total)}</strong></div>
      {note && <p className="summary-note">{note}</p>}
      {showCheckoutButton && (
        <button className="primary-button w-100 mt-3" disabled={disabled} onClick={onCheckout}>
          {buttonLabel} <span aria-hidden="true">→</span>
        </button>
      )}
      
    </aside>
  );
}