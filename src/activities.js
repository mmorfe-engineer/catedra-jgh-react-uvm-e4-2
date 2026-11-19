export const activityOptions = {
  tipo: ['Diplomado', 'Curso', 'Taller', 'Conferencia', 'Jornada'],
  eje: ['Vida', 'Obra', 'Virtudes', 'Ciencia', 'Docencia', 'Servicio', 'Valores', 'Trascendencia'],
  modalidad: ['Presencial', 'Virtual', 'Híbrida'],
  estado: ['Planificada', 'En curso', 'Realizada'],
}

const storageKey = 'catedra-jgh-e4-2.activities.v1'

export function readActivities(storage) {
  const raw = storage.getItem(storageKey)
  if (raw === null) return []

  const activities = JSON.parse(raw)
  if (!Array.isArray(activities)) {
    throw new TypeError('Los datos guardados deben contener una lista de actividades.')
  }
  return activities
}

export function writeActivities(storage, activities) {
  storage.setItem(storageKey, JSON.stringify(activities))
}
