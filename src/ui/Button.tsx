import * as React from 'react'
import { withFocusable } from '@noriginmedia/react-spatial-navigation'

export let Button = ({ children, href = undefined, style = undefined, focused = false, onEnterPress = undefined }) => (
  <button style={{ color: focused ? '#ff0' : '#ccc', ...style }} onClick={onEnterPress}>
    {children}
  </button>
)

Button = withFocusable()(Button)
