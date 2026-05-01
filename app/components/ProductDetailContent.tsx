"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";

interface ProductDetailContentProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailContent({ product, relatedProducts }: ProductDetailContentProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "shipping">("details");
  const [localReviews, setLocalReviews] = useState(product.reviews || []);

  const reviews = localReviews;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleAddReview = (newReview: any) => {
    setLocalReviews((prev) => [newReview, ...prev]);
  };

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
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

            {/* Average Rating */}
            {avgRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(Number(avgRating)) ? "var(--riva-gold)" : "#ddd"}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--riva-charcoal)" }}>{avgRating}</span>
                <span className="text-xs" style={{ color: "#999" }}>({reviews.length} reviews)</span>
              </div>
            )}



            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold" style={{ color: product.salePrice ? "var(--riva-rose-dark)" : "var(--riva-charcoal)" }}>EGP {price}</span>
              {product.salePrice && <span className="text-lg line-through" style={{ color: "#bbb" }}>EGP {product.price}</span>}
              {product.salePrice && <span className="badge badge-sale">-{Math.round((1 - product.salePrice / product.price) * 100)}%</span>}
            </div>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#666" }}>{product.description}</p>



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
              <button onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }} className="btn-primary flex-1">
                {inCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <button onClick={() => toggleWishlist(product)} className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ border: "2px solid var(--riva-rose)", background: inWishlist ? "var(--riva-rose)" : "transparent" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? "white" : "none"} stroke={inWishlist ? "white" : "var(--riva-rose)"} strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
              </button>
            </div>

            {/* Info Tabs */}
            <div className="border-t pt-6" style={{ borderColor: "var(--riva-cream)" }}>
              <div className="flex gap-6 mb-4">
                {(["details", "shipping"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className="text-sm font-medium pb-2 border-b-2 transition-all capitalize" style={{ borderColor: activeTab === tab ? "var(--riva-rose)" : "transparent", color: activeTab === tab ? "var(--riva-charcoal)" : "#999" }}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {activeTab === "details" && <p>Crafted with premium materials and meticulous attention to detail. {product.description}</p>}
                {activeTab === "shipping" && <p>Free standard shipping on orders over EGP 50. Express shipping available at checkout. Easy 30-day returns — no questions asked.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Reviews Section */}
        <div className="mt-20 border-t pt-20" style={{ borderColor: "var(--riva-cream)" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-2xl sm:text-3xl mb-12 text-center" style={{ color: "var(--riva-charcoal)" }}>Customer Reviews ({reviews.length})</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Side: Summary & Form */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-8">
                  {avgRating && (
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-[var(--riva-cream)]">
                      <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--riva-charcoal)" }}>Average Rating</p>
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-bold" style={{ color: "var(--riva-charcoal)" }}>{avgRating}</span>
                        <div>
                          <div className="flex mb-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < Math.floor(Number(avgRating)) ? "var(--riva-gold)" : "#ddd"}>
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400">Based on {reviews.length} reviews</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <ReviewForm productId={product.id} onReviewAdded={handleAddReview} />
                </div>
              </div>

              {/* Right Side: Review List */}
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  {reviews.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-[var(--riva-cream)]">
                      <p className="text-gray-400 italic">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    reviews.map((r) => (
                      <div key={r._id} className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--riva-cream)] animate-fade-in">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-sm" style={{ color: "var(--riva-charcoal)" }}>{r.name}</p>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < r.rating ? "var(--riva-gold)" : "#ddd"}>
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#bbb" }}>{new Date(r._createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "#666" }}>&quot;{r.comment}&quot;</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title text-2xl sm:text-3xl text-center mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              {relatedProducts.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewForm({ productId, onReviewAdded }: { productId: string; onReviewAdded: (r: any) => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment, productId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Thank you! Your review has been added successfully.");
        setName("");
        setComment("");
        setRating(5);
        onReviewAdded(data.review);
      } else {
        setMessage("Failed to submit review. Please try again.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-[var(--riva-cream)]">
      <h3 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "var(--riva-charcoal)" }}>Write a Review</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-bold uppercase mb-1 block">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-[var(--riva-rose)]"
            style={{ borderColor: "var(--riva-cream)" }}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase mb-1 block">Rating</label>
          <div className="flex gap-1 pt-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="transition-transform hover:scale-125"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={num <= rating ? "var(--riva-gold)" : "#ddd"}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase mb-1 block">Your Review</label>
        <textarea
          required
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-[var(--riva-rose)] resize-none"
          style={{ borderColor: "var(--riva-cream)" }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full sm:w-auto"
        style={{ padding: "10px 30px", opacity: isSubmitting ? 0.7 : 1 }}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>

      {message && (
        <p className={`text-xs mt-2 font-medium ${message.includes('Thank') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
