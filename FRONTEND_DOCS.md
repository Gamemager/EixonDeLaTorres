# 📘 Documentación Frontend — Eixon De la Torres Portfolio

> **Stack:** Angular 20+ SSR · Angular Material · Bootstrap · TypeScript  
> **Tema visual:** Tech-Noir — `Syne` + `JetBrains Mono` · Acento `#00ffc8`  
> **Autor:** Eixon De la Torres · Barranquilla, Colombia

---

## Tabla de contenidos

1. [Estructura del proyecto](#1-estructura-del-proyecto)
2. [Configuración inicial](#2-configuración-inicial)
3. [Sistema de diseño](#3-sistema-de-diseño)
4. [Componentes compartidos](#4-componentes-compartidos)
5. [Módulo Home](#5-módulo-home)
6. [Módulo Sobre mí](#6-módulo-sobre-mí)
7. [Módulo Proyectos](#7-módulo-proyectos)
8. [Módulo Recursos](#8-módulo-recursos)
9. [Módulo ELITE](#9-módulo-elite)
10. [SSR — Server-Side Rendering](#10-ssr--server-side-rendering)
11. [Cursor personalizado](#11-cursor-personalizado)
12. [Rutas](#12-rutas)
13. [Conexión con el Backend](#13-conexión-con-el-backend)
14. [Variables de entorno](#14-variables-de-entorno)
15. [Scripts disponibles](#15-scripts-disponibles)
16. [Problemas conocidos y soluciones](#16-problemas-conocidos-y-soluciones)

---

## 1. Estructura del proyecto

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.ts                        # AppComponent — shell raíz + cursor
│   │   ├── app.html                      # Template raíz
│   │   ├── app.css                       # Estilos del shell
│   │   ├── app.config.ts                 # Providers del cliente (router, http, hydration)
│   │   ├── app.config.server.ts          # Providers del servidor (SSR)
│   │   ├── app.routes.ts                 # Rutas lazy-loaded
│   │   │
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── elicitation.model.ts  # Interfaces y enums del formulario ELITE
│   │   │   └── services/
│   │   │       └── elicitation.service.ts # HttpClient → API /elicitation
│   │   │
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── navbar/
│   │   │       │   └── navbar.component.ts  # Navbar fija con scroll effect
│   │   │       └── footer/
│   │   │           └── footer.component.ts  # Footer del sitio
│   │   │
│   │   └── features/
│   │       ├── home/
│   │       │   └── home.component.ts     # Hero + terminal typewriter + stack badges
│   │       ├── about/
│   │       │   └── about.component.ts    # Bio + skills + timeline de experiencia
│   │       ├── projects/
│   │       │   └── projects.component.ts # Grid de proyectos con hover accent
│   │       ├── resources/
│   │       │   └── resources.component.ts # CV + LinkedIn + GitHub + status bar
│   │       └── elite/
│   │           └── elite.component.ts    # Formulario ELITE 6 pasos + preview
│   │
│   ├── environments/
│   │   ├── environment.ts                # apiUrl desarrollo
│   │   └── environment.production.ts    # apiUrl producción
│   │
│   ├── main.ts                           # Bootstrap cliente
│   ├── main.server.ts                    # Bootstrap SSR
│   ├── styles.css                        # Estilos globales + variables CSS
│   └── material-theme.scss              # Tema oscuro Angular Material
│
├── server.ts                             # Express SSR server (generado por Angular CLI)
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
└── package.json
```

---

## 2. Configuración inicial

### Requisitos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js | 18.x |
| npm | 9.x |
| Angular CLI | 20.x |

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd eixon-web/frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
ng serve

# Build de producción con SSR
ng build
```

### Angular Material

Angular Material se instala con:

```bash
ng add @angular/material
# Seleccionar: Custom theme → Yes typography → Yes animations
```

El archivo `material-theme.scss` generado fue **reemplazado** por una versión personalizada con tema oscuro (ver sección [Sistema de diseño](#3-sistema-de-diseño)).

### `angular.json` — orden de estilos

```json
"styles": [
  "src/material-theme.scss",
  "src/styles.css"
]
```

> ⚠️ El orden importa. `material-theme.scss` debe ir primero para que los overrides de `styles.css` tengan precedencia.

---

## 3. Sistema de diseño

### Paleta de colores

| Variable CSS | Valor | Uso |
|---|---|---|
| `--bg` | `#0a0a0f` | Fondo principal |
| `--bg2` | `#111118` | Fondo secundario (panels, cards) |
| `--bg3` | `#16161f` | Fondo terciario (inputs, actor cards) |
| `--text` | `#e8e8e8` | Texto principal |
| `--text-muted` | `#888899` | Texto secundario |
| `--accent` | `#00ffc8` | Color de acento (cian eléctrico) |
| `--accent-dim` | `rgba(0,255,200,0.08)` | Fondos con acento sutil |
| `--accent-border` | `rgba(0,255,200,0.25)` | Bordes con acento |
| `--red` | `#ff3c5f` | Alertas y errores |
| `--border` | `rgba(255,255,255,0.07)` | Bordes generales |

### Tipografía

```css
--font-display: 'Syne', sans-serif;      /* Títulos: 800 weight, letter-spacing -0.04em */
--font-mono:    'JetBrains Mono', monospace;  /* Cuerpo, labels, código */
```

Cargadas desde Google Fonts en `styles.css`.

### Variables de layout

```css
--nav-height: 65px;   /* Altura fija de la navbar */
--transition: all 0.2s ease;
```

### Clases utilitarias globales (`styles.css`)

| Clase | Descripción |
|---|---|
| `.section-label` | Etiqueta superior de sección con línea decorativa de acento |
| `.section-heading` | Título grande de sección con `em` en color acento |
| `.btn-primary` | Botón fondo acento, texto oscuro |
| `.btn-secondary` | Botón outline, borde sutil |
| `.badge` | Etiqueta pequeña monospace |
| `.badge.accent` | Badge con borde y fondo de acento |
| `.container` | `max-width: 1200px`, centrado con padding horizontal |
| `.animate-fadeUp` | Animación entrada desde abajo |
| `.animate-delay-{1-4}` | Delays escalonados para animaciones |

### Overrides de Angular Material (`styles.css` + `material-theme.scss`)

Todos los componentes de Material fueron sobreescritos para mantener la paleta oscura:

- **Stepper:** fondo transparente, iconos con borde sutil, activo en `--accent`
- **Form fields:** fondo `--bg3`, label flotante en `--accent` al enfocar
- **Select panel:** fondo `--bg3`, opciones en monospace
- **Snackbar:** clases `.snack-success` y `.snack-error` con colores semánticos

---

## 4. Componentes compartidos

### `NavbarComponent`

**Ruta:** `src/app/shared/components/navbar/navbar.component.ts`

Componente standalone con template y estilos inline.

**Funcionalidades:**
- Fija en la parte superior con `position: fixed`
- Efecto `backdrop-filter: blur(16px)` + borde inferior al hacer scroll (`@HostListener('window:scroll')`)
- Links con underline animado via `::after` + `transform: scaleX()`
- `RouterLinkActive` para estado activo automático
- Menú hamburger para mobile (breakpoint 768px)
- Botón CTA "Iniciar proyecto" → `/elite`

**Señales utilizadas:**
```typescript
scrolled = signal(false);
menuOpen = signal(false);
```

---

### `FooterComponent`

**Ruta:** `src/app/shared/components/footer/footer.component.ts`

Componente standalone con template y estilos inline.

Muestra: logo EDT · copyright con año dinámico · links a GitHub, LinkedIn y ELITE.

---

## 5. Módulo Home

**Ruta:** `src/app/features/home/home.component.ts`

Layout de dos columnas (`grid-template-columns: 1fr 1fr`):

### Columna izquierda

- Badge de disponibilidad con punto animado (pulse CSS)
- Título hero con tipografía `Syne 800`
- Descripción en `JetBrains Mono`
- Botones CTA: "Ver proyectos" y "Descargar CV"
- Estadísticas (proyectos, tecnologías, compromiso)

### Columna derecha — Terminal

- Fondo con cuadrícula decorativa (`background-image` con `linear-gradient`)
- Terminal simulado con efecto **typewriter** — líneas que aparecen progresivamente cada 110ms
- Implementación SSR-safe:

```typescript
constructor(@Inject(PLATFORM_ID) platformId: object) {
  this.isBrowser = isPlatformBrowser(platformId);
}

ngOnInit(): void {
  if (this.isBrowser) {
    // Inicia el typewriter solo en el navegador
    this.startTyping();
  } else {
    // En SSR muestra todas las líneas directamente
    this.displayedLines = this.codeLines;
  }
}
```

- Stack badges con clase `.accent` en los primeros 4

---

## 6. Módulo Sobre mí

**Ruta:** `src/app/features/about/about.component.ts`

### Secciones

| Sección | Contenido |
|---|---|
| Bio | Dos párrafos descriptivos + ubicación |
| Habilidades | Grid 2 columnas con 10 tecnologías, hover con borde acento |
| Experiencia | Timeline vertical con `border-left` sutil |
| CTA | Botones "Trabajar conmigo" (→ `/elite`) y "Ver CV" (→ `/recursos`) |

### Datos en el componente (estáticos, listos para conectar a API)

```typescript
readonly skills: string[] = [ 'Angular + SSR', 'Node.js + Express', ... ];
readonly experiences: Experience[] = [
  { period, role, company, desc, current }
];
```

---

## 7. Módulo Proyectos

**Ruta:** `src/app/features/projects/projects.component.ts`

Grid de 3 columnas (`grid-template-columns: repeat(3, 1fr)`) con separadores de 1px.

### Estructura de cada tarjeta

```typescript
interface Project {
  num:      string;   // '001', '002'...
  title:    string;
  desc:     string;
  tags:     string[];
  repo?:    string;
  live?:    string;
  featured: boolean;  // Aplica borde izquierdo en acento
}
```

**Efecto hover:** línea superior (`::before`) que hace `scaleX(0 → 1)` con `transform-origin: left`.

**Responsive:** 3 cols → 2 cols (900px) → 1 col (600px).

---

## 8. Módulo Recursos

**Ruta:** `src/app/features/resources/resources.component.ts`

### Cards de recursos

```typescript
interface Resource {
  icon:     string;   // Carácter visible: '↓', 'in', '</>'
  title:    string;
  desc:     string;
  cta:      string;
  href:     string;
  external: boolean;  // Agrega target="_blank" y rel="noopener"
  primary:  boolean;  // true → btn-primary, false → btn-secondary
}
```

**Status bar** al pie: indicador de disponibilidad con punto pulsante + zona horaria.

---

## 9. Módulo ELITE

**Ruta:** `src/app/features/elite/elite.component.ts`

Formulario de Elicitación Inteligente de Requisitos de Software. 6 pasos con Angular Material Stepper vertical + panel de vista previa en tiempo real.

### Pasos del formulario

| # | Nombre | FormGroup | Campos principales |
|---|---|---|---|
| 01 | Contexto | `ctxForm` | `project_name`, `stakeholder_name`, `stakeholder_email`, `elicitation_date` |
| 02 | Estratégico | `strForm` | `business_objective`, `problem_to_solve`, `project_scope`, `out_of_scope` |
| 03 | Actores | `actForm` | FormArray de actores: `actor_type`, `actor_name`, `permissions` |
| 04 | Funcional | `funcForm` | `user_story`, `business_rules`, `preconditions`, `postconditions` |
| 05 | Calidad RNF | `rnfForm` | `rnf_performance`, `rnf_security`, `rnf_usability` |
| 06 | Priorización | `priForm` | `moscow_priority` (MoSCoW), `dependencies` |

### Selector MoSCoW visual

```typescript
readonly moscowOptions = [
  { value: 'must_have',   label: 'Must',   tag: 'Obligatorio', desc: 'No negociable' },
  { value: 'should_have', label: 'Should', tag: 'Importante',  desc: 'Alta prioridad' },
  { value: 'could_have',  label: 'Could',  tag: 'Deseable',    desc: 'Si hay tiempo' },
  { value: 'wont_have',   label: "Won't",  tag: 'Excluido',    desc: 'Próxima fase' },
];
```

### Panel de vista previa

Sincronizado con los `FormGroup` en tiempo real. Muestra valores truncados con `-webkit-line-clamp: 2` para textos largos. Usa `*ngIf` para mostrarse solo cuando hay datos.

### Gestión dinámica de actores

```typescript
get actors(): FormArray { return this.actForm.get('actors') as FormArray; }

addActor():             void { this.actors.push(this.newActor()); }
removeActor(i: number): void { this.actors.removeAt(i); }
```

### Payload de envío

```typescript
const payload = {
  context:   this.ctxForm.value,
  strategic: this.strForm.value,
  actors:    this.actForm.value.actors,
  functional: this.funcForm.value,
  quality:   this.rnfForm.value,
  priority:  this.priForm.value,
};
```

### Conectar al backend (pendiente)

En el método `submit()`, reemplazar el `setTimeout` de prueba con:

```typescript
// TODO: descomentar cuando el backend esté listo
this.elicitationService.submit(payload).subscribe({
  next: (res) => { /* mostrar confirmación */ },
  error: (err) => { /* mostrar error */ },
});
```

### Imports de Angular Material requeridos

```typescript
MatStepperModule, MatFormFieldModule, MatInputModule,
MatButtonModule, MatSelectModule, MatSnackBarModule, MatIconModule
```

---

## 10. SSR — Server-Side Rendering

Angular 20+ incluye SSR nativo. Se configura con `ng new --ssr` o `ng add @angular/ssr`.

### Archivos generados

| Archivo | Propósito |
|---|---|
| `server.ts` | Express que sirve el bundle SSR |
| `main.server.ts` | Bootstrap del lado servidor |
| `app.config.server.ts` | Merge de providers servidor + cliente |

### `app.config.ts` — configuración crítica

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),  // ← obligatorio para SSR
    provideClientHydration(),        // ← hidratación DOM servidor→cliente
  ],
};
```

> `withFetch()` es requerido porque en SSR no existe `XMLHttpRequest`. Sin él, los `HttpClient` calls fallan en el servidor.

### Patrón SSR-safe para código del navegador

```typescript
constructor(@Inject(PLATFORM_ID) platformId: object) {
  this.isBrowser = isPlatformBrowser(platformId);
}

ngOnInit(): void {
  if (!this.isBrowser) return;  // ← nunca ejecutar DOM APIs en servidor
  // código del navegador aquí
}
```

---

## 11. Cursor personalizado

**Implementado en:** `AppComponent` (`src/app/app.ts`)

### Funcionamiento

El cursor personalizado se crea con JavaScript puro en `ngAfterViewInit`, **después** de que la hidratación SSR finaliza. Usa `setTimeout(() => ..., 0)` para esperar al siguiente tick del event loop.

```typescript
ngAfterViewInit(): void {
  if (!this.isBrowser) return;
  setTimeout(() => this.initCursor(), 0);
}
```

### Elementos creados

Dos `<div>` añadidos directamente al `<body>` (fuera del árbol de Angular):

| ID | Descripción |
|---|---|
| `eixon-dot` | Punto cian de 10px, `mix-blend-mode: difference` |
| `eixon-ring` | Anillo de 32px, border cian, opacidad 0.55 |

### Movimiento

Usa `requestAnimationFrame` para suavidad máxima:

```typescript
this.moveHandler = (e: MouseEvent) => {
  cancelAnimationFrame(this.rafId);
  this.rafId = requestAnimationFrame(() => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
};
```

### Efecto hover

Usa **delegación de eventos** en `document` para funcionar con elementos cargados dinámicamente (lazy components):

```typescript
document.addEventListener('mouseover', (e) => {
  if ((e.target as HTMLElement).closest('a, button, [role="button"]')) {
    dot.style.transform  = 'translate(-50%,-50%) scale(2.2)';
    ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
  }
});
```

### CSS requerido en `styles.css`

```css
html, body, * {
  cursor: none !important;
}
```

---

## 12. Rutas

**Archivo:** `src/app/app.routes.ts`

Todas las rutas usan **lazy loading** con `loadComponent`:

```typescript
export const routes: Routes = [
  { path: '',         loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'sobre-mi', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'proyectos',loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'recursos', loadComponent: () => import('./features/resources/resources.component').then(m => m.ResourcesComponent) },
  { path: 'elite',    loadComponent: () => import('./features/elite/elite.component').then(m => m.EliteComponent) },
  { path: '**',       redirectTo: '' },
];
```

Cada ruta tiene `title` para SEO automático con SSR.

---

## 13. Conexión con el Backend

### `ElicitationService`

**Ruta:** `src/app/core/services/elicitation.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ElicitationService {
  private readonly apiUrl = `${environment.apiUrl}/elicitation`;

  submit(dto: CreateElicitationDto): Observable<ApiResponse<{ id: number }>> {
    return this.http.post<ApiResponse<{ id: number }>>(this.apiUrl, dto);
  }
}
```

### Interfaces del modelo

**Ruta:** `src/app/core/models/elicitation.model.ts`

```typescript
export interface CreateElicitationDto {
  context:    ElicitationContext;
  strategic:  ElicitationStrategic;
  actors:     Actor[];
  functional: FunctionalRequirement;
  quality:    QualityRequirements;
  priority:   { moscow_priority: MoscowPriority; dependencies: string };
}
```

---

## 14. Variables de entorno

### Desarrollo — `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/v1',
};
```

### Producción — `src/environments/environment.production.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.eixon.dev/api/v1',
};
```

---

## 15. Scripts disponibles

```bash
# Desarrollo con hot reload
ng serve

# Build de producción (incluye SSR)
ng build

# Servir el build SSR localmente
node dist/frontend/server/server.mjs

# Ejecutar tests unitarios
ng test

# Lint
ng lint
```

---

## 16. Problemas conocidos y soluciones

### Error: `Module has no exported member 'App'`

**Causa:** `main.ts` y `main.server.ts` intentan importar `{ App }` pero la clase se llama `AppComponent`.

**Solución:**
```typescript
// main.ts y main.server.ts
import { AppComponent } from './app/app';  // ← correcto
// NO: import { App } from './app/app';
```

---

### Pantalla en negro al cargar

**Causa:** `app.html` vacío o `AppComponent` sin `<router-outlet>`.

**Solución:** Verificar que `app.html` contenga:
```html
<app-navbar></app-navbar>
<main class="main-content">
  <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```

---

### Cursor no aparece (`Cannot read properties of null`)

**Causa:** El cursor intenta manipular el DOM antes de que la hidratación SSR termine.

**Solución:** Usar `setTimeout(() => this.initCursor(), 0)` dentro de `ngAfterViewInit`, nunca en `ngOnInit`.

---

### Angular Material con fondo blanco

**Causa:** El tema por defecto de Material es claro.

**Solución:** Añadir al final de `styles.css`:
```css
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: #16161f !important;
}
.mat-step-icon { background-color: #16161f !important; }
.mat-step-icon-selected { background-color: #00ffc8 !important; color: #0a0a0f !important; }
```

---

### Errores SCSS en `styles.css`

**Causa:** El archivo fue creado como `.css` pero contenía sintaxis SCSS (`@use`, `@include`, anidamiento con `&`).

**Solución A:** Renombrar a `styles.scss` y actualizar `angular.json`.  
**Solución B:** Usar únicamente sintaxis CSS pura en el archivo.

---

*Documentación generada el 19 de marzo de 2025 — Versión 1.0*
