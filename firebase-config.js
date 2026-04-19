// ============================================================
//  CONFIGURACIÓN DE FIREBASE
//  Reemplaza los valores con los de tu proyecto en Firebase Console:
//  https://console.firebase.google.com/ → Configuración del proyecto
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyDkJeMa19ZpjYh5OWMfee1v92oSdq_HyMQ",
  authDomain:        "bd-personalpage.firebaseapp.com",
  projectId:         "bd-personalpage",
  storageBucket:     "bd-personalpage.firebasestorage.app",
  messagingSenderId: "367658988704",
  appId:             "1:367658988704:web:5968f82a09d5b036ab85c5",
  measurementId:     "G-NM4PXBWTVE"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
