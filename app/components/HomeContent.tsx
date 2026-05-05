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
  watches?: Product[];
  handfans?: Product[];
}

export default function HomeContent({ featured, newArrivals, categories, watches, handfans }: HomeContentProps) {
  return (
    <>
      <HeroSection />

      {/* Elegant Divider */}
      <div className="flex items-center justify-center py-6 sm:py-8">
        <div className="w-12 h-px" style={{ background: "var(--riva-rose-light)" }} />
        <div className="w-1.5 h-1.5 rounded-full mx-3" style={{ background: "var(--riva-rose)" }} />
        <div className="w-12 h-px" style={{ background: "var(--riva-rose-light)" }} />
      </div>

      {/* Categories Section */}
      <section className="pb-10 sm:pb-14 md:pb-16">
        <div className="container-riva">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Categories</p>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Shop by Category</h2>
          </div>
          <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 justify-start sm:justify-center px-1 scrollbar-hide" style={{ WebkitOverflowScrolling: "touch" }}>
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-10 sm:py-14 md:py-20" style={{ background: "var(--riva-ivory)" }}>
        <div className="container-riva">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Top Picks</p>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Best Sellers</h2>
            </div>
            <Link href="/shop" className="btn-outline text-xs sm:text-sm py-2 px-5 sm:py-3 sm:px-8">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 stagger-children">
            {featured.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner - Free Ring Offer */}
      <section className="relative py-14 sm:py-18 md:py-24 overflow-hidden">
        {/* Background Image (visible on mobile only) */}
        <div className="absolute inset-0 md:hidden">
          <Image src="/free-ring-gift.jpg" alt="Free Ring Offer" fill className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,46,0.95), rgba(26,26,46,0.6))" }} />
        </div>
        {/* Solid background for desktop */}
        <div className="absolute inset-0 hidden md:block" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d1f3d 100%)" }} />
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 hidden md:block opacity-30" style={{ background: "radial-gradient(circle at 70% 50%, rgba(221,167,165,0.2), transparent 60%)" }} />
        
        <div className="container-riva relative z-10 flex flex-col md:flex-row items-center justify-between px-6 gap-10">
          <div className="text-center md:text-left max-w-lg">
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: "#FFE5B4" }}>
              Free Gift
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Free Ring<br/>With Every Order
            </h2>
            <p className="text-sm sm:text-base text-white/75 mb-8 leading-relaxed max-w-md">
              Order anything from our store and get a beautiful ring for free. No minimum order needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              <Link href="/shop" className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl" style={{ background: "white", color: "var(--riva-charcoal)" }}>
                Shop Now
              </Link>
              <p className="text-[10px] text-white/40 mt-2 sm:mt-0 sm:self-center">* Added to your package automatically</p>
            </div>
          </div>
          
          <div className="hidden md:block relative">
             <div className="w-52 h-52 lg:w-72 lg:h-72 rounded-full border border-white/15 flex items-center justify-center p-3 relative transition-transform duration-700 hover:scale-105 animate-float" style={{ boxShadow: "0 0 60px rgba(255, 229, 180, 0.12)" }}>
                <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white/10 shadow-2xl">
                  <Image src="/free-ring-gift.jpg" alt="Free Ayat Alkoursy Ring" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Collections: Watches & Hand Fans */}
      {((watches && watches.length > 0) || (handfans && handfans.length > 0)) && (
        <section className="py-12 sm:py-16 md:py-20" style={{ background: "var(--riva-cream)" }}>
          <div className="container-riva">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>More To Love</p>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Featured Collections</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
              
              {/* Watches Column */}
              {watches && watches.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-6 sm:mb-8 border-b pb-4" style={{ borderColor: "var(--riva-rose-light)" }}>
                    <div>
                      <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-1 sm:mb-2" style={{ color: "var(--riva-rose)" }}>Watches</p>
                      <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Watches</h3>
                    </div>
                    <Link href="/shop?category=Watch" className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors" style={{ color: "var(--riva-rose)" }}>Shop All →</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    {watches.slice(0, 2).map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* Hand Fans Column */}
              {handfans && handfans.length > 0 && (
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-6 sm:mb-8 border-b pb-4" style={{ borderColor: "var(--riva-rose-light)" }}>
                    <div>
                      <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-1 sm:mb-2" style={{ color: "var(--riva-rose)" }}>Hand Fans</p>
                      <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Hand Fans</h3>
                    </div>
                    <Link href="/shop?category=Hand Fan" className="text-sm font-medium uppercase tracking-wider hover:text-gray-600 transition-colors" style={{ color: "var(--riva-rose)" }}>Shop All →</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    {handfans.slice(0, 2).map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container-riva">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div className="text-center sm:text-left">
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Just Added</p>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">New Arrivals</h2>
            </div>
            <Link href="/shop" className="btn-outline text-xs sm:text-sm py-2 px-5 sm:py-3 sm:px-8">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 stagger-children">
            {newArrivals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 sm:py-20 md:py-24 text-center" style={{ background: "var(--gradient-hero)" }}>
        <div className="container-riva px-6">
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "var(--riva-rose)" }}>Don't Miss Out</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>
            See All Our Products
          </h2>
          <p className="text-sm sm:text-base max-w-md mx-auto mb-8" style={{ color: "var(--riva-charcoal-light)" }}>
            Over 100 accessories to choose from — rings, earrings, necklaces, bags, watches and more.
          </p>
          <Link href="/shop" className="btn-primary text-xs sm:text-sm py-3.5 px-10 sm:py-4 sm:px-12">
            Shop Now
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
