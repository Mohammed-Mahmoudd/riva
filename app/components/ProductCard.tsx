"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useRouter } from "next/navigation";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();
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
            <span className={`${badgeClass} text-[9px] sm:text-[11px]`}>{product.badge}</span>
            </div>
        )}

        <button onClick={() => toggleWishlist(product)} className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ background: inWishlist ? "var(--riva-rose)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }} aria-label="Toggle wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={inWishlist ? "white" : "none"} stroke={inWishlist ? "white" : "var(--riva-charcoal)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Floating Quick Actions */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-end z-10 pointer-events-none">
          
          {/* WhatsApp Order Button (Bottom Left) */}
          <a href={`https://wa.me/201501685539?text=${encodeURIComponent(`Hello Riva!\nI would like to order:\n\nProduct: ${product.name}\nPrice: EGP ${product.salePrice || product.price}\nLink: https://itsriva.com/shop/${product.id}`)}`} target="_blank" rel="noopener noreferrer" className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md" style={{ background: "#25D366", color: "white" }} aria-label="Order via WhatsApp" onClick={(e) => e.stopPropagation()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>

          {/* Quick Add To Cart Button (Bottom Right) */}
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md" style={{ background: inCart ? "var(--riva-charcoal)" : "rgba(255,255,255,0.9)", color: inCart ? "white" : "var(--riva-charcoal)", backdropFilter: "blur(4px)" }} aria-label="Add to cart">
            {inCart ? "✓" : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            )}
          </button>
        </div>

        {/* Desktop ONLY Hover "Buy Now" Button (Bottom Centered) */}
        <div className="hidden sm:flex absolute bottom-3 left-0 right-0 justify-center opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!inCart) { addToCart(product); } router.push("/checkout"); }} 
            className="pointer-events-auto px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl transition-transform hover:scale-105 cursor-pointer"
            style={{ background: "var(--riva-charcoal)", color: "white" }}
          >
            Buy Now
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
              <span className="text-xs sm:text-sm font-bold" style={{ color: "var(--riva-rose-dark)" }}>EGP {product.salePrice}</span>
              <span className="text-[10px] sm:text-xs line-through" style={{ color: "#aaa" }}>EGP {product.price}</span>
            </>
          ) : (
            <span className="text-xs sm:text-sm font-bold" style={{ color: "var(--riva-charcoal)" }}>EGP {product.price}</span>
          )}
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => {
                const reviews = product.reviews || [];
                const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
                return (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < Math.floor(avg) ? "var(--riva-gold)" : "#ddd"}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                );
              })}
            </div>
            <span className="text-[9px] sm:text-xs" style={{ color: "#999" }}>({product.reviews.length})</span>
          </div>
        )}
      </div>
    </div>
  );
}
