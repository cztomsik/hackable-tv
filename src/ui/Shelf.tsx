import * as React from 'react'
import { useSpring, animated } from 'react-spring'
import { Focusable } from '../ui'
import { shadow } from './theme'

export const Shelf = ({ title, children }) => (
  <div style={{ marginTop: 15, marginBottom: 15 }}>
    <h3 style={{ color: '#ccc', margin: 0 }}>{title}</h3>
    <div style={{ display: 'flex', marginLeft: -10, alignItems: 'center' }}>{children}</div>
  </div>
)

// TODO: width/height could be implied by content
// but we will need transform: scale() for that
export const ShelfItem = ({ title = '', children, width, height, onPress = undefined }) => (
  <Focusable onPress={onPress}>
    {({ focused, setFocus, focusKey }) => {
      const spring = useSpring({
        transform: focused ?'scale(1.15)' :'scale(1)',
        config: { tension: 400 },
      })

      return (
        <animated.div
          style={{
            margin: 12,
            width,
            height,
            alignItems: 'center',
            zIndex: focused && 100,
            boxShadow: focused && shadow,
            ...spring,
          }}
          onMouseEnter={() => setFocus(focusKey)}
          onClick={onPress}
        >
          {children}
          {focused && <div style={{ color: '#ccc', textAlign: 'center', marginBottom: -15, top: 15 }}>{title}</div>}
        </animated.div>
      )
    }}
  </Focusable>
)
