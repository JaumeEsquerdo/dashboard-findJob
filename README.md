# findJob — Dashboard de Empleo Tech

Dashboard interactivo para explorar y analizar el mercado laboral tecnológico en tiempo real. Conecta con la **API pública de Empllo** para traer ofertas reales del sector tech y presentarlas de forma **visual, clara y filtrable**.

---

# ¿Qué hace esta app?

Al entrar, la aplicación carga automáticamente **ofertas de empleo del sector tecnológico** con **paginación progresiva** (puedes ir cargando más con un botón).

Puedes **filtrar las ofertas** por:

- título o empresa
- nivel de experiencia _(Junior, Mid, Senior…)_
- ubicación o modalidad **remota**

Al clicar cualquier oferta, se abre un **sidebar lateral** con todos los detalles:

- empresa
- salario
- descripción completa del puesto
- botón directo para solicitar el empleo en la página original

---

# Funcionalidades principales

## 📊 KPIs en tiempo real

Tres métricas que se actualizan según los filtros aplicados:

- Total de ofertas encontradas
- Porcentaje de trabajo remoto
- Salario medio (EUR / USD)

---

## 📈 Gráficos y métricas visuales

Tres gráficos interactivos usando **Recharts**:

- **Barras:** número de ofertas por nivel de seniority
- **Tarta (Pie):** proporción remoto vs presencial
- **Línea:** salario medio por nivel de experiencia

---

## 🔍 Filtros combinables

Búsqueda libre por texto + dropdowns personalizados de:

- experiencia
- ubicación

Incluyen **cierre automático al hacer clic fuera**.

---

## 🧭 Guía interactiva (onboarding)

La primera vez que entras aparece un **mensaje de bienvenida**.

Además, hay un **tutorial paso a paso de 4 pasos** que te guía por:

- filtros
- KPIs
- listado
- carga de más datos

---

## 🌙 Modo oscuro

- Detecta automáticamente la preferencia del sistema
- Permite cambiarlo manualmente
- La preferencia se guarda en **localStorage**

---

## ⬆️ Botón "volver arriba"

Aparece al hacer scroll hacia abajo para **volver al inicio del dashboard rápidamente**.

---

# Arquitectura de datos

La app sigue un flujo limpio de datos desde la API externa hasta la UI:

```
API Empllo → API Route (proxy Next.js) → Validación Zod → Mapper → Componentes React
```

### API Route

`/lib/api/jobs/route.ts`

Actúa como **proxy en el servidor** hacia:

```
https://empllo.com/api/v1
```

Evita exponer la API externa directamente al cliente.

---

### Validación con Zod

`job.schema.ts`

Valida en **runtime** que los datos recibidos tienen la estructura esperada antes de usarlos.

---

### Mapper

`job.mapper.ts`

Transforma el formato de la API externa al **modelo interno `Job`** que usa la app.

Normaliza:

- nombres de campos
- tipos de datos

---

# Stack técnico

| Tecnología                  | Uso                             |
| --------------------------- | ------------------------------- |
| **Next.js 16 (App Router)** | Framework principal, API Routes |
| **React 19**                | UI y gestión de estado          |
| **TypeScript**              | Tipado estático                 |
| **Tailwind CSS v4**         | Estilos y diseño responsive     |
| **Framer Motion**           | Animaciones                     |
| **Recharts**                | Gráficos interactivos           |
| **Zod**                     | Validación de datos             |
| **Lucide React**            | Iconos                          |
| **DOMPurify**               | Sanitización del HTML           |
| **Figma**                   | Diseño UI de la página web      |

---

# Estructura del proyecto

```
job-dashboard/
└── src/
    ├── app/
    │   ├── lib/
    │   │   ├── api/jobs/route.ts
    │   │   ├── mappers/job.mapper.ts
    │   │   └── schemas/job.schema.ts
    │   ├── sobre-nosotros/page.tsx
    │   ├── types/types.tsx
    │   └── page.tsx
    │
    ├── components/
    │   ├── FiltrosSelects.tsx
    │   ├── Kpis.tsx
    │   ├── Metricas.tsx
    │   ├── Navbar.tsx
    │   ├── RenderJobs.tsx
    │   └── Sidebar.tsx
    │
    └── context/
        ├── DarkModeContext.tsx
        ├── HelperContext.tsx
        └── ScrollContext.tsx
```

---

# Cómo ejecutarlo en local

```bash
# 1. Entra en la carpeta del proyecto
cd job-dashboard

# 2. Instala dependencias
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Abre en el navegador:

```
http://localhost:3000
```

---

# Páginas

| Ruta              | Descripción                                                                       |
| ----------------- | --------------------------------------------------------------------------------- |
| `/`               | Dashboard principal con filtros, KPIs, gráficos y listado de ofertas              |
| `/sobre-nosotros` | Información del proyecto, stack técnico, API utilizada y perfil del desarrollador |

---

# API y créditos

Los datos de empleo provienen de la **API pública de Empllo**, especializada en ofertas del sector tecnológico.

---

# Autor

**Jaume Esquerdo**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-666666?logo=linkedin&logoColor=white&style=for-the-badge)](https://www.linkedin.com/in/jaume-esquerdo/)
[![Github](https://img.shields.io/badge/Github-666666?logo=firefox&logoColor=white&style=for-the-badge)](https://github.com/JaumeEsquerdo)
[![Portfolio](https://img.shields.io/badge/Portfolio-666666?logo=firefox&logoColor=white&style=for-the-badge)](https://portfolio-jaume-esquerdo.vercel.app/)

---

# Notes

El README está escrito pensando en que cualquier persona que llegue al repositorio entienda de un vistazo:

- qué hace la app
- cómo está construida
- cómo ejecutarla

No requiere conocimientos previos del proyecto.

---

### Modelo de datos

El modelo `Job` está tipado con **TypeScript** y definido en:

```
job-dashboard/src/app/types/types.tsx
```

Esto garantiza consistencia entre todos los componentes.

---

### Paginación

La paginación carga **40 ofertas por defecto en cada petición** y permite seguir cargando hasta agotar todas las disponibles en la API.

---

### Seguridad

El HTML de las descripciones de los puestos se **sanitiza con DOMPurify** antes de renderizarse, evitando ataques **XSS**.
