# 🎭 Playwright Demo - Repositorio de Pruebas Automatizadas

[![Playwright](https://img.shields.io/badge/Playwright-1.52.0-green)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)
[![Azure Playwright Testing](https://img.shields.io/badge/Azure-Playwright%20Testing-0078D4)](https://azure.microsoft.com/services/playwright-testing/)

## 📋 Descripción General

Este repositorio contiene una suite completa de pruebas automatizadas de extremo a extremo (E2E) utilizando **Playwright**, un framework moderno para automatización de navegadores. El proyecto está diseñado para probar aplicaciones web en múltiples navegadores (Chromium, Firefox y WebKit) y está integrado con **Microsoft Playwright Testing Service** para ejecución en la nube.

## 🎯 Características Principales

- ✅ **Pruebas Multi-Navegador**: Soporte para Chromium, Firefox y WebKit
- ☁️ **Integración en la Nube**: Configurado con Azure Microsoft Playwright Testing Service
- 🔄 **Ejecución Paralela**: Capacidad de ejecutar hasta 80 workers simultáneos
- 📊 **Múltiples Reportes**: HTML, JSON y reportes personalizados de Azure
- 📸 **Capturas y Trazas**: Registro automático de capturas de pantalla y trazas de ejecución
- 🎨 **Snapshot Testing**: Validación de estructura de elementos con ARIA snapshots
- 🔍 **Testing Exploratorio**: Herramientas especializadas para pruebas exploratorias

## 📁 Estructura del Proyecto

```
playwrightdemo/
├── tests/                                    # Directorio de pruebas
│   ├── VerifyMovie.spec.ts                  # Pruebas de aplicación de películas
│   ├── VerifyTodoApp.spec.ts                # Pruebas de aplicación TODO
│   ├── test-1.spec.ts                       # Pruebas de ejemplo 1
│   ├── test-2.spec.ts                       # Pruebas de localhost
│   ├── movie-ratings.spec.ts                # Pruebas de calificaciones de películas
│   ├── MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts  # Pruebas de navegación
│   ├── fixedtest.spec.ts                    # Pruebas corregidas
│   └── demo-todo-app.spec.ts                # Pruebas TODO (comentadas)
├── screenshots/                              # Directorio de capturas de pantalla
├── images/                                   # Directorio de imágenes del proyecto
├── playwright.config.ts                      # Configuración principal de Playwright
├── playwright.service.config.ts              # Configuración para Azure Service
├── package.json                              # Dependencias del proyecto
└── results.json                              # Resultados de ejecución en JSON
```

## 🚀 Instalación y Configuración

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta de Azure (opcional, para usar el servicio en la nube)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/davihern/playwrightdemo.git

# Navegar al directorio
cd playwrightdemo

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## ⚙️ Configuración de Variables de Entorno

Para utilizar el servicio de Microsoft Playwright Testing, configura la siguiente variable de entorno:

```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"
```

## 🧪 Ejecución de Pruebas

### Pruebas Locales

```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar pruebas con UI interactiva
npx playwright test --ui

# Ejecutar pruebas en modo debug
npx playwright test --debug

# Ejecutar un archivo de prueba específico
npx playwright test tests/VerifyMovie.spec.ts
```

### Pruebas con Azure Playwright Testing Service

```bash
# Ejecutar todas las pruebas en la nube (80 workers)
npx playwright test --config=playwright.service.config.ts --workers=80

# Ejecutar pruebas con trazas habilitadas (20 workers)
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on

# Ejecutar pruebas de localhost con trazas
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

### Opciones Avanzadas

```bash
# Ejecutar pruebas en un navegador específico
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Ejecutar pruebas con reportes específicos
npx playwright test --reporter=html
npx playwright test --reporter=json

# Ver el reporte HTML después de la ejecución
npx playwright show-report
```

## 📊 Configuración de Playwright

### Configuración Principal (`playwright.config.ts`)

- **Directorio de Pruebas**: `./tests`
- **Ejecución Paralela**: Habilitada por defecto
- **Reintentos**: 2 reintentos en CI, 0 en local
- **Workers**: 1 en CI, ilimitados en local
- **Reporte**: HTML por defecto
- **Trazas**: Activadas en el primer reintento fallido
- **Navegadores**: Chromium, Firefox, WebKit

### Configuración de Servicio en la Nube (`playwright.service.config.ts`)

- **OS**: Linux
- **Timeout**: 30 segundos
- **Red Expuesta**: Loopback (para pruebas de localhost)
- **Navegadores en la Nube**: Habilitados
- **Reportes**: Lista, Azure Reporter, JSON

## 📝 Ejemplos de Pruebas

### Prueba Simple de TODO App

```typescript
test('verify todo app functionality', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hello');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await expect(page.getByTestId('todo-title')).toBeVisible();
});
```

### Prueba con Captura de Pantalla

```typescript
test('verify movie details', async ({ page }, testInfo) => {
  await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  const screenshot = await page.screenshot();
  await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  await expect(page.getByTestId('movie-summary')).toBeVisible();
});
```

## 🔍 Testing Exploratorio - Personalizado para DOTNET CONF 2025

### ¿Qué es el Testing Exploratorio?

El **Testing Exploratorio** es una aproximación dinámica de pruebas donde los testers diseñan y ejecutan pruebas simultáneamente, explorando la aplicación de manera creativa para descubrir problemas inesperados. A diferencia de las pruebas scripted tradicionales, el testing exploratorio permite:

- 🧠 **Pensamiento Creativo**: Los testers usan su intuición y experiencia
- 🎯 **Descubrimiento de Casos Edge**: Identificación de escenarios no planificados
- 📹 **Documentación Visual**: Capturas y videos para evidencia
- 🚀 **Adaptabilidad**: Ajuste de estrategias en tiempo real

### Convenciones para Testing Exploratorio en este Proyecto

#### Convenciones de Nomenclatura

Los archivos de pruebas exploratorias siguen el patrón:
```
APLICACION__ACCION__RESULTADO.spec.ts
```

Ejemplo:
```typescript
// tests/MICROSOFTCOM__NAVIGATE__SUCCESS.spec.ts
```

#### Estructura de Archivo de Testing Exploratorio

Cada archivo de prueba exploratoria debe incluir:

1. **Encabezado Identificativo**:
```typescript
// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
```

2. **Descripción Clara del Propósito**:
```typescript
/**
 * Description:
 * Este test exploratorio verifica la navegación a https://www.microsoft.com.
 * Valida la carga exitosa de la página, la presencia del logo de Microsoft,
 * y captura screenshots y videos para documentación y análisis posterior.
 */
```

3. **Estructura de Test con test.describe**:
```typescript
test.describe('Navigation to Microsoft.com', () => {
  test('MICROSOFTCOM__NAVIGATE__SUCCESS', async ({ page }) => {
    // Lógica de la prueba
  });
});
```

4. **Capturas de Pantalla y Videos**:
```typescript
// Captura de pantalla
await page.screenshot({ 
  path: 'screenshots/microsoft-homepage.png', 
  fullPage: true 
});

// Los videos se graban automáticamente si están configurados en playwright.config.ts
```

### Ejemplo Completo de Testing Exploratorio

```typescript
// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Description:
 * Test exploratorio para verificar la funcionalidad de búsqueda en la aplicación.
 * Explora diferentes escenarios de entrada y documenta comportamientos inesperados.
 */

import { test, expect } from '@playwright/test';

test.describe('Search Functionality Exploration', () => {
  test('SEARCH__EMPTY_INPUT__EXPECTED_BEHAVIOR', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Captura inicial
    await page.screenshot({ path: 'screenshots/search-initial.png' });
    
    // Explorar búsqueda vacía
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Validar comportamiento
    await expect(page.getByText('Please enter search terms')).toBeVisible();
    
    // Captura del resultado
    await page.screenshot({ path: 'screenshots/search-empty-result.png' });
  });
  
  test('SEARCH__SPECIAL_CHARS__EDGE_CASE', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Probar caracteres especiales
    const specialChars = ['@#$%', '<script>', '\'OR 1=1--'];
    
    for (const char of specialChars) {
      await page.getByRole('textbox', { name: 'Search' }).fill(char);
      await page.getByRole('button', { name: 'Submit' }).click();
      
      // Documentar comportamiento
      await page.screenshot({ 
        path: `screenshots/search-special-${char.replace(/[^a-zA-Z0-9]/g, '_')}.png` 
      });
      
      // Verificar que la aplicación maneja correctamente
      await expect(page).not.toHaveTitle(/Error/);
    }
  });
});
```

### Mejores Prácticas para Testing Exploratorio

1. **Nombrar Tests Descriptivamente**: Usar el formato `COMPONENTE__ACCION__RESULTADO`
2. **Documentar Descubrimientos**: Agregar comentarios sobre comportamientos inesperados
3. **Capturar Evidencia**: Usar screenshots y videos liberalmente
4. **Agrupar Tests Relacionados**: Usar `test.describe` para organización lógica
5. **Probar Casos Edge**: Explorar límites, entradas inválidas, y escenarios inusuales
6. **Combinar con ARIA Snapshots**: Validar estructura de elementos para cambios inesperados

### Configuración para Videos y Screenshots

En `playwright.config.ts`, habilita videos y screenshots:

```typescript
use: {
  screenshot: 'on',  // o 'only-on-failure'
  video: 'on',       // o 'retain-on-failure'
  trace: 'on-first-retry',
}
```

## 📦 Dependencias del Proyecto

```json
{
  "devDependencies": {
    "@azure/microsoft-playwright-testing": "^1.0.0-beta.7",
    "@playwright/test": "^1.52.0",
    "@types/node": "^22.15.3"
  }
}
```

## 🔧 Características Avanzadas

### ARIA Snapshots

El proyecto utiliza **ARIA Snapshots** para validar la estructura accesible de las páginas:

```typescript
await expect(page.getByTestId('movie-summary')).toMatchAriaSnapshot(`
  - heading "Deadpool & Wolverine" [level=1]
  - heading "Come together." [level=2]
  - text: ★ ★ ★ ★ ★ ★
  - paragraph: "7.7"
`);
```

### Adjuntar Capturas a Reportes

```typescript
const screenshot = await page.screenshot();
await testInfo.attach('screenshot', { 
  body: screenshot, 
  contentType: 'image/png' 
});
```

### Pruebas Parametrizadas

```typescript
const testData = [
  { movie: 'Deadpool', rating: 5 },
  { movie: 'Wolverine', rating: 4 }
];

for (const data of testData) {
  test(`verify ${data.movie} has ${data.rating} stars`, async ({ page }) => {
    // Lógica de prueba
  });
}
```

## 🌐 Aplicaciones Probadas

Este repositorio incluye pruebas para las siguientes aplicaciones:

1. **Playwright Movies App**: https://debs-obrien.github.io/playwright-movies-app
   - Verificación de detalles de películas
   - Validación de calificaciones
   - Navegación por géneros y elencos

2. **TodoMVC Demo**: https://demo.playwright.dev/todomvc
   - Funcionalidad de agregar tareas
   - Marcar tareas como completadas
   - Filtrado de tareas (activas/completadas)

3. **Microsoft.com**: https://www.microsoft.com
   - Verificación de navegación exitosa
   - Validación de elementos principales

4. **Aplicación Local (localhost:4200)**
   - Pruebas de integración local
   - Verificación de mensajes multilinguales

## 📈 Resultados y Reportes

Los resultados de las pruebas se generan en múltiples formatos:

- **Reporte HTML**: `playwright-report/index.html`
- **Reporte JSON**: `results.json`
- **Capturas de Pantalla**: Directorio `screenshots/`
- **Trazas**: Directorio `test-results/` (cuando están habilitadas)

### Visualizar Reportes

```bash
# Ver reporte HTML
npx playwright show-report

# Ver trazas de pruebas fallidas
npx playwright show-trace test-results/trace.zip
```

## 🐛 Depuración de Pruebas

### Modo Debug

```bash
# Iniciar en modo debug
npx playwright test --debug

# Debug de una prueba específica
npx playwright test tests/VerifyMovie.spec.ts --debug
```

### Inspector de Playwright

El inspector se abre automáticamente en modo debug y permite:
- Ejecutar pruebas paso a paso
- Inspeccionar selectores
- Ver el estado de la página
- Modificar pruebas en tiempo real

### Codegen - Generador de Código

```bash
# Generar código de prueba grabando acciones
npx playwright codegen https://demo.playwright.dev/todomvc
```

## 🤝 Contribuciones

Para contribuir a este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Realiza tus cambios
4. Ejecuta las pruebas: `npm test`
5. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
6. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
7. Abre un Pull Request

### Convenciones de Código

- Usar TypeScript para todas las pruebas
- Seguir la nomenclatura `COMPONENTE__ACCION__RESULTADO` para pruebas exploratorias
- Incluir comentarios descriptivos
- Agregar screenshots para pruebas visuales
- Mantener pruebas atómicas y enfocadas

## 📚 Recursos Adicionales

- [Documentación Oficial de Playwright](https://playwright.dev/)
- [Guía de API de Playwright](https://playwright.dev/docs/api/class-playwright)
- [Microsoft Playwright Testing](https://azure.microsoft.com/services/playwright-testing/)
- [Mejores Prácticas de Testing](https://playwright.dev/docs/best-practices)
- [DOTNET CONF 2025](https://www.dotnetconf.net/)

## 📄 Licencia

ISC

## 👤 Autor

davihern

## 🎓 Propósito Educativo

Este repositorio fue creado con propósitos demostrativos y educativos, especialmente orientado hacia las mejores prácticas presentadas en **DOTNET CONF 2025**. Es ideal para:

- Aprender Playwright desde cero
- Entender patrones de testing E2E
- Practicar testing exploratorio
- Implementar CI/CD con pruebas automatizadas
- Integrar servicios en la nube para testing

---

**¡Feliz Testing! 🎭✨**

Para preguntas o soporte, abre un issue en este repositorio.