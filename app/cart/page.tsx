"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--riva-ivory)" }}>
        <div className="text-center animate-fade-in-up">
          <p className="text-6xl mb-4">🛍️</p>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Your Cart is Empty</h1>
          <p className="text-sm mb-8" style={{ color: "#999" }}>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <div style={{ background: "var(--riva-ivory)" }} className="min-h-screen">
      <div className="py-12 text-center" style={{ background: "var(--gradient-hero)" }}>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Shopping Cart</h1>
        <p className="text-sm mt-2" style={{ color: "#999" }}>{items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="container-riva py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const price = item.product.salePrice || item.product.price;
              return (
                <div key={item.product.id} className="flex gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white animate-fade-in" style={{ boxShadow: "var(--shadow-card)" }}>
                  <Link href={`/shop/${item.product.id}`} className="relative w-20 h-24 sm:w-28 sm:h-32 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--riva-cream)" }}>
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="120px" />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/shop/${item.product.id}`}>
                        <p className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--riva-rose)" }}>{item.product.category}</p>
                        <h3 className="text-sm font-semibold" style={{ color: "var(--riva-charcoal)" }}>{item.product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-3 h-3 rounded-full border" style={{ background: item.selectedColor, borderColor: "#eee" }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-0 rounded-full overflow-hidden border" style={{ borderColor: "var(--riva-cream)" }}>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--riva-blush)] transition-colors">−</button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-[var(--riva-blush)] transition-colors">+</button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold" style={{ color: "var(--riva-charcoal)" }}>${(price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-xs transition-colors hover:text-red-500" style={{ color: "#bbb" }}>✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between pt-4">
              <Link href="/shop" className="text-sm font-medium transition-colors hover:text-[var(--riva-rose)]" style={{ color: "#999" }}>← Continue Shopping</Link>
              <button onClick={clearCart} className="text-sm font-medium transition-colors hover:text-red-500" style={{ color: "#999" }}>Clear Cart</button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-white p-6 sm:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span style={{ color: "#999" }}>Subtotal</span><span style={{ color: "var(--riva-charcoal)" }}>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span style={{ color: "#999" }}>Shipping</span><span style={{ color: shipping === 0 ? "var(--riva-rose)" : "var(--riva-charcoal)" }}>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                {shipping > 0 && <p className="text-xs" style={{ color: "var(--riva-rose)" }}>Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>}
                <div className="h-px" style={{ background: "var(--riva-cream)" }} />
                <div className="flex justify-between"><span className="font-semibold" style={{ color: "var(--riva-charcoal)" }}>Total</span><span className="text-xl font-bold text-gradient">${total.toFixed(2)}</span></div>
              </div>
              <Link href="/checkout" className="btn-primary w-full mb-3 text-center flex justify-center">Proceed to Checkout</Link>
              <p className="text-[10px] text-center" style={{ color: "#bbb" }}>🔒 Secure SSL Encrypted Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
