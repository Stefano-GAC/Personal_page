# Documentación Técnica del Proyecto

## Página Web Personal -- Portfolio

------------------------------------------------------------------------

# 1. Descripción general del proyecto

Este proyecto consiste en una página web personal tipo **portfolio**
desarrollada utilizando tecnologías web estándar.

Tecnologías principales:

-   HTML5 para la estructura
-   CSS3 para los estilos
-   JavaScript (Vanilla) para la interactividad
-   Bootstrap 5 para el diseño responsive

El objetivo de la web es mostrar:

-   Información personal
-   Habilidades técnicas
-   Proyectos realizados
-   Información de contacto

La web es **completamente estática**, lo que significa que:

-   No utiliza backend
-   No utiliza base de datos
-   Todo el comportamiento ocurre en el navegador mediante JavaScript

------------------------------------------------------------------------

# 2. Estructura del proyecto

Estructura general del repositorio:

    Personal_page/
    │
    ├── index.html
    ├── style.css
    ├── script.js
    ├── README.md
    │
    └── Img/
        ├── fondo.jpg
        └── perfil.jpeg

Descripción:

  Archivo      Descripción
  ------------ -----------------------------------
  index.html   Estructura principal de la página
  style.css    Estilos personalizados
  script.js    Funcionalidad dinámica
  Img/         Carpeta con imágenes utilizadas

------------------------------------------------------------------------

# 3. Tecnologías utilizadas

## 3.1 HTML5

HTML se utiliza para definir:

-   estructura de la página
-   secciones
-   navegación
-   contenido

------------------------------------------------------------------------

## 3.2 CSS3

CSS se utiliza para:

-   estilos visuales
-   animaciones
-   efectos hover
-   personalización de Bootstrap

------------------------------------------------------------------------

## 3.3 JavaScript

JavaScript se utiliza para:

-   animaciones al hacer scroll
-   botón de volver arriba
-   efecto de texto escribiéndose

------------------------------------------------------------------------

## 3.4 Bootstrap 5

Bootstrap proporciona:

-   sistema de grid
-   componentes responsive
-   navbar adaptable
-   cards y layout

Se carga mediante CDN.

------------------------------------------------------------------------

## 3.5 Librerías externas

### Bootstrap

    https://cdn.jsdelivr.net/npm/bootstrap@5.3.2

### Font Awesome

Utilizado para iconos.

    https://cdnjs.cloudflare.com/ajax/libs/font-awesome

### Google Fonts

Fuente utilizada:

    Montserrat

### Animate.css

Utilizada para animaciones predefinidas.

------------------------------------------------------------------------

# 4. Estructura del HTML

Archivo principal:

    index.html

La página se divide en varias secciones.

------------------------------------------------------------------------

# 4.1 Head del documento

En el `<head>` se cargan:

-   meta tags
-   hojas de estilo
-   librerías externas

Ejemplo:

``` html
<link rel="stylesheet" href="style.css">
```

------------------------------------------------------------------------

# 4.2 Navbar

La barra de navegación utiliza Bootstrap.

Características:

-   fija en la parte superior
-   responsive
-   colapsa en móvil
-   contiene enlaces de navegación

Secciones enlazadas:

-   Sobre mí
-   Proyectos
-   Habilidades
-   Contacto

------------------------------------------------------------------------

# 4.3 Sección Hero

Primera sección visible de la página.

Contiene:

-   nombre
-   profesión
-   texto dinámico
-   fondo con gradiente animado

------------------------------------------------------------------------

# 4.4 Sección Sobre mí

Incluye:

-   descripción personal
-   texto centrado
-   animación de entrada

------------------------------------------------------------------------

# 4.5 Sección Proyectos

Se muestran proyectos mediante **cards de Bootstrap**.

Cada card contiene:

-   título
-   descripción
-   icono
-   animación hover

------------------------------------------------------------------------

# 4.6 Sección Habilidades

Muestra tecnologías y conocimientos.

Cada elemento utiliza la clase:

    .skill-item

------------------------------------------------------------------------

# 4.7 Sección Contacto

Incluye:

-   enlaces a redes sociales
-   iconos FontAwesome

------------------------------------------------------------------------

# 5. Sistema de estilos (style.css)

Archivo encargado de todo el diseño visual.

------------------------------------------------------------------------

# 5.1 Variables CSS

Definidas en `:root`.

``` css
:root {
  --primary-color: #1e40af;
  --secondary-color: #059669;
  --accent-color: #f59e0b;
}
```

------------------------------------------------------------------------

# 5.2 Animación del Navbar

Animación:

    slideDown

Utiliza `@keyframes` para hacer aparecer el navbar desde arriba.

------------------------------------------------------------------------

# 5.3 Hover en enlaces

Los enlaces del menú tienen una línea animada usando:

    ::after

------------------------------------------------------------------------

# 5.4 Animaciones en cards

Las cards usan:

    transform: translateY(-8px)

Esto crea efecto de elevación.

------------------------------------------------------------------------

# 5.5 Gradiente animado

El hero usa un fondo:

    linear-gradient

Con animación continua.

------------------------------------------------------------------------

# 5.6 Animaciones en botones

Los botones usan:

    .btn::before

Esto crea un efecto de brillo al pasar el cursor.

------------------------------------------------------------------------

# 6. Funcionalidades JavaScript

Archivo:

    script.js

Contiene tres funcionalidades principales.

------------------------------------------------------------------------

# 6.1 Animaciones al hacer scroll

Se utiliza:

    IntersectionObserver

Funcionamiento:

1.  Selecciona elementos con clase `.hidden`
2.  Detecta cuando aparecen en pantalla
3.  Añade la clase `.show`

------------------------------------------------------------------------

# 6.2 Botón Back to Top

Elemento:

    id="backToTop"

Funcionamiento:

-   aparece después de hacer scroll
-   al hacer click vuelve arriba con scroll suave

------------------------------------------------------------------------

# 6.3 Typing Effect

Simula escritura automática del texto:

    Desarrollador de aplicaciones web

Funcionamiento:

1.  escribe letra por letra
2.  espera
3.  borra texto
4.  repite ciclo

------------------------------------------------------------------------

# 7. Imágenes

Ubicación:

    Img/

Archivos:

-   fondo.jpg
-   perfil.jpeg

Uso:

  Imagen        Uso
  ------------- ----------------
  fondo.jpg     fondo visual
  perfil.jpeg   foto de perfil

------------------------------------------------------------------------

# 8. Responsividad

Gracias a Bootstrap:

-   container
-   row
-   col
-   col-md
-   col-lg

La web se adapta a:

-   móvil
-   tablet
-   escritorio

------------------------------------------------------------------------

# 9. Dependencias externas

CDNs utilizados:

-   Bootstrap
-   FontAwesome
-   Animate.css
-   Google Fonts

------------------------------------------------------------------------

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
