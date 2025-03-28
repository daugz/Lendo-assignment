import { useState } from "react";

import { Routes, Route } from "react-router";
import { DetailsPage } from "./pages/detailsPage/DetailsPage";
import { ProductListPage } from "./pages/ProductListPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { useFetchInventory } from "./hooks";
import { Product } from "./types";
import { Header } from "./components/Header/Header";

function App() {
  const { inventory, isLoading } = useFetchInventory();
  const [shoppingCart, setShoppingCart] = useState<Product[]>([]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header cartCount={shoppingCart.length} />

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
          path={`/details/:id`}
          element={
            <DetailsPage
              products={inventory}
              cartCount={shoppingCart.length}
              setShoppingCart={setShoppingCart}
              shoppingCart={shoppingCart}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
