"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const badgeClass = product.badge === "new" ? "badge badge-new" : product.badge === "sale" ? "badge badge-sale" : product.badge === "bestseller" ? "badge badge-bestseller" : "";

  return (
    <div className="group card-hover rounded-xl sm:rounded-2xl overflow-hidden bg-white" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="product-image-wrapper aspect-[3/4] relative bg-[var(--riva-cream)]">
        <Link href={`/shop/${product.id}`}>
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 640px) 45vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
        </Link>

        {product.badge && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
            <span className={`${badgeClass} text-[9px] sm:text-[11px] px-2 sm:px-3 py-0.5 sm:py-1`}>{product.badge}</span>
          </div>
        )}

        <button onClick={() => toggleWishlist(product)} className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ background: inWishlist ? "var(--riva-rose)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }} aria-label="Toggle wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={inWishlist ? "white" : "none"} stroke={inWishlist ? "white" : "var(--riva-charcoal)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Add to cart — visible on mobile as a compact button, hover-reveal on desktop */}
        <div className="product-actions sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => addToCart(product)} className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105" style={{ background: inCart ? "var(--riva-charcoal)" : "white", color: inCart ? "white" : "var(--riva-charcoal)", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
            {inCart ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4 pt-2 sm:pt-3">
        <Link href={`/shop/${product.id}`}>
          <p className="text-[9px] sm:text-xs uppercase tracking-widest mb-0.5 sm:mb-1" style={{ color: "var(--riva-rose)" }}>{product.category}</p>
          <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-1.5 transition-colors group-hover:text-[var(--riva-rose)] line-clamp-1" style={{ color: "var(--riva-charcoal)" }}>{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {product.salePrice ? (
            <>
              <span className="text-xs sm:text-sm font-bold" style={{ color: "var(--riva-rose-dark)" }}>${product.salePrice}</span>
              <span className="text-[10px] sm:text-xs line-through" style={{ color: "#aaa" }}>${product.price}</span>
            </>
          ) : (
            <span className="text-xs sm:text-sm font-bold" style={{ color: "var(--riva-charcoal)" }}>${product.price}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "var(--riva-gold)" : "#ddd"}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-[9px] sm:text-xs" style={{ color: "#999" }}>({product.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}
