import { type FC } from "react";
import { type Product } from "../../App";
import styles from "./card.module.css";

type Card = {
  product: Product;
};

export const Card: FC<Card> = ({ product }) => {
  return (
    <li key={product?.id} className={styles.card}>
      <h2 className={styles.h2}>{product?.name}</h2>

      <ul className={styles.infoList}>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Price:"}</p> <p>{product?.price} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Weight:"}</p> <p>{product?.weight} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Availability:"}</p> <p>{product?.available} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRow}>
            <p>{"Brand:"}</p> <p>{product?.brand} </p>
          </div>
        </li>
        <li className={styles.listItem}>
          <div className={styles.infoRowOptions}>
            {product.options.map((option) => {
              if (option?.color) {
                return (
                  <>
                    {"Color:"}
                    <select className={styles.select}>
                      {<option value={option.color}>{option.color}</option>}
                    </select>
                  </>
                );
              } else if (option?.power) {
                return (
                  <>
                    {"Power:"}
                    <select className={styles.select}>
                      {product.options.map((option) => {
                        return (
                          <option value={option.power}>{option.power}</option>
                        );
                      })}
                    </select>
                  </>
                );
              } else return <></>;
            })}

            {"Power:"}
          </div>
          {product?.options.map((option) => {
            return (
              <div className={""}>
                <p>{option.color}</p>
                <p>{option.power}</p>
                <p>{option.quantity}</p>
                <p>{option.storage}</p>
              </div>
            );
          })}
        </li>
      </ul>
    </li>
  );
};
