import { Dispatch, SetStateAction, type FC } from "react";
import styles from "./checkoutPage.module.css";
import { findColor, getAllCheckoutItems, removeItem } from "../utils";
import { CheckoutProduct } from "../types";

type CheckoutPage = {
  shoppingCart: string[];
  setShoppingCart: Dispatch<SetStateAction<string[]>>;
};

export const CheckoutPage: FC<CheckoutPage> = ({
  shoppingCart,
  setShoppingCart,
}) => {
  const checkoutItems = getAllCheckoutItems();
  console.log(checkoutItems);
  const handleOnClick = () => {
    const isCartAlreadyEmpty = sessionStorage?.length === 0;
    if (!isCartAlreadyEmpty) {
      setShoppingCart([]);
      sessionStorage.clear();
    }
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
            />
          );
        })}
      </div>
    </div>
  );
};

const CheckoutCard: FC<{
  item: CheckoutProduct;
  shoppingCart: string[];
  setShoppingCart: Dispatch<SetStateAction<string[]>>;
}> = ({ item, shoppingCart, setShoppingCart }) => {
  const handleOnRemove = () => {
    removeItem(item, shoppingCart, setShoppingCart);
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
          <div className={styles.colorContainer}>
            <div className={`${styles.color} ${findColor(item?.color)}`} />
          </div>
        </div>
        {item.price && <div className={styles.bold}>{item.price} kr</div>}
        {item.power && <div>{item.power} W</div>}
        {item.storage && <div>{item.storage} gb</div>}
        {item.weight && <div>{item.weight} kg</div>}
        <div className={styles.quantityContainer}>
          <button className={styles.decrement} />
          <div className={styles.amount}>{item?.count}</div>
          <button className={styles.increment} />
        </div>
        <button className={styles.removeButton} onClick={handleOnRemove}>
          <img src={"/Icons/trash-can-icon.svg"} /> Remove item
        </button>
      </div>
    </div>
  );
};
