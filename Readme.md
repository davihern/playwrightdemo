--- IGNORE --- PLAYWRIGHT DEMO - DOCUMENTACIÓN DEL PROYECTO --- IGNORE ---

---
post_title: "Playwright Demo - Proyecto de Pruebas Automatizadas"
author1: "davihern"
post_slug: "playwright-demo"
microsoft_alias: "davihern"
featured_image: "https://playwright.dev/img/playwright-logo.svg"
categories: ["Testing", "Automation"]
tags: ["Playwright", "TypeScript", "Testing", "E2E", "Azure"]
ai_note: "Yes"
summary: "Proyecto de pruebas automatizadas con Playwright y TypeScript que incluye pruebas exploratorias, funcionales y de extremo a extremo para aplicaciones web."
post_date: "2026-03-27"
---

## Acerca del Proyecto

Este repositorio contiene un conjunto de pruebas automatizadas desarrolladas con [Playwright](https://playwright.dev/) y TypeScript. El proyecto demuestra diferentes técnicas de pruebas automatizadas para aplicaciones web, incluyendo pruebas exploratorias personalizadas para DOTNET CONF 2025.

Las pruebas cubren las siguientes aplicaciones:

- **Aplicación de películas** ([playwright-movies-app](https://debs-obrien.github.io/playwright-movies-app)): Verificación de detalles de películas, puntuaciones y navegación.
- **TodoMVC** ([demo.playwright.dev/todomvc](https://demo.playwright.dev/todomvc)): Gestión de tareas pendientes.
- **Microsoft.com**: Pruebas de navegación y verificación de elementos.
- **Aplicación local** (`localhost:4200`): Pruebas de integración con servidor local.

## Estructura del Proyecto

```
playwrightdemo/
├── tests/                          # Suite principal de pruebas
│   ├── VerifyMovie.spec.ts         # Verificación de detalles de películas
│   ├── VerifyTodoApp.spec.ts       # Pruebas de la app TodoMVC
│   ├── movie-ratings.spec.ts       # Verificación de puntuaciones de películas
│   ├── fixedtest.spec.ts           # Pruebas corregidas de puntuaciones
│   ├── MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts  # Navegación a Microsoft.com
│   ├── test-1.spec.ts              # Prueba TodoMVC con nuevos elementos
│   ├── test-2.spec.ts              # Prueba aplicación localhost
│   └── demo-todo-app.spec.ts       # Ejemplos de pruebas TodoMVC (comentadas)
├── e2e/
│   └── example.spec.ts             # Pruebas E2E de la página de Playwright
├── tests-examples/
│   └── demo-todo-app.spec.ts       # Ejemplos de referencia
├── playwright.config.ts            # Configuración principal de Playwright
├── playwright.service.config.ts    # Configuración para Azure Playwright Service
└── package.json                    # Dependencias del proyecto
```

## Características

- **Pruebas multi-navegador**: Chromium, Firefox y WebKit (Safari)
- **Ejecución en paralelo**: Habilitada por defecto para mayor velocidad
- **Integración con Azure Playwright Service**: Soporte para ejecución en la nube con múltiples workers
- **Captura de trazas**: Automática en el primer reintento
- **Capturas de pantalla y vídeos**: Documentación visual de las pruebas
- **Pruebas de accesibilidad**: Uso de aria-snapshot para verificación de accesibilidad

## Empezando

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:

```bash
node --version    # Node.js 18 o superior
npm --version     # npm 8 o superior
```

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/davihern/playwrightdemo.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd playwrightdemo
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Instala los navegadores de Playwright:

   ```bash
   npx playwright install
   ```

## Uso y Ejecución de Pruebas

### Pruebas locales

Ejecutar todas las pruebas con la configuración por defecto:

```bash
npx playwright test
```

Ejecutar un archivo de prueba específico:

```bash
npx playwright test tests/VerifyMovie.spec.ts
```

Ver el reporte HTML de resultados:

```bash
npx playwright show-report
```

### Pruebas con Azure Playwright Service

Configura la variable de entorno del servicio:

```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/<account-id>/browsers"
```

Ejecutar todas las pruebas con 80 workers en paralelo:

```bash
npx playwright test --config=playwright.service.config.ts --workers=80
```

Ejecutar todas las pruebas con trazas habilitadas:

```bash
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on
```

Ejecutar pruebas de localhost:

```bash
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

## Descripción de las Pruebas

### VerifyMovie.spec.ts

Verifica los detalles de la película *Deadpool & Wolverine* en la aplicación de películas:

- Carga correcta de la página de la película
- Duración del filme (`128 min`)
- Resumen de la película usando `aria-snapshot`
- Lista completa del reparto (más de 30 actores)
- Navegación mediante enlaces (Sitio Web, IMDB, Tráiler, Volver)

### movie-ratings.spec.ts y fixedtest.spec.ts

Verifican las puntuaciones de películas mediante conteo de estrellas:

- Validación de 5 estrellas para *Deadpool & Wolverine*
- Soporte para pruebas parametrizadas con título y puntuación esperada

### MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts

Prueba exploratoria personalizada para DOTNET CONF 2025:

- Navegación a `https://www.microsoft.com`
- Verificación del título de la página
- Comprobación de visibilidad del logotipo de Microsoft
- Captura de pantalla a página completa

### VerifyTodoApp.spec.ts y test-1.spec.ts

Pruebas de la aplicación TodoMVC:

- Adición de tareas
- Marcado de tareas como completadas
- Filtrado por estado (Activas, Completadas)

## Tecnologías Utilizadas

- **[Playwright](https://playwright.dev/)** `^1.54.1` - Framework de pruebas de extremo a extremo
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación tipado
- **[@azure/microsoft-playwright-testing](https://learn.microsoft.com/en-us/azure/playwright-testing/)** `^1.0.0-beta.7` - Integración con Azure Playwright Service
- **[Node.js](https://nodejs.org/)** - Entorno de ejecución

## Contribuir

1. Haz un fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/NuevaPrueba`)
3. Realiza tus cambios (`git commit -m 'Agrega nueva prueba'`)
4. Sube los cambios (`git push origin feature/NuevaPrueba`)
5. Abre un Pull Request

## Contacto

- **Autor**: davihern
- **Repositorio**: [https://github.com/davihern/playwrightdemo](https://github.com/davihern/playwrightdemo)
- **Issues**: [https://github.com/davihern/playwrightdemo/issues](https://github.com/davihern/playwrightdemo/issues)