import { Dispatch, SetStateAction, type FC } from "react";
import styles from "./checkoutPage.module.css";
import { getAllCheckoutItems } from "../../utils";
import { CheckoutCard } from "./CheckoutCard";

type CheckoutPage = {
  shoppingCart: string[];
  setShoppingCart: Dispatch<SetStateAction<string[]>>;
  setCartUpdated: Dispatch<SetStateAction<number>>;
};

export const CheckoutPage: FC<CheckoutPage> = ({
  shoppingCart,
  setShoppingCart,
  setCartUpdated,
}) => {
  const checkoutItems = getAllCheckoutItems();
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
        <div className={styles.total}>Total: {getTotal()} kr</div>
      </div>
    </div>
  );
};
