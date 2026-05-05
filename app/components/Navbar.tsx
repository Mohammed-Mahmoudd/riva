"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle iOS rubber-banding at the top
      if (currentScrollY <= 0) {
        setIsVisible(true);
        setIsScrolled(false);
        lastScrollY = currentScrollY;
        return;
      }

      setIsScrolled(currentScrollY > 30);

      // Hide on scroll down, show on scroll up with a 5px threshold for mobile touch stability
      if (currentScrollY < lastScrollY - 5) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 5 && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar py-2">
        <div className="marquee-content">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex gap-20">
              <span className="font-bold text-[var(--riva-charcoal)]">💍 Free Ring Gift With EVERY Order!</span>
              <span>✨ Free Shipping on Orders Over EGP 50</span>
              <span>🎀 New Spring Collection Available Now</span>
              <span>💎 Use Code RIVA15 for 15% Off</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg py-3" : "bg-white/95 py-4"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container-riva flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-3xl md:text-4xl font-bold tracking-wider"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-gradient">R</span>
              <span style={{ color: "var(--riva-charcoal)" }}>IVA</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-[var(--riva-rose)] group"
                style={{
                  color: "var(--riva-charcoal)",
                  letterSpacing: "0.1em",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full transition-all duration-400 group-hover:w-full"
                  style={{ background: "var(--gradient-rose-gold)" }}
                />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/itsriva.m/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-all duration-300 hover:bg-[var(--riva-blush)] text-[var(--riva-charcoal)] hover:text-[var(--riva-rose)]"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full transition-all duration-300 hover:bg-[var(--riva-blush)]"
              aria-label="Wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white rounded-full"
                  style={{ background: "var(--gradient-rose)" }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full transition-all duration-300 hover:bg-[var(--riva-blush)]"
              aria-label="Shopping Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white rounded-full"
                  style={{ background: "var(--gradient-rose)" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-full transition-all duration-300 hover:bg-[var(--riva-blush)] relative z-50 cursor-pointer touch-manipulation"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 8h16" />
                    <path d="M4 16h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-500 ease-[var(--ease-smooth)] md:hidden ${
          isMobileMenuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          <button
            className="self-end p-2 mb-8 rounded-full hover:bg-[var(--riva-blush)] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-4 text-lg font-medium tracking-wide border-b transition-colors duration-300 hover:text-[var(--riva-rose)] hover:pl-2 touch-manipulation"
                style={{
                  color: "var(--riva-charcoal)",
                  borderColor: "var(--riva-cream)",
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto">
            <div
              className="w-full h-px mb-6"
              style={{ background: "var(--gradient-rose-gold)" }}
            />
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--riva-rose)" }}
            >
              Follow us
            </p>
            <div className="flex gap-4 mt-3">
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/itsriva.m/",
                },
                { name: "WhatsApp", href: "https://wa.me/201501685539" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-[var(--riva-rose)]"
                  style={{ color: "var(--riva-charcoal)" }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
