import Link from "next/link";
import { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SpecialtyMedia } from "@/components/SpecialtyMedia";
import { getSpecialty, makeWhatsAppUrl, specialties, whatsappDisplay } from "@/lib/specialties";

type SpecialtyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return specialties.map((specialty) => ({ slug: specialty.slug }));
}

export async function generateMetadata({ params }: SpecialtyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const specialty = getSpecialty(slug);

  return {
    title: `${specialty.title} | Centro Especializado LIMADENTT`,
    description: specialty.summary
  };
}

export default async function SpecialtyPage({ params }: SpecialtyPageProps) {
  const { slug } = await params;
  const specialty = getSpecialty(slug);
  const whatsappUrl = makeWhatsAppUrl(
    `Olá, gostaria de agendar uma consulta com o Dr. Weslen Lima na LIMADENTT sobre ${specialty.title}.`
  );

  return (
    <main>
      <section className="detail-hero">
        <div className="volumetric-glow" />
        <div className="cinema-vignette" />
        <div className="detail-hero-inner">
          <Reveal className="detail-copy">
            <p className="eyebrow">{specialty.label}</p>
            <h1 className="hero-title">{specialty.title}</h1>
            <p className="hero-copy">{specialty.summary}</p>
            <div className="hero-actions">
              <a className="button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Agendar pelo WhatsApp
              </a>
              <Link className="button-secondary" href="/#especialidades">
                Ver outras especialidades
              </Link>
            </div>
          </Reveal>

          <SpecialtyMedia audience={specialty.audience} visual={specialty.visual} />
        </div>
      </section>

      <section className="detail-body-section">
        <Reveal>
          <article>
            <p className="eyebrow !text-ember">Resumo clínico</p>
            <h2 className="display-title">{specialty.short}</h2>
            <p className="mt-8">{specialty.detail}</p>
            <ul className="detail-points">
              {specialty.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.12} className="sticky-contact">
          <h2>Agende sua avaliação</h2>
          <p>
            Converse com a equipe LIMADENTT pelo WhatsApp {whatsappDisplay} e organize uma consulta com o Dr. Weslen Lima.
          </p>
          <div className="hero-actions">
            <a className="button-primary w-full" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Chamar no WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div>
          <strong>LIMADENTT</strong>
          <p>Dr. Weslen Lima. Cirurgias, harmonização orofacial e odontologia para todas as idades.</p>
        </div>
        <Link href="/">Voltar à home</Link>
      </footer>
    </main>
  );
}
