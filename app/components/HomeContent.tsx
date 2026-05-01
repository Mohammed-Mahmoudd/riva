"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSection from "./HeroSection";
import CategoryCard from "./CategoryCard";
import ProductCard from "./ProductCard";

import type { Product } from "../data/products";
import type { Category } from "../data/categories";

interface HomeContentProps {
  featured: Product[];
  newArrivals: Product[];
  categories: Category[];
}

export default function HomeContent({ featured, newArrivals, categories }: HomeContentProps) {
  return (
    <>
      <HeroSection />

      {/* Categories Section */}
      <section className="pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16">
        <div className="container-riva">
          <div className="text-center mb-6 sm:mb-10">
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Browse</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Shop by Category</h2>
          </div>
          <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 justify-start sm:justify-center px-1" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20" style={{ background: "var(--riva-ivory)" }}>
        <div className="container-riva">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Top Picks</p>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Bestsellers</h2>
            </div>
            <Link href="/shop" className="btn-outline text-xs sm:text-sm py-2 px-5 sm:py-3 sm:px-8">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 stagger-children">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80" alt="Spring Collection" fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,46,0.8), rgba(244,163,181,0.4))" }} />
        </div>
        <div className="container-riva relative z-10 text-center px-6">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 text-white/70">Limited Time</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Spring Collection
          </h2>
          <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-sm sm:max-w-md mx-auto">Up to 30% off on selected accessories. Don&apos;t miss out!</p>
          <Link href="/shop" className="btn-primary text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-9">Shop the Sale</Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container-riva">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-10 gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Just In</p>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">New Arrivals</h2>
            </div>
            <Link href="/shop" className="btn-outline text-xs sm:text-sm py-2 px-5 sm:py-3 sm:px-8">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 stagger-children">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
