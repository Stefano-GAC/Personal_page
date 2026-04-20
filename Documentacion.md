# Documentacion Tecnica - Personal Page

Este documento describe el estado real del proyecto despues de integrar autenticacion con Firebase y trazabilidad en Firestore.

## 1. Objetivo funcional actual

El sitio ya no es solo un portfolio estatico.
Ahora incluye:

1. Acceso con inicio de sesion y registro (Firebase Authentication).
2. Proteccion de rutas privadas (`index.html` y `brief.html`).
3. Persistencia de datos de usuario y eventos en Firestore.
4. Seguimiento de actividad para analitica basica (visitas, generacion de brief, envio por WhatsApp).

## 2. Stack tecnico actualizado

1. HTML5 + CSS3 + JavaScript Vanilla.
2. Bootstrap 5, Font Awesome, Animate.css, Google Fonts (CDN).
3. Firebase Web SDK 10.11.0 (modulos ES por CDN):
   - `firebase-app`
   - `firebase-auth`
   - `firebase-firestore`
4. Firestore como base de datos NoSQL para eventos y perfiles.
5. Hosting actual: GitHub Pages (frontend estatico).

## 3. Estructura actual del repositorio

```text
Personal_page/
|- index.html
|- brief.html
|- login.html
|- style.css
|- login.css
|- script.js
|- brief.js
|- firebase-config.js
|- auth.js
|- firestore-users.js
|- firestore-logs.js
|- Documentacion.md
|- README.md
`- Img/
```

## 4. Descripcion detallada por archivo

### 4.1 `firebase-config.js`

Responsabilidad:

1. Inicializar Firebase App.
2. Inicializar Authentication.
3. Inicializar Firestore.
4. Exportar instancias compartidas (`auth`, `db`).

Detalle interno:

1. `firebaseConfig` contiene llaves del proyecto web.
2. `initializeApp(firebaseConfig)` crea la app base.
3. `getAuth(app)` expone el servicio de login.
4. `getFirestore(app)` expone la base de datos.

### 4.2 `auth.js`

Responsabilidad:

1. Centralizar todo el flujo de sesion.
2. Exponer funciones reutilizables para login/registro/logout.
3. Resolver guardias de ruta en paginas protegidas y en login.

Funciones:

1. `login(email, password)`:
   - autentica con `signInWithEmailAndPassword`.
   - actualiza perfil en Firestore (`upsertUserProfile`).
2. `register(email, password, displayName)`:
   - crea cuenta con `createUserWithEmailAndPassword`.
   - actualiza nombre publico con `updateProfile`.
   - crea documento inicial en Firestore (`createUserProfile`).
3. `logout()`:
   - cierra sesion y redirige a `login.html`.
4. `requireAuth(redirectTo)`:
   - permite continuar solo si hay usuario autenticado.
   - si no hay sesion, redirige a login con parametro `next`.
5. `requireGuest(redirectTo)`:
   - permite acceso solo si NO hay sesion.
   - si ya hay sesion, redirige a la ruta objetivo.
6. `onSession(callback)`:
   - listener de cambios de autenticacion.

Implementacion relevante:

1. `buildLoginRedirectUrl()` agrega `next` para volver a la pagina original tras login.
2. Todas las guardias dependen de `onAuthStateChanged`.

### 4.3 `firestore-users.js`

Responsabilidad:

1. Escribir perfil de usuario en coleccion `users`.
2. Separar alta inicial de actualizacion por login.

Funciones:

1. `createUserProfile(user)`:
   - crea/mergea documento `users/{uid}`.
   - incluye `createdAt`, `updatedAt`, `lastLoginAt`.
2. `upsertUserProfile(user)`:
   - actualiza `lastLoginAt` y `updatedAt` sin forzar `createdAt`.

Campos persistidos:

1. `uid`
2. `email`
3. `displayName`
4. `createdAt`
5. `updatedAt`
6. `lastLoginAt`

### 4.4 `firestore-logs.js`

Responsabilidad:

1. Guardar trazas de comportamiento del usuario.

Funciones:

1. `logVisit({ user, page, source })`:
   - coleccion: `visits`.
   - guarda usuario + pagina + agente de navegador + fecha.
2. `logOutboundMessage({ user, page, channel, contentLength })`:
   - coleccion: `outbound_messages`.
   - registra envios externos (actualmente WhatsApp).
3. `logBriefAction({ user, action, summaryLength, page })`:
   - coleccion: `brief_events`.
   - registra acciones del brief (ej: `generate_summary`).

### 4.5 `login.html`

Responsabilidad:

1. Pantalla de autenticacion (login + registro en tabs).
2. Guardar feedback de errores Firebase al usuario.
3. Respetar redirect `next` para volver a la pagina solicitada.

Flujo:

1. La pagina inicia oculta (`visibility:hidden`).
2. `requireGuest(nextUrl)` decide si mostrar login o redirigir.
3. Formulario login:
   - valida campos.
   - llama `login()`.
   - redirige a `nextUrl`.
4. Formulario registro:
   - valida email/password/confirmacion.
   - llama `register()`.
   - redirige a `nextUrl`.

UX incluida:

1. Toggle mostrar/ocultar contrasena.
2. Spinners de carga en botones.
3. Mensajes de error mapeados por `err.code`.

### 4.6 `index.html`

Responsabilidad:

1. Pagina principal privada.
2. Cargar logica visual solo cuando auth esta validada.

Flujo de guardia:

1. Body inicia oculto.
2. `requireAuth()`:
   - si no hay sesion, redirige a `login.html?next=...`.
   - si hay sesion:
     - registra visita (`logVisit` con `page: "index"`).
     - muestra body.
     - carga dinamicamente `script.js`.

Boton salir:

1. `#logoutBtn` llama `logout()`.

### 4.7 `brief.html`

Responsabilidad:

1. Pagina privada del asistente de brief.
2. Registrar uso funcional (visita, generar resumen, enviar WhatsApp).

Flujo de guardia:

1. Body inicia oculto.
2. `requireAuth()` valida sesion.
3. Si sesion valida:
   - `logVisit({ page: "brief" })`.
   - registra click de `#generateBrief` en `brief_events`.
   - registra click de `#sendBriefWhatsapp` en `outbound_messages`.
   - carga dinamicamente `brief.js`.

### 4.8 `script.js`

Responsabilidad:

1. Logica completa de UI de `index.html`.

Bloques funcionales:

1. `translations`: i18n ES/EN para textos visibles.
2. Typing effect del hero (`runTypingEffect`, `restartTyping`).
3. Cambio de idioma (`applyLanguage`).
4. Flip cards de proyectos y lazy load de iframes.
5. Mini chat de respuestas predefinidas.
6. Asistente de brief embebido (cuando existe en el DOM).
7. Scroll behavior, cursor glow y parallax.
8. Inicializacion final de todos los modulos UI.

### 4.9 `brief.js`

Responsabilidad:

1. Logica especifica de la pagina brief.

Bloques funcionales:

1. Traducciones locales (`briefTranslations`).
2. Relleno dinamico de `select` segun idioma.
3. Generacion de resumen (`generateSummary`).
4. Construccion de enlace WhatsApp con texto codificado.
5. Toast local de confirmacion.
6. Recalculo automatico del resumen en cambios de formulario.

### 4.10 `style.css` y `login.css`

`style.css`:

1. Sistema visual de `index.html` y componentes generales.
2. Variables, animaciones, flip-cards, navbar, hero, botones flotantes.

`login.css`:

1. Estilo de `login.html`.
2. Tarjeta de acceso, tabs login/registro, inputs, botones y estado responsive.

## 5. Modelo de datos actual en Firestore

### 5.1 Coleccion `users`

Documento: `users/{uid}`

Campos:

1. `uid: string`
2. `email: string | null`
3. `displayName: string | null`
4. `createdAt: timestamp`
5. `updatedAt: timestamp`
6. `lastLoginAt: timestamp`

### 5.2 Coleccion `visits`

Campos:

1. `uid`
2. `email`
3. `displayName`
4. `page`
5. `source`
6. `userAgent`
7. `createdAt`

### 5.3 Coleccion `brief_events`

Campos:

1. `uid`
2. `email`
3. `displayName`
4. `page`
5. `action` (actual: `generate_summary`)
6. `summaryLength`
7. `createdAt`

### 5.4 Coleccion `outbound_messages`

Campos:

1. `uid`
2. `email`
3. `displayName`
4. `page`
5. `channel` (actual: `whatsapp`)
6. `contentLength`
7. `createdAt`

## 6. Flujo completo de sesion y tracking

1. Usuario entra a `index.html` o `brief.html`.
2. Guardia `requireAuth` valida sesion Firebase.
3. Sin sesion: redirect a `login.html?next=...`.
4. Con sesion: se registra visita y se renderiza pagina privada.
5. En `brief.html`, ademas se registran eventos de generacion y envio.
6. En login/registro exitoso, se actualiza perfil en `users`.

## 7. Checklist operativo para mantenimiento

1. Verificar que `firebase-config.js` tenga valores vigentes del proyecto.
2. Revisar en Authentication que Email/Password este habilitado.
3. Confirmar dominio de GitHub Pages en `Authorized domains`.
4. Validar que Firestore este creando documentos en:
   - `users`
   - `visits`
   - `brief_events`
   - `outbound_messages`

## 8. Riesgos y recomendaciones

1. Actualmente las reglas de Firestore deben mantenerse seguras (escritura solo autenticados).
2. La `apiKey` web no es secreta por diseño, pero reglas y dominios autorizados si son criticos.
3. Si el proyecto migra a SQL gestionado, se requiere backend intermedio (no conectar SQL directo desde GitHub Pages).

## 9. Estado final

El proyecto ya cumple con:

1. Inicio de sesion/registro conectado a Firebase.
2. Persistencia de perfil de usuario.
3. Registro de visitas y acciones clave del usuario.
4. Documentacion tecnica de continuidad para otro desarrollador.
