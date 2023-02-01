export interface ShopItem {
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating: { rate: number; count: number };
  title: string;
}
