// ============================================================
//  MAPA DEL ARCHIVO (script.js)
//  1) Diccionario i18n ES/EN
//  2) Referencias de DOM
//  3) Estado global de UI
//  4) Funciones de traduccion, typing y utilidades
//  5) Modulos de interaccion (cards, brief, chat, scroll)
//  6) Bootstrapping final
// ============================================================

// Diccionario central de textos visibles en interfaz.
const translations = {
  es: {
    pageTitle: "Stefano Campos | Desarrollador Web",
    navAbout: "Sobre mi",
    navProjects: "Proyectos",
    navBrief: "Asistente",
    aboutTitle: "Sobre mi",
    aboutText:
      "Soluciones web reales mediante codigo solido. Desarrollo aplicaciones dinamicas con React, PHP y Java, enfocandome en resolver cada requerimiento tecnico sin complicaciones.",
    previewLabel: "Preview",
    demoLabel: "Demo",
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
    typingText: "Desarrollador de aplicaciones web",
    briefTitle: "Asistente de brief rapido",
    briefSubtitle: "Completa 4 datos y obtendras un resumen listo para enviar por WhatsApp.",
    briefTypeLabel: "Tipo de proyecto",
    briefTimelineLabel: "Plazo objetivo",
    briefBudgetLabel: "Rango de presupuesto",
    briefFeaturesLabel: "Necesidades clave",
    generateBriefLabel: "Generar resumen",
    sendBriefLabel: "Enviar por WhatsApp",
    briefSummaryLabel: "Resumen",
    chatToggleText: "Chat rapido",
    chatHint: "Preguntame sobre proyectos, habilidades, como trabajo, resultados o contacto.",
    chatSendText: "Enviar",
    chatPlaceholder: "Escribe tu pregunta",
    chatSugProjects: "Proyectos",
    chatSugServices: "Servicios",
    chatSugTimeline: "Tiempos",
    chatSugContact: "Contacto",
    chatWelcome: "Hola, soy tu asistente rapido. Puedes preguntarme por proyectos, habilidades, como trabajo, resultados o contacto.",
    briefTemplate:
      "Hola Stefano, quiero un proyecto tipo {type}.\nPlazo: {timeline}.\nPresupuesto: {budget}.\nNecesidades: {features}.\n\nBusco una propuesta tecnica con pasos claros.",
    demoMessages: {
      pong: "Reto Pong: intenta devolver 20 pelotas seguidas sin fallar.",
      netflix: "Reto Netflix: navega entre secciones y valida tiempos de carga.",
      neondrive: "Reto NeonDrive: revisa el impacto visual en movil y desktop.",
      pokemon: "Reto API: prueba 3 endpoints y valida estructura de respuesta."
    },
    chatReplies: {
      proyectos: "Tengo 4 proyectos destacados: Pong Galactico, Netflix Clone, NeonDrive y API Pokemon.",
      servicios: "Puedo ayudarte con landing pages, web apps, APIs, integraciones y mejoras de UI/UX.",
      tiempos: "Un proyecto pequeno suele tardar entre 2 y 4 semanas, segun alcance y revisiones.",
      stack: "Trabajo principalmente con React, JavaScript, Java, PHP y APIs REST.",
      contacto: "Puedes contactarme por WhatsApp, LinkedIn o GitHub desde los botones de esta pagina.",
      habilidades: "Mis habilidades clave: React, JavaScript, Java, PHP, diseno UI/UX, integraciones API y optimizacion de experiencia web.",
      comoTrabajo: "Mi proceso: 1) Discovery de objetivos, 2) Roadmap tecnico, 3) Desarrollo iterativo con entregas visibles, 4) Publicacion y soporte.",
      resultados: "Resultados habituales: entregas mas rapidas, mejora de conversion, UI mas clara y arquitectura lista para escalar.",
      comoConstrui: "Cada proyecto sigue una logica clara: problema real, decision tecnica, trade-off asumido y plan de mejora continua."
    },
    chatFallback: "No capte bien la pregunta. Prueba con: proyectos, habilidades, como trabajo, resultados, stack o contacto.",
    briefOptions: {
      types: ["Landing", "Ecommerce", "WebApp", "API"],
      timelines: ["2 semanas", "1 mes", "2-3 meses", "Flexible"],
      budgets: ["1000-3000 EUR", "3000-6000 EUR", "6000+ EUR", "A definir"]
    }
  },
  en: {
    pageTitle: "Stefano Campos | Web Developer",
    navAbout: "About me",
    navProjects: "Projects",
    navBrief: "Brief",
    aboutTitle: "About me",
    aboutText:
      "Real web solutions through solid code. I build dynamic applications with React, PHP, and Java, focused on solving each technical requirement clearly and efficiently.",
    previewLabel: "Preview",
    demoLabel: "Demo",
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
    typingText: "Web application developer",
    briefTitle: "Quick project brief assistant",
    briefSubtitle: "Fill 4 fields and get a ready-to-send summary for WhatsApp.",
    briefTypeLabel: "Project type",
    briefTimelineLabel: "Target timeline",
    briefBudgetLabel: "Budget range",
    briefFeaturesLabel: "Key needs",
    generateBriefLabel: "Generate summary",
    sendBriefLabel: "Send via WhatsApp",
    briefSummaryLabel: "Summary",
    chatToggleText: "Quick chat",
    chatHint: "Ask me about projects, skills, process, results, or contact.",
    chatSendText: "Send",
    chatPlaceholder: "Type your question",
    chatSugProjects: "Projects",
    chatSugServices: "Services",
    chatSugTimeline: "Timeline",
    chatSugContact: "Contact",
    chatWelcome: "Hi, I am your quick assistant. Ask me about projects, skills, process, results, or contact.",
    briefTemplate:
      "Hi Stefano, I need a {type} project.\nTimeline: {timeline}.\nBudget: {budget}.\nNeeds: {features}.\n\nI would like a technical proposal with clear milestones.",
    demoMessages: {
      pong: "Pong challenge: try returning 20 balls in a row.",
      netflix: "Netflix challenge: explore sections and validate load speed.",
      neondrive: "NeonDrive challenge: check visual impact on mobile and desktop.",
      pokemon: "API challenge: test 3 endpoints and validate response structure."
    },
    chatReplies: {
      projects: "I have 4 featured projects: Pong Galactico, Netflix Clone, NeonDrive, and API Pokemon.",
      services: "I can help with landing pages, web apps, APIs, integrations, and UI/UX improvements.",
      timeline: "A small project usually takes 2 to 4 weeks depending on scope and revisions.",
      stack: "My core stack is React, JavaScript, Java, PHP, and REST APIs.",
      contact: "You can contact me via WhatsApp, LinkedIn, or GitHub from this page.",
      skills: "My key skills: React, JavaScript, Java, PHP, UI/UX design, API integrations, and web experience optimization.",
      process: "My process: 1) goals discovery, 2) technical roadmap, 3) iterative development with visible deliveries, 4) launch and support.",
      results: "Typical outcomes: faster delivery, better conversion, clearer UI, and architecture ready to scale.",
      buildStory: "Each project follows a clear path: real problem, technical decision, accepted trade-off, and continuous improvement plan."
    },
    chatFallback: "I did not fully get it. Try: projects, skills, process, results, stack, or contact.",
    briefOptions: {
      types: ["Landing", "Ecommerce", "Web App", "Backend API"],
      timelines: ["2 weeks", "1 month", "2-3 months", "Flexible"],
      budgets: ["1000-3000 EUR", "3000-6000 EUR", "6000+ EUR", "To define"]
    }
  }
};

// IDs de elementos cuyo textContent se actualiza por idioma.
const textIds = [
  "navAbout",
  "navProjects",
  "navBrief",
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
  "footerText",
  "briefTitle",
  "briefSubtitle",
  "briefTypeLabel",
  "briefTimelineLabel",
  "briefBudgetLabel",
  "briefFeaturesLabel",
  "generateBriefLabel",
  "sendBriefLabel",
  "briefSummaryLabel",
  "chatToggleText",
  "chatHint",
  "chatSendText",
  "chatSugProjects",
  "chatSugServices",
  "chatSugTimeline",
  "chatSugContact"
];

const typingElement = document.getElementById("typing");
// Cache de nodos DOM para evitar busquedas repetitivas.
const langEsBtn = document.getElementById("langEs");
const langEnBtn = document.getElementById("langEn");
const whatsappFloat = document.getElementById("whatsappFloat");
const whatsappLabel = document.querySelector(".whatsapp-label");
const briefForm = document.getElementById("briefForm");
const briefType = document.getElementById("briefType");
const briefTimeline = document.getElementById("briefTimeline");
const briefBudget = document.getElementById("briefBudget");
const briefSummary = document.getElementById("briefSummary");
const generateBriefBtn = document.getElementById("generateBrief");
const sendBriefWhatsapp = document.getElementById("sendBriefWhatsapp");
const miniChat = document.getElementById("miniChat");
const miniChatToggle = document.getElementById("miniChatToggle");
const chatInput = document.getElementById("chatInput");
const chatOutput = document.getElementById("chatOutput");
const chatSendBtn = document.getElementById("chatSendBtn");
const cursorGlow = document.getElementById("cursorGlow");
const backToTop = document.getElementById("backToTop");

// Estado compartido entre modulos de la pagina.
let typingTimer = null;
let typingResetTimer = null;
let typingIndex = 0;
let typingText = "";
let currentLang = "es";
let soundEnabled = false;
let currentTheme = "arcade";

function clearTypingTimers() {
  // Limpia timers activos del efecto typing para prevenir duplicados.
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
  // Efecto maquina de escribir con reinicio automatico.
  if (!typingElement) {
    return;
  }
  if (typingIndex < typingText.length) {
    typingElement.textContent += typingText.charAt(typingIndex);
    typingIndex += 1;
    typingTimer = setTimeout(runTypingEffect, 70);
    return;
  }
  typingResetTimer = setTimeout(() => {
    typingElement.textContent = "";
    typingIndex = 0;
    runTypingEffect();
  }, 1000);
}

function restartTyping(newText) {
  // Reinicio seguro del typing al cambiar idioma.
  clearTypingTimers();
  typingText = newText;
  typingIndex = 0;
  if (typingElement) {
    typingElement.textContent = "";
  }
  runTypingEffect();
}

function playUiTick(freq = 460, duration = 0.06) {
  // Feedback sonoro opcional de interacciones UI.
  if (!soundEnabled) {
    return;
  }
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gainNode.gain.value = 0.03;
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (_err) {
    // If browser blocks audio context, silently ignore.
  }
}

function updateThemeUi() {
  document.body.classList.add("arcade-mode");
}

function applySelectOptions() {
  // Rellena selects del brief con opciones del idioma activo.
  const t = translations[currentLang];
  if (!briefType || !briefTimeline || !briefBudget) {
    return;
  }
  const fill = (select, options) => {
    const previous = select.value;
    select.innerHTML = "";
    options.forEach((optionText) => {
      const option = document.createElement("option");
      option.value = optionText;
      option.textContent = optionText;
      select.appendChild(option);
    });
    if (options.includes(previous)) {
      select.value = previous;
    }
  };
  fill(briefType, t.briefOptions.types);
  fill(briefTimeline, t.briefOptions.timelines);
  fill(briefBudget, t.briefOptions.budgets);
}

function applyLanguage(lang) {
  // Punto unico de i18n: titulos, labels, placeholders y textos de apoyo.
  const selectedLanguage = translations[lang] ? lang : "es";
  currentLang = selectedLanguage;
  const t = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = t.pageTitle;

  textIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && t[id]) {
      el.textContent = t[id];
    }
  });

  document.querySelectorAll(".project-btn-text").forEach((el) => {
    el.textContent = t.viewProject;
  });

  document.querySelectorAll(".preview-label").forEach((el) => {
    el.textContent = t.previewLabel;
  });

  document.querySelectorAll(".demo-label").forEach((el) => {
    el.textContent = t.demoLabel;
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

  if (chatInput) {
    chatInput.placeholder = t.chatPlaceholder;
  }

  const chatSugProjects = document.getElementById("chatSugProjects");
  const chatSugServices = document.getElementById("chatSugServices");
  const chatSugTimeline = document.getElementById("chatSugTimeline");
  const chatSugContact = document.getElementById("chatSugContact");

  if (chatSugProjects && chatSugServices && chatSugTimeline && chatSugContact) {
    if (selectedLanguage === "es") {
      chatSugProjects.dataset.question = "proyectos";
      chatSugServices.dataset.question = "servicios";
      chatSugTimeline.dataset.question = "tiempos";
      chatSugContact.dataset.question = "contacto";
    } else {
      chatSugProjects.dataset.question = "projects";
      chatSugServices.dataset.question = "services";
      chatSugTimeline.dataset.question = "timeline";
      chatSugContact.dataset.question = "contact";
    }
  }

  applySelectOptions();
  buildBriefSummary();
  updateThemeUi();
  restartTyping(t.typingText);
  localStorage.setItem("portfolioLanguage", selectedLanguage);
}

function showChatLine(text, role = "bot") {
  // Inserta una linea en el historial del mini chat.
  if (!chatOutput) {
    return;
  }
  const line = document.createElement("p");
  line.className = `chat-line ${role}`;
  line.textContent = text;
  chatOutput.appendChild(line);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function getChatReply(question) {
  // Matching simple por palabras clave para responder sin backend.
  const normalized = question.toLowerCase();
  const t = translations[currentLang];

  if (currentLang === "es") {
    if (normalized.includes("proyecto")) return t.chatReplies.proyectos;
    if (normalized.includes("servicio") || normalized.includes("haces") || normalized.includes("ofreces")) return t.chatReplies.servicios;
    if (normalized.includes("tiempo") || normalized.includes("demora") || normalized.includes("plazo")) return t.chatReplies.tiempos;
    if (normalized.includes("habilidad") || normalized.includes("skills")) return t.chatReplies.habilidades;
    if (normalized.includes("como trabaj") || normalized.includes("proceso") || normalized.includes("metodo")) return t.chatReplies.comoTrabajo;
    if (normalized.includes("resultado") || normalized.includes("logro") || normalized.includes("impacto")) return t.chatReplies.resultados;
    if (normalized.includes("como lo constru") || normalized.includes("como constru") || normalized.includes("trade-off") || normalized.includes("decision tecnica")) return t.chatReplies.comoConstrui;
    if (normalized.includes("stack") || normalized.includes("tecnologia") || normalized.includes("tecnologias")) return t.chatReplies.stack;
    if (normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("linkedin") || normalized.includes("github")) return t.chatReplies.contacto;
    return t.chatFallback;
  }

  if (normalized.includes("project")) return t.chatReplies.projects;
  if (normalized.includes("service") || normalized.includes("offer")) return t.chatReplies.services;
  if (normalized.includes("time") || normalized.includes("timeline") || normalized.includes("long")) return t.chatReplies.timeline;
  if (normalized.includes("skill")) return t.chatReplies.skills;
  if (normalized.includes("process") || normalized.includes("work") || normalized.includes("workflow")) return t.chatReplies.process;
  if (normalized.includes("result") || normalized.includes("impact")) return t.chatReplies.results;
  if (normalized.includes("build") || normalized.includes("trade-off") || normalized.includes("technical decision")) return t.chatReplies.buildStory;
  if (normalized.includes("stack") || normalized.includes("tech")) return t.chatReplies.stack;
  if (normalized.includes("contact") || normalized.includes("whatsapp") || normalized.includes("linkedin") || normalized.includes("github")) return t.chatReplies.contact;
  return t.chatFallback;
}

function submitChatQuestion(value) {
  const question = value.trim();
  if (!question) {
    return;
  }
  showChatLine(question, "user");
  const answer = getChatReply(question);
  setTimeout(() => {
    showChatLine(answer, "bot");
    playUiTick(560, 0.06);
  }, 160);
}

function getSelectedFeatures() {
  return Array.from(document.querySelectorAll('input[name="briefFeature"]:checked')).map(
    (checkbox) => checkbox.value
  );
}

function buildBriefSummary() {
  // Compone mensaje final del brief y actualiza enlace de WhatsApp.
  const t = translations[currentLang];
  const features = getSelectedFeatures();
  const summary = t.briefTemplate
    .replace("{type}", briefType?.value || "")
    .replace("{timeline}", briefTimeline?.value || "")
    .replace("{budget}", briefBudget?.value || "")
    .replace("{features}", features.length ? features.join(", ") : "-");

  if (briefSummary) {
    briefSummary.value = summary;
  }
  if (sendBriefWhatsapp) {
    const encoded = encodeURIComponent(summary);
    sendBriefWhatsapp.href = `https://wa.me/34624461935?text=${encoded}`;
  }
}

function showMiniToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "150px";
  toast.style.right = "24px";
  toast.style.background = "#0f172a";
  toast.style.color = "#e2e8f0";
  toast.style.padding = "10px 12px";
  toast.style.borderRadius = "9px";
  toast.style.border = "1px solid #334155";
  toast.style.zIndex = "1400";
  toast.style.maxWidth = "260px";
  toast.style.fontSize = "0.82rem";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function launchProjectDemo(projectKey) {
  const msg = translations[currentLang].demoMessages[projectKey];
  if (msg) {
    showMiniToast(msg);
    playUiTick(620, 0.08);
  }
}

function initProjectCards() {
  // Inicializa flip-cards, lazy iframe y boton demo por proyecto.
  document.querySelectorAll(".project-flip").forEach((card) => {
    const previewBtn = card.querySelector(".preview-btn");
    const backBtn = card.querySelector(".back-btn");
    const demoBtn = card.querySelector(".demo-btn");

    if (previewBtn) {
      previewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.add("is-flipped");
        const iframe = card.querySelector(".project-iframe");
        if (iframe && !iframe.src && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
          iframe.addEventListener("load", () => iframe.classList.add("loaded"), { once: true });
        }
        playUiTick(500, 0.07);
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.remove("is-flipped");
        playUiTick(420, 0.05);
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        launchProjectDemo(card.dataset.project || "pong");
      });
    }
  });
}

function initScrollReveal() {
  const hiddenElements = document.querySelectorAll(".hidden");
  if (!hiddenElements.length || typeof IntersectionObserver === "undefined") {
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });
  hiddenElements.forEach((el) => observer.observe(el));
}

function initHeroParallax() {
  const orbs = document.querySelectorAll(".hero-orb");
  const header = document.querySelector("header.hero-gradient");
  if (!orbs.length || !header) {
    return;
  }
  header.addEventListener("mousemove", (event) => {
    const rect = header.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;
    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 12;
      orb.style.transform = `translate(${offsetX * factor}px, ${offsetY * factor}px)`;
    });
  });
}

function initCursorGlow() {
  if (!cursorGlow || window.matchMedia("(max-width: 767px)").matches) {
    return;
  }
  document.body.classList.add("cursor-active");
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

function initBackToTop() {
  window.addEventListener("scroll", () => {
    if (!backToTop) {
      return;
    }
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      playUiTick(520, 0.06);
    });
  }
}

function initThemeAndSound() {
  updateThemeUi();
}

function initBriefAssistant() {
  // Modulo de brief embebido: no se activa si el bloque no existe.
  if (!briefForm || !generateBriefBtn) {
    return;
  }
  generateBriefBtn.addEventListener("click", () => {
    buildBriefSummary();
    showMiniToast(currentLang === "es" ? "Resumen generado." : "Summary generated.");
    playUiTick(600, 0.08);
  });
  briefForm.addEventListener("change", buildBriefSummary);
  buildBriefSummary();
}

function initMiniChat() {
  // Inicializa eventos de apertura, envio y sugerencias del mini chat.
  if (!miniChat || !miniChatToggle || !chatInput || !chatSendBtn) {
    return;
  }
  miniChatToggle.addEventListener("click", () => {
    miniChat.classList.toggle("open");
    if (miniChat.classList.contains("open")) {
      chatInput.focus();
    }
  });

  chatInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    event.preventDefault();
    submitChatQuestion(chatInput.value);
    chatInput.value = "";
  });

  chatSendBtn.addEventListener("click", () => {
    submitChatQuestion(chatInput.value);
    chatInput.value = "";
  });

  document.querySelectorAll(".chat-suggestion").forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.dataset.question || "";
      submitChatQuestion(text);
    });
  });

  if (chatOutput && !chatOutput.children.length) {
    showChatLine(translations[currentLang].chatWelcome, "bot");
  }
}

if (langEsBtn) {
  langEsBtn.addEventListener("click", () => applyLanguage("es"));
}
if (langEnBtn) {
  langEnBtn.addEventListener("click", () => applyLanguage("en"));
}

const initialLanguage = localStorage.getItem("portfolioLanguage") || "es";
// Bootstrapping secuencial de todos los modulos de UI.
applyLanguage(initialLanguage);
initThemeAndSound();
initProjectCards();
initScrollReveal();
initHeroParallax();
initCursorGlow();
initBackToTop();
initBriefAssistant();
initMiniChat();