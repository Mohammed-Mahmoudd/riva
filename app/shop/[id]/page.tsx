import Link from "next/link";
import type { Metadata } from "next";
import ProductDetailContent from "../../components/ProductDetailContent";
import {
  fetchProductById,
  fetchAllProducts,
} from "@/sanity/lib/sanity-fetch";

// Dynamic SEO metadata per product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const price = product.salePrice || product.price;
  const reviewCount = product.reviews?.length || 0;
  const avgRating =
    reviewCount > 0
      ? (
          product.reviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        ).toFixed(1)
      : undefined;

  return {
    title: `${product.name} — ${product.category}`,
    description: product.description
      ? product.description.slice(0, 160)
      : `Shop ${product.name} from RIVA. Premium ${product.category} accessories in Egypt. EGP ${price}.`,
    openGraph: {
      title: `${product.name} | RIVA`,
      description: `Shop ${product.name} — EGP ${price}. ${product.category} accessories from RIVA.`,
      url: `https://itsriva.com/shop/${product.id}`,
      siteName: "RIVA",
      images: product.images[0]
        ? [
            {
              url: product.images[0],
              width: 800,
              height: 1067,
              alt: product.name,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | RIVA`,
      description: `Shop ${product.name} — EGP ${price}`,
      images: product.images[0] ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `/shop/${product.id}`,
    },
  };
}

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

  // Build Product JSON-LD for rich snippets
  const reviewCount = product.reviews?.length || 0;
  const avgRating =
    reviewCount > 0
      ? (
          product.reviews!.reduce((acc, r) => acc + r.rating, 0) / reviewCount
        ).toFixed(1)
      : undefined;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "RIVA",
    },
    offers: {
      "@type": "Offer",
      url: `https://itsriva.com/shop/${product.id}`,
      priceCurrency: "EGP",
      price: product.salePrice || product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "RIVA",
      },
    },
    ...(avgRating && reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avgRating,
            reviewCount: reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
          review: product.reviews!.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: r.name,
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody: r.comment,
            datePublished: r._createdAt,
          })),
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://itsriva.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://itsriva.com/shop",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `https://itsriva.com/shop?category=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `https://itsriva.com/shop/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailContent product={product} relatedProducts={related} />
    </>
  );
}
