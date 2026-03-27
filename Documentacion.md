# Documentacion Tecnica - Personal Page

Esta documentacion describe en detalle el estado actual del portfolio para que cualquier programador pueda continuar el trabajo sin depender de contexto oral.

## 1. Objetivo del proyecto

Sitio web personal estatico orientado a mostrar perfil profesional y proyectos destacados.

Objetivos funcionales actuales:

1. Presentar informacion personal en formato claro y responsive.
2. Mostrar proyectos con una vista previa interactiva (flip + iframe lazy load).
3. Permitir cambio de idioma (ES/EN) en tiempo real.
4. Facilitar contacto externo (LinkedIn, GitHub, WhatsApp).

## 2. Stack tecnico

1. HTML5: estructura semantica de layout y contenido.
2. CSS3: estilos personalizados, animaciones y capas visuales.
3. JavaScript Vanilla: logica de traducciones, efectos y eventos.
4. Bootstrap 5 (CDN): layout base responsive y utilidades UI.
5. Font Awesome (CDN): iconografia.
6. Animate.css (CDN): animaciones puntuales en modal.
7. Google Fonts (CDN): tipografia Montserrat.

## 3. Estructura del repositorio

```text
Personal_page/
|- index.html
|- style.css
|- script.js
|- README.md
|- Documentacion.md
`- Img/
   |- perfil.jpeg
   `- fondo.jpg (presente en carpeta, actualmente no referenciado de forma directa en index)
```

Descripcion por archivo:

1. index.html: pagina principal con todas las secciones visibles.
2. style.css: capa visual completa (variables, animaciones, responsive).
3. script.js: comportamiento interactivo y traducciones.
4. Documentacion.md: manual tecnico de continuidad.
5. README.md: marcador simple (puede ampliarse en el futuro).

## 4. Flujo de ejecucion

1. El navegador carga index.html.
2. Se cargan estilos CDN + style.css.
3. Se renderiza estructura completa (navbar, hero, proyectos, footer, modal).
4. Se ejecuta script.js al final del body.
5. script.js aplica idioma inicial desde localStorage.
6. Se activa efecto typing segun idioma.
7. Se registran listeners para botones de idioma, cards y scroll.

No hay backend ni llamadas a API internas. Todo ocurre del lado del cliente.

## 5. Arquitectura de index.html

### 5.1 Head

Incluye:

1. Metadatos basicos (charset + viewport).
2. CDN de Bootstrap CSS.
3. CDN de Font Awesome.
4. Fuente Montserrat desde Google Fonts.
5. Animate.css.
6. Hoja local style.css.

### 5.2 Navbar

Responsabilidades:

1. Branding (SGAC + foto de perfil clickable).
2. Navegacion interna por anclas (#sobre-mi, #proyectos).
3. CTA externo a LinkedIn.
4. Selector de idioma ES/EN.

Notas de implementacion:

1. Navbar fija con fixed-top.
2. Modo colapsable en pantallas pequenas via bootstrap navbar-toggler.
3. Imagen de perfil abre modal usando data-bs-toggle y data-bs-target.

### 5.3 Hero

Contiene:

1. Foto de perfil (abre modal).
2. Nombre principal.
3. Texto dinamico typing con id typing.
4. Botones externos a GitHub y LinkedIn.

### 5.4 Seccion Sobre mi

1. Titulo traducible (id aboutTitle).
2. Parrafo traducible (id aboutText).
3. Decoracion visual con borde lateral.

### 5.5 Seccion Proyectos

Cada proyecto usa estructura flip:

1. Cara frontal:
   - Titulo + icono.
   - Badge de tecnologia.
   - Descripcion corta traducible.
   - Boton Preview.
2. Cara trasera:
   - Barra superior con dominio interno + botones.
   - Boton Volver (deshace flip).
   - Boton Ver completo (abre proyecto externo).
   - Iframe que se carga de forma lazy con data-src.

Proyectos actuales mapeados:

1. Pong Galactico.
2. Netflix Clone.
3. NeonDrive.
4. API Pokemon.

### 5.6 Botones flotantes y footer

1. Back to top (id backToTop): aparece al hacer scroll.
2. WhatsApp flotante (id whatsappFloat): enlace directo con etiqueta contextual.
3. Footer con texto traducible e iconos sociales.

### 5.7 Modal de perfil

1. Modal Bootstrap centrado.
2. Imagen ampliada con animaciones de entrada/glow.

## 6. Arquitectura de style.css

El archivo mezcla 4 capas importantes:

1. Sistema de tokens (variables CSS en :root).
2. Estilos de componentes (navbar, hero, flip-cards, modal, botones).
3. Animaciones (@keyframes y efectos hover).
4. Ajustes responsive (media query <= 576px).

### 6.1 Variables principales

1. --primary-color: azul de marca.
2. --secondary-color: verde secundario.
3. --accent-color: acento ambar.
4. Variables de fondo, texto y bordes para consistencia.

### 6.2 Componentes relevantes

1. .language-switch y .lang-btn: control visual del idioma activo.
2. .hero-gradient: fondo animado del hero.
3. .flip-card / .flip-card-inner / .flip-card-front / .flip-card-back: motor visual del flip.
4. .project-iframe: vista previa escalada (simulacion de mini navegador).
5. .whatsapp-float: CTA fija con animacion de pulso.
6. .profile-modal-img: glow animado en modal.

### 6.3 Animaciones definidas

1. slideDown: entrada del navbar.
2. fadeInUp: entrada del bloque hero.
3. gradientMove: desplazamiento del gradiente principal.
4. whatsappPulse: anillo animado del boton flotante.
5. pulse: latido de badges.
6. pulse-bg / glowPulse: fondo e imagen del modal.

## 7. Arquitectura de script.js

### 7.1 Internacionalizacion (i18n local)

Objeto central: translations con claves es y en.

Responsabilidades:

1. Definir textos de interfaz por idioma.
2. Actualizar contenido por id en DOM.
3. Actualizar etiquetas de botones dinamicos.
4. Persistir idioma seleccionado en localStorage (portfolioLanguage).

Funciones clave:

1. applyLanguage(lang): aplica traduccion completa.
2. restartTyping(newText): reinicia typing con el texto del idioma.

### 7.2 Typing effect

Flujo:

1. Escribe caracter por caracter en #typing.
2. Espera 1 segundo al completar.
3. Limpia y reinicia ciclo.

Control de estado:

1. typingTimer: setTimeout principal.
2. typingResetTimer: timeout de reinicio.
3. clearTypingTimers(): evita timers duplicados al cambiar idioma.

### 7.3 Flip cards de proyectos

Flujo al hacer click en Preview:

1. Agrega clase is-flipped a la card.
2. Detecta iframe dentro de la card.
3. Si iframe no fue cargado, asigna src desde data-src.
4. Al completar carga, agrega clase loaded para fade-in.

Flujo al hacer click en Volver:

1. Quita clase is-flipped.

### 7.4 Scroll behavior

1. IntersectionObserver para elementos .hidden (si existen).
2. Control de visibilidad del boton back to top al superar 200px.
3. Scroll suave al inicio cuando se pulsa back to top.

## 8. Convenciones y decisiones de implementacion

1. Se prioriza estructura semantica y ids descriptivos para traduccion.
2. Se usa Bootstrap para grid/base y CSS propio para identidad visual.
3. Se evita dependencia de frameworks JS para mantener simplicidad.
4. Se usa carga lazy de iframes para reducir carga inicial de red.

## 9. Como extender el proyecto

### 9.1 Agregar un nuevo proyecto al grid

Pasos:

1. Duplicar un bloque .col dentro de #proyectos.
2. Cambiar titulo, descripcion y enlaces.
3. Definir un nuevo id de descripcion (ej: projectDesc5).
4. Agregar texto projectDesc5 en translations.es y translations.en.
5. Incluir el id en el array textIds para que aplique traduccion.

### 9.2 Agregar nuevas traducciones

Pasos:

1. Crear nueva clave en translations (ej: fr).
2. Replicar todas las llaves requeridas.
3. Agregar boton de idioma en HTML.
4. Registrar listener en JS.

### 9.3 Agregar nueva seccion

Pasos:

1. Crear bloque semantico en index.html.
2. Estilizar en style.css usando variables existentes.
3. Si tiene texto traducible, asignar id y registrar en translations + textIds.

## 10. Riesgos tecnicos y puntos de mejora

1. Integridad CDN: los valores integrity estan con placeholder (sha384-***). Conviene usar hashes reales o quitar integrity para evitar falsos bloqueos.
2. Algunas llaves de traduccion de detalle tecnico (projectBackXa) existen en JS pero no tienen nodos con esos ids en HTML actual. No rompe el sitio, pero es deuda tecnica de mantenimiento.
3. README.md esta minimo; podria resumir setup y deploy en GitHub Pages.

## 11. Pruebas manuales recomendadas antes de entregar cambios

1. Cargar la pagina y validar que no haya errores en consola.
2. Cambiar idioma ES/EN y confirmar persistencia tras recargar.
3. Abrir cada preview de proyecto y comprobar carga del iframe.
4. Verificar comportamiento en movil (navbar, botones flotantes, cards).
5. Verificar modal de perfil y cierre correcto.

## 12. Comandos de trabajo sugeridos

No hay build step obligatorio. Flujo tipico:

1. Abrir index.html con Live Server (VS Code) o navegador.
2. Editar HTML/CSS/JS directamente.
3. Probar en navegador desktop y mobile.

## 13. Estado actual de continuidad

El proyecto es estable para continuar evolucionando UI, contenido y secciones. La arquitectura es simple, legible y apta para onboarding rapido de otro desarrollador.

# 10. Posibles mejoras futuras

Mejoras posibles:

-   formulario de contacto funcional
-   backend
-   base de datos
-   dark mode
-   SEO
-   lazy loading
-   animaciones avanzadas
-   despliegue en hosting

------------------------------------------------------------------------

# 11. Cómo ejecutar el proyecto

No requiere instalación.

Pasos:

1.  Descargar el repositorio
2.  Abrir:

```{=html}
<!-- -->
```
    index.html

en cualquier navegador.

Opcional:

Usar servidor local como:

    Live Server (VSCode)
