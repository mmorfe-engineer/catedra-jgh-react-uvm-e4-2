# Especificación Figma

**PENDIENTE — ACCIÓN HUMANA EXTERNA.** Añadir el enlace al archivo nativo al terminar.

| Frame | Tamaño de referencia | Contenido |
| --- | --- | --- |
| Desktop — principal | 1440 × 1000 | Header, hero, contexto, sección del gestor con total cero. El lienzo puede extenderse verticalmente para guía y footer. |
| Desktop — Nueva actividad | 1440 × 1000 | Sección del gestor y formulario vacío abierto, con scroll vertical. |
| Desktop — actividades | 1440 × 1000 | Indicadores y tarjeta de muestra, sobre la guía HTML5. |
| Desktop — edición | 1440 × 1000 | Formulario con datos de la tarjeta, acciones Guardar cambios y Cancelar. |
| Mobile — principal | 390 × 844 | Header y vínculos en filas, hero, contexto y gestor en una columna. |
| Mobile — formulario/listado | 390 × 844 | Editor de una columna, tarjeta debajo y footer por desplazamiento. |

## Distribución y tokens

Contenedor desktop de ancho máximo 1120 px, centrado. Márgenes móviles de 12 px. Hero desktop en proporción 3:2 y una columna por debajo de 736 px. Métricas en cuatro columnas y dos por debajo de 736 px. Guía y editor en dos columnas y una por debajo de 512 px. Espaciado base 16 px, radios 6–9 px y controles con padding horizontal de 9–16 px. Los frames son viewports, por lo que cada variante admite scroll vertical.

- Fondo `#F8F5EE`, hero `#EDE7D8`, panel `#FFFCF6`, borde `#D8D2C5`.
- Petróleo `#103D45`, tinta `#203236`, texto secundario `#4B5D5E`.
- Dorado claro `#F0D39A`, acento tierra `#A47D40`, error `#8A2E29`.
- Georgia para títulos e indicadores. System UI para texto y controles, tamaño base 16 px y line-height 1.6. H1 fluido 41.6–80 px y H2 fluido 26.4–37.6 px.

## Componentes y texto

Header con «Universidad Valle del Momboy», «Cátedra Libre Dr. José Gregorio Hernández», «E-Actividad 4.2 · ReactJS» y enlaces «Actividades» y «Guía HTML5». Hero con «Gestor de Actividades Formativas», «Vida, ciencia y servicio.», «Organiza actividades de formación, reflexión y divulgación de la Cátedra Libre Dr. José Gregorio Hernández.» y «Ir al gestor».

El bloque «Sobre la Cátedra» incluye «Un espacio de formación y reflexión para estudiar su vida, obra y virtudes, con atención a su legado científico, su docencia y su vocación de servicio.». El gestor muestra «Actividades formativas», «Los registros se guardan en este navegador.» y «Nueva actividad». Los indicadores se llaman «Total», «Planificada», «En curso» y «Realizada». El estado vacío muestra «Aún no hay actividades registradas. Crea una actividad para empezar.».

Formularios «Nueva actividad» y «Editar actividad», con leyenda «Datos de la actividad». Controles Título, Tipo, Eje, Fecha, Modalidad, Responsable, Estado y Descripción. Los selectores vacíos muestran «Seleccionar». Variantes de botón principal «Crear actividad» y «Guardar cambios», secundario «Cancelar» o «Editar» y secundario de peligro «Eliminar». Los errores se muestran en texto rojo. La confirmación de eliminación la presenta el navegador.

Tarjeta de referencia «Taller demostrativo · Valores y servicio», tipo Taller, eje Valores, fecha 20 de noviembre de 2026, modalidad Virtual, responsable «Equipo de formación (demo)», estado Planificada y descripción «Registro ficticio creado para demostrar el gestor.». Los textos de la guía y el footer se toman literalmente de `Html5Guide.jsx` y `App.jsx`.

Revisar variantes vacía, abierta, inválida, guardada y confirmación. Usar capturas locales de `docs/assets/` como referencia del diseño implementado.

## Opciones del formulario

| Control | Valores |
| --- | --- |
| Tipo | Diplomado, Curso, Taller, Conferencia, Jornada |
| Eje | Vida, Obra, Virtudes, Ciencia, Docencia, Servicio, Valores, Trascendencia |
| Modalidad | Presencial, Virtual, Híbrida |
| Estado | Planificada, En curso, Realizada |

Referencias por frame, en el mismo orden de la tabla inicial: [principal desktop](assets/desktop-principal.png), [alta desktop](assets/desktop-nueva.png), [listado desktop](assets/desktop.png), [edición desktop](assets/desktop-editor.png), [principal móvil](assets/movil-principal.png) y [editor con listado móvil](assets/movil-editor.png). «Completa el campo Título.» es el mensaje visible del caso de validación de un título en blanco.
