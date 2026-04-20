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
  // 1) Valida credenciales contra Firebase Auth.
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // 2) Sincroniza metadatos de ultimo acceso en Firestore.
  await upsertUserProfile(userCredential.user);
  // 3) Devuelve el usuario autenticado al caller.
  return userCredential.user;
}

// ----------------------------------------------------------
//  Registrar nuevo usuario
// ----------------------------------------------------------
export async function register(email, password, displayName = "") {
  // 1) Crea cuenta en Authentication.
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    // 2) Actualiza nombre visible en perfil de Firebase Auth.
    await updateProfile(userCredential.user, { displayName });
  }
  // 3) Crea documento base en coleccion users/{uid}.
  await createUserProfile(userCredential.user);
  // 4) Retorna usuario creado para redireccion y/o UI.
  return userCredential.user;
}

// ----------------------------------------------------------
//  Cerrar sesión
// ----------------------------------------------------------
export async function logout() {
  // Cierra sesion local y remota de Firebase Auth.
  await signOut(auth);
  // Fuerza regreso a pantalla publica de acceso.
  window.location.href = "login.html";
}

function buildLoginRedirectUrl(redirectTo) {
  try {
    // Convierte redirectTo en URL absoluta para manipular query params con seguridad.
    const loginUrl = new URL(redirectTo, window.location.href);
    // Guarda ruta original para volver tras autenticacion exitosa.
    const nextPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    // Solo agrega next si no existe ya en la URL objetivo.
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
  // Promise manual para consumirla con then/catch en paginas protegidas.
  return new Promise((resolve, reject) => {
    // onAuthStateChanged notifica una sola vez estado inicial + futuros cambios.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Se desuscribe de inmediato porque aqui solo importa la primera evaluacion.
      unsubscribe();
      if (user) {
        // Sesion valida: pagina puede continuar su render privado.
        resolve(user);
      } else {
        // Sin sesion: redirige a login conservando ruta original en next.
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
  // Se usa en login.html para impedir acceso si el usuario ya inicio sesion.
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        // Si ya esta autenticado, no tiene sentido mostrar login/registro.
        window.location.href = redirectTo;
        reject(new Error("Ya autenticado"));
      } else {
        // Usuario invitado: se permite render de la pantalla de acceso.
        resolve(null);
      }
    });
  });
}

// ----------------------------------------------------------
//  Escuchar cambios de estado de sesión (uso general)
// ----------------------------------------------------------
export function onSession(callback) {
  // Helper thin wrapper para desacoplar componentes del SDK directo.
  return onAuthStateChanged(auth, callback);
}
