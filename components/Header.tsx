"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { makeWhatsAppUrl } from "@/lib/specialties";

const nav = [
  { label: "Especialidades", href: "/#especialidades" },
  { label: "Método", href: "/#metodo" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Contato", href: "/#contato" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    gsap.fromTo(
      ".site-shell",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-shell ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="brand-lockup" href="/" aria-label="Centro especializado LIMADENTT">
        <span className="brand-orb">
          <Image src="/assets/limadentt-logo-gold.jpeg" alt="" width={96} height={96} priority />
        </span>
        <span>
          <strong>LIMADENTT</strong>
          <small>Centro especializado</small>
        </span>
      </Link>

      <button
        className="menu-button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav ${open ? "is-open" : ""}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <a
          className="nav-whatsapp"
          href={makeWhatsAppUrl("Olá, gostaria de agendar uma consulta com o Dr. Weslen Lima na LIMADENTT.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
