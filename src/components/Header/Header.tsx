import { type FC } from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router";
import { getAllCheckoutItems } from "../../utils";

export const Header: FC = () => {
  const cart = getAllCheckoutItems().reduce((acc, item) => {
    acc += item.count;
    return acc;
  }, 0);
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="tel:0771131310" className={styles.telephone}>
          <svg viewBox="0 0 24 24">
            <path d="m20.34 14.386-3.647-1.562a1.941 1.941 0 0 0-2.273.555l-1.02 1.243a11.077 11.077 0 0 1-4.011-3.974l1.246-1.02a1.95 1.95 0 0 0 .558-2.266L9.621 3.67a1.951 1.951 0 0 0-2.224-1.12l-3.39.781A1.931 1.931 0 0 0 2.5 5.224C2.5 14.2 9.806 21.5 18.792 21.5c.912 0 1.691-.62 1.86-1.504l.783-3.39a1.882 1.882 0 0 0-1.094-2.22Zm-.608 1.819-.784 3.392c-.017.04-.078.122-.157.122-8 0-14.508-6.502-14.508-14.495 0-.078.048-.139.124-.156L7.8 4.285a.166.166 0 0 1 .186.093l1.565 3.65a.161.161 0 0 1-.047.187L7.693 9.666a.89.89 0 0 0-.236 1.081 12.7 12.7 0 0 0 5.776 5.77c.338.183.82.086 1.083-.235l1.487-1.813a.153.153 0 0 1 .182-.042l3.65 1.562c.07.064.111.142.097.216Z" />
          </svg>
        </a>
        <a href="/" className={styles.headingLink}>
          <img src={"/Lendo-image.svg"} />
        </a>
        <a href={"/checkout"} className={styles.shoppingCartLink}>
          <div className={styles.shoppingCartImage}>
            <span className={styles.cartCount}>{cart}</span>
            <svg
              viewBox="0 0 576 512"
              xmlns="http://www.w3.org/2000/svg"
              color="white"
              fill="white"
            >
              <path d="M560 192l-101.6 .002l-93.11-179.1c-6.062-11.72-20.61-16.37-32.36-10.22c-11.78 6.094-16.34 20.59-10.22 32.34l81.61 156.9H171.7l81.61-156.9C259.4 23.32 254.9 8.822 243.1 2.728C231.3-3.397 216.8 1.228 210.7 12.95l-93.11 179.1L16 192c-8.836 0-16 7.164-16 15.1v32c0 8.836 7.164 15.1 16 15.1h23.11l45.75 205.9C91.37 491.2 117.3 512 147.3 512h281.3c29.1 0 55.97-20.83 62.48-50.12l45.75-205.9H560c8.838 0 16-7.164 16-15.1v-32C576 199.2 568.8 192 560 192zM192 432c0 8.834-7.166 15.1-16 15.1c-8.832 0-16-7.166-16-15.1V304c0-8.834 7.168-15.1 16-15.1c8.834 0 16 7.166 16 15.1V432zM304 432c0 8.834-7.166 15.1-16 15.1c-8.832 0-16-7.165-16-15.1V304c0-8.834 7.168-15.1 16-15.1c8.834 0 16 7.166 16 15.1V432zM416 432c0 8.834-7.166 15.1-16 15.1c-8.832 0-16-7.166-16-15.1V304c0-8.834 7.168-15.1 16-15.1c8.834 0 16 7.166 16 15.1V432z" />
            </svg>
          </div>
        </a>
      </div>
      <nav className={styles.navLinkContainer}>
        <NavLink link={"/"} text={"Home"} />

        <NavLink link={"/checkout"} text={"Checkout"} />
      </nav>
    </header>
  );
};

const NavLink: FC<{ link: string; text: string }> = ({ link, text }) => {
  const { pathname } = useLocation();

  return (
    <a
      href={link}
      className={`${styles.navLink} ${link === pathname ? styles.active : ""}`}
    >
      {text}
    </a>
  );
};
