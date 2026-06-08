export const contactPhone = "+55 49 9966-1873";
export const whatsappNumber = "554999661873";
export const leadEmail = "jessicabarretokuchek@gmail.com";

export const logo = "https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp";
export const banner = "https://cdn.vendizap.com/vendizap-banners/e40e8d3dcb0699265938c2872db3859b.webp";

export type Category = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  puffs: string;
  flavor: string;
  details: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const categories: Category[] = [
  ["IGNITE V80 8.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/34760eba21dace0978af77ad083f6db3.webp"],
  ["IGNITE V250 25.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/bb7dbd25f7b8ef8e2bf56f38ebb59d2d.webp"],
  ["IGNITE V300 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/c0a6e7fb61a50a002103da8cbd83bc7a.webp"],
  ["ELFBAR GH 23.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/2787192a251c2c9838c3a0c7cce4671e.webp"],
  ["ELFBAR BC 15.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/6f67fb821edad151104a2b6315baa1ce.webp"],
  ["ELFBAR KING ICE 40.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/02c94b9aa46b5838a675eefe723460d4.webp"],
  ["ELFBAR TE 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/5fec132b60604d79a7cdc69d3465ae89.webp"],
  ["IGNITE V150 PRO 15.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/df0ed9dd40d3fcc4f9dc748b7dd7a4b6.webp"],
  ["BLACKSHEEP 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/3dc12fb9787e83e6306840130d651cd7.webp"],
  ["IGNITE V400 ICE", "https://cdn.vendizap.com/vendizap-categorias/537713083f5b40886e5ec08cbbf2675d.webp"],
  ["IGNITE V155 ULTRA SLIM", "https://cdn.vendizap.com/vendizap-categorias/adb2dfdb08c930b4951077f72740341d.webp"],
  ["IGNITE V80 NEW EDITON", "https://cdn.vendizap.com/vendizap-categorias/34760eba21dace0978af77ad083f6db3.webp"],
  ["ELFBAR 40K TRIO", "https://cdn.vendizap.com/vendizap-categorias/02c94b9aa46b5838a675eefe723460d4.webp"],
  ["IGNITE V55 ULTRA THIN", "https://cdn.vendizap.com/vendizap-categorias/bb7dbd25f7b8ef8e2bf56f38ebb59d2d.webp"],
  ["NIKBAR 30000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/c0a6e7fb61a50a002103da8cbd83bc7a.webp"],
  ["OXBAR G30K 30000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/2787192a251c2c9838c3a0c7cce4671e.webp"],
  ["EXTRE BAR 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/5fec132b60604d79a7cdc69d3465ae89.webp"],
  ["IGNITE V300 ULTRA SLIM", "https://cdn.vendizap.com/vendizap-categorias/adb2dfdb08c930b4951077f72740341d.webp"],
  ["LIFE POD 14.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/3dc12fb9787e83e6306840130d651cd7.webp"],
  ["WAKA 70.000 PUFFS", "https://cdn.vendizap.com/vendizap-categorias/537713083f5b40886e5ec08cbbf2675d.webp"],
  ["DINNER LADY 50.000", "https://cdn.vendizap.com/vendizap-categorias/6f67fb821edad151104a2b6315baa1ce.webp"],
  ["IGNITE FROZEN", "https://cdn.vendizap.com/vendizap-categorias/adb2dfdb08c930b4951077f72740341d.webp"]
].map(([name, image]) => ({
  name,
  image,
  slug: slugify(String(name)),
  description: `Linha ${name} com seleção pronta para pedido direto pelo atendimento da Gorila Imports.`
}));

const productRows = [
  ["IGNITE V80 8000 PUFFS GRAPE ICE", 130, "IGNITE V80 8.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/8acf64e16d6fbb37adc28a8a0c79a774.webp"],
  ["IGNITE V250 25000 PUFFS BLUEBERRY", 155, "IGNITE V250 25.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/185dc5f39cf081b65da7f15bbd1bbbc1.webp"],
  ["IGNITE V300 30000 PUFFS KIWI PASSION", 160, "IGNITE V300 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/e49299f7a101ed915d1a4064a9aa58a7.webp"],
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
  ["NIKBAR 30000 PUFFS MENTA ICE", 145, "NIKBAR 30000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/663d87530f5ded4daa7629a6922449e5.webp"],
  ["ELFBAR 23000 PUFFS ABACAXI C/AMEIXA E LIMAO HORTELA", 150, "ELFBAR GH 23.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/f4167f8cd98b5d31fba3213f87fe4a8f.webp"],
  ["ELFBAR KING ICE 40000 PUFFS BLUE RAZZ", 160, "ELFBAR KING ICE 40.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/bae16d32c2e52de9da9a939529a60dc3.webp"],
  ["ELFBAR TE 30000 PUFFS UVA ICE", 155, "ELFBAR TE 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/34edd6921c042535e47681689457b36c.webp"],
  ["BLACKSHEEP 30000 PUFFS DOUBLE TASTE", 165, "BLACKSHEEP 30.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/c498d1a9eed12536742004d50267ee18.webp"],
  ["IGNITE V400 ICE MENTA", 170, "IGNITE V400 ICE", "https://cdn.vendizap.com/vendizap-produtos-thumbs/9729530e7438ca84aefe4ce6619d756c.webp"],
  ["IGNITE V300 ULTRA SLIM STRAWBERRY", 155, "IGNITE V300 ULTRA SLIM", "https://cdn.vendizap.com/vendizap-produtos-thumbs/10f1779dc150f3050305c9323d8a84c9.webp"],
  ["ELFBAR 40K TRIO TROPICAL", 165, "ELFBAR 40K TRIO", "https://cdn.vendizap.com/vendizap-produtos-thumbs/05d56c17c9fe57a7fbe1a349992de9a6.webp"],
  ["OXBAR G30K 30000 PUFFS MELANCIA ICE", 150, "OXBAR G30K 30000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/d4c06cb80682dd3823149c14d12e55f4.webp"],
  ["WAKA 70000 PUFFS FRUTAS VERMELHAS", 210, "WAKA 70.000 PUFFS", "https://cdn.vendizap.com/vendizap-produtos-thumbs/197e6a6c54742380c94e6515f6289c1e.webp"],
  ["DINNER LADY 50000 PUFFS LEMON TART", 180, "DINNER LADY 50.000", "https://cdn.vendizap.com/vendizap-produtos-thumbs/e8ec1c2d051e629290a00ca8445479a6.webp"],
  ["IGNITE FROZEN MORANGO ICE", 145, "IGNITE FROZEN", "https://cdn.vendizap.com/vendizap-produtos-thumbs/19c5030d6daa135089947f02db2c6e65.webp"]
] as const;

export const products: Product[] = productRows.map(([name, price, category, image], id) => {
  const flavor = String(name)
    .replace(/^(IGNITE|ELFBAR|EXTRE-BAR|BLACKSHEEP|NIKBAR|OXBAR|WAKA|DINNER LADY)\s*/i, "")
    .replace(/\bV\d+\b/gi, "")
    .replace(/\d+\.?\d*\s*(PUFFS|K)?/gi, "")
    .trim();
  const puffs = String(name).match(/\d+\.?\d*\s*(PUFFS|K)/i)?.[0] || "Linha premium";

  return {
    id,
    slug: slugify(String(name)),
    name: String(name),
    price: Number(price),
    category: String(category),
    image: String(image),
    puffs,
    flavor,
    details: [
      "Produto selecionado no catálogo Gorila Imports.",
      "Pedido finalizado pelo formulário com envio ao atendimento.",
      "Disponibilidade confirmada pelo vendedor antes da entrega ou retirada."
    ]
  };
});

export const currency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const getCategoryBySlug = (slug: string) => categories.find((category) => category.slug === slug);
export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);
export const productsByCategory = (categoryName: string) => products.filter((product) => product.category === categoryName);
