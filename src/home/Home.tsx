import * as React from 'react'
import { Heading, Grid, Button } from '../ui'
import { apps } from '../App'
import { Link } from 'wouter'

export const Home = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Heading>Home</Heading>
        <Clock />
      </div>

      <Grid>
        {Object.keys(apps).map(k => (
          <Link to={k}>
            <Button>{k}</Button>
          </Link>
        ))}
      </Grid>
    </div>
  )
}

const Clock = () => {
  const [time, setTime] = React.useState('')

  React.useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString())
    const interval = setInterval(update, 1000)

    update()

    return () => clearInterval(interval)
  })

  return (
    <div>
      <span style={{ color: '#fff', fontSize: 24 }}>{time}</span>
    </div>
  )
}
