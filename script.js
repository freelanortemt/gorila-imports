const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const cursorLight = document.querySelector(".cursor-light");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
const slider = document.querySelector("[data-slider]");
const sliderRange = document.querySelector("[data-range]");
const form = document.querySelector("[data-form]");
const formStatus = document.querySelector("[data-form-status]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -40px" }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const active = document.querySelector(`.main-nav a[href="#${entry.target.id}"]`);
      navLinks.forEach((link) => link.classList.remove("is-active"));
      active?.classList.add("is-active");
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => navObserver.observe(section));

if (slider && sliderRange) {
  const updateSlider = () => {
    slider.style.setProperty("--position", `${sliderRange.value}%`);
  };

  sliderRange.addEventListener("input", updateSlider);
  updateSlider();
}

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorLight.style.opacity = "1";
      cursorLight.style.left = `${event.clientX}px`;
      cursorLight.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    cursorLight.style.opacity = "0";
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const nome = data.get("nome");
  const whatsapp = data.get("whatsapp");
  const interesse = data.get("interesse");
  const message = `Olá, sou ${nome}. Gostaria de agendar uma avaliação LIMADENTT para ${interesse}. Meu WhatsApp é ${whatsapp}.`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

  formStatus.textContent = "Abrindo conversa para envio da solicitação...";
  window.open(url, "_blank", "noopener,noreferrer");
});
