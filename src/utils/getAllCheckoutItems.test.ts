import { describe, test, expect, beforeEach } from "vitest";
import { getAllCheckoutItems } from "./getAllCheckoutItems";

describe("Gets all the checkout items from session storage", () => {
  const product1 = {
    id: "1",
    checkoutProductId: "1Philipswhite6.5",
    image: "/Products/philips-hue.png",
    name: "Philips hue bulb",
    price: "500",
    weight: "0.2",
    brand: "Philips",
    color: "white",
    power: "6.5",
    storage: null,
    quantity: 3,
    count: 1,
  };
  const product2 = {
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

  beforeEach(() => {
    // Need to set up a local mock of session storage and it's functions
    // since session storage isn't available when running vitets.
    global.sessionStorage = {
      store: {},
      getItem: function (key: string) {
        return this.store[key] || null;
      },
      setItem: function (key: string, value: string) {
        this.store[key] = value;
      },
      removeItem: function (key: string) {
        delete this.store[key];
      },
      clear: function () {
        this.store = {};
      },
      key: function (index: number) {
        return Object.keys(this.store)[index] || null;
      },
      get length() {
        return Object.keys(this.store).length;
      },
    } as Storage;

    sessionStorage.clear();
  });

  test("Should return an empty array if cart is empty", () => {
    // Given sessionStorage is empty
    sessionStorage.clear();

    // When calling getAllCheckoutItems function
    const result = getAllCheckoutItems();

    // Then it should return an empty array
    expect(result).toEqual([]);
  });

  test("Should return sessionStorage with only one item", () => {
    // Given sessionStorage that contains only one item
    sessionStorage.setItem("1Philipswhite6.5", JSON.stringify(product1));

    // When calling getAllCheckoutItems
    const result = getAllCheckoutItems();

    // Then it should return an array with that single product
    expect(result).toEqual([product1]);
  });

  test("Should return a list of products if sessionStorage contains multiple products", () => {
    // Given sessionStorage contains products
    sessionStorage.setItem("1Philipswhite6.5", JSON.stringify(product1));
    sessionStorage.setItem("3Sonyblack250", JSON.stringify(product2));

    // When calling getAllCheckoutItems
    const result = getAllCheckoutItems();

    // Then it should return an array of those products
    expect(result).toEqual([product1, product2]);
  });
});
