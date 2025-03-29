import { type FC } from "react";
import styles from "./Header.module.css";

type Header = {
  cartCount: number;
};

export const Header: FC<Header> = ({ cartCount }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="/" className={styles.headingLink}>
          <img src={"/Lendo-image.svg"} />
        </a>
        <a className={styles.shoppingCartLink}>
          <span className={styles.cartCount}>{cartCount}</span>
          <div className={styles.shoppingCartImage}></div>
        </a>
      </div>
    </header>
  );
};
