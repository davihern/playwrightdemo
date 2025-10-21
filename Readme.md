export PLAYWRIGHT_SERVICE_URL="wss://westeurope.api.playwright.microsoft.com/accounts/westeurope_acc3654d-81b9-47c1-a91b-4ebbed3764b1/browsers"

## Ejecutar Tests

Ejecutar todos los tests:
```bash
npx playwright test --config=playwright.service.config.ts --workers=80
```

Ejecutar todos los tests con seguimiento (trace):
```bash
npx playwright test --config=playwright.service.config.ts --workers=20 --trace on
```

Ejecutar test en localhost:
```bash
npx playwright test tests/test-2.spec.ts --config=playwright.service.config.ts --workers=20 --trace on
```

Ejecutar test de películas mejor valoradas (Top Rated):
```bash
npx playwright test tests/TopRatedMovies.spec.ts --project=chromium
```

Ejecutar test de películas populares:
```bash
npx playwright test tests/PopularMovies.spec.ts --project=chromium
```

Ejecutar test de búsqueda de películas:
```bash
npx playwright test tests/SearchMovies.spec.ts --project=chromium
```

## Tests de Películas - DOTNET CONF 2025

Esta suite de tests automatizados implementa pruebas exploratorias para la aplicación de películas de Playwright, personalizada para DOTNET CONF 2025.

### Test 1: TopRatedMovies.spec.ts

Este test explora las películas mejor valoradas y captura información detallada.

**Acciones que realiza:**

1. **Navega a la aplicación de películas**: Abre https://debs-obrien.github.io/playwright-movies-app
2. **Accede a películas mejor valoradas**: Hace clic en el enlace "Top Rated"
3. **Selección aleatoria**: Selecciona una película al azar de la lista
4. **Captura de duración**: Extrae y registra la duración de la película
5. **Genera archivo de registro**: Crea `movie-duration.txt` con:
   - Título de la película
   - Duración en minutos
   - Fecha y hora de ejecución
6. **Captura de pantalla**: Toma una captura completa de la página de detalles

**Convenciones de nomenclatura:**
- **Nombre del test**: `TOPRATEDMOVIES__RANDOMSELECTION__DURATIONLOGGED`
- **Método**: `navigate_to_top_rated__select_random_movie__log_duration_and_screenshot`

### Test 2: PopularMovies.spec.ts

Este test valida la funcionalidad de las películas populares.

**Acciones que realiza:**

1. **Navega a la sección de películas populares**
2. **Verifica que se muestren múltiples películas**
3. **Selecciona la película más popular**
4. **Captura información del elenco**
5. **Registra datos en archivo de texto**
6. **Toma captura de pantalla**

**Convenciones de nomenclatura:**
- **Nombre del test**: `POPULARMOVIES__FIRSTMOVIE__CASTLOGGED`

### Test 3: SearchMovies.spec.ts

Este test prueba la funcionalidad de búsqueda de películas.

**Acciones que realiza:**

1. **Navega a la aplicación**
2. **Realiza una búsqueda de película específica**
3. **Verifica los resultados de búsqueda**
4. **Captura información de género**
5. **Genera reporte de búsqueda**
6. **Captura pantalla de resultados**

**Convenciones de nomenclatura:**
- **Nombre del test**: `SEARCHMOVIES__QUERY__RESULTSLOGGED`

## Características Comunes de los Tests

Todos los tests están diseñados específicamente para pruebas exploratorias en el contexto de DOTNET CONF 2025:

- **Selectores robustos**: Utiliza selectores basados en roles de accesibilidad
- **Esperas explícitas**: Implementa esperas para mejorar la confiabilidad
- **Evidencia capturada**: Screenshots y logs para análisis posterior
- **Documentación en español**: Comentarios y logs en español
- **Estructura clara**: Organización con `test.describe` para agrupación lógica
- **Validaciones completas**: Verificaciones exhaustivas de datos y estados