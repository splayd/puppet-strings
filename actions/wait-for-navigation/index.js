/* @flow */
import type { Tab } from 'puppet-strings'

export default async function({ puppeteer: { page } }: Tab): Promise<void> {
  await page.waitForNavigation({
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  })
}