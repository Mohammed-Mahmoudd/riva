"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category } from "../data/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="group flex-shrink-0">
      <div className="relative w-[140px] h-[180px] sm:w-[180px] sm:h-[220px] md:w-[200px] md:h-[250px] rounded-xl sm:rounded-2xl overflow-hidden card-hover" style={{ boxShadow: "var(--shadow-card)" }}>
        <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 200px" />
        <div className="absolute inset-0 transition-all duration-500" style={{ background: "linear-gradient(to top, rgba(26,26,46,0.7) 0%, rgba(26,26,46,0.1) 50%, transparent 100%)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(244,163,181,0.5), transparent 60%)" }} />
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>{category.name}</h3>
          <p className="text-[10px] sm:text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>{category.itemCount} items</p>
        </div>
      </div>
    </Link>
  );
}
