import type { CheckoutProduct } from "../types";

export const getAllCheckoutItems = () => {
  let cart: CheckoutProduct[] = [];
  if (sessionStorage?.length) {
    for (let index = 0; index < sessionStorage?.length; index++) {
      const key = sessionStorage.key(index);
      if (key) {
        const product = sessionStorage.getItem(key);
        if (product) {
          cart = [...cart, JSON.parse(product)];
        }
      }
    }
  }
  return cart;
};
