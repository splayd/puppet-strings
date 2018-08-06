/* @flow */
import ava from 'ava'
import {
  withChrome,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { openTab, findElement, fillInElement } from 'puppet-strings'

withChrome()
const test = withDirectory(ava)

test('filling in an element', async t => {
  const { browser } = global
  const { directory } = t.context

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

  const tab = await openTab(browser, `file://${htmlPath}`)
  const element = await findElement(tab, 'input')
  await fillInElement(element, 'Hello')

  t.is((await findElement(tab, 'span')).innerText, 'Hello')
})
