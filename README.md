# Agromonte · Landing page

Landing page en React (Vite) para Agromonte: agricultura regenerativa, ecológica
y tecnológica. Incluye vídeo de introducción a pantalla completa, animaciones
de scroll (GSAP ScrollTrigger) con las secuencias de imágenes de granada,
mandarina y oliva, y un formulario de contacto sin backend propio (Formspree).

## Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción localmente
```

## Formulario de contacto (Formspree)

El formulario de `#contacto` no usa servidor propio: envía los datos por AJAX
a [Formspree](https://formspree.io), que tiene un plan gratuito (50 envíos al
mes) y reenvía cada mensaje a tu email.

1. Crea una cuenta gratuita en https://formspree.io y un formulario nuevo.
2. Copia el ID del formulario (la parte final de la URL del endpoint:
   `https://formspree.io/f/XXXXXXX` → el ID es `XXXXXXX`).
3. Copia `.env.example` como `.env` y rellena:
   ```
   VITE_FORMSPREE_ID=XXXXXXX
   ```
4. Reinicia `npm run dev` (o vuelve a hacer `npm run build`) para que la
   variable de entorno se aplique.

Hasta que no se configure `VITE_FORMSPREE_ID`, el formulario mostrará un
mensaje de error al enviarse (comportamiento esperado, para no perder
mensajes silenciosamente).

## Estructura de contenido

- `public/video/intro.mp4` — vídeo de introducción (granada → mandarina →
  oliva → texto "AGROMONTE") que se reproduce a pantalla completa al cargar.
- `public/img/granada`, `public/img/mandarina`, `public/img/oliva` —
  secuencias de 107 fotogramas (`frame_000000.webp` … `frame_000106.webp`)
  que se dibujan en un `<canvas>` y se recorren con el scroll gracias a
  `src/hooks/useFrameSequence.js`.
- `public/img/fotos` — fotografías de la finca usadas en las distintas
  secciones.

## Despliegue

El proyecto es 100% estático tras `npm run build` (carpeta `dist/`), por lo
que se puede desplegar directamente en Netlify, Vercel, GitHub Pages o
cualquier hosting estático. No requiere servidor ni base de datos.
