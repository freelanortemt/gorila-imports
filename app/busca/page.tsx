const logo = "https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp";

export default function SearchPage() {
  return (
    <main className="simple-page">
      <img src={logo} alt="Gorila Imports" />
      <h1>Busca</h1>
      <p>Use a barra “Faça sua busca” no topo da loja para localizar produtos por nome, sabor ou linha.</p>
      <a href="/#produtos">Abrir produtos</a>
    </main>
  );
}
