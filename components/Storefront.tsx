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

    const formData = new FormData(event.currentTarget);
    const payment = String(formData.get("pagamento") || "");

    if (payment === "Pix") {
      event.preventDefault();

      const name = String(formData.get("nome") || "");
      const phone = String(formData.get("telefone") || "");
      const notes = String(formData.get("observacoes") || "");
      const message = [
        "Olá, vim pelo site Gorila Imports e quero finalizar meu pedido via Pix.",
        "",
        `Nome: ${name}`,
        `Telefone: ${phone}`,
        "",
        "Produtos:",
        orderSummary,
        "",
        `Total: ${currency(total)}`,
        "Forma de pagamento: Pix",
        notes ? `Observações: ${notes}` : "",
        "",
        "Pode confirmar meu pedido e me enviar a chave Pix para pagamento?"
      ]
        .filter(Boolean)
        .join("\n");

      setStatus("Abrindo o WhatsApp para finalizar seu pedido via Pix...");
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
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
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2.5 22l5.16-1.02A9.94 9.94 0 1 0 12.04 2Zm0 1.86a8.08 8.08 0 0 1 6.92 12.25 8.08 8.08 0 0 1-10.4 3.05l-.36-.18-3.06.6.62-2.98-.2-.38A8.08 8.08 0 0 1 12.04 3.86Zm-3.38 4.3c-.17 0-.45.06-.68.31-.23.25-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.13.17 1.8 2.75 4.36 3.86 2.16.93 2.6.75 3.07.7.47-.04 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.06-.11-.23-.17-.49-.3l-1.72-.84c-.25-.12-.43-.18-.61.18-.18.36-.7.84-.86 1.01-.16.17-.32.19-.6.06-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.47.09-.19.05-.36-.02-.5l-.78-1.88c-.2-.48-.4-.42-.55-.43l-.46-.01Z" />
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
