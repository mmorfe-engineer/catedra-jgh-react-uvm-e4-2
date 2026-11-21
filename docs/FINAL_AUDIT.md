# Auditoría técnica

## Estado

**PASS** para la base técnica y la segunda contribución. **PENDIENTE** para la entrega académica hasta incorporar el enlace real del video explicativo.

## Pliego y evidencia

| Área | Resultado |
| --- | --- |
| React, DOM y CRUD | React renderiza la lista y los indicadores desde el estado. Chromium verificó el ciclo completo local. |
| localStorage | La baja confirmada deja la lista vacía después de recargar. Alta y edición sobreviven a la recarga. |
| Cátedra y HTML5 | La identidad, el contenido de formación y la guía de semántica se muestran en pantalla. |
| CSS, plantillas y responsive | Hoja propia y capturas locales revisadas en tres tamaños. |
| GitHub | Código publicado en `main` del repositorio canónico. |
| Figma y video | Archivo nativo enlazado. Video pendiente de publicación. |
| Branding e identidad artística | Logo UVM y reinterpretación artística digital del retrato, optimizados en WebP y validados en Chromium. |
| Presentación | 12 láminas 16:9 revisadas visualmente. La lámina de conclusiones cierra el deck. |
| Figma nativo | El usuario actualizó manualmente las pantallas con branding y retrato. [Archivo](https://www.figma.com/design/tuAuL4Td1Sd9Xx8EvV8Hg8). |

## Ejecuciones

Seis pruebas unitarias aprobadas, ESLint sin incidencias, compilación Vite y tres recorridos de Chromium completados en local y repetidos en producción. Consultar [Validación](VALIDACION.md).

## Producción

[GitHub Pages](https://mmorfe-engineer.github.io/catedra-jgh-react-uvm-e4-2/). El [workflow del commit técnico](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44593808049) terminó correctamente tras corregir el comando de pruebas para Node 22. Chromium verificó carga, CSS, JavaScript, CRUD con recargas y responsive contra la URL pública en escritorio, tableta y móvil.

El [workflow de la segunda contribución](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44604085430) compiló y desplegó el merge del PR #1. La [validación en producción](VALIDACION.md) confirmó filtros, teclado, foco y regresión del CRUD en tres tamaños.

## Git y autoría

El commit técnico de la base es `4efa0cd8119ba2dacabce08414e74e6c6faa0925`. Su autor es MARTIN MORFE FLORES <morfefloresm@uvm.edu.ve>. El [PR #1](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/pull/1) se integró mediante el merge commit `897f472aab4aef5c76d226d9e2da9e8e3a409902`. Se verificó la coincidencia entre `main` y `origin/main` en ese punto.

## Contribución de morfemartin

GitHub atribuyó ambos commits a Martin Alejandro Morfe Carballo <morfecarballoma@uvm.edu.ve> (`morfemartin`). La integración preservó sus identificadores.

- `0b14c8a4d4b321a49d057b226ae665d6fcc91403` añade filtros, controles accesibles, gestión del foco y cobertura en Chromium.
- `2bc9b82b1b6e98045d29436e62cbabe02e3a7de3` registra las pruebas y capturas.

## Figma y video

- Figma disponible. [Archivo nativo](https://www.figma.com/design/tuAuL4Td1Sd9Xx8EvV8Hg8) · [Especificación](FIGMA_SPEC.md).
- Video PENDIENTE — ACCIÓN HUMANA EXTERNA. [Guion](VIDEO_SCRIPT.md).
- PR #3 integra el branding visual. [Cambios](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/pull/3).
- El usuario confirmó que actualizó manualmente el archivo nativo con el retrato y la identidad institucional. [Archivo público](https://www.figma.com/design/tuAuL4Td1Sd9Xx8EvV8Hg8).

## Riesgos vigentes

Los registros quedan en el almacenamiento del navegador y pueden perderse si se borra. Las escrituras simultáneas en pestañas distintas carecen de bloqueo transaccional. Actions avisó que algunas acciones declaradas para Node 20 se ejecutaron bajo Node 24. El aviso no impidió compilar ni desplegar.

## Cierre definitivo

El [PR #5](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/pull/5) se integró en `d9ee7cdd0245825a32595e3241f70329e71a452c`. Actions [44928365920](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44928365920) desplegó Pages. Chromium pasó en escritorio, tableta y móvil. El video continúa pendiente de URL real.
