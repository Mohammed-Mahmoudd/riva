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

export const products: Product[] = [
  {
    id: "1",
    name: "Pearl Drop Earrings",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    ],
    category: "Earrings",
    colors: ["#FFFFFF", "#F4C2C2", "#D4AF37"],
    description:
      "Elegant pearl drop earrings with a delicate gold chain. Perfect for both casual outings and special occasions. Each pearl is hand-selected for its lustrous quality.",
    rating: 4.8,
    reviewCount: 124,
    badge: "bestseller",
    inStock: true,
  },
  {
    id: "2",
    name: "Crystal Hoop Earrings",
    price: 38,
    salePrice: 28,
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
    ],
    category: "Earrings",
    colors: ["#D4AF37", "#C0C0C0", "#F4A3B5"],
    description:
      "Sparkling crystal-encrusted hoop earrings that catch the light beautifully. Lightweight and comfortable for all-day wear.",
    rating: 4.6,
    reviewCount: 89,
    badge: "sale",
    inStock: true,
  },
  {
    id: "3",
    name: "Layered Gold Necklace",
    price: 62,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    ],
    category: "Necklaces",
    colors: ["#D4AF37", "#E8CDA0"],
    description:
      "A stunning three-layer gold necklace featuring dainty chains of varying lengths. The centerpiece features a small heart pendant adorned with a cubic zirconia stone.",
    rating: 4.9,
    reviewCount: 201,
    badge: "bestseller",
    inStock: true,
  },
  {
    id: "4",
    name: "Rose Pendant Necklace",
    price: 55,
    images: [
      "https://images.unsplash.com/photo-1515562141589-67f0d999b828?w=600&q=80",
    ],
    category: "Necklaces",
    colors: ["#F4A3B5", "#D4AF37", "#C0C0C0"],
    description:
      "Delicate rose-gold pendant necklace with a hand-crafted rose design. Adjustable chain length for versatile styling.",
    rating: 4.7,
    reviewCount: 156,
    badge: "new",
    inStock: true,
  },
  {
    id: "5",
    name: "Charm Bracelet Set",
    price: 42,
    salePrice: 35,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    ],
    category: "Bracelets",
    colors: ["#D4AF37", "#F4A3B5", "#FFFFFF"],
    description:
      "Set of three stackable charm bracelets with butterfly, star, and moon pendants. Mix and match for your perfect look.",
    rating: 4.5,
    reviewCount: 98,
    badge: "sale",
    inStock: true,
  },
  {
    id: "6",
    name: "Tennis Bracelet",
    price: 78,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
    ],
    category: "Bracelets",
    colors: ["#D4AF37", "#C0C0C0"],
    description:
      "Classic tennis bracelet with brilliant-cut cubic zirconia stones set in a gold-plated band. A timeless piece for any collection.",
    rating: 4.9,
    reviewCount: 167,
    badge: "bestseller",
    inStock: true,
  },
  {
    id: "7",
    name: "Silk Bow Hair Clip",
    price: 18,
    images: [
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
    ],
    category: "Hair Accessories",
    colors: ["#F4A3B5", "#1A1A2E", "#FFFFFF", "#D4AF37"],
    description:
      "Luxurious silk bow hair clip with a pearl center detail. Available in multiple colors to complement any outfit.",
    rating: 4.4,
    reviewCount: 76,
    badge: "new",
    inStock: true,
  },
  {
    id: "8",
    name: "Crystal Headband",
    price: 32,
    images: [
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
    ],
    category: "Hair Accessories",
    colors: ["#D4AF37", "#C0C0C0", "#F4A3B5"],
    description:
      "Stunning crystal-embellished headband that adds instant glamour. Flexible design fits comfortably on all head sizes.",
    rating: 4.6,
    reviewCount: 112,
    inStock: true,
  },
  {
    id: "9",
    name: "Mini Crossbody Bag",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80",
    ],
    category: "Bags",
    colors: ["#F4A3B5", "#1A1A2E", "#FFFFFF"],
    description:
      "Compact crossbody bag in soft vegan leather with gold-tone hardware. Features an adjustable chain strap and magnetic closure.",
    rating: 4.8,
    reviewCount: 189,
    badge: "bestseller",
    inStock: true,
  },
  {
    id: "10",
    name: "Quilted Clutch",
    price: 65,
    salePrice: 48,
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    ],
    category: "Bags",
    colors: ["#D4AF37", "#F4A3B5", "#1A1A2E"],
    description:
      "Elegant quilted clutch with a detachable wrist strap. Spacious interior with card slots and a zip pocket.",
    rating: 4.5,
    reviewCount: 94,
    badge: "sale",
    inStock: true,
  },
  {
    id: "11",
    name: "Cat Eye Sunglasses",
    price: 52,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    ],
    category: "Sunglasses",
    colors: ["#1A1A2E", "#F4A3B5", "#D4AF37"],
    description:
      "Retro-inspired cat eye sunglasses with UV400 protection. Lightweight acetate frame with gold-tone temple accents.",
    rating: 4.7,
    reviewCount: 143,
    badge: "new",
    inStock: true,
  },
  {
    id: "12",
    name: "Oversized Round Sunglasses",
    price: 48,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    ],
    category: "Sunglasses",
    colors: ["#8B4513", "#1A1A2E", "#F4A3B5"],
    description:
      "Fashion-forward oversized round sunglasses with gradient lenses. Perfect for adding a touch of glamour to any look.",
    rating: 4.3,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: "13",
    name: "Butterfly Stud Earrings",
    price: 24,
    images: [
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80",
    ],
    category: "Earrings",
    colors: ["#D4AF37", "#F4A3B5", "#C0C0C0"],
    description:
      "Dainty butterfly stud earrings with micro-pavé crystal detailing. Hypoallergenic posts suitable for sensitive ears.",
    rating: 4.6,
    reviewCount: 88,
    badge: "new",
    inStock: true,
  },
  {
    id: "14",
    name: "Beaded Anklet Set",
    price: 22,
    salePrice: 16,
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=600&q=80",
    ],
    category: "Bracelets",
    colors: ["#D4AF37", "#F4A3B5", "#87CEEB"],
    description:
      "Set of two delicate beaded anklets with shell and star charms. Perfect for beach days and summer vibes.",
    rating: 4.4,
    reviewCount: 55,
    badge: "sale",
    inStock: true,
  },
  {
    id: "15",
    name: "Velvet Scrunchie Pack",
    price: 15,
    images: [
      "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=600&q=80",
    ],
    category: "Hair Accessories",
    colors: ["#F4A3B5", "#800020", "#1A1A2E", "#D4AF37"],
    description:
      "Pack of four luxe velvet scrunchies in curated colors. Gentle on hair while adding a chic touch to any ponytail or bun.",
    rating: 4.7,
    reviewCount: 203,
    badge: "bestseller",
    inStock: true,
  },
  {
    id: "16",
    name: "Chain Link Bag",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
    category: "Bags",
    colors: ["#C0C0C0", "#D4AF37", "#1A1A2E"],
    description:
      "Statement chain link shoulder bag with quilted leather body. Luxe gold chain strap converts from shoulder to crossbody.",
    rating: 4.8,
    reviewCount: 134,
    badge: "new",
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === "bestseller");
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.badge === "new");
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => p.badge === "sale");
}
