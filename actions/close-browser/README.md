# `closeBrowser(browser)`
Closes a browser

## Example
```js
import { openBrowser, closeBrowser } from 'puppet-strings'

async function run() {
  const browser = await openBrowser('google-chrome')
  await closeBrowser(browser)
}

run()
```

## Parameters
* `browser` ([Browser](../../interface#browser-object))

## Returns
* `promise` (Promise<void>)

## Details
Once a browser instance is started, it will continue running until passed to
`closeBrowser`. It is important to close unused browser instances as Chrome can
use a lot of memory.
