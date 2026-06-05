export type Specialty = {
  slug: string;
  label: string;
  title: string;
  short: string;
  summary: string;
  detail: string;
  points: string[];
  audience: string;
};

export const whatsappNumber = "5566992306879";
export const whatsappDisplay = "66 99230-6879";

export const makeWhatsAppUrl = (message: string) => {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
};

export const specialties: Specialty[] = [
  {
    slug: "cirurgias",
    label: "Ênfase clínica",
    title: "Cirurgias odontológicas",
    short: "Procedimentos com planejamento, precisão e acompanhamento próximo.",
    summary:
      "Cirurgias conduzidas pelo Dr. Weslen Lima com diagnóstico criterioso, protocolo e orientação em cada fase do atendimento.",
    detail:
      "A cirurgia odontológica precisa unir segurança, leitura anatômica e comunicação clara. Na LIMADENTT, o paciente passa por avaliação individual, entende a indicação do procedimento e recebe condução estruturada do preparo ao pós-operatório.",
    points: [
      "Avaliação clínica e indicação cirúrgica responsável.",
      "Planejamento de extrações, cirurgias orais e etapas associadas a implantes.",
      "Orientações pré e pós-operatórias para mais tranquilidade.",
      "Acompanhamento de cicatrização, conforto e estabilidade."
    ],
    audience: "Adultos, idosos e pacientes que precisam de procedimentos orais planejados."
  },
  {
    slug: "harmonizacao",
    label: "Ênfase estética",
    title: "Harmonização orofacial",
    short: "Equilíbrio facial com naturalidade, critério anatômico e elegância.",
    summary:
      "Tratamentos para valorizar sorriso, face e expressão sem descaracterizar a identidade do paciente.",
    detail:
      "A harmonização orofacial observa proporções, lábios, sorriso, pele e expressão. O objetivo é construir um resultado natural, sofisticado e compatível com a anatomia de cada pessoa.",
    points: [
      "Avaliação facial individualizada.",
      "Planejamento de equilíbrio entre sorriso, lábios e contorno facial.",
      "Indicação responsável de procedimentos conforme necessidade real.",
      "Resultados com discrição, naturalidade e acompanhamento."
    ],
    audience: "Adultos que buscam estética facial refinada e segura."
  },
  {
    slug: "implantes",
    label: "Reabilitação",
    title: "Implantodontia premium",
    short: "Reposição dentária para recuperar função, estabilidade e confiança.",
    summary:
      "Implantes planejados para restabelecer mastigação, estética e conforto de forma personalizada.",
    detail:
      "O tratamento com implantes exige avaliação da estrutura óssea, gengiva, mordida e expectativa estética. Cada caso é organizado para devolver função e naturalidade ao sorriso.",
    points: [
      "Diagnóstico para avaliar viabilidade e prioridades do caso.",
      "Reposição de dentes ausentes com planejamento cirúrgico.",
      "Integração com próteses e reabilitação oral quando necessário.",
      "Manutenção orientada para longevidade do tratamento."
    ],
    audience: "Adultos e idosos com perdas dentárias ou necessidade de reconstrução."
  },
  {
    slug: "estetica",
    label: "Sorriso",
    title: "Lentes, facetas e estética dental",
    short: "Cor, formato e proporção com preservação da naturalidade.",
    summary:
      "Tratamentos estéticos para transformar o sorriso com elegância, identidade e previsibilidade.",
    detail:
      "A estética dental deve valorizar o rosto, não padronizar sorrisos. A análise considera dentes, gengiva, lábios, face e personalidade para propor um resultado coerente.",
    points: [
      "Avaliação de cor, formato, proporção e simetria.",
      "Planejamento de lentes, facetas ou soluções estéticas conforme indicação.",
      "Integração com clareamento, gengiva e reabilitação quando necessário.",
      "Foco em naturalidade, refinamento e durabilidade."
    ],
    audience: "Jovens e adultos que buscam estética sem aparência artificial."
  },
  {
    slug: "reabilitacao",
    label: "Complexidade",
    title: "Reconstrução e reabilitação oral",
    short: "Tratamentos integrados para função mastigatória, estética e conforto.",
    summary:
      "Planos por fases para recuperar dentes, mordida, saúde gengival e autoestima.",
    detail:
      "A reabilitação oral reúne diferentes especialidades para reconstruir função, estética e conforto. É indicada para desgastes, perdas dentárias, dificuldade mastigatória ou tratamentos combinados.",
    points: [
      "Análise de função mastigatória, estética e saúde bucal.",
      "Plano por fases para organizar prioridades e tempo de tratamento.",
      "Integração entre implantes, próteses, estética e prevenção.",
      "Manutenção para preservar estabilidade e qualidade do resultado."
    ],
    audience: "Adultos e idosos que precisam recuperar função, dentes ou conforto."
  },
  {
    slug: "familia",
    label: "Todas as idades",
    title: "Odontologia para crianças, jovens, adultos e idosos",
    short: "Cuidado completo para cada fase da vida.",
    summary:
      "A LIMADENTT atende pacientes de todas as faixas etárias com abordagem adequada para idade, rotina e objetivo.",
    detail:
      "O acompanhamento odontológico muda ao longo da vida. A clínica recebe crianças, adolescentes, adultos e idosos, combinando prevenção, estética, cirurgia, reabilitação e manutenção.",
    points: [
      "Crianças: prevenção, orientação familiar e acompanhamento do desenvolvimento.",
      "Adolescentes: alinhamento, hábitos saudáveis e estética com responsabilidade.",
      "Adultos: cirurgias, harmonização, implantes, estética e rotina preventiva.",
      "Idosos: conforto mastigatório, próteses, implantes e manutenção."
    ],
    audience: "Famílias que buscam um centro odontológico completo."
  },
  {
    slug: "prevencao",
    label: "Saúde",
    title: "Clínica geral e prevenção",
    short: "Avaliações, limpezas, restaurações e manutenção da saúde bucal.",
    summary:
      "Prevenção e clínica geral para preservar dentes, gengivas e tratamentos ao longo do tempo.",
    detail:
      "A odontologia preventiva reduz riscos e identifica alterações cedo. Consultas periódicas mantêm a saúde bucal estável e ajudam a preservar os resultados conquistados.",
    points: [
      "Avaliação odontológica completa.",
      "Limpeza, prevenção e orientação de higiene.",
      "Restaurações e cuidados de clínica geral.",
      "Acompanhamento de manutenção para todas as idades."
    ],
    audience: "Crianças, adolescentes, adultos e idosos em rotina de cuidado contínuo."
  },
  {
    slug: "ortodontia",
    label: "Alinhamento",
    title: "Ortodontia e planejamento do sorriso",
    short: "Alinhamento dentário, função mastigatória e harmonia do sorriso.",
    summary:
      "Avaliação de mordida, posicionamento dental e estética para planos de alinhamento personalizados.",
    detail:
      "A ortodontia melhora posição dos dentes, encaixe da mordida e leitura estética do sorriso. A indicação considera idade, função e integração com outros tratamentos.",
    points: [
      "Avaliação de mordida, alinhamento e função.",
      "Planejamento conforme idade e necessidade do paciente.",
      "Integração com estética, prevenção e reabilitação quando indicado.",
      "Acompanhamento para evolução organizada do tratamento."
    ],
    audience: "Crianças, adolescentes e adultos com necessidade de alinhamento."
  }
];

export const getSpecialty = (slug: string) => {
  return specialties.find((specialty) => specialty.slug === slug) ?? specialties[0];
};
