# Arquitectura

| Ruta | Responsabilidad |
| --- | --- |
| `index.html`, `src/main.jsx` | Documento en español y montaje de React con createRoot. |
| `src/App.jsx` | Identidad académica, contexto, métricas derivadas, editor activo y mensajes. |
| `src/components/ActivityForm.jsx` | Formulario compartido de alta y edición, labels, restricciones nativas y extracción con FormData. |
| `src/components/ActivityList.jsx` | Lectura de registros, fechas, estado inicial vacío y acciones por registro. |
| `src/components/Html5Guide.jsx` | Explicación académica de etiquetas presentes en interfaz. |
| `src/activities.js` | Opciones, campos, validación, reducer puro y adaptador de almacenamiento. |
| `src/useActivities.js` | Carga inicial y guardado de operaciones antes de publicar el resultado a React. |
| `src/styles.css` | Tokens, composición CSS Grid/Flexbox y media queries. |
| `test/`, `scripts/browser-qa.mjs` | Pruebas de lógica y recorrido reproducible en Chromium. |
| `.github/workflows/pages.yml` | Validación, build y publicación del artefacto Vite. |

El estado inicial se lee de la clave `catedra-jgh-e4-2.activities.v1`. Un origen nuevo recibe una lista vacía. La escritura vuelve a leer la lista persistida, aplica una acción create/update/delete con el reducer y guarda mediante `localStorage.setItem`. Al guardar correctamente, `setState` publica el resultado y React aplica al DOM el listado y los indicadores derivados. Si la lectura inicial falla, el editor se bloquea para evitar sobrescribir datos. Los fallos al guardar se muestran en pantalla.

Editar reutiliza el formulario con los valores actuales. El editor es parte del flujo de la página y recibe foco en el encabezado al abrirse. Eliminar solicita confirmación nativa. `<article>` identifica el registro y `<time>` mantiene su fecha ISO. La reserva de filtros puede integrarse entre el estado de App y el componente de listado, conservando los indicadores sobre el total.

Los registros pertenecen al origen y perfil de navegador usados. Dos pestañas simultáneas carecen de bloqueo transaccional entre lectura y escritura. Las fechas internas se generan en ISO; la fecha formativa se visualiza en la zona UTC para evitar el desplazamiento de día.
