/* @flow */
import ava from 'ava'
import {
  withChrome,
  withDirectory,
  writeFile
} from 'puppet-strings/test/helpers'
import { openTab, evalInTab } from 'puppet-strings'

withChrome()
const test = withDirectory(ava)

test('executing code within the browser', async t => {
  const { browser } = global
  const { directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div id="root">Hello World!</div>
    `
  )
  const tab = await openTab(browser, `file://${filePath}`)

  const text = await evalInTab(
    tab,
    ['#root'],
    `
    const [selector] = arguments
    return document.querySelector(selector).textContent
    `
  )
  t.is(text, 'Hello World!')
})

test('propagating error messages', async t => {
  const { browser } = global
  const { directory } = t.context

  const filePath = await writeFile(
    directory,
    'index.html',
    `
    <!doctype html>
    <meta charset="utf-8">
    <div id="root">Hello World!</div>
    `
  )
  const tab = await openTab(browser, `file://${filePath}`)

  await t.throwsAsync(
    evalInTab(tab, [], 'throw new Error("Error Message")'),
    /Error: Error Message/
  )
})
