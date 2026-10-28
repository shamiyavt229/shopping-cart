import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

/** Shared with product details, product cards, and cart quantity controls. */
export const MAX_QUANTITY = 5;

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CheckoutMode = "cart" | "buyNow";

type CartState = {
  items: CartItem[];
  buyNowItem: CartItem | null;
  checkoutMode: CheckoutMode;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  startBuyNow: (product: Product) => void;
  setBuyNowQuantity: (quantity: number) => void;
  clearBuyNow: () => void;
  setCheckoutMode: (mode: CheckoutMode) => void;
};

export function getQuantityInCart(items: CartItem[], productId: number) {
  return items.find((item) => item.product.id === productId)?.quantity ?? 0;
}

export function getRemainingCapacity(items: CartItem[], productId: number) {
  return Math.max(0, MAX_QUANTITY - getQuantityInCart(items, productId));
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      buyNowItem: null,
      checkoutMode: "cart",
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const remaining = getRemainingCapacity(state.items, product.id);
          if (remaining <= 0) return state;

          const amount = Math.max(1, Math.min(remaining, quantity));
          const existing = state.items.find((item) => item.product.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + amount) }
                  : item,
              ),
            };
          }

          return { items: [...state.items, { product, quantity: amount }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)) }
              : item,
          ),
        })),
      clearCart: () => set({ items: [] }),
      startBuyNow: (product) =>
        set({ buyNowItem: { product, quantity: 1 }, checkoutMode: "buyNow" }),
      setBuyNowQuantity: (quantity) =>
        set((state) => state.buyNowItem
          ? {
              buyNowItem: {
                ...state.buyNowItem,
                quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)),
              },
            }
          : state),
      clearBuyNow: () => set({ buyNowItem: null }),
      setCheckoutMode: (checkoutMode) => set({ checkoutMode }),
    }),
    { name: "everyday-shopping-cart" },
  ),
);
