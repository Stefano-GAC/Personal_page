// ============================================================
//  PERFIL DE USUARIO EN CLOUD FIRESTORE
//  - users/{uid}: perfil base para trazabilidad y panel futuro
// ============================================================

import { db } from "./firebase-config.js";
import {
  doc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

export async function upsertUserProfile(user) {
  // Se usa en login: actualiza metadatos de actividad sin tocar createdAt.
  if (!user?.uid) {
    throw new Error("Usuario inválido para upsertUserProfile");
  }

  const userRef = doc(db, "users", user.uid);
  const baseData = {
    uid: user.uid,
    email: user.email || null,
    displayName: user.displayName || null,
    lastLoginAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(userRef, baseData, { merge: true });
}

export async function createUserProfile(user) {
  // Se usa en registro inicial: asegura createdAt en primera alta.
  if (!user?.uid) {
    throw new Error("Usuario inválido para createUserProfile");
  }

  const userRef = doc(db, "users", user.uid);
  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}
