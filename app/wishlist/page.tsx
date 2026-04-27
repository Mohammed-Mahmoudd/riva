"use client";

import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--riva-ivory)" }}>
        <div className="text-center animate-fade-in-up">
          <p className="text-6xl mb-4">💕</p>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Your Wishlist is Empty</h1>
          <p className="text-sm mb-8" style={{ color: "#999" }}>Save your favorite items to buy later.</p>
          <Link href="/shop" className="btn-primary">Explore Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--riva-ivory)" }} className="min-h-screen">
      <div className="py-12 text-center" style={{ background: "var(--gradient-hero)" }}>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>My Wishlist</h1>
        <p className="text-sm mt-2" style={{ color: "#999" }}>{items.length} saved item{items.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="container-riva py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 stagger-children">
          {items.map((p) => (<ProductCard key={p.id} product={p} />))}
        </div>
      </div>
    </div>
  );
}
