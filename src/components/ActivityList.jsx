const dateFormatter = new Intl.DateTimeFormat('es-VE', {
  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
})

export function ActivityList({ activities, hasRecords, registerEditButton, onEdit, onDelete }) {
  if (!activities.length) {
    if (hasRecords) return null
    return <p className="empty">Aún no hay actividades registradas. Crea una actividad para empezar.</p>
  }

  return (
    <div className="activity-list">
      {activities.map(activity => (
        <article key={activity.id} className="card">
          <p className="card-meta">{activity.tipo} · {activity.eje}</p>
          <h3>{activity.titulo}</h3>
          <p>{activity.descripcion}</p>
          <dl>
            <div><dt>Fecha</dt><dd><time dateTime={activity.fecha}>{dateFormatter.format(new Date(activity.fecha))}</time></dd></div>
            <div><dt>Modalidad</dt><dd>{activity.modalidad}</dd></div>
            <div><dt>Responsable</dt><dd>{activity.responsable}</dd></div>
            <div><dt>Estado</dt><dd>{activity.estado}</dd></div>
          </dl>
          <div className="actions">
            <button ref={button => registerEditButton(activity.id, button)} className="secondary" type="button"
              aria-label={`Editar «${activity.titulo}»`} onClick={() => onEdit(activity)}>Editar</button>
            <button className="secondary danger" type="button"
              aria-label={`Eliminar «${activity.titulo}»`} onClick={() => onDelete(activity)}>Eliminar</button>
          </div>
        </article>
      ))}
    </div>
  )
}
