import * as React from 'react'
import { Heading, Grid, Button } from '../ui'
import { apps } from '../App'
import { useLocation } from 'wouter'

export const Home = () => {
  const [, navigate] = useLocation()

  return (
    <div>
      <Heading>Home</Heading>

      <Clock />

      <Grid>
        {Object.keys(apps).map(k => (
          <Button onEnterPress={() => navigate(k)}>{k}</Button>
        ))}
      </Grid>
    </div>
  )
}

const Clock = () => {
  const [time, setTime] = React.useState('')

  React.useEffect(() => {
    const update = () => setTime(formatTime(new Date()))
    const interval = setInterval(update, 1000)

    update()

    return () => clearInterval(interval)
  })

  const formatTime = date => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  return (
    <div>
      <span style={{ color: '#fff', fontSize: 40 }}>{time}</span>
    </div>
  )
}
