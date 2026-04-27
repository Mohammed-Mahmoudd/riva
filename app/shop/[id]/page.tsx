"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard";
import { getProductById, products } from "../../data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState<"details" | "shipping" | "reviews">("details");

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

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const price = product.salePrice || product.price;

  return (
    <div style={{ background: "var(--riva-ivory)" }} className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container-riva py-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: "#999" }}>
          <Link href="/" className="hover:text-[var(--riva-rose)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--riva-rose)] transition-colors">Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--riva-charcoal)" }}>{product.name}</span>
        </div>
      </div>

      <div className="container-riva pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)", background: "var(--riva-cream)" }}>
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`badge ${product.badge === "new" ? "badge-new" : product.badge === "sale" ? "badge-sale" : "badge-bestseller"}`}>{product.badge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in-up flex flex-col justify-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase mb-2" style={{ color: "var(--riva-rose)" }}>{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">{[...Array(5)].map((_, i) => (<svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "var(--riva-gold)" : "#ddd"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</div>
              <span className="text-sm" style={{ color: "#999" }}>{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold" style={{ color: product.salePrice ? "var(--riva-rose-dark)" : "var(--riva-charcoal)" }}>${price}</span>
              {product.salePrice && <span className="text-lg line-through" style={{ color: "#bbb" }}>${product.price}</span>}
              {product.salePrice && <span className="badge badge-sale">-{Math.round((1 - product.salePrice / product.price) * 100)}%</span>}
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#666" }}>{product.description}</p>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--riva-charcoal)" }}>Color</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button key={i} onClick={() => setSelectedColor(i)} className="w-8 h-8 rounded-full transition-all duration-300" style={{ background: c, border: selectedColor === i ? "3px solid var(--riva-rose)" : "2px solid #eee", transform: selectedColor === i ? "scale(1.15)" : "scale(1)" }} aria-label={`Color ${i + 1}`} />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--riva-charcoal)" }}>Quantity</p>
              <div className="flex items-center gap-0 w-fit rounded-full overflow-hidden border" style={{ borderColor: "var(--riva-cream)" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-[var(--riva-blush)]">−</button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-lg transition-colors hover:bg-[var(--riva-blush)]">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={() => { for (let i = 0; i < qty; i++) addToCart(product, product.colors[selectedColor]); }} className="btn-primary flex-1">
                {inCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button onClick={() => toggleWishlist(product)} className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ border: "2px solid var(--riva-rose)", background: inWishlist ? "var(--riva-rose)" : "transparent" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? "white" : "none"} stroke={inWishlist ? "white" : "var(--riva-rose)"} strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              </button>
            </div>

            {/* Info Tabs */}
            <div className="border-t pt-6" style={{ borderColor: "var(--riva-cream)" }}>
              <div className="flex gap-6 mb-4">
                {(["details", "shipping", "reviews"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className="text-sm font-medium pb-2 border-b-2 transition-all capitalize" style={{ borderColor: activeTab === tab ? "var(--riva-rose)" : "transparent", color: activeTab === tab ? "var(--riva-charcoal)" : "#999" }}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {activeTab === "details" && <p>Crafted with premium materials and meticulous attention to detail. {product.description}</p>}
                {activeTab === "shipping" && <p>Free standard shipping on orders over $50. Express shipping available at checkout. Easy 30-day returns — no questions asked.</p>}
                {activeTab === "reviews" && <p>⭐ {product.rating}/5 based on {product.reviewCount} verified reviews. Customers love the quality and design of this piece.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title text-2xl sm:text-3xl text-center mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {related.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
