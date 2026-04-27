"use client";

import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from "react";
import type { Product } from "../data/products";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const WL_KEY = "riva-wishlist";

function loadWL(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(WL_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true;
      const saved = loadWL();
      if (saved.length > 0) setItems(saved);
    }
  }, []);

  useEffect(() => {
    if (didInit.current) {
      localStorage.setItem(WL_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => (prev.find((i) => i.id === product.id) ? prev : [...prev, product]));
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prev) =>
      prev.find((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const isInWishlist = useCallback((id: string) => items.some((i) => i.id === id), [items]);
  const getWishlistCount = useCallback(() => items.length, [items]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, getWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
