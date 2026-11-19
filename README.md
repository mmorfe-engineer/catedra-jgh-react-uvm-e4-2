# Cátedra Libre Dr. José Gregorio Hernández

**Gestor de Actividades Formativas** · Universidad Valle del Momboy

E-Actividad 4.2 de FrontEndIVIVFI2026C · Taller Front End · profesor Anggelo Huz · ponderación 15 %.

**Integrantes:** Martin Morfe.°. y Martin Alejandro Morfe Carballo.

## Aplicación

El gestor permite crear, consultar, editar y eliminar actividades de formación, reflexión y divulgación. Cada actividad tiene título, tipo, eje, fecha, modalidad, responsable, descripción y estado. El formulario valida sus datos y la baja pide confirmación. Los indicadores se calculan a partir de la lista.

React renderiza la interfaz declarativamente al cambiar el estado. `localStorage` conserva los cambios al recargar. El diseño combina HTML5 semántico, una guía dentro de la aplicación, CSS propio, Grid, Flexbox y media queries. El formulario emplea etiquetas, mensajes de validación y foco inicial en el editor.

La lista empieza vacía y el almacenamiento pertenece al origen y perfil del navegador. Los filtros por tipo y estado se pueden combinar o restablecer. El listado anuncia cuántas actividades coinciden y dirige el foco a un destino disponible después de guardar, cancelar o eliminar. Esta contribución corresponde a Martin Alejandro Morfe Carballo.

## Instalación y comprobaciones

Usar Node.js 22.12+.

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Vite indica la URL local con el prefijo `/catedra-jgh-react-uvm-e4-2/`. Las 6 pruebas unitarias aprobadas abarcan reducer, validación y persistencia. Para repetir las pruebas de CRUD, filtros, teclado y foco en Chromium, instalar el navegador con `npx playwright install chromium`, levantar la vista previa y ejecutar `npm run qa:browser`.

- [Arquitectura y flujo](docs/ARQUITECTURA.md)
- [Pliego canónico](docs/PLIEGO_CANONICO.md)
- [Matriz de cumplimiento](docs/CUMPLIMIENTO.md)
- [Ejecuciones de validación](docs/VALIDACION.md)
- [Auditoría técnica](docs/FINAL_AUDIT.md)

## Entregables

- Código en [GitHub](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2).
- GitHub Pages verificado en Chromium con CRUD y recargas en tres tamaños. [Abrir el gestor](https://mmorfe-engineer.github.io/catedra-jgh-react-uvm-e4-2/)
- Figma pendiente — acción humana externa. [Especificación](docs/FIGMA_SPEC.md)
- Video pendiente — acción humana externa. [Guion](docs/VIDEO_SCRIPT.md)

## Capturas locales

[Escritorio](docs/assets/desktop.png) · [Tableta](docs/assets/tablet.png) · [Móvil](docs/assets/movil.png) · [Editor móvil](docs/assets/movil-editor.png)

## Fuentes

- Pliego del profesor, reproducido en los requisitos del proyecto. [Pliego canónico](docs/PLIEGO_CANONICO.md)
- Contexto institucional de la Universidad Valle del Momboy. [Cátedra y diplomado JGH](https://uvm.edu.ve/uvm-abre-sus-puertas-al-diplomado-jose-gregorio-hernandez-un-modelo-de-virtudes-para-la-venezuela-posible/) · [Dirección de Formación General](https://uvm.edu.ve/direccion-de-formacion-general/)
