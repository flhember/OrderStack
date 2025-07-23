export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};
