"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[var(--riva-ivory)] px-6 py-20">
        <div className="text-center max-w-md w-full animate-fade-in-up bg-white p-10 sm:p-12 rounded-3xl shadow-xl shadow-rose-900/5">
          <div className="w-20 h-20 bg-[var(--riva-blush)] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--riva-rose-dark)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--riva-charcoal)",
            }}
          >
            Order Confirmed!
          </h1>
          <p className="text-[#666] mb-8 leading-relaxed">
            Thank you for your purchase. We&apos;ve sent a confirmation email
            with your order details and tracking information.
          </p>
          <Link href="/shop" className="btn-primary w-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[var(--riva-ivory)] px-6">
        <div className="text-center max-w-md w-full">
          <div className="text-6xl mb-6">🛒</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--riva-charcoal)",
            }}
          >
            Your Cart is Empty
          </h1>
          <p className="text-[#666] mb-8">
            Looks like you haven&apos;t added any beautiful accessories to your
            cart yet.
          </p>
          <Link href="/shop" className="btn-primary w-full">
            Discover Our Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--riva-ivory)] pb-24">
      {/* Header */}
      <div className="py-10 mb-10 border-b border-[var(--riva-cream)] bg-white text-center shadow-sm relative z-10">
        <h1
          className="text-3xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--riva-charcoal)",
          }}
        >
          Checkout
        </h1>
      </div>

      <div className="container-riva px-6 sm:px-8 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              {/* Contact Info */}
              <section>
                <h2
                  className="text-lg font-semibold tracking-wide mb-6"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  1. Contact Information
                </h2>
                <div>
                  <label
                    className="text-xs font-semibold tracking-widest uppercase block mb-2"
                    style={{ color: "var(--riva-charcoal)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                    style={{ borderColor: "var(--riva-cream)" }}
                    placeholder="your@email.com"
                  />
                </div>
              </section>

              {/* Shipping Info */}
              <section>
                <h2
                  className="text-lg font-semibold tracking-wide mb-6"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  2. Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold tracking-widest uppercase block mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                        style={{ borderColor: "var(--riva-cream)" }}
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label
                        className="text-xs font-semibold tracking-widest uppercase block mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                        style={{ borderColor: "var(--riva-cream)" }}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold tracking-widest uppercase block mb-2"
                      style={{ color: "var(--riva-charcoal)" }}
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                      style={{ borderColor: "var(--riva-cream)" }}
                      placeholder="Street address or P.O. Box"
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        className="text-xs font-semibold tracking-widest uppercase block mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                        style={{ borderColor: "var(--riva-cream)" }}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label
                        className="text-xs font-semibold tracking-widest uppercase block mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                        style={{ borderColor: "var(--riva-cream)" }}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label
                        className="text-xs font-semibold tracking-widest uppercase block mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm"
                        style={{ borderColor: "var(--riva-cream)" }}
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section>
                <h2
                  className="text-lg font-semibold tracking-wide mb-6"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  3. Payment Method
                </h2>
                <div
                  className="bg-white p-6 sm:p-8 rounded-3xl border shadow-sm"
                  style={{ borderColor: "var(--riva-cream)" }}
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        className="text-xs font-semibold tracking-widest uppercase block mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-[var(--riva-ivory)]"
                          style={{ borderColor: "var(--riva-cream)" }}
                          placeholder="0000 0000 0000 0000"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5 opacity-50">
                          <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                          <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label
                          className="text-xs font-semibold tracking-widest uppercase block mb-2"
                          style={{ color: "var(--riva-charcoal)" }}
                        >
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-[var(--riva-ivory)]"
                          style={{ borderColor: "var(--riva-cream)" }}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label
                          className="text-xs font-semibold tracking-widest uppercase block mb-2"
                          style={{ color: "var(--riva-charcoal)" }}
                        >
                          CVC
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-[var(--riva-ivory)]"
                          style={{ borderColor: "var(--riva-cream)" }}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 sticky top-28"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2
                className="text-xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--riva-charcoal)",
                }}
              >
                Order Summary
              </h2>

              <div className="space-y-5 max-h-[40vh] lg:max-h-[50vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}`}
                    className="flex gap-4"
                  >
                    <div className="w-20 h-24 relative rounded-xl overflow-hidden bg-[var(--riva-cream)] flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3
                        className="text-sm font-semibold mb-1"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        {item.product.name}
                      </h3>
                      <p className="text-xs mb-2" style={{ color: "#999" }}>
                        Color: {item.selectedColor}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--riva-charcoal)" }}
                        >
                          Qty: {item.quantity}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: "var(--riva-rose-dark)" }}
                        >
                          $
                          {(
                            (item.product.salePrice || item.product.price) *
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="h-px w-full my-6"
                style={{ background: "var(--riva-cream)" }}
              />

              <div className="space-y-3 mb-6">
                <div
                  className="flex justify-between text-sm"
                  style={{ color: "#666" }}
                >
                  <span>Subtotal</span>
                  <span className="font-medium text-black">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div
                  className="flex justify-between text-sm"
                  style={{ color: "#666" }}
                >
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-medium text-[var(--riva-rose-dark)] uppercase text-[10px] tracking-widest pt-0.5">
                      Free
                    </span>
                  ) : (
                    <span className="font-medium text-black">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="h-px w-full mb-6"
                style={{ background: "var(--riva-cream)" }}
              />

              <div className="flex justify-between items-center mb-8">
                <span
                  className="text-lg font-bold"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  Total
                </span>
                <span
                  className="text-2xl font-bold"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="btn-primary w-full text-base py-4 flex items-center justify-center transition-all shadow-lg shadow-rose-900/20"
                style={{ opacity: isProcessing ? 0.7 : 1 }}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Place Order
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
