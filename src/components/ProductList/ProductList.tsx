import { type FC } from "react";
import style from "./productList.module.css";
import { type Product } from "../../App";

export const ProductList: FC<{ products: Product[] }> = ({ products }) => {
  if (products.length <= 0) return null;

  return (
    products && (
      <ol className={style.list}>
        {products.map((product: Product) => {
          return (
            <li key={product?.id}>
              <ul>
                <li className={style.listItem}>{product?.name}</li>
              </ul>
            </li>
          );
        })}
      </ol>
    )
  );
};
