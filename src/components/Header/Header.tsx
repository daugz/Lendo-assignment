import { type FC } from "react";
import styles from "./Header.module.css";

type Header = {
  cartCount: number;
};

export const Header: FC<Header> = ({ cartCount }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="tel:0771131310" className={styles.telephone}>
          telephone
        </a>
        <a href="/" className={styles.headingLink}>
          <img src={"/Lendo-image.svg"} />
        </a>
        <a className={styles.shoppingCartLink}>
          <span className={styles.cartCount}>{cartCount}</span>
          <div className={styles.shoppingCartImage}></div>
        </a>
      </div>
      <nav className={styles.navLinkContainer}>
        <a href="/" className={styles.navLink}>
          Home
        </a>
        <a className={styles.navLink} href={"/checkout"}>
          Checkout
        </a>
      </nav>
    </header>
  );
};
