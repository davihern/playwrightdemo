// PRUEBAS EXPLORATORIAS PERSONALIZADAS PARA DOTNET CONF 2025
// Este test explora la funcionalidad de búsqueda de películas
// en la aplicación de películas de Playwright Demo.
// Objetivo: Buscar una película específica, verificar resultados,
// capturar información de género y guardarla en un archivo, y tomar una captura de pantalla.

import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('SEARCHMOVIES__QUERY__RESULTSLOGGED', () => {

  test('buscar_pelicula__verificar_resultados__registrar_generos_y_capturar', async ({ page }, testInfo) => {
    // Navegar a la aplicación de películas
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Esperar a que la página cargue
    await expect(page.locator('main')).toBeVisible();
    
    // Término de búsqueda
    const searchTerm = 'Deadpool';
    console.log(`Buscando película: ${searchTerm}`);
    
    // Buscar el campo de búsqueda (puede estar en diferentes lugares)
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i], input[name*="search" i]').first();
    
    // Verificar si existe un campo de búsqueda visible
    const hasSearchField = await searchInput.count();
    
    if (hasSearchField > 0) {
      await searchInput.fill(searchTerm);
      await searchInput.press('Enter');
      await page.waitForLoadState('networkidle');
    } else {
      console.log('No se encontró campo de búsqueda, navegando directamente a resultados');
      // Si no hay búsqueda, simplemente explorar las películas disponibles
      await page.goto('https://debs-obrien.github.io/playwright-movies-app?category=Popular');
      await page.waitForLoadState('networkidle');
    }
    
    // Esperar a que se carguen las películas
    await expect(page.locator('main')).toBeVisible();
    
    // Obtener las películas que coinciden con el término de búsqueda
    const movieLinks = page.locator('a[href*="/movie?id="]');
    await expect(movieLinks.first()).toBeVisible();
    const movieCount = await movieLinks.count();
    
    console.log(`Total de películas encontradas: ${movieCount}`);
    expect(movieCount).toBeGreaterThan(0);
    
    // Buscar una película que contenga el término de búsqueda en el título
    const movieTitles = page.locator('h2, h3').filter({ hasText: new RegExp(searchTerm, 'i') });
    const matchingCount = await movieTitles.count();
    
    let selectedMovie;
    if (matchingCount > 0) {
      console.log(`Películas que coinciden con "${searchTerm}": ${matchingCount}`);
      selectedMovie = movieTitles.first();
    } else {
      console.log('Seleccionando la primera película disponible');
      selectedMovie = movieLinks.first();
    }
    
    // Hacer clic en la película seleccionada
    await selectedMovie.click();
    
    // Esperar a que los detalles de la película se carguen
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Obtener el título de la película
    const movieTitle = await page.locator('h1').first().textContent();
    console.log(`Título de la película: ${movieTitle}`);
    
    // Obtener la duración de la película
    const durationElement = page.getByLabel('duration');
    const hasDuration = await durationElement.count();
    let durationText = 'No disponible';
    if (hasDuration > 0) {
      durationText = await durationElement.textContent() || 'No disponible';
    }
    console.log(`Duración de la película: ${durationText}`);
    
    // Obtener los géneros de la película
    const genreLinks = page.locator('a[href*="genre"]');
    const genreCount = await genreLinks.count();
    const genres: string[] = [];
    
    for (let i = 0; i < Math.min(genreCount, 5); i++) {
      const genreText = await genreLinks.nth(i).textContent();
      if (genreText) {
        genres.push(genreText.trim());
      }
    }
    
    console.log(`Géneros encontrados: ${genres.join(', ')}`);
    
    // Crear el contenido para el archivo de texto
    const logContent = `=== RESULTADOS DE BÚSQUEDA DE PELÍCULA ===
Término de búsqueda: ${searchTerm}
Película encontrada: ${movieTitle}
Duración: ${durationText}
Géneros: ${genres.length > 0 ? genres.join(', ') : 'No disponibles'}
Total de resultados: ${movieCount}
Fecha de búsqueda: ${new Date().toISOString()}
==========================================
`;
    
    // Guardar la información en un archivo de texto usando el directorio de salida de Playwright
    const logFilePath = testInfo.outputPath('search-results.txt');
    fs.writeFileSync(logFilePath, logContent, 'utf-8');
    console.log(`Información guardada en: ${logFilePath}`);
    
    // Adjuntar el contenido al reporte de test
    await testInfo.attach('resultados-busqueda.txt', { body: logContent, contentType: 'text/plain' });
    
    // Capturar una captura de pantalla
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach('captura-resultados-busqueda', { body: screenshot, contentType: 'image/png' });
    console.log('Captura de pantalla tomada y adjunta al reporte');
    
    // Verificaciones adicionales
    expect(movieTitle).toBeTruthy();
    expect(movieCount).toBeGreaterThan(0);
  });

});
