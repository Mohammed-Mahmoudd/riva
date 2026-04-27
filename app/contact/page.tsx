"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div style={{ background: "var(--riva-ivory)" }} className="min-h-screen">
      <div className="py-12 text-center" style={{ background: "var(--gradient-hero)" }}>
        <p className="text-sm font-medium tracking-[0.2em] uppercase mb-2" style={{ color: "var(--riva-rose-dark)" }}>Get in Touch</p>
        <h1 className="text-4xl sm:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Contact Us</h1>
      </div>

      <div className="container-riva px-6 sm:px-8 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-3xl p-8 sm:p-10" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>Send a Message</h2>
              <p className="text-sm mb-8" style={{ color: "#999" }}>We&apos;d love to hear from you. Fill out the form below.</p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl text-sm font-medium text-center animate-scale-in" style={{ background: "var(--riva-blush)", color: "var(--riva-rose-dark)" }}>
                  ✨ Thank you! We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold tracking-widest uppercase block mb-2" style={{ color: "var(--riva-charcoal)" }}>Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)]" style={{ borderColor: "var(--riva-cream)", background: "var(--riva-ivory)" }} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold tracking-widest uppercase block mb-2" style={{ color: "var(--riva-charcoal)" }}>Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)]" style={{ borderColor: "var(--riva-cream)", background: "var(--riva-ivory)" }} placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase block mb-2" style={{ color: "var(--riva-charcoal)" }}>Subject</label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)]" style={{ borderColor: "var(--riva-cream)", background: "var(--riva-ivory)" }} placeholder="How can we help?" />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-widest uppercase block mb-2" style={{ color: "var(--riva-charcoal)" }}>Message</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl text-sm border transition-colors focus:outline-none focus:border-[var(--riva-rose)] resize-none" style={{ borderColor: "var(--riva-cream)", background: "var(--riva-ivory)" }} placeholder="Tell us more..." />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--riva-charcoal)" }}>We&apos;re Here to Help</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>Have a question about an order, need styling advice, or want to collaborate? Reach out — we&apos;re always happy to chat!</p>
            </div>

            {[
              { icon: "📧", title: "Email Us", info: "hello@riva.com", sub: "We respond within 24 hours" },
              { icon: "📞", title: "Call Us", info: "+1 (555) 123-4567", sub: "Mon-Fri, 9am-6pm EST" },
              { icon: "📍", title: "Visit Us", info: "123 Fashion Avenue", sub: "New York, NY 10001" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 p-5 rounded-2xl bg-white card-hover" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "var(--riva-blush)" }}>{c.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "var(--riva-charcoal)" }}>{c.title}</h3>
                  <p className="text-sm font-medium" style={{ color: "var(--riva-rose)" }}>{c.info}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#999" }}>{c.sub}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--riva-charcoal)" }}>
              <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--riva-rose-light)" }}>Follow Us</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {["Instagram", "TikTok", "Pinterest", "Twitter"].map((s) => (
                  <a key={s} href="#" className="px-4 py-2 rounded-full text-xs font-medium text-white/70 border border-white/10 transition-all hover:bg-[var(--riva-rose)] hover:border-[var(--riva-rose)] hover:text-white">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
