# Paquete de referencia para Figma

El archivo nativo y su enlace están pendientes. Las seis referencias se capturaron en Chromium contra la compilación del refinamiento institucional, con datos ficticios de QA. Cada PNG conserva la página completa, incluido el contenido visible mediante desplazamiento.

| Frame | Viewport | Referencia |
| --- | --- | --- |
| 01 · Desktop — principal | 1440 × 1000 | [PNG](01-desktop-principal.png) |
| 02 · Desktop — Nueva actividad | 1440 × 1000 | [PNG](02-desktop-nueva-actividad.png) |
| 03 · Desktop — actividades | 1440 × 1000 | [PNG](03-desktop-actividades.png) |
| 04 · Desktop — edición | 1440 × 1000 | [PNG](04-desktop-edicion.png) |
| 05 · Mobile — principal | 390 × 844 | [PNG](05-mobile-principal.png) |
| 06 · Mobile — formulario/listado | 390 × 844 | [PNG](06-mobile-formulario-listado.png) |
| 07 · Sistema de diseño | 1200 × 950 | [Lámina vectorial](07-sistema-de-diseno.svg) |

Para incorporarlos, crea las páginas «Pantallas» y «Sistema de diseño». En «Pantallas», instancia seis frames con los viewports de la tabla y coloca su referencia a escala 1:1. Usa el PNG como guía para reconstruir capas editables y coloca el contenido en un frame interior con desplazamiento vertical. En «Sistema de diseño», importa el SVG como referencia y define estilos y componentes a partir de los valores documentados.

El [CSS](../../src/styles.css) es la fuente de los valores y la [especificación](../FIGMA_SPEC.md) contiene los textos y variantes. Como evidencia adicional, están disponibles el [filtro combinado en escritorio](../assets/desktop-filtros.png) y el [estado sin coincidencias con foco visible en móvil](../assets/movil-filtros-vacio.png).
