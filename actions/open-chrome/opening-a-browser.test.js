/* @flow */
import test from 'ava'
import { openChrome, branchOnBrowser } from 'puppet-strings'

test('starting headless by default', async t => {
  const browser = await openChrome()

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      t.true(browser.process().spawnargs.includes('--headless'))
      await browser.close()
    }
  })(browser)
})

test('starting with 0 tabs open', async t => {
  const browser = await openChrome()

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      t.deepEqual(await browser.pages(), [])
      await browser.close()
    }
  })(browser)
})

test('starting Chrome headlessly', async t => {
  const browser = await openChrome({ headless: true })

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      t.true(browser.process().spawnargs.includes('--headless'))
      await browser.close()
    }
  })(browser)
})

test.only('starting Chrome headfully', async t => {
  const browser = await openChrome({ headless: false })

  await branchOnBrowser({
    async puppeteer({ puppeteer: { browser } }) {
      t.false(browser.process().spawnargs.includes('--headless'))
      await browser.close()
    }
  })(browser)
})
