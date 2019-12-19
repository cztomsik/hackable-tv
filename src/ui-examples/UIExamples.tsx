import * as React from 'react'
import { Route, Link } from 'wouter'
import { Heading, Button, Modal } from '../ui'

export const UIExamples = () => (
  <>
    <Route path="" component={Listing} />
    <Route path="/:example">{({ example }) => React.createElement(exports[example])}</Route>
  </>
)

const Listing = () => {
  return (
    <div>
      <Heading>UI Examples</Heading>

      {Object.keys(exports)
        .slice(1)
        .map(k => (
          <Link to={`/${k}`}>
            <Button>{k}</Button>
          </Link>
        ))}
    </div>
  )
}

export const ModalExample = () => (
  <div>
    <Modal>
      <Heading>Foo</Heading>

      <div style={{ width: 250 }}>
        <Button>Do it</Button>
        <Button>Cancel</Button>
        <Button>Foo</Button>
        <Button>Bar</Button>
      </div>
    </Modal>
  </div>
)

export const BasicExample = () => (
  <div>
    <Heading>Basics</Heading>

    <Button>Hello</Button>
  </div>
)

export const ButtonExample = () => {
  const [count, setCount] = React.useState(1)
  const dec = () => setCount(count - 1)
  const inc = () => setCount(count + 1)

  return (
    <div>
      <Heading>{count}</Heading>

      <Button onPress={dec}>--</Button>
      <Button onPress={inc}>++</Button>

      <Link to='/'>
        <Button>LinkButton</Button>
      </Link>
    </div>
  )
}
