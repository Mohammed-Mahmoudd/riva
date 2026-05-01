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
  title: {
    default: "RIVA — Premium Accessories for Women & Girls",
    template: "%s | RIVA"
  },
  description:
    "Explore RIVA's exclusive collection of premium accessories. From elegant earrings and necklaces to trendy bags and sunglasses. Elevate your style with our curated luxury pieces in Egypt.",
  keywords: ["Riva", "accessories", "premium jewelry", "earrings", "necklaces", "bracelets", "women's bags", "sunglasses", "fashion Egypt", "girls accessories"],
  authors: [{ name: "RIVA" }],
  creator: "RIVA",
  publisher: "RIVA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://itsriva.com"), // Fallback base URL
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "RIVA — Premium Accessories for Women & Girls",
    description: "Discover curated luxury accessories. Elevate your look with RIVA's exclusive earrings, necklaces, and more.",
    url: "https://itsriva.com",
    siteName: "RIVA",
    images: [
      {
        url: "/RIvaLogo.png",
        width: 1200,
        height: 630,
        alt: "RIVA Premium Accessories",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIVA — Premium Accessories for Women & Girls",
    description: "Discover curated luxury accessories. Elevate your look with RIVA's exclusive earrings, necklaces, and more.",
    images: ["/RIvaLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RIVA",
              url: "https://itsriva.com",
              logo: "https://itsriva.com/favicon.png",
              description: "Premium accessories for women & girls in Egypt. Earrings, necklaces, bracelets, bags, and sunglasses.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+201501685539",
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
              },
              sameAs: [
                "https://www.instagram.com/itsriva.m/",
                "https://wa.me/201501685539",
              ],
            }),
          }}
        />
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
