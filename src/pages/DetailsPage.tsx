import { Header } from "../components/Header/Header";
import { Product } from "../types";

export const DetailsPage = ({
  products,
  cartCount,
}: {
  products: Product[];
  cartCount: number;
}) => {
  return (
    <div>
      <Header cartCount={cartCount}></Header>Details
    </div>
  );
};
