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

Prueba test de películas mejor valoradas (Top Rated):
```bash
npx playwright test tests/TopRatedMovies.spec.ts --project=chromium
```

## Nuevo Test: TopRatedMovies.spec.ts

Este test automatizado implementa pruebas exploratorias para la aplicación de películas de Playwright, personalizado para DOTNET CONF 2025.

### Funcionalidad del Test

El test `TopRatedMovies.spec.ts` realiza las siguientes acciones:

1. **Navega a la aplicación de películas**: Abre https://debs-obrien.github.io/playwright-movies-app
2. **Accede a películas mejor valoradas**: Hace clic en el enlace "Top Rated"
3. **Selección aleatoria**: Selecciona una película al azar de la lista
4. **Captura de duración**: Extrae y registra la duración de la película
5. **Genera archivo de log**: Crea `movie-duration.txt` con:
   - Título de la película
   - Duración en minutos
   - Fecha y hora de ejecución
6. **Captura de pantalla**: Toma una screenshot completa de la página de detalles

### Estructura del Test

El test sigue las convenciones de nomenclatura:
- **Nombre del test**: `TOPRATEDMOVIES__RANDOMSELECTION__DURATIONLOGGED`
- **Método**: `navigate_to_top_rated__select_random_movie__log_duration_and_screenshot`

### Pruebas Exploratorias - DOTNET CONF 2025

Este test está diseñado específicamente para pruebas exploratorias en el contexto de DOTNET CONF 2025:
- Utiliza selectores robustos basados en roles de accesibilidad
- Implementa esperas explícitas para mejorar la confiabilidad
- Captura evidencia (screenshots y logs) para análisis posterior
- Incluye comentarios en español para facilitar la documentación