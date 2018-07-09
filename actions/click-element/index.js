/* @flow */
import { branchOnElement } from 'puppet-strings'

export default branchOnElement({
  async puppeteer({ puppeteer: { elementHandle } }) {
    await elementHandle.click()
  }
})
