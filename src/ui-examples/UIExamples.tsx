import * as React from 'react'
import { Route, Link } from 'wouter'
import { Heading, List, ListItem, Shelf, ShelfItem, Button, Modal, Image, Stack, Row } from '../ui'

export const UIExamples = () => (
  <Route path="/:page*">{({ page }) => React.createElement(EXAMPLES[page] || Listing)}</Route>
)

export const Listing = () => {
  return (
    <div>
      <Heading>UI Examples</Heading>

      <List>
        {Object.keys(EXAMPLES).map(k => (
          <Link to={`/${k}`}>
            <ListItem>{k}</ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
}

export const SportsApp = () => (
  <div>
    <Heading>Sports App</Heading>

    <Shelf title="Picks">
      <BigSportItem width={270} height={190} />
      <BigSportItem width={270} height={190} />
      <BigSportItem width={270} height={190} />
    </Shelf>

    <Shelf title="Football">
      <QuickSportItem width={150} height={120} />
      <QuickSportItem width={150} height={120} />
      <QuickSportItem width={150} height={120} />
      <QuickSportItem width={150} height={120} />
    </Shelf>
  </div>
)

const BigSportItem = ({ width, height, ...rest }) => (
  <ShelfItem width={width} height={height} {...rest}>
    <div style={{ width: '100%', height: 70, backgroundColor: '#fff' }}>
      <span>NHL</span>
      <span>TeamA at TeamB</span>
      <span>Watch live</span>
    </div>
    <Image src="" width="100%" height={height - 20} />
  </ShelfItem>
)

const QuickSportItem = ({ width, height, ...rest }) => (
  <ShelfItem width={width} height={height} {...rest}>
    <Image src="" width="100%" height={height - 20} />
  </ShelfItem>
)

export const ModalExample = () => (
  <div>
    <Modal>
      <Heading>Foo</Heading>

      <Stack style={{ width: 250 }}>
        <Button>Do it</Button>
        <Button>Cancel</Button>
        <Button>Foo</Button>
        <Button>Bar</Button>
      </Stack>
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

      <Row style={{ width: 180 }}>
        <Button onPress={inc}>++</Button>
        <Button onPress={dec}>--</Button>
      </Row>

      <Link to="/">
        <Button>LinkButton</Button>
      </Link>
    </div>
  )
}

const EXAMPLES = { SportsApp, ModalExample, BasicExample, ButtonExample }
