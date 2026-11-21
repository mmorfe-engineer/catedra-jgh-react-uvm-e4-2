import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://127.0.0.1:4173/catedra-jgh-react-uvm-e4-2/'
const evidence = process.argv[3]
const browser = await chromium.launch({
  executablePath: process.env.E42_CHROMIUM,
  args: ['--no-sandbox'],
})
const title = 'Taller demostrativo · Valores y servicio'
const editedTitle = 'Taller demostrativo · Ciencia y servicio'

try {
  if (evidence) await mkdir(evidence, { recursive: true })
  for (const [name, width, height] of [['desktop', 1440, 1000], ['tablet', 768, 1024], ['movil', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } })
    const errors = []
    const button = name => page.getByRole('button', { name, exact: true })
    const articles = page.getByRole('article')
    const editorHeading = name => page.getByRole('heading', { name, exact: true })
    const resultHeading = editorHeading('Listado de actividades')
    const status = text => page.getByRole('status').filter({ hasText: text })
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
    })

    async function checkLayout() {
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
      assert.equal(await page.locator('header').evaluate(el => window.getComputedStyle(el).backgroundColor), 'rgb(16, 61, 69)')
    }

    async function reload() {
      const response = await page.reload()
      assert.equal(response.ok(), true)
    }

    async function checkFocus(locator) {
      assert.equal(await locator.evaluate(element => element === document.activeElement), true)
    }

    const response = await page.goto(url)
    assert.equal(response.ok(), true)
    await page.getByRole('heading', { name: /Vida, ciencia/ }).waitFor()
    const logo = page.locator('.university-logo')
    const portrait = page.getByRole('img', { name: /Retrato artístico del Dr\. José Gregorio Hernández/ })
    for (const asset of [logo, portrait]) {
      await asset.evaluate(image => image.decode())
      const dimensions = await asset.evaluate(image => ({
        ratio: image.naturalWidth / image.naturalHeight,
        displayed: image.width / image.height,
      }))
      assert.ok(Math.abs(dimensions.ratio - dimensions.displayed) < 0.025)
      assert.equal(await asset.isVisible(), true)
    }
    assert.equal(await logo.getAttribute('alt'), '')
    assert.match(await portrait.evaluate(image => image.currentSrc), /jgh-intarsia-384/)
    const textBounds = await page.getByRole('heading', { name: /Vida, ciencia/ }).boundingBox()
    const artBounds = await portrait.boundingBox()
    assert.equal(width <= 736 ? artBounds.y > textBounds.y + textBounds.height
      : artBounds.x > textBounds.x + textBounds.width, true)
    await checkLayout()
    if (evidence) {
      await page.screenshot({ path: `${evidence}/${name}-institucional.png` })
      await page.screenshot({ path: `${evidence}/${name}-principal.png`, fullPage: true })
    }
    for (let step = 0; step < 4; step++) await page.keyboard.press('Tab')
    await checkFocus(button('Nueva actividad'))
    assert.equal(await button('Nueva actividad').evaluate(element => window.getComputedStyle(element).outlineWidth), '3px')
    await page.keyboard.press('Enter')
    await checkFocus(editorHeading('Nueva actividad'))
    await page.keyboard.press('Tab')
    await checkFocus(page.getByLabel('Título'))
    if (evidence && name === 'desktop') {
      await page.screenshot({ path: `${evidence}/${name}-nueva.png`, fullPage: true })
    }
    await page.getByLabel('Título').fill(' ')
    for (const [label, value] of Object.entries({ Tipo: 'Taller', Eje: 'Valores', Modalidad: 'Virtual', Estado: 'Planificada' })) {
      await page.getByLabel(label, { exact: true }).selectOption(value)
    }
    await page.getByLabel('Fecha').fill('2026-11-20')
    await page.getByLabel('Responsable').fill('Equipo de formación (demo)')
    await page.getByLabel('Descripción').fill('Registro ficticio creado para demostrar el gestor.')
    await checkLayout()
    await page.getByRole('button', { name: 'Crear actividad' }).click()
    await page.getByRole('alert').getByText('Completa el campo Título.').waitFor()
    await page.getByLabel('Título').fill(title)
    await page.getByRole('button', { name: 'Crear actividad' }).click()
    await page.getByRole('article').getByRole('heading', { name: title }).waitFor()
    await checkFocus(button(`Editar «${title}»`))
    await status('Actividad creada.').waitFor()
    assert.deepEqual(await page.locator('.metrics dd').allTextContents(), ['1', '1', '0', '0'])
    await reload()
    await page.getByRole('article').getByRole('heading', { name: title }).waitFor()
    await checkLayout()
    if (evidence) await page.screenshot({ path: `${evidence}/${name}.png`, fullPage: true })
    await button(`Editar «${title}»`).click()
    await checkFocus(editorHeading('Editar actividad'))
    assert.equal(await page.getByLabel('Título').inputValue(), title)
    await checkLayout()
    if (evidence) await page.screenshot({ path: `${evidence}/${name}-editor.png`, fullPage: true })
    await page.getByLabel('Título').fill(editedTitle)
    await page.getByLabel('Estado', { exact: true }).selectOption('Realizada')
    await page.getByRole('button', { name: 'Guardar cambios' }).click()
    await checkFocus(button(`Editar «${editedTitle}»`))
    await status('Cambios guardados.').waitFor()
    await reload()
    await page.getByRole('article').getByRole('heading', { name: editedTitle }).waitFor()
    assert.deepEqual(await page.locator('.metrics dd').allTextContents(), ['1', '0', '0', '1'])
    page.once('dialog', dialog => dialog.dismiss())
    const deleteEditedActivity = page.getByRole('button', { name: `Eliminar «${editedTitle}»`, exact: true })
    await deleteEditedActivity.click()
    assert.equal(await page.getByRole('article').count(), 1)
    await checkFocus(deleteEditedActivity)
    page.once('dialog', dialog => dialog.accept())
    await deleteEditedActivity.click()
    await checkFocus(resultHeading)
    await status('Actividad eliminada.').waitFor()
    await reload()
    await page.getByText('Aún no hay actividades registradas.', { exact: false }).waitFor()
    assert.equal(await page.getByRole('article').count(), 0)
    assert.deepEqual(await page.locator('.metrics dd').allTextContents(), ['0', '0', '0', '0'])

    const fixtures = [
      { id: 'taller-plan', titulo: 'Taller de servicio', tipo: 'Taller', estado: 'Planificada' },
      { id: 'taller-real', titulo: 'Taller de ciencia', tipo: 'Taller', estado: 'Realizada' },
      { id: 'curso-plan', titulo: 'Curso de docencia', tipo: 'Curso', estado: 'Planificada' },
    ].map(record => ({
      eje: 'Servicio', fecha: '2026-11-20', modalidad: 'Virtual',
      responsable: 'Equipo de formación (demo)', descripcion: 'Registro ficticio para comprobar filtros.',
      ...record,
    }))
    const storageKey = 'catedra-jgh-e4-2.activities.v1'
    await page.evaluate(([key, records]) => window.localStorage.setItem(key, JSON.stringify(records)), [storageKey, fixtures])
    await reload()

    const type = page.getByRole('combobox', { name: 'Filtrar por tipo', exact: true })
    const state = page.getByRole('combobox', { name: 'Filtrar por estado', exact: true })
    const reset = button('Restablecer filtros')
    async function checkTitles(...expected) {
      await status(`${expected.length} de 3 actividades visibles.`).waitFor()
      assert.deepEqual(await articles.getByRole('heading').allTextContents(), expected)
    }

    await checkTitles('Taller de servicio', 'Taller de ciencia', 'Curso de docencia')
    await button('Nueva actividad').focus()
    await page.keyboard.press('Tab')
    await checkFocus(type)
    await type.press('Home')
    await type.press('t')
    await checkTitles('Taller de servicio', 'Taller de ciencia')
    await page.keyboard.press('Tab')
    await checkFocus(state)
    await page.keyboard.press('Tab')
    await checkFocus(reset)
    await page.keyboard.press('Enter')
    await checkFocus(reset)
    await checkTitles('Taller de servicio', 'Taller de ciencia', 'Curso de docencia')
    await state.selectOption('Planificada')
    await checkTitles('Taller de servicio', 'Curso de docencia')
    await type.selectOption('Taller')
    await checkTitles('Taller de servicio')
    await checkLayout()
    if (evidence && name !== 'tablet') {
      await page.locator('#gestor').screenshot({ path: `${evidence}/${name}-filtros.png` })
    }
    await state.selectOption('En curso')
    await checkTitles()
    await status('Ninguna actividad coincide con los filtros.').waitFor()
    assert.equal(await page.getByText('Aún no hay actividades registradas.', { exact: false }).count(), 0)
    if (evidence && name === 'movil') {
      await page.locator('#gestor').screenshot({ path: `${evidence}/${name}-filtros-vacio.png` })
    }
    await reset.click()
    await checkTitles('Taller de servicio', 'Taller de ciencia', 'Curso de docencia')
    assert.deepEqual(JSON.parse(await page.evaluate(key => window.localStorage.getItem(key), storageKey)), fixtures)

    await button('Nueva actividad').click()
    await button('Cancelar').click()
    await checkFocus(button('Nueva actividad'))
    await type.selectOption('Taller')
    await state.selectOption('Planificada')
    const editFirst = button('Editar «Taller de servicio»')
    await editFirst.click()
    await button('Cancelar').click()
    await checkFocus(editFirst)
    await editFirst.press('Enter')
    await page.getByLabel('Estado', { exact: true }).selectOption('Realizada')
    await button('Guardar cambios').click()
    await checkTitles()
    await checkFocus(resultHeading)
    await reset.click()
    page.once('dialog', dialog => dialog.accept())
    await button('Eliminar «Taller de ciencia»').press('Enter')
    await checkFocus(button('Editar «Curso de docencia»'))
    page.once('dialog', dialog => dialog.accept())
    await button('Eliminar «Curso de docencia»').press('Enter')
    await checkFocus(editFirst)
    await reload()
    assert.deepEqual(await articles.getByRole('heading').allTextContents(), ['Taller de servicio'])
    await articles.getByText('Realizada', { exact: true }).waitFor()
    assert.equal(await page.getByRole('heading', { name: 'HTML5 aplicado en este proyecto' }).isVisible(), true)
    const footer = page.getByRole('contentinfo')
    assert.equal(await footer.isVisible(), true)
    assert.equal(await footer.getByRole('link', { name: 'Diseño en Figma' }).getAttribute('href'),
      'https://www.figma.com/design/tuAuL4Td1Sd9Xx8EvV8Hg8')
    await checkLayout()
    assert.deepEqual(errors, [])
    console.log(`${name} ${width}×${height}: filtros, teclado, foco, estados, CRUD, persistencia y responsive OK`)
    await page.close()
  }
} finally {
  await browser.close()
}
