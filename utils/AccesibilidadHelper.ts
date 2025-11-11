// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025
/**
 * Clase utilitaria para pruebas de accesibilidad en Playwright
 * 
 * Esta clase proporciona métodos para verificar y validar aspectos de accesibilidad
 * en aplicaciones web, personalizada para las pruebas exploratorias de DOTNET CONF 2025.
 * 
 * @author Playwright Testing Team
 * @version 1.0.0
 * @customized DOTNET CONF 2025
 */

import { Page, Locator, expect } from '@playwright/test';

/**
 * Interfaz para los resultados de verificación de accesibilidad
 */
export interface ResultadoAccesibilidad {
  exitoso: boolean;
  mensaje: string;
  elemento?: string;
  detalles?: string;
}

/**
 * Interfaz para opciones de verificación de contraste
 */
export interface OpcionesContraste {
  umbralMinimo?: number;
  incluirSubelementos?: boolean;
}

/**
 * Clase principal para pruebas de accesibilidad
 * Proporciona métodos utilitarios para verificar cumplimiento de estándares WCAG
 */
export class AccesibilidadHelper {
  private page: Page;
  private resultados: ResultadoAccesibilidad[] = [];

  /**
   * Constructor de la clase AccesibilidadHelper
   * @param page - Instancia de Page de Playwright
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Verifica que un elemento tenga un rol ARIA válido
   * @param locator - Localizador del elemento a verificar
   * @param rolEsperado - Rol ARIA esperado
   * @returns Promise con el resultado de la verificación
   */
  async verificarRolAria(locator: Locator, rolEsperado: string): Promise<ResultadoAccesibilidad> {
    try {
      await expect(locator).toHaveAttribute('role', rolEsperado);
      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: `Elemento tiene el rol ARIA correcto: ${rolEsperado}`,
        elemento: await this.obtenerDescripcionElemento(locator)
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: `Error: Elemento no tiene el rol ARIA esperado`,
        elemento: await this.obtenerDescripcionElemento(locator),
        detalles: `Se esperaba: ${rolEsperado}`
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Verifica que un elemento tenga una etiqueta aria-label
   * @param locator - Localizador del elemento a verificar
   * @param etiquetaEsperada - Etiqueta esperada (opcional)
   * @returns Promise con el resultado de la verificación
   */
  async verificarAriaLabel(locator: Locator, etiquetaEsperada?: string): Promise<ResultadoAccesibilidad> {
    try {
      const ariaLabel = await locator.getAttribute('aria-label');
      
      if (!ariaLabel) {
        throw new Error('No se encontró aria-label');
      }

      if (etiquetaEsperada && ariaLabel !== etiquetaEsperada) {
        throw new Error(`Etiqueta no coincide. Encontrada: ${ariaLabel}, Esperada: ${etiquetaEsperada}`);
      }

      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: `Elemento tiene aria-label válido: "${ariaLabel}"`,
        elemento: await this.obtenerDescripcionElemento(locator)
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: `Error: Problema con aria-label`,
        elemento: await this.obtenerDescripcionElemento(locator),
        detalles: error instanceof Error ? error.message : 'Error desconocido'
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Verifica que un elemento sea navegable por teclado
   * @param locator - Localizador del elemento a verificar
   * @returns Promise con el resultado de la verificación
   */
  async verificarNavegacionTeclado(locator: Locator): Promise<ResultadoAccesibilidad> {
    try {
      await locator.focus();
      const estaEnfocado = await locator.evaluate((el) => el === document.activeElement);
      
      if (!estaEnfocado) {
        throw new Error('Elemento no puede recibir foco');
      }

      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: 'Elemento es navegable por teclado',
        elemento: await this.obtenerDescripcionElemento(locator)
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: 'Error: Elemento no es navegable por teclado',
        elemento: await this.obtenerDescripcionElemento(locator),
        detalles: error instanceof Error ? error.message : 'Error desconocido'
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Verifica que un elemento interactivo tenga un nombre accesible
   * @param locator - Localizador del elemento a verificar
   * @returns Promise con el resultado de la verificación
   */
  async verificarNombreAccesible(locator: Locator): Promise<ResultadoAccesibilidad> {
    try {
      const nombreAccesible = await locator.evaluate((el) => {
        // Intenta obtener el nombre accesible de varias formas
        const ariaLabel = el.getAttribute('aria-label');
        const ariaLabelledBy = el.getAttribute('aria-labelledby');
        const title = el.getAttribute('title');
        const innerText = el.textContent?.trim();
        
        return ariaLabel || ariaLabelledBy || title || innerText || null;
      });

      if (!nombreAccesible) {
        throw new Error('No se encontró nombre accesible');
      }

      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: `Elemento tiene nombre accesible: "${nombreAccesible}"`,
        elemento: await this.obtenerDescripcionElemento(locator)
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: 'Error: Elemento no tiene nombre accesible',
        elemento: await this.obtenerDescripcionElemento(locator),
        detalles: 'Se requiere aria-label, aria-labelledby, title o texto visible'
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Verifica que las imágenes tengan texto alternativo
   * @param locator - Localizador de la imagen a verificar
   * @returns Promise con el resultado de la verificación
   */
  async verificarTextoAlternativo(locator: Locator): Promise<ResultadoAccesibilidad> {
    try {
      const alt = await locator.getAttribute('alt');
      
      if (alt === null) {
        throw new Error('Atributo alt no presente');
      }

      // Alt puede ser vacío para imágenes decorativas, eso es válido
      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: alt === '' 
          ? 'Imagen decorativa correctamente marcada (alt vacío)' 
          : `Imagen tiene texto alternativo: "${alt}"`,
        elemento: await this.obtenerDescripcionElemento(locator)
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: 'Error: Imagen no tiene atributo alt',
        elemento: await this.obtenerDescripcionElemento(locator),
        detalles: 'Todas las imágenes deben tener un atributo alt (puede estar vacío para imágenes decorativas)'
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Verifica que los encabezados tengan una jerarquía correcta
   * @returns Promise con el resultado de la verificación
   */
  async verificarJerarquiaEncabezados(): Promise<ResultadoAccesibilidad> {
    try {
      const encabezados = await this.page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        return headings.map(h => ({
          nivel: parseInt(h.tagName.substring(1)),
          texto: h.textContent?.trim() || ''
        }));
      });

      if (encabezados.length === 0) {
        const resultado: ResultadoAccesibilidad = {
          exitoso: false,
          mensaje: 'Error: No se encontraron encabezados en la página',
          detalles: 'Se recomienda usar encabezados para estructurar el contenido'
        };
        this.resultados.push(resultado);
        return resultado;
      }

      // Verificar que empiece con h1
      if (encabezados[0].nivel !== 1) {
        throw new Error('La página no comienza con un h1');
      }

      // Verificar que no haya saltos en la jerarquía
      for (let i = 1; i < encabezados.length; i++) {
        const diferencia = encabezados[i].nivel - encabezados[i - 1].nivel;
        if (diferencia > 1) {
          throw new Error(`Salto en jerarquía: de h${encabezados[i - 1].nivel} a h${encabezados[i].nivel}`);
        }
      }

      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: `Jerarquía de encabezados correcta (${encabezados.length} encabezados encontrados)`,
        detalles: `Niveles: ${encabezados.map(h => `h${h.nivel}`).join(', ')}`
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: 'Error en jerarquía de encabezados',
        detalles: error instanceof Error ? error.message : 'Error desconocido'
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Verifica que los formularios tengan etiquetas asociadas
   * @param locator - Localizador del campo de formulario
   * @returns Promise con el resultado de la verificación
   */
  async verificarEtiquetaFormulario(locator: Locator): Promise<ResultadoAccesibilidad> {
    try {
      const tieneEtiqueta = await locator.evaluate((el) => {
        // Verificar si tiene un label asociado
        const id = el.id;
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (label) return true;
        }
        
        // Verificar si está dentro de un label
        const parent = el.closest('label');
        if (parent) return true;
        
        // Verificar si tiene aria-label o aria-labelledby
        if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) {
          return true;
        }
        
        return false;
      });

      if (!tieneEtiqueta) {
        throw new Error('Campo no tiene etiqueta asociada');
      }

      const resultado: ResultadoAccesibilidad = {
        exitoso: true,
        mensaje: 'Campo de formulario tiene etiqueta correctamente asociada',
        elemento: await this.obtenerDescripcionElemento(locator)
      };
      this.resultados.push(resultado);
      return resultado;
    } catch (error) {
      const resultado: ResultadoAccesibilidad = {
        exitoso: false,
        mensaje: 'Error: Campo de formulario sin etiqueta',
        elemento: await this.obtenerDescripcionElemento(locator),
        detalles: 'Use <label>, aria-label o aria-labelledby'
      };
      this.resultados.push(resultado);
      return resultado;
    }
  }

  /**
   * Genera un reporte completo de todas las verificaciones realizadas
   * @returns Objeto con el resumen del reporte
   */
  generarReporte(): { total: number; exitosos: number; fallidos: number; resultados: ResultadoAccesibilidad[] } {
    const exitosos = this.resultados.filter(r => r.exitoso).length;
    const fallidos = this.resultados.filter(r => !r.exitoso).length;
    
    return {
      total: this.resultados.length,
      exitosos,
      fallidos,
      resultados: [...this.resultados]
    };
  }

  /**
   * Imprime el reporte en consola de forma formateada
   */
  imprimirReporte(): void {
    const reporte = this.generarReporte();
    
    console.log('\n' + '='.repeat(80));
    console.log('REPORTE DE ACCESIBILIDAD - DOTNET CONF 2025');
    console.log('='.repeat(80));
    console.log(`Total de verificaciones: ${reporte.total}`);
    console.log(`✓ Exitosas: ${reporte.exitosos}`);
    console.log(`✗ Fallidas: ${reporte.fallidos}`);
    console.log('='.repeat(80) + '\n');

    reporte.resultados.forEach((resultado, index) => {
      const icono = resultado.exitoso ? '✓' : '✗';
      console.log(`${index + 1}. ${icono} ${resultado.mensaje}`);
      if (resultado.elemento) {
        console.log(`   Elemento: ${resultado.elemento}`);
      }
      if (resultado.detalles) {
        console.log(`   Detalles: ${resultado.detalles}`);
      }
      console.log('');
    });
  }

  /**
   * Limpia todos los resultados almacenados
   */
  limpiarResultados(): void {
    this.resultados = [];
  }

  /**
   * Método auxiliar para obtener una descripción del elemento
   * @param locator - Localizador del elemento
   * @returns Descripción en texto del elemento
   */
  private async obtenerDescripcionElemento(locator: Locator): Promise<string> {
    try {
      const descripcion = await locator.evaluate((el) => {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
        const texto = el.textContent?.trim().substring(0, 30) || '';
        return `<${tag}${id}${classes}>${texto ? ` "${texto}..."` : ''}`;
      });
      return descripcion;
    } catch {
      return 'Elemento no disponible';
    }
  }

  /**
   * Ejecuta un escaneo completo de accesibilidad en la página actual
   * @returns Promise con el reporte completo
   */
  async escanearPaginaCompleta(): Promise<{ total: number; exitosos: number; fallidos: number; resultados: ResultadoAccesibilidad[] }> {
    // Verificar jerarquía de encabezados
    await this.verificarJerarquiaEncabezados();

    // Verificar todas las imágenes
    const imagenes = await this.page.locator('img').all();
    for (const img of imagenes) {
      await this.verificarTextoAlternativo(img);
    }

    // Verificar todos los campos de formulario
    const camposInput = await this.page.locator('input:not([type="hidden"]), textarea, select').all();
    for (const campo of camposInput) {
      await this.verificarEtiquetaFormulario(campo);
    }

    // Verificar elementos interactivos
    const elementosInteractivos = await this.page.locator('button, a[href], input[type="button"], input[type="submit"]').all();
    for (const elemento of elementosInteractivos) {
      await this.verificarNombreAccesible(elemento);
    }

    return this.generarReporte();
  }
}
