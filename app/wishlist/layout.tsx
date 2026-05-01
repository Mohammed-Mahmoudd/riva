import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "View your saved RIVA accessories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
