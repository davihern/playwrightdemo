--- IGNORE --- ESTE ES UN ARCHIVO MARKDOWN QUE SIGUE TODAS LAS REGLAS DEFINIDAS EN LAS INSTRUCCIONES --- IGNORE ---

---
post_title: "Playwright Demo — Pruebas E2E con Azure Playwright Testing"
author1: "Equipo de Desarrollo"
post_slug: "playwright-demo-azure-testing"
microsoft_alias: "playwrightdemo"
featured_image: "https://raw.githubusercontent.com/playwrightdemo/playwrightdemo/main/aitour.jpg"
categories: ["Testing", "Azure", "DevOps"]
tags: ["Playwright", "TypeScript", "Azure Playwright Testing", "E2E", "Automatización"]
ai_note: "Yes"
summary: >
  Proyecto de demostración de pruebas end-to-end con Microsoft Playwright y el
  servicio Azure Playwright Testing. Incluye ejecución local y en la nube,
  pruebas exploratorias para .NET Conf 2025, integración con Microsoft.com y
  soporte para múltiples navegadores.
post_date: "2025-07-10"
---

## Descripción General del Proyecto

Este repositorio es una suite de pruebas **end-to-end (E2E)** construida con
[Microsoft Playwright](https://playwright.dev/) y TypeScript. Está diseñada
para ejecutarse tanto en entornos locales como en el servicio en la nube
[Azure Playwright Testing](https://aka.ms/mpt/docs), que permite escalar la
ejecución paralela de tests y centralizar los reportes.

El proyecto incluye:

- Pruebas de navegación y validación de sitios públicos (Microsoft.com).
- Pruebas exploratorias dedicadas a **.NET Conf 2025**.
- Tests de aplicaciones de demostración (TodoMVC, aplicación de películas).
- Integración nativa con Azure Playwright Testing para ejecución paralela masiva.
- Generación de reportes en formato HTML y JSON.

---

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Convención de Nombres de Tests](#convención-de-nombres-de-tests)
- [Ejecución de Tests](#ejecución-de-tests)
  - [Ejecución Local](#ejecución-local)
  - [Ejecución con Azure Playwright Testing](#ejecución-con-azure-playwright-testing)
- [Servicio Azure Playwright Testing](#servicio-azure-playwright-testing)
- [Tests Exploratorios — .NET Conf 2025](#tests-exploratorios--net-conf-2025)
- [Suite de Tests Disponibles](#suite-de-tests-disponibles)
- [Configuración](#configuración)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## Requisitos Previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- Acceso a una cuenta de **Azure Playwright Testing** (para ejecución en la nube)

```bash
node --version
npm --version
```

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/playwrightdemo/playwrightdemo.git
   cd playwrightdemo
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Instala los navegadores requeridos por Playwright:

   ```bash
   npx playwright install
   ```

---

## Estructura del Proyecto

```
playwrightdemo/
├── tests/                            # Suite principal de tests E2E
│   ├── MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
│   ├── DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts
│   ├── VerifyMovie.spec.ts
│   ├── VerifyTodoApp.spec.ts
│   ├── movie-exploratory-test.spec.ts
│   ├── movie-ratings.spec.ts
│   ├── w2m-exploratory-test.spec.ts
│   ├── fixedtest.spec.ts
│   ├── demo-todo-app.spec.ts
│   ├── test-1.spec.ts
│   └── test-2.spec.ts
├── tests-examples/                   # Tests de ejemplo de Playwright
├── e2e/                              # Tests de flujo completo adicionales
├── screenshots/                      # Capturas de pantalla generadas
├── playwright.config.ts              # Configuración local de Playwright
├── playwright.service.config.ts      # Configuración para Azure Playwright Testing
├── package.json                      # Dependencias y metadatos del proyecto
├── workflow.yaml                     # Definición de workflow de agentes IA
└── README.md                         # Documentación principal del proyecto
```

---

## Convención de Nombres de Tests

Los archivos de test principales siguen la convención de doble guión bajo:

```
ESCENARIO__ACCIÓN__RESULTADOESPERADO.spec.ts
```

**Ejemplos:**

| Archivo | Escenario | Acción | Resultado Esperado |
|---|---|---|---|
| `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` | Microsoft.com | Navegar | Éxito |
| `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` | .NET Conf 2025 | Explorar | Funcionalidad |

Esta convención permite identificar de manera inmediata el propósito de cada
test sin necesidad de abrir el archivo.

---

## Ejecución de Tests

### Ejecución Local

Ejecuta todos los tests en modo local usando la configuración estándar:

```bash
npx playwright test
```

Ejecuta un test específico:

```bash
npx playwright test tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
```

Abre el informe HTML después de la ejecución:

```bash
npx playwright show-report
```

Ejecuta los tests en modo con interfaz gráfica (UI Mode):

```bash
npx playwright test --ui
```

### Ejecución con Azure Playwright Testing

#### Paso 1 — Configurar la variable de entorno del servicio

Exporta la URL del servicio Azure Playwright Testing antes de ejecutar:

```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/<your-account-id>/browsers"
```

#### Paso 2 — Ejecutar todos los tests en paralelo

Ejecuta la suite completa con hasta 80 workers en paralelo:

```bash
npx playwright test --config=playwright.service.config.ts --workers=80
```

#### Paso 3 — Ejecutar con trazas habilitadas

Habilita la captura de trazas para diagnóstico de fallos:

```bash
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on
```

#### Paso 4 — Ejecutar un test local apuntando al servicio

Prueba un test que apunta a `localhost` a través del servicio:

```bash
npx playwright test tests/test-2.spec.ts \
  --config=playwright.service.config.ts \
  --workers=20 \
  --trace on
```

---

## Servicio Azure Playwright Testing

El proyecto está integrado con
[Azure Playwright Testing](https://aka.ms/mpt/docs), el servicio administrado
de Microsoft para ejecutar pruebas Playwright en la nube con alta paralelización.

### Detalles del Servicio

| Parámetro | Valor |
|---|---|
| **Región** | West Europe |
| **Sistema Operativo** | Linux |
| **Timeout por test** | 30 000 ms |
| **Navegadores en la nube** | Habilitados (`useCloudHostedBrowsers: true`) |
| **Red expuesta** | `<loopback>` |

### URL del Endpoint

```
wss://westeurope.api.playwright.microsoft.com/accounts/<your-account-id>/browsers
```

### Configuración del Servicio (`playwright.service.config.ts`)

El archivo `playwright.service.config.ts` extiende la configuración local
y agrega los siguientes reportes automáticamente:

- **`list`** — Salida en consola línea por línea.
- **`@azure/microsoft-playwright-testing/reporter`** — Reporte integrado en
  el portal de Azure Playwright Testing.
- **`json`** — Reporte en archivo `results.json` para integración con pipelines.

> 🔧 TODO: Configura las credenciales de Azure (Service Principal o
> Managed Identity) en tu pipeline de CI/CD antes de ejecutar en producción.

---

## Tests Exploratorios — .NET Conf 2025

El archivo `tests/DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` contiene
la suite de pruebas exploratorias diseñadas específicamente para
**[.NET Conf 2025](https://www.dotnetconf.net/)**.

### Objetivo

Verificar y explorar la funcionalidad del sitio y herramientas presentadas
durante .NET Conf 2025, incluyendo navegación, carga de contenido y
validación de elementos clave de la interfaz.

### Convención Aplicada

```
DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts
│              │       │
│              │       └─ Resultado esperado: FUNCTIONALITY (funcionalidad verificada)
│              └─────── Acción:  EXPLORE (exploración del sitio)
└──────────────────── Escenario: DOTNETCONF2025
```

### Cómo Ejecutar Solo Este Test

```bash
# Ejecución local
npx playwright test tests/DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts

# Ejecución en Azure Playwright Testing
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/<your-account-id>/browsers"
npx playwright test tests/DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts \
  --config=playwright.service.config.ts \
  --workers=10 \
  --trace on
```

---

## Suite de Tests Disponibles

A continuación se describen todos los tests incluidos en el directorio `tests/`:

| Archivo | Descripción |
|---|---|
| `MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts` | Verifica la carga de Microsoft.com, el título de la página y la visibilidad del logo. Captura screenshot completo. |
| `DOTNETCONF2025__EXPLORE__FUNCTIONALITY.spec.ts` | Pruebas exploratorias dedicadas a .NET Conf 2025. |
| `VerifyMovie.spec.ts` | Valida los detalles de la película *Deadpool & Wolverine* en la app de películas de demostración. Usa `matchAriaSnapshot`. |
| `movie-ratings.spec.ts` | Verifica la calificación en estrellas de películas en la app de demostración. |
| `movie-exploratory-test.spec.ts` | Test exploratorio sobre la aplicación de películas. |
| `VerifyTodoApp.spec.ts` | Prueba el flujo básico de la aplicación TodoMVC (agregar y completar tareas). |
| `demo-todo-app.spec.ts` | Suite completa de la aplicación TodoMVC con múltiples escenarios. |
| `test-1.spec.ts` | Test básico de creación de elementos en TodoMVC. |
| `test-2.spec.ts` | Test de integración contra aplicación local en `localhost:4200`. |
| `w2m-exploratory-test.spec.ts` | Test exploratorio adicional. |
| `fixedtest.spec.ts` | Test de calificaciones de películas con correcciones aplicadas. |

---

## Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PLAYWRIGHT_SERVICE_URL` | URL WebSocket del servicio Azure Playwright Testing | `wss://westeurope.api.playwright.microsoft.com/...` |
| `CI` | Indica si se ejecuta en un entorno de integración continua | `true` |

### Configuración Local (`playwright.config.ts`)

| Parámetro | Valor |
|---|---|
| **Directorio de tests** | `./tests` |
| **Ejecución paralela** | Habilitada (`fullyParallel: true`) |
| **Reintentos en CI** | 2 reintentos |
| **Workers en CI** | 1 (secuencial) |
| **Reporter** | `html` |
| **Trazas** | `on-first-retry` |
| **Navegadores** | Chromium, Firefox, WebKit (Desktop) |

---

## Tecnologías Utilizadas

- **[Microsoft Playwright](https://playwright.dev/)** `^1.54.1` —
  Framework de automatización de pruebas E2E multiplataforma.
- **[Azure Playwright Testing](https://aka.ms/mpt/docs)**
  `@azure/microsoft-playwright-testing ^1.0.0-beta.7` —
  Servicio en la nube para ejecución paralela y reporte centralizado.
- **[TypeScript](https://www.typescriptlang.org/)** con
  `@types/node ^22.15.3` — Tipado estático para mayor robustez del código.
- **[Node.js](https://nodejs.org/)** — Entorno de ejecución JavaScript.

---

## Contribución

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y confirma los commits:

   ```bash
   git commit -m "feat: agrega nueva prueba exploratoria"
   ```

4. Sube los cambios y abre un Pull Request:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

---

## Licencia

Distribuido bajo la licencia **ISC**. Consulta el archivo `package.json`
para más información.
