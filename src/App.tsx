import { useEffect, useState } from "react";

import styles from "./App.module.css";
import Button from "./components/Button";
import { ProductList } from "./components/ProductList/ProductList";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  weight: number;
  options: {
    color: string | string[];
    power: number[];
    quantity: number;
    storage: string[];
  }[];
};
function App() {
  const [inventory, setInventory] = useState<Product[] | []>([]);

  const [shoppingCart, setShoppingCart] = useState(null);

  const fetchInventory = async () => {
    const inventoryResponse = await fetch("./inventory.json");
    const inventoryData = await inventoryResponse.json();

    setInventory(inventoryData?.items);
  };

  useEffect(() => {
    try {
      fetchInventory();
    } catch (error) {
      console.error("Error when fetching inventory", error);
    }
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <a href="/" className={styles.headingLink}>
            <img src={"./Lendo-image.svg"} />
          </a>
          <a className={styles.shoppingCartLink}>
            <div className={styles.shoppingCartImage}></div>
          </a>
        </div>
      </header>
      <div className={styles.productListContainer}>
        {inventory?.length > 0 && <ProductList products={inventory} />}
      </div>
      <Button text="Add" />
    </div>
  );
}

export default App;
