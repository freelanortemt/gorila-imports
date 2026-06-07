import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gorila Imports",
  description:
    "Vitrine Gorila Imports com catálogo, carrinho e atendimento direto.",
  metadataBase: new URL("https://gorilaimports.vendizap.com"),
  openGraph: {
    title: "Gorila Imports",
    description: "Catálogo online Gorila Imports.",
    url: "https://gorilaimports.vendizap.com",
    siteName: "Gorila Imports",
    images: ["https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp"],
    locale: "pt_BR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
