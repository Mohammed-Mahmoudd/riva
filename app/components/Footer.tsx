import Link from "next/link";
import { fetchAllCategories } from "@/sanity/lib/sanity-fetch";

export default async function Footer() {
  const yr = new Date().getFullYear();
  const categories = await fetchAllCategories();
  const links1 = [
    { href: "/shop", label: "Shop All" },
    ...categories.slice(3, 6).map((cat) => ({
      href: `/shop?category=${encodeURIComponent(cat.name)}`,
      label: cat.name,
    })),
  ];
  const links2 = categories.slice(0, 3).map((cat) => ({
    href: `/shop?category=${encodeURIComponent(cat.name)}`,
    label: cat.name,
  }));
  const links3 = [{ href: "/contact", label: "Contact Us" }];

  const socialIcons = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/itsriva.m/",
      icon: (
        <svg
          width="18"
          height="18"
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
      ),
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/201501685539",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
  ];

  const colStyle =
    "text-sm transition-all duration-300 hover:pl-1 hover:text-[var(--riva-rose)]";
  const colColor = { color: "rgba(255,255,255,0.55)" };

  return (
    <footer
      className="pt-16 mt-20 pb-12 sm:pt-20 sm:pb-16"
      style={{ background: "var(--riva-charcoal)", color: "white" }}
    >
      <div className="container-riva">
        <div className="grid grid-cols-1 mb-3 md:grid-cols-12 gap-10 lg:gap-12">
          <div className="md:col-span-4 lg:col-span-4 lg:pr-8">
            <Link href="/" className="inline-block mb-5">
              <span
                className="text-3xl font-bold tracking-wider"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                <span className="text-gradient">R</span>
                <span className="text-white">IVA</span>
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Curating beautiful accessories for the modern woman. Every piece
              tells a story of elegance and self-expression.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[var(--riva-rose)] bg-white/10 border border-white/10"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h4
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--riva-rose-light)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {links1.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={colStyle} style={colColor}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <h4
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--riva-rose-light)" }}
            >
              Categories
            </h4>
            <ul className="space-y-3">
              {links2.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={colStyle} style={colColor}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-4">
            <h4
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--riva-rose-light)" }}
            >
              Customer Care
            </h4>
            <ul className="space-y-3">
              {links3.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={colStyle} style={colColor}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-2">
              <div
                className="flex items-center text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href="mailto:its.riva.m@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  its.riva.m@gmail.com
                </a>
              </div>
              <div
                className="flex items-center text-sm"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href="tel:+201501685539"
                  className="hover:text-white transition-colors"
                >
                  01501685539
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="py-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="container-riva flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs flex items-center"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            © {yr} Riva. All rights reserved. Made with{" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline-block mx-1"
              style={{ color: "var(--riva-rose)" }}
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </p>
        </div>
      </div>
    </footer>
  );
}
