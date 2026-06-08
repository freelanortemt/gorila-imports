import Link from "next/link";
import { Footer } from "@/components/Storefront";
import { categories, logo, productsByCategory } from "@/lib/store";

export default function CategoriesPage() {
  return (
    <main>
      <header className="store-header">
        <Link className="brand" href="/">
          <img src={logo} alt="Gorila Imports" />
        </Link>
        <div className="header-tools">
          <Link className="text-nav" href="/">
            Página Inicial
          </Link>
          <Link className="text-nav" href="/busca">
            Busca
          </Link>
        </div>
      </header>
      <section className="catalog-hero">
        <p>Catálogo completo</p>
        <h1>Todas as categorias Gorila Imports</h1>
        <span>Abra uma categoria para ver seus produtos, preços e páginas individuais.</span>
      </section>
      <section className="category-directory">
        {categories.map((category) => (
          <Link href={`/categoria/${category.slug}`} key={category.slug}>
            <img src={category.image} alt="" />
            <div>
              <h2>{category.name}</h2>
              <p>{productsByCategory(category.name).length} produtos disponíveis</p>
            </div>
          </Link>
        ))}
      </section>
      <Footer />
    </main>
  );
}
