export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  description: string;
  badge?: "new" | "sale" | "bestseller";
  inStock: boolean;
  reviews?: {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    _createdAt: string;
  }[];
}
