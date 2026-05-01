import ShopContent from "../components/ShopContent";
import {
  fetchAllProducts,
  fetchAllCategories,
} from "@/sanity/lib/sanity-fetch";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
  ]);

  return <ShopContent products={products} categories={categories} />;
}
