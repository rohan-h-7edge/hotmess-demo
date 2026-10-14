export const MAX_CART_QUANTITY = 10;

export interface CartItem {
  productId: string;
  name: string;
  typeName: string;
  colour: string | null;
  price: number;
  currency: string;
  imageUrl: string;
  quantity: number;
  inStock: boolean;
}

export interface CartQuantityChange {
  productId: string;
  quantity: number;
}
