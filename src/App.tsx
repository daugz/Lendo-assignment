import { useEffect, useState } from "react";

import styles from "./App.module.css";
import { ProductList } from "./components/ProductList/ProductList";
import { Header } from "./components/Header/Header";

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

  const [shoppingCart, setShoppingCart] = useState([]);

  const fetchInventory = async () => {
    const inventoryResponse = await fetch("../api/inventory.json");
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
      <Header cartCount={shoppingCart.length} />
      <div className={styles.productListContainer}>
        {inventory?.length > 0 && <ProductList products={inventory} />}
      </div>
    </div>
  );
}

export default App;
