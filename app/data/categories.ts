export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Earrings",
    slug: "earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
    itemCount: 24,
  },
  {
    id: "2",
    name: "Necklaces",
    slug: "necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
    itemCount: 18,
  },
  {
    id: "3",
    name: "Bracelets",
    slug: "bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    itemCount: 15,
  },
  {
    id: "4",
    name: "Hair Accessories",
    slug: "hair-accessories",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=500&q=80",
    itemCount: 22,
  },
  {
    id: "5",
    name: "Bags",
    slug: "bags",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500&q=80",
    itemCount: 12,
  },
  {
    id: "6",
    name: "Sunglasses",
    slug: "sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
    itemCount: 10,
  },
];
