import { ProductList } from "../components/ProductList/ProductList";
import { Header } from "../components/Header/Header";
import { type Product } from "../types";
import styles from "../App.module.css";

export const ProductListPage = ({
  products,
  cartCount,
}: {
  products: Product[];
  cartCount: number;
}) => {
  return (
    <div>
      <Header cartCount={cartCount} />
      <div className={styles.productListContainer}>
        {products?.length > 0 && <ProductList products={products} />}
      </div>
    </div>
  );
};
