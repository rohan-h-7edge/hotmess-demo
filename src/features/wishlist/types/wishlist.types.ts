export interface WishlistItem {
  productId: string;
  name: string;
  typeName: string;
  colour: string | null;
  price: number;
  currency: string;
  imageUrl: string;
  inStock: boolean;
}
