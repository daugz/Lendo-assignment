import { type FC } from "react";
import { type Product } from "../../types";
import styles from "./card.module.css";
import Button from "../Buttons/Button";
import { Available } from "../Availability/Availability";
import { findProductImage } from "../../utils";

type Card = {
  product: Product;
};

export const Card: FC<Card> = ({ product }) => {
  return (
    <li key={product?.id} className={styles.card}>
      <div className={styles.listContainer}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={findProductImage(product.name, product.brand)}
          />
        </div>
        <h2 className={styles.h2}>{product?.name}</h2>

        <Available Available={product.available} />
        <div className={styles.listItem}>
          <div className={styles.infoRow}>
            <p className={styles.paragraph}>{product?.price + " kr"} </p>
          </div>
        </div>

        <Button text="More info" id={product.id} />
      </div>
    </li>
  );
};
