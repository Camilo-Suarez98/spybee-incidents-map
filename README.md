# Spybee · Gestión de Incidencias

Aplicación para reportar, geolocalizar y dar seguimiento a incidencias de obra sobre el mapa del proyecto, junto a un dashboard ejecutivo que centraliza el estado global de las incidencias.

Prueba técnica — Desarrollador Frontend.

## Funcionalidades

- **Mapa de incidencias** con Mapbox GL: marcadores por prioridad, panel lateral de listado con búsqueda y filtros, panel de detalle con evidencias, responsables y observadores.
- **Flujo de creación de incidencias**: modo de colocación sobre el mapa, formulario validado y renderizado inmediato del nuevo marcador.
- **Dashboard ejecutivo**: KPIs, distribución por estado (donut), prioridad y disciplinas (barras), tendencia mensual de creación, tabla de incidencias recientes y filtros combinables.
- **Autenticación** (punto extra): inicio de sesión, sesión persistida y protección de rutas.
- **Internacionalización** (punto extra): interfaz disponible en español e inglés con selector de idioma.
- **Diseño responsive** (punto extra): adaptado de escritorio a móvil.

## Stack

- React 19 + Next.js 16 (App Router)
- Zustand para el estado de cliente (con persistencia de sesión)
- Mapbox GL JS
- SCSS Modules (sistema de diseño con tokens y mixins)
- Internacionalización propia (diccionarios `es` / `en`)

## Arquitectura

Organización *feature-based*: cada dominio agrupa sus componentes, estado y lógica.

```
app/                         Rutas (App Router)
  login/                     Acceso público
  (protected)/               Rutas protegidas (mapa, dashboard)
src/
  features/
    auth/                    Login, store de sesión, cuentas demo y guardia de rutas
    incidents/               Tipos, data, store y utilidades del dominio
    map/                     Mapa, marcadores, creación y detalle
    dashboard/               Métricas, gráficos, filtros y tabla
  components/
    ui/                      Primitivas reutilizables (Button, Modal, Field, Badge…)
    layout/                  Shell de la app (topbar, sidebar, menú, selector de idioma)
    styles/                  Tokens y mixins SCSS (abstracts)
  i18n/
    dictionaries/            Diccionarios de traducción (es, en)
```

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # añade tu token de Mapbox
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Token público de Mapbox GL. Sin él, el mapa muestra un aviso y el dashboard sigue operativo. |

### Credenciales de acceso

La aplicación incluye dos cuentas de demostración (definidas en `src/features/auth/users.ts`):

| Usuario (correo) | Contraseña | Nombre | Rol |
| --- | --- | --- | --- |
| `demo@spybee.com` | `spybee2026` | Julián Lozano | Superadmin |
| `camilo@spybee.com` | `spybee2026` | Camilo Suárez | Administrador |

En la pantalla de inicio de sesión puedes elegir cualquiera de las cuentas demo para rellenar el formulario automáticamente. La sesión queda persistida y las rutas protegidas redirigen al login si no hay sesión activa.

## Scripts

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run lint` | Linter |

## Notas de implementación

- Los datos provienen de `incidents.mock.json`. El store de incidencias parte de esa semilla y las incidencias creadas se añaden en memoria sobre el mapa y el dashboard.
- Las métricas del dashboard se derivan en tiempo real de las incidencias filtradas.
- Los gráficos están construidos con SVG propio para evitar dependencias pesadas y mantener control total del estilo.

## Despliegue

Optimizado para Vercel. Configura `NEXT_PUBLIC_MAPBOX_TOKEN` en las variables de entorno del proyecto y despliega.
