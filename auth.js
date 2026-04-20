// ============================================================
//  LÓGICA DE AUTENTICACIÓN (Firebase Auth — Email / Password)
// ============================================================

import { auth } from "./firebase-config.js";
import { createUserProfile, upsertUserProfile } from "./firestore-users.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// ----------------------------------------------------------
//  Iniciar sesión
// ----------------------------------------------------------
export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  await upsertUserProfile(userCredential.user);
  return userCredential.user;
}

// ----------------------------------------------------------
//  Registrar nuevo usuario
// ----------------------------------------------------------
export async function register(email, password, displayName = "") {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  await createUserProfile(userCredential.user);
  return userCredential.user;
}

// ----------------------------------------------------------
//  Cerrar sesión
// ----------------------------------------------------------
export async function logout() {
  await signOut(auth);
  window.location.href = "login.html";
}

function buildLoginRedirectUrl(redirectTo) {
  try {
    const loginUrl = new URL(redirectTo, window.location.href);
    const nextPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (!loginUrl.searchParams.get("next")) {
      loginUrl.searchParams.set("next", nextPath);
    }
    return loginUrl.href;
  } catch {
    return redirectTo;
  }
}

// ----------------------------------------------------------
//  Guardia de ruta: redirige a login si no hay sesión activa.
//  Úsala en index.html importando este módulo y llamando
//  requireAuth()  al principio del script de la página.
// ----------------------------------------------------------
export function requireAuth(redirectTo = "login.html") {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        window.location.href = buildLoginRedirectUrl(redirectTo);
        reject(new Error("No autenticado"));
      }
    });
  });
}

// ----------------------------------------------------------
//  Guardia inversa: solo invitados.
//  Si hay sesión activa, redirige (por defecto a index.html).
// ----------------------------------------------------------
export function requireGuest(redirectTo = "index.html") {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        window.location.href = redirectTo;
        reject(new Error("Ya autenticado"));
      } else {
        resolve(null);
      }
    });
  });
}

// ----------------------------------------------------------
//  Escuchar cambios de estado de sesión (uso general)
// ----------------------------------------------------------
export function onSession(callback) {
  return onAuthStateChanged(auth, callback);
}
