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
  if (!user?.uid) {
    throw new Error("Usuario inválido para upsertUserProfile");
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
