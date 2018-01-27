/* @flow */
import type { Browser, Tab } from 'puppet-strings'

export default async function(
  { puppeteer: { browser } }: Browser,
  url: string
): Promise<Tab> {
  const page = await browser.newPage()

  const consoleMessages = []
  page.on('console', consoleMessage => {
    consoleMessages.push({
      type: consoleMessage.type(),
      message: consoleMessage.text()
    })
  })

  const errors = []
  page.on('pageerror', error => {
    errors.push(error.message)
  })

  await page.goto(url, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  })
  return {
    puppeteer: { browser, page },
    console: consoleMessages,
    errors
  }
}
