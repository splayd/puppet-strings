/* @flow */
/* eslint-disable no-new-func */
import type { Tab, Element } from 'puppet-strings'

export default async function(
  tab: Tab,
  selector: string,
  text: ?string
): Promise<Element> {
  const {
    puppeteer: { browser, page }
  } = tab

  try {
    const [frame, elementHandle] = await Promise.race(
      page.frames().map(async frame => [
        frame,
        text
          ? await frame.waitForFunction(
              new Function(`
                const [selector, text] = arguments
                return Array.from(document.querySelectorAll(selector))
                  .find(e => e.textContent.includes(text))
              `),
              { timeout: 5000 },
              selector,
              text
            )
          : await frame.waitForSelector(selector, { timeout: 5000 })
      ])
    )

    const metadata = await frame.evaluate(
      new Function(`
        const [element] = arguments

        return {
          attributes: Array.from(element.attributes).reduce(
            (memo, attr) => Object.assign(memo, { [attr.name]: attr.value }),
            {}
          ),
          innerText: element.innerText,
          outerHTML: element.outerHTML
        }
      `),
      // $FlowFixMe
      elementHandle
    )

    return {
      ...metadata,
      puppeteer: { browser, page, elementHandle }
    }
  } catch (error) {
    throw new Error('Could not find element')
  }
}
