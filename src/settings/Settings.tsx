import * as os from 'os'
import * as React from 'react'
import { Link, Route, Router, useRouter } from 'wouter'
import { Heading, List, ListItem } from '../ui'

export const Settings = () => (
  <Route path="/:page*">{({ page }) => React.createElement(exports[page] || Listing)}</Route>
)

export const Listing = () => (
  <div>
    <Heading>Settings</Heading>

    <List>
      <Link to="/General">
        <ListItem>General</ListItem>
      </Link>

      <Link to="/System">
        <ListItem>System</ListItem>
      </Link>

      <Link to="/Wifi">
        <ListItem>Wifi</ListItem>
      </Link>

      <Link to="/Bluetooth">
        <ListItem>Bluetooth</ListItem>
      </Link>

      <Link to="/Sleep">
        <ListItem>Sleep</ListItem>
      </Link>
    </List>
  </div>
)

export const General = () => (
  <div>
    <Heading>General</Heading>

    <List>
      <Link to="/About">
        <ListItem>About</ListItem>
      </Link>

      <Link to="/Theme">
        <ListItem>Theme</ListItem>
      </Link>
    </List>
  </div>
)

export const About = () => {
  const [info, setInfo] = React.useState(null)

  // TODO: more info, update periodically
  React.useEffect(() => {
    setInfo({
      hostname: os.hostname(),
      platform: os.platform(),
      type: os.type(),
      release: os.release(),
      mem: os.totalmem(),
      freeMem: os.freemem()
    })
  }, [])

  return info && (
    <div>
      <Heading>About</Heading>

      <List>
        <ListItem>Host: {info.hostname}</ListItem>
        <ListItem>Platform: {info.platform}</ListItem>
        <ListItem>Type: {info.type}</ListItem>
        <ListItem>Release: {info.release}</ListItem>
        <ListItem>Mem: {info.mem}</ListItem>
        <ListItem>Free Mem: {info.freeMem}</ListItem>
      </List>
    </div>
  )
}

export const System = () => (
  <div>
    <Heading>System</Heading>

    <List>
      <Link to="/Reset">
        <ListItem>Reset</ListItem>
      </Link>

      <Link to="/Restart">
        <ListItem>Restart</ListItem>
      </Link>
    </List>
  </div>
)

export const Theme = () => <Heading>TODO</Heading>
export const Wifi = () => <Heading>TODO</Heading>
export const Bluetooth = () => <Heading>TODO</Heading>
export const Reset = () => <Heading>TODO</Heading>
export const Restart = () => <Heading>TODO</Heading>
export const Sleep = () => <Heading>TODO</Heading>
