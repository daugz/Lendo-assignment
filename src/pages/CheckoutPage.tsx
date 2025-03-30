import { type FC } from "react";
import styles from "./checkoutPage.module.css";
import { type Product } from "../types";
import { findColor } from "../utils";

export const CheckoutPage = () => {
  const getAllCheckoutItems = () => {
    let cart: Product[] = [];
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
  const checkoutItems = getAllCheckoutItems();
  console.log(checkoutItems);
  const handleOnClick = () => {
    const isCartAlreadyEmpty = sessionStorage?.length === 0;

    if (!sessionStorage?.length || !isCartAlreadyEmpty) {
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

const CheckoutCard: FC<{ item: any }> = ({ item }) => {
  return (
    <div className={styles.checkOutCard}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={item?.image} />
      </div>
      <div className={styles.infoContainer}>
        {item.brand && <div>{item.brand}</div>}
        <div className={styles.colorContainer}>
          <div className={`${styles.color} ${findColor(item?.color)}`} />
        </div>
        {item.name && <h2>{item.name}</h2>}
        {item.price && <div>{item.price} kr</div>}
        {item.power && <div>{item.power}</div>}
        {item.storage && <div>{item.storage}</div>}
        {item.weight && <div>{item.weight}</div>}
      </div>
    </div>
  );
};
