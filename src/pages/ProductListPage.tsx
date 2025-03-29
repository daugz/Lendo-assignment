import { ProductList } from "../components/ProductList/ProductList";
import { type Product } from "../types";
import styles from "../App.module.css";

export const ProductListPage = ({
  products,
}: {
  products: Product[];
  cartCount: number;
}) => {
  return (
    <div>
      <div className={styles.productListContainer}>
        {products?.length > 0 && <ProductList products={products} />}
      </div>
    </div>
  );
};
