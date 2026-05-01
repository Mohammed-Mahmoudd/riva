"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div style={{ background: "var(--riva-ivory)" }} className="min-h-screen">
      <div className="py-12 text-center" style={{ background: "var(--gradient-hero)" }}>
        <p className="text-sm font-medium tracking-[0.2em] uppercase mb-2" style={{ color: "var(--riva-rose-dark)" }}>Connect with Riva</p>
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Contact Us</h1>
      </div>

      <div className="container-riva px-6 sm:px-8 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Message */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>We&apos;re Here to Help</h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#666" }}>
                Whether you have a question about an order, need styling advice, or want to collaborate, we are always happy to hear from you. Reach out through any of our channels below.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/201501685539" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-2">
                  <span>Chat on WhatsApp</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
              </div>
            </div>

            {/* Right: Real Contact Info */}
            <div className="animate-fade-in space-y-6">
              {[
                { icon: "📧", title: "Email Address", info: "its.riva.m@gmail.com", href: "mailto:its.riva.m@gmail.com", sub: "We respond within 24 hours" },
                { icon: "📞", title: "Phone / WhatsApp", info: "01501685539", href: "tel:01501685539", sub: "Available Daily for Support" },
                { icon: "📸", title: "Follow Us", info: "@itsriva.m", href: "https://instagram.com/itsriva.m", sub: "Join our Instagram community" },
              ].map((c) => (
                <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer" className="flex gap-5 p-6 rounded-3xl bg-white card-hover border border-[var(--riva-cream)]" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "var(--riva-blush)" }}>{c.icon}</div>
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--riva-rose)" }}>{c.title}</h3>
                    <p className="text-base font-bold mb-1" style={{ color: "var(--riva-charcoal)" }}>{c.info}</p>
                    <p className="text-xs" style={{ color: "#999" }}>{c.sub}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
