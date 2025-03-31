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
  id: string;
  checkoutProductId: string;
  image: string;
  name: string;
  brand: string;
  price: string;
  color: string;
  weight?: string;
  power?: string | null;
  storage?: string | null;
  quantity: number;
  count: number;
};
