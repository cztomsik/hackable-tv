import * as React from 'react'
import { css } from 'goober'
import { useSpring, animated } from 'react-spring'
import { Focusable } from '../ui'
import { radii, shadow } from './theme'

// text-align is not enough (not even in browser)
const baseStyle = css`
  display: flex;
  border: 0;
  padding: 0 20px;
  margin: 8px;
  fontSize: 24px;
  lineHeight: 50px;
  text-align: center;
  justify-content: center;
  border-radius: ${radii};
  box-shadow: ${shadow};
`

// TODO: box-shadow
export const Button = ({ children, href = '', onPress = () => href && location.assign(href) }) => (
  <Focusable onPress={onPress}>
    {({ focused, setFocus, focusKey }) => {
      const spring = useSpring({
        transform: focused ?'scale(1.05, 1.15)' :'scale(1, 1)',
        config: { tension: 400 },
      })

      return (
        <animated.button
          className={baseStyle}
          style={{
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
