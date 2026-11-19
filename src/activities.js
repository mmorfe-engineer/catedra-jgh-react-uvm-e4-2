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
  const ids = new Set()
  for (const activity of activities) {
    if (!activity || typeof activity.id !== 'string' || !activity.id || ids.has(activity.id)) {
      throw new TypeError('Los datos guardados contienen un identificador inválido.')
    }
    normalizeActivity(activity)
    ids.add(activity.id)
  }
  return activities
}

export function writeActivities(storage, activities) {
  storage.setItem(storageKey, JSON.stringify(activities))
}

export const activityFields = [
  { name: 'titulo', label: 'Título', maxLength: 120 },
  { name: 'tipo', label: 'Tipo' },
  { name: 'eje', label: 'Eje' },
  { name: 'fecha', label: 'Fecha', type: 'date' },
  { name: 'modalidad', label: 'Modalidad' },
  { name: 'responsable', label: 'Responsable', maxLength: 100 },
  { name: 'estado', label: 'Estado' },
  { name: 'descripcion', label: 'Descripción', maxLength: 600 },
]

export function normalizeActivity(values) {
  const record = {}
  for (const { name, label, maxLength } of activityFields) {
    const value = typeof values[name] === 'string' ? values[name].trim() : ''
    if (!value) throw new Error(`Completa el campo ${label}.`)
    if (maxLength && value.length > maxLength) throw new Error(`Revisa la longitud de ${label}.`)
    if (activityOptions[name] && !activityOptions[name].includes(value)) {
      throw new Error(`Selecciona una opción válida para ${label}.`)
    }
    if (name === 'fecha') {
      const date = new Date(value + 'T00:00:00Z')
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) ||
          date.toISOString().slice(0, 10) !== value || value.startsWith('0000-')) {
        throw new Error('Introduce una fecha válida.')
      }
    }
    record[name] = value
  }
  return record
}

export function activityReducer(activities, action) {
  switch (action.type) {
    case 'create':
      return [...activities, { ...normalizeActivity(action.values), id: action.id,
        createdAt: action.now, updatedAt: action.now }]
    case 'update': {
      if (!activities.some(activity => activity.id === action.id)) {
        throw new Error('La actividad ya no está disponible. Recarga el listado.')
      }
      const values = normalizeActivity(action.values)
      return activities.map(activity => activity.id === action.id
        ? { ...activity, ...values, updatedAt: action.now }
        : activity)
    }
    case 'delete':
      return activities.filter(activity => activity.id !== action.id)
    default:
      throw new Error('Operación desconocida.')
  }
}
