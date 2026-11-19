# Auditoría técnica

## Estado

**PASS** para la base técnica. **PENDIENTE** para la entrega académica hasta contar con Figma, video y la contribución reservada.

## Pliego y evidencia

| Área | Resultado |
| --- | --- |
| React, DOM y CRUD | React renderiza la lista y los indicadores desde el estado. Chromium verificó el ciclo completo local. |
| localStorage | La baja confirmada deja la lista vacía después de recargar. Alta y edición sobreviven a la recarga. |
| Cátedra y HTML5 | La identidad, el contenido de formación y la guía de semántica se muestran en pantalla. |
| CSS, plantillas y responsive | Hoja propia y capturas locales revisadas en tres tamaños. |
| GitHub | Código publicado en `main` del repositorio canónico. |
| Figma y video | PENDIENTE. Especificación y guion listos para producir los entregables. |

## Ejecuciones

Seis pruebas unitarias aprobadas, ESLint sin incidencias, compilación Vite y tres recorridos de Chromium completados en local y repetidos en producción. Consultar [Validación](VALIDACION.md).

## Producción

[GitHub Pages](https://mmorfe-engineer.github.io/catedra-jgh-react-uvm-e4-2/). El [workflow del commit técnico](https://github.com/mmorfe-engineer/catedra-jgh-react-uvm-e4-2/actions/runs/44593808049) terminó correctamente tras corregir el comando de pruebas para Node 22. Chromium verificó carga, CSS, JavaScript, CRUD con recargas y responsive contra la URL pública en escritorio, tableta y móvil.

## Git y autoría

`main` contiene el commit técnico desplegado `4efa0cd8119ba2dacabce08414e74e6c6faa0925`, publicado en `origin/main`. La auditoría, documentación y capturas se registran en un hito posterior. Autor registrado en los commits técnicos: MARTIN MORFE FLORES <morfefloresm@uvm.edu.ve>.

## Contribución de morfemartin

PENDIENTE. El bloque reservado comprende filtros por tipo y estado, vacío filtrado, accesibilidad de controles, teclado y foco relacionado, revisión de Editar/Eliminar y pruebas específicas. La rama propuesta es `feature/activity-filters-accessibility-morfemartin`, con identidad Git Martin Alejandro Morfe Carballo <morfecarballoma@uvm.edu.ve>. Tras integrar su PR, revisar autores y commits, y repetir QA.

## Figma y video

- Figma PENDIENTE — ACCIÓN HUMANA EXTERNA. [Especificación](FIGMA_SPEC.md).
- Video PENDIENTE — ACCIÓN HUMANA EXTERNA. [Guion](VIDEO_SCRIPT.md).

## Riesgos vigentes

Los registros quedan en el almacenamiento del navegador y pueden perderse si se borra. Las escrituras simultáneas en pestañas distintas carecen de bloqueo transaccional. Actions avisó que algunas acciones declaradas para Node 20 se ejecutaron bajo Node 24. El aviso no impidió compilar ni desplegar.
