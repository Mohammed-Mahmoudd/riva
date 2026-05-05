"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";
import type { Category } from "../data/categories";



interface ShopContentProps {
  products: Product[];
  categories: Category[];
}

function ShopContentInner({ products, categories }: ShopContentProps) {
  const searchParams = useSearchParams();
  const catQuery = searchParams.get("category");
  const categoryNames = ["All", ...categories.map((c) => c.name)];
  
  const initialCategory = catQuery && categoryNames.includes(catQuery) ? catQuery : "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    return result;
  }, [products, selectedCategory]);



  return (
    <div style={{ background: "var(--riva-ivory)" }} className="min-h-screen">
      <div
        className="py-12 text-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <p
          className="text-sm font-medium tracking-[0.2em] uppercase mb-2"
          style={{ color: "var(--riva-rose-dark)" }}
        >
          Collection
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--riva-charcoal)",
          }}
        >
          Our Shop
        </h1>
      </div>

      <div className="container-riva px-6 sm:px-8 py-8 sm:py-24">
        {/* Mobile Category Pills (Horizontal Scroll) */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-6 px-6 mb-8 relative z-20">
          <div className="flex gap-3 min-w-max pb-2">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer touch-manipulation"
                style={{
                  background: selectedCategory === cat ? "var(--riva-charcoal)" : "white",
                  color: selectedCategory === cat ? "white" : "var(--riva-charcoal)",
                  border: `1px solid ${selectedCategory === cat ? "var(--riva-charcoal)" : "var(--riva-cream)"}`,
                  boxShadow: selectedCategory === cat ? "0 4px 14px rgba(0,0,0,0.15)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <p className="text-sm font-medium" style={{ color: "var(--riva-charcoal)" }}>
            {filtered.length} products
          </p>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-[220px] flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--riva-charcoal)" }}>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categoryNames.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer"
                      style={{
                        background: selectedCategory === cat ? "var(--riva-blush)" : "transparent",
                        color: selectedCategory === cat ? "var(--riva-rose-dark)" : "#666",
                        fontWeight: selectedCategory === cat ? 600 : 400,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 w-full">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  No products found
                </p>
                <p className="text-sm" style={{ color: "#999" }}>
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 stagger-children">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


    </div>
  );
}

export default function ShopContent(props: ShopContentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "var(--riva-ivory)" }} />}>
      <ShopContentInner {...props} />
    </Suspense>
  );
}
