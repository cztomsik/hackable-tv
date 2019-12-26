import * as React from 'react'
import { Focusable } from '../ui'

export const List = ({ children }) => <div>{children}</div>

// TODO: fix textnode padding (or make them real layout nodes)
// so that wrapping <span> can be removed
export const ListItem = ({ children, href = '', onPress = () => href && location.assign(href) }) => (
  <Focusable onPress={onPress}>
    {focused => (
      <div
        style={{
          marginTop: 5,
          marginBottom: 5,
          marginLeft: focused ? -15 : -5,
          padding: 10,
          backgroundColor: focused ?'#fff' :undefined,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: 24 }}>{children}</span>
      </div>
    )}
  </Focusable>
)
