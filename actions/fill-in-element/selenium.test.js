/* @flow */
import test from 'ava'
import {
  withBrowser,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { getTabs, navigate, findElement, fillInElement } from 'puppet-strings'

withBrowser({ perTest: true, type: 'firefox' })
withDirectory()

test('filling in an element', async t => {
  const { directory, browser } = t.context

  const htmlPath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <span id="statusText"></span>
    <input onChange="statusText.textContent = this.value">
  `
  )

  const [tab] = await getTabs(browser)
  await navigate(tab, `file://${htmlPath}`)
  const element = await findElement(tab, 'input')
  await fillInElement(element, 'Hello')

  t.is((await findElement(tab, 'span')).innerText, 'Hello')
})
