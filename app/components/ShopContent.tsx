"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";
import type { Category } from "../data/categories";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under EGP 25", min: 0, max: 25 },
  { label: "EGP 25 - EGP 50", min: 25, max: 50 },
  { label: "EGP 50 - EGP 80", min: 50, max: 80 },
  { label: "EGP 80+", min: 80, max: Infinity },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

function FilterContent({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  categoryNames,
}: {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedPrice: number;
  setSelectedPrice: (v: number) => void;
  categoryNames: string[];
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--riva-charcoal)" }}
        >
          Category
        </h3>
        <div className="space-y-2">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer"
              style={{
                background:
                  selectedCategory === cat
                    ? "var(--riva-blush)"
                    : "transparent",
                color:
                  selectedCategory === cat ? "var(--riva-rose-dark)" : "#666",
                fontWeight: selectedCategory === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="h-px" style={{ background: "var(--riva-cream)" }} />
      <div>
        <h3
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--riva-charcoal)" }}
        >
          Price Range
        </h3>
        <div className="space-y-2">
          {priceRanges.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setSelectedPrice(i)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 cursor-pointer"
              style={{
                background:
                  selectedPrice === i ? "var(--riva-blush)" : "transparent",
                color: selectedPrice === i ? "var(--riva-rose-dark)" : "#666",
                fontWeight: selectedPrice === i ? 600 : 400,
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-px" style={{ background: "var(--riva-cream)" }} />
      <button
        onClick={() => {
          setSelectedCategory("All");
          setSelectedPrice(0);
        }}
        className="text-sm font-medium transition-colors hover:text-[var(--riva-rose)]"
        style={{ color: "#999" }}
      >
        ✕ Clear All Filters
      </button>
    </div>
  );
}

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
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    const range = priceRanges[selectedPrice];
    result = result.filter((p) => {
      const price = p.salePrice || p.price;
      return price >= range.min && price < range.max;
    });
    switch (sortBy) {
      case "price-low":
        result.sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price),
        );
        break;
      case "price-high":
        result.sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price),
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a) => (a.badge === "new" ? -1 : 1));
        break;
    }
    return result;
  }, [products, selectedCategory, selectedPrice, sortBy]);

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    selectedPrice,
    setSelectedPrice,
    categoryNames,
  };

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

      <div className="container-riva px-6 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <p className="text-sm" style={{ color: "#999" }}>
            {filtered.length} products
          </p>
          <div className="flex items-center gap-3 justify-start sm:justify-end">
            <button
              className="md:hidden border border-[var(--riva-charcoal)] text-[var(--riva-charcoal)] text-[10px] sm:text-xs font-semibold py-1.5 px-4 rounded-full transition-colors hover:bg-[var(--riva-charcoal)] hover:text-white"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs sm:text-sm px-4 py-2 rounded-full border bg-white focus:outline-none focus:border-[var(--riva-rose)] transition-colors"
              style={{ borderColor: "var(--riva-cream)" }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden md:block w-[220px] flex-shrink-0">
            <div className="sticky top-28">
              <FilterContent {...filterProps} />
            </div>
          </aside>

          <div className="flex-1">
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

      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed top-0 left-0 z-50 h-full w-[85vw] max-w-[320px] bg-white shadow-2xl p-6 sm:p-8 overflow-y-auto md:hidden">
            <div className="flex justify-between items-center mb-8">
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--riva-blush)]"
              >
                ✕
              </button>
            </div>
            <FilterContent {...filterProps} />
          </div>
        </>
      )}
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
