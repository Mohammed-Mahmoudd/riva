import type { Metadata } from "next";
import ShopContent from "../components/ShopContent";
import {
  fetchAllProducts,
  fetchAllCategories,
} from "@/sanity/lib/sanity-fetch";

export const metadata: Metadata = {
  title: "Shop All Accessories",
  description:
    "Browse RIVA's full collection of premium accessories. Earrings, necklaces, bracelets, bags, sunglasses & more. Filter by category, price, and rating. Free shipping across Egypt.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop All Accessories | RIVA",
    description: "Browse our full collection of premium accessories for women & girls in Egypt.",
    url: "https://itsriva.com/shop",
    siteName: "RIVA",
    type: "website",
  },
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
  ]);

  return <ShopContent products={products} categories={categories} />;
}
