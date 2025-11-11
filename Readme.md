# Playwright Demo - DOTNET CONF 2025

Este repositorio contiene pruebas de Playwright incluyendo utilidades de accesibilidad personalizadas para DOTNET CONF 2025.

## 🆕 Características de Accesibilidad

### Clase AccesibilidadHelper

Hemos agregado una clase completa de utilidades para pruebas de accesibilidad. Para más información, consulta [README-Accesibilidad.md](README-Accesibilidad.md).

**Pruebas de accesibilidad:**
```bash
# Ejecutar todas las pruebas de accesibilidad
npx playwright test tests/ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts

# Ejecutar ejemplos de uso
npx playwright test tests/EJEMPLO__USO__ACCESIBILIDAD.spec.ts

# Ver solo un test específico
npx playwright test -g "ARIA__ACCESIBILIDAD__ROLES_CORRECTOS"
```

## Configuración de Playwright Service

export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"

## Ejecutar Tests

Prueba todos los tests:
```bash
npx playwright test --config=playwright.service.config.ts --workers=80
```

Prueba todos los tests con trace:
```bash
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on
```

Prueba localhost:
```bash
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

Prueba de accesibilidad local:
```bash
npx playwright test tests/ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts --project=chromium
```