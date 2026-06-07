const logo = "https://cdn.vendizap.com/vendizap-logos/1a261d674c847d39248e3c2272c3ba0e.webp";

export default function ReturnPolicyPage() {
  return (
    <main className="simple-page">
      <img src={logo} alt="Gorila Imports" />
      <h1>Políticas de devolução</h1>
      <p>
        Para trocas e devoluções, fale com o atendimento antes de enviar ou descartar qualquer item. A análise depende da conferência do pedido,
        estado do produto e prazo de solicitação.
      </p>
      <ul>
        <li>Guarde o comprovante e informe o produto comprado.</li>
        <li>Produtos violados, usados ou danificados por mau uso podem não ser aceitos.</li>
        <li>O atendimento orienta o melhor caminho para troca, retirada ou reembolso.</li>
      </ul>
      <a href="/">Voltar para a loja</a>
    </main>
  );
}
