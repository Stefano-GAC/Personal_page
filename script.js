// Diccionario central de textos por idioma.
// Todas las claves usadas en UI deben existir en cada idioma disponible.
const translations = {
  es: {
    pageTitle: "Stefano Campos | Desarrollador Web",
    navAbout: "Sobre mi",
    navProjects: "Proyectos",
    aboutTitle: "Sobre mi",
    aboutText:
      "Soluciones web reales mediante codigo solido. Desarrollo aplicaciones dinamicas con React, PHP y Java, enfocandome en resolver cada requerimiento tecnico sin complicaciones.",
    previewLabel: "Preview",
    backLabel: "Volver",
    projectsTitle: "Proyectos Destacados",
    projectDesc1:
      "Juego interactivo con JavaScript y HTML5 Canvas con fisicas realistas y efectos visuales.",
    projectDesc2:
      "Interfaz de Netflix desarrollada con React con carruseles dinamicos y diseno responsive.",
    projectDesc3:
      "Landing page moderna con CSS animaciones avanzadas y diseno neon impactante.",
    projectDesc4:
      "API completa para gestion de datos Pokemon con endpoints RESTful y documentacion.",
    projectBack1a: "Motor de fisicas construido desde cero",
    projectBack1b: "Game loop de 60fps con requestAnimationFrame",
    projectBack1c: "Efectos visuales y scoring en tiempo real",
    projectBack2a: "Componentes React reutilizables",
    projectBack2b: "Carruseles dinamicos y navegacion fluida",
    projectBack2c: "Diseno 100% responsive y fiel al original",
    projectBack3a: "Animaciones personalizadas sin librerias",
    projectBack3b: "Identidad visual neon consistente",
    projectBack3c: "Landing optimizada para conversion",
    projectBack4a: "Endpoints CRUD completos y documentados",
    projectBack4b: "Base de datos relacional integrada",
    projectBack4c: "Arquitectura lista para cliente web",
    viewProject: "Ver completo",
    moreGithub: "Ver mas en GitHub",
    footerText: "© 2026 Stefano Alderete | Desarrollador Web",
    whatsappTitle: "Escribeme por WhatsApp",
    whatsappAria: "Abrir chat de WhatsApp con Stefano",
    whatsappLabel: "WhatsApp",
    typingText: "Desarrollador de aplicaciones web"
  },
  en: {
    pageTitle: "Stefano Campos | Web Developer",
    navAbout: "About me",
    navProjects: "Projects",
    aboutTitle: "About me",
    aboutText:
      "Real web solutions through solid code. I build dynamic applications with React, PHP, and Java, focused on solving each technical requirement clearly and efficiently.",
    previewLabel: "Preview",
    backLabel: "Back",
    projectsTitle: "Featured Projects",
    projectDesc1:
      "Interactive game built with JavaScript and HTML5 Canvas, including realistic physics and visual effects.",
    projectDesc2:
      "Netflix-style interface built with React, including dynamic carousels and responsive design.",
    projectDesc3:
      "Modern landing page with advanced CSS animations and a bold neon visual style.",
    projectDesc4:
      "Complete API for Pokemon data management with RESTful endpoints and documentation.",
    projectBack1a: "Physics engine built from scratch",
    projectBack1b: "60fps game loop with requestAnimationFrame",
    projectBack1c: "Visual effects and real-time scoring",
    projectBack2a: "Reusable React components",
    projectBack2b: "Dynamic carousels and smooth navigation",
    projectBack2c: "100% responsive design faithful to original",
    projectBack3a: "Custom animations without libraries",
    projectBack3b: "Consistent neon visual identity",
    projectBack3c: "Landing page optimized for conversion",
    projectBack4a: "Complete and documented CRUD endpoints",
    projectBack4b: "Integrated relational database",
    projectBack4c: "Architecture ready for web client",
    viewProject: "View full",
    moreGithub: "See more on GitHub",
    footerText: "© 2026 Stefano Alderete | Web Developer",
    whatsappTitle: "Message me on WhatsApp",
    whatsappAria: "Open WhatsApp chat with Stefano",
    whatsappLabel: "WhatsApp",
    typingText: "Web application developer"
  }
};

// IDs de nodos que se traducen mediante textContent.
const textIds = [
  "navAbout",
  "navProjects",
  "aboutTitle",
  "aboutText",
  "projectsTitle",
  "projectDesc1",
  "projectDesc2",
  "projectDesc3",
  "projectDesc4",
  "projectBack1a",
  "projectBack1b",
  "projectBack1c",
  "projectBack2a",
  "projectBack2b",
  "projectBack2c",
  "projectBack3a",
  "projectBack3b",
  "projectBack3c",
  "projectBack4a",
  "projectBack4b",
  "projectBack4c",
  "moreGithub",
  "footerText"
];

// Referencias DOM reutilizadas para evitar consultas repetitivas.
const typingElement = document.getElementById("typing");
const langEsBtn = document.getElementById("langEs");
const langEnBtn = document.getElementById("langEn");
const whatsappFloat = document.getElementById("whatsappFloat");
const whatsappLabel = document.querySelector(".whatsapp-label");

let typingTimer = null;
let typingResetTimer = null;
let typingIndex = 0;
let typingText = "";

function clearTypingTimers() {
  // Evita que se acumulen timers al cambiar idioma rapidamente.
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
  if (typingResetTimer) {
    clearTimeout(typingResetTimer);
    typingResetTimer = null;
  }
}

function runTypingEffect() {
  if (!typingElement) {
    return;
  }

  // Escribe caracter por caracter hasta completar el texto actual.
  if (typingIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;
    typingTimer = setTimeout(runTypingEffect, 80);
    return;
  }

  // Reinicia el ciclo para mantener animacion continua.
  typingResetTimer = setTimeout(() => {
    typingElement.textContent = "";
    typingIndex = 0;
    runTypingEffect();
  }, 1000);
}

function restartTyping(newText) {
  clearTypingTimers();
  typingText = newText;
  typingIndex = 0;
  if (typingElement) {
    typingElement.textContent = "";
  }
  runTypingEffect();
}

function applyLanguage(lang) {
  // Fallback a espanol si el idioma pedido no existe.
  const selectedLanguage = translations[lang] ? lang : "es";
  const t = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = t.pageTitle;

  // Traduce nodos con id directo.
  textIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && t[id]) {
      el.textContent = t[id];
    }
  });

  // Traduce etiquetas repetidas en listas de proyectos.
  document.querySelectorAll(".project-btn-text").forEach((el) => {
    el.textContent = t.viewProject;
  });

  document.querySelectorAll(".preview-label").forEach((el) => {
    el.textContent = t.previewLabel;
  });

  document.querySelectorAll(".back-label").forEach((el) => {
    el.textContent = t.backLabel;
  });

  if (whatsappFloat) {
    whatsappFloat.setAttribute("title", t.whatsappTitle);
    whatsappFloat.setAttribute("aria-label", t.whatsappAria);
  }

  if (whatsappLabel) {
    whatsappLabel.textContent = t.whatsappLabel;
  }

  if (langEsBtn && langEnBtn) {
    langEsBtn.classList.toggle("active", selectedLanguage === "es");
    langEnBtn.classList.toggle("active", selectedLanguage === "en");
  }

  // Persiste preferencia para siguientes visitas.
  localStorage.setItem("portfolioLanguage", selectedLanguage);
  restartTyping(t.typingText);
}

if (langEsBtn) {
  langEsBtn.addEventListener("click", () => applyLanguage("es"));
}

if (langEnBtn) {
  langEnBtn.addEventListener("click", () => applyLanguage("en"));
}

// Inicializacion de idioma al cargar la pagina.
const initialLanguage = localStorage.getItem("portfolioLanguage") || "es";
applyLanguage(initialLanguage);

// Sistema de flip-card para previews de proyectos.
document.querySelectorAll(".project-flip").forEach((card) => {
  const previewBtn = card.querySelector(".preview-btn");
  const backBtn = card.querySelector(".back-btn");

  if (previewBtn) {
    previewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.add("is-flipped");
      const iframe = card.querySelector(".project-iframe");
      // Lazy load: carga iframe solo cuando el usuario abre preview.
      if (iframe && !iframe.src && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.addEventListener("load", () => iframe.classList.add("loaded"), { once: true });
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      card.classList.remove("is-flipped");
    });
  }
});

// Animaciones por interseccion (si existen elementos .hidden en el DOM).
const hiddenElements = document.querySelectorAll(".hidden");

// Al entrar en viewport, se agrega .show para activar transicion CSS.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

const backToTop = document.getElementById("backToTop");

// Muestra u oculta el boton segun profundidad de scroll.
window.onscroll = function () {
  if (!backToTop) {
    return;
  }

  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

if (backToTop) {
  // Vuelve al inicio con desplazamiento suave.
  backToTop.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
}