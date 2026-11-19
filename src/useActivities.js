import { useState } from 'react'
import { activityReducer, readActivities, writeActivities } from './activities.js'

function load() {
  try {
    return { records: readActivities(window.localStorage), error: '' }
  } catch {
    return { records: [], error: 'No se pudieron leer las actividades guardadas. Revisa el almacenamiento del navegador y recarga la página.' }
  }
}

export function useActivities() {
  const [state, setState] = useState(load)

  function save(action) {
    if (state.error) return state.error

    let records
    try {
      records = activityReducer(readActivities(window.localStorage), action)
    } catch (error) {
      return error.message
    }

    try {
      writeActivities(window.localStorage, records)
    } catch {
      return 'No se pudo guardar el cambio. Revisa el almacenamiento del navegador e inténtalo de nuevo.'
    }

    setState({ records, error: '' })
    return ''
  }

  return { ...state, save }
}
