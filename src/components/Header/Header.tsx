import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="/" className={styles.headingLink}>
          <img src={"./Lendo-image.svg"} />
        </a>
        <a className={styles.shoppingCartLink}>
          <div className={styles.shoppingCartImage}></div>
        </a>
      </div>
    </header>
  );
};
