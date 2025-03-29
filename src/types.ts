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
