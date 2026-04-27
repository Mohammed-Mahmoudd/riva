import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riva — Premium Girls' Accessories",
  description:
    "Discover Riva's curated collection of premium accessories. Earrings, necklaces, bracelets, bags, sunglasses & more for the modern woman.",
  keywords: ["accessories", "jewelry", "earrings", "necklaces", "bags", "fashion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
