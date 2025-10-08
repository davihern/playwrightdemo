# 🎭 Playwright Demo - Proyecto de Pruebas Automatizadas

[![Playwright](https://img.shields.io/badge/Playwright-1.52.0-green.svg)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)](https://www.typescriptlang.org/)
[![Azure Playwright Testing](https://img.shields.io/badge/Azure-Playwright%20Testing-0078D4.svg)](https://azure.microsoft.com/services/playwright-testing/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Proyecto de demostración para pruebas automatizadas end-to-end utilizando Playwright con TypeScript. Este repositorio incluye ejemplos de pruebas automatizadas, integración con Azure Playwright Testing Service y ejemplos de pruebas exploratorias.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Comenzando](#-comenzando)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación](#instalación)
  - [Ejecutar el Proyecto](#ejecutar-el-proyecto)
- [Uso](#-uso)
  - [Comandos Principales](#comandos-principales)
  - [Ejemplos de Uso](#ejemplos-de-uso)
- [Pruebas](#-pruebas)
  - [Ejecutar Pruebas](#ejecutar-pruebas)
  - [Mejores Prácticas](#mejores-prácticas)
- [Pruebas Exploratorias - DOTNET CONF 2025](#-pruebas-exploratorias---dotnet-conf-2025)
- [Contribuir](#-contribuir)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Licencia](#-licencia)
- [Contacto y Soporte](#-contacto-y-soporte)

---

## 📖 Descripción del Proyecto

Este proyecto es una demostración completa de pruebas automatizadas utilizando **Playwright**, un framework moderno de automatización de navegadores. El proyecto incluye:

- ✅ Pruebas end-to-end (E2E) para aplicaciones web
- ✅ Integración con Azure Playwright Testing Service para ejecución en la nube
- ✅ Ejemplos de pruebas en múltiples navegadores (Chromium, Firefox, WebKit)
- ✅ Pruebas de aplicaciones de ejemplo (TodoMVC, Movie App)
- ✅ Configuración de trazas y reportes detallados
- ✅ Ejemplos de pruebas exploratorias

---

## 🚀 Comenzando

### Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 18.x o superior)
  - [Descargar Node.js](https://nodejs.org/)
- **npm** (incluido con Node.js)
- **Git** para clonar el repositorio

### Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/davihern/playwrightdemo.git
   cd playwrightdemo
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright:**

   ```bash
   npx playwright install
   ```

### Ejecutar el Proyecto

Para ejecutar las pruebas, utiliza los comandos descritos en la sección [Pruebas](#-pruebas).

---

## 💻 Uso

### Comandos Principales

#### Configurar URL del Servicio Azure Playwright (Opcional)

Si deseas usar Azure Playwright Testing Service:

```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"
```

#### Ejecutar todas las pruebas:

```bash
npx playwright test
```

#### Ejecutar pruebas con configuración de servicio:

```bash
npx playwright test --config=playwright.service.config.ts --workers=80
```

#### Ejecutar pruebas con trazas activadas:

```bash
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on
```

#### Ejecutar una prueba específica:

```bash
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

### Ejemplos de Uso

#### Abrir el Reporte HTML de las Pruebas

```bash
npx playwright show-report
```

#### Ejecutar pruebas en modo UI interactivo

```bash
npx playwright test --ui
```

#### Ejecutar pruebas en modo debug

```bash
npx playwright test --debug
```

#### Ver trazas de una prueba fallida

```bash
npx playwright show-trace trace.zip
```

---

## 🧪 Pruebas

### Ejecutar Pruebas

Este proyecto incluye varios conjuntos de pruebas:

1. **Pruebas de TodoMVC App:**
   ```bash
   npx playwright test tests/VerifyTodoApp.spec.ts
   ```

2. **Pruebas de Movie App:**
   ```bash
   npx playwright test tests/VerifyMovie.spec.ts
   ```

3. **Pruebas de navegación:**
   ```bash
   npx playwright test tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
   ```

4. **Ejecutar todas las pruebas en paralelo:**
   ```bash
   npx playwright test --workers=4
   ```

### Mejores Prácticas

- **Nomenclatura Clara**: Utiliza nombres descriptivos para tus archivos de prueba y casos de prueba
- **Estructura Organizada**: Agrupa pruebas relacionadas utilizando `test.describe()`
- **Selectores Estables**: Prefiere selectores basados en roles y atributos de datos (`data-testid`)
- **Esperas Automáticas**: Aprovecha las esperas automáticas de Playwright para elementos
- **Capturas de Pantalla**: Usa `await page.screenshot()` para documentar comportamientos inesperados
- **Trazas**: Habilita trazas para debugging con `--trace on`
- **Paralelización**: Ejecuta pruebas en paralelo para mayor velocidad
- **Aislamiento**: Cada prueba debe ser independiente y no depender de otras

---

## 🔍 Pruebas Exploratorias - DOTNET CONF 2025

### ¿Qué son las Pruebas Exploratorias?

Las **pruebas exploratorias** son una técnica de testing donde el tester explora activamente la aplicación, diseñando y ejecutando pruebas simultáneamente. En lugar de seguir scripts predefinidos, el tester usa su creatividad, intuición y experiencia para descubrir comportamientos inesperados.

### Pruebas Exploratorias con Playwright - Personalizado para DOTNET CONF 2025

En el contexto de **DOTNET CONF 2025**, este proyecto demuestra cómo combinar las pruebas exploratorias con la automatización de Playwright para aplicaciones .NET modernas.

#### Convenciones de Nombres

Utiliza convenciones claras y consistentes para tus archivos de prueba:

```typescript
// Formato: NOMBRE__INPUT__RESULTADOESPERADO
test('TODOMVC__ADDITEM__ITEMADDED', async ({ page }) => {
  // Tu prueba aquí
});
```

#### Estructura de Pruebas Exploratorias

Cada archivo de prueba exploratoria debe incluir:

```typescript
// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
// Descripción: Pruebas exploratorias de la funcionalidad de Movies App
// Objetivo: Validar la interacción del usuario con la galería de películas

import { test, expect } from '@playwright/test';

test.describe('Exploratory Testing - Movies App', () => {
  test.beforeEach(async ({ page }) => {
    // Configuración inicial
  });

  test('MOVIEAPP__SEARCH__RESULTSSHOWN', async ({ page }) => {
    // Prueba exploratoria
  });
});
```

#### Características Especiales para DOTNET CONF 2025

1. **Capturas de Pantalla y Videos**
   
   Playwright permite capturar automáticamente pantallas y videos durante las pruebas exploratorias:

   ```typescript
   test('exploratory test with screenshot', async ({ page }) => {
     await page.goto('https://example.com');
     
     // Capturar pantalla de comportamiento inesperado
     await page.screenshot({ 
       path: 'screenshots/unexpected-behavior.png',
       fullPage: true 
     });
   });
   ```

2. **Organización Lógica**
   
   Agrupa pruebas relacionadas:

   ```typescript
   test.describe('User Authentication Flow', () => {
     test('login with valid credentials', async ({ page }) => { });
     test('login with invalid credentials', async ({ page }) => { });
     test('password reset flow', async ({ page }) => { });
   });
   ```

3. **Integración con Aplicaciones .NET**
   
   Este proyecto está diseñado para probar aplicaciones .NET modernas:

   - Aplicaciones ASP.NET Core
   - Blazor WebAssembly y Server
   - APIs REST .NET
   - Aplicaciones Angular/React con backend .NET

4. **Configuración de Videos**
   
   Habilita la grabación de video en `playwright.config.ts`:

   ```typescript
   use: {
     video: 'on-first-retry', // o 'on' para siempre
     screenshot: 'only-on-failure',
   }
   ```

5. **Ejemplo Práctico - DOTNET CONF 2025**

   ```typescript
   // EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
   // Descripción: Validación exploratoria de aplicación .NET moderna
   // Alcance: Interfaz de usuario, API REST y flujos de usuario

   import { test, expect } from '@playwright/test';

   test.describe('DOTNET App Exploratory Tests', () => {
     test('DOTNETAPP__NAVIGATE__HOMELOADED', async ({ page }) => {
       await page.goto('http://localhost:5000');
       await expect(page).toHaveTitle(/Home/);
       
       // Captura para documentación
       await page.screenshot({ 
         path: 'screenshots/dotnet-home.png' 
       });
     });

     test('DOTNETAPP__API__DATAFETCHED', async ({ page, request }) => {
       // Prueba de API .NET
       const response = await request.get('http://localhost:5000/api/data');
       expect(response.ok()).toBeTruthy();
       
       // Validar respuesta JSON
       const data = await response.json();
       expect(data).toBeDefined();
     });
   });
   ```

#### Recursos para Pruebas Exploratorias

- **Playwright Trace Viewer**: Herramienta visual para analizar ejecuciones
- **Codegen**: Genera código automáticamente mientras exploras
  ```bash
  npx playwright codegen https://example.com
  ```
- **Inspector**: Debug interactivo de pruebas
  ```bash
  npx playwright test --debug
  ```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto:

1. **Fork** el repositorio
2. Crea una **rama de feature** (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Código de Conducta

- Sé respetuoso con todos los contribuidores
- Proporciona comentarios constructivos
- Ayuda a mantener el código limpio y bien documentado

### Guías de Contribución

- Sigue las convenciones de nomenclatura existentes
- Añade pruebas para nuevas funcionalidades
- Actualiza la documentación según sea necesario
- Asegúrate de que todas las pruebas pasen antes de hacer commit

---

## 📁 Estructura del Proyecto

```
playwrightdemo/
├── .github/
│   ├── copilot-instructions.md    # Instrucciones para GitHub Copilot
│   ├── instructions/              # Instrucciones adicionales
│   └── prompts/                   # Prompts personalizados
├── tests/
│   ├── VerifyTodoApp.spec.ts      # Pruebas de TodoMVC
│   ├── VerifyMovie.spec.ts        # Pruebas de Movie App
│   ├── test-1.spec.ts             # Pruebas básicas
│   ├── test-2.spec.ts             # Pruebas de localhost
│   ├── movie-ratings.spec.ts      # Pruebas de ratings
│   ├── fixedtest.spec.ts          # Pruebas corregidas
│   └── demo-todo-app.spec.ts      # Demos de TodoApp
├── screenshots/                    # Capturas de pantalla
├── images/                        # Imágenes del proyecto
├── playwright.config.ts           # Configuración principal
├── playwright.service.config.ts   # Configuración Azure Service
├── package.json                   # Dependencias del proyecto
└── Readme.md                      # Este archivo
```

### Archivos Clave

- **`playwright.config.ts`**: Configuración principal de Playwright, define navegadores, workers, reportes
- **`playwright.service.config.ts`**: Configuración para Azure Playwright Testing Service
- **`tests/`**: Directorio con todos los archivos de prueba
- **`.github/`**: Configuraciones de GitHub, instrucciones y prompts

---

## 🛠️ Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías y frameworks:

### Frameworks y Librerías Principales

- **[Playwright](https://playwright.dev/)** (v1.52.0) - Framework de automatización de navegadores
- **[TypeScript](https://www.typescriptlang.org/)** - Lenguaje de programación tipado
- **[Node.js](https://nodejs.org/)** - Runtime de JavaScript

### Servicios en la Nube

- **[Azure Playwright Testing](https://azure.microsoft.com/services/playwright-testing/)** - Ejecución de pruebas en la nube

### Herramientas de Desarrollo

- **npm** - Gestor de paquetes
- **Git** - Control de versiones
- **GitHub** - Hosting del repositorio

### Navegadores Soportados

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia ISC**.

```
ISC License

Copyright (c) 2024

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 📧 Contacto y Soporte

### ¿Necesitas Ayuda?

Si encuentras problemas o tienes preguntas:

1. **Reportar Issues**: [GitHub Issues](https://github.com/davihern/playwrightdemo/issues)
2. **Discusiones**: [GitHub Discussions](https://github.com/davihern/playwrightdemo/discussions)

### Recursos Adicionales

- **Documentación de Playwright**: [playwright.dev/docs](https://playwright.dev/docs/intro)
- **Azure Playwright Testing**: [aka.ms/mpt](https://aka.ms/mpt)
- **TypeScript Docs**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **DOTNET CONF 2025**: [dotnetconf.net](https://www.dotnetconf.net/)

### Comunidad

- **Playwright Discord**: [discord.gg/playwright](https://aka.ms/playwright/discord)
- **Stack Overflow**: Tag `playwright`

---

## 🌟 Agradecimientos

Gracias a todos los contribuidores y a la comunidad de Playwright por hacer posible este proyecto.

**¡Feliz Testing! 🎭**