const examples = [
  ['header', 'Presenta la universidad y la Cátedra.'],
  ['nav', 'Lleva al gestor y a la guía HTML5.'],
  ['main', 'Reúne el contenido principal de la página.'],
  ['section', 'Agrupa contenido con un encabezado temático.'],
  ['article', 'Representa una actividad independiente en el listado.'],
  ['form', 'Recoge los datos al crear o editar una actividad.'],
  ['fieldset', 'Agrupa los campos bajo la leyenda Datos de la actividad.'],
  ['label', 'Asocia cada nombre de campo con su control de entrada.'],
  ['time', 'Muestra una fecha legible y conserva su valor ISO en dateTime.'],
  ['footer', 'Identifica el curso, el profesor y los integrantes.'],
]

export function Html5Guide() {
  return (
    <section id="html5" className="guide" aria-labelledby="html5-title">
      <h2 id="html5-title">HTML5 aplicado en este proyecto</h2>
      <p>Al crear, editar o eliminar una actividad, la interacción cambia el estado. React vuelve a renderizar y aplica al DOM los cambios correspondientes.</p>
      <dl className="guide-grid">
        {examples.map(([tag, explanation]) => (
          <div key={tag}><dt><code>{`<${tag}>`}</code></dt><dd>{explanation}</dd></div>
        ))}
      </dl>
    </section>
  )
}
