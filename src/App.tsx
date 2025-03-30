import { useState } from "react";

import { Routes, Route } from "react-router";
import { DetailsPage } from "./pages/detailsPage/DetailsPage";
import { ProductListPage } from "./pages/ProductListPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { useFetchInventory } from "./hooks";
import { Header } from "./components/Header/Header";

function App() {
  const { inventory, isLoading } = useFetchInventory();
  const [shoppingCart, setShoppingCart] = useState<string[]>([]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />

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
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              setShoppingCart={setShoppingCart}
              shoppingCart={shoppingCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
