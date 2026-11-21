# Validación ejecutada

## Local

| Comando o ejecución | Resultado |
| --- | --- |
| `npm test` | 6 pruebas aprobadas y 0 fallos. Incluye alta, edición, baja, persistencia, datos inválidos y edición de registros retirados. |
| `npm run lint` | ESLint terminó sin incidencias. |
| `npm run build` | Vite 7.3.8 compiló 34 módulos y emitió el HTML, CSS y JavaScript. |
| `npm run dev -- --host 127.0.0.1` | Vite inició con la base del repositorio. |
| `vite preview --host 127.0.0.1 --port 4182 --strictPort` y `npm run qa:browser -- http://127.0.0.1:4182/catedra-jgh-react-uvm-e4-2/ docs/assets` | Chromium completó los tres recorridos con la compilación local. |
| Revisión visual de capturas | Escritorio 1440 × 1000, tableta 768 × 1024 y móvil 390 × 844. Se revisaron navegación, hero, tarjetas, formulario, guía y pie. |

En cada viewport se intentó un alta con título en blanco, se creó y leyó una actividad, se recargó, se editó y recargó, se comprobó la cancelación de la baja, se eliminó y recargó. Se comprobaron indicadores, CSS aplicado, ausencia de desbordamiento horizontal y ausencia de errores de página o respuestas de recursos con estado ≥ 400. Las capturas muestran un registro ficticio creado durante la prueba.

## Producción

Configuración de Pages creada con `build_type=workflow`. La primera ejecución falló porque Node 22 rechazó `--test-isolation=none`. Se volvió a la invocación estándar `node --test` y se confirmaron seis pruebas aprobadas.

El [workflow 44593808049](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44593808049) completó `npm ci`, tests, lint, build, carga del artefacto y despliegue. Chromium ejecutó `npm run qa:browser -- https://mmorfe-engineer.github.io/catedra-jgh-react-uvm-e4-2/` con el navegador ya instalado. Los tres viewports pasaron el CRUD con recargas, validación, baja confirmada, indicadores, CSS y layout, sin errores de página o carga de recursos.

## Segunda contribución · validación local

El 19 de noviembre de 2026, `npm test`, `npm run lint` y `npm run build` finalizaron correctamente. Node 26 reportó un archivo de pruebas aprobado en `npm test`. La ejecución directa de ese archivo confirmó los seis casos aprobados. Vite 7.3.8 compiló 34 módulos.

Chromium ejecutó `npm run qa:browser -- http://127.0.0.1:4192/catedra-jgh-react-uvm-e4-2/` contra la compilación local. Pasaron los recorridos en escritorio (1440 × 1000), tableta (768 × 1024) y móvil (390 × 844). Se comprobaron ambos filtros por separado y combinados, restablecimiento con teclado, ausencia de coincidencias, contador anunciado, foco visible y destinos del foco al abrir, cancelar, guardar o eliminar. Se verificaron el CRUD con recargas, el diseño sin desbordamiento y que filtrar y restablecer conservaran los registros de prueba almacenados.

Capturas con datos ficticios en [escritorio](assets/desktop-filtros.png), [móvil](assets/movil-filtros.png) y [móvil sin coincidencias](assets/movil-filtros-vacio.png).

## Segunda contribución · validación posterior a la integración

El [PR #1](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/pull/1) quedó integrado en `897f472aab4aef5c76d226d9e2da9e8e3a409902`. Los trabajos de compilación y despliegue del [workflow 44604085430](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44604085430) concluyeron correctamente.

Chromium repitió el recorrido completo en [GitHub Pages](https://mmorfe-engineer.github.io/catedra-jgh-react-uvm-e4-2/). Los tres tamaños aprobaron filtros, teclado, foco, mensajes de estado, CRUD, persistencia y responsive. Cada recorrido usó un perfil de prueba independiente.

## Cierre documental

- `npm test`, `npm run lint` y `npm run build` finalizaron correctamente. La ejecución directa confirmó seis casos unitarios aprobados.
- Chromium repitió el recorrido en producción en 1440 × 1000, 768 × 1024 y 390 × 844. El [workflow del HEAD publicado](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44604595775) confirmó el despliegue de `3806f3c1e3c5a87b882d8c8b01510bc02960ddf8`.
- La [presentación](presentacion/uvm-e-actividad-4-2.pptx) se renderizó en LibreOffice y se revisó visualmente en 12 láminas de formato 16:9. El [paquete de referencia Figma](figma/README.md) contiene seis capturas reales y una lámina vectorial con el sistema de diseño.
- Se verificaron las rutas locales nuevas y los enlaces públicos. En ese momento seguían pendientes Figma y video.

## Refinamiento visual institucional

La compilación local pasó `npm test`, `npm run lint` y `npm run build`. Chromium completó el recorrido de CRUD, filtros, teclado, foco y persistencia en escritorio (1440 × 1000), tableta (768 × 1024) y móvil (390 × 844). El recorrido también comprobó la carga y proporción del emblema y el retrato, la selección de la variante WebP de 384 px a densidad 1× y el cambio de posición del retrato sin desbordamiento horizontal.

Se revisaron las nuevas capturas de [escritorio](assets/desktop-institucional.png), [tableta](assets/tablet-institucional.png) y [móvil](assets/movil-institucional.png). Se actualizaron las seis referencias para Figma y se volvieron a renderizar y revisar las 12 láminas de la presentación.

## Cierre de enlaces

El enlace al [archivo nativo de Figma](https://www.figma.com/design/tuAuL4Td1Sd9Xx8EvV8Hg8) se incorporó al README, al footer de la aplicación, a la presentación, a la especificación y a la matriz. El video explicativo queda pendiente de grabación y publicación. [Guion definitivo](VIDEO_SCRIPT.md)

Para el cierre del enlace del footer finalizaron `npm test`, `npm run lint` y `npm run build`. Chromium verificó el destino del enlace junto al recorrido completo en escritorio, tableta y móvil. La presentación se revisó visualmente tras renderizar sus 12 láminas, y se comprobó el destino del hipervínculo de Figma de la lámina 11.


## Cierre definitivo

El usuario confirmó la actualización manual del archivo nativo de Figma con el retrato artístico y la identidad institucional. La URL está enlazada en el README, footer, presentación y esta documentación. La revisión de disponibilidad de la URL se registra como acceso público suministrado por el usuario. El video explicativo permanece pendiente de grabación y URL real.

Para este cierre, `npm test`, `npm run lint` y `npm run build` finalizaron correctamente. Chromium completó el QA integral contra el build local en 1440 × 1000, 768 × 1024 y 390 × 844. Pasaron imágenes y proporciones, enlace del footer, accesibilidad de teclado y foco, filtros, CRUD, persistencia y responsive.

La presentación mantiene exactamente 12 láminas en formato 16:9. La lámina 11 incluye el vínculo al archivo nativo y una explicación breve de la intarsia digital. El video sigue pendiente hasta recibir una URL real.

El [PR #5](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/pull/5) se integró en `d9ee7cdd0245825a32595e3241f70329e71a452c`. Actions [44928365920](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44928365920) completó build y despliegue. Chromium repitió el QA público en GitHub Pages en 1440 × 1000, 768 × 1024 y 390 × 844. CRUD, filtros, foco, persistencia, imágenes y enlaces pasaron.
