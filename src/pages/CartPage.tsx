import OrderSummary from "../components/OrderSummary";
import CheckoutStepper from "../components/CheckoutStepper";
import type { CartItem } from "../store/cartStore";
import { calculateTotals, money } from "../utils/pricing";
import { useCartStore } from "../store/cartStore";

type Props = { onBackToShop: () => void; onCheckout: () => void };

export default function CartPage({ onBackToShop, onCheckout }: Props) {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const checkoutAllowed = calculateTotals(items).checkoutAllowed;

  return <section className="checkout-page">
    <div className="checkout-topline"><button className="back-link" onClick={onBackToShop}>← Continue shopping</button><p className="eyebrow">YOUR ORDER, YOUR WAY</p></div>
    <h1 className="checkout-title">Your shopping bag</h1><CheckoutStepper activeStep={1} />
    {items.length === 0 ? <div className="state-panel"><div className="state-symbol">＋</div><h3>Your bag is empty.</h3><p>There are no products in your bag yet. Explore the collection to add something you like.</p><button className="primary-button" onClick={onBackToShop}>Explore products</button></div> :
      <div className="cart-layout">
        <section className="cart-items-panel"><div className="section-heading cart-heading"><div><p className="eyebrow">YOUR SELECTION</p><h2>Shopping bag <span className="muted-count">({items.reduce((sum, item) => sum + item.quantity, 0)} units)</span></h2></div><button className="text-button" onClick={clearCart}>Clear bag</button></div>
          <div className="cart-items">{items.map(({ product, quantity }: CartItem) => <article className="cart-item" key={product.id}>
            <div className="cart-item-image"><img src={product.thumbnail} alt={product.title} /></div>
            <div className="cart-item-main"><span className="cart-item-category">{product.category.replaceAll("-", " ")}</span><h3>{product.title}</h3><p className="cart-item-price">{money(product.price)} <span>each</span></p>
              <div className="cart-item-actions"><div className="quantity-control"><button aria-label={`Decrease ${product.title} quantity`} disabled={quantity <= 1} onClick={() => setQuantity(product.id, quantity - 1)}>−</button><span aria-live="polite">{quantity}</span><button aria-label={`Increase ${product.title} quantity`} disabled={quantity >= 5} onClick={() => setQuantity(product.id, quantity + 1)}>+</button></div><button className="text-button remove-button" onClick={() => removeFromCart(product.id)}>Remove</button></div>
            </div><strong className="line-total">{money(product.price * quantity)}</strong>
          </article>)}</div>
        </section>
        <div className="summary-column"><OrderSummary items={items} showCheckoutButton onCheckout={onCheckout} disabled={!checkoutAllowed} note={!checkoutAllowed ? "Checkout is unavailable because your subtotal is below $10. Add more products to continue." : "Your subtotal meets the $10 minimum. You can continue to shipping."} /></div>
      </div>}
  </section>;
}
