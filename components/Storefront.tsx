"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  banner,
  categories,
  contactPhone,
  currency,
  leadEmail,
  logo,
  Product,
  products,
  whatsappNumber
} from "@/lib/store";

type Cart = Record<number, number>;
const ageConfirmationKey = "gorila-imports-age-confirmed";

type StorefrontProps = {
  initialCategory?: string;
  initialQuery?: string;
  featuredProduct?: Product;
  showProductDetail?: boolean;
};

export function Storefront({ initialCategory = "Todas", initialQuery = "", featuredProduct, showProductDetail = false }: StorefrontProps) {
  const [adult, setAdult] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState<Cart>(featuredProduct ? { [featuredProduct.id]: 1 } : {});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState("");

  const cartItems = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ product: products[Number(id)], qty })).filter((item) => item.product && item.qty > 0),
    [cart]
  );
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesQuery = !normalized || product.name.toLowerCase().includes(normalized) || product.flavor.toLowerCase().includes(normalized);
      const matchesCategory = category === "Todas" || product.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === "asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, query, sort]);

  useEffect(() => {
    const confirmed = window.localStorage.getItem(ageConfirmationKey) === "true";
    setAdult(confirmed);
    setAgeChecked(true);
  }, []);

  const confirmAge = () => {
    window.localStorage.setItem(ageConfirmationKey, "true");
    setAdult(true);
  };

  const add = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
  };

  const update = (product: Product, delta: number) => {
    setCart((current) => ({ ...current, [product.id]: Math.max((current[product.id] || 0) + delta, 0) }));
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
      {ageChecked && !adult && (
        <div className="age-gate" role="dialog" aria-modal="true">
          <div className="age-card">
            <img src={logo} alt="Gorila Imports" />
            <p>Atenção</p>
            <h1>Você é maior de 18 anos?</h1>
            <div>
              <button onClick={confirmAge}>Sim</button>
              <a href="https://www.google.com">Não</a>
            </div>
          </div>
        </div>
      )}

      <header className="store-header">
        <Link className="brand" href="/">
          <img src={logo} alt="Gorila Imports" />
        </Link>
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

      {menuOpen && <StoreMenu />}

      <section className="intro">
        <div className="intro-copy">
          <p>Venha para o mundo do vapor. Gorila Pods!!!</p>
          <span>Catálogo premium com pedido direto pelo atendimento.</span>
        </div>
        <img src={banner} alt="Gorila Pods" />
      </section>

      {showProductDetail && featuredProduct && (
        <section className="product-detail">
          <div className="detail-media">
            <img src={featuredProduct.image} alt={featuredProduct.name} />
          </div>
          <div className="detail-copy">
            <Link href={`/categoria/${categories.find((item) => item.name === featuredProduct.category)?.slug || ""}`}>{featuredProduct.category}</Link>
            <h1>{featuredProduct.name}</h1>
            <strong>{currency(featuredProduct.price)}</strong>
            <p>{featuredProduct.flavor}</p>
            <div className="detail-tags">
              <span>{featuredProduct.puffs}</span>
              <span>Pedido via atendimento</span>
              <span>Entrega ou retirada</span>
            </div>
            <ul>
              {featuredProduct.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <div className="detail-actions">
              <button className="buy-button" onClick={() => add(featuredProduct)}>
                Adicionar ao carrinho
              </button>
              <button className="outline-button" onClick={() => setCartOpen(true)}>
                Finalizar pedido
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="section-block" id="categorias">
        <div className="section-title-row">
          <h2>Categorias</h2>
          <Link href="/categorias">Ver todas</Link>
        </div>
        <div className="category-row">
          <button className={category === "Todas" ? "active" : ""} onClick={() => setCategory("Todas")}>
            <img src={logo} alt="" />
            <span>Página Inicial</span>
          </button>
          {categories.map((item) => (
            <Link key={item.slug} className={category === item.name ? "active" : ""} href={`/categoria/${item.slug}`}>
              <img src={item.image} alt="" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block" id="produtos">
        <div className="products-head">
          <h2>{category === "Todas" ? "Produtos" : category}</h2>
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
              <Link className="product-image" href={`/produto/${product.slug}`}>
                <img src={product.image} alt={product.name} loading="lazy" />
              </Link>
              <Link href={`/produto/${product.slug}`}>
                <h3>{product.name}</h3>
              </Link>
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

      <section className="premium-strip">
        <div>
          <strong>Atendimento direto</strong>
          <span>Pedido conferido antes da entrega.</span>
        </div>
        <div>
          <strong>Pagamento flexível</strong>
          <span>Pix, cartão ou dinheiro.</span>
        </div>
        <div>
          <strong>Catálogo completo</strong>
          <span>Categorias e páginas individuais.</span>
        </div>
      </section>

      <section className="returns-callout">
        <Link href="/politicas-de-devolucao">Conheça nossa política de trocas e devoluções</Link>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
          Fale com o vendedor
        </a>
      </section>

      <Footer />

      <a
        className="whatsapp-float"
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Olá, vim pelo site Gorila Imports e gostaria de atendimento.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Gorila Imports pelo WhatsApp"
      >
        <span>WhatsApp</span>
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 3.2A12.8 12.8 0 0 0 5.1 26.7L3.8 31l4.5-1.2A12.8 12.8 0 1 0 16 3.2Zm0 2.4a10.4 10.4 0 0 1 8.8 15.9 10.4 10.4 0 0 1-12.2 4.2l-.8-.3-2.7.7.8-2.6-.4-.8A10.4 10.4 0 0 1 16 5.6Zm-4.4 5.3c-.3 0-.7.1-1 .5-.3.4-1.2 1.2-1.2 2.9s1.3 3.4 1.4 3.6c.2.2 2.5 3.9 6.1 5.3 3 .1 3.6-.9 4.2-2.1.2-.4.2-.8.1-.9-.1-.2-.3-.3-.7-.5l-2.1-1c-.3-.1-.6-.2-.8.2-.2.3-.9 1-1.1 1.2-.2.2-.4.2-.8.1-.4-.2-1.5-.6-2.8-1.8-1-1-1.7-2.1-1.9-2.5-.2-.3 0-.5.2-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-.9-2.2c-.2-.5-.5-.5-.8-.5h-.7Z" />
        </svg>
      </a>

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

function StoreMenu() {
  return (
    <nav className="menu-panel">
      <Link href="/">Página Inicial</Link>
      <Link href="/politicas-de-devolucao">Políticas de devolução</Link>
      <Link href="/busca">Busca</Link>
      <Link href="/categorias">Categorias</Link>
      <Link href="/filtros">Filtros</Link>
    </nav>
  );
}

export function Footer() {
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
        <Link href="/">Página Inicial</Link>
        <Link href="/politicas-de-devolucao">Políticas de devolução</Link>
        <Link href="/busca">Busca</Link>
        <Link href="/categorias">Categorias</Link>
        <Link href="/filtros">Filtros</Link>
      </div>
      <div className="made-with">Loja feita com Vendizap</div>
    </footer>
  );
}
