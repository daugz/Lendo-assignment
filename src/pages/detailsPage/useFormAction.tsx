import { type Dispatch, type SetStateAction, useActionState } from "react";
import type { Product } from "../../types";

export const useFormAction = (
  productDetails: Product,
  shoppingCart: string[],
  setShoppingCart: Dispatch<SetStateAction<string[]>>
) => {
  //@ts-expect-error could not find type for formdata
  const [state, formAction] = useActionState((previousState, formData) => {
    const id = formData.get("id");
    const image = formData.get("image");
    const name = formData.get("name");
    const price = formData.get("price");
    const brand = formData.get("brand");
    const weight = formData.get("weight");
    const color = formData.get("color");
    const power = formData.get("power");
    const storage = formData.get("storage");
    const quantity = Number(formData.get("quantity"));

    const cartProductId = [id, brand, color, power, storage]
      .filter((val) => val)
      .join("");

    const isProductAlreadyAdded = () => {
      const doesProductExist = sessionStorage.getItem(cartProductId);

      if (doesProductExist) {
        const parseProduct = JSON.parse(doesProductExist);
        return parseProduct;
      }
      return null;
    };
    const addToCount =
      isProductAlreadyAdded() && isProductAlreadyAdded()?.count
        ? isProductAlreadyAdded().count + 1
        : 1;
    const chosenProduct = {
      id: id,
      checkoutProductId: cartProductId,
      image: image,
      name: name,
      price: price,
      weight: weight,
      brand: brand,
      color: color,
      power: power,
      storage: storage,
      quantity: quantity,
      count: addToCount,
    };

    if (productDetails.available && quantity > 0) {
      sessionStorage.setItem(cartProductId, JSON.stringify(chosenProduct));
      setShoppingCart([...shoppingCart, cartProductId]);

      return {
        type: "added",
        message: `Product successfully added to cart`,
      };
    }

    if (quantity === 0)
      return {
        type: "error",
        message: `Color is sold out`,
      };
  }, null);

  return { state, formAction };
};
