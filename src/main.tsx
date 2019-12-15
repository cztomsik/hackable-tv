import * as React from 'react'
import { render } from 'react-dom'
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation'

initNavigation()
renderApp()

if (module['hot']) {
  module['hot'].onChange(() => renderApp())
}

function renderApp() {
  let { App } = require('./App')
  App = withFocusable()(App)
  render(<App />, document.body)
}
