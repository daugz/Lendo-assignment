import { describe, test, expect, vi } from "vitest";
import { removeItemFromCart } from "./removeItemFromCart";
import type { CheckoutProduct } from "../types";

describe("Remove item from cart", () => {
  const setShoppingCart = vi.fn();
  let shoppingCart: string[] = [];

  const product: CheckoutProduct = {
    id: "3",
    checkoutProductId: "3Sonyblack250",
    image: "/Products/playstation-4.png",
    name: "Playstation 4",
    price: "5000",
    weight: "2.1",
    brand: "Sony",
    color: "black",
    power: null,
    storage: "250",
    quantity: 10,
    count: 1,
  };

  test("Should remove the item from sessionStorage and update shoppingCart", () => {
    shoppingCart = ["3Sonyblack250"];

    // Given sessionStorage contains the product

    /* Need to set up a local mock of session storage and it's functions
    since session storage isn't available when running vitets. */

    vi.stubGlobal("sessionStorage", {
      removeItem: vi.fn(),
      length: 1,
    });

    // When removing that item
    removeItemFromCart(product, shoppingCart, setShoppingCart);

    // Then sessionStorage.removeItem should be called
    expect(sessionStorage.removeItem).toHaveBeenCalledWith("3Sonyblack250");

    // And setShoppingCart should update correctly
    expect(setShoppingCart).toHaveBeenCalledWith([]);
  });

  test("Should do nothing if sessionStorage is empty", () => {
    // Given sessionStorage is empty

    /* Need to set up a local mock of session storage and it's functions
    since session storage isn't available when running vitets. */
    vi.stubGlobal("sessionStorage", {
      removeItem: vi.fn(),
      length: 0,
      clear: vi.fn(),
    });
    sessionStorage.clear();

    // When calling removeItemFromCart
    removeItemFromCart(product, shoppingCart, setShoppingCart);

    // Then removeItem should not be called
    expect(sessionStorage.removeItem).not.toHaveBeenCalled();
  });
});
