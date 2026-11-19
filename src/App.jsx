import { useEffect, useRef, useState } from 'react'
import { activityOptions } from './activities.js'
import portraitSmall from './assets/jgh-intarsia-384.webp'
import portraitLarge from './assets/jgh-intarsia-768.webp'
import universityLogo from './assets/uvm-logo.webp'
import { ActivityForm } from './components/ActivityForm.jsx'
import { ActivityList } from './components/ActivityList.jsx'
import { Html5Guide } from './components/Html5Guide.jsx'
import { useActivities } from './useActivities.js'

export function App() {
  const { records, error, save } = useActivities()
  const [editor, setEditor] = useState(null)
  const [message, setMessage] = useState('')
  const [changeError, setChangeError] = useState('')
  const [tipo, setTipo] = useState('')
  const [estado, setEstado] = useState('')
  const editorHeading = useRef(null)
  const newButton = useRef(null)
  const resultsHeading = useRef(null)
  const editButtons = useRef(new Map())
  const pendingFocus = useRef(null)

  const visibleRecords = records.filter(activity =>
    (!tipo || activity.tipo === tipo) && (!estado || activity.estado === estado))

  useEffect(() => {
    if (editor) editorHeading.current?.focus()
  }, [editor])

  useEffect(() => {
    const target = pendingFocus.current
    if (!target) return
    pendingFocus.current = null
    const button = target.newActivity ? newButton.current : editButtons.current.get(target.id)
    const destination = button ?? resultsHeading.current
    destination?.focus()
  }, [editor, records])

  function registerEditButton(id, button) {
    if (button) editButtons.current.set(id, button)
    else editButtons.current.delete(id)
  }

  function openEditor(activity = null) {
    setMessage('')
    setChangeError('')
    setEditor({ activity })
  }

  function saveActivity(values) {
    const activity = editor.activity
    const id = activity?.id ?? crypto.randomUUID()
    const failure = save({
      type: activity ? 'update' : 'create',
      id,
      now: new Date().toISOString(),
      values,
    })
    setChangeError(failure)
    if (failure) return
    pendingFocus.current = { id }
    setEditor(null)
    setMessage(activity ? 'Cambios guardados.' : 'Actividad creada.')
  }

  function cancelEditor() {
    pendingFocus.current = editor.activity ? { id: editor.activity.id } : { newActivity: true }
    setEditor(null)
    setChangeError('')
  }

  function deleteActivity(activity) {
    if (!window.confirm(`¿Eliminar «${activity.titulo}»?`)) return
    const failure = save({ type: 'delete', id: activity.id })
    setChangeError(failure)
    setMessage(failure ? '' : 'Actividad eliminada.')
    if (failure) return
    const index = visibleRecords.findIndex(record => record.id === activity.id)
    pendingFocus.current = { id: (visibleRecords[index + 1] ?? visibleRecords[index - 1])?.id }
    if (editor?.activity?.id === activity.id) setEditor(null)
  }

  const metrics = [
    ['Total', records.length],
    ...activityOptions.estado.map(status => [status, records.filter(activity => activity.estado === status).length]),
  ]

  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <div className="institution">
            <img className="university-logo" src={universityLogo} alt="" width="192" height="192" />
            <div>
              <p className="university">Universidad Valle del Momboy</p>
              <p>Cátedra Libre Dr. José Gregorio Hernández</p>
              <small>E-Actividad 4.2 · ReactJS</small>
            </div>
          </div>
          <nav aria-label="Navegación principal">
            <a href="#gestor">Actividades</a>
            <a href="#html5">Guía HTML5</a>
          </nav>
        </div>
      </header>
      <main>
        <div className="hero-band">
          <div className="container intro">
            <section className="hero" aria-labelledby="hero-title">
              <p className="eyebrow">Gestor de Actividades Formativas</p>
              <h1 id="hero-title">Vida, ciencia<br />y servicio.</h1>
              <p>Organiza actividades de formación, reflexión y divulgación de la Cátedra Libre Dr. José Gregorio Hernández.</p>
              <a className="button-link" href="#gestor">Ir al gestor</a>
            </section>
            <div className="hero-art">
              <img
                src={portraitSmall}
                srcSet={`${portraitSmall} 384w, ${portraitLarge} 768w`}
                sizes="(max-width: 46rem) min(68vw, 17rem), min(36vw, 23rem)"
                alt="Retrato artístico del Dr. José Gregorio Hernández, con sombrero y traje, en estilo intarsia."
                width="768"
                height="841"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <section className="about" aria-labelledby="about-title">
              <h2 id="about-title">Sobre la Cátedra</h2>
              <p>Un espacio de formación y reflexión para estudiar su vida, obra y virtudes, con atención a su legado científico, su docencia y su vocación de servicio.</p>
            </section>
          </div>
        </div>
        <div className="container main-content">
          <section id="gestor" aria-labelledby="activity-title">
            <div className="section-heading">
              <div>
                <h2 id="activity-title">Actividades formativas</h2>
                <p>Los registros se guardan en este navegador.</p>
              </div>
              <button ref={newButton} type="button" disabled={Boolean(error)} onClick={() => openEditor()}>Nueva actividad</button>
            </div>
            {error ? <p role="alert" className="error">{error}</p> : (
              <>
                <dl className="metrics">
                  {metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                </dl>
                <p className="feedback" role="status">{message}</p>
                {changeError && <p className="error" role="alert">{changeError}</p>}
                {editor && (
                  <section className="editor" aria-labelledby="editor-title">
                    <h3 id="editor-title" ref={editorHeading} tabIndex={-1}>
                      {editor.activity ? 'Editar actividad' : 'Nueva actividad'}
                    </h3>
                    <ActivityForm key={editor.activity?.id ?? 'new'} activity={editor.activity}
                      onSubmit={saveActivity} onCancel={cancelEditor} />
                  </section>
                )}
                <fieldset>
                  <legend>Filtros de actividades</legend>
                  <div className="filter-controls">
                    <label>
                      Filtrar por tipo
                      <select value={tipo} onChange={event => setTipo(event.target.value)}>
                        <option value="">Todos los tipos</option>
                        {activityOptions.tipo.map(option => <option key={option}>{option}</option>)}
                      </select>
                    </label>
                    <label>
                      Filtrar por estado
                      <select value={estado} onChange={event => setEstado(event.target.value)}>
                        <option value="">Todos los estados</option>
                        {activityOptions.estado.map(option => <option key={option}>{option}</option>)}
                      </select>
                    </label>
                    <button className="secondary" type="button" onClick={() => { setTipo(''); setEstado('') }}>
                      Restablecer filtros
                    </button>
                  </div>
                </fieldset>
                <h3 ref={resultsHeading} tabIndex={-1}>Listado de actividades</h3>
                <p className="feedback" role="status">
                  {visibleRecords.length} de {records.length} actividades visibles.
                  {records.length > 0 && visibleRecords.length === 0 && ' Ninguna actividad coincide con los filtros.'}
                </p>
                <ActivityList activities={visibleRecords} hasRecords={records.length > 0}
                  registerEditButton={registerEditButton} onEdit={openEditor} onDelete={deleteActivity} />
              </>
            )}
          </section>
          <Html5Guide />
        </div>
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <div>
            <p>Universidad Valle del Momboy · E-Actividad 4.2</p>
            <p>Taller Front End · Profesor Anggelo Huz</p>
          </div>
          <p>Martin Morfe.°.<br />Martin Alejandro Morfe Carballo</p>
        </div>
      </footer>
    </>
  )
}
