import type { Metadata } from "next";

// Neveřejná stránka — rozesílá se odkazem, nesmí se dostat do vyhledávačů
// ani do navigace webu.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
