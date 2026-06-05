import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { WebGLHero } from "@/components/WebGLHero";
import { makeWhatsAppUrl, specialties, whatsappDisplay } from "@/lib/specialties";

const whatsappUrl = makeWhatsAppUrl("Olá, gostaria de agendar uma consulta com o Dr. Weslen Lima na LIMADENTT.");

export default function Home() {
  return (
    <main>
      <section className="hero-section" id="top">
        <WebGLHero />
        <div className="hero-inner">
          <div>
            <Reveal>
              <p className="eyebrow">Dr. Weslen Lima | Cirurgias e harmonização orofacial</p>
              <h1 className="hero-title">Centro especializado LIMADENTT</h1>
              <p className="hero-copy">
                Odontologia premium para todas as idades, com planejamento digital, precisão cirúrgica e estética facial em uma atmosfera clínica sofisticada.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Agendar pelo WhatsApp
                </a>
                <Link className="button-secondary" href="#especialidades">
                  Explorar especialidades
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="hero-panel">
            <Image src="/assets/limadentt-logo-gold.jpeg" alt="Logo dourada LIMADENTT" width={620} height={420} priority />
            <dl>
              <div>
                <dt>Especialista</dt>
                <dd>Dr. Weslen Lima à frente dos casos cirúrgicos, harmonização orofacial e planejamento clínico.</dd>
              </div>
              <div>
                <dt>Atendimento completo</dt>
                <dd>Crianças, adolescentes, adultos e idosos em uma jornada clara, reservada e precisa.</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section-light" id="especialidades">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow !text-ember">Especialidades</p>
            <h2 className="display-title">Poucas promessas. Muito critério clínico.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="section-lede">
              A LIMADENTT integra cirurgias, harmonização orofacial, reabilitação, estética e prevenção em planos personalizados para cada idade e momento de vida.
            </p>
          </Reveal>
        </div>

        <div className="specialty-grid">
          {specialties.map((specialty, index) => (
            <Reveal key={specialty.slug} delay={index * 0.025}>
              <article className="specialty-tile">
                <div>
                  <span>{specialty.label}</span>
                  <h3>{specialty.title}</h3>
                  <p>{specialty.short}</p>
                </div>
                <Link className="text-link" href={`/especialidades/${specialty.slug}`}>
                  Saiba mais
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-dark">
        <div className="age-runway">
          <Reveal>
            <div>
              <p className="eyebrow">Todas as idades</p>
              <h3>Uma clínica para acompanhar a vida inteira.</h3>
            </div>
          </Reveal>
          {[
            ["Crianças", "prevenção, orientação familiar e desenvolvimento"],
            ["Jovens", "alinhamento, estética responsável e hábitos saudáveis"],
            ["Adultos", "cirurgias, HOF, estética, implantes e rotina preventiva"],
            ["Idosos", "reabilitação, próteses, implantes e conforto mastigatório"]
          ].map(([title, text]) => (
            <Reveal key={title}>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-light" id="metodo">
        <div className="method-grid">
          <Reveal className="method-portrait">
            <Image src="/assets/dr-limadentt-diagnostico.jpeg" alt="Dr. Weslen Lima em ambiente de diagnóstico odontológico" width={900} height={1200} />
          </Reveal>
          <div className="method-copy">
            <Reveal>
              <p className="eyebrow !text-ember">Método LIMADENTT</p>
              <h2 className="display-title">Precisão técnica com leitura estética.</h2>
            </Reveal>
            {[
              ["01", "Avaliação com escuta real", "Histórico, idade, queixa, rotina e objetivos são considerados antes de qualquer indicação."],
              ["02", "Planejamento por fases", "O plano organiza prioridades, tempo de tratamento, conforto e previsibilidade."],
              ["03", "Execução refinada", "Procedimentos conduzidos com biossegurança, precisão clínica e acompanhamento próximo."]
            ].map(([number, title, text]) => (
              <Reveal key={number}>
                <article className="method-step">
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark" id="experiencia">
        <div className="experience-band">
          <div>
            <Reveal>
              <p className="eyebrow">Experiência</p>
              <h2 className="display-title">Uma jornada clínica reservada, precisa e personalizada.</h2>
              <p className="hero-copy">
                A LIMADENTT traduz sofisticação em condução: agenda criteriosa, privacidade, explicação objetiva e acompanhamento próximo do primeiro contato ao pós-procedimento.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="glass-note">
              <p>
                Cada paciente entende o plano antes de avançar: prioridades, tempo clínico, etapas, cuidados e resultado esperado, com ênfase em cirurgias e harmonização orofacial.
              </p>
            </Reveal>
          </div>
          <Reveal className="brand-image">
            <Image src="/assets/limadentt-logo-gold.jpeg" alt="Identidade visual LIMADENTT em dourado" width={900} height={720} />
          </Reveal>
        </div>
      </section>

      <section className="section-dark" id="contato">
        <Reveal>
          <div className="contact-panel">
            <div>
              <p className="eyebrow">Contato</p>
              <h2 className="display-title">Agende uma consulta com o Dr. Weslen Lima.</h2>
              <p>
                Chame a equipe pelo WhatsApp {whatsappDisplay} e organize uma avaliação na LIMADENTT.
              </p>
            </div>
            <a className="button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
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
        <Link href="#top">Voltar ao topo</Link>
      </footer>
    </main>
  );
}
