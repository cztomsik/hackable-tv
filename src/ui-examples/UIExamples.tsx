import * as React from 'react'
import { Route, useLocation, useRouter } from 'wouter'
import { Button, Heading } from '../ui'

export const UIExamples = () => (
  <>
    <Route path="" component={Listing} />
    <Route path="/:example">{({ example }) => React.createElement(exports[example])}</Route>
  </>
)

const Listing = () => {
  const [, navigate] = useLocation()

  return (
    <div>
      <Heading>UI Examples</Heading>

      {Object.keys(exports)
        .slice(1)
        .map(k => (
          <Button onEnterPress={() => navigate('/' + k)}>{k}</Button>
        ))}
    </div>
  )
}

export const BasicExample = () => (
  <div>
    <Heading>Basics</Heading>

    <Button>Hello</Button>
  </div>
)

export const ButtonExample = () => (
  <div>
    <Button>Hello</Button>
  </div>
)
