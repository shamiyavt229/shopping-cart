import { describe, it, expect } from "vitest";
import { calculateTotals } from "./pricing";
import type { CartItem } from "../store/cartStore";

const createItem = (price: number, quantity: number): CartItem => ({
  product: {
    id: 1,
    title: "Test Product",
    description: "Test description",
    category: "test",
    price,
    rating: 4,
    thumbnail: "",
  },
  quantity,
});

describe("calculateTotals", () => {
  it("calculates subtotal and tax correctly", () => {
    const result = calculateTotals([createItem(40, 2)]);

    expect(result.subtotal).toBe(80);
    expect(result.tax).toBe(4);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(84);
  });

  it("applies a 10% discount when subtotal exceeds $100", () => {
    const result = calculateTotals([createItem(105, 1)]);

    expect(result.subtotal).toBe(105);
    expect(result.tax).toBe(5.25);
    expect(result.discount).toBe(10.5);
    expect(result.total).toBeCloseTo(99.75);
  });

  it("does not apply a discount at exactly $100", () => {
    const result = calculateTotals([createItem(100, 1)]);

    expect(result.discount).toBe(0);
    expect(result.total).toBe(105);
  });

  it("allows checkout when subtotal is exactly $10", () => {
    const result = calculateTotals([createItem(10, 1)]);

    expect(result.checkoutAllowed).toBe(true);
  });

  it("does not allow checkout when subtotal is below $10", () => {
    const result = calculateTotals([createItem(9, 1)]);

    expect(result.checkoutAllowed).toBe(false);
  });

  it("calculates an empty cart correctly", () => {
    const result = calculateTotals([]);

    expect(result.subtotal).toBe(0);
    expect(result.tax).toBe(0);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(0);
    expect(result.checkoutAllowed).toBe(false);
  });
});