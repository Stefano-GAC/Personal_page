const briefTranslations = {
  es: {
    title: "Asistente de Brief | Stefano Campos",
    goBackLabel: "Volver al Inicio",
    briefPageTitle: "Asistente de brief rapido",
    briefPageSubtitle: "Responde estas preguntas y genera un resumen profesional listo para enviar.",
    briefTypeLabel: "Tipo de proyecto",
    briefTimelineLabel: "Plazo objetivo",
    briefBudgetLabel: "Rango de presupuesto",
    briefFeaturesLabel: "Necesidades clave",
    generateBriefLabel: "Generar resumen",
    sendBriefLabel: "Enviar por WhatsApp",
    briefSummaryLabel: "Resumen",
    briefTemplate:
      "Hola Stefano, quiero un proyecto tipo {type}.\nPlazo: {timeline}.\nPresupuesto: {budget}.\nNecesidades: {features}.\n\nBusco una propuesta tecnica con pasos claros.",
    options: {
      types: ["Landing", "Ecommerce", "WebApp", "API"],
      timelines: ["2 semanas", "1 mes", "2-3 meses", "Flexible"],
      budgets: ["1000-3000 EUR", "3000-6000 EUR", "6000+ EUR", "A definir"]
    },
    toast: "Resumen generado"
  },
  en: {
    title: "Brief Assistant | Stefano Campos",
    goBackLabel: "Back to Home",
    briefPageTitle: "Quick Brief Assistant",
    briefPageSubtitle: "Answer these questions and generate a professional summary ready to send.",
    briefTypeLabel: "Project type",
    briefTimelineLabel: "Target timeline",
    briefBudgetLabel: "Budget range",
    briefFeaturesLabel: "Key needs",
    generateBriefLabel: "Generate summary",
    sendBriefLabel: "Send via WhatsApp",
    briefSummaryLabel: "Summary",
    briefTemplate:
      "Hi Stefano, I need a {type} project.\nTimeline: {timeline}.\nBudget: {budget}.\nNeeds: {features}.\n\nI would like a technical proposal with clear milestones.",
    options: {
      types: ["Landing", "Ecommerce", "Web App", "Backend API"],
      timelines: ["2 weeks", "1 month", "2-3 months", "Flexible"],
      budgets: ["1000-3000 EUR", "3000-6000 EUR", "6000+ EUR", "To define"]
    },
    toast: "Summary generated"
  }
};

const textIds = [
  "goBackLabel",
  "briefPageTitle",
  "briefPageSubtitle",
  "briefTypeLabel",
  "briefTimelineLabel",
  "briefBudgetLabel",
  "briefFeaturesLabel",
  "generateBriefLabel",
  "sendBriefLabel",
  "briefSummaryLabel"
];

const langEsBtn = document.getElementById("langEs");
const langEnBtn = document.getElementById("langEn");
const briefType = document.getElementById("briefType");
const briefTimeline = document.getElementById("briefTimeline");
const briefBudget = document.getElementById("briefBudget");
const briefSummary = document.getElementById("briefSummary");
const generateBrief = document.getElementById("generateBrief");
const sendBriefWhatsapp = document.getElementById("sendBriefWhatsapp");

let currentLang = localStorage.getItem("portfolioLanguage") || "es";
let hasGenerated = false;

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "22px";
  toast.style.right = "22px";
  toast.style.background = "#0f172a";
  toast.style.color = "#e2e8f0";
  toast.style.padding = "10px 12px";
  toast.style.borderRadius = "9px";
  toast.style.border = "1px solid #334155";
  toast.style.zIndex = "1500";
  toast.style.fontSize = "0.84rem";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function fillSelectOptions() {
  const t = briefTranslations[currentLang];
  const updateSelect = (select, options) => {
    if (!select) {
      return;
    }
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

  updateSelect(briefType, t.options.types);
  updateSelect(briefTimeline, t.options.timelines);
  updateSelect(briefBudget, t.options.budgets);
}

function getSelectedFeatures() {
  return Array.from(document.querySelectorAll('input[name="briefFeature"]:checked')).map(
    (input) => input.value
  );
}

function generateSummary() {
  const t = briefTranslations[currentLang];
  const summary = t.briefTemplate
    .replace("{type}", briefType?.value || "")
    .replace("{timeline}", briefTimeline?.value || "")
    .replace("{budget}", briefBudget?.value || "")
    .replace("{features}", getSelectedFeatures().join(", ") || "-");

  if (briefSummary) {
    briefSummary.value = summary;
  }

  if (sendBriefWhatsapp) {
    sendBriefWhatsapp.href = `https://wa.me/34624461935?text=${encodeURIComponent(summary)}`;
  }
}

function clearSummary() {
  if (briefSummary) {
    briefSummary.value = "";
  }
  if (sendBriefWhatsapp) {
    sendBriefWhatsapp.href = "https://wa.me/34624461935";
  }
}

function applyLanguage(lang) {
  currentLang = briefTranslations[lang] ? lang : "es";
  localStorage.setItem("portfolioLanguage", currentLang);
  const t = briefTranslations[currentLang];

  document.documentElement.lang = currentLang;
  document.title = t.title;

  textIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el && t[id]) {
      el.textContent = t[id];
    }
  });

  langEsBtn?.classList.toggle("active", currentLang === "es");
  langEnBtn?.classList.toggle("active", currentLang === "en");

  fillSelectOptions();
  if (hasGenerated) {
    generateSummary();
  } else {
    clearSummary();
  }
}

langEsBtn?.addEventListener("click", () => applyLanguage("es"));
langEnBtn?.addEventListener("click", () => applyLanguage("en"));

generateBrief?.addEventListener("click", () => {
  hasGenerated = true;
  generateSummary();
  showToast(briefTranslations[currentLang].toast);
});

document.getElementById("briefForm")?.addEventListener("change", () => {
  if (hasGenerated) {
    generateSummary();
  }
});

applyLanguage(currentLang);
