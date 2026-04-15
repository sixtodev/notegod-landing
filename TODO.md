# NoteGod Landing - Pendientes

## Rendimiento

- [ ] **Convertir fonts a WOFF2** — Los 4 archivos Morganite (TTF ~385KB total) se reducen ~40% en WOFF2. Usar herramienta como `fonttools` o `google-webfonts-helper`
- [ ] **Optimizar notegod.png** — Actualmente 116KB (427x399) pero se usa a 28x28. Opciones: convertir a SVG, o crear versiones WebP en tamanios reales (28x28, 36x36)
- [ ] **Usar componente `<Image>` de Astro** — Reemplazar `<img src="/notegod.png">` por el componente optimizado de Astro en Navbar, Footer, LoginForm, RegisterForm
- [ ] **Precargar las 4 variantes de font** — Solo se precargan Bold y Black, faltan Medium y SemiBold

## Codigo / Mantenibilidad

- [ ] **Migrar inline styles a CSS variables en React** — PricingSection.tsx, FAQ.tsx, LoginForm.tsx y RegisterForm.tsx tienen 150+ colores hardcodeados (#f3f0eb, #edff00, etc). Migrar a `var(--color-noter-*)` para consistencia con los componentes Astro
- [ ] **Accesibilidad en forms** — LoginForm y RegisterForm no tienen `<label>` asociados a inputs ni `aria-describedby` para errores
- [ ] **aria-expanded en menu mobile** — El boton hamburguesa en Navbar necesita `aria-expanded` dinamico
- [ ] **Remover `@astrojs/tailwind` de node_modules** — Ya se quito de package.json pero ejecutar `npm prune` o reinstalar deps

## SEO - LATAM / Norteamerica

- [ ] **Crear paginas en espanol (`/es/`)** — Sin contenido en espanol no se puede rankear para "app de notas", "notas seguras", "aplicacion de notas encriptadas"
- [ ] **Configurar i18n en Astro** — Usar el sistema de i18n de Astro para manejar rutas `/en/` y `/es/` con contenido traducido
- [ ] **Actualizar hreflang** — Cuando existan las paginas en espanol, agregar `hreflang="es"` apuntando a `/es/`
- [ ] **Landing para estudiantes (`/students`)** — Ya se menciona el descuento $1.99/mo .edu pero no hay pagina dedicada. Oportunidad de SEO para "best note app for students"
- [ ] **Google Search Console** — Crear propiedad, enviar sitemap (`https://notegod.app/sitemap-index.xml`), monitorear indexacion
- [ ] **Blog / Contenido** — Long-tail keywords representan ~60% del trafico organico. Ideas:
  - "Best note taking app for college students 2026"
  - "Notion vs NoteGod comparison"
  - "How to organize study notes effectively"
  - "App de notas para la universidad"
  - "Mejores apps de notas con encriptacion"
- [ ] **Analytics** — Integrar Plausible, Vercel Analytics, o similar para medir trafico y conversiones

## Ya implementado

- [x] Corregido responsive y alineacion (CSS cascade layers issue con `*` reset)
- [x] Iconos de UseCases renderizandose correctamente (`set:html`)
- [x] Animaciones smooth (cubic-bezier easeOutExpo)
- [x] Spacing consistente entre secciones
- [x] `stagger-children` cubre todos los children (no solo 8)
- [x] `site` configurado en astro.config.mjs
- [x] `@astrojs/sitemap` integrado (sitemap-index.xml auto-generado)
- [x] `robots.txt` creado
- [x] JSON-LD schemas: Organization, SoftwareApplication, FAQPage
- [x] hreflang corregido (sin `es` falso)
- [x] og:image con URL absoluta
- [x] Canonical URL dinamica por pagina
- [x] `@astrojs/tailwind` v6 removido (conflicto con v4)
- [x] `@types/react` y `@types/react-dom` instalados
- [x] `overflow-x: hidden` en body
