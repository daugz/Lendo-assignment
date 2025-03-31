import { Dispatch, SetStateAction } from "react";
import { CheckoutProduct } from "../types";

export const removeItemFromCart = (
  item: CheckoutProduct,
  shoppingCart: string[],
  setShoppingCart: Dispatch<SetStateAction<string[]>>
) => {
  if (sessionStorage?.length && sessionStorage.length > 0) {
    sessionStorage.removeItem(item?.checkoutProductId);
    setShoppingCart(
      shoppingCart.filter((product) => product !== item?.checkoutProductId)
    );
  }
};
