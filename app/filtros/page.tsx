const logo = "https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp";

export default function FiltersPage() {
  return (
    <main className="simple-page">
      <img src={logo} alt="Gorila Imports" />
      <h1>Filtros</h1>
      <p>Filtre por categoria, busque por texto e ordene por preço para encontrar o produto ideal rapidamente.</p>
      <a href="/#produtos">Usar filtros</a>
    </main>
  );
}
