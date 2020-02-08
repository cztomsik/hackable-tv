import * as React from 'react'
import { useSpring, animated } from 'react-spring'
import { Focusable } from '../ui'

// TODO: fix in graffiti (maybe make raf native?)
window.requestAnimationFrame = global['requestAnimationFrame']

// TODO: box-shadow
// TODO: text-align: center (graffiti)
export const Button = ({ children, href = '', onPress = () => href && location.assign(href) }) => (
  <Focusable onPress={onPress}>
    {({ focused, setFocus, focusKey }) => {
      const spring = useSpring({
        transform: focused ?'scale(1.05, 1.15)' :'scale(1, 1)',
        config: { tension: 400 },
      })

      return (
        <animated.button
          style={{
            display: 'flex',
            margin: 8,
            justifyContent: 'center',
            fontSize: 24,
            lineHeight: 50,

            backgroundColor: focused ?'#fff' :'#444',
            color: focused ? '#000' : '#ddd',
  
            ...spring
          }}
          onMouseEnter={() => setFocus(focusKey)}
          onClick={onPress}
        >
          {children}
        </animated.button>
      )
    }}
  </Focusable>
)
