"use client";

import { useState, useEffect } from "react";
import { testimonials } from "../data/testimonials";

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 sm:py-20 bg-pattern" style={{ background: "var(--riva-ivory)" }}>
      <div className="container-riva">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-2 sm:mb-3" style={{ color: "var(--riva-rose)" }}>Testimonials</p>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">What Our Clients Say</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden" style={{ minHeight: "200px" }}>
            {testimonials.map((t, i) => (
              <div key={t.id} className={`absolute inset-0 transition-all duration-700 ${i === active ? "opacity-100 translate-x-0" : i < active ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"}`}>
                <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center" style={{ boxShadow: "var(--shadow-glass)" }}>
                  <div className="flex justify-center gap-1 mb-3 sm:mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--riva-gold)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6" style={{ color: "#555", fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-white" style={{ background: "var(--gradient-rose)" }}>{t.avatar}</div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-semibold" style={{ color: "var(--riva-charcoal)" }}>{t.name}</p>
                      <p className="text-[10px] sm:text-xs" style={{ color: "var(--riva-rose)" }}>{t.product}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="w-2 h-2 rounded-full transition-all duration-300" style={{ background: i === active ? "var(--riva-rose)" : "var(--riva-rose-light)", transform: i === active ? "scale(1.4)" : "scale(1)" }} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
