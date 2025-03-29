export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  weight: number;
  options: option[];
};
export type option = {
  color: string | string[];
  power: number[];
  quantity: number;
  storage: string[];
};
