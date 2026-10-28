import type { CartItem } from "../store/cartStore";

export function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05;
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  return {
    subtotal,
    tax,
    discount,
    total,
    checkoutAllowed: subtotal >= 10,
  };
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}