import { Dispatch, SetStateAction, useState, type FC } from "react";
import styles from "./checkoutPage.module.css";
import { findColor, getAllCheckoutItems, removeItemFromCart } from "../utils";
import { CheckoutProduct } from "../types";

type CheckoutPage = {
  shoppingCart: string[];
  setShoppingCart: Dispatch<SetStateAction<string[]>>;
};

export const CheckoutPage: FC<CheckoutPage> = ({
  shoppingCart,
  setShoppingCart,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartUpdated, setCartUpdated] = useState(0);
  const checkoutItems = getAllCheckoutItems();
  console.log(checkoutItems);
  const handleOnClick = () => {
    const isCartAlreadyEmpty = sessionStorage?.length === 0;
    if (!isCartAlreadyEmpty) {
      setShoppingCart([]);
      sessionStorage.clear();
    }
  };

  const getTotal = () => {
    const calculateTotal = checkoutItems.reduce((acc, item): number => {
      acc += Number(item?.price) * item?.count;
      return acc;
    }, 0);
    return calculateTotal;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Checkout</h1>
      <button onClick={handleOnClick}>Remove all items in cart</button>

      <div className={styles.checkoutCardContainer}>
        {checkoutItems.map((item) => {
          return (
            <CheckoutCard
              key={item?.checkoutProductId}
              item={item}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              setCartUpdated={setCartUpdated}
            />
          );
        })}
      </div>
      <div className={styles.totalWrapper}>
        <div className={styles.totalContainer}>
          <div className={styles.total}>Total: {getTotal()} kr</div>
        </div>
      </div>
    </div>
  );
};

const CheckoutCard: FC<{
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
