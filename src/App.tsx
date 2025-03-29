import { useState } from "react";

import { Routes, Route } from "react-router";
import { DetailsPage } from "./pages/DetailsPage";
import { ProductListPage } from "./pages/ProductListPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { useFetchInventory } from "./hooks";

function App() {
  const { inventory } = useFetchInventory();
  const [shoppingCart, setShoppingCart] = useState([]);

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
        path={`/details/:id`}
        element={
          <DetailsPage products={inventory} cartCount={shoppingCart.length} />
        }
      />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
