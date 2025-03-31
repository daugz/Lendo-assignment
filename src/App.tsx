import { useState } from "react";

import { Routes, Route } from "react-router";
import { DetailsPage, ProductListPage, CheckoutPage } from "./pages";
import { useFetchInventory } from "./hooks";
import { Header } from "./components/Header/Header";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  const { inventory, isLoading } = useFetchInventory();
  const [shoppingCart, setShoppingCart] = useState<string[]>([]);
  const [cartUpdated, setCartUpdated] = useState(0);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ErrorBoundary>
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
              setCartUpdated={setCartUpdated}
            />
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
