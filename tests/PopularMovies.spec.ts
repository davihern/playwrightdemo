// PRUEBAS EXPLORATORIAS PERSONALIZADAS PARA DOTNET CONF 2025
// Este test explora la funcionalidad de películas populares
// en la aplicación de películas de Playwright Demo.
// Objetivo: Navegar a Popular, seleccionar la primera película,
// capturar información del elenco y guardarla en un archivo, y tomar una captura de pantalla.

import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('POPULARMOVIES__FIRSTMOVIE__CASTLOGGED', () => {

  test('navegar_a_popular__seleccionar_primera_pelicula__registrar_elenco_y_capturar', async ({ page }, testInfo) => {
    // Navegar a la aplicación de películas
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Esperar a que la página cargue
    await expect(page.locator('main')).toBeVisible();
    
    // Navegar a Popular - buscar el enlace en la navegación
    const popularLink = page.getByRole('link', { name: /popular/i });
    await expect(popularLink).toBeVisible();
    await popularLink.click();
    
    // Esperar a que la página de Popular cargue
    await page.waitForLoadState('networkidle');
    
    // Obtener todas las películas
    const movieLinks = page.locator('a[href*="/movie?id="]');
    await expect(movieLinks.first()).toBeVisible();
    const movieCount = await movieLinks.count();
    
    console.log(`Total de películas populares encontradas: ${movieCount}`);
    expect(movieCount).toBeGreaterThan(0);
    
    // Seleccionar la primera película (la más popular)
    console.log('Seleccionando la película más popular (primera en la lista)');
    await movieLinks.first().click();
    
    // Esperar a que los detalles de la película se carguen
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Obtener el título de la película
    const movieTitle = await page.locator('h1').first().textContent();
    console.log(`Título de la película: ${movieTitle}`);
    
    // Obtener la duración de la película
    const durationElement = page.getByLabel('duration');
    await expect(durationElement).toBeVisible();
    const durationText = await durationElement.textContent();
    
    console.log(`Duración de la película: ${durationText}`);
    
    // Obtener información del elenco (primeros 5 actores)
    const castMembers = page.locator('img[alt*=""]').filter({ hasText: /.+/ });
    const castCount = await castMembers.count();
    console.log(`Miembros del elenco encontrados: ${castCount}`);
    
    // Obtener la calificación
    const ratingElement = page.locator('text=/★/').first();
    const hasRating = await ratingElement.count();
    let ratingText = 'No disponible';
    if (hasRating > 0) {
      ratingText = await ratingElement.textContent() || 'No disponible';
    }
    console.log(`Calificación: ${ratingText}`);
    
    // Crear el contenido para el archivo de texto
    const logContent = `=== INFORMACIÓN DE PELÍCULA POPULAR ===
Película: ${movieTitle}
Duración: ${durationText}
Calificación: ${ratingText}
Número de miembros del elenco: ${castCount}
Fecha de consulta: ${new Date().toISOString()}
==========================================
`;
    
    // Guardar la información en un archivo de texto usando el directorio de salida de Playwright
    const logFilePath = testInfo.outputPath('popular-movie-info.txt');
    fs.writeFileSync(logFilePath, logContent, 'utf-8');
    console.log(`Información guardada en: ${logFilePath}`);
    
    // Adjuntar el contenido al reporte de test
    await testInfo.attach('popular-movie-info.txt', { body: logContent, contentType: 'text/plain' });
    
    // Capturar una captura de pantalla
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('captura-pelicula-popular', { body: screenshot, contentType: 'image/png' });
    console.log('Captura de pantalla tomada y adjunta al reporte');
    
    // Verificaciones adicionales
    expect(movieTitle).toBeTruthy();
    expect(durationText).toMatch(/\d+\s*min/i);
    expect(castCount).toBeGreaterThan(0);
  });

});
