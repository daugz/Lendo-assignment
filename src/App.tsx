import { useEffect, useState } from "react";

import styles from "./App.module.css";

import { Routes, Route } from "react-router";
import { DetailsPage } from "./pages/DetailsPage";
import { ProductListPage } from "./pages/ProductListPage";
import { CheckoutPage } from "./pages/CheckoutPage";

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
    <Routes>
      <Route
        path="/"
        element={
          <ProductListPage
            products={inventory}
            cartCount={shoppingCart.length}
          />
        }
      />
      <Route
        path="/details"
        element={
          <DetailsPage products={inventory} cartCount={shoppingCart.length} />
        }
      />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
