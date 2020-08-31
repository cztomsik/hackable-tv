import * as React from 'react'
import { useSpring, animated } from 'react-spring'
import { css } from 'goober'
import { Focusable } from '../ui'
import { shadow } from './theme'

const itemStyle = css`
  display: flex;
  align-ttems: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
`

export const List = ({ children }) => <div>{children}</div>

// TODO: fix textnode padding (or make them real layout nodes)
// so that wrapping <span> can be removed
export const ListItem = ({ children, href = '', onFocus = undefined, onPress = () => href && location.assign(href) }) => (
  <Focusable onFocus={onFocus} onPress={onPress}>
    {( { focused, setFocus, focusKey }) => {
      // TODO: transform
      const { marginLeft } = useSpring({ config: { tension: 400 }, to: { marginLeft: focused ? -15 : -5 } }) as any

      return (
        <animated.div
          className={itemStyle}
          style={{ marginLeft, backgroundColor: focused && '#fff', boxShadow: focused && shadow }}
          onMouseEnter={() => setFocus(focusKey)}
          onClick={onPress}
        >
          <span style={{ fontSize: 24 }}>{children}</span>
        </animated.div>
      )
    }}
  </Focusable>
)
