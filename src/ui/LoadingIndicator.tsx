import * as React from 'react'
import { animated, useSpring } from 'react-spring'

export const LoadingIndicator = () => {
  let run = true

  React.useEffect(() => () => (run = false), [])

  const props = useSpring({
    from: { width: '0%' },
    to: async next => {
      while (run) {
        await next({ width: '20%' })
        await next({ width: '90%' })
        await next({ width: '0%' })
      }
    }
  })
  return (
    <div style={{ backgroundColor: '#0004' }}>
      <animated.div style={{ ...props, height: 15, backgroundColor: '#0006' }} />
    </div>
  )
}
