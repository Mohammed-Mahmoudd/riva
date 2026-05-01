export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  colors: string[];
  description: string;
  rating: number;
  reviewCount: number;
  badge?: "new" | "sale" | "bestseller";
  inStock: boolean;
}
