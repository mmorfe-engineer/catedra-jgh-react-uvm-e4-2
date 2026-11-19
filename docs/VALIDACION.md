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
