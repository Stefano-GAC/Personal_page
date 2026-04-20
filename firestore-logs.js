// ============================================================
//  LOGS EN CLOUD FIRESTORE
//  - visits: registro simple de visitas por página
// ============================================================

import { db } from "./firebase-config.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function logVisit({ user = null, page = "", source = "web" } = {}) {
  // Registro atomico de una visita autenticada.
  const visitPayload = {
    // Identidad del usuario autenticado (si existe contexto de sesion).
    uid: user?.uid || null,
    email: user?.email || null,
    displayName: user?.displayName || null,
    // Pagina funcional de negocio (index, brief, etc) o pathname real.
    page: page || window.location.pathname,
    // Fuente del evento para distinguir web/app/fuentes futuras.
    source,
    // Telemetria ligera para troubleshooting de navegador.
    userAgent: navigator.userAgent,
    // Timestamp servidor para evitar sesgos de reloj local del cliente.
    createdAt: serverTimestamp()
  };

  // Inserta un nuevo documento en cada visita (modelo append-only).
  await addDoc(collection(db, "visits"), visitPayload);
}

export async function logOutboundMessage({
  user = null,
  page = "",
  channel = "",
  contentLength = 0
} = {}) {
  // Evento de salida a canal externo (ej: WhatsApp).
  const payload = {
    uid: user?.uid || null,
    email: user?.email || null,
    displayName: user?.displayName || null,
    page: page || window.location.pathname,
    // Canal usado para la salida (whatsapp, email, etc).
    channel,
    // Longitud del contenido enviado, util para analitica de uso.
    contentLength,
    createdAt: serverTimestamp()
  };

  // Coleccion separada para eventos de contacto/salida.
  await addDoc(collection(db, "outbound_messages"), payload);
}

export async function logBriefAction({
  user = null,
  action = "",
  summaryLength = 0,
  page = "brief"
} = {}) {
  // Eventos de embudo del brief (ej: generate_summary).
  const payload = {
    uid: user?.uid || null,
    email: user?.email || null,
    displayName: user?.displayName || null,
    page,
    // Tipo de accion realizada por el usuario.
    action,
    // Tamanio del resumen en caracteres (senal de calidad de input).
    summaryLength,
    createdAt: serverTimestamp()
  };

  // Coleccion especializada para medir conversion dentro del brief.
  await addDoc(collection(db, "brief_events"), payload);
}
