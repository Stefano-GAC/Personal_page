// ============================================================
//  CONFIGURACIÓN DE FIREBASE
//  Reemplaza los valores con los de tu proyecto en Firebase Console:
//  https://console.firebase.google.com/ → Configuración del proyecto
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROYECTO.firebaseapp.com",
  projectId:         "TU_PROYECTO",
  storageBucket:     "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId:             "TU_APP_ID"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
