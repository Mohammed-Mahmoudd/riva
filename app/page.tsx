import HomeContent from "./components/HomeContent";
import {
  fetchFeaturedProducts,
  fetchNewArrivals,
  fetchAllCategories,
} from "@/sanity/lib/sanity-fetch";

export default async function Home() {
  const [featured, newArrivals, categories] = await Promise.all([
    fetchFeaturedProducts(),
    fetchNewArrivals(),
    fetchAllCategories(),
  ]);

  return (
    <HomeContent
      featured={featured}
      newArrivals={newArrivals}
      categories={categories}
    />
  );
}
