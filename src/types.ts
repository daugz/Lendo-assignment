export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  available: boolean;
  weight: number;
  options: Option[];
};
export type Option = {
  color: string | string[];
  power: number[];
  quantity: number;
  storage: string[];
};

export type CheckoutProduct = {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  color: string;
  weight?: number;
  power?: number;
  storage?: string;
  count: number;
};
