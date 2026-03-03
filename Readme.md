# 🎭 Playwright Demo - Pruebas Automatizadas

## 📋 Descripción del Proyecto

Este proyecto demuestra el uso de **Playwright** para realizar pruebas automatizadas end-to-end (E2E) en aplicaciones web. El proyecto incluye pruebas para aplicaciones de películas, listas de tareas, y otras aplicaciones web, utilizando las capacidades avanzadas de Playwright para automatización de navegadores.

## 🚀 Características

- ✅ Pruebas automatizadas con Playwright
- 🌐 Soporte para múltiples navegadores (Chromium, Firefox, WebKit)
- 📸 Capturas de pantalla y videos de las pruebas
- 📊 Reportes HTML detallados
- ☁️ Integración con Azure Microsoft Playwright Testing Service
- 🔄 Ejecución paralela de pruebas
- 📝 Trazas de ejecución para debugging

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

## 🎯 Ejecución de Pruebas

### Pruebas Locales

```bash
# Ejecutar todas las pruebas
npx playwright test

# Ejecutar una prueba específica
npx playwright test tests/VerifyMovie.spec.ts

# Ejecutar pruebas con interfaz de usuario
npx playwright test --ui

# Ejecutar pruebas en modo headed (ver el navegador)
npx playwright test --headed

# Ver el reporte HTML
npx playwright show-report
```

### Pruebas con Azure Playwright Testing Service

Primero, configure la variable de entorno:

```bash
export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"
```

Luego ejecute las pruebas:

```bash
# Ejecutar todas las pruebas con 80 workers
npx playwright test --config=playwright.service.config.ts --workers=80

# Ejecutar con trazas habilitadas
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on

# Ejecutar prueba específica localhost
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

## 📁 Estructura del Proyecto

```
playwrightdemo/
├── tests/                          # Archivos de prueba
│   ├── VerifyMovie.spec.ts        # Prueba de aplicación de películas
│   ├── VerifyTodoApp.spec.ts      # Prueba de aplicación TODO
│   ├── test-1.spec.ts             # Pruebas adicionales
│   ├── test-2.spec.ts             # Pruebas de localhost
│   └── demo-todo-app.spec.ts      # Demo de pruebas TODO
├── screenshots/                    # Capturas de pantalla de pruebas
├── playwright.config.ts           # Configuración principal de Playwright
├── playwright.service.config.ts   # Configuración para Azure Service
├── package.json                   # Dependencias del proyecto
└── Readme.md                      # Este archivo
```

## 🧪 Pruebas Disponibles

### 1. **VerifyMovie.spec.ts** - Verificación de Detalles de Películas
Prueba que verifica los detalles de la película "Deadpool & Wolverine" en la aplicación de películas.

**Funcionalidades probadas:**
- Navegación a la página de películas
- Búsqueda de película específica
- Verificación de duración (128 min)
- Validación de géneros (Action, Comedy, Science Fiction)
- Verificación del elenco (Ryan Reynolds, Hugh Jackman)
- Captura de pantalla de resultados

### 2. **VerifyTodoApp.spec.ts** - Aplicación de Lista de Tareas
Prueba la funcionalidad básica de una aplicación TODO.

**Funcionalidades probadas:**
- Añadir nuevas tareas
- Marcar tareas como completadas
- Filtrar tareas completadas

### 3. **test-1.spec.ts** - Pruebas de TODO Extendidas
Pruebas adicionales para la aplicación de tareas con validaciones extendidas.

### 4. **test-2.spec.ts** - Pruebas Localhost
Pruebas para aplicaciones locales en desarrollo.

## 🔍 Pruebas Exploratorias - Personalizado para DOTNET CONF 2025

### ¿Qué son las Pruebas Exploratorias?

Las **pruebas exploratorias** son un enfoque de testing donde los testers diseñan y ejecutan pruebas simultáneamente, aprendiendo sobre la aplicación mientras la prueban. A diferencia de las pruebas scriptadas, las pruebas exploratorias permiten una mayor creatividad y adaptabilidad durante el proceso de testing.

### Beneficios de las Pruebas Exploratorias con Playwright

1. **Descubrimiento Rápido**: Identificación rápida de problemas no previstos
2. **Flexibilidad**: Adaptación dinámica basada en observaciones en tiempo real
3. **Documentación Automática**: Playwright captura screenshots, videos y trazas
4. **Reproducibilidad**: Conversión fácil de exploraciones manuales a tests automatizados

### Proceso de Pruebas Exploratorias en este Proyecto

#### Ejemplo: Prueba Exploratoria de Deadpool & Wolverine

**Objetivo:** Verificar que la película "Deadpool & Wolverine" tiene la duración correcta de 128 minutos.

**Pasos ejecutados:**

1. **Navegación Inicial**
   - Acceder a: https://debs-obrien.github.io/playwright-movies-app
   - Observar la página principal y estructura

2. **Exploración de Navegación**
   - Abrir menú de navegación
   - Identificar categorías de géneros disponibles
   - Seleccionar género "Action"

3. **Búsqueda de Contenido**
   - Localizar película "Deadpool & Wolverine"
   - Verificar presencia del personaje Wolverine (Hugh Jackman)
   - Hacer clic para ver detalles

4. **Verificación de Datos**
   - ✅ Confirmar duración: 128 minutos
   - ✅ Validar géneros: Action, Comedy, Science Fiction
   - ✅ Verificar calificación: 7.7/10
   - ✅ Confirmar elenco principal

5. **Documentación**
   - Capturas de pantalla automáticas
   - Grabación de video de la sesión
   - Generación de traza para análisis detallado

### De Exploración Manual a Test Automatizado

El código generado a partir de la exploración:

```typescript
test('verify Deadpool & Wolverine duration', async ({ page }) => {
  // Navegar a la aplicación
  await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  
  // Abrir menú de navegación
  await page.getByRole('button', { name: 'menu' }).click();
  
  // Ir a películas de Action
  await page.getByRole('link', { name: 'Action' }).click();
  
  // Seleccionar Deadpool & Wolverine
  await page.getByRole('link', { name: 'poster of Deadpool &' }).click();
  
  // Verificar duración
  await expect(page.getByLabel('duration')).toContainText('128 min.');
});
```

### Mejores Prácticas para Pruebas Exploratorias - DOTNET CONF 2025

#### 1. **Convenciones de Nomenclatura**
Usar nombres claros y consistentes que sigan el patrón:
```
NOMBRE__ENTRADA__RESULTADO_ESPERADO
```

Ejemplo:
```typescript
test('VERIFY_MOVIE__DEADPOOL_WOLVERINE__DURATION_128MIN', async ({ page }) => {
  // ...
});
```

#### 2. **Estructura de Tests**
```typescript
// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

test.describe('Exploratory Testing - Movie Application', () => {
  // Propósito: Verificar funcionalidad de búsqueda y detalles de películas
  // Alcance: Navegación, búsqueda, validación de datos
  
  test('should navigate and verify movie details', async ({ page }) => {
    // Test implementation
  });
});
```

#### 3. **Captura de Evidencias**

```typescript
// Screenshots
await page.screenshot({ 
  path: `screenshots/${testInfo.title}-${Date.now()}.png`,
  fullPage: true 
});

// Videos - configurado en playwright.config.ts
// video: 'on-first-retry'

// Adjuntar a reporte
const screenshot = await page.screenshot();
await testInfo.attach('screenshot', { 
  body: screenshot, 
  contentType: 'image/png' 
});
```

#### 4. **Trazas para Debugging**

```bash
# Ejecutar con trazas habilitadas
npx playwright test --trace on

# Ver trazas
npx playwright show-trace trace.zip
```

### Aplicación en DOTNET CONF 2025

Este enfoque de pruebas exploratorias es especialmente relevante para:

- **Aplicaciones .NET modernas**: Blazor, ASP.NET Core, MAUI
- **APIs REST/GraphQL**: Validación de endpoints y respuestas
- **Microservicios**: Testing de integración entre servicios
- **Progressive Web Apps**: Funcionalidad offline y sincronización

### Herramientas Complementarias

- **Playwright Inspector**: Debugging interactivo
- **Trace Viewer**: Análisis post-ejecución
- **Codegen**: Generación de código desde acciones
- **VS Code Extension**: Integración con el IDE

```bash
# Abrir Playwright Inspector
npx playwright test --debug

# Generar código desde interacciones
npx playwright codegen https://ejemplo.com
```

## 📊 Configuración

### playwright.config.ts
Configuración principal que incluye:
- Directorio de tests: `./tests`
- Ejecución paralela completa
- Reintentos en CI
- Reportes HTML
- Soporte para Chrome, Firefox, Safari

### playwright.service.config.ts
Configuración para Azure Playwright Testing Service:
- Exposición de red local
- Timeout de 30 segundos
- Sistema operativo: Linux
- Navegadores hospedados en la nube
- Reportes integrados

## 🛠️ Tecnologías Utilizadas

- **Playwright**: Framework de testing E2E
- **TypeScript**: Lenguaje de programación
- **Azure Playwright Testing**: Servicio de testing en la nube
- **Node.js**: Runtime de JavaScript

## 📝 Dependencias

```json
{
  "devDependencies": {
    "@azure/microsoft-playwright-testing": "^1.0.0-beta.7",
    "@playwright/test": "^1.52.0",
    "@types/node": "^22.15.3"
  }
}
```

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-prueba`)
3. Commit tus cambios (`git commit -m 'Agregar nueva prueba'`)
4. Push a la rama (`git push origin feature/nueva-prueba`)
5. Abre un Pull Request

## 📖 Recursos Adicionales

- [Documentación de Playwright](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Azure Playwright Testing](https://aka.ms/mpt)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

**¡Feliz Testing! 🎭✨**