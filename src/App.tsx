import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'
import { Route, Router, useLocation } from 'wouter'

import { Home } from './home/Home'
import { Radio } from './radio/Radio'
import { Podcasts } from './podcasts/Podcasts'
import { UIExamples } from './ui-examples/UIExamples'
import { Settings } from './settings/Settings'

// rendered in Home
export const apps = { Radio, Podcasts, UIExamples, Settings }

// TODO: rename
export const App = withFocusable()(({ setFocus }) => {
  const [loc] = useLocation()

  // focus on mount & also when navigation changes
  React.useEffect(() => setFocus(), [loc])

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
    <div
      style={{
        flex: 1,
        backgroundColor: '#000',
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
  )
})
