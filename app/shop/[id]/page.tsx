import Link from "next/link";
import ProductDetailContent from "../../components/ProductDetailContent";
import {
  fetchProductById,
  fetchAllProducts,
} from "@/sanity/lib/sanity-fetch";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--riva-ivory)" }}>
        <div className="text-center">
          <p className="text-5xl mb-4">😢</p>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Product Not Found</h1>
          <Link href="/shop" className="btn-primary mt-4 inline-flex">Back to Shop</Link>
        </div>
      </div>
    );
  }

  // Fetch related products (same category, excluding current)
  const allProducts = await fetchAllProducts();
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailContent product={product} relatedProducts={related} />;
}
