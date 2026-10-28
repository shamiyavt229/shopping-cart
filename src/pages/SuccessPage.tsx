type Props = { onBackToShop: () => void };

export default function SuccessPage({ onBackToShop }: Props) {
  return <section className="success-panel"><div className="success-icon">✓</div><p className="eyebrow">ORDER COMPLETE</p><h1>That’s a wrap.</h1><p>Your order has been recorded for this session. No payment has been processed.</p><button className="primary-button" onClick={onBackToShop}>Back to the shop →</button></section>;
}
