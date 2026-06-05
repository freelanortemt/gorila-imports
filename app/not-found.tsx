import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-dark min-h-screen pt-40">
      <p className="eyebrow">LIMADENTT</p>
      <h1 className="hero-title">Página não encontrada.</h1>
      <p className="hero-copy">Volte para a página inicial e escolha a especialidade desejada.</p>
      <div className="hero-actions">
        <Link className="button-primary" href="/">
          Voltar à home
        </Link>
      </div>
    </main>
  );
}
