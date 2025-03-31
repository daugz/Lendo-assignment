import { Dispatch, SetStateAction, useState, type FC } from "react";
import styles from "./checkoutCard.module.css";
import { findColor, removeItemFromCart } from "../../utils";
import { CheckoutProduct } from "../../types";

export const CheckoutCard: FC<{
  item: CheckoutProduct;
  shoppingCart: string[];
  setShoppingCart: Dispatch<SetStateAction<string[]>>;
  setCartUpdated: Dispatch<SetStateAction<number>>;
}> = ({ item, shoppingCart, setShoppingCart, setCartUpdated }) => {
  const [productCount, setProductCount] = useState(item?.count);
  const handleOnRemove = () => {
    removeItemFromCart(item, shoppingCart, setShoppingCart);
  };
  const handleOnDecrement = () => {
    if (item?.count > 1 && productCount > 1) {
      const product = sessionStorage.getItem(item.checkoutProductId);
      if (product) {
        const parsedProduct = JSON.parse(product);
        const decrementedCount = {
          ...parsedProduct,
          count: parsedProduct?.count - 1,
        };
        setCartUpdated((prevValue) => prevValue + 1);
        setProductCount((prevValue: number) => prevValue - 1);
        sessionStorage.setItem(
          item?.checkoutProductId,
          JSON.stringify(decrementedCount)
        );
      }
    }
  };
  const handleOnIncrement = () => {
    if (
      item?.count >= 1 &&
      item.count < item.quantity &&
      productCount < item.quantity
    ) {
      const product = sessionStorage.getItem(item.checkoutProductId);
      if (product) {
        const parsedProduct = JSON.parse(product);
        const incrementedCount = {
          ...parsedProduct,
          count: parsedProduct?.count + 1,
        };
        setCartUpdated((prevValue) => prevValue + 1);
        setProductCount((prevValue: number) => prevValue + 1);
        // const setNewCount = product ? JSON.parse(product)?.count : null;
        sessionStorage.setItem(
          item?.checkoutProductId,
          JSON.stringify(incrementedCount)
        );
      }
    }
  };
  const productCountIsLargerThanQuantity = () => {
    if (item.count >= item.quantity || productCount >= item.quantity) {
      return styles.disabledCartChanger;
    } else return "";
  };
  const productCountIsLowestAmount = () => {
    if (item.count <= 1 && productCount <= 1) {
      return styles.disabledCartChanger;
    } else return "";
  };

  return (
    <div className={styles.checkOutCard}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={item?.image} />
      </div>
      <div className={styles.infoContainer}>
        {item.name && <h2 className={styles.h2}>{item.name}</h2>}

        <div className={styles.brandColorContainer}>
          {item.brand && (
            <div className={`${styles.bold} ${styles.brand}`}>{item.brand}</div>
          )}
          <div
            className={`${styles.colorContainer} ${findColor(item?.color)}`}
          />
        </div>
        {item.price && <div className={styles.bold}>{item.price} kr</div>}
        <div className={styles.optionsContainer}>
          {item.power && <div>{item.power} W</div>}
          {item.storage && <div>{item.storage} gb</div>}
          {item.weight && <div>{item.weight} kg</div>}
        </div>
        <div className={styles.changeCart}>
          <div className={styles.quantityContainer}>
            <button
              className={`${styles.decrement} ${productCountIsLowestAmount()}`}
              onClick={handleOnDecrement}
            />
            <div className={styles.amount}>{item?.count}</div>
            <button
              className={`${
                styles.increment
              } ${productCountIsLargerThanQuantity()}`}
              onClick={handleOnIncrement}
            />
          </div>
          <button className={styles.removeButton} onClick={handleOnRemove}>
            <img src={"/Icons/trash-can-icon.svg"} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};
