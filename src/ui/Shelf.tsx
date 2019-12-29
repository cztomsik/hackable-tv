import React = require('react')
import { Focusable } from '../ui'

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
    {focused => {
      return (
        <div
          style={{
            width: focused ? width + 15 : width,
            height: focused ? height + 15 : height,
            margin: focused ? 0 : 15,
            alignItems: 'center'
          }}
        >
          {children}
          {focused && <span style={{ color: '#ccc', marginBottom: -15, top: 15 }}>{title}</span>}
        </div>
      )
    }}
  </Focusable>
)
