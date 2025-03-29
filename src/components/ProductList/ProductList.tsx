import { type FC } from "react";
import styles from "./productList.module.css";
import { type Product } from "../../types";
import { Card } from "../Card/Card";

export const ProductList: FC<{ products: Product[] }> = ({ products }) => {
  if (products.length <= 0) return null;

  return (
    products && (
      <ol className={styles.orderedList}>
        {products.map((product: Product) => {
          return product && <Card key={product.id} product={product} />;
        })}
      </ol>
    )
  );
};
