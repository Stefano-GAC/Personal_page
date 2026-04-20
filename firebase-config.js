// ============================================================
//  CONFIGURACIÓN DE FIREBASE
//  Reemplaza los valores con los de tu proyecto en Firebase Console:
//  https://console.firebase.google.com/ → Configuración del proyecto
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Objeto oficial de configuracion de la app web registrado en Firebase Console.
// Estas claves identifican el proyecto, no son una "contrasena" de base de datos.
const firebaseConfig = {
  // API key publica del cliente web.
  apiKey:            "AIzaSyDkJeMa19ZpjYh5OWMfee1v92oSdq_HyMQ",
  // Dominio usado por Firebase Auth para flujos de login web.
  authDomain:        "bd-personalpage.firebaseapp.com",
  // ID unico del proyecto en Google Cloud/Firebase.
  projectId:         "bd-personalpage",
  // Bucket por defecto para archivos en Firebase Storage.
  storageBucket:     "bd-personalpage.firebasestorage.app",
  // ID del emisor de mensajes (FCM).
  messagingSenderId: "367658988704",
  // Identificador unico de esta app web dentro del proyecto.
  appId:             "1:367658988704:web:5968f82a09d5b036ab85c5",
  // ID de medicion para Analytics (opcional en esta implementacion).
  measurementId:     "G-NM4PXBWTVE"
};

// Instancia raiz de Firebase App. Todos los servicios se cuelgan de aqui.
const app  = initializeApp(firebaseConfig);
// Servicio de autenticacion (email/password, estado de sesion, etc).
const auth = getAuth(app);
// Servicio de Firestore para lecturas/escrituras de documentos.
const db   = getFirestore(app);

// Exportes centralizados para reutilizar misma instancia en todo el proyecto.
export { auth, db };
