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
  const visitPayload = {
    uid: user?.uid || null,
    email: user?.email || null,
    displayName: user?.displayName || null,
    page: page || window.location.pathname,
    source,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "visits"), visitPayload);
}

export async function logOutboundMessage({
  user = null,
  page = "",
  channel = "",
  contentLength = 0
} = {}) {
  const payload = {
    uid: user?.uid || null,
    email: user?.email || null,
    displayName: user?.displayName || null,
    page: page || window.location.pathname,
    channel,
    contentLength,
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "outbound_messages"), payload);
}
