import { Dispatch, SetStateAction, type FC } from "react";
import styles from "./checkoutPage.module.css";
import { findColor, getAllCheckoutItems } from "../utils";
import { CheckoutProduct } from "../types";

type CheckoutPage = {
  shoppingCart: string[];
  setShoppingCart: Dispatch<SetStateAction<[]>>;
};

export const CheckoutPage: FC<CheckoutPage> = ({ setShoppingCart }) => {
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
          return <CheckoutCard item={item} />;
        })}
      </div>
    </div>
  );
};

const CheckoutCard: FC<{ item: CheckoutProduct }> = ({ item }) => {
  return (
    <div className={styles.checkOutCard}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={item?.image} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.colorContainer}>
          <div className={`${styles.color} ${findColor(item?.color)}`} />
        </div>
        {item.name && <h2>{item.name}</h2>}
        {item.brand && <div className={styles.bold}>{item.brand}</div>}
        {item.price && <div>{item.price} kr</div>}
        {item.power && <div>{item.power} W</div>}
        {item.storage && <div>{item.storage} gb</div>}
        {item.weight && <div>{item.weight} kg</div>}
      </div>
    </div>
  );
};
