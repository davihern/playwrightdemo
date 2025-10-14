// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
// Este test explora la funcionalidad de películas mejor valoradas (Top Rated)
// en la aplicación de películas de Playwright Demo.
// Objetivo: Navegar a Top Rated, seleccionar una película aleatoria,
// capturar la duración y guardarla en un archivo, y tomar una captura de pantalla.

import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('TOPRATEDMOVIES__RANDOMSELECTION__DURATIONLOGGED', () => {

  test('navigate_to_top_rated__select_random_movie__log_duration_and_screenshot', async ({ page }, testInfo) => {
    // Navegar a la aplicación de películas
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Esperar a que la página cargue
    await expect(page.locator('main')).toBeVisible();
    
    // Navegar a Top Rated - buscar el enlace en la navegación
    const topRatedLink = page.getByRole('link', { name: /top rated/i });
    await expect(topRatedLink).toBeVisible();
    await topRatedLink.click();
    
    // Esperar a que la página de Top Rated cargue
    await page.waitForLoadState('networkidle');
    
    // Obtener todas las películas (enlaces con imágenes poster)
    const movieLinks = page.locator('a[href*="/movie?id="]');
    await expect(movieLinks.first()).toBeVisible(); // Esperar a que al menos una película sea visible
    const movieCount = await movieLinks.count();
    
    console.log(`Total de películas encontradas: ${movieCount}`);
    expect(movieCount).toBeGreaterThan(0);
    
    // Seleccionar una película aleatoria
    const randomIndex = Math.floor(Math.random() * Math.min(movieCount, 10)); // Limitar a las primeras 10 para eficiencia
    console.log(`Seleccionando película con índice: ${randomIndex}`);
    
    await movieLinks.nth(randomIndex).click();
    
    // Esperar a que los detalles de la película se carguen
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible(); // Esperar a que el título de la película sea visible
    
    // Obtener el título de la película
    const movieTitle = await page.locator('h1').first().textContent();
    console.log(`Título de la película: ${movieTitle}`);
    
    // Obtener la duración de la película
    const durationElement = page.getByLabel('duration');
    await expect(durationElement).toBeVisible();
    const durationText = await durationElement.textContent();
    
    console.log(`Duración de la película: ${durationText}`);
    
    // Crear el contenido para el archivo de texto
    const logContent = `Película: ${movieTitle}\nDuración: ${durationText}\nFecha: ${new Date().toISOString()}\n`;
    
    // Guardar la información en un archivo de texto usando el directorio de salida de Playwright
    const logFilePath = testInfo.outputPath('movie-duration.txt');
    fs.writeFileSync(logFilePath, logContent, 'utf-8');
    console.log(`Información guardada en: ${logFilePath}`);
    
    // Adjuntar el contenido al reporte de test
    await testInfo.attach('movie-duration.txt', { body: logContent, contentType: 'text/plain' });
    
    // Capturar una captura de pantalla
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    console.log('Captura de pantalla tomada y adjunta al reporte');
    
    // Verificaciones adicionales
    expect(movieTitle).toBeTruthy();
    expect(durationText).toMatch(/\d+\s*min/i); // Verificar que la duración contiene números y "min"
  });

});
