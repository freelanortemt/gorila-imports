import { notFound } from "next/navigation";
import { Storefront } from "@/components/Storefront";
import { getProductBySlug, products } from "@/lib/store";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <Storefront featuredProduct={product} initialCategory={product.category} showProductDetail />;
}
