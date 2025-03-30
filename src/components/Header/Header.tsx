import { type FC } from "react";
import styles from "./Header.module.css";
import { useLocation } from "react-router";

export const Header: FC = () => {
  const cart = sessionStorage?.length;
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <a href="tel:0771131310" className={styles.telephone}>
          telephone
        </a>
        <a href="/" className={styles.headingLink}>
          <img src={"/Lendo-image.svg"} />
        </a>
        <a href={"/checkout"} className={styles.shoppingCartLink}>
          <span className={styles.cartCount}>{cart}</span>
          <div className={styles.shoppingCartImage}></div>
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

  const checkIfActiveLink = (link: string, pathName: string) => {
    const isHomeLink = pathName === "/";
    const isActiveNavLink =
      pathName?.split("/")[1].trim() === link?.split("/")[1].trim();
    console.log(pathName?.split("/")[1], link?.split("/")[1]);
    if (isHomeLink) {
      return true;
    } else if (isActiveNavLink) return true;
    else return false;
  };
  console.log(link, checkIfActiveLink(link, pathname));
  return (
    <a
      href={link}
      className={`${styles.navLink} ${
        checkIfActiveLink(link, pathname) ? styles.active : ""
      }`}
    >
      {text}
    </a>
  );
};
