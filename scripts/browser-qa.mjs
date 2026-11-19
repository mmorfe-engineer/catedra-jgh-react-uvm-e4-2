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

    const response = await page.goto(url)
    assert.equal(response.ok(), true)
    await page.getByRole('heading', { name: /Vida, ciencia/ }).waitFor()
    await checkLayout()
    if (evidence && name !== 'tablet') {
      await page.screenshot({ path: `${evidence}/${name}-principal.png`, fullPage: true })
    }
    await page.getByRole('button', { name: 'Nueva actividad' }).click()
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
    assert.deepEqual(await page.locator('.metrics dd').allTextContents(), ['1', '1', '0', '0'])
    await reload()
    await page.getByRole('article').getByRole('heading', { name: title }).waitFor()
    await checkLayout()
    if (evidence) await page.screenshot({ path: `${evidence}/${name}.png`, fullPage: true })
    await page.getByRole('button', { name: 'Editar', exact: true }).click()
    assert.equal(await page.getByLabel('Título').inputValue(), title)
    await checkLayout()
    if (evidence) await page.screenshot({ path: `${evidence}/${name}-editor.png`, fullPage: true })
    await page.getByLabel('Título').fill(editedTitle)
    await page.getByLabel('Estado', { exact: true }).selectOption('Realizada')
    await page.getByRole('button', { name: 'Guardar cambios' }).click()
    await reload()
    await page.getByRole('article').getByRole('heading', { name: editedTitle }).waitFor()
    assert.deepEqual(await page.locator('.metrics dd').allTextContents(), ['1', '0', '0', '1'])
    page.once('dialog', dialog => dialog.dismiss())
    await page.getByRole('button', { name: 'Eliminar', exact: true }).click()
    assert.equal(await page.getByRole('article').count(), 1)
    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Eliminar', exact: true }).click()
    await reload()
    await page.getByText('Aún no hay actividades registradas.', { exact: false }).waitFor()
    assert.equal(await page.getByRole('article').count(), 0)
    assert.deepEqual(await page.locator('.metrics dd').allTextContents(), ['0', '0', '0', '0'])
    assert.equal(await page.getByRole('heading', { name: 'HTML5 aplicado en este proyecto' }).isVisible(), true)
    assert.equal(await page.getByRole('contentinfo').isVisible(), true)
    await checkLayout()
    assert.deepEqual(errors, [])
    console.log(`${name} ${width}×${height}: CRUD con recargas, validación, confirmación, CSS y layout OK`)
    await page.close()
  }
} finally {
  await browser.close()
}
