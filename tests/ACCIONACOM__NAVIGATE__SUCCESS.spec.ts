// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Descripción:
 * Esta prueba exploratoria verifica la navegación a https://www.acciona.com/es/.
 * Comprueba que la página carga correctamente, valida la presencia de la marca ACCIONA,
 * confirma que las secciones de navegación principales son visibles y captura
 * capturas de pantalla y vídeos para documentación y análisis posterior.
 */

import { test, expect } from '@playwright/test';

test.describe('Navegación a Acciona.com en español', () => {

  test('ACCIONACOM__NAVEGAR__EXITO', async ({ page }) => {
    await page.goto('https://www.acciona.com/es/');
    await expect(page).toHaveTitle(/ACCIONA/i);

    // Captura de pantalla tras cargar la página
    await page.screenshot({ path: 'screenshots/acciona-inicio.png', fullPage: true });
  });

  test('ACCIONACOM__LOGO__VISIBLE', async ({ page }) => {
    await page.goto('https://www.acciona.com/es/');

    // Verificar que el logotipo o enlace de marca ACCIONA es visible en la cabecera
    const logo = page.locator('a[aria-label*="ACCIONA"], a[title*="ACCIONA"], header img[alt*="ACCIONA"], img[alt*="acciona"]').first();
    await expect(logo).toBeVisible();

    await page.screenshot({ path: 'screenshots/acciona-logo.png' });
  });

  test('ACCIONACOM__NAVEGACION__SECCIONES_VISIBLES', async ({ page }) => {
    await page.goto('https://www.acciona.com/es/');

    // Verificar que las secciones de navegación principales están presentes
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();

    await page.screenshot({ path: 'screenshots/acciona-navegacion.png' });
  });

  test('ACCIONACOM__SOSTENIBILIDAD__NAVEGAR', async ({ page }) => {
    await page.goto('https://www.acciona.com/es/');

    // Verificar que el enlace de Sostenibilidad es accesible
    const sostenibilidadLink = page.getByRole('link', { name: /sostenibilidad/i }).first();
    await expect(sostenibilidadLink).toBeVisible();

    await sostenibilidadLink.click();
    await expect(page).toHaveURL(/sostenibilidad/i);

    await page.screenshot({ path: 'screenshots/acciona-sostenibilidad.png', fullPage: true });
  });

});
