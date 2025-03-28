import { type FC } from "react";
import styles from "./productList.module.css";
import { type Product } from "../../App";

export const ProductList: FC<{ products: Product[] }> = ({ products }) => {
  if (products.length <= 0) return null;

  return (
    products && (
      <ol className={styles.list}>
        {products.map((product: Product) => {
          return (
            <li key={product?.id}>
              <ul>
                <li className={styles.listItem}>
                  <h2 className={styles.h2}>{product?.name}</h2>
                </li>
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
                  <div className={styles.infoRow}>
                    {"options"}
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
                  </div>
                </li>
              </ul>
            </li>
          );
        })}
      </ol>
    )
  );
};
