// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
/**
 * Ejemplo de uso rápido de la clase AccesibilidadHelper
 * 
 * Este archivo contiene ejemplos simples y directos de cómo usar
 * la clase de accesibilidad en tus propias pruebas.
 */

import { test, expect } from '@playwright/test';
import { AccesibilidadHelper } from '../utils/AccesibilidadHelper';

/**
 * Ejemplo 1: Uso básico - Verificar un solo elemento
 */
test('EJEMPLO__BASICO__VERIFICAR_BOTON', async ({ page }) => {
  // Crear una página de prueba simple
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="es">
    <body>
      <button aria-label="Cerrar ventana">X</button>
    </body>
    </html>
  `);

  // Crear instancia del helper
  const accesibilidad = new AccesibilidadHelper(page);
  
  // Verificar el botón
  const boton = page.locator('button');
  await accesibilidad.verificarAriaLabel(boton, 'Cerrar ventana');
  await accesibilidad.verificarNavegacionTeclado(boton);
  
  // Mostrar reporte
  accesibilidad.imprimirReporte();
  
  // Validar resultados
  const reporte = accesibilidad.generarReporte();
  expect(reporte.fallidos).toBe(0);
});

/**
 * Ejemplo 2: Verificar formulario
 */
test('EJEMPLO__FORMULARIO__CAMPOS_ACCESIBLES', async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="es">
    <body>
      <form>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" />
        
        <label for="email">Email:</label>
        <input type="email" id="email" />
        
        <button type="submit">Enviar</button>
      </form>
    </body>
    </html>
  `);

  const accesibilidad = new AccesibilidadHelper(page);
  
  // Verificar campos
  await accesibilidad.verificarEtiquetaFormulario(page.locator('#nombre'));
  await accesibilidad.verificarEtiquetaFormulario(page.locator('#email'));
  
  // Verificar botón
  await accesibilidad.verificarNombreAccesible(page.locator('button'));
  
  accesibilidad.imprimirReporte();
});

/**
 * Ejemplo 3: Verificar imágenes
 */
test('EJEMPLO__IMAGENES__TEXTO_ALTERNATIVO', async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="es">
    <body>
      <img src="logo.png" alt="Logo de la empresa" />
      <img src="decoracion.png" alt="" />
    </body>
    </html>
  `);

  const accesibilidad = new AccesibilidadHelper(page);
  
  // Verificar ambas imágenes
  const imagenes = await page.locator('img').all();
  for (const img of imagenes) {
    await accesibilidad.verificarTextoAlternativo(img);
  }
  
  accesibilidad.imprimirReporte();
  
  // Ambas deben pasar (alt vacío es válido para imágenes decorativas)
  const reporte = accesibilidad.generarReporte();
  expect(reporte.exitosos).toBe(2);
});

/**
 * Ejemplo 4: Escaneo completo
 */
test('EJEMPLO__ESCANEO__PAGINA_COMPLETA', async ({ page }) => {
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="es">
    <body>
      <h1>Título Principal</h1>
      <h2>Subtítulo</h2>
      
      <form>
        <label for="buscar">Buscar:</label>
        <input type="search" id="buscar" />
        <button type="submit">Buscar</button>
      </form>
      
      <img src="ejemplo.jpg" alt="Imagen de ejemplo" />
    </body>
    </html>
  `);

  const accesibilidad = new AccesibilidadHelper(page);
  
  // Ejecutar escaneo automático
  const reporte = await accesibilidad.escanearPaginaCompleta();
  
  // Mostrar reporte
  accesibilidad.imprimirReporte();
  
  console.log(`\nResumen: ${reporte.exitosos}/${reporte.total} verificaciones exitosas`);
});
