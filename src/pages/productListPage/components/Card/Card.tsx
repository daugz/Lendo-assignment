import { type FC } from "react";
import { type Product } from "../../../../types";
import styles from "./card.module.css";
import Button from "../Buttons/Button";
import { Available } from "../Availability/Availability";
import { findProductImage } from "../../../../utils";

type Card = {
  product: Product;
};

export const Card: FC<Card> = ({ product }) => {
  const imageUrl = findProductImage(product.name, product.brand);
  return (
    <li key={product?.id} className={styles.card}>
      <div className={styles.listContainer}>
        <div className={styles.imageWrapper}>
          {imageUrl && <img className={styles.image} src={imageUrl} />}{" "}
          <h2 className={styles.h2}>{product?.name}</h2>
        </div>
        <div>
          <Available Available={product.available} />
          <div className={styles.listItem}>
            <div className={styles.infoRow}>
              <p className={styles.paragraph}>{product?.price + " kr"} </p>
            </div>
          </div>

          <Button text="More info" id={product.id} />
        </div>
      </div>
    </li>
  );
};
