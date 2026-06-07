"use client";

import { FormEvent, useMemo, useState } from "react";

const contactPhone = "+55 49 9966-1873";
const whatsappNumber = "554999661873";
const leadEmail = "jessicabarretokuchek@gmail.com";

const logo = "https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp";
const banner = "https://cdn.vendizap.com/vendizap-banners/e40e8d3dcb0699265938c2872db3859b.webp";

const categories = [
  ["IGNITE V80 8.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/34760eba21dace0978af77ad083f6db3.webp"],
  ["IGNITE V250 25.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/bb7dbd25f7b8ef8e2bf56f38ebb59d2d.webp"],
  ["IGNITE V300 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/c0a6e7fb61a50a002103da8cbd83bc7a.webp"],
  ["ELFBAR GH 23.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/2787192a251c2c9838c3a0c7cce4671e.webp"],
  ["ELFBAR BC 15.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/6f67fb821edad151104a2b6315baa1ce.webp"],
  ["ELFBAR KING ICE 40.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/02c94b9aa46b5838a675eefe723460d4.webp"],
  ["ELFBAR TE 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/5fec132b60604d79a7cdc69d3465ae89.webp"],
  ["BLACKSHEEP 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/3dc12fb9787e83e6306840130d651cd7.webp"],
  ["IGNITE V400 ICE", "https://cdn.vendizap.com/vendizap-categorias/537713083f5b40886e5ec08cbbf2675d.webp"],
  ["IGNITE FROZEN", "https://cdn.vendizap.com/vendizap-categorias/adb2dfdb08c930b4951077f72740341d.webp"]
];

const products = [
  ["ELFBAR 15000 PUFFS MANGA MAGICA", 120, "ELFBAR BC 15.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/d3eb6a5e05e6645c745c4e790045656d.webp"],
  ["IGNITE 5500 PUFFS BALA DE MELAO", 120, "IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/a635f4db99aebaa67968060db3fc6886.webp"],
  ["IGNITE 5500 PUFFS BLUEBERRY ICE", 120, "IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/20748e1749b72165d599f7f73d015119.webp"],
  ["IGNITE 5500 PUFFS CREME DE BAUNILHA", 120, "IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/182814a14b5cda13f5702f4d4fcca264.webp"],
  ["IGNITE 5500 PUFFS MENTA C/MELAO", 120, "IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/f1e98962ccb3318a614ef0bd51adb4c7.webp"],
  ["IGNITE 5500 PUFFS MORANGO C/BANANA", 120, "IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/18ad957a6ea1c40c1c1ca02f308ed631.webp"],
  ["IGNITE 5500 PUFFS UVA C/MACA E ACAI", 120, "IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/140303a3e8bbad3873acdf1087bb51af.webp"],
  ["EXTRE-BAR 30000 PUFFS FRAMBOEZA AZUL", 125, "EXTRE BAR 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/17b31421e41f122716a84dcaf4805bee.webp"],
  ["IGNITE V80 NEW EDITION ACAI ICE", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/8acf64e16d6fbb37adc28a8a0c79a774.webp"],
  ["IGNITE V80 NEW EDITION BLUEBERRY ICE", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/185dc5f39cf081b65da7f15bbd1bbbc1.webp"],
  ["IGNITE V80 NEW EDITION MARACUJA C/KIWI", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/e6c713e5f28e2ba52786d31682bf46af.webp"],
  ["IGNITE V80 NEW EDITION MORANGO C/KIWI", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/e49299f7a101ed915d1a4064a9aa58a7.webp"],
  ["IGNITE V80 NEW EDITION MORANGO ICE", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/4d705fcb34cacda1121207c37b38027b.webp"],
  ["IGNITE V80 NEW EDITION TORANJA C/MENTA", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/a481bafc86fbb3fc0ab514a533289bd3.webp"],
  ["IGNITE V80 NEW EDITION UVA ICE", 130, "IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-produtos-thumbs/5a2d46c48c903ac2296d85d7f20c83a4.webp"],
  ["IGNITE 15.000 PUFFS ABACAXI ICE", 140, "IGNITE V150 PRO 15.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/a661dc1283232f376d3880b599c0c094.webp"],
  ["IGNITE 15.000 PUFFS CEREJA C/BANANA", 140, "IGNITE V150 PRO 15.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/3a7688a1d3514312b88be2eecacb1128.webp"],
  ["LIFE POD 14.000 PUFFS MELANCIA", 140, "LIFE POD 14.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/a0edaaabff7ee6f4429eba09e9605f82.webp"],
  ["IGNITE 15.500 PUFFS ACAI TROPICAL", 145, "IGNITE V155 ULTRA SLIM", "https://cdn.vendizap.com/vendizap-produtos-thumbs/80754bce5c65d4fb16e6e3df793ce68d.webp"],
  ["NIKBAR 30000 PUFFS MENTA ICE", 145, "NIKBAR 30000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/663d87530f5ded4daa7629a6922449e5.webp"]
].map(([name, price, category, image], id) => ({ id, name: String(name), price: Number(price), category: String(category), image: String(image) }));

type Product = (typeof products)[number];
type Cart = Record<number, number>;

const currency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Home() {
  const [adult, setAdult] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");

  const cartItems = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ product: products[Number(id)], qty })).filter((item) => item.qty > 0),
    [cart]
  );
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized);
      const matchesCategory = category === "Todas" || product.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === "asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  const add = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
  };

  const update = (product: Product, delta: number) => {
    setCart((current) => {
      const next = Math.max((current[product.id] || 0) + delta, 0);
      return { ...current, [product.id]: next };
    });
  };

  const orderSummary = cartItems
    .map(({ product, qty }) => `${qty}x ${product.name} - ${currency(product.price * qty)}`)
    .join("\n");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!cartItems.length) {
      event.preventDefault();
      setStatus("Adicione ao menos um produto antes de finalizar o pedido.");
      return;
    }
    setStatus("Enviando seus dados para o atendimento...");
  };

  return (
    <main>
      {!adult && (
        <div className="age-gate" role="dialog" aria-modal="true">
          <div className="age-card">
            <img src={logo} alt="Gorila Imports" />
            <p>Atenção</p>
            <h1>Você é maior de 18 anos?</h1>
            <div>
              <button onClick={() => setAdult(true)}>Sim</button>
              <a href="https://www.google.com">Não</a>
            </div>
          </div>
        </div>
      )}

      <header className="store-header">
        <a className="brand" href="/">
          <img src={logo} alt="Gorila Imports" />
        </a>
        <div className="header-tools">
          <label className="search-pill" aria-label="Busca">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Faça sua busca" />
            <span>⌕</span>
          </label>
          <button className="icon-button" onClick={() => setSort(sort === "asc" ? "desc" : "asc")} aria-label="Ordenar produtos">
            ⬍
          </button>
          <button className="icon-button info" onClick={() => document.getElementById("rodape")?.scrollIntoView()} aria-label="Informações da loja">
            i
          </button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">
            🛒<span>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
          </button>
          <button className="icon-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Menu">
            ☰
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="menu-panel">
          <a href="/">Página Inicial</a>
          <a href="/politicas-de-devolucao">Políticas de devolução</a>
          <a href="/busca">Busca</a>
          <a href="/categorias">Categorias</a>
          <a href="/filtros">Filtros</a>
        </nav>
      )}

      <section className="intro">
        <p>Venha para o mundo do vapor. Gorila Pods!!!</p>
        <img src={banner} alt="Gorila Pods" />
      </section>

      <section className="section-block" id="categorias">
        <h2>Categorias</h2>
        <div className="category-row">
          {categories.map(([name, image]) => (
            <button key={name} className={category === name ? "active" : ""} onClick={() => setCategory(name)}>
              <img src={image} alt="" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block" id="produtos">
        <div className="products-head">
          <h2>Produtos</h2>
          <label>
            Ordenar:
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="default">Padrão</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>
        </div>
        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <h3>{product.name}</h3>
              <strong>{currency(product.price)}</strong>
              {(cart[product.id] || 0) > 0 ? (
                <div className="qty-control">
                  <button onClick={() => update(product, -1)}>-</button>
                  <span>{cart[product.id]}</span>
                  <button onClick={() => update(product, 1)}>+</button>
                </div>
              ) : (
                <button className="buy-button" onClick={() => add(product)}>
                  Comprar
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="returns-callout">
        <a href="/politicas-de-devolucao">Conheça nossa política de trocas e devoluções</a>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
          Fale com o vendedor
        </a>
      </section>

      <Footer />

      {cartOpen && (
        <aside className="cart-drawer" aria-label="Carrinho">
          <div className="drawer-head">
            <h2>Suas Informações</h2>
            <button onClick={() => setCartOpen(false)} aria-label="Fechar carrinho">
              ×
            </button>
          </div>
          <form action={`https://formsubmit.co/${leadEmail}`} method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="Novo pedido - Gorila Imports" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="pedido" value={orderSummary} />
            <input type="hidden" name="total" value={currency(total)} />
            <label>
              Nome completo
              <input required name="nome" type="text" placeholder="Nome Completo" />
            </label>
            <label>
              Email
              <input required name="email" type="email" placeholder="Email" />
            </label>
            <label>
              Telefone
              <input required name="telefone" type="tel" placeholder="DDD e número" />
            </label>
            <label>
              Forma de pagamento
              <select required name="pagamento" defaultValue="">
                <option value="" disabled>
                  Selecione
                </option>
                <option>Pix</option>
                <option>Cartão</option>
                <option>Dinheiro</option>
              </select>
            </label>
            <label>
              Observações
              <textarea name="observacoes" rows={3} />
            </label>
            <div className="order-box">
              <h3>Confira seu pedido</h3>
              {cartItems.length ? (
                cartItems.map(({ product, qty }) => (
                  <p key={product.id}>
                    {qty}x {product.name}
                    <strong>{currency(product.price * qty)}</strong>
                  </p>
                ))
              ) : (
                <p>Seu carrinho está vazio.</p>
              )}
              <div className="total-line">
                <span>Total:</span>
                <strong>{currency(total)}</strong>
              </div>
            </div>
            <button className="finish-button" type="submit">
              Finalizar o Pedido
            </button>
            {status && <p className="form-status">{status}</p>}
          </form>
          <a className="seller-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
            Ficou com alguma dúvida? Falar com o vendedor
          </a>
        </aside>
      )}
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer" id="rodape">
      <div>
        <h3>Gorila Imports</h3>
        <p>Atendimento ao cliente</p>
        <strong>{contactPhone}</strong>
        <span>{leadEmail}</span>
        <span>gorilaimports.vendizap.com</span>
      </div>
      <div>
        <h3>Formas de pagamento aceitas</h3>
        <div className="payments">
          <span>VISA</span>
          <span>Mastercard</span>
          <span>Hipercard</span>
          <span>Elo</span>
          <span>Pix</span>
          <span>Dinheiro</span>
        </div>
      </div>
      <div>
        <h3>Gorila Imports</h3>
        <a href="/">Página Inicial</a>
        <a href="/politicas-de-devolucao">Políticas de devolução</a>
        <a href="/busca">Busca</a>
        <a href="/categorias">Categorias</a>
        <a href="/filtros">Filtros</a>
      </div>
      <div className="made-with">Loja feita com Vendizap</div>
    </footer>
  );
}
