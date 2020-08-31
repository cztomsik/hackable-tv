import React from 'react'
import ReactDOM from 'react-dom'
import { initNavigation } from 'https://jspm.dev/@noriginmedia/react-spatial-navigation@2.12.5'
import * as goober from 'goober'
import { App } from './App'

// CSS-in-JS
goober.setup(React.createElement)
goober.glob(`
  body {
    font-family: sans-serif;
    font-size: 18px;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    padding: 0;
    margin: 0;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`)

// spatial/keyboard navigation
initNavigation()

ReactDOM.render(<App />, document.getElementById('root'))
