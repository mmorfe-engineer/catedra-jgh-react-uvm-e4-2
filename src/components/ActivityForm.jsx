import { activityFields, activityOptions } from '../activities.js'

export function ActivityForm({ activity, onSubmit, onCancel }) {
  function submit(event) {
    event.preventDefault()
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)))
  }

  return (
    <form onSubmit={submit}>
      <fieldset>
        <legend>Datos de la actividad</legend>
        <div className="form-grid">
          {activityFields.map(({ name, label, type, maxLength }) => (
            <div key={name} className={name === 'titulo' || name === 'descripcion' ? 'span-form' : undefined}>
              <label htmlFor={name}>{label}</label>
              {activityOptions[name] ? (
                <select id={name} name={name} defaultValue={activity?.[name] ?? ''} required>
                  <option value="" disabled>Seleccionar</option>
                  {activityOptions[name].map(option => <option key={option}>{option}</option>)}
                </select>
              ) : name === 'descripcion' ? (
                <textarea id={name} name={name} rows="4" maxLength={maxLength} defaultValue={activity?.[name]} required />
              ) : (
                <input id={name} name={name} type={type ?? 'text'} maxLength={maxLength}
                  defaultValue={activity?.[name]} required />
              )}
            </div>
          ))}
        </div>
      </fieldset>
      <div className="actions">
        <button type="submit">{activity ? 'Guardar cambios' : 'Crear actividad'}</button>
        <button className="secondary" type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}
