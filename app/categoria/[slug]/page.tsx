import { notFound } from "next/navigation";
import { Storefront } from "@/components/Storefront";
import { categories, getCategoryBySlug } from "@/lib/store";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return <Storefront initialCategory={category.name} />;
}
