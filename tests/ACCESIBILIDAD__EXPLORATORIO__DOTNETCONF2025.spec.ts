// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
/**
 * Pruebas de accesibilidad exploratorias para DOTNET CONF 2025
 * 
 * Este archivo demuestra el uso de la clase AccesibilidadHelper para realizar
 * pruebas de accesibilidad en aplicaciones web utilizando Playwright.
 * 
 * Propósito: Validar que las aplicaciones cumplan con los estándares de accesibilidad
 * WCAG 2.1 y sean utilizables por personas con discapacidades.
 * 
 * Alcance: Verificación de roles ARIA, navegación por teclado, etiquetas de formularios,
 * texto alternativo en imágenes y jerarquía de encabezados.
 */

import { test, expect } from '@playwright/test';
import { AccesibilidadHelper } from '../utils/AccesibilidadHelper';

test.describe('Pruebas de Accesibilidad - DOTNET CONF 2025', () => {
  
  test('TODOAPP__ACCESIBILIDAD__VERIFICAR_ELEMENTOS_PRINCIPALES', async ({ page }) => {
    // Navegar a la aplicación de prueba
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Verificar que el campo de entrada tenga un nombre accesible
    const campoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
    await accesibilidad.verificarNombreAccesible(campoInput);
    
    // Verificar que el campo sea navegable por teclado
    await accesibilidad.verificarNavegacionTeclado(campoInput);
    
    // Agregar una tarea para probar más elementos
    await campoInput.fill('Tarea de prueba para accesibilidad');
    await campoInput.press('Enter');
    
    // Verificar que el checkbox tenga nombre accesible
    const checkbox = page.getByRole('checkbox', { name: 'Toggle Todo' });
    await accesibilidad.verificarNombreAccesible(checkbox);
    await accesibilidad.verificarNavegacionTeclado(checkbox);
    
    // Generar y mostrar reporte
    const reporte = accesibilidad.generarReporte();
    console.log(`\nReporte de Accesibilidad:`);
    console.log(`Total de verificaciones: ${reporte.total}`);
    console.log(`Exitosas: ${reporte.exitosos}`);
    console.log(`Fallidas: ${reporte.fallidos}`);
    accesibilidad.imprimirReporte();
    
    // Validar que todas las verificaciones fueron exitosas
    expect(reporte.fallidos).toBe(0);
    expect(reporte.exitosos).toBeGreaterThan(0);
  });

  test('MICROSOFT__ACCESIBILIDAD__ESCANEO_COMPLETO', async ({ page }) => {
    // Navegar a microsoft.com
    await page.goto('https://www.microsoft.com');
    
    // Esperar a que la página cargue completamente
    await page.waitForLoadState('networkidle');
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Verificar jerarquía de encabezados
    await accesibilidad.verificarJerarquiaEncabezados();
    
    // Verificar el logo de Microsoft (debe tener texto alternativo)
    const logo = page.locator('img[alt*="Microsoft"], img[alt*="microsoft"]').first();
    if (await logo.count() > 0) {
      await accesibilidad.verificarTextoAlternativo(logo);
    }
    
    // Verificar enlaces principales
    const enlacesPrincipales = await page.locator('a[href]').all();
    const enlacesAVerificar = enlacesPrincipales.slice(0, 5); // Verificar los primeros 5 enlaces
    
    for (const enlace of enlacesAVerificar) {
      await accesibilidad.verificarNombreAccesible(enlace);
      await accesibilidad.verificarNavegacionTeclado(enlace);
    }
    
    // Generar reporte
    const reporte = accesibilidad.generarReporte();
    accesibilidad.imprimirReporte();
    
    // Validación: Al menos el 80% de las verificaciones deben ser exitosas
    const tasaExito = (reporte.exitosos / reporte.total) * 100;
    console.log(`\nTasa de éxito: ${tasaExito.toFixed(2)}%`);
    expect(tasaExito).toBeGreaterThanOrEqual(80);
  });

  test('FORMULARIO__ACCESIBILIDAD__VERIFICAR_ETIQUETAS', async ({ page }) => {
    // Navegar a una página con formulario
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Verificar el campo de entrada del formulario
    const campoInput = page.getByRole('textbox');
    
    // Verificar que tenga nombre accesible
    const resultadoNombre = await accesibilidad.verificarNombreAccesible(campoInput);
    expect(resultadoNombre.exitoso).toBe(true);
    
    // Verificar navegación por teclado
    const resultadoTeclado = await accesibilidad.verificarNavegacionTeclado(campoInput);
    expect(resultadoTeclado.exitoso).toBe(true);
    
    // Mostrar reporte
    accesibilidad.imprimirReporte();
  });

  test('IMAGENES__ACCESIBILIDAD__TEXTO_ALTERNATIVO', async ({ page }) => {
    // Navegar a una página con imágenes
    await page.goto('https://www.microsoft.com');
    await page.waitForLoadState('networkidle');
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Obtener todas las imágenes visibles
    const imagenes = await page.locator('img').all();
    console.log(`\nTotal de imágenes encontradas: ${imagenes.length}`);
    
    // Verificar las primeras 10 imágenes
    const imagenesAVerificar = imagenes.slice(0, Math.min(10, imagenes.length));
    
    for (const imagen of imagenesAVerificar) {
      await accesibilidad.verificarTextoAlternativo(imagen);
    }
    
    // Generar reporte
    const reporte = accesibilidad.generarReporte();
    accesibilidad.imprimirReporte();
    
    // Al menos 70% de las imágenes deben tener alt correcto
    const tasaExito = (reporte.exitosos / reporte.total) * 100;
    console.log(`\nTasa de éxito en imágenes: ${tasaExito.toFixed(2)}%`);
    expect(tasaExito).toBeGreaterThanOrEqual(70);
  });

  test('NAVEGACION__ACCESIBILIDAD__TECLADO_COMPLETO', async ({ page }) => {
    // Navegar a la aplicación de prueba
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Verificar que el campo principal sea navegable
    const campoInput = page.getByRole('textbox');
    await accesibilidad.verificarNavegacionTeclado(campoInput);
    
    // Agregar tareas usando solo el teclado
    await campoInput.fill('Tarea 1 - Navegación por teclado');
    await campoInput.press('Enter');
    
    await campoInput.fill('Tarea 2 - Verificación de accesibilidad');
    await campoInput.press('Enter');
    
    // Verificar que los checkboxes sean navegables
    const checkboxes = await page.getByRole('checkbox').all();
    
    for (const checkbox of checkboxes) {
      const resultado = await accesibilidad.verificarNavegacionTeclado(checkbox);
      expect(resultado.exitoso).toBe(true);
    }
    
    // Generar reporte final
    const reporte = accesibilidad.generarReporte();
    accesibilidad.imprimirReporte();
    
    // Todas las verificaciones deben ser exitosas
    expect(reporte.fallidos).toBe(0);
  });

  test('ARIA__ACCESIBILIDAD__ROLES_CORRECTOS', async ({ page }) => {
    // Crear una página de prueba con roles ARIA
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Prueba de Roles ARIA</title>
      </head>
      <body>
        <header role="banner">
          <h1>Título Principal</h1>
          <nav role="navigation">
            <ul>
              <li><a href="#home">Inicio</a></li>
              <li><a href="#about">Acerca de</a></li>
            </ul>
          </nav>
        </header>
        <main role="main">
          <article role="article">
            <h2>Artículo de Ejemplo</h2>
            <p>Este es un artículo de prueba.</p>
          </article>
          <aside role="complementary">
            <h3>Información Adicional</h3>
          </aside>
        </main>
        <footer role="contentinfo">
          <p>© 2025 DOTNET CONF</p>
        </footer>
      </body>
      </html>
    `);
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Verificar roles ARIA
    await accesibilidad.verificarRolAria(page.locator('header'), 'banner');
    await accesibilidad.verificarRolAria(page.locator('nav'), 'navigation');
    await accesibilidad.verificarRolAria(page.locator('main'), 'main');
    await accesibilidad.verificarRolAria(page.locator('article'), 'article');
    await accesibilidad.verificarRolAria(page.locator('aside'), 'complementary');
    await accesibilidad.verificarRolAria(page.locator('footer'), 'contentinfo');
    
    // Verificar jerarquía de encabezados
    await accesibilidad.verificarJerarquiaEncabezados();
    
    // Generar reporte
    const reporte = accesibilidad.generarReporte();
    accesibilidad.imprimirReporte();
    
    // Todas las verificaciones deben ser exitosas
    expect(reporte.fallidos).toBe(0);
    expect(reporte.exitosos).toBe(7); // 6 roles + jerarquía de encabezados
  });

  test('ESCANEO__ACCESIBILIDAD__PAGINA_COMPLETA', async ({ page }) => {
    // Navegar a una página para escaneo completo
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    
    // Crear instancia del helper de accesibilidad
    const accesibilidad = new AccesibilidadHelper(page);
    
    // Agregar contenido para tener más elementos que escanear
    const campoInput = page.getByRole('textbox');
    await campoInput.fill('Tarea de prueba 1');
    await campoInput.press('Enter');
    await campoInput.fill('Tarea de prueba 2');
    await campoInput.press('Enter');
    
    // Ejecutar escaneo completo
    console.log('\n🔍 Iniciando escaneo completo de accesibilidad...\n');
    const reporte = await accesibilidad.escanearPaginaCompleta();
    
    // Mostrar reporte
    accesibilidad.imprimirReporte();
    
    // Validaciones
    expect(reporte.total).toBeGreaterThan(0);
    console.log(`\n📊 Resumen del escaneo:`);
    console.log(`   Total: ${reporte.total}`);
    console.log(`   ✓ Exitosas: ${reporte.exitosos}`);
    console.log(`   ✗ Fallidas: ${reporte.fallidos}`);
    
    const tasaExito = (reporte.exitosos / reporte.total) * 100;
    console.log(`   📈 Tasa de éxito: ${tasaExito.toFixed(2)}%\n`);
  });
});
