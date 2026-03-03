# Clase de Accesibilidad para Playwright - DOTNET CONF 2025

## Descripción General

La clase `AccesibilidadHelper` es una utilidad personalizada para pruebas exploratorias de accesibilidad en aplicaciones web, desarrollada específicamente para DOTNET CONF 2025. Esta clase proporciona métodos completos para verificar el cumplimiento de los estándares WCAG 2.1 (Web Content Accessibility Guidelines).

## Características Principales

### 🎯 Verificaciones Incluidas

1. **Roles ARIA**: Valida que los elementos tengan los roles ARIA correctos
2. **Etiquetas Accesibles**: Verifica la presencia de `aria-label` y otros atributos
3. **Navegación por Teclado**: Asegura que los elementos interactivos sean accesibles mediante teclado
4. **Nombres Accesibles**: Valida que los elementos interactivos tengan nombres descriptivos
5. **Texto Alternativo**: Verifica que las imágenes tengan atributos `alt` apropiados
6. **Jerarquía de Encabezados**: Valida la estructura correcta de encabezados (h1-h6)
7. **Etiquetas de Formularios**: Verifica que los campos de formulario estén correctamente etiquetados
8. **Escaneo Completo**: Analiza toda la página de forma automática

## Instalación y Configuración

### Requisitos Previos

```bash
npm install @playwright/test --save-dev
npm install @types/node --save-dev
```

### Estructura de Archivos

```
playwrightdemo/
├── utils/
│   └── AccesibilidadHelper.ts    # Clase principal
├── tests/
│   └── ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts  # Pruebas de ejemplo
└── README-Accesibilidad.md        # Esta documentación
```

## Uso Básico

### Ejemplo 1: Verificación Simple

```typescript
import { test } from '@playwright/test';
import { AccesibilidadHelper } from '../utils/AccesibilidadHelper';

test('verificar accesibilidad básica', async ({ page }) => {
  await page.goto('https://tu-aplicacion.com');
  
  // Crear instancia del helper
  const accesibilidad = new AccesibilidadHelper(page);
  
  // Verificar un botón
  const boton = page.getByRole('button', { name: 'Enviar' });
  await accesibilidad.verificarNombreAccesible(boton);
  await accesibilidad.verificarNavegacionTeclado(boton);
  
  // Generar reporte
  const reporte = accesibilidad.generarReporte();
  console.log(`Exitosas: ${reporte.exitosos}, Fallidas: ${reporte.fallidos}`);
});
```

### Ejemplo 2: Verificación de Formularios

```typescript
test('verificar formulario accesible', async ({ page }) => {
  await page.goto('https://tu-aplicacion.com/formulario');
  
  const accesibilidad = new AccesibilidadHelper(page);
  
  // Verificar campo de texto
  const campoNombre = page.locator('#nombre');
  await accesibilidad.verificarEtiquetaFormulario(campoNombre);
  
  // Verificar campo de email
  const campoEmail = page.locator('#email');
  await accesibilidad.verificarEtiquetaFormulario(campoEmail);
  
  // Mostrar reporte en consola
  accesibilidad.imprimirReporte();
});
```

### Ejemplo 3: Escaneo Completo de Página

```typescript
test('escaneo completo de accesibilidad', async ({ page }) => {
  await page.goto('https://tu-aplicacion.com');
  
  const accesibilidad = new AccesibilidadHelper(page);
  
  // Ejecutar escaneo automático
  const reporte = await accesibilidad.escanearPaginaCompleta();
  
  // Mostrar reporte detallado
  accesibilidad.imprimirReporte();
  
  // Validar tasa de éxito
  const tasaExito = (reporte.exitosos / reporte.total) * 100;
  expect(tasaExito).toBeGreaterThanOrEqual(80);
});
```

## API de la Clase

### Constructor

```typescript
constructor(page: Page)
```

Crea una instancia del helper de accesibilidad.

**Parámetros:**
- `page`: Instancia de `Page` de Playwright

### Métodos de Verificación

#### `verificarRolAria(locator: Locator, rolEsperado: string): Promise<ResultadoAccesibilidad>`

Verifica que un elemento tenga el rol ARIA correcto.

**Ejemplo:**
```typescript
await accesibilidad.verificarRolAria(page.locator('nav'), 'navigation');
```

#### `verificarAriaLabel(locator: Locator, etiquetaEsperada?: string): Promise<ResultadoAccesibilidad>`

Verifica la presencia y corrección de `aria-label`.

**Ejemplo:**
```typescript
await accesibilidad.verificarAriaLabel(page.locator('button'), 'Cerrar ventana');
```

#### `verificarNavegacionTeclado(locator: Locator): Promise<ResultadoAccesibilidad>`

Verifica que un elemento pueda recibir foco y ser navegado con teclado.

**Ejemplo:**
```typescript
await accesibilidad.verificarNavegacionTeclado(page.getByRole('button'));
```

#### `verificarNombreAccesible(locator: Locator): Promise<ResultadoAccesibilidad>`

Verifica que un elemento interactivo tenga un nombre accesible.

**Ejemplo:**
```typescript
await accesibilidad.verificarNombreAccesible(page.getByRole('link'));
```

#### `verificarTextoAlternativo(locator: Locator): Promise<ResultadoAccesibilidad>`

Verifica que las imágenes tengan atributo `alt`.

**Ejemplo:**
```typescript
await accesibilidad.verificarTextoAlternativo(page.locator('img').first());
```

#### `verificarJerarquiaEncabezados(): Promise<ResultadoAccesibilidad>`

Verifica la jerarquía correcta de encabezados en la página.

**Ejemplo:**
```typescript
await accesibilidad.verificarJerarquiaEncabezados();
```

#### `verificarEtiquetaFormulario(locator: Locator): Promise<ResultadoAccesibilidad>`

Verifica que los campos de formulario tengan etiquetas asociadas.

**Ejemplo:**
```typescript
await accesibilidad.verificarEtiquetaFormulario(page.locator('input[type="text"]'));
```

### Métodos de Reporte

#### `generarReporte(): { total: number; exitosos: number; fallidos: number; resultados: ResultadoAccesibilidad[] }`

Genera un reporte con todas las verificaciones realizadas.

#### `imprimirReporte(): void`

Imprime un reporte formateado en la consola.

#### `limpiarResultados(): void`

Limpia todos los resultados almacenados.

#### `escanearPaginaCompleta(): Promise<ReporteAccesibilidad>`

Ejecuta un escaneo automático de toda la página.

## Interfaces

### `ResultadoAccesibilidad`

```typescript
interface ResultadoAccesibilidad {
  exitoso: boolean;
  mensaje: string;
  elemento?: string;
  detalles?: string;
}
```

## Convenciones de Nombres de Pruebas

Siguiendo las mejores prácticas para DOTNET CONF 2025, los nombres de las pruebas siguen el formato:

```
COMPONENTE__CATEGORIA__RESULTADO_ESPERADO
```

**Ejemplos:**
- `TODOAPP__ACCESIBILIDAD__VERIFICAR_ELEMENTOS_PRINCIPALES`
- `FORMULARIO__ACCESIBILIDAD__VERIFICAR_ETIQUETAS`
- `NAVEGACION__ACCESIBILIDAD__TECLADO_COMPLETO`

## Ejecutar las Pruebas

### Ejecutar todas las pruebas de accesibilidad:

```bash
npx playwright test ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts
```

### Ejecutar una prueba específica:

```bash
npx playwright test -g "TODOAPP__ACCESIBILIDAD__VERIFICAR_ELEMENTOS_PRINCIPALES"
```

### Ejecutar con diferentes navegadores:

```bash
# Solo Chrome
npx playwright test --project=chromium ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts

# Solo Firefox
npx playwright test --project=firefox ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts

# Solo Safari
npx playwright test --project=webkit ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts
```

### Ejecutar con trace para debugging:

```bash
npx playwright test --trace on ACCESIBILIDAD__EXPLORATORIO__DOTNETCONF2025.spec.ts
```

## Estándares de Accesibilidad Verificados

La clase verifica el cumplimiento de los siguientes criterios WCAG 2.1:

- **1.1.1 Contenido no textual**: Verificación de texto alternativo en imágenes
- **1.3.1 Información y relaciones**: Verificación de estructura semántica y roles ARIA
- **2.1.1 Teclado**: Verificación de accesibilidad por teclado
- **2.4.1 Bloques de salto**: Verificación de estructura de encabezados
- **2.4.6 Encabezados y etiquetas**: Verificación de etiquetas descriptivas
- **3.3.2 Etiquetas o instrucciones**: Verificación de etiquetas en formularios
- **4.1.2 Nombre, función, valor**: Verificación de nombres accesibles

## Mejores Prácticas

1. **Ejecutar verificaciones temprano**: Integre las pruebas de accesibilidad en su pipeline de CI/CD
2. **Verificar en múltiples navegadores**: Use los tres proyectos (chromium, firefox, webkit)
3. **Revisar reportes regularmente**: Analice los reportes generados para identificar patrones
4. **Combinar con revisiones manuales**: Las herramientas automatizadas detectan ~30-40% de problemas
5. **Documentar excepciones**: Si algo falla intencionalmente, documente el motivo

## Solución de Problemas

### Problema: El elemento no puede recibir foco

**Solución**: Asegúrese de que el elemento sea naturalmente enfocable (botón, enlace, input) o agregue `tabindex="0"`.

### Problema: Jerarquía de encabezados fallida

**Solución**: Revise que los encabezados vayan en orden (h1, h2, h3) sin saltos.

### Problema: Imagen sin texto alternativo

**Solución**: Agregue atributo `alt` a todas las imágenes. Use `alt=""` para imágenes decorativas.

## Recursos Adicionales

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Accessibility Testing](https://playwright.dev/docs/accessibility-testing)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM - Web Accessibility In Mind](https://webaim.org/)

## Contribuir

Para contribuir mejoras a esta clase:

1. Fork el repositorio
2. Cree una rama para su feature (`git checkout -b feature/nueva-verificacion`)
3. Haga commit de sus cambios (`git commit -m 'Agregar nueva verificación'`)
4. Push a la rama (`git push origin feature/nueva-verificacion`)
5. Abra un Pull Request

## Licencia

Este código es parte del proyecto Playwright Demo y está disponible para uso educativo y comercial.

## Contacto y Soporte

Para preguntas o soporte relacionado con DOTNET CONF 2025:
- Email (ejemplo): soporte@dotnetconf.com
- Twitter: @dotnetconf
- GitHub Issues: [Crear issue](https://github.com/davihern/playwrightdemo/issues)

---

**Desarrollado con ❤️ para DOTNET CONF 2025**

*Última actualización: Noviembre 2025*
