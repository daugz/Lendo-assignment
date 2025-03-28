import { useEffect, useState } from "react";

import styles from "./App.module.css";
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
    <div className={styles.body}>
      <header className={styles.header}></header>
    </div>
  );
}

export default App;
