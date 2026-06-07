const logo = "https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp";

export default function CategoriesPage() {
  return (
    <main className="simple-page">
      <img src={logo} alt="Gorila Imports" />
      <h1>Categorias</h1>
      <p>As categorias ficam logo abaixo do banner principal. Toque em uma linha para filtrar o catálogo.</p>
      <a href="/#categorias">Ver categorias</a>
    </main>
  );
}
