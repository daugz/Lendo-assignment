import { Dispatch, SetStateAction } from "react";
import { CheckoutProduct } from "../types";

export const removeItem = (
  item: CheckoutProduct,
  shoppingCart: string[],
  setShoppingCart: Dispatch<SetStateAction<string[]>>
) => {
  if (sessionStorage?.length) {
    sessionStorage.removeItem(item?.checkoutProductId);
    setShoppingCart(
      shoppingCart.filter((product) => product === item?.checkoutProductId)
    );
  }
};
