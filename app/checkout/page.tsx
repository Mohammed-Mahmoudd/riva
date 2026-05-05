"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { type Coupon } from "@/sanity/lib/sanity-fetch";
import { validateCouponAction } from "../actions/validateCoupon";

type PaymentMethod = "cod" | "vodafone_cash" | "etisalat_cash" | "instapay";

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  icon: string;
  description: string;
  instructions?: string;
  storeAccount?: string; // The number the customer sends money TO
  senderFieldLabel?: string; // What we ask the customer for
}[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: "💵",
    description: "Pay when you receive your order",
  },
  {
    id: "vodafone_cash",
    label: "Vodafone Cash",
    icon: "🔴",
    description: "Send to our Vodafone Cash wallet",
    storeAccount: "01126633680", // Replace with your actual number
    instructions:
      "Transfer the total amount to the number below. Your order will only be shipped after the transfer is verified.",
    senderFieldLabel: "Your Vodafone Cash Number (Sender)",
  },
  {
    id: "etisalat_cash",
    label: "Etisalat Cash",
    icon: "🟢",
    description: "Send to our Etisalat Cash wallet",
    storeAccount: "01126633680", // Replace with your actual number
    instructions:
      "Transfer the total amount to the number below. Your order will only be shipped after the transfer is verified.",
    senderFieldLabel: "Your Etisalat Cash Number (Sender)",
  },
  {
    id: "instapay",
    label: "InstaPay",
    icon: "⚡",
    description: "Instant transfer via InstaPay",
    storeAccount: "riva.accessories@instapay", // Replace with actual InstaPay username
    instructions:
      "Transfer the total amount to our InstaPay address below. Your order will be shipped after the transfer is verified.",
    senderFieldLabel: "Your InstaPay Address or Name (Sender)",
  },
];

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("cod");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    senderDetails: "", // Added this to capture their wallet/instapay sender info
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedAddress = localStorage.getItem("riva_saved_address");
    if (savedAddress) {
      try {
        setForm((prev) => ({ ...prev, ...JSON.parse(savedAddress), senderDetails: "", notes: "" }));
      } catch (e) {
        console.error("Failed to parse saved address");
      }
    }
    
  }, []);

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email address";
    } else if (field === "phone" && value && !/^01[0-2,5]\d{8}$/.test(value.replace(/\s/g, ''))) {
      error = "Please enter a valid Egyptian phone number";
    } else if (field === "firstName" && !value.trim()) {
      error = "First name is required";
    } else if (field === "lastName" && !value.trim()) {
      error = "Last name is required";
    } else if (field === "address" && !value.trim()) {
      error = "Address is required";
    }
    
    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address";
    if (!form.phone || !/^01[0-2,5]\d{8}$/.test(form.phone.replace(/\s/g, ''))) newErrors.phone = "Please enter a valid Egyptian phone number";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (selectedPayment !== "cod" && !form.senderDetails.trim()) newErrors.senderDetails = "Sender details are required for this payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const subtotal = getCartTotal();
  
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discount = subtotal * (appliedCoupon.discountValue / 100);
    } else {
      discount = Math.min(appliedCoupon.discountValue, subtotal);
    }
  }

  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = async () => {
    setCouponError("");
    const code = couponCodeInput.trim();
    if (!code) return;

    setIsValidatingCoupon(true);
    try {
      const found = await validateCouponAction(code);
      if (found) {
        setAppliedCoupon(found);
        setCouponCodeInput("");
      } else {
        setCouponError("Invalid or expired coupon code");
      }
    } catch (e) {
      console.error(e);
      setCouponError("Error validating coupon.");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMsg("Please fix the errors in the form before submitting.");
      return;
    }
    
    setIsProcessing(true);
    setErrorMsg("");

    try {
      const orderData = {
        ...form,
        paymentMethod: selectedPayment,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.salePrice || item.product.price,
        })),
        subtotal,
        discount,
        couponCode: appliedCoupon?.code || null,
        shipping,
        total,
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      // Save address info to local storage for future checkout
      const { notes, senderDetails, ...addressToSave } = orderData;
      localStorage.setItem("riva_saved_address", JSON.stringify(addressToSave));

      setOrderNumber(data.orderNumber);
      setOrderPlaced(true);
      clearCart();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── Order Success Screen ──────────────────────────────────
  if (orderPlaced) {
    const paymentInfo = paymentMethods.find((p) => p.id === selectedPayment);
    const needsTransfer = selectedPayment !== "cod";

    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[var(--riva-ivory)] px-6 py-20">
        <div className="text-center max-w-lg w-full animate-fade-in-up bg-white p-10 sm:p-12 rounded-3xl shadow-xl shadow-rose-900/5">
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
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--riva-charcoal)",
            }}
          >
            Order Confirmed!
          </h1>
          <p
            className="text-sm font-medium mb-6"
            style={{ color: "var(--riva-rose-dark)" }}
          >
            Order #{orderNumber}
          </p>

          {needsTransfer && (
            <div
              className="bg-[var(--riva-ivory)] rounded-2xl p-6 mb-6 text-left"
              style={{ border: "1px dashed var(--riva-rose)" }}
            >
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--riva-charcoal)" }}
              >
                {paymentInfo?.icon} {paymentInfo?.label} — Payment Instructions
              </p>
              <p className="text-sm mb-3" style={{ color: "#666" }}>
                {paymentInfo?.instructions}
              </p>
              <p className="text-xs" style={{ color: "#999" }}>
                Please complete the transfer within 24 hours to confirm your
                order. Your order will be shipped once payment is verified.
              </p>
            </div>
          )}

          <p className="text-[#666] mb-8 leading-relaxed">
            {selectedPayment === "cod"
              ? "Your order will arrive soon. Please have the exact amount ready for the delivery driver."
              : "We'll verify your payment and send you a confirmation. Thank you for your purchase!"}
          </p>
          <Link href="/shop" className="btn-primary w-full">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ─── Empty Cart ──────────────────────────────────────────
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

  // ─── Input helper ──────────────────────────────────────────
  const inputClass =
    "w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm";
  const labelClass =
    "text-xs font-semibold tracking-widest uppercase block mb-2";

  // ─── Main Checkout ──────────────────────────────────────
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
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              {/* ── 1. Contact Information ─────────────────── */}
              <section>
                <h2
                  className="text-lg font-semibold tracking-wide mb-6"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  1. Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={`${inputClass} ${errors.email ? "border-red-400 focus:border-red-500" : ""}`}
                        style={{ borderColor: errors.email ? undefined : "var(--riva-cream)" }}
                        placeholder="your@email.com (Optional)"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        Phone Number (رقم الموبايل)
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className={`${inputClass} ${errors.phone ? "border-red-400 focus:border-red-500" : ""}`}
                        style={{ borderColor: errors.phone ? undefined : "var(--riva-cream)" }}
                        placeholder="01x xxxx xxxx"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 2. Shipping Address ─────────────────── */}
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
                        className={labelClass}
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        First Name (الاسم الأول)
                      </label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        className={`${inputClass} ${errors.firstName ? "border-red-400 focus:border-red-500" : ""}`}
                        style={{ borderColor: errors.firstName ? undefined : "var(--riva-cream)" }}
                        placeholder="First name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label
                        className={labelClass}
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        Last Name (اسم العائلة)
                      </label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        className={`${inputClass} ${errors.lastName ? "border-red-400 focus:border-red-500" : ""}`}
                        style={{ borderColor: errors.lastName ? undefined : "var(--riva-cream)" }}
                        placeholder="Last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label
                      className={labelClass}
                      style={{ color: "var(--riva-charcoal)" }}
                    >
                      Full Address & Governorate (العنوان والمحافظة)
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className={`${inputClass} ${errors.address ? "border-red-400 focus:border-red-500" : ""}`}
                      style={{ borderColor: errors.address ? undefined : "var(--riva-cream)" }}
                      placeholder="Street address, building, apartment, governorate..."
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
              </section>

              {/* ── 3. Payment Method ─────────────────── */}
              <section>
                <h2
                  className="text-lg font-semibold tracking-wide mb-6"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  3. Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className="text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300"
                      style={{
                        borderColor:
                          selectedPayment === method.id
                            ? "var(--riva-rose)"
                            : "var(--riva-cream)",
                        background:
                          selectedPayment === method.id
                            ? "var(--riva-blush)"
                            : "white",
                        transform:
                          selectedPayment === method.id
                            ? "scale(1.02)"
                            : "scale(1)",
                        boxShadow:
                          selectedPayment === method.id
                            ? "0 4px 20px rgba(244,163,181,0.25)"
                            : "none",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xl">{method.icon}</span>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--riva-charcoal)" }}
                        >
                          {method.label}
                        </span>
                      </div>
                      <p className="text-xs ml-8" style={{ color: "#999" }}>
                        {method.description}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Payment instructions for wallet/bank methods */}
                {selectedPayment !== "cod" && (
                  <div
                    className="mt-4 p-5 rounded-2xl bg-white border animate-fade-in space-y-4"
                    style={{ borderColor: "var(--riva-cream)" }}
                  >
                    <div>
                      <p
                        className="text-sm font-semibold mb-2"
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        📋 Transfer Details
                      </p>
                      <p
                        className="text-sm leading-relaxed mb-2"
                        style={{ color: "#666" }}
                      >
                        {
                          paymentMethods.find((p) => p.id === selectedPayment)
                            ?.instructions
                        }
                      </p>
                      <div
                        className="bg-[var(--riva-ivory)] p-3 rounded-xl border border-dashed text-center font-mono text-lg font-bold tracking-wider"
                        style={{
                          borderColor: "var(--riva-rose)",
                          color: "var(--riva-charcoal)",
                        }}
                      >
                        {
                          paymentMethods.find((p) => p.id === selectedPayment)
                            ?.storeAccount
                        }
                      </div>
                    </div>

                    <div
                      className="pt-2 border-t"
                      style={{ borderColor: "var(--riva-cream)" }}
                    >
                      <label
                        className={labelClass}
                        style={{ color: "var(--riva-charcoal)" }}
                      >
                        {
                          paymentMethods.find((p) => p.id === selectedPayment)
                            ?.senderFieldLabel
                        }
                      </label>
                      <input
                        type="text"
                        required
                        value={form.senderDetails}
                        onChange={(e) =>
                          updateField("senderDetails", e.target.value)
                        }
                        className={`${inputClass} ${errors.senderDetails ? "border-red-400 focus:border-red-500" : ""}`}
                        style={{ borderColor: errors.senderDetails ? undefined : "var(--riva-cream)" }}
                        placeholder="e.g. 01xxxxxxxxx"
                      />
                      {errors.senderDetails && <p className="text-red-500 text-xs mt-1">{errors.senderDetails}</p>}
                      <p className="text-[10px] mt-2" style={{ color: "#999" }}>
                        * We need this to verify your transfer. Your order will
                        be processed after verification.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* ── 4. Order Notes ─────────────────── */}
              <section>
                <h2
                  className="text-lg font-semibold tracking-wide mb-6"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  4. Order Notes{" "}
                  <span
                    className="text-xs font-normal"
                    style={{ color: "#999" }}
                  >
                    (optional)
                  </span>
                </h2>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] bg-white shadow-sm resize-none"
                  style={{ borderColor: "var(--riva-cream)" }}
                  placeholder="Any special requests or delivery instructions..."
                />
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
                    key={item.product.id}
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
                          EGP
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

              {/* Coupon Section */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    placeholder="Coupon Code"
                    className="flex-1 min-w-0 px-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-[var(--riva-rose)]"
                    style={{ borderColor: "var(--riva-cream)" }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon}
                    className="shrink-0 px-4 sm:px-6 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                    style={{ background: "var(--riva-charcoal)", color: "white" }}
                  >
                    {isValidatingCoupon ? "..." : "Apply"}
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-[10px] mt-1 ml-1">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex items-center justify-between mt-2 px-3 py-1.5 rounded-lg bg-[var(--riva-blush)] text-[var(--riva-rose-dark)]">
                    <span className="text-[10px] font-bold tracking-widest uppercase">
                      🎫 {appliedCoupon.code} APPLIED
                    </span>
                    <button
                      type="button"
                      onClick={() => setAppliedCoupon(null)}
                      className="text-xs hover:scale-110"
                    >
                      ✕
                    </button>
                  </div>
                )}
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
                    EGP {subtotal.toFixed(2)}
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
                      EGP {shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <div
                    className="flex justify-between text-sm"
                    style={{ color: "var(--riva-rose-dark)" }}
                  >
                    <span>Discount</span>
                    <span className="font-bold">- EGP {discount.toFixed(2)}</span>
                  </div>
                )}
                <div
                  className="flex justify-between text-sm"
                  style={{ color: "#666" }}
                >
                  <span>Payment</span>
                  <span className="font-medium text-black text-xs">
                    {
                      paymentMethods.find((p) => p.id === selectedPayment)
                        ?.label
                    }
                  </span>
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
                  className="text-2xl font-bold text-gradient"
                >
                  EGP {total.toFixed(2)}
                </span>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{errorMsg}</p>
                </div>
              )}

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

              <p
                className="text-[10px] text-center mt-4 leading-relaxed"
                style={{ color: "#999" }}
              >
                By placing your order, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
