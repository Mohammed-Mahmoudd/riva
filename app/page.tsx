import HomeContent from "./components/HomeContent";
import {
  fetchFeaturedProducts,
  fetchNewArrivals,
  fetchAllCategories,
  fetchProductsByCategory,
} from "@/sanity/lib/sanity-fetch";

export default async function Home() {
  const [featured, newArrivals, categories, watches, handfans] = await Promise.all([
    fetchFeaturedProducts(),
    fetchNewArrivals(),
    fetchAllCategories(),
    fetchProductsByCategory("Watch"),
    fetchProductsByCategory("Hand Fan"),
  ]);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RIVA",
    url: "https://itsriva.com",
    description: "Premium accessories for women & girls in Egypt",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://itsriva.com/shop?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeContent
        featured={featured}
        newArrivals={newArrivals}
        categories={categories}
        watches={watches}
        handfans={handfans}
      />
    </>
  );
}
