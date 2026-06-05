import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Centro Especializado LIMADENTT | Odontologia Premium",
  description:
    "Centro especializado LIMADENTT. Dr. Weslen Lima. Cirurgias, harmonização orofacial, implantodontia, estética dental e odontologia para todas as idades.",
  metadataBase: new URL("https://limadentt.com.br"),
  openGraph: {
    title: "Centro Especializado LIMADENTT",
    description: "Odontologia premium com ênfase em cirurgias e harmonização orofacial.",
    url: "https://limadentt.com.br",
    siteName: "LIMADENTT",
    images: ["/assets/limadentt-logo-gold.jpeg"],
    locale: "pt_BR",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
