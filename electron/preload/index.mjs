// ESM preload scripts must have the .mjs extension
// Preload scripts will ignore "type": "module" fields,
// so you must use the.mjs file extension in your ESM preload scripts.

import './api.mjs'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
