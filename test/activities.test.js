import test from 'node:test'
import assert from 'node:assert/strict'
import { activityReducer, normalizeActivity, readActivities, writeActivities } from '../src/activities.js'

const values = {
  titulo: ' Taller de servicio ', tipo: 'Taller', eje: 'Servicio', fecha: '2026-11-20',
  modalidad: 'Virtual', responsable: 'Equipo de formación', descripcion: 'Actividad de prueba.',
  estado: 'Planificada',
}
const createdAt = '2026-11-19T13:00:00Z'
const updatedAt = '2026-11-19T14:00:00Z'
const create = { type: 'create', id: 'test', values, now: createdAt }

function memoryStorage() {
  const entries = new Map()
  return {
    getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, String(value)),
  }
}

test('crea, normaliza y registra fechas internas sin mutar la lista', () => {
  const original = []
  const [activity] = activityReducer(original, create)
  assert.equal(activity.titulo, 'Taller de servicio')
  assert.equal(activity.id, 'test')
  assert.equal(activity.createdAt, createdAt)
  assert.equal(activity.updatedAt, createdAt)
  assert.deepEqual(original, [])
})

test('edita conservando la identidad y fecha de creación', () => {
  const records = activityReducer([], create)
  const [edited] = activityReducer(records, {
    type: 'update', id: 'test', values: { ...values, estado: 'Realizada' }, now: updatedAt,
  })
  assert.equal(edited.estado, 'Realizada')
  assert.equal(edited.id, 'test')
  assert.equal(edited.createdAt, createdAt)
  assert.equal(edited.updatedAt, updatedAt)
  assert.equal(records[0].estado, 'Planificada')
})

test('elimina únicamente el registro seleccionado', () => {
  const records = activityReducer(activityReducer([], create), { ...create, id: 'other' })
  assert.deepEqual(activityReducer(records, { type: 'delete', id: 'test' }).map(record => record.id), ['other'])
})

test('persiste registros y distingue una lista eliminada de un fallo de lectura', () => {
  const storage = memoryStorage()
  assert.deepEqual(readActivities(storage), [])
  const records = activityReducer([], create)
  writeActivities(storage, records)
  assert.deepEqual(readActivities(storage), records)
  writeActivities(storage, [])
  assert.deepEqual(readActivities(storage), [])
  writeActivities(storage, [null])
  assert.throws(() => readActivities(storage), /identificador inválido/)
})

test('valida texto vacío, opciones ajenas y fechas inexistentes', () => {
  assert.throws(() => normalizeActivity({ ...values, titulo: ' ' }), /Título/)
  assert.throws(() => normalizeActivity({ ...values, tipo: 'Otro' }), /Tipo/)
  assert.throws(() => normalizeActivity({ ...values, fecha: '2026-02-30' }), /fecha válida/)
})

test('detecta la edición de una actividad retirada de la lista', () => {
  assert.throws(() => activityReducer([], { ...create, type: 'update' }), /ya no está disponible/)
})
