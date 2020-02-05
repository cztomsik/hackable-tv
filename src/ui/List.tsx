import * as React from 'react'
import { useSpring, animated } from 'react-spring'
import { Focusable } from '../ui'

export const List = ({ children }) => <div>{children}</div>

// TODO: fix textnode padding (or make them real layout nodes)
// so that wrapping <span> can be removed
export const ListItem = ({ children, href = '', onFocus, onPress = () => href && location.assign(href) }) => (
  <Focusable onFocus={onFocus} onPress={onPress}>
    {focused => {
      // TODO: transform
      const { marginLeft } = useSpring({ config: { tension: 400 }, to: { marginLeft: focused ? -15 : -5 } }) as any

      return (
        <animated.div
          style={{
            marginTop: 5,
            marginBottom: 5,
            marginLeft,
            padding: 10,
            backgroundColor: focused ?'#fff' :undefined,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: 24 }}>{children}</span>
        </animated.div>
      )
    }}
  </Focusable>
)
