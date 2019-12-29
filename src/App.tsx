import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import { Route, Router, useLocation } from 'wouter'

import { Home } from './home/Home'
import { Radio } from './radio/Radio'
import { IAGames } from './ia-games/IAGames'
import { FileManager } from './file-manager/FileManager'
import { UIExamples } from './ui-examples/UIExamples'
import { Settings } from './settings/Settings'

// rendered in Home
export const apps = { Radio, IAGames, FileManager, UIExamples, Settings }

// TODO: rename
export const App = withFocusable()(({ setFocus }) => {
  const [loc] = useLocation()

  // focus on mount & also when navigation changes
  React.useEffect(() => {
    setTimeout(setFocus)
  }, [loc])

  // has to be on window
  React.useEffect(() => {
    const handleKey = e => {
      if (e.code === 'Escape') {
        history.go(-1)
      }

      if (e.key === 'h') {
        location.assign('/')
      }
    }

    window.addEventListener('keypress', handleKey)
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keypress', handleKey)
      window.removeEventListener('keydown', handleKey)
    }
  })

  return (
    <ErrorBoundary>
      <div
        style={{
          flex: 1,
          backgroundColor: '#666',
          padding: 50,
          paddingLeft: 80,
          paddingRight: 80
        }}
      >
        <div>
          <Route path="/" component={Home} />
          <Route path="/:app/:rest*">
            {({ app }) => <Router base={'/' + app}>{React.createElement(apps[app])}</Router>}
          </Route>
        </div>
      </div>
    </ErrorBoundary>
  )
})

class ErrorBoundary extends React.Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { error } = this.state

    if (error) {
      const kind = error.name || error.constructor?.name || 'Unknown Error'

      return (
        <div>
          <div style={{ backgroundColor: '#f00' }}>
            <h3 style={{ margin: 10, color: '#fff' }}>{kind}</h3>
          </div>

          <div style={{ margin: 10 }}>{error.message}</div>

          <div style={{ margin: 10 }}>{error.stack}</div>
        </div>
      )
    }

    return this.props.children
  }
}
